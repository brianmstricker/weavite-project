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
 const [hasFetched, setHasFetched] = useState(false);
 const [prevMaxScroll, setPrevMaxScroll] = useState(0);
 const [debouncedScrollPos] = useDebounce(currentScrollPos, 20);

 const loadMoreData = useCallback(async () => {
  if (maxScroll === 0 || data.length === 0 || loading || hasFetched || maxScroll === prevMaxScroll) return;
  try {
   const nextPage = page + 1;
   setLoading(true);
   setHasFetched(true);
   const fetchedData = await initWeaviteAndGetData(nextPage);
   if (fetchedData && fetchedData.length > 0) {
    setPage(nextPage);
    setData((prevData) => [...prevData, ...fetchedData]);
    setLoading(false);
   } else {
    setLoading(false);
   }
  } catch (error) {
   console.error(error);
   setLoading(false);
  }
 }, [page, loading, maxScroll, hasFetched, prevMaxScroll, data.length]);

 useEffect(() => {
  const getMaxScroll = () => {
   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
   setMaxScroll(maxScroll);
  };
  const handleScroll = () => {
   setCurrentScrollPos(window.scrollY);
  };
  getMaxScroll();
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", getMaxScroll);
  return () => {
   window.removeEventListener("scroll", handleScroll);
   window.removeEventListener("resize", getMaxScroll);
  };
 }, []);

 useEffect(() => {
  const loadData = () => {
   if (maxScroll === 0 || data.length === 0 || loading || hasFetched || maxScroll === prevMaxScroll) return;
   if (debouncedScrollPos > maxScroll / 1.35) {
    setLoading(true);
    loadMoreData();
   }
  };
  loadData();
 }, [debouncedScrollPos, maxScroll, loading, hasFetched, loadMoreData, prevMaxScroll, data.length]);

 useEffect(() => {
  let fetchTimeoutID: NodeJS.Timeout;
  const updateScroll = () => {
   if (loading || !hasFetched) return;
   setPrevMaxScroll(maxScroll);
   fetchTimeoutID = setTimeout(() => {
    setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    setHasFetched(false);
   }, 1000);
  };
  updateScroll();
  return () => {
   if (fetchTimeoutID) clearTimeout(fetchTimeoutID);
  };
 }, [loading, maxScroll, hasFetched]);
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
