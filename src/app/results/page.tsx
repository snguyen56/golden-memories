import Gallery from "@/components/Gallery";
import GalleryLoader from "@/components/GalleryLoader";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `Results for ${(await searchParams).query} | Golden Memories`,
  };
}

async function page({ searchParams }: Props) {
  const search = (await searchParams).query;
  return (
    <>
      <h2 className="text-3xl font-bold text-black">
        Search Results for {search}
      </h2>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery search={search} />
      </Suspense>
    </>
  );
}

export default page;
