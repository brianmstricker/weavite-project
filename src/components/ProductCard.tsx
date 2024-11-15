import Image from "next/image";
import { Card } from "./ui/card";
import { Product } from "@/types";
import { Button } from "./ui/button";

const ProductCard = ({ product }: { product: Product }) => {
 return (
  <Card
   key={product.item_ID}
   className="overflow-hidden transition-all duration-200 ease-in-out hover:rounded-t-none border-2 flex flex-col"
  >
   <div className="relative cursor-pointer overflow-hidden aspect-square shrink-0">
    <Image
     src={`data:image/jpeg;base64,${product.image}`}
     alt={product.title}
     fill
     className="transition-all duration-150 ease-linear contrast-[1.03] hover:scale-[1.02]"
    />
   </div>
   <div className="p-2 h-full flex flex-col justify-between">
    <h3 title={product.title} className="line-clamp-3 sm:line-clamp-2">
     {product.title}
    </h3>
    <Button className="mt-3 rounded-xl" size="sm" variant="orange">
     Add to cart
    </Button>
   </div>
  </Card>
 );
};
export default ProductCard;
