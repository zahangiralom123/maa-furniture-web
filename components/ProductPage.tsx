"use client"
import { openWhatsApp } from "@/lib/open.whatsapp";
import { ProductType } from "@/types/ProductTypes"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
const BUSINESS_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
const getProducts = async (): Promise<ProductType[]> => {
    const response = await fetch("api/products", { method: "GET" });
    return response.json();
}
const ProductPage = () => {
    const { data: product, isLoading, isError } = useQuery<ProductType[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: Infinity
    })
    if(!product?.length) return <div className="text-gray-400 text-xl md:text-3xl text-center">Products doesn't exists add some, Go to <Link className="underline font-bold text-white uppercase" href={"/admin"}>Admin Page</Link></div>
    if (isLoading) return <div className="text-2xl md:text-4xl text-center h-screen">Loading...</div>
    if (isError) return <div className="text-2xl md:text-4xl text-red-400">Error, Failed to Fetch Products make sure products exists or check your internet connection</div>
    return (
        <main>
            <h1 className="text-2xl md:text-4xl text-center">Store - Maa Furniture House</h1>
            <p className="text-center text-gray-400 text-lg">Browse what you need :)</p>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2 px-3">
                {product?.map((items, idx) => {
                    return (
                        <div key={idx} className="bg-linear-to-br from-stone-600 to-black rounded-lg 
                        h-fit w-96
                         md:w-full
                          p-4 font-bold">
                            <div className="flex flex-col items-center">
                                <p className="text-2xl uppercase">
                                    {items.name}
                                </p>
                                <div className="">
                                    <Image src={items.image} alt={items.name}
                                     width={64} height={64} quality={100} 
                                     loading="lazy" className="h-auto w-auto rounded-lg"/>
                                </div>
                                <div className="border-b py-3  border-white/30 w-full mt-3 flex gap-x-3 items-center">
                                    <p className="text-sm text-neutral-300">Description &rarr;</p>
                                    <p>{items.description}</p>
                                </div>
                                <button onClick={()=>openWhatsApp({phone : BUSINESS_WHATSAPP, description : items.description as string, name : items.name, price : items.price })} className="uppercase bg-white cursor-pointer
                                 text-black px-6 py-2 rounded-full
                                  hover:bg-gray-200 mt-3">buy &#8377;{items.price}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default ProductPage