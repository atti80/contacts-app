import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const glysa = localFont({
  src: "./fonts/Glysa.otf",
  variable: "--font-glysa",
});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Contacts App",
  description: "Manage contacts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${glysa.variable} ${lexendDeca.variable}`}>
      <body className="grid h-screen grid-cols-[1fr_512px_1fr] md:grid-cols-[1fr_640px_1fr] lg:grid-cols-[1fr_768px_1fr] bg-grey-100 text-white">
        <LeftPanel />
        <main>{children}</main>
        <RightPanel />
      </body>
    </html>
  );
}
