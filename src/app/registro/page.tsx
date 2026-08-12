import FormularioRegistro from "@/components/formulario/FormularioRegistro";

   export default function RegistroPage() {
     return (
       <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
         <div className="text-center flex flex-col gap-2 mb-12">
           <span className="text-racing-red font-semibold tracking-widest uppercase text-sm">
             Asegura tu lugar
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-carbon-black">
             Registro Ágape 2026
           </h1>
           <p className="text-carbon-black/70 mt-2">
             Llena tus datos para confirmar tu asistencia al evento.
           </p>
         </div>

         <FormularioRegistro />
       </section>
     );
   }