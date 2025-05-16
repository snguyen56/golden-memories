import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileNavbar from "@/components/MobileNavbar";

export const revalidate = 3600;

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Memories",
  description: "A photo gallery website by Steven Nguyen",
  twitter: {
    card: "summary_large_image",
    title: "Golden Memories",
    description: "A photo gallery website by Steven Nguyen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} container mx-auto font-[family-name:var(--font-open-sans)] text-zinc-600 antialiased`}
      >
        <Header />
        <main className="mt-16 mb-24 lg:mt-24">
          <MobileNavbar></MobileNavbar>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
