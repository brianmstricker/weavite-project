import { Aperture, Search, ShoppingCart } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TopBar = () => {
 return (
  <div className="flex items-center justify-between mb-4">
   <div className="flex items-center gap-3">
    <div className="md:hidden">
     <SidebarTrigger />
    </div>
    <Link href="/" className="flex items-center gap-1 py-0.5 px-1">
     <Aperture className="!size-5 -translate-x-0.5" />
     <span className="text-xl">FastBuy</span>
    </Link>
   </div>
   <div>
    <Button variant="ghost" size="icon" className="h-8 w-8">
     <Search />
    </Button>
    <Button variant="ghost" size="icon" className="h-8 w-8">
     <ShoppingCart />
    </Button>
   </div>
  </div>
 );
};
export default TopBar;
