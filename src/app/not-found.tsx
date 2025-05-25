import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
      <div className="grid grid-rows-2 items-center gap-8 sm:gap-16 md:grid-cols-2 md:grid-rows-1">
        <div className="relative h-full w-full">
          <Image
            src={"/undraw_page-not-found_6wni.svg"}
            alt="404 image"
            fill
          ></Image>
        </div>
        <div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">404</h1>
          <p className="mb-4 text-xl font-semibold md:text-4xl">
            Page not Found
          </p>
          <p className="mb-6 max-w-lg text-sm sm:text-xl md:mb-10 lg:mb-12">
            The page you are looking for could not be found
          </p>
          <Link
            href="/"
            className="inline-block items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white hover:bg-zinc-800"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
