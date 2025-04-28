import type { ImagesResults } from "@/models/Images";
import { PhotosSchemaWithPagination } from "@/models/Images";

export default async function fetchImages(
  url: string,
): Promise<ImagesResults | undefined> {
  try {
    const result = await fetch(url, {
      headers: {
        authorization: process.env.PEXELS_API_KEY!,
      },
    });
    if (!result.ok) throw new Error("Fetch Images Error!");
    const ImagesResults: ImagesResults = await result.json();
    // console.log(ImagesResults);
    const data = PhotosSchemaWithPagination.parse(ImagesResults);
    if (data.total_results == 0) return undefined;
    return data;
  } catch (error) {
    console.error(error);
  }
}
