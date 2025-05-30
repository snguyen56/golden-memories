"use client";
import Carousel from "@/components/Carousel";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Post } from "@/models/postSchema";
import { useState, useEffect } from "react";

function Page() {
  const [media, setMedia] = useState<Post[]>([]);
  const [nextURL, setNextURL] = useState<string | undefined>();

  const {
    loading,
    media: fetchedMedia,
    observerRef,
  } = useInfiniteScroll({
    next_page: nextURL,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/posts`);
      const data = await res.json();
      if (!data) return;
      setMedia(data.posts);
      setNextURL(data.nextCursor);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMedia((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newItems = fetchedMedia.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });
  }, [fetchedMedia]);

  if (media.length === 0) return <p>No Images Found</p>;

  return (
    <div className="mb-14 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-black">Slide Show</h2>
      <div className="w-full max-w-4xl">
        <Carousel posts={media} observerRef={observerRef} loading={loading} />
      </div>
    </div>
  );
}

export default Page;
