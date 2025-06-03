import { Collection } from "@/models/collectionSchema";
import Image from "next/image";
import Link from "next/link";

type Props = {
  collection: Collection;
};

async function collectionContainer({ collection }: Props) {
  const cover = collection.cover;
  if (cover)
    return (
      <div className="group relative w-80">
        <Link href={`/collections/${encodeURIComponent(collection.id)}`}>
          <div className="h-44 w-full overflow-hidden rounded-xl">
            {/* {cover.type === "Photo" && ( */}
            <Image
              src={cover.url}
              alt={cover.name}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover"
              sizes="320px"
            />
            {/* )}
            {cover.type === "video" && (
              <Image
                src={cover.image}
                alt={cover.id.toString()}
                width={cover.width}
                height={cover.height}
                className="h-full w-full object-cover"
                sizes="320px"
              />
            )} */}
          </div>
          <div className="absolute top-0 hidden h-44 w-full rounded-xl bg-black opacity-30 group-hover:block"></div>
          <h3 className="mt-1 p-2 text-2xl font-semibold">{collection.id}</h3>
        </Link>
      </div>
    );
}

export default collectionContainer;
