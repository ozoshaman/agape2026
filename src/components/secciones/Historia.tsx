export default function Historia() {
     return (
       <section id="historia" className="max-w-6xl mx-auto px-4 py-16 md:py-24 scroll-mt-20">
         <div className="flex flex-col md:flex-row-reverse items-center gap-10">
           {/* Texto */}
           <div className="flex-1 flex flex-col gap-4">
             <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
               Nuestra historia
             </span>
             <h2 className="text-3xl md:text-4xl font-bold text-carbon-black">
               Años de fe, crecimiento y buenos recuerdos
             </h2>
             <p className="text-carbon-black/70 text-lg leading-relaxed">
               Ágape nació como un pequeño encuentro entre jóvenes de congregaciones
               cercanas, con el deseo de compartir un fin de semana enfocado en
               fortalecer su fe. Con el paso de los años, el evento fue creciendo,
               sumando más jóvenes, más congregaciones y nuevas generaciones de
               asistentes.
             </p>
             <p className="text-carbon-black/70 text-lg leading-relaxed">
               Cada edición ha tenido su propia identidad y temática, pero siempre
               con el mismo propósito: crear un espacio seguro de comunidad,
               enseñanza y diversión para la juventud. Este año, la temática de
               Fórmula 1 nos invita a vivir la carrera de la fe con pasión y
               constancia.
             </p>
           </div>

           {/* Imagen placeholder */}
           <div className="flex-1 w-full">
             <div className="w-full aspect-video bg-carbon-black/10 rounded-lg flex items-center justify-center border-2 border-dashed border-carbon-black/20">
               <span className="text-carbon-black/40 text-sm">
                 [Imagen placeholder — Ediciones anteriores]
               </span>
             </div>
           </div>
         </div>
       </section>
     );
   }