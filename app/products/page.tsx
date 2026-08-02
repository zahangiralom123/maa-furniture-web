import ProductPage from "@/components/ProductPage"
import { Metadata } from "next"
export const metadata : Metadata = {
    title : "Products",
    description : "This is product page where people browse & purchase furniture for their need & use."
}
const Product = () => {
    return (
       <ProductPage/>
    )
}

export default Product