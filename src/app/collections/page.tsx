import CollectionContainer from "@/components/CollectionContainer";
import { CollectionsResults } from "@/models/mediaSchema";
import fetchCollections from "@/utils/fetchCollections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Golden Memories",
};

async function page() {
  const albums: CollectionsResults | undefined = await fetchCollections();
  return (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-black">Collections</h2>
      <div className="mt-4 grid place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {albums ? (
          albums.collections.map((collection) => (
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
