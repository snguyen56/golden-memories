"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";

interface CarouselProps {
  slides: {
    id: number;
    color: string;
  }[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const slideWidth = width * (2 / 3);
  const slideGap = 20;

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
        controls.start({
          x: -currentIndex * (width + slideGap),
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, controls, width]);

  const dragConstraints = {
    left: -((slides.length - 1) * (slideWidth + slideGap)),
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

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

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
  }, [currentIndex]);

  useEffect(() => {
    controls.start({
      x: -currentIndex * (slideWidth + slideGap),
    });
  }, [controls, currentIndex, slideWidth]);

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-label="Image carousel"
      ref={carouselRef}
    >
      <div className="relative h-[300px] w-full overflow-hidden md:h-[400px] lg:h-[500px]">
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
        >
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="flex h-[90%] flex-shrink-0 items-center justify-center"
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
                className="flex h-full w-full items-center justify-center rounded-lg text-2xl font-bold text-white shadow-lg"
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
        className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 ${currentIndex === 0 ? "cursor-not-allowed opacity-50" : "opacity-100"}`}
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
        className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 ${
          currentIndex === slides.length - 1
            ? "cursor-not-allowed opacity-50"
            : "opacity-100"
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
