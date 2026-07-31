import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./fonts.css"
import { neueFont } from "@/fonts/neue.font";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default : "Maa Furniture",
    template : "%s | Maa Furniture"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${neueFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black font-neue">{children}</body>
    </html>
  );
}
