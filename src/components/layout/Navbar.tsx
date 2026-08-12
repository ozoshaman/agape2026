"use client";

   import { useState } from "react";
   import Link from "next/link";

   const NAV_LINKS = [
      { href: "/", label: "Inicio" },
      { href: "/#agape", label: "¿Qué es Ágape?" },
      { href: "/#historia", label: "Historia" },
      { href: "/#evento", label: "Evento" },
      { href: "/expositores", label: "Expositores" },
      { href: "/galeria", label: "Galería" },
      { href: "/ubicacion", label: "Ubicación" },
    ];

   export default function Navbar() {
     const [menuAbierto, setMenuAbierto] = useState(false);

     return (
       <header className="sticky top-0 z-50 bg-carbon-black border-b border-racing-red">
         <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
           {/* Logo / nombre del evento */}
           <Link href="/" className="text-xl font-bold text-bone-white">
             ÁGAPE <span className="text-racing-red">2026</span>
           </Link>

           {/* Links de escritorio */}
           <div className="hidden md:flex items-center gap-6">
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="text-bone-white hover:text-amber-gold transition-colors"
               >
                 {link.label}
               </Link>
             ))}
             <Link
               href="/registro"
               className="bg-racing-red text-bone-white px-4 py-2 rounded font-semibold hover:bg-amber-gold hover:text-carbon-black transition-colors"
             >
               Regístrate
             </Link>
           </div>

           {/* Botón de menú móvil */}
           <button
             className="md:hidden text-bone-white"
             onClick={() => setMenuAbierto(!menuAbierto)}
             aria-label="Abrir menú"
           >
             {menuAbierto ? "✕" : "☰"}
           </button>
         </nav>

         {/* Menú móvil desplegable */}
         {menuAbierto && (
           <div className="md:hidden flex flex-col gap-3 px-4 pb-4 bg-carbon-black">
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="text-bone-white hover:text-amber-gold transition-colors"
                 onClick={() => setMenuAbierto(false)}
               >
                 {link.label}
               </Link>
             ))}
             <Link
               href="/registro"
               className="bg-racing-red text-bone-white px-4 py-2 rounded font-semibold text-center"
               onClick={() => setMenuAbierto(false)}
             >
               Regístrate
             </Link>
           </div>
         )}
       </header>
     );
   }