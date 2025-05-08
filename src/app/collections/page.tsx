import CollectionContainer from "@/components/CollectionContainer";

function page() {
  return (
    <main>
      <h2 className="text-3xl font-bold text-black">Collections</h2>
      <div className="mt-4 grid place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 5 }, (_, index) => (
          <CollectionContainer key={index} />
        ))}
      </div>
    </main>
  );
}

export default page;
