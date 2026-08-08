const DATOS_EVENTO = [
     {
       titulo: "Fecha",
       valor: "11 y 12 de diciembre, 2026",
     },
     {
       titulo: "Ciudad",
       valor: "Aguascalientes, Ags.",
     },
     {
       titulo: "Lugar",
       valor: "Por confirmar",
     },
   ];

   export default function InfoEvento() {
     return (
       <section className="bg-carbon-black py-16 md:py-24">
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
             {DATOS_EVENTO.map((dato) => (
               <div
                 key={dato.titulo}
                 className="bg-bone-white/5 border border-bone-white/10 rounded-lg p-6 flex flex-col gap-2 text-center"
               >
                 <span className="text-racing-red font-semibold uppercase text-sm tracking-widest">
                   {dato.titulo}
                 </span>
                 <span className="text-bone-white text-xl font-bold">
                   {dato.valor}
                 </span>
               </div>
             ))}
           </div>
         </div>
       </section>
     );
   }