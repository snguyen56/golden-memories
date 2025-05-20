import { Photo, Media } from "@/models/mediaSchema";
import Modal, { closeDialog } from "./Modal";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import ShareButton from "./ShareButton";
import Video from "./Video";

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  media: Photo | Media;
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
};

function InfoModal({ dialogRef, media, liked, setLiked }: Props) {
  const [openShare, setOpenShare] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPhoto = (media: Photo | Media): media is Photo =>
    "src" in media && "alt" in media;

  const imageURL = isPhoto(media) ? media.src.large : media.image;
  const alt = isPhoto(media) ? media.alt : "Video Thumbnail";
  const photographer = isPhoto(media) ? media.photographer : media.user.name;

  return (
    <Modal dialogRef={dialogRef}>
      <div className="mx-auto my-15 rounded-xl bg-white text-zinc-600 md:w-8/10">
        <div className="relative flex h-full flex-col items-center p-10">
          <div className="mb-8 flex w-full justify-between">
            <div className="flex grow items-center gap-2 text-black">
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
              <p className="max-w-1/2 truncate text-lg font-semibold">
                {photographer}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex cursor-pointer gap-2 rounded-lg border p-2 font-semibold hover:bg-zinc-100"
                onClick={() => setOpenShare(true)}
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
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
                <p className="hidden md:block">Share</p>
              </button>
              <button
                type="button"
                className="flex cursor-pointer gap-2 rounded-lg border p-2 font-semibold hover:bg-zinc-100"
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
                <p className="hidden md:block">Like</p>
              </button>
              <button
                type="button"
                className="flex cursor-pointer gap-2 rounded-lg border p-2 font-semibold hover:bg-zinc-100"
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
                <p className="hidden md:block">Download</p>
              </button>
            </div>
          </div>
          {media.type === "Video" ? (
            <div className="mx-auto aspect-video md:w-3/4">
              <Video videoRef={videoRef} video={media} controls={true} />
            </div>
          ) : (
            <div className="w-full md:w-auto">
              <Image
                src={imageURL}
                alt={alt}
                width={media.width}
                height={media.height}
                className="h-full w-full object-contain"
                sizes="100vw"
              />
            </div>
          )}

          <div className="mt-8 w-full">
            <h3 className="text-2xl font-bold text-black">Comments</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              placeat cupiditate consequuntur sapiente deleniti, suscipit animi
              distinctio illum explicabo odit eligendi aliquid necessitatibus
              error qui quas voluptates quisquam laborum sit.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close Modal"
            className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-zinc-100"
            onClick={() => {
              closeDialog(dialogRef);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <ShareButton isOpen={openShare} setIsOpen={setOpenShare} media={media} />
    </Modal>
  );
}

export default InfoModal;
