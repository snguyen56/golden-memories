import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { desc, lt, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const cursor = url.searchParams.get("cursor");
  const limit = 15;

  try {
    const rows = await db
      .select({
        post: schema.post,
        userName: schema.user.name,
      })
      .from(schema.post)
      .leftJoin(schema.user, eq(schema.post.userId, schema.user.id))
      .where(cursor ? lt(schema.post.createdAt, new Date(cursor)) : undefined)
      .orderBy(desc(schema.post.createdAt))
      .limit(limit);

    const posts = rows.map((row) => ({
      ...row.post,
      userName: row.userName ?? null,
    }));

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
