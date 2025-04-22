import fetchImages from "@/utils/fetchImages";
import type { ImagesResults } from "@/models/Images";

async function Gallery() {
  const url = "https://api.pexels.com/v1/curated";

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) return <p>No Images Found</p>;
  return (
    <section className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
      {images.photos.map((photo) => (
        <div
          key={photo.id}
          className="h-[400px] w-[300px] rounded-xl bg-gray-500"
        ></div>
      ))}
    </section>
  );
}

export default Gallery;
