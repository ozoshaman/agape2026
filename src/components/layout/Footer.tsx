import Link from "next/link";

   export default function Footer() {
     const anioActual = new Date().getFullYear();

     return (
       <footer className="bg-carbon-black border-t border-racing-red mt-16">
         <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between gap-6">
           {/* Columna 1: nombre del evento */}
           <div>
             <p className="text-bone-white text-lg font-bold">
               ÁGAPE <span className="text-racing-red">2026</span>
             </p>
             <p className="text-bone-white/70 text-sm mt-1">
               Reunión Juvenil · Iglesia de Cristo
             </p>
             <p className="text-amber-gold text-sm mt-1">
               11 y 12 de diciembre de 2026
             </p>
           </div>

           {/* Columna 2: links rápidos */}
           <div className="flex flex-col gap-2">
             <Link href="/registro" className="text-bone-white hover:text-amber-gold transition-colors">
               Regístrate
             </Link>
             <Link href="/ubicacion" className="text-bone-white hover:text-amber-gold transition-colors">
               Ubicación
             </Link>
             <Link href="/expositores" className="text-bone-white hover:text-amber-gold transition-colors">
               Expositores
             </Link>
           </div>

           {/* Columna 3: redes sociales (placeholder por ahora) */}
           <div className="flex flex-col gap-2">
             <p className="text-bone-white/70 text-sm">Síguenos</p>
             <div className="flex gap-4">
               <a href="https://www.facebook.com/share/1DLjn6YGh8/" target="_blank" rel="noopener noreferrer" className="text-bone-white hover:text-amber-gold transition-colors" aria-label="Facebook">
                 Facebook
               </a>
               <a href="https://www.instagram.com/raj.agape?igsh=em1zOWh4cGN2NDF4" target="_blank" rel="noopener noreferrer" className="text-bone-white hover:text-amber-gold transition-colors" aria-label="Instagram">
                 Instagram
               </a>
             </div>
           </div>
         </div>

         <div className="border-t border-bone-white/10 py-4 text-center text-bone-white/50 text-xs">
           © {anioActual} Ágape - Iglesia de Cristo. Todos los derechos reservados.
         </div>
       </footer>
     );
   }