import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    const collectionsWithCover = await db.query.collection.findMany({
      with: {
        posts: {
          orderBy: (posts, { asc }) => [asc(posts.createdAt)],
          columns: {
            name: true,
            url: true,
            width: true,
            height: true,
          },
          limit: 1,
        },
      },
      limit: 16,
    });

    const collections = collectionsWithCover.map((collection) => ({
      ...collection,
      cover: collection.posts[0] || null,
      posts: undefined,
    }));

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}
