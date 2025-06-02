// app/api/comments/route.ts
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "Missing postId in query params" },
      { status: 400 },
    );
  }

  try {
    const comments = await db.query.comment.findMany({
      where: (comment, { eq }) => eq(comment.postId, postId),
      with: {
        user: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: (comment, { desc }) => desc(comment.createdAt),
    });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}
