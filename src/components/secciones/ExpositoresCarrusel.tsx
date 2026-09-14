   "use client";

   import { useRef, useState } from "react";
   import type { Expositor } from "@/types";
   import ExpositorCard from "@/components/ui/ExpositorCard";
   import RevelarAlEntrar from "@/components/ui/RevelarAlEntrar";

   export default function ExpositoresCarrusel({ expositores }: { expositores: Expositor[] }) {
     const scrollRef = useRef<HTMLDivElement>(null);
     const [activo, setActivo] = useState(0);

     const handleScroll = () => {
       const contenedor = scrollRef.current;
       if (!contenedor) return;

       const primeraTarjeta = contenedor.firstElementChild as HTMLElement | null;
       if (!primeraTarjeta) return;

       const anchoConEspacio = primeraTarjeta.offsetWidth + 16; // 16px = gap-4
       const indice = Math.round(contenedor.scrollLeft / anchoConEspacio);
       setActivo(indice);
     };

     const irATarjeta = (indice: number) => {
       const contenedor = scrollRef.current;
       const tarjeta = contenedor?.children[indice] as HTMLElement | undefined;
       tarjeta?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
     };

     return (
       <div className="flex flex-col gap-6 pb-16 lg:pb-0">
         {/* Contenedor: carrusel en mobile/tablet, grid en desktop */}
         <div
           ref={scrollRef}
           onScroll={handleScroll}
           className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-px-4 px-4 lg:px-0 pb-2 [&::-webkit-scrollbar]:hidden"
         >
              {expositores.map((expositor, indice) => (
     <div
       key={expositor.id}
       className="snap-start shrink-0 w-[82%] sm:w-[48%] lg:w-auto"
     >
                <RevelarAlEntrar retraso={indice * 100}>
                    <ExpositorCard expositor={expositor} />
                </RevelarAlEntrar>
                </div>
            ))}
         </div>

         {/* Indicadores de posición, solo en mobile/tablet */}
         <div className="flex lg:hidden justify-center gap-2">
           {expositores.map((_, indice) => (
             <button
               key={indice}
               onClick={() => irATarjeta(indice)}
               aria-label={`Ir al expositor ${indice + 1}`}
               className={`w-2 h-2 rounded-full transition-colors ${
                 indice === activo ? "bg-racing-red" : "bg-bone-white/20"
               }`}
             />
           ))}
         </div>
       </div>
     );
   }