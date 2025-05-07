import Gallery from "@/components/Gallery";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `Results for ${(await searchParams).query} | Golden Memories`,
  };
}

async function page({ searchParams }: Props) {
  const search = (await searchParams).query;
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">
        Search Results for {search}
      </h2>
      <Gallery search={search} />
    </div>
  );
}

export default page;
