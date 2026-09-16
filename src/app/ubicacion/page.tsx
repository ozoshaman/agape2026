   import UbicacionMap from "@/components/secciones/UbicacionMap";
   import RevelarAlEntrar from "@/components/ui/RevelarAlEntrar";
   import type { Metadata } from "next";

    export const metadata: Metadata = {
      title: "Ubicación",
      description: "Dónde se realizará Ágape 2026: Gimnasio Municipal Milo Martínez de la Rosa, Monclova, Coahuila.",
    };

   export default function UbicacionPage() {
     return (
       <section className="bg-carbon-black min-h-screen">
         <div className="max-w-6xl mx-auto px-4 py-16 pt-22 md:pt-28 md:py-24">
           <div className="flex flex-col gap-2 mb-12 max-w-2xl">
             <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
               Location
             </span>
             <h1 className="text-3xl md:text-4xl font-bold text-bone-white uppercase">
               Dónde nos vemos
             </h1>
             <p className="text-bone-white/60">
               Encuentra el punto donde comenzará esta gran reunión.
             </p>
           </div>

           <RevelarAlEntrar>
             <UbicacionMap />
           </RevelarAlEntrar>
         </div>
       </section>
     );
   }