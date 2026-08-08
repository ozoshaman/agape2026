import Link from "next/link";

   export default function HeroBanner() {
     return (
       <section className="relative bg-carbon-black overflow-hidden">
         {/* Franja decorativa tipo bandera a cuadros, arriba del todo */}
         <div
           className="h-2 w-full"
           style={{
             backgroundImage:
               "repeating-linear-gradient(45deg, #F5F5F0 0, #F5F5F0 10px, #111317 10px, #111317 20px)",
           }}
         />

         <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center gap-6">
           <span className="text-amber-gold font-semibold tracking-widest uppercase text-sm">
             Reunión Juvenil · Iglesia de Cristo
           </span>

           <h1 className="text-5xl md:text-7xl font-bold text-bone-white leading-tight">
             ÁGAPE <span className="text-racing-red">2026</span>
           </h1>

           <p className="text-xl md:text-2xl text-bone-white/80 max-w-2xl">
             Acelera tu fe. Vive la experiencia de un fin de semana a toda velocidad.
           </p>

           <p className="text-lg text-amber-gold font-semibold">
             11 y 12 de diciembre de 2026
           </p>

           <Link
             href="/registro"
             className="mt-4 bg-racing-red text-bone-white px-8 py-4 rounded font-bold text-lg hover:bg-amber-gold hover:text-carbon-black transition-colors"
           >
             REGÍSTRATE AHORA
           </Link>
         </div>

         {/* Franja decorativa abajo */}
         <div
           className="h-2 w-full"
           style={{
             backgroundImage:
               "repeating-linear-gradient(45deg, #F5F5F0 0, #F5F5F0 10px, #111317 10px, #111317 20px)",
           }}
         />
       </section>
     );
   }