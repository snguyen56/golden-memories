import CollectionContainer from "@/components/CollectionContainer";
import { Collection } from "@/models/collectionSchema";
// import Pagination from "@/components/Pagination";
// import { CollectionsResults } from "@/models/mediaSchema";
// import fetchCollections from "@/utils/fetchCollections";
import { Metadata } from "next";

// type Props = {
//   searchParams: Promise<{ [key: string]: string }>;
// };

export const metadata: Metadata = {
  title: "Collections | Golden Memories",
};

async function page() {
  // const { page = "1" } = await searchParams;
  // const albums: CollectionsResults | undefined = await fetchCollections(
  //   parseInt(page),
  // );
  const url = process.env.BETTER_AUTH_URL!;
  console.log("FETCHING:", `${url}/api/collections`);
  const res = await fetch(`${url}/api/collections`);
  const data = await res.json();
  const albums = data.collections;
  if (!albums) return <p>No Collections Found</p>;
  // const totalPages = Math.ceil(albums.total_results / 15) - 1;
  return (
    <div className="mb-4">
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
      {/* <div className="mt-10">
        <Pagination page={parseInt(page)} totalPages={totalPages} />
      </div> */}
    </div>
  );
}

export default page;
