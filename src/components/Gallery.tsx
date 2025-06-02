"use client";
import { Post } from "@/models/postSchema";
import ImageContainer from "./ImageContainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Placeholders } from "./GalleryLoader";
import { authClient } from "@/utils/auth-client";

type Props = {
  search?: string;
  collectionId?: string;
};

function Gallery({ search, collectionId }: Props) {
  const [media, setMedia] = useState<Post[]>([]);
  const [nextURL, setNextURL] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const { data: session } = authClient.useSession();

  const {
    loading,
    media: fetchedMedia,
    observerRef,
  } = useInfiniteScroll({
    next_page: nextURL,
  });

  const params = new URLSearchParams(searchParams?.toString() || "");
  if (search) params.set("query", search);
  if (collectionId) params.set("collectionId", collectionId);
  const URLParams = `?${params.toString()}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/posts${URLParams}`);
      const data = await res.json();
      if (!data) return;
      setMedia(data.posts);
      setNextURL(data.nextCursor);
    };
    fetchData();
  }, [URLParams]);

  useEffect(() => {
    setMedia((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newItems = fetchedMedia.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });
  }, [fetchedMedia]);

  if (!media) return <p>No Images Found</p>;

  return (
    <>
      <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
        {media.map((post) => (
          <ImageContainer post={post} key={post.id} userId={session?.user.id} />
        ))}
        {loading && <Placeholders />}
      </div>
      <div ref={observerRef}></div>
    </>
  );
}

export default Gallery;
