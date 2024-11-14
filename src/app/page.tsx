import { initWeaviteAndGetData } from "@/actions/weavite-actions";

export default async function Home() {
 const allData = await initWeaviteAndGetData();
 const updatedData = allData?.map((item) => item.properties);
 // console.log(updatedData);
 return <div>main</div>;
}
