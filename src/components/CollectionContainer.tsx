import { Collection } from "@/models/mediaSchema";
import { fetchCover } from "@/utils/fetchMedia";
import Image from "next/image";
import Link from "next/link";

type Props = {
  collection: Collection;
};

async function collectionContainer({ collection }: Props) {
  const cover = await fetchCover(collection.id, 1);
  if (cover)
    return (
      <div className="group relative w-80">
        <Link href={`/collections/${collection.id}`}>
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
                src={cover.image}
                alt={cover.id.toString()}
                width={cover.width}
                height={cover.height}
                className="h-full w-full object-cover"
                sizes="320px"
              />
            )}
          </div>
          <div className="absolute top-0 hidden h-44 w-full rounded-xl bg-black opacity-30 group-hover:block"></div>
          <h3 className="mt-1 p-2 text-2xl font-semibold">
            {collection.title}
          </h3>
        </Link>
      </div>
    );
}

export default collectionContainer;
