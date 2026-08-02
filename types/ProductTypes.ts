export type ProductType = {
    name: string,
    description: string | null,
    stockLeft: number,
    price: number,
    image: string,
    imageSize : number,
}
export type AddProductFormType = {
  name: string;
  description: string;
  stockLeft: number;
  price: number;
  image: FileList;
};