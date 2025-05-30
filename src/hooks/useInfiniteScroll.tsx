import { Post } from "@/models/postSchema";
import { useEffect, useRef, useState } from "react";

type Props = {
  next_page?: string | undefined;
};

function useInfiniteScroll({ next_page }: Props) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string | null | undefined>(
    next_page,
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!nextPage || loading) return;

    const fetchNextPage = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (nextPage) {
          params.set("cursor", nextPage);
        }
        const searchParams = params.toString();
        const res = await fetch(`/api/posts?${searchParams}`);
        const data = await res.json();
        if (!data) {
          setLoading(false);
          return;
        }
        setMedia(data.posts);
        setNextPage(data.nextCursor);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage && !loading) {
        fetchNextPage();
      }
    });
    const targetElement = observerRef.current;
    if (targetElement) observer.observe(targetElement);
    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [nextPage, loading]);

  useEffect(() => {
    setMedia([]);
    setNextPage(next_page ?? null);
  }, [next_page]);

  return { loading, media, observerRef };
}

export default useInfiniteScroll;
