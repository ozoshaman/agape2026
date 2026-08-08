import { obtenerExpositores } from "@/lib/queries";
   import ExpositorCard from "@/components/ui/ExpositorCard";

   export default async function ExpositoresPage() {
     const expositores = await obtenerExpositores();

     return (
       <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
         <div className="text-center flex flex-col gap-2 mb-12">
           <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
             Nuestros invitados
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-carbon-black">
             Expositores Ágape 2026
           </h1>
         </div>

         {expositores.length === 0 ? (
           <p className="text-center text-carbon-black/60">
             Aún no hay expositores registrados.
           </p>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
             {expositores.map((expositor) => (
               <ExpositorCard key={expositor.id} expositor={expositor} />
             ))}
           </div>
         )}
       </section>
     );
   }