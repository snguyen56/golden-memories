import fetchImages from "@/utils/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";

async function Gallery() {
  const url = "https://api.pexels.com/v1/curated?per_page=16";

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) return <p>No Images Found</p>;
  return (
    <section className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] justify-items-center gap-6">
      {images.photos.map((photo) => (
        // <div
        //   key={photo.id}
        //   className="h-64 w-full animate-pulse rounded-xl bg-gray-300"
        // ></div>
        <ImageContainer photo={photo} key={photo.id} />
      ))}
    </section>
  );
}

export default Gallery;
