import Dropzone from "@/components/Dropzone";
import { db } from "@/db";
import { collection } from "@/db/schema";

async function page() {
  const allCollections = await db
    .select({ collectionName: collection.id })
    .from(collection);
  const options: string[] = allCollections.map((c) => c.collectionName);
  return (
    <div className="mb-14 text-center">
      <h2 className="mb-2 text-3xl font-bold text-black">File Upload</h2>
      <p>Upload your favorite photos and organize them into collections</p>
      <div className="mt-8 grid place-items-center px-4">
        <Dropzone collectionNames={options} />
      </div>
    </div>
  );
}

export default page;
