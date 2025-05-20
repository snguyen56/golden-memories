import Gallery from "@/components/Gallery";
import { CollectionsResults } from "@/models/mediaSchema";
import fetchCollections from "@/utils/fetchCollections";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const albums: CollectionsResults | undefined = await fetchCollections();
  const { id } = await params;
  const result = albums?.collections.find((album) => album.id === id);
  return {
    title: `${result?.title} | Golden Memories`,
  };
}

async function Page({ params }: Props) {
  const { id } = await params;
  const albums: CollectionsResults | undefined = await fetchCollections();
  const result = albums?.collections.find((album) => album.id === id);
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">{result?.title}</h2>
      <Gallery collectionId={id} />
    </div>
  );
}

export default Page;
