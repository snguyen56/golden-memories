import fetchImages from "@/utils/fetchImages";
import type { Media, Photo } from "@/models/mediaSchema";
import ImageContainer from "./ImageContainer";

type Props = {
  search?: string;
  collectionId?: string;
};

async function Gallery({ search, collectionId }: Props) {
  let url = "https://api.pexels.com/v1/curated";
  if (search) {
    url = `https://api.pexels.com/v1/search?query=${search}`;
  } else if (collectionId) {
    url = `https://api.pexels.com/v1/collections/${collectionId}`;
  }

  const data = await fetchImages(url);

  if (!data) return <p>No Images Found</p>;

  if (data) {
    const posts: (Photo | Media)[] = "media" in data ? data.media : data.photos;
    return (
      <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
        {posts.map((post) => (
          <ImageContainer media={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default Gallery;
