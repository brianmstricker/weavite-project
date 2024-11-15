import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default async function Home() {
 const allData = await initWeaviteAndGetData();
 if (!allData) return <div>Error</div>;
 if (allData.length === 0) return <div>No data :(</div>;
 return (
  <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[1400px]:grid-cols-8 gap-4">
   {allData.map((item) => (
    <Card key={item.item_ID} className="overflow-hidden transition-all duration-200 ease-in-out hover:rounded-t-none border-2">
     <div className="relative cursor-pointer overflow-hidden aspect-square">
      <Image
       src={`data:image/jpeg;base64,${item.image}`}
       alt={item.title}
       fill
       className="transition-all duration-200 ease-in-out contrast-[1.03] hover:contrast-[1.05]"
      />
     </div>
     <div className="p-2">
      <h3 title={item.title} className="line-clamp-3 sm:line-clamp-2">
       {item.title}
      </h3>
     </div>
    </Card>
   ))}
  </div>
 );
}
