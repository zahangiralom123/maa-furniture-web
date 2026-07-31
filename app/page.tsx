import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <header className="flex justify-center border-b border-neutral-300/50 py-4">
        <nav className="w-full max-w-4xl ">
          <ul className="flex justify-around items-center uppercase">
            <li>
              <Link href={"/products"}>
                Products
              </Link>
            </li>
            <li>
              <Link href={"/about"}>
                About Us
              </Link>
            </li>
            <li>
              <Link href={"/contact"}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border border-white rounded-full p-1 hover:bg-white hover:text-black active:bg-white active:text-black">
          <Link href={"/admin"}>
            <BiUser className="h-5 w-5" />
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-center text-3xl md:text-5xl font-bold">
          Welcome to Maa Furniture
        </h1>

        <div className="mt-12 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold">
            Who We Are
          </h2>

          <p className="text-gray-300 leading-8">
            Maa Furniture is a trusted furniture brand based in Barpeta, Assam,
            dedicated to crafting high-quality furniture for homes, offices, and
            commercial spaces. We combine skilled craftsmanship with durable materials
            to create products that are both stylish and long-lasting.
          </p>

          <p className="text-gray-300 leading-8">
            Whether you're looking for modern, classic, or custom-made furniture, our
            goal is to provide comfort, elegance, and value in every piece we create.
            Customer satisfaction and quality workmanship are at the heart of
            everything we do.
          </p>
        </div>
      </main>
      <Footer/>
    </>

  );
}
