"use server";
import { db } from "@/db";
import { auth } from "../utils/auth";
import { headers } from "next/headers";
import { comment, like } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
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

  await db.insert(comment).values({
    id,
    userId,
    postId,
    content,
    createdAt,
  });
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
