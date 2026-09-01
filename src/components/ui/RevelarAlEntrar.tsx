   "use client";

   import { useEffect, useRef, useState } from "react";

   type Props = {
     children: React.ReactNode;
     retraso?: number;
     className?: string;
   };

   export default function RevelarAlEntrar({ children, retraso = 0, className = "" }: Props) {
     const ref = useRef<HTMLDivElement>(null);
     const [visible, setVisible] = useState(false);

     useEffect(() => {
       const elemento = ref.current;
       if (!elemento) return;

       const observador = new IntersectionObserver(
         ([entrada]) => {
           if (entrada.isIntersecting) {
             setVisible(true);
             observador.unobserve(elemento);
           }
         },
         { threshold: 0.15 }
       );

       observador.observe(elemento);
       return () => observador.disconnect();
     }, []);

     return (
       <div
         ref={ref}
         style={{ transitionDelay: visible ? `${retraso}ms` : "0ms" }}
         className={`
           motion-safe:transition-all motion-safe:duration-700
           ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
           ${className}
         `}
       >
         {children}
       </div>
     );
   }