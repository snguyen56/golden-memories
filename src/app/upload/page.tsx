import Dropzone from "@/components/Dropzone";

function page() {
  return (
    <main className="text-center">
      <h2 className="mb-2 text-3xl font-bold text-black">File Upload</h2>
      <p>Upload your favorite photos and organize them into collections</p>
      <div className="mt-8 grid w-full place-items-center px-4">
        <Dropzone></Dropzone>
      </div>
    </main>
  );
}

export default page;
