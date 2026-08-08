import HeroBanner from "@/components/secciones/HeroBanner";
   import QueEsAgape from "@/components/secciones/QueEsAgape";
   import Historia from "@/components/secciones/Historia";
   import InfoEvento from "@/components/secciones/InfoEvento";

   export default function Home() {
     return (
       <>
         <HeroBanner />
         <QueEsAgape />
         <Historia />
         <InfoEvento />
       </>
     );
   }