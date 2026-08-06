import type { Metadata } from "next";
   import { Rajdhani, Inter } from "next/font/google";
   import "./globals.css";
   import Navbar from "@/components/layout/Navbar";
   import Footer from "@/components/layout/Footer";

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
     title: "Ágape 2026",
     description: "Reunión Juvenil Ágape 2026 - Iglesia de Cristo. Tema: Fórmula 1.",
   };

   export default function RootLayout({ children }: LayoutProps<"/">) {
     return (
       <html lang="es" className={`${rajdhani.variable} ${inter.variable} h-full`}>
         <body className="antialiased flex flex-col min-h-screen">
           <Navbar />
           <main className="flex-1">{children}</main>
           <Footer />
         </body>
       </html>
     );
   }