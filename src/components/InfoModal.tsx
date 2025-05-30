import Modal, { closeDialog } from "./Modal";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import ShareButton from "./ShareButton";
import Video from "./Video";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { Post } from "@/models/postSchema";

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  post: Post;
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
};

const commentSchema = z.object({
  comment: z.string().trim().nonempty({ message: "Comment cannot be empty" }),
});
type commentInput = z.infer<typeof commentSchema>;

function InfoModal({ dialogRef, post, liked, setLiked }: Props) {
  const [openShare, setOpenShare] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const comments = [
    {
      id: 1,
      body: "This is some awesome thinking!",
      postId: 242,
      likes: 3,
      user: { id: 105, username: "emmac", fullName: "Emma Wilson" },
    },
    {
      id: 2,
      body: "What terrific math skills you're showing!",
      postId: 46,
      likes: 4,
      user: { id: 183, username: "cameronp", fullName: "Cameron Perez" },
    },
    {
      id: 3,
      body: "You are an amazing writer!",
      postId: 235,
      likes: 2,
      user: { id: 1, username: "emilys", fullName: "Emily Johnson" },
    },
    {
      id: 4,
      body: "Wow! You have improved so much!",
      postId: 31,
      likes: 1,
      user: {
        id: 89,
        username: "braydenf",
        fullName: "Brayden Fleming",
      },
    },
    {
      id: 5,
      body: "Nice idea!",
      postId: 212,
      likes: 1,
      user: { id: 149, username: "wyattp", fullName: "Wyatt Perry" },
    },
    {
      id: 6,
      body: "You are showing excellent understanding!",
      postId: 184,
      likes: 5,
      user: { id: 110, username: "danielt", fullName: "Daniel Taylor" },
    },
    {
      id: 7,
      body: "This is clear, concise, and complete!",
      postId: 172,
      likes: 1,
      user: { id: 4, username: "jamesd", fullName: "James Davis" },
    },
    {
      id: 8,
      body: "What a powerful argument!",
      postId: 233,
      likes: 0,
      user: { id: 145, username: "lukec", fullName: "Luke Cooper" },
    },
    {
      id: 9,
      body: "I knew you could do it!",
      postId: 207,
      likes: 3,
      user: { id: 207, username: "jaces", fullName: "Jace Smith" },
    },
    {
      id: 10,
      body: "Wonderful ideas!",
      postId: 87,
      likes: 0,
      user: { id: 86, username: "noram", fullName: "Nora Mills" },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
    mode: "onBlur",
  });

  const actionStyle =
    "flex cursor-pointer gap-2 rounded-lg border p-2 font-semibold hover:bg-zinc-100";

  const onSubmit = (data: commentInput) => {
    alert("Comment submitted!: " + JSON.stringify(data));
  };

  return (
    <Modal dialogRef={dialogRef}>
      <div className="mx-auto my-15 rounded-xl bg-white text-zinc-600 md:w-8/10">
        <div className="relative flex h-full flex-col items-center p-5 pt-10 sm:p-10">
          <div className="mb-8 flex w-full justify-between">
            <div className="flex grow items-center gap-2 overflow-hidden text-black">
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
                {post.user.name}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className={actionStyle}
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
                className={actionStyle}
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
              <a
                href={undefined}
                target="_blank"
                rel="noopener noreferrer"
                title="Download"
                aria-label="Download Link"
                className={actionStyle}
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
              </a>
            </div>
          </div>
          {post.resourceType === "Video" ? (
            <div className="mx-auto aspect-video md:w-3/4">
              <Video videoRef={videoRef} video={post} controls={true} />
            </div>
          ) : (
            <div className="relative aspect-square w-full lg:max-w-1/2">
              <Image
                src={post.url}
                alt={post.name}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          )}

          <div className="mt-8 w-full">
            <h3 className="text-2xl font-bold text-black">Comments</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-5 flex flex-col gap-1"
            >
              <TextInput
                type="text"
                name="comment"
                id="comment"
                label="comment"
                placeholder="Add a comment..."
                register={register}
                error={errors.comment}
              />
              <button
                type="submit"
                className="ml-auto cursor-pointer rounded-lg border bg-black p-2 text-white transition-all ease-in-out hover:bg-zinc-800"
              >
                Comment
              </button>
            </form>
            <div className="space-y-5 p-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-1 rounded-lg bg-zinc-200 p-2 text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <div>
                    <h4 className="font-semibold text-black">
                      {comment.user.fullName}
                    </h4>
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <ShareButton isOpen={openShare} setIsOpen={setOpenShare} post={post} />
    </Modal>
  );
}

export default InfoModal;
