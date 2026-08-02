import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <header>
        <nav className="flex justify-end z-10 w-full mt-4 absolute top-0 px-2">
          <div className="h-10 w-10 border border-white rounded-full p-1 hover:bg-white cursor-pointer
         hover:text-black active:bg-white active:text-black transition-colors duration-200">
            <Link href={"/admin"}>
              <BiUser className="h-full w-full p-1" />
            </Link>
          </div>
        </nav>
      </header>
      <main className="relative flex flex-col min-h-[85vh] items-center py-4 px-6 justify-center">
        <Image
          src="/decoration_image.jpg"
          alt="Maa Furniture"
          fill
          priority
          quality={100}
          className="object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl text-center text-white">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-200">
            Barpeta, Assam
          </p>

          <h1 className="text-5xl font-bold md:text-7xl">
            Furniture That Feels Like Home
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200">
            Discover quality furniture crafted to bring comfort, style, and durability
            to every room.
          </p>

          <div className="mt-10 flex justify-center gap-2 md:gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white py-1 px-4 md:px-8  md:py-3 font-semibold text-black transition hover:bg-neutral-200"
            >
              Explore Collection
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white py-1 px-4 md:px-8 md:py-3 transition hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>

  );
}
