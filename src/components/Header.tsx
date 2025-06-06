"use client";
import Link from "next/link";
import Search from "./Search";
import navigation from "@/utils/navigation";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  return (
    <header className="lg:border-b-1 lg:pt-9">
      <div className="hidden lg:block">
        <div className="flex items-center justify-end gap-6">
          <Search />
          {session ? (
            <>
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image
                  src={session.user.image!}
                  alt="user avatar"
                  fill
                  title={session.user.name}
                />
              </div>
              <button
                type="button"
                className="flex h-9 w-24 cursor-pointer items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95"
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/login");
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-black">
                Login
              </Link>
              <Link
                href="/signup"
                className="flex h-9 w-24 items-center justify-center rounded-lg bg-black text-white transition-all ease-in-out hover:bg-zinc-800 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
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
