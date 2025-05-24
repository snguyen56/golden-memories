import { CollectionsResults } from "@/models/mediaSchema";
import { CollectionsSchemaWithPagination } from "@/models/mediaSchema";

export default async function fetchCollections(
  page: number = 1,
): Promise<CollectionsResults | undefined> {
  try {
    const result = await fetch(
      `https://api.pexels.com/v1/collections/featured?page=${page}&per_page=16`,
      {
        headers: {
          authorization: process.env.PEXELS_API_KEY!,
        },
      },
    );
    if (!result.ok) throw new Error("Fetch Collections Error!");
    const collectionResults: CollectionsResults = await result.json();
    const data = CollectionsSchemaWithPagination.parse(collectionResults);
    if (data.total_results == 0) return undefined;
    return data;
  } catch (error) {
    console.error(error);
  }
}
