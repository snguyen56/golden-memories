import React from "react";

type Props = {
  page: number;
};

function Pagination({ page }: Props) {
  const buttonStyle =
    "flex h-10 min-w-10 place-items-center rounded-lg p-2 px-4";
  const singleStyle =
    "flex h-10 min-w-10 cursor-pointer place-items-center rounded-lg p-2 hover:bg-zinc-200";
  return (
    <nav className="flex justify-center">
      <ul className="flex gap-2">
        <li className={singleStyle}>
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Previous
        </li>
        <li className={buttonStyle}>...</li>
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index + 1}
            className={`${buttonStyle} cursor-pointer hover:bg-zinc-200 ${index + 1 === page ? "border text-black" : ""}`}
          >
            {index + 1}
          </li>
        ))}
        <li className={buttonStyle}>...</li>
        <li className={singleStyle}>
          Next
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
