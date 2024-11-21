"use client";
import { initWeaviteAndGetData } from "@/actions/weavite-actions";
import { Data } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Card } from "./ui/card";
import throttle from "lodash.throttle";

const PaginationHandler = ({ initialData }: { initialData: Data[] }) => {
 const [maxScroll, setMaxScroll] = useState(0);
 const [currentScrollPos, setCurrentScrollPos] = useState(0);
 const [page, setPage] = useState<number>(1);
 const [data, setData] = useState<Data[]>(initialData);
 const [loading, setLoading] = useState<boolean>(false);
 const [hasFetched, setHasFetched] = useState(false);
 const [prevMaxScroll, setPrevMaxScroll] = useState(0);

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
  const throttledGetMaxScroll = throttle(getMaxScroll, 500);
  const throttledHandleScroll = throttle(handleScroll, 500);
  window.addEventListener("scroll", throttledHandleScroll);
  window.addEventListener("resize", throttledGetMaxScroll);
  return () => {
   window.removeEventListener("scroll", throttledHandleScroll);
   window.removeEventListener("resize", throttledGetMaxScroll);
   throttledGetMaxScroll.cancel();
   throttledHandleScroll.cancel();
  };
 }, []);

 useEffect(() => {
  const loadData = () => {
   if (maxScroll === 0 || data.length === 0 || loading || hasFetched || maxScroll === prevMaxScroll) return;
   if (currentScrollPos > maxScroll / 1.35) {
    setLoading(true);
    loadMoreData();
   }
  };
  loadData();
 }, [currentScrollPos, maxScroll, loading, hasFetched, loadMoreData, prevMaxScroll, data.length]);

 useEffect(() => {
  let fetchTimeoutID: NodeJS.Timeout;
  const updateScroll = () => {
   if (loading || !hasFetched) return;
   setPrevMaxScroll(maxScroll);
   fetchTimeoutID = setTimeout(() => {
    setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    setHasFetched(false);
   }, 750);
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
