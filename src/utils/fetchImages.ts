import type { ImagesResults, MediaResults } from "@/models/mediaSchema";
import {
  MediaSchemaWithPagination,
  PhotosSchemaWithPagination,
} from "@/models/mediaSchema";

export default async function fetchImages(
  url: string,
): Promise<MediaResults | ImagesResults | undefined> {
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
      return data;
    }
    if ("media" in json) {
      const data = MediaSchemaWithPagination.parse(json);
      if (data.total_results == 0) return undefined;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
