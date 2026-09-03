   import Image from "next/image";

   export type Sede = {
     numero: string;
     nombre: string;
     direccion: string;
     fecha: string;
     mapsUrl: string;
   };

   export const SEDES: Sede[] = [
     {
       numero: "01",
       nombre: "Gimnasio Municipal Milo Martínez de la Rosa",
       direccion: "Cdad. Deportiva, 25750 Monclova, Coah., México",
       fecha: "11 - 12 DICIEMBRE 2026",
       mapsUrl:
         "https://www.google.com/maps/search/?api=1&query=Gimnasio+Municipal+Milo+Martinez+de+la+Rosa+Monclova+Coahuila",
     },
   ];

   export default function UbicacionMap() {
     return (
       <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
         {/* Imagen estática del circuito */}
         <div className="w-full lg:w-[58%] relative aspect-[4/3] rounded-2xl overflow-hidden border border-bone-white/10">
           <Image
             src="/Mapa_lugar.jpg"
             alt="Mapa estilizado del recorrido hacia la sede de Ágape 2026"
             fill
             sizes="(max-width: 1024px) 100vw, 58vw"
             className="object-cover"
           />
         </div>

         {/* Información de la(s) sede(s) */}
         <div className="w-full lg:w-[42%] flex flex-col gap-8">
           {SEDES.map((sede) => (
             <div key={sede.numero} className="flex flex-col gap-3">
               <div className="flex items-center gap-3 text-racing-red">
                 <span className="text-sm font-bold tracking-widest">
                   LOCATION / {sede.numero}
                 </span>
                 <span className="flex-1 h-px bg-racing-red/40" />
               </div>

               <h3 className="text-2xl md:text-3xl font-bold text-bone-white uppercase">
                 {sede.nombre}
               </h3>

               <p className="text-bone-white/60 text-base leading-relaxed">
                 {sede.direccion}
               </p>

               <p className="text-amber-gold font-semibold text-sm tracking-widest">
                 {sede.fecha}
               </p>

               <a
                 href={sede.mapsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group self-start mt-2 inline-flex items-center gap-2 bg-racing-red text-bone-white px-6 py-3 rounded-full font-semibold hover:bg-amber-gold hover:text-carbon-black transition-colors"
               >
                 Cómo llegar
                 <span className="transition-transform group-hover:translate-x-1">→</span>
               </a>
             </div>
           ))}
         </div>
       </div>
     );
   }