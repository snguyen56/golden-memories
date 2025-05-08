function collectionContainer() {
  return (
    <div className="group relative size-80">
      <div className="h-70 w-full rounded-xl bg-amber-200"></div>
      <div className="absolute top-0 hidden h-70 w-full rounded-xl bg-black opacity-10 group-hover:block"></div>
      <h3 className="mt-1 p-2 text-2xl font-semibold">Container Title</h3>
    </div>
  );
}

export default collectionContainer;
