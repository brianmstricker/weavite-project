import { Aperture, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cart from "./Cart";

const TopBar = () => {
 return (
  <div className="flex items-center justify-between mb-4">
   <div className="flex items-center gap-3">
    <Link href="/" className="flex items-center gap-1 py-0.5 px-1">
     <Aperture className="!size-5 -translate-x-0.5 text-orange-500 dark:text-orange-600" />
     <span className="text-2xl">FastBuy</span>
    </Link>
   </div>
   <div className="flex items-center gap-2">
    <Button variant="ghost" size="icon" className="h-8 w-8">
     <Search />
    </Button>
    <Cart />
   </div>
  </div>
 );
};
export default TopBar;
