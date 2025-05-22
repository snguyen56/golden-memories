import { Video as VideoSchema } from "@/models/mediaSchema";
import { RefObject } from "react";

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  video: VideoSchema;
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
      poster={video.image}
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
        src={video.video_files[0].link}
        type={video.video_files[0].file_type}
      />
    </video>
  );
}

export default Video;
