import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default async function Home() {
 const allData = await initWeaviteAndGetData();
 console.log(allData);
 // if (!allData) return <div>Error</div>;
 // if (allData.length === 0) return <div>No data :(</div>;
 return (
  <div className="grid grid-cols-4">
   main
   {/* {allData.map((item) => (
    <Card key={item.item_ID} title={item.title}>
     <div><Image src={item.image} alt={item.title} width={200} height={200} /></div>
     {item.title}
    </Card>
   ))} */}
  </div>
 );
}
