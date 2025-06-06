"use server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  display_name: string;
  bytes: number;
  original_filename: string;
  placeholder: boolean;
  secure_url: string;
  url: string;
  [key: string]: unknown;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function generateUploadSignature(name: string, folder: string) {
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    folder,
    timestamp,
    public_id: name,
    upload_preset: "golden memories",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    folder,
  };
}

export async function createPost(
  responseData: CloudinaryResponse,
  userId: string,
  collection?: string,
) {
  const assetId: string = responseData.asset_id;
  const url: string = responseData.secure_url;
  const width: number = responseData.width;
  const height: number = responseData.height;
  const format: string = responseData.format;
  const resourceType: string = responseData.resource_type;
  const createdAt = new Date(responseData.created_at);
  const public_id: string = responseData.public_id;

  const name: string = public_id.split("/").pop()!;

  let collectionId: string;

  if (collection) {
    const existing = await db
      .select()
      .from(schema.collection)
      .where(eq(schema.collection.id, collection));

    if (existing.length === 0) {
      await db.insert(schema.collection).values({
        id: collection,
        userId,
        createdAt,
        updatedAt: new Date(),
      });
    }

    collectionId = collection;
  } else {
    collectionId = "Unassigned";
  }

  revalidatePath("/collections");
  revalidatePath("/upload");

  await db.insert(schema.post).values({
    id: assetId,
    name,
    url,
    width,
    height,
    format,
    resourceType,
    userId,
    collectionId,
    createdAt,
    updatedAt: new Date(),
  });
}
