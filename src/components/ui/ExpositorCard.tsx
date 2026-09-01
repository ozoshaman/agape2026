   import Image from "next/image";
   import type { Expositor } from "@/types";

   const ETIQUETAS_TIPO: Record<Expositor["tipo"], string> = {
     predicador: "Predicador",
     taller_canto: "Taller de canto",
   };

   const COLOR_LINEA: Record<Expositor["tipo"], string> = {
     predicador: "bg-racing-red",
     taller_canto: "bg-amber-gold",
   };

   export default function ExpositorCard({ expositor }: { expositor: Expositor }) {
     return (
       <div className="bg-carbon-black rounded-2xl overflow-hidden border border-bone-white/10 flex flex-col h-full">
         {/* Línea de color según categoría */}
         <div className={`h-1 w-full ${COLOR_LINEA[expositor.tipo]}`} />

         {/* Zona de fotografía (dominante) */}
         <div className="relative w-full aspect-[3/4] bg-carbon-black/60">
           {expositor.foto_url ? (
             <Image
               src={expositor.foto_url}
               alt={expositor.nombre}
               fill
               sizes="(max-width: 768px) 80vw, (max-width: 1024px) 35vw, 20vw"
               className="object-cover"
             />
           ) : (
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-bone-white/30 text-sm text-center px-4">
                 [Foto pendiente]
               </span>
             </div>
           )}

           {/* Degradado para legibilidad del número */}
           <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/50 via-transparent to-carbon-black/80" />

           {/* Número de piloto, protagonista */}
           {expositor.numero_piloto !== null && (
             <div className="absolute top-4 right-4 text-right leading-none">
               <span className="block text-5xl md:text-6xl font-bold text-bone-white drop-shadow-lg">
                 {expositor.numero_piloto}
               </span>
               <span className="block text-xs font-semibold tracking-widest text-bone-white/70">
                 Años
               </span>
             </div>
           )}

           {/* Etiqueta de categoría, esquina inferior de la foto */}
           <span
             className={`absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${COLOR_LINEA[expositor.tipo]} text-carbon-black`}
           >
             {ETIQUETAS_TIPO[expositor.tipo]}
           </span>
         </div>

         {/* Zona inferior de información */}
         <div className="flex flex-col gap-1 p-4">
           <h3 className="text-bone-white text-xl font-bold leading-tight">
             {expositor.nombre}
           </h3>
           {expositor.procedencia && (
             <p className="text-bone-white/50 text-sm">{expositor.procedencia}</p>
           )}
           {expositor.tema && (
             <p className="text-amber-gold text-sm font-semibold mt-1">
               Tema: {expositor.tema}
             </p>
           )}
         </div>
       </div>
     );
   }