"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextInput from "./TextInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";

const fileSchema = z.object({
  id: z.string(),
  name: z.string().trim().nonempty("Name is required"),
  collection: z.string().trim().optional(),
  preview: z.string(),
  file: z.any(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const formSchema = z.object({
  files: z.array(fileSchema).min(1, { message: "At least 1 file is required" }),
});

type dropzoneData = z.infer<typeof formSchema>;

function Dropzone() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<dropzoneData>({
    resolver: zodResolver(formSchema),
    defaultValues: { files: [] },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const watchFiles = watch("files");

  useEffect(() => {
    return () => {
      watchFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [watchFiles]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        const myImage = new window.Image();
        const imageSource = URL.createObjectURL(file);
        myImage.src = imageSource;
        return {
          id: crypto.randomUUID(),
          name: file.name.split(".")[0],
          collection: "",
          preview: imageSource,
          file: File,
          width: myImage.width,
          height: myImage.height,
        };
      });

      newFiles.forEach((file) => append(file));

      if (selectedIndex === null && newFiles.length > 0) {
        setSelectedIndex(0);
      }
    },
  });

  const handleSelectFile = (index: number) => {
    setSelectedIndex(index);
  };

  const handleDelete = (index: number) => {
    remove(index);
    if (selectedIndex === index && fields.length > 0) {
      setSelectedIndex(0);
    } else if (fields.length === 0) {
      setSelectedIndex(null);
    }
  };

  const onSubmit = (data: dropzoneData) => {
    console.log("Submitting files", data.files);
  };

  if (fields.length === 0)
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            {fields.map((file, index) => (
              <div
                key={file.id}
                className={`group relative h-35 w-50 shrink-0 overflow-hidden rounded bg-white md:h-auto md:w-auto md:min-w-0 ${
                  selectedIndex === index ? "ring-2" : ""
                }`}
                onClick={() => handleSelectFile(index)}
              >
                <div className="aspect-video">
                  <Image
                    src={watchFiles[index].preview}
                    alt={watchFiles[index].name}
                    width={watchFiles[index].width}
                    height={watchFiles[index].height}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p>{watchFiles[index]?.name}</p>
                <button
                  type="button"
                  aria-label="Delete photo"
                  title="Delete photo"
                  className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 md:hidden md:group-hover:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
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
          {selectedIndex !== null && watchFiles[selectedIndex] && (
            <>
              <div className="max-h-100 max-w-135 overflow-hidden rounded-xl border bg-zinc-200">
                <Image
                  src={watchFiles[selectedIndex].preview}
                  alt={watchFiles[selectedIndex].name}
                  width={watchFiles[selectedIndex].width}
                  height={watchFiles[selectedIndex].height}
                  className="h-full w-full object-contain"
                  sizes="540px"
                />
              </div>
              <TextInput
                key={`name-${fields[selectedIndex].id}`}
                type="text"
                id="photo-name"
                name={`files.${selectedIndex}.name`}
                label="Photo Name"
                register={register}
                error={errors.files?.[selectedIndex]?.name}
              />
              <TextInput
                key={`collection-${fields[selectedIndex].id}`}
                type="text"
                id="collection"
                name={`files.${selectedIndex}.collection`}
                label="Collection"
                register={register}
                error={errors.files?.[selectedIndex]?.collection}
              />
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 ml-auto flex w-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black p-2 text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95"
      >
        Upload
      </button>
    </form>
  );
}

export default Dropzone;
