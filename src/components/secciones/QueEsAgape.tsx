export default function QueEsAgape() {
     return (
       <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
         <div className="flex flex-col md:flex-row items-center gap-10">
           {/* Texto */}
           <div className="flex-1 flex flex-col gap-4">
             <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
               ¿Qué es Ágape?
             </span>
             <h2 className="text-3xl md:text-4xl font-bold text-carbon-black">
               Un fin de semana para acercarte a Dios y a tu comunidad
             </h2>
             <p className="text-carbon-black/70 text-lg leading-relaxed">
               Ágape es la Reunión Juvenil de la Iglesia de Cristo, un espacio pensado
               para que los jóvenes vivan una experiencia de fe, compañerismo y
               crecimiento espiritual. Cada año jóvenes de distintas congregaciones
               se reúnen para aprender, cantar y compartir juntos.
             </p>
             <p className="text-carbon-black/70 text-lg leading-relaxed">
               En 2026, vivimos esta experiencia con la energía y velocidad de la
               Fórmula 1 — porque así como en una carrera, en la vida de fe también
               necesitamos enfoque, disciplina y un buen equipo detrás.
             </p>
           </div>

           {/* Imagen placeholder */}
           <div className="flex-1 w-full">
             <div className="w-full aspect-video bg-carbon-black/10 rounded-lg flex items-center justify-center border-2 border-dashed border-carbon-black/20">
               <span className="text-carbon-black/40 text-sm">
                 [Imagen placeholder — Ágape]
               </span>
             </div>
           </div>
         </div>
       </section>
     );
   }