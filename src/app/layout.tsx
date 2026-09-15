import type { Metadata } from "next";
   import { Rajdhani, Inter } from "next/font/google";
   import "./globals.css";
   import Navbar from "@/components/layout/Navbar";
   import Footer from "@/components/layout/Footer";
   import BotonFlotanteRegistro from "@/components/layout/BotonFlotanteRegistro";
   

   const rajdhani = Rajdhani({
     variable: "--font-rajdhani",
     subsets: ["latin"],
     weight: ["500", "600", "700"],
   });

   const inter = Inter({
     variable: "--font-inter",
     subsets: ["latin"],
   });

      export const metadata: Metadata = {
     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
     title: {
       default: "Ágape 2026 - Reunión Juvenil Iglesia de Cristo",
       template: "%s - Ágape 2026",
     },
     description: "Reunión Juvenil Ágape 2026 - Iglesia de Cristo. Tema: Fórmula 1. 11 y 12 de diciembre de 2026.",
     openGraph: {
       title: "Ágape 2026 - Reunión Juvenil Iglesia de Cristo",
       description: "Reunión Juvenil Ágape 2026 - Iglesia de Cristo. Tema: Fórmula 1. 11 y 12 de diciembre de 2026.",
       type: "website",
       locale: "es_MX",
       images: [
         {
           url: "/og-image.jpg",
           width: 1200,
           height: 630,
           alt: "Ágape 2026 - Reunión Juvenil Iglesia de Cristo",
         },
       ],
     },
     twitter: {
       card: "summary_large_image",
       title: "Ágape 2026 - Reunión Juvenil Iglesia de Cristo",
       description: "Reunión Juvenil Ágape 2026 - Iglesia de Cristo. Tema: Fórmula 1. 11 y 12 de diciembre de 2026.",
       images: ["/og-image.jpg"],
     },
   };

   export default function RootLayout({ children }: LayoutProps<"/">) {
     return (
       <html lang="es" className={`${rajdhani.variable} ${inter.variable} h-full`}>
         <body className="antialiased flex flex-col min-h-screen">
           <Navbar />
           <main className="flex-1">{children}</main>
           <Footer />
           <BotonFlotanteRegistro />
         </body>
       </html>
     );
   }