"use client";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextInput from "./TextInput";

type fileData = {
  id: string;
  file: File;
  preview: string;
  name: string;
  collection: string;
};

function Dropzone() {
  const [files, setFiles] = useState<fileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<fileData | null>();

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles: fileData[] = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name.split(".")[0],
        collection: "",
      }));
      setFiles((prev) => {
        return [...prev, ...newFiles];
      });
      if (!selectedFile && newFiles.length > 0) {
        setSelectedFile(newFiles[0]);
      }
    },
  });

  const handleSelectFile = (file: fileData) => {
    setSelectedFile(file);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);
      if (updatedFiles.length > 0 && selectedFile?.id == id) {
        setSelectedFile(files[0]);
      }
      if (updatedFiles.length === 0) {
        setSelectedFile(null);
      }
      return updatedFiles;
    });
  };
  if (files.length == 0)
    return (
      <div
        className="grid h-100 w-full max-w-4xl cursor-pointer place-items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-500"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-1 text-xl">
          <p>
            Drag n drop some files <br /> or
          </p>
          <button
            type="button"
            className="flex h-10 w-28 cursor-pointer items-center justify-center rounded-lg border bg-white text-black transition-all ease-in-out hover:bg-black hover:text-white"
          >
            Click here
          </button>
        </div>
      </div>
    );
  else
    return (
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
        }}
      >
        <div className="grid h-full grid-cols-1 gap-6 rounded-xl border p-8 md:grid-cols-[1fr_2fr] lg:w-4xl">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Photos</h3>
              <button
                type="button"
                onClick={open}
                className="flex w-30 cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white p-1 text-black transition-all ease-in-out hover:bg-zinc-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                Add Files
              </button>
              <input {...getInputProps()} />
            </div>
            <div className="mt-4 flex max-h-68 space-y-2 gap-x-2 overflow-auto rounded border bg-zinc-100 p-2 md:max-h-150 md:max-w-68 md:flex-col md:gap-x-0">
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`group relative h-35 w-50 shrink-0 overflow-hidden rounded bg-white md:h-auto md:w-auto md:min-w-0 ${file.id === selectedFile?.id ? "ring-2" : ""}`}
                  onClick={() => handleSelectFile(file)}
                >
                  <div className="aspect-video">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p>{file.name}</p>
                  <button
                    type="button"
                    className="absolute top-1 right-1 hidden cursor-pointer rounded-full bg-black/50 group-hover:block"
                    onClick={(event: React.SyntheticEvent) => {
                      event.stopPropagation();
                      handleDelete(file.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-black">Photo Details</h3>
            <div className="max-h-100 max-w-135 overflow-hidden rounded-xl border bg-zinc-200">
              <img
                src={selectedFile?.preview}
                alt={selectedFile?.name}
                className="h-full w-full object-contain"
              />
            </div>
            <TextInput
              type="text"
              name="photo-name"
              id="photo-name"
              label="Photo Name"
            ></TextInput>
            <TextInput
              type="text"
              name="collection"
              id="collection"
              label="Collection"
            ></TextInput>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 ml-auto flex w-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black p-2 text-white transition-all ease-in-out hover:bg-zinc-700 active:scale-95"
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </button>
      </form>
    );
}

export default Dropzone;
