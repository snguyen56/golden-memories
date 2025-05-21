"use client";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type Props = {
  id?: string;
};

const searchSchema = z.object({
  query: z.string().trim().nonempty(),
});

type search = z.infer<typeof searchSchema>;

function Search({ id = "search" }: Props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const onSubmit = (data: search) => {
    if (!data.query.trim()) return;
    const searchParams = new URLSearchParams({ query: data.query });
    router.push(`/results?${searchParams.toString()}`);
  };

  return (
    <form role="search" className="relative" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        type="search"
        id={id}
        name="query"
        register={register}
        placeholder="Search..."
      ></TextInput>
      <button
        type="submit"
        className="absolute top-0 right-0 cursor-pointer"
        title="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}

export default Search;
