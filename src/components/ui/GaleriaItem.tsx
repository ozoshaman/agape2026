   import Image from "next/image";
   import type { ItemGaleria } from "@/types";

   export default function GaleriaItem({ item }: { item: ItemGaleria }) {
     const esDestacado = item.tipo === "video" || item.categoria === "momento_clave";

     return (
       <div
            className={`
            group relative rounded-2xl overflow-hidden
            bg-bone-white/5 backdrop-blur-md border border-bone-white/10
            hover:border-amber-gold/50 transition-colors
            ${esDestacado ? "aspect-video md:aspect-auto md:col-span-2 md:row-span-2" : "aspect-square md:aspect-auto"}
          `}
       >
         <div className="absolute inset-0">
           {item.tipo === "foto" ? (
             <Image
               src={item.url}
               alt={item.descripcion ?? "Foto de la galería"}
               fill
               sizes="(max-width: 768px) 100vw, 50vw"
               className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
           ) : (
             <iframe
               src={item.url}
               title={item.descripcion ?? "Video de la galería"}
               className="w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             />
           )}
         </div>

         {item.descripcion && (
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-carbon-black/80 to-transparent p-4 pointer-events-none">
             <p className="text-bone-white text-sm font-medium">
               {item.descripcion}
             </p>
           </div>
         )}
       </div>
     );
   }