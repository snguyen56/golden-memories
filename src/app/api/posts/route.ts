import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const cursor = url.searchParams.get("cursor");
  const limit = 15;

  try {
    const posts = await db.query.post.findMany({
      with: {
        user: {
          columns: {
            name: true,
            image: true,
          },
        },
        likes: true,
      },
      where: cursor
        ? (fields, { lt }) => lt(fields.createdAt, new Date(cursor))
        : undefined,
      orderBy: (fields, { desc }) => desc(fields.createdAt),
      limit,
    });

    const nextCursor =
      posts.length === limit
        ? posts[posts.length - 1].createdAt.toISOString()
        : null;

    return NextResponse.json({
      posts,
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
