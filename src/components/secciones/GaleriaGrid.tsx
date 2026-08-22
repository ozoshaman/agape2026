   "use client";

   import { useState } from "react";
   import type { ItemGaleria } from "@/types";
   import GaleriaItem from "@/components/ui/GaleriaItem";
   import FiltrosGaleria, { type FiltroGaleria } from "@/components/ui/FiltrosGaleria";

   export default function GaleriaGrid({ items }: { items: ItemGaleria[] }) {
     const [filtro, setFiltro] = useState<FiltroGaleria>("todos");

     const itemsFiltrados =
       filtro === "todos" ? items : items.filter((item) => item.categoria === filtro);

     return (
       <div className="flex flex-col gap-8">
         {itemsFiltrados.length === 0 ? (
           <p className="text-center text-bone-white/60 py-12">
             No hay elementos en esta categoría todavía.
           </p>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[160px] gap-4">
             {itemsFiltrados.map((item) => (
               <GaleriaItem key={item.id} item={item} />
             ))}
           </div>
         )}

         <FiltrosGaleria filtroActivo={filtro} onCambiarFiltro={setFiltro} />
       </div>
     );
   }