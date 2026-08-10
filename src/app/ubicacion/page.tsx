import UbicacionMap from "@/components/secciones/UbicacionMap";

   export default function UbicacionPage() {
     return (
       <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
         <div className="text-center flex flex-col gap-2 mb-12">
           <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
             ¿Aquí nos vemos?
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-carbon-black">
             Ubicación
           </h1>
         </div>

         <UbicacionMap />
       </section>
     );
   }