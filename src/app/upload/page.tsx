function page() {
  return (
    <main className="text-center">
      <h2 className="mb-2 text-3xl font-bold text-black">File Upload</h2>
      <p>Upload your favorite photos and organize them into collections</p>
      <div className="mt-8 grid h-100 w-full place-items-center px-4">
        <div className="grid h-full w-full max-w-4xl cursor-pointer place-items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-500">
          <div className="flex flex-col items-center justify-center gap-1 text-xl">
            <p className="text-xl">
              Drag n drop some files <br /> or
            </p>
            <button
              type="button"
              className="flex min-h-10 min-w-28 cursor-pointer items-center justify-center rounded-lg border bg-white text-black transition-all ease-in-out hover:bg-black hover:text-white"
            >
              Click here
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
