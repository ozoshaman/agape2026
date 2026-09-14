   "use client";

   import { useState } from "react";
   import Link from "next/link";
   import Image from "next/image";

   const NAV_LINKS = [
     { href: "/", label: "Inicio" },
     { href: "/expositores", label: "Expositores" },
     { href: "/galeria", label: "Galería" },
     { href: "/ubicacion", label: "Ubicación" },
   ];

   export default function Navbar() {
     const [menuAbierto, setMenuAbierto] = useState(false);

     return (
       <header className="fixed top-3 md:top-4 inset-x-0 z-50 px-4">
         <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3 bg-carbon-black/70 backdrop-blur-md border border-bone-white/10 rounded-full px-3 py-2 md:px-6 md:py-3 shadow-lg shadow-carbon-black/30">
           {/* Logo / nombre del evento */}
           <Link href="/" className="flex items-center gap-2 shrink-0">
             <Image
               src="/logo_agape_sin_letras_sf.png"
               alt="Ágape 2026"
               width={30}
               height={30}
               className="object-contain md:w-9 md:h-9"
             />
             <span className="text-base md:text-lg font-bold text-bone-white hidden sm:inline">
               ÁGAPE <span className="text-racing-red">2026</span>
             </span>
           </Link>

           {/* Links de escritorio */}
           <div className="hidden lg:flex items-center gap-5">
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="text-bone-white/80 text-sm hover:text-amber-gold transition-colors"
               >
                 {link.label}
               </Link>
             ))}
           </div>

           {/* CTA de escritorio */}
           <Link
             href="/registro"
             className="hidden lg:inline-block bg-racing-red text-bone-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-gold hover:text-carbon-black transition-colors shrink-0"
           >
             Regístrate
           </Link>

           {/* Botón de menú móvil */}
              <button
     className="lg:hidden shrink-0 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-bone-white/10 active:bg-bone-white/20 transition-colors"
     onClick={() => setMenuAbierto(!menuAbierto)}
     aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
     aria-expanded={menuAbierto}
   >
     <span
       className={`block w-5 h-0.5 bg-bone-white rounded-full transition-all duration-200 ${
         menuAbierto ? "rotate-45 translate-y-2" : ""
       }`}
     />
     <span
       className={`block w-5 h-0.5 bg-bone-white rounded-full transition-all duration-200 ${
         menuAbierto ? "opacity-0" : "opacity-100"
       }`}
     />
     <span
       className={`block w-5 h-0.5 bg-bone-white rounded-full transition-all duration-200 ${
         menuAbierto ? "-rotate-45 -translate-y-2" : ""
       }`}
     />
   </button>
         </nav>

         {/* Menú móvil desplegable */}
         {menuAbierto && (
           <div className="lg:hidden max-w-5xl mx-auto mt-2 flex flex-col bg-carbon-black/95 backdrop-blur-md border border-bone-white/10 rounded-3xl p-3 shadow-lg shadow-carbon-black/30 divide-y divide-bone-white/10">
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="text-bone-white/80 hover:text-amber-gold transition-colors py-3 px-3"
                 onClick={() => setMenuAbierto(false)}
               >
                 {link.label}
               </Link>
             ))}
             <div className="pt-3 px-1">
               <Link
                 href="/registro"
                 className="block bg-racing-red text-bone-white px-4 py-3 rounded-2xl font-semibold text-center"
                 onClick={() => setMenuAbierto(false)}
               >
                 Regístrate
               </Link>
             </div>
           </div>
         )}
       </header>
     );
   }