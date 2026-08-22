   import { obtenerGaleria } from "@/lib/queries";
   import GaleriaGrid from "@/components/secciones/GaleriaGrid";

   export default async function GaleriaPage() {
     const galeria = await obtenerGaleria();

     return (
       <section className="bg-carbon-black min-h-screen">
         <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
           <div className="text-center flex flex-col gap-2 mb-12">
             <span className="text-amber-gold font-semibold tracking-widest uppercase text-sm">
               Recuerdos y adelantos
             </span>
             <h1 className="text-3xl md:text-4xl font-bold text-bone-white">
               Galería Ágape
             </h1>
           </div>

           <GaleriaGrid items={galeria} />
         </div>
       </section>
     );
   }