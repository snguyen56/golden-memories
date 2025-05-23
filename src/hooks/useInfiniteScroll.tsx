import { Photo, Media } from "@/models/mediaSchema";
import fetchImages from "@/utils/fetchImages";
import { useEffect, useRef, useState } from "react";

type Props = {
  next_page?: string | undefined;
};

function useInfiniteScroll({ next_page }: Props) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<(Photo | Media)[]>([]);
  const [nextPage, setNextPage] = useState(next_page);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!nextPage || loading) return;

    const fetchNextPage = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(nextPage);
        if (!data) {
          setLoading(false);
          return;
        }
        const posts: (Photo | Media)[] =
          "media" in data ? data.media : data.photos;
        setMedia((prev) => [...prev, ...posts]);
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

  return { loading, media, observerRef };
}

export default useInfiniteScroll;
