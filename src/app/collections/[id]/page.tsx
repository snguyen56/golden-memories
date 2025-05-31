import Gallery from "@/components/Gallery";
import GalleryLoader from "@/components/GalleryLoader";
import { CollectionsResults } from "@/models/mediaSchema";
import fetchCollections from "@/utils/fetchCollections";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ [key: string]: string }>;
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
  // const { page } = await searchParams;
  const albums: CollectionsResults | undefined = await fetchCollections();
  const result = albums?.collections.find((album) => album.id === id);
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">{result?.title}</h2>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery collectionId={id} />
      </Suspense>
    </div>
  );
}

export default Page;
