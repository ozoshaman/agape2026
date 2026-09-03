   import { SEDES } from "./UbicacionMap";

   const sedePrincipal = SEDES[0];

   export default function InfoEvento() {
     return (
       <section id="evento" className="bg-carbon-black py-16 md:py-24 scroll-mt-20">
         <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
           <div className="text-center flex flex-col gap-2">
             <span className="text-amber-gold font-semibold tracking-widest uppercase text-sm">
               Información del evento
             </span>
             <h2 className="text-3xl md:text-4xl font-bold text-bone-white">
               Toma tus banderas y prepárate
             </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-bone-white/5 border border-bone-white/10 rounded-lg p-6 flex flex-col gap-2 text-center">
               <span className="text-racing-red font-semibold uppercase text-sm tracking-widest">
                 Fecha
               </span>
               <span className="text-bone-white text-xl font-bold">
                 11 y 12 de diciembre, 2026
               </span>
             </div>

             <div className="bg-bone-white/5 border border-bone-white/10 rounded-lg p-6 flex flex-col gap-2 text-center">
               <span className="text-racing-red font-semibold uppercase text-sm tracking-widest">
                 Ciudad
               </span>
               <span className="text-bone-white text-xl font-bold">
                 Monclova, Coah.
               </span>
             </div>

             <div className="bg-bone-white/5 border border-bone-white/10 rounded-lg p-6 flex flex-col gap-3 text-center items-center">
               <span className="text-racing-red font-semibold uppercase text-sm tracking-widest">
                 Lugar
               </span>
               <span className="text-bone-white text-xl font-bold leading-tight">
                 {sedePrincipal.nombre}
               </span>
               <a
                 href={sedePrincipal.mapsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-2 text-amber-gold text-sm font-semibold hover:text-bone-white transition-colors"
               >
                 Cómo llegar
                 <span className="transition-transform group-hover:translate-x-1">→</span>
               </a>
             </div>
           </div>
         </div>
       </section>
     );
   }