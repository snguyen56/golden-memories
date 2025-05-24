import {
  PhotosSchemaWithPagination,
  MediaSchemaWithPagination,
} from "@/models/mediaSchema";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  search?: string | null;
  collectionId?: string | null;
  page?: string;
};

function buildURL({ search, collectionId, page = "1" }: Props) {
  if (search) {
    return `https://api.pexels.com/v1/search?query=${search}&page=${page}`;
  } else if (collectionId) {
    return `https://api.pexels.com/v1/collections/${collectionId}?page=${page}`;
  }
  return `https://api.pexels.com/v1/curated?page=${page}`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("query");
  const collectionId = searchParams.get("collectionId");
  const page = searchParams.get("page") || "1";
  const url = buildURL({ search, collectionId, page });
  // https://api.pexels.com/v1/collections/eqinbrc?page=2&per_page=15
  // /api/pexels?collectionId=eqinbrc&page=1
  try {
    const result = await fetch(url, {
      headers: {
        authorization: process.env.PEXELS_API_KEY!,
      },
    });
    if (!result.ok) throw new Error("Fetch Images Error!");
    const json = await result.json();

    if ("photos" in json) {
      const data = PhotosSchemaWithPagination.parse(json);
      if (data.total_results == 0) return undefined;
      return NextResponse.json(data);
    }
    if ("media" in json) {
      const data = MediaSchemaWithPagination.parse(json);
      if (data.total_results == 0) return undefined;
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(error);
  }
  return new Response(url);
}
