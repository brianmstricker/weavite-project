"use client";
import { initWeaviteClient } from "@/actions/weavite-actions";
import { useEffect } from "react";

const WeaviteProvider = ({ children }: { children: React.ReactNode }) => {
 useEffect(() => {
  async function connect() {
   await initWeaviteClient();
  }
  connect();
 }, []);
 return <>{children}</>;
};
export default WeaviteProvider;
