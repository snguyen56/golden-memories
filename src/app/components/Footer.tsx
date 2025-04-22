import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t-1 py-12 text-center">
      <p className="text-4xl font-bold">Golden Memories</p>
      <nav>
        <ul className="flex flex-wrap justify-center gap-6">
          <li>
            <Link href="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-black">
              Collections
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-black">
              Slideshow
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-black">
              Upload
            </Link>
          </li>
        </ul>
      </nav>
      <p>© 2025 Golden Memories. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
