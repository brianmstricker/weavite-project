import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
   {
    hostname: "datasets-server.huggingface.co",
   },
  ],
 },
};

export default nextConfig;
