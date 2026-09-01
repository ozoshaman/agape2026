 import Image from "next/image";
export default function QueEsAgape() {
     return (
       <section id="agape" className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-8 md:pb-12 scroll-mt-20">
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

            {/* Imagen real */}
               <div className="flex-1 w-full">
                 <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                   <Image
                     src="/agape15.jpg"
                     alt="Ediciones anteriores de Ágape"
                     fill
                     sizes="(max-width: 768px) 100vw, 50vw"
                     className="object-cover"
                   />
                 </div>
               </div>
         </div>
       </section>
     );
   }