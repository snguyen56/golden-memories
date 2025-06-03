import { Post } from "@/models/postSchema";
import { RefObject } from "react";

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  video: Post;
  controls?: boolean;
};

export const playVideo = (videoRef: RefObject<HTMLVideoElement | null>) => {
  if (videoRef.current) {
    videoRef.current.play();
  }
};

export const pauseVideo = (videoRef: RefObject<HTMLVideoElement | null>) => {
  if (videoRef.current) {
    videoRef.current.pause();
  }
};

function Video({ videoRef, video, controls = false }: Props) {
  return (
    <video
      ref={videoRef}
      width={video.width}
      height={video.height}
      controls={controls}
      muted
      playsInline
      className="object-cover"
      onEnded={(event) => {
        event.currentTarget.currentTime = 0;
        event.currentTarget.play();
      }}
    >
      <source
        src={video.url}
        type={
          video.format === "mov"
            ? "video/quicktime"
            : video.format === "mp4"
              ? "video/mp4"
              : `video/${video.format}`
        }
      />
      Your browser does not support the video type
    </video>
  );
}

export default Video;
