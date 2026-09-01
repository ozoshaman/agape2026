import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
       remotePatterns: [
         {
           protocol: "https",
           hostname: "wbdnisvckjpidpkzorjm.supabase.co",
         },
       ],
     },
};

export default nextConfig;
