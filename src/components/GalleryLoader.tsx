function GalleryLoader() {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="row-span-29 h-64 w-[360] animate-pulse rounded-xl bg-gray-300"
        ></div>
      ))}
    </>
  );
}

export default GalleryLoader;
