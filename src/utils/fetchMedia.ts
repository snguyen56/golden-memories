import { MediaResults, MediaSchemaWithPagination } from "@/models/Images";

export default async function fetchMedia(id: string, amount: number) {
  try {
    const result = await fetch(
      `https://api.pexels.com/v1/collections/${id}?type=photo&per_page=${amount}`,
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
    if (data.media[0].type == "Photo") return data.media[0];
  } catch (error) {
    console.error(error);
  }
}
