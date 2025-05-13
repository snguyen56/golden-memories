"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";

type Props = {
  slides: {
    id: number;
    color: string;
  }[];
};

export default function Carousel({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const slideWidth = width * (2 / 3);
  const slideGap = 20;
  const totalSlideWidth = slideWidth + slideGap;

  const calculatePosition = useCallback(
    (index: number) => {
      return -index * totalSlideWidth;
    },
    [totalSlideWidth],
  );

  const updatePosition = useCallback(() => {
    controls.start({
      x: calculatePosition(currentIndex),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [controls, calculatePosition, currentIndex]);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
        requestAnimationFrame(() => {
          updatePosition();
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePosition]);

  const dragConstraints = {
    left: -((slides.length - 1) * totalSlideWidth),
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
        newIndex = Math.min(slides.length - 1, currentIndex + 1);
      }
    }

    setCurrentIndex(newIndex);
  };

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevSlide) => prevSlide + 1);
    }
  }, [currentIndex, slides.length]);

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
    controls.start({
      x: -currentIndex * totalSlideWidth,
    });
  }, [controls, currentIndex, totalSlideWidth]);

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
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="flex h-9/10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-lg"
              style={{ width: slideWidth }}
              whileHover={{ cursor: "grab" }}
              whileTap={{ cursor: "grabbing" }}
              animate={{
                scale: currentIndex === index ? 1 : 0.8,
                opacity: currentIndex === index ? 1 : 0.7,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="flex h-full w-full items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: slide.color }}
                aria-label={`Slide ${index + 1} of ${slides.length}`}
              >
                Slide {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={handlePrevious}
        className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 ${currentIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}`}
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
        className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 ${
          currentIndex === slides.length - 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer opacity-100"
        }`}
        aria-label="Next slide"
        disabled={currentIndex === slides.length - 1}
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
