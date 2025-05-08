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
    <header className="border-b-1 pt-9">
      <div className="flex items-center justify-end gap-6">
        <Search />
        <Link href="/login" className="hover:text-black">
          Login
        </Link>
        <Link
          href="/signup"
          className="flex h-9 w-24 items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-700 active:scale-95"
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
        {/* <Link
          href="/"
          className="font-[family-name:var(--font-playfair-display)] text-3xl text-black italic"
        >
          Nguyen Family
        </Link> */}
        <span className="flex items-end gap-3 text-2xl font-bold text-black">
          Photos provided by
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="h-8">
              <Image
                className="size-full"
                src="https://images.pexels.com/lib/api/pexels.png"
                alt="pexels logo"
                width={566}
                height={200}
              />
            </div>
          </a>
        </span>
        <ul className="flex items-end gap-6">
          {navigation.map(({ title, link }, index) => (
            <li key={index} className="hover:text-black">
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
