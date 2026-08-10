type Sede = {
     nombre: string;
     dia: string;
     direccion: string;
     embedUrl: string;
     mapsUrl: string;
   };

   const SEDES: Sede[] = [
     {
       nombre: "Iglesia de Cristo Héroes del 47",
       dia: "Viernes y sábado",
       direccion: "Monclova, Coahuila",
       embedUrl:
         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.70863227738!2d-101.41296592448685!3d26.912740676647164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868bcd933ada0c61%3A0xf813baed41b6b56a!2sIglesia%20De%20Cristo%20Heroes%20Del%2047!5e0!3m2!1ses-419!2smx!4v1786390726257!5m2!1ses-419!2smx",
       mapsUrl:
         "https://www.google.com/maps/search/?api=1&query=Iglesia+de+Cristo+Heroes+del+47",
     },
   ];

   export default function UbicacionMap() {
     return (
       <div className="flex flex-col gap-10">
         {SEDES.map((sede) => (
           <div
             key={sede.nombre}
             className="flex flex-col gap-4 border border-carbon-black/10 rounded-lg p-6"
           >
             <div className="flex flex-col gap-1">
               <span className="text-racing-red font-semibold uppercase text-sm tracking-widest">
                 {sede.dia}
               </span>
               <h3 className="text-xl font-bold text-carbon-black">
                 {sede.nombre}
               </h3>
               <p className="text-carbon-black/70 text-sm">{sede.direccion}</p>
             </div>

             <div className="w-full aspect-video rounded-lg overflow-hidden">
               <iframe
                 src={sede.embedUrl}
                 className="w-full h-full border-0"
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title={`Mapa de ${sede.nombre}`}
               />
             </div>

             <a
               href={sede.mapsUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="self-start bg-racing-red text-bone-white px-6 py-3 rounded font-semibold hover:bg-amber-gold hover:text-carbon-black transition-colors"
             >
               Cómo llegar
             </a>
           </div>
         ))}
       </div>
     );
   }