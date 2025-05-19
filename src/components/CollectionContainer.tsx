import { Collection } from "@/models/Images";
import { fetchCover } from "@/utils/fetchMedia";
import Image from "next/image";

type Props = {
  collection: Collection;
};

async function collectionContainer({ collection }: Props) {
  const cover = await fetchCover(collection.id, 1);
  if (cover)
    return (
      <div className="group relative w-80">
        <div className="h-44 w-full overflow-hidden rounded-xl">
          {cover.type === "Photo" && (
            <Image
              src={cover.src.large}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover"
              sizes="320px"
            />
          )}
          {cover.type === "Video" && (
            <Image
              src={cover.video_pictures.picture}
              alt={cover.id.toString()}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover"
              sizes="320px"
            />
          )}
        </div>
        <div className="absolute top-0 hidden h-44 w-full rounded-xl bg-black opacity-30 group-hover:block"></div>
        <h3 className="mt-1 p-2 text-2xl font-semibold">{collection.title}</h3>
      </div>
    );
}

export default collectionContainer;
