import GalleryLoader from "@/components/GalleryLoader";
import { Suspense } from "react";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <>
      <h2 className="text-3xl font-bold text-black">Photo Gallery</h2>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery />
      </Suspense>
    </>
  );
}
