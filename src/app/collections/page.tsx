import CollectionContainer from "@/components/CollectionContainer";
import { Collection } from "@/models/collectionSchema";
import { Metadata } from "next";
import { db } from "@/db";

export const metadata: Metadata = {
  title: "Collections | Golden Memories",
};

async function page() {
  const collectionsWithCover = await db.query.collection.findMany({
    with: {
      posts: {
        orderBy: (posts, { asc }) => [asc(posts.createdAt)],
        columns: {
          name: true,
          url: true,
          width: true,
          height: true,
        },
        limit: 1,
      },
    },
    limit: 16,
  });

  const collections = collectionsWithCover.map((collection) => ({
    ...collection,
    cover: collection.posts[0] || null,
    posts: undefined,
  }));
  const albums = collections;
  if (!albums) return <p>No Collections Found</p>;
  return (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-black">Collections</h2>
      <div className="mt-4 grid place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {albums ? (
          albums.map((collection: Collection) => (
            <CollectionContainer key={collection.id} collection={collection} />
          ))
        ) : (
          <p>No Collections Found</p>
        )}
      </div>
    </div>
  );
}

export default page;
