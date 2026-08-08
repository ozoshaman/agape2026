import Image from "next/image";
   import type { ItemGaleria } from "@/types";

   export default function GaleriaItem({ item }: { item: ItemGaleria }) {
     return (
       <div className="rounded-lg overflow-hidden bg-carbon-black/5 border border-carbon-black/10">
         <div className="w-full aspect-video relative">
           {item.tipo === "foto" ? (
             <Image
               src={item.url}
               alt={item.descripcion ?? "Foto de la galería"}
               fill
               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
               className="object-cover"
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
           <p className="text-carbon-black/70 text-sm p-3">
             {item.descripcion}
           </p>
         )}
       </div>
     );
   }