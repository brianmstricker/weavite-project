import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import ProductCard from "@/components/ProductCard";
import ScrollProvider from "@/components/ScrollProvider";

export default async function Home() {
 const data = await initWeaviteAndGetData();
 if (!data) return <div>Error</div>;
 if (data.length === 0) return <div>No data :(</div>;
 return (
  <ScrollProvider>
   <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[1400px]:grid-cols-8 gap-4">
    {data.map((product) => (
     <ProductCard key={product.item_ID} product={product} />
    ))}
   </div>
  </ScrollProvider>
 );
}
