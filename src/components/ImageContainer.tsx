"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { openDialog } from "./Modal";
import InfoModal from "./InfoModal";
import Video, { playVideo, pauseVideo } from "./Video";
import { Post } from "@/models/postSchema";
import { addLike, deleteLike, deletePost } from "@/app/actions";
import downloadFile from "@/utils/downloadMedia";

type Props = { post: Post; userId: string | undefined };

function ImageContainer({ post, userId }: Props) {
  const widthHeightRatio = post.height / post.width;
  const imageHeight = Math.ceil(360 * widthHeightRatio);
  const rowSpan = Math.ceil(imageHeight / 10) + 2;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isliked = post.likes.some((like) => like.userId === userId);
  const [liked, setLiked] = useState<boolean>(isliked);
  const [pending, setPending] = useState(false);

  const handleLike = async () => {
    if (!userId || pending) return;
    const nextLiked = !liked;
    setPending(true);
    setLiked(nextLiked);
    try {
      if (nextLiked) {
        await addLike(userId, post.id);
      } else {
        await deleteLike(userId, post.id);
      }
    } catch (error) {
      console.error("Failed to update like: ", error);
      setLiked(!nextLiked);
    } finally {
      setPending(false);
    }
  };

  const overlayStyle =
    "relative flex w-full justify-between from-black/30 to-black/0 p-2 pl-4 transition-all ease-in-out";

  useEffect(() => {
    setLiked(post.likes.some((like) => like.userId === userId));
  }, [post.likes, userId]);

  return (
    <div className="w-90" style={{ gridRow: `span ${rowSpan}` }}>
      <div className="relative cursor-pointer overflow-hidden rounded-xl">
        {post.resourceType === "video" ? (
          <Video videoRef={videoRef} video={post} />
        ) : (
          <Image
            src={post.url}
            alt={post.name}
            width={post.width}
            height={post.height}
            className="h-full w-full object-cover"
            sizes="360px"
          />
        )}
        <div
          className="group absolute top-0 flex h-full w-full flex-col justify-between text-white"
          onMouseOver={() => playVideo(videoRef)}
          onMouseOut={() => pauseVideo(videoRef)}
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
              href={undefined}
              title={post.user.name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-w-1/2 gap-2 truncate hover:underline"
            >
              <div className="relative size-6 overflow-hidden rounded-full">
                <Image src={post.user.image} alt="user avatar" fill />
              </div>
              {post.user.name}
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                title="Like"
                className="cursor-pointer rounded-lg p-1 hover:bg-black/30"
                onClick={handleLike}
                disabled={pending}
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
              <button
                title="Download"
                aria-label="Download Button"
                className="cursor-pointer rounded-lg p-1 hover:bg-black/30"
                onClick={() => downloadFile(post.name, post.url, post.format)}
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
              </button>
            </div>
          </div>
          <div
            className={`${overlayStyle} top-full items-end bg-linear-to-t group-hover:top-0`}
          >
            <p className="max-w-3/4 truncate">{post.name}</p>
            {post.userId === userId && (
              <button
                type="button"
                title="Delete"
                className={`${post.resourceType === "video" ? "mr-2 -translate-x-full" : ""} cursor-pointer rounded-lg p-1 hover:bg-black/30`}
                onClick={async (event) => {
                  event.stopPropagation();
                  await deletePost(post.id, post.userId, userId);
                  window.location.reload();
                }}
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {post.resourceType === "video" && (
          <div className="absolute right-2 bottom-2" title="video">
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
        post={post}
        userId={userId}
        liked={liked}
        pending={pending}
        handleLike={handleLike}
      />
    </div>
  );
}

export default ImageContainer;
