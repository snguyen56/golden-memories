"use server";
import { db } from "@/db";
import { auth } from "../utils/auth";
import { headers } from "next/headers";
import { comment, like, post } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function deletePost(id: string, posterId: string, userId: string) {
  if (posterId !== userId) {
    throw new Error("Unauthorized: You can only delete your own posts");
  }
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    asset_id: id,
    timestamp,
  };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  const body = new FormData();
  body.append("asset_id", id);
  body.append("timestamp", timestamp.toString());
  body.append("api_key", process.env.CLOUDINARY_API_KEY!);
  body.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME!}/asset/destroy`,
    {
      method: "POST",
      body,
    },
  );
  if (!res.ok) {
    console.error("CLoudinary Error: ", await res.text());
    throw new Error("Delete failed");
  }
  const responseData = await res.json();
  await db.delete(post).where(and(eq(post.id, id), eq(post.userId, userId)));
  console.log("Cloudinary response:", responseData);
}

export async function addLike(userId: string, postId: string) {
  await db.insert(like).values({
    userId,
    postId,
    createdAt: new Date(),
  });
}

export async function deleteLike(userId: string, postId: string) {
  await db
    .delete(like)
    .where(and(eq(like.userId, userId), eq(like.postId, postId)));
}

export async function addComment(
  userId: string,
  postId: string,
  content: string,
) {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const session = await getSession();

  try {
    await db.insert(comment).values({
      id,
      userId,
      postId,
      content,
      createdAt,
    });
  } catch (error) {
    console.error("Failed to create comment: ", error);
    throw new Error("Failed to create comment");
  }

  return {
    id,
    userId,
    postId,
    content,
    createdAt,
    user: {
      name: session?.user.name || "user",
      image:
        session?.user.image ||
        "https://res.cloudinary.com/dshapo0iy/image/upload/v1748369070/golden-memories/avatar.png",
    },
  };
}
