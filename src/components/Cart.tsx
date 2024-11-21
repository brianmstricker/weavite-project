"use client";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { buttonVariants } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CartStore } from "@/hooks/cartStore";

const Cart = () => {
 const cart = CartStore((state) => state.cart);
 return (
  <SidebarTrigger>
   <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 relative")}>
    {cart.length > 0 && <div className="absolute bg-orange-500 dark:bg-orange-600 w-1.5 h-1.5 top-0.5 right-0.5 rounded-full" />}
    <ShoppingCart />
   </div>
  </SidebarTrigger>
 );
};
export default Cart;
