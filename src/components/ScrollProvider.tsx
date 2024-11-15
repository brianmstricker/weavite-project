"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
 const [maxScroll, setMaxScroll] = useState(0);
 const [currentScrollPos, setCurrentScrollPos] = useState(0);
 const [debouncedScrollPos] = useDebounce(currentScrollPos, 200);

 useEffect(() => {
  const getMaxScroll = () => {
   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
   setMaxScroll(maxScroll);
   console.log(maxScroll);
  };
  const handleScroll = () => {
   const scrollPosition = window.scrollY;
   setCurrentScrollPos(scrollPosition);
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
 console.log("max", maxScroll);
 console.log("cur", debouncedScrollPos);
 // todo: if debouncedScrollPos > maxScroll/2, fetch more data
 return <>{children}</>;
};
export default ScrollProvider;
