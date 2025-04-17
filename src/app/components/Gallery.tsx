import fetchImages from "@/utils/fetchImages";
import type { ImagesResults } from "@/models/Images";

async function Gallery() {
  const url = "https://api.pexels.com/v1/curated";

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) return <p>No Images Found</p>;
  return (
    <section className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-5">
      {images.photos.map((photo) => (
        <div
          key={photo.id}
          className="w-[300px] h-[400px] bg-gray-500 rounded-xl"
        ></div>
      ))}
    </section>
  );
}

export default Gallery;
