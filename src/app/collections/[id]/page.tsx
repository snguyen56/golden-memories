import Gallery from "@/components/Gallery";
import GalleryLoader from "@/components/GalleryLoader";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `${id} | Golden Memories`,
  };
}

async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">{id}</h2>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery collectionId={id} />
      </Suspense>
    </div>
  );
}

export default Page;
