import { obtenerGaleria } from "@/lib/queries";
   import GaleriaItem from "@/components/ui/GaleriaItem";

   export default async function GaleriaPage() {
     const galeria = await obtenerGaleria();

     return (
       <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
         <div className="text-center flex flex-col gap-2 mb-12">
           <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
             Recuerdos y adelantos
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-carbon-black">
             Galería Ágape
           </h1>
         </div>

         {galeria.length === 0 ? (
           <p className="text-center text-carbon-black/60">
             Aún no hay contenido en la galería.
           </p>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {galeria.map((item) => (
               <GaleriaItem key={item.id} item={item} />
             ))}
           </div>
         )}
       </section>
     );
   }