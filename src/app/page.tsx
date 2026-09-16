   import HeroBanner from "@/components/secciones/HeroBanner";
   import QueEsAgape from "@/components/secciones/QueEsAgape";
   import Historia from "@/components/secciones/Historia";
   import InfoEvento from "@/components/secciones/InfoEvento";

   export default function Home() {
     const eventoJsonLd = {
       "@context": "https://schema.org",
       "@type": "Event",
       name: "Ágape 2026",
       description:
         "Reunión Juvenil de la Iglesia de Cristo, con temática de Fórmula 1. Predicaciones, taller de canto y convivencia juvenil.",
       startDate: "2026-12-11",
       endDate: "2026-12-12",
       eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
       eventStatus: "https://schema.org/EventScheduled",
       location: {
         "@type": "Place",
         name: "Gimnasio Municipal Milo Martínez de la Rosa",
         address: {
           "@type": "PostalAddress",
           streetAddress: "Cdad. Deportiva",
           addressLocality: "Monclova",
           addressRegion: "Coahuila",
           postalCode: "25750",
           addressCountry: "MX",
         },
       },
       organizer: {
         "@type": "Organization",
         name: "Iglesia de Cristo",
       },
     };

     return (
       <>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(eventoJsonLd) }}
         />
         <HeroBanner />
         <QueEsAgape />
         <Historia />
         <InfoEvento />
       </>
     );
   }