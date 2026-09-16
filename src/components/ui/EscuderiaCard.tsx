   import Image from "next/image";
   import type { Escuderia } from "@/types";

   type Props = {
     escuderia: Escuderia;
     seleccionada: boolean;
     onSeleccionar: () => void;
   };

   export default function EscuderiaCard({ escuderia, seleccionada, onSeleccionar }: Props) {
     return (
       <button
         type="button"
         onClick={onSeleccionar}
         aria-pressed={seleccionada}
         className={`
           group relative flex flex-col items-center gap-1.5 rounded-lg p-2 sm:p-3 h-full w-full
           bg-bone-white/5 border transition-all duration-200 text-center overflow-hidden
           motion-safe:hover:scale-[1.03]
           ${
             seleccionada
               ? "border-2 motion-safe:scale-[1.04]"
               : "border border-bone-white/10 hover:border-bone-white/30"
           }
         `}
         style={seleccionada ? { borderColor: escuderia.color_hex } : undefined}
       >
         {/* Línea de color superior */}
         <span
           className="absolute top-0 left-0 right-0 h-1"
           style={{ backgroundColor: escuderia.color_hex }}
         />

         {/* Check de seleccionado */}
         {seleccionada && (
           <span
             className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-carbon-black motion-safe:animate-[pulse_0.4s_ease-in-out]"
             style={{ backgroundColor: escuderia.color_hex }}
             aria-hidden="true"
           >
             ✓
           </span>
         )}

          <span className="text-bone-white/70 text-[9px] sm:text-[10px] font-semibold tracking-widest mt-1.5">
           {String(escuderia.numero).padStart(2, "0")}
         </span>

         {/* Chip de fondo claro para contraste del logo */}
         <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-md bg-bone-white/90 p-1.5 flex items-center justify-center shrink-0">
           <div className="relative w-full h-full">
             <Image
               src={escuderia.logo_url}
               alt={`Logo de ${escuderia.nombre}`}
               fill
               sizes="1000px"
               className="object-contain"
             />
           </div>
         </div>

         <span
           className={`text-[10px] sm:text-xs font-bold min-h-[1.75rem] flex items-center justify-center leading-tight px-0.5 ${
             seleccionada ? "color-carbon-black" : "color-carbon-black/70"
           }`}
         >
           {escuderia.nombre}
         </span>
       </button>
     );
   }