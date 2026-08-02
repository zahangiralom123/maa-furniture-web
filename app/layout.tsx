import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./fonts.css"
import { neueFont } from "@/fonts/neue.font";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/components/react-query-provider";
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
    default: "Maa Furniture",
    template: "%s | Maa Furniture"
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
      className={`${neueFont.variable} h-full antialiased text-white`}
    >
      <body className="min-h-full flex flex-col bg-neutral-900 font-neue">
        <ReactQueryProvider>
        <Toaster toastOptions={{
          classNames: {
            toast: '!bg-white !text-black p-3 rounded-xl font-neue-regular text-xl',
            description: 'text-sm'
          }
        }} />
        {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
