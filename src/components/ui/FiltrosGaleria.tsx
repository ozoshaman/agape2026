   "use client";

   import type { CategoriaGaleria } from "@/types";

   export type FiltroGaleria = CategoriaGaleria | "todos";

   const OPCIONES: { valor: FiltroGaleria; label: string }[] = [
     { valor: "todos", label: "Todos" },
     { valor: "momento_clave", label: "Momentos clave" },
     { valor: "foto_oficial", label: "Fotos oficiales" },
     { valor: "clip_video", label: "Clips de video" },
   ];

   type Props = {
     filtroActivo: FiltroGaleria;
     onCambiarFiltro: (filtro: FiltroGaleria) => void;
   };

   export default function FiltrosGaleria({ filtroActivo, onCambiarFiltro }: Props) {
        return (
        <div className="sticky bottom-4 z-40 flex justify-center px-4 w-full">
            <div className="flex gap-1.5 sm:gap-2 bg-carbon-black/90 backdrop-blur-md border border-bone-white/10 rounded-full px-2 py-2 shadow-lg overflow-x-auto min-w-0 [&::-webkit-scrollbar]:hidden">
         {OPCIONES.map((opcion) => {
             const activo = opcion.valor === filtroActivo;
             return (
               <button
                 key={opcion.valor}
                 onClick={() => onCambiarFiltro(opcion.valor)}
                    className={`
     whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors shrink-0
     ${
       activo
         ? "bg-racing-red text-bone-white"
         : "text-bone-white/70 hover:text-bone-white"
     }
   `}
               >
                 {opcion.label}
               </button>
             );
           })}
         </div>
       </div>
     );
   }