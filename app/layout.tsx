import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
