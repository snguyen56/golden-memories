import Link from "next/link";

function Header() {
  return (
    <header className="pt-9 border-b-1">
      <div className="flex gap-6 justify-end items-center">
        <Link href="/" className="hover:text-black">
          Login
        </Link>
        <Link
          href="/"
          className="border-1 rounded-xl w-24 h-9 flex justify-center items-center active:scale-95 hover:scale-105 transition-all ease-in-out"
        >
          Sign Up
        </Link>
      </div>
      <div className="h-80 grid place-items-center">
        <h1 className="text-7xl text-black font-[family-name:var(--font-playfair-display)] italic">
          Golden Memories
        </h1>
      </div>
      <nav className="flex justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair-display)] italic text-3xl text-black"
        >
          Nguyen Family
        </Link>
        <ul className="flex gap-6 items-end">
          <li className="hover:text-black">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/">Collections</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/">Slideshow</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/">Upload</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
