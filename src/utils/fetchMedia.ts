import { MediaResults, MediaSchemaWithPagination } from "@/models/Images";

export async function fetchCover(id: string, amount: number) {
  try {
    const result = await fetch(
      `https://api.pexels.com/v1/collections/${id}?per_page=${amount}`,
      {
        headers: {
          authorization: process.env.PEXELS_API_KEY!,
        },
      },
    );
    if (!result.ok) throw new Error(`Fetch Media Error: ${result.status}`);
    const collectionResults: MediaResults = await result.json();
    // console.log(collectionResults);
    const data = MediaSchemaWithPagination.parse(collectionResults);
    if (data.total_results == 0) return undefined;
    return data.media[0];
  } catch (error) {
    console.error(error);
  }
}

export default async function fetchMedia(
  id: string,
): Promise<MediaResults | undefined> {
  try {
    const result = await fetch(`https://api.pexels.com/v1/collections/${id}`, {
      headers: {
        authorization: process.env.PEXELS_API_KEY!,
      },
    });
    if (!result.ok) throw new Error("Fetch Images Error!");
    const mediaResults: MediaResults = await result.json();
    const data = MediaSchemaWithPagination.parse(mediaResults);
    if (data.total_results == 0) return undefined;
    return data;
  } catch (error) {
    console.error(error);
  }
}
