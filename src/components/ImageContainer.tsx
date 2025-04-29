import { Photo } from "@/models/Images";
import Image from "next/image";

type Props = { photo: Photo };

function ImageContainer({ photo }: Props) {
  const widthHeightRatio = photo.height / photo.width;
  const imageHeight = Math.ceil(360 * widthHeightRatio);
  const rowSpan = Math.ceil(imageHeight / 10) + 2;

  return (
    <div className="w-[360px]" style={{ gridRow: `span ${rowSpan}` }}>
      <a href={photo.url} target="_blank" rel="noopener noreferrer">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="object-cover"
            sizes="360px"
          />
        </div>
      </a>
    </div>
  );
}

export default ImageContainer;
