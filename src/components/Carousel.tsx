"use client";

import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import { motion, useAnimate, type PanInfo } from "framer-motion";
import Image from "next/image";
import { Post } from "@/models/postSchema";

type Props = {
  posts: Post[];
  loading: boolean;
  observerRef: RefObject<HTMLDivElement | null>;
};

export default function Carousel({ posts, loading, observerRef }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();

  const slideWidth = width * (2 / 3);
  const slideGap = 20;
  const totalSlideWidth = slideWidth + slideGap;

  const updatePosition = useCallback(() => {
    animate(
      scope.current,
      { x: -currentIndex * totalSlideWidth },
      { type: "spring", stiffness: 300, damping: 30 },
    );
  }, [animate, scope, currentIndex, totalSlideWidth]);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
        updatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePosition]);

  const dragConstraints = {
    left: -((posts.length - 1) * totalSlideWidth),
    right: 0,
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let newIndex = currentIndex;
    if (Math.abs(offset) > slideWidth / 2 || Math.abs(velocity) > 500) {
      if (offset > 0) {
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        newIndex = Math.min(posts.length - 1, currentIndex + 1);
      }
    }

    setCurrentIndex(newIndex);
  };

  const handleNext = useCallback(() => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex((prevSlide) => prevSlide + 1);
    }
  }, [currentIndex, posts.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevSlide) => prevSlide - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handleNext, handlePrevious]);

  useEffect(() => {
    animate(
      scope.current,
      { x: -currentIndex * totalSlideWidth },
      { type: "spring", stiffness: 300, damping: 30 },
    );
  }, [animate, scope, currentIndex, totalSlideWidth]);

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-label="Image carousel"
      ref={carouselRef}
    >
      <div className="relative h-75 w-full overflow-hidden md:h-100 lg:h-125">
        <motion.div
          className="absolute flex h-full items-center"
          style={{
            gap: `${slideGap}px`,
            paddingLeft: `${(width - slideWidth) / 2}px`,
            paddingRight: `${(width - slideWidth) / 2}px`,
          }}
          drag="x"
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd}
          ref={scope}
        >
          {posts.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex h-9/10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 shadow-lg"
              style={{ width: slideWidth }}
              whileHover={{ cursor: "grab" }}
              whileTap={{ cursor: "grabbing" }}
              animate={{
                scale: currentIndex === index ? 1 : 0.9,
                transition: { duration: 0.3 },
              }}
              ref={index === posts.length - 1 ? observerRef : undefined}
            >
              {item.resourceType === "image" ? (
                <Image
                  src={item.url}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  draggable={false}
                  className="h-full w-full object-cover"
                  aria-label={`Slide ${index + 1} of ${posts.length}`}
                />
              ) : (
                <video
                  width={item.width}
                  height={item.height}
                  playsInline
                  controls
                  muted
                  onEnded={(event) => {
                    event.currentTarget.currentTime = 0;
                    event.currentTarget.play();
                  }}
                >
                  <source
                    src={item.url}
                    type={
                      item.format === "mov"
                        ? "video/quicktime"
                        : item.format === "mp4"
                          ? "video/mp4"
                          : `video/${item.format}`
                    }
                  />
                </video>
              )}
            </motion.div>
          ))}
          {loading && (
            <div
              className="flex h-9/10 flex-shrink-0 scale-80 animate-pulse items-center justify-center overflow-hidden rounded-lg bg-zinc-300 shadow-lg"
              style={{ width: slideWidth }}
            ></div>
          )}
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 h-full w-1/10 bg-linear-to-l to-white"></div>
      <div className="absolute top-0 right-0 h-full w-1/10 bg-linear-to-r to-white"></div>
      <button
        onClick={handlePrevious}
        className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 transition-all hover:bg-white ${currentIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}`}
        aria-label="Previous slide"
        disabled={currentIndex === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 transition-all hover:bg-white ${
          currentIndex === posts.length - 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer opacity-100"
        }`}
        aria-label="Next slide"
        disabled={currentIndex === posts.length - 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
