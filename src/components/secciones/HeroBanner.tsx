   import Link from "next/link";

   export default function HeroBanner() {
     return (
       <section className="relative bg-carbon-black overflow-hidden">
         {/* Elementos de fondo difuminados (profundidad, sin distraer) */}
         <div className="absolute inset-0 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-racing-red/20 rounded-full blur-3xl" />
           <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-amber-gold/10 rounded-full blur-3xl" />
           <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-racing-red/10 rounded-full blur-3xl" />
         </div>

         {/* Franja decorativa tipo bandera a cuadros, arriba del todo */}
         <div
           className="relative h-2 w-full"
           style={{
             backgroundImage:
               "repeating-linear-gradient(45deg, #F5F5F0 0, #F5F5F0 10px, #111317 10px, #111317 20px)",
           }}
         />

         <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-36 flex flex-col items-center text-center gap-6">
           <span className="text-amber-gold font-semibold tracking-widest uppercase text-sm">
             Reunión Anual Juvenil - Iglesia de Cristo
           </span>

           <h1 className="text-5xl md:text-7xl font-bold text-bone-white leading-tight">
             ÁGAPE <span className="text-racing-red">2026</span>
           </h1>

           <p className="text-xl md:text-2xl text-bone-white/70 max-w-2xl">
             Acelera tu fe. Vive la experiencia de un fin de semana a toda velocidad.
           </p>

           <p className="text-lg text-amber-gold font-semibold">
             11 y 12 de diciembre de 2026
           </p>

           <div className="flex flex-col sm:flex-row gap-4 mt-4">
             <Link
               href="/registro"
               className="bg-racing-red text-bone-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-gold hover:text-carbon-black transition-colors"
             >
               Regístrate ahora
             </Link>
             <Link
               href="/#agape"
               className="bg-transparent border border-bone-white/30 text-bone-white px-8 py-4 rounded-full font-semibold text-lg hover:border-amber-gold hover:text-amber-gold transition-colors"
             >
               Conoce más
             </Link>
           </div>
         </div>

         {/* Franja decorativa abajo */}
         <div
           className="relative h-2 w-full"
           style={{
             backgroundImage:
               "repeating-linear-gradient(45deg, #F5F5F0 0, #F5F5F0 10px, #111317 10px, #111317 20px)",
           }}
         />
       </section>
     );
   }