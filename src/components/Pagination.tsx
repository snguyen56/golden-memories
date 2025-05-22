"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
};

function Pagination({ page, totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createParams(page: number) {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  const buttonStyle =
    "flex h-10 min-w-10 place-items-center rounded-lg p-2 px-4";
  const singleStyle =
    "flex h-10 min-w-10 place-items-center rounded-lg p-2 hover:bg-zinc-200";
  return (
    <nav
      className="flex justify-center"
      aria-label="Pagination"
      role="navigation"
    >
      <ul className="flex gap-2">
        <li>
          <Link
            href={createParams(page - 1)}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
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
          </Link>
        </li>
        {/* First page & ellipses */}
        {page >= 4 && (
          <>
            <li aria-current={1 === page ? "page" : undefined}>
              <Link
                href={createParams(1)}
                className={`${buttonStyle} hover:bg-zinc-200 ${1 === page ? "border text-black" : ""}`}
              >
                {1}
              </Link>
            </li>
            <li className={buttonStyle}>...</li>
          </>
        )}
        {/* First pages */}
        {page < 4 &&
          Array.from({ length: 4 }, (_, index) => (
            <li
              key={index + 1}
              aria-current={index + 1 === page ? "page" : undefined}
            >
              <Link
                href={createParams(index + 1)}
                className={`${buttonStyle} hover:bg-zinc-200 ${index + 1 === page ? "border text-black" : ""}`}
              >
                {index + 1}
              </Link>
            </li>
          ))}
        {/* Middle 3 pages */}
        {page >= 4 &&
          page <= totalPages - 3 &&
          Array.from({ length: 3 }, (_, index) => (
            <li
              key={page - 1 + index}
              aria-current={page - 1 + index === page ? "page" : undefined}
            >
              <Link
                href={createParams(page - 1 + index)}
                className={`${buttonStyle} hover:bg-zinc-200 ${page - 1 + index === page ? "border text-black" : ""}`}
              >
                {page - 1 + index}
              </Link>
            </li>
          ))}
        {/* Last pages */}
        {page > totalPages - 3 &&
          Array.from({ length: Math.min(4, totalPages) }, (_, index) => (
            <li
              key={totalPages - 4 + index}
              aria-current={
                totalPages - 4 + index + 1 === page ? "page" : undefined
              }
            >
              <Link
                href={createParams(totalPages - 4 + index + 1)}
                className={`${buttonStyle} hover:bg-zinc-200 ${totalPages - 4 + index + 1 === page ? "border text-black" : ""}`}
              >
                {totalPages - 4 + index + 1}
              </Link>
            </li>
          ))}
        {/* Last page & ellipses */}
        {page <= totalPages - 3 && (
          <>
            <li className={buttonStyle}>...</li>
            <li aria-current={totalPages === page ? "page" : undefined}>
              <Link
                href={createParams(totalPages)}
                className={`${buttonStyle} hover:bg-zinc-200 ${totalPages === page ? "border text-black" : ""}`}
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            href={createParams(page + 1)}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : 0}
            className={`${singleStyle} ${page === totalPages ? "pointer-events-none opacity-50" : ""} `}
          >
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
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
