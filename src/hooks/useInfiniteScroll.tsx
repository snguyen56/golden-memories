import { Photo, Media } from "@/models/mediaSchema";
import { useEffect, useRef, useState } from "react";

type Props = {
  next_page?: string | undefined;
};

function useInfiniteScroll({ next_page }: Props) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<(Photo | Media)[]>([]);
  const [nextPage, setNextPage] = useState(next_page);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchedPages = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!nextPage || loading || fetchedPages.current.has(nextPage)) return;

    const fetchNextPage = async () => {
      setLoading(true);
      console.log("hook fetching");
      try {
        fetchedPages.current.add(nextPage);
        const nextURL = new URL(nextPage);
        const params = nextURL.searchParams.toString();
        const res = await fetch(`/api/pexels?${params}`);
        const data = await res.json();
        if (!data) {
          setLoading(false);
          return;
        }
        const posts: (Photo | Media)[] =
          "media" in data ? data.media : data.photos;
        setMedia([...posts]);
        setNextPage(data.next_page);
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
    setNextPage(next_page);
  }, [next_page]);

  return { loading, media, observerRef };
}

export default useInfiniteScroll;
