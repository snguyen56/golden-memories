import fetchImages from "@/utils/fetchImages";
import type { Media, Photo } from "@/models/mediaSchema";
import ImageContainer from "./ImageContainer";
import Pagination from "./Pagination";

type Props = {
  search?: string;
  collectionId?: string;
};

function buildURL({ search, collectionId }: Props) {
  if (search) {
    return `https://api.pexels.com/v1/search?query=${search}`;
  } else if (collectionId) {
    return `https://api.pexels.com/v1/collections/${collectionId}`;
  }
  return "https://api.pexels.com/v1/curated";
}

async function Gallery({ search, collectionId }: Props) {
  const url = buildURL({ search, collectionId });
  const data = await fetchImages(url);

  if (!data) return <p>No Images Found</p>;

  const posts: (Photo | Media)[] = "media" in data ? data.media : data.photos;
  return (
    <>
      <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
        {posts.map((post) => (
          <ImageContainer media={post} key={post.id} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination page={1} />
      </div>
    </>
  );
}

export default Gallery;
