import CollectionContainer from "@/components/CollectionContainer";
import { CollectionsResults } from "@/models/Images";
import fetchCollections from "@/utils/fetchCollections";

async function page() {
  const albums: CollectionsResults | undefined = await fetchCollections();
  return (
    <main>
      <h2 className="text-3xl font-bold text-black">Collections</h2>
      <div className="mt-4 grid place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {albums ? (
          albums.collections.map((collection) => (
            <CollectionContainer key={collection.id} collection={collection} />
          ))
        ) : (
          <p>No Images Found</p>
        )}
      </div>
    </main>
  );
}

export default page;
