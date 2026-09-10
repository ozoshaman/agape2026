   import type { Escuderia } from "@/types";
   import EscuderiaCard from "@/components/ui/EscuderiaCard";

   type Props = {
     escuderias: Escuderia[];
     seleccionadaId: string | null;
     onSeleccionar: (id: string) => void;
   };

   export default function SelectorEscuderias({ escuderias, seleccionadaId, onSeleccionar }: Props) {
     return (
       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
         {escuderias.map((escuderia) => (
           <EscuderiaCard
             key={escuderia.id}
             escuderia={escuderia}
             seleccionada={escuderia.id === seleccionadaId}
             onSeleccionar={() => onSeleccionar(escuderia.id)}
           />
         ))}
       </div>
     );
   }