"use client";
import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import { Data } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import ProductCard from "./ProductCard";
import { Card } from "./ui/card";

const PaginationHandler = ({ initialData }: { initialData: Data[] }) => {
 const [maxScroll, setMaxScroll] = useState(0);
 const [currentScrollPos, setCurrentScrollPos] = useState(0);
 const [page, setPage] = useState<number>(1);
 const [data, setData] = useState<Data[]>(initialData);
 const [loading, setLoading] = useState<boolean>(false);
 const [debouncedScrollPos] = useDebounce(currentScrollPos, 20);
 const hasFetched = useRef(false);

 const loadMore = useCallback(async () => {
  if (loading || hasFetched.current) return;
  const nextPage = page + 1;
  setLoading(true);
  hasFetched.current = true;
  const fetchedData = await initWeaviteAndGetData(nextPage);
  if (fetchedData) {
   setPage(nextPage);
   setData((prevData) => [...prevData, ...fetchedData]);
   setLoading(false);
  } else {
   setLoading(false);
  }
 }, [page, loading]);

 useEffect(() => {
  const getMaxScroll = () => {
   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
   setMaxScroll(maxScroll);
  };
  const handleScroll = () => {
   setCurrentScrollPos(window.scrollY);
  };
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", getMaxScroll);
  window.addEventListener("resize", getMaxScroll);
  return () => {
   window.removeEventListener("scroll", handleScroll);
   window.removeEventListener("load", getMaxScroll);
   window.removeEventListener("resize", getMaxScroll);
  };
 }, []);

 useEffect(() => {
  if (debouncedScrollPos > maxScroll / 2 && !hasFetched.current) {
   loadMore();

   const timeout = setTimeout(() => {
    console.log("here");
    hasFetched.current = false;
   }, 100);
   return () => {
    clearTimeout(timeout);
   };
  }
 }, [debouncedScrollPos, maxScroll, loadMore, loading]);
 console.log(data.length);
 return (
  <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[1400px]:grid-cols-8 gap-4">
   {data.map((product) => (
    <ProductCard key={product.item_ID} product={product} />
   ))}
   {loading && (
    <>
     {Array.from({ length: 8 }).map((_, i) => (
      <Card key={i} className="overflow-hidden transition-all [animation-duration:3000ms] ease-in-out border-2 bg-secondary animate-pulse">
       <div className="relative overflow-hidden aspect-square w-full h-full" />
       <div className="px-2 py-8" />
      </Card>
     ))}
    </>
   )}
  </div>
 );
};
export default PaginationHandler;
