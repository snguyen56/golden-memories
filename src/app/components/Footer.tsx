import Link from "next/link";

function Footer() {
  return (
    <footer className="text-center flex flex-col gap-6 border-t-1 py-12">
      <p className="font-bold text-4xl">Golden Memories</p>
      <div className="flex justify-center gap-6">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="/" className="hover:text-black">
          Collections
        </Link>
        <Link href="/" className="hover:text-black">
          Slideshow
        </Link>
        <Link href="/" className="hover:text-black">
          Upload
        </Link>
      </div>
      <p>© 2025 Golden Memories. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
