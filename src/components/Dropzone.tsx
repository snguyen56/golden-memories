"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextInput from "./TextInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { generateUploadSignature, createPost } from "@/app/upload/actions";
import { authClient } from "@/utils/auth-client";
import Combobox from "./Combobox";
import { useRouter } from "next/navigation";

const fileSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9 _-]+$/, "Name must not contain special characters")
    .nonempty("Name is required"),
  collection: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val.trim() === "") {
          return true;
        }
        return /^[a-zA-Z0-9\s_-]+$/.test(val);
      },
      {
        message: "Collection must not contain special characters",
      },
    ),
  preview: z.string(),
  file: z.any(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const formSchema = z.object({
  files: z.array(fileSchema).min(1, { message: "At least 1 file is required" }),
});

type dropzoneData = z.infer<typeof formSchema>;

type Props = {
  collectionNames: string[];
};

function Dropzone({ collectionNames }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const userId = authClient.useSession().data?.user.id;
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
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

  const byte = 1024 * 1024;
  const maxSize = 50 * byte;

  const { getRootProps, getInputProps, open } = useDropzone({
    maxSize,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: async (acceptedFiles) => {
      const newFiles = acceptedFiles.map(async (file) => {
        const objectURL = URL.createObjectURL(file);
        if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.src = objectURL;
          video.preload = "metadata";
          video.muted = true;
          video.playsInline = true;

          await new Promise<void>((resolve) => {
            video.addEventListener("loadeddata", () => resolve(), {
              once: true,
            });
          });

          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const thumbnailDataURL = canvas.toDataURL("image/png");

          video.pause();
          video.src = "";
          URL.revokeObjectURL(objectURL);

          return {
            id: crypto.randomUUID(),
            name: file.name.split(".")[0],
            collection: "",
            preview: thumbnailDataURL,
            file,
            width: canvas.width,
            height: canvas.height,
          };
        }
        const myImage = new window.Image();
        myImage.src = objectURL;
        return {
          id: crypto.randomUUID(),
          name: file.name.split(".")[0],
          collection: "",
          preview: objectURL,
          file: file,
          width: myImage.width,
          height: myImage.height,
        };
      });

      newFiles.forEach(async (file) => append(await file));

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

  const onSubmit = async (data: dropzoneData) => {
    if (!data.files.length) return;

    try {
      setLoading(true);
      await Promise.all(
        data.files.map(async (item) => {
          const folder = item.collection
            ? `golden-memories/${item.collection}`
            : "golden-memories";

          const isVideo = item.file.type.startsWith("video/");
          const resourceType = isVideo ? "video" : "image";

          const { signature, timestamp, apiKey, cloudName } =
            await generateUploadSignature(item.name, folder);

          const formData = new FormData();
          formData.append("file", item.file);
          formData.append("api_key", apiKey);
          formData.append("timestamp", timestamp.toString());
          formData.append("signature", signature);
          formData.append("public_id", item.name);
          formData.append("folder", folder);
          formData.append("upload_preset", "golden memories");

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!res.ok) {
            const error = await res.json();
            console.error("Cloudinary upload failed: ", error.message);
            throw new Error("Upload failed");
          }
          const responseData = await res.json();
          await createPost(responseData, userId!, item.collection);
          console.log("Cloudinary response:", responseData);
          router.refresh();
          return responseData;
        }),
      );
      reset();
      setSelectedIndex(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during upload");
    } finally {
      setLoading(false);
    }
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
                    src={fields[index].preview}
                    alt={watchFiles[index].name}
                    width={fields[index].width}
                    height={fields[index].height}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p>{watchFiles[index]?.name}</p>
                <button
                  type="button"
                  aria-label="Delete photo"
                  title="Delete photo"
                  className="absolute top-1 right-1 block cursor-pointer rounded-full bg-black/50 md:hidden md:group-hover:block"
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
                id="file-name"
                name={`files.${selectedIndex}.name`}
                label="File Name"
                register={register}
                error={errors.files?.[selectedIndex]?.name}
              />
              <Combobox
                key={`collection-${fields[selectedIndex].id}`}
                id="collection"
                name={`files.${selectedIndex}.collection`}
                label="collection"
                register={register}
                error={errors.files?.[selectedIndex]?.collection}
                options={collectionNames}
              />
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 ml-auto flex w-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black p-2 text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
      >
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ) : (
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
        )}
        Upload
      </button>
    </form>
  );
}

export default Dropzone;
