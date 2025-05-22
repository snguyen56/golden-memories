"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  page: number;
};

function Pagination({ page }: Props) {
  const pathname = usePathname();
  const buttonStyle =
    "flex h-10 min-w-10 place-items-center rounded-lg p-2 px-4";
  const singleStyle =
    "flex h-10 min-w-10 place-items-center rounded-lg p-2 hover:bg-zinc-200";
  return (
    <nav className="flex justify-center">
      <ul className="flex gap-2">
        <Link href={`${pathname}?page=${page - 1}`}>
          <li
            className={`${singleStyle} ${page === 1 ? "pointer-events-none opacity-50" : ""} `}
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Previous
          </li>
        </Link>
        {page > 4 && (
          <>
            <Link href={`${pathname}?page=${1}`}>
              <li
                key={1}
                aria-current={1 === page ? "page" : undefined}
                className={`${buttonStyle} hover:bg-zinc-200 ${1 === page ? "border text-black" : ""}`}
              >
                {1}
              </li>
            </Link>
            <li className={buttonStyle}>...</li>
          </>
        )}
        {page < 5 &&
          Array.from({ length: 5 }, (_, index) => (
            <Link key={index + 1} href={`${pathname}?page=${index + 1}`}>
              <li
                aria-current={index + 1 === page ? "page" : undefined}
                className={`${buttonStyle} hover:bg-zinc-200 ${index + 1 === page ? "border text-black" : ""}`}
              >
                {index + 1}
              </li>
            </Link>
          ))}
        {page >= 5 &&
          Array.from({ length: 3 }, (_, index) => (
            <li
              key={page - 1 + index}
              aria-current={page - 1 + index === page ? "page" : undefined}
              className={`${buttonStyle} hover:bg-zinc-200 ${page - 1 + index === page ? "border text-black" : ""}`}
            >
              <Link href={`${pathname}?page=${page - 1 + index}`}>
                {page - 1 + index}
              </Link>
            </li>
          ))}
        {/* Hide ellipses when current page is <= max page - 4 */}
        <li className={buttonStyle}>...</li>
        <Link href={`${pathname}?page=${page + 1}`}>
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
        </Link>
      </ul>
    </nav>
  );
}

export default Pagination;
