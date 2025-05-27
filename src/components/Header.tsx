import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export const navigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Collections",
    link: "/collections",
  },
  {
    title: "Slideshow",
    link: "/slideshow",
  },
  {
    title: "Upload",
    link: "/upload",
  },
];

function Header() {
  return (
    <header className="lg:border-b-1 lg:pt-9">
      <div className="hidden lg:block">
        <div className="flex items-center justify-end gap-6">
          <Search />
          <Link href="/login" className="hover:text-black">
            Login
          </Link>
          <Link
            href="/signup"
            className="flex h-9 w-24 items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
        <div className="grid h-80 place-items-center">
          <h1 className="font-[family-name:var(--font-playfair-display)] text-7xl text-black italic">
            Golden Memories
          </h1>
        </div>
        <nav className="flex justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair-display)] text-3xl text-black italic"
          >
            Nguyen Family
          </Link>
          <ul className="flex items-end gap-6">
            {navigation.map(({ title, link }, index) => (
              <li key={index} className="hover:text-black">
                <Link href={link}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
