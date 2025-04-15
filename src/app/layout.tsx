import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Memories",
  description: "A photo gallery website by Steven Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-[family-name:var(--font-open-sans)] antialiased container mx-auto text-zinc-500`}
      >
        <Header />
        <div className="mt-24 mb-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
