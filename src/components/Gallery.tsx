"use client";
// import type { Media, Photo } from "@/models/mediaSchema";
import { Post } from "@/models/postSchema";
import ImageContainer from "./ImageContainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import useInfiniteScroll from "@/hooks/useInfiniteScroll";
// import { Placeholders } from "./GalleryLoader";

type Props = {
  search?: string;
  collectionId?: string;
  page?: string;
};

function Gallery({ search, collectionId, page = "1" }: Props) {
  const [media, setMedia] = useState<Post[]>([]);
  // const [nextURL, setNextURL] = useState<string | undefined>();
  const searchParams = useSearchParams();

  // const {
  //   loading,
  //   media: fetchedMedia,
  //   observerRef,
  // } = useInfiniteScroll({
  //   next_page: nextURL,
  // });

  const params = new URLSearchParams(searchParams?.toString() || "");
  if (search) params.set("query", search);
  if (collectionId) params.set("collectionId", collectionId);
  params.set("page", String(page));
  const URLParams = `?${params.toString()}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/posts`);
      const data = await res.json();
      if (!data) return;
      // const posts: (Photo | Media)[] =
      //   "media" in data ? data.media : data.photos;
      // setNextURL(data.next_page);
      setMedia(data.posts);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   setMedia((prev) => {
  //     const existingIds = new Set(prev.map((item) => item.id));
  //     const newItems = fetchedMedia.filter((item) => !existingIds.has(item.id));
  //     return [...prev, ...newItems];
  //   });
  // }, [fetchedMedia]);

  if (!media) return <p>No Images Found</p>;

  return (
    <>
      <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
        {media.map((post) => (
          <ImageContainer post={post} key={post.id} />
        ))}
        {/* {loading && <Placeholders />} */}
      </div>
      {/* <div ref={observerRef}></div> */}
    </>
  );
}

export default Gallery;
