   import type { MetadataRoute } from "next";

   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

   export default function sitemap(): MetadataRoute.Sitemap {
     const rutas = ["", "/expositores", "/galeria", "/ubicacion", "/registro"];

     return rutas.map((ruta) => ({
       url: `${SITE_URL}${ruta}`,
       lastModified: new Date(),
       changeFrequency: "weekly" as const,
       priority: ruta === "" ? 1 : 0.8,
     }));
   }