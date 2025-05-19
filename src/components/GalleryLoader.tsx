function GalleryLoader() {
  return (
    <div className="mt-5 grid w-full auto-rows-[10px] grid-cols-[repeat(auto-fit,360px)] place-items-center justify-center gap-x-5">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="row-span-29 h-64 w-[360] animate-pulse rounded-xl bg-gray-300"
        ></div>
      ))}
    </div>
  );
}

export default GalleryLoader;
