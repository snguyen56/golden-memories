import { Photo } from "@/models/Images";
import Image from "next/image";

type Props = { photo: Photo };

function ImageContainer({ photo }: Props) {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl">
      <Image
        src={photo.src.large}
        alt={photo.alt}
        fill
        className="object-cover hover:opacity-40"
        sizes="(min-width: 1540px) 366px,
            (min-width: 1280px) 411px,
            (min-width: 1040px) 500px,
            (min-width: 780px) 372px,
            (min-width: 680px) 640px,
            (min-width: 400px) calc(92.31vw + 31px),
            calc(25vw + 285px)"
      />
    </div>
  );
}

export default ImageContainer;
