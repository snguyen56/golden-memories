import Carousel from "@/components/Carousel";
import { ImagesResults } from "@/models/Images";
import fetchImages from "@/utils/fetchImages";

async function page() {
  const images: ImagesResults | undefined = await fetchImages(
    "https://api.pexels.com/v1/curated",
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-black">Slide Show</h2>
      <div className="w-full max-w-4xl">
        {images ? <Carousel images={images} /> : <p>No Images Found</p>}
      </div>
    </div>
  );
}

export default page;
