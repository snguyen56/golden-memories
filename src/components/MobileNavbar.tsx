"use client";

import Link from "next/link";
import Search from "./Search";
import { navigation } from "./Header";
import { useState } from "react";

function MobileNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 mb-4 bg-white">
      <div className="flex h-15 w-full items-center justify-end gap-8 p-3 lg:hidden">
        <Search></Search>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 top-15 flex w-full flex-col justify-between border-t-1 bg-white transition-all ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav>
          <ul className="flex flex-col items-end justify-items-end text-end">
            {navigation.map(({ title, link }, index) => (
              <li
                key={index}
                onClick={() => setOpen(false)}
                className="w-full border-b-1 p-4 hover:text-black"
              >
                <Link href={link}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="mb-4 flex flex-col items-end justify-end gap-4 px-4">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex h-10 w-full items-center justify-center rounded-lg border hover:text-black"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-700 active:scale-95"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileNavbar;
