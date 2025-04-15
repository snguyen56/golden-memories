import Link from "next/link";

function Header() {
  return (
    <header className="pt-9 border-b-1">
      <div className="flex gap-6 justify-end items-center">
        <Link href="/">Login</Link>
        <Link
          href="/"
          className="border-1 rounded-xl w-24 h-9 flex justify-center items-center"
        >
          Sign Up
        </Link>
      </div>
      <div className="h-80"></div>
      <nav className="flex justify-between">
        <Link href="/" className="italic text-3xl text-black">
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
