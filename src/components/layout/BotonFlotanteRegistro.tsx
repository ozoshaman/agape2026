   "use client";

   import Link from "next/link";
   import { usePathname } from "next/navigation";

   export default function BotonFlotanteRegistro() {
     const pathname = usePathname();

        if (pathname === "/registro" || pathname === "/galeria") return null;

     return (
       <Link
         href="/registro"
            className="fixed bottom-4 right-4 z-40 lg:hidden bg-racing-red text-bone-white px-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-carbon-black/40 hover:bg-amber-gold hover:text-carbon-black transition-colors"
       >
         Regístrate
       </Link>
     );
   }