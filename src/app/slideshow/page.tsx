import Carousel from "@/components/Carousel";
import {
  ImagesResults,
  Media,
  MediaResults,
  Photo,
} from "@/models/mediaSchema";
import fetchImages from "@/utils/fetchImages";

async function page() {
  const data: MediaResults | ImagesResults | undefined = await fetchImages(
    "https://api.pexels.com/v1/curated",
  );

  if (data) {
    const posts: (Photo | Media)[] = "media" in data ? data.media : data.photos;

    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-black">Slide Show</h2>
        <div className="w-full max-w-4xl">
          {data ? <Carousel media={posts} /> : <p>No Images Found</p>}
        </div>
      </div>
    );
  }
}

export default page;
