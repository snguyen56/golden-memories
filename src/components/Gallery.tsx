import fetchImages from "@/utils/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";

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
    <div className="mt-5 grid auto-rows-[10px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))] justify-items-center">
      {images.photos.map((photo) => (
        <ImageContainer photo={photo} key={photo.id} />
      ))}
    </div>
  );
}

export default Gallery;
