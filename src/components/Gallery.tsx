import fetchImages from "@/utils/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";
import GalleryLoader from "./GalleryLoader";
import { Suspense } from "react";

type Props = {
  search?: string;
};

async function Gallery({ search }: Props) {
  const url = search
    ? `https://api.pexels.com/v1/search?query=${search}`
    : "https://api.pexels.com/v1/curated";

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) return <p>No Images Found</p>;
  return (
    <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
      <Suspense fallback={<GalleryLoader />}>
        {images.photos.map((photo) => (
          <ImageContainer photo={photo} key={photo.id} />
        ))}
      </Suspense>
    </div>
  );
}

export default Gallery;
