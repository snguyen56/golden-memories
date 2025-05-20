"use client";

import Link from "next/link";
import Search from "./Search";
import { navigation } from "./Header";
import { useState } from "react";

function MobileNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <aside className="fixed top-0 left-0 z-10 mb-4 w-screen bg-white lg:hidden">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-10 h-screen w-screen bg-black/50"
        ></div>
      )}
      <div className="relative z-50 flex h-15 items-center justify-end gap-8 border-b-1 border-zinc-300 bg-white p-3 shadow lg:hidden">
        <Search id="mobile search"></Search>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={`${open ? "Close Navigation Menu" : "Open Navigation Menu"}`}
        >
          {open ? (
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
                d="M6 18 18 6M6 6l12 12"
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      <nav
        aria-label="Sidebar Navigation"
        role="navigation"
        className={`fixed right-0 z-20 flex h-[calc(100vh-60px)] w-full flex-col justify-between bg-white transition-all md:w-75 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
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
        <div className="mb-4 flex flex-col items-end justify-end gap-4 px-4">
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
            className="flex h-10 w-full items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export default MobileNavbar;
