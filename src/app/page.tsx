import GalleryLoader from "@/components/GalleryLoader";
import { Suspense } from "react";
import Gallery from "../components/Gallery";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  return (
    <>
      <h2 className="text-3xl font-bold text-black">Photo Gallery</h2>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery page={page} />
      </Suspense>
    </>
  );
}
