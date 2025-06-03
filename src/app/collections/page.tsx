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
          resourceType: true,
        },
        limit: 1,
      },
    },
    limit: 16,
  });

  const collections = collectionsWithCover
    .map((collection) => ({
      ...collection,
      cover: collection.posts[0] || null,
      posts: undefined,
    }))
    .filter((collection) => collection.cover !== null);

  const albums = collections;

  return (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-black">Collections</h2>
      {!albums || albums.length === 0 ? (
        <p>No Collections Found</p>
      ) : (
        <div className="mt-4 grid place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {albums.map((collection: Collection) => (
            <CollectionContainer key={collection.id} collection={collection} />
          ))}
        </div>
      )}
      {/* <div className="mt-10">
        <nav
          className="flex justify-center"
          aria-label="Pagination"
          role="navigation"
        >
          <ul className="flex gap-0.5 md:gap-2">
            <li>
              <Link
                href={""}
                aria-disabled={!cursor}
                tabIndex={!cursor ? -1 : 0}
                className={`flex h-10 min-w-10 place-items-center rounded-lg p-2 hover:bg-zinc-200 ${!cursor ? "pointer-events-none opacity-50" : ""} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                <span className="hidden md:inline">Previous</span>
              </Link>
            </li>
            <li>
              <Link
                href={`?cursor=${nextCursor}`}
                aria-disabled={!nextCursor}
                tabIndex={!nextCursor ? -1 : 0}
                className={`flex h-10 min-w-10 place-items-center rounded-lg p-2 hover:bg-zinc-200 ${!nextCursor ? "pointer-events-none opacity-50" : ""} `}
              >
                <span className="hidden md:inline">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
}

export default page;
