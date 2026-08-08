import type { Expositor } from "@/types";
import Image from "next/image";

   const ETIQUETAS_TIPO: Record<Expositor["tipo"], string> = {
     predicador: "Predicador",
     taller_canto: "Taller de canto",
   };

   export default function ExpositorCard({ expositor }: { expositor: Expositor }) {
     return (
       <div className="bg-bone-white/5 border border-bone-white/10 rounded-lg overflow-hidden flex flex-col">
         {/* Foto (o placeholder si no hay foto_url) */}
         <div className="w-full aspect-square bg-carbon-black/40 flex items-center justify-center relative">
     {expositor.foto_url ? (
       <Image
         src={expositor.foto_url}
         alt={expositor.nombre}
         fill
         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
         className="object-cover"
       />
     ) : (
       <span className="text-bone-white/40 text-sm text-center px-4">
         [Foto pendiente]
       </span>
     )}
   </div>

         {/* Info */}
         <div className="p-5 flex flex-col gap-2">
           <span className="text-racing-red text-xs font-semibold uppercase tracking-widest">
             {ETIQUETAS_TIPO[expositor.tipo]}
           </span>
           <h3 className="text-bone-white text-xl font-bold">
             {expositor.nombre}
           </h3>
           {expositor.biografia && (
             <p className="text-bone-white/70 text-sm leading-relaxed">
               {expositor.biografia}
             </p>
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