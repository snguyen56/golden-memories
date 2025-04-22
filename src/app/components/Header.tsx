import Link from "next/link";

function Header() {
  return (
    <header className="border-b-1 pt-9">
      <div className="flex items-center justify-end gap-6">
        <Link href="/" className="hover:text-black">
          Login
        </Link>
        <Link
          href="/"
          className="flex h-9 w-24 items-center justify-center rounded-xl border-1 transition-all ease-in-out hover:scale-105 active:scale-95"
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
