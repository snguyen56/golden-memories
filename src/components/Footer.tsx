import Link from "next/link";
import { navigation } from "./Header";

function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t-1 py-12 text-center">
      <p className="text-4xl font-bold">Golden Memories</p>
      <nav>
        <ul className="flex flex-wrap justify-center gap-6">
          {navigation.map(({ title, link }, index) => (
            <li key={index} className="hover:text-black">
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>© 2025 Golden Memories. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
