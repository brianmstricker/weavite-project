import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
 const allData = await initWeaviteAndGetData();
 if (!allData) return <div>Error</div>;
 if (allData.length === 0) return <div>No data :(</div>;
 return (
  <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[1400px]:grid-cols-8 gap-4">
   {allData.map((product) => (
    <ProductCard key={product.item_ID} product={product} />
   ))}
  </div>
 );
}
