   import { obtenerExpositores } from "@/lib/queries";
   import ExpositoresCarrusel from "@/components/secciones/ExpositoresCarrusel";

   export default async function ExpositoresPage() {
     const expositores = await obtenerExpositores();

     return (
       <section className="bg-carbon-black min-h-screen">
         <div className="max-w-6xl mx-auto pt-24 md:pt-28 pb-16 md:pb-24">
           <div className="text-center flex flex-col gap-2 mb-12 px-4">
             <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
               We Race As One
             </span>
             <h1 className="text-3xl md:text-4xl font-bold text-bone-white">
               Nuestros Expositores
             </h1>
             <p className="text-bone-white/60 max-w-xl mx-auto">
               Conoce a los Hermanos que formarán parte de esta gran reunión.
             </p>
           </div>

           {expositores.length === 0 ? (
             <p className="text-center text-bone-white/60">
               Aún no hay expositores registrados.
             </p>
           ) : (
             <ExpositoresCarrusel expositores={expositores} />
           )}
         </div>
       </section>
     );
   }