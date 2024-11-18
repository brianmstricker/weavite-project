import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import PaginationHandler from "@/components/PaginationHandler";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
 const initialData = await initWeaviteAndGetData();
 if (!initialData) return <div>Error</div>;
 if (initialData.length === 0) return <div>No data :(</div>;
 return <PaginationHandler initialData={initialData} />;
}
