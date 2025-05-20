"use client";
import { Photo, Media } from "@/models/mediaSchema";
import Image from "next/image";
import { useRef, useState } from "react";
import { openDialog } from "./Modal";
import InfoModal from "./InfoModal";

type Props = { media: Photo | Media };

function ImageContainer({ media }: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const widthHeightRatio = media.height / media.width;
  const imageHeight = Math.ceil(360 * widthHeightRatio);
  const rowSpan = Math.ceil(imageHeight / 10) + 2;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const overlayStyle =
    "relative flex w-full justify-between from-black/30 to-black/0 p-2 pl-4 transition-all ease-in-out";

  const isPhoto = (media: Photo | Media): media is Photo =>
    "src" in media && "alt" in media;

  const imageURL = isPhoto(media) ? media.src.large : media.image;
  const alt = isPhoto(media) ? media.alt : "Video Thumbnail";
  const photographer = isPhoto(media) ? media.photographer : media.user.name;
  const photographer_url = isPhoto(media)
    ? media.photographer_url
    : media.user.url;
  const url = media.url;

  return (
    <div className="w-90" style={{ gridRow: `span ${rowSpan}` }}>
      <div className="relative cursor-pointer overflow-hidden rounded-xl">
        {media.type === "Video" ? (
          <video
            ref={videoRef}
            width={media.width}
            height={media.height}
            poster={imageURL}
            muted
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              event.currentTarget.play();
            }}
          >
            <source
              src={media.video_files[0].link}
              type={media.video_files[0].file_type}
            />
          </video>
        ) : (
          <Image
            src={imageURL}
            alt={alt}
            width={media.width}
            height={media.height}
            className="h-full w-full object-cover"
            sizes="360px"
          />
        )}
        <div
          className="group absolute top-0 flex h-full w-full flex-col justify-between text-white"
          onMouseOver={() => videoRef.current?.play()}
          onMouseOut={() => videoRef.current?.pause()}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              openDialog(dialogRef);
            }
          }}
        >
          <div
            className={`${overlayStyle} -top-full bg-linear-to-b group-hover:top-0`}
          >
            <a
              href={photographer_url}
              title={photographer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-w-1/2 gap-2 truncate hover:underline"
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              {photographer}
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                title="Like"
                className="cursor-pointer rounded-lg p-1 hover:bg-black/30"
                onClick={() => {
                  setLiked((prev) => !prev);
                }}
              >
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#dc2626"
                    className="size-6"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="Download"
                aria-label="Download Link"
                className="rounded-lg p-1 hover:bg-black/30"
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
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            className={`${overlayStyle} top-full bg-linear-to-t group-hover:top-0`}
          >
            <p className="max-w-1/2 truncate">{alt}</p>
          </div>
        </div>
        {media.type === "Video" && (
          <div className="absolute right-1 bottom-1 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </div>
        )}
      </div>
      <InfoModal
        dialogRef={dialogRef}
        media={media}
        liked={liked}
        setLiked={setLiked}
      />
    </div>
  );
}

export default ImageContainer;
