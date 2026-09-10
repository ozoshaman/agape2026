   "use client";
   import { useState, useEffect } from "react";
   import { useRouter } from "next/navigation";
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import FotoParticipante from "@/components/formulario/FotoParticipante";
   import {
     esquemaRegistro,
     CAMPOS_POR_PASO,
     type RegistroFormData,
   } from "@/lib/validaciones";
   import type { Escuderia } from "@/types";
   import SelectorEscuderias from "@/components/secciones/SelectorEscuderias";

   const TITULOS_PASO = [
     { numero: "01", etiqueta: "Choose your team", titulo: "Selecciona tu escudería" },
     { numero: "02", etiqueta: "Registration", titulo: "Datos del participante" },
     { numero: "03", etiqueta: "Arrival & Services", titulo: "Llegada y servicios" },
   ];

   export default function FormularioRegistro({ escuderias }: { escuderias: Escuderia[] }) {
     const [paso, setPaso] = useState(0);
     const [envioExitoso, setEnvioExitoso] = useState(false);
     const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
     const [fotoArchivo, setFotoArchivo] = useState<File | null>(null);
     const [errorFoto, setErrorFoto] = useState<string | null>(null);
     const router = useRouter();

     const {
       register,
       handleSubmit,
       trigger,
       watch,
       setValue,
       formState: { errors, isSubmitting },
     } = useForm<RegistroFormData>({
       resolver: zodResolver(esquemaRegistro),
       defaultValues: {
         necesita_hospedaje: false,
         necesita_transporte_central: false,
       },
     });

     const escuderiaIdSeleccionada = watch("escuderia_id");
     const necesitaHospedaje = watch("necesita_hospedaje");
     const medioTransporte = watch("medio_transporte");
     
     const avanzar = async () => {
     const campos = CAMPOS_POR_PASO[paso];
     const valido = await trigger(campos);

     if (paso === 1 && !fotoArchivo) {
       setErrorFoto("Selecciona una fotografía para continuar.");
       return;
     }

     if (valido) {
       setErrorFoto(null);
       setPaso((p) => Math.min(p + 1, TITULOS_PASO.length - 1));
     }
   };

     const retroceder = () => {
       setPaso((p) => Math.max(p - 1, 0));
     };

     const alCambiarHospedaje = (marcado: boolean) => {
       setValue("necesita_hospedaje", marcado);
       if (!marcado) {
         // Si ya no necesita hospedaje, limpiamos los campos dependientes
         setValue("dia_llegada", undefined);
         setValue("medio_transporte", undefined);
         setValue("necesita_transporte_central", false);
       }
     };

     const onSubmit = async (data: RegistroFormData) => {
       setErrorEnvio(null);

       try {
         const respuesta = await fetch("/api/registro", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
         });

         const resultado = await respuesta.json();

         if (!respuesta.ok) {
           setErrorEnvio(resultado.error ?? "Ocurrió un error inesperado.");
           return;
         }

         setEnvioExitoso(true);
       } catch {
         setErrorEnvio("No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.");
       }
     };
     useEffect(() => {
       if (!envioExitoso) return;
       const temporizador = setTimeout(() => {
         router.push("/");
       }, 5000);
       return () => clearTimeout(temporizador);
     }, [envioExitoso, router]);
     if (envioExitoso) {
       return (
         <div className="max-w-xl mx-auto text-center flex flex-col gap-4 py-12">
           <h2 className="text-2xl font-bold text-carbon-black">
             ¡Listo! Tu registro fue recibido 🏁
           </h2>
           <p className="text-carbon-black/70">
             Nos vemos en la pista el 11 y 12 de diciembre. ¡Gracias por registrarte!
           </p>
         </div>
       );
     }

     const infoPaso = TITULOS_PASO[paso];

     return (
             <form
     onSubmit={(e) => e.preventDefault()}
     onKeyDown={(e) => {
       if (e.key === "Enter") {
         e.preventDefault();
       }
     }}
     className="flex flex-col gap-6 max-w-xl mx-auto"
   >
         {/* Indicador de progreso */}
         <div className="flex items-center gap-2">
           {TITULOS_PASO.map((_, indice) => (
             <div
               key={indice}
               className={`h-1 flex-1 rounded-full transition-colors ${
                 indice <= paso ? "bg-racing-red" : "bg-carbon-black/10"
               }`}
             />
           ))}
         </div>

         {/* Encabezado del paso actual */}
         <div className="flex flex-col gap-1">
           <span className="text-racing-red text-xs font-semibold tracking-widest">
             {infoPaso.numero} · {infoPaso.etiqueta.toUpperCase()}
           </span>
           <h2 className="text-2xl font-bold text-carbon-black">{infoPaso.titulo}</h2>
         </div>

         {errorEnvio && (
           <div className="bg-racing-red/10 border border-racing-red text-racing-red rounded px-4 py-3 text-sm">
             {errorEnvio}
           </div>
         )}

         {/* PASO 1 — Escudería */}
         {paso === 0 && (
           <div className="flex flex-col gap-2">
             <SelectorEscuderias
               escuderias={escuderias}
               seleccionadaId={escuderiaIdSeleccionada ?? null}
               onSeleccionar={(id) =>
                 setValue("escuderia_id", id, { shouldValidate: true })
               }
             />
             {errors.escuderia_id && (
               <p className="text-racing-red text-sm">{errors.escuderia_id.message}</p>
             )}
           </div>
         )}

           {/* PASO 2 — Datos del participante */}
   {paso === 1 && (
     <div className="flex flex-col gap-6">
       <div className="flex flex-col gap-1">
         <label htmlFor="nombre_completo" className="text-carbon-black font-semibold text-sm">
           Nombre completo *
         </label>
         <input
           id="nombre_completo"
           type="text"
           {...register("nombre_completo")}
           className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red"
         />
         {errors.nombre_completo && (
           <p className="text-racing-red text-sm">{errors.nombre_completo.message}</p>
         )}
       </div>

       <div className="flex flex-col gap-1">
         <label htmlFor="lugar_procedencia" className="text-carbon-black font-semibold text-sm">
           Lugar de procedencia *
         </label>
         <input
           id="lugar_procedencia"
           type="text"
           placeholder="Ej. Piedras Negras, Coahuila"
           {...register("lugar_procedencia")}
           className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red"
         />
         {errors.lugar_procedencia && (
           <p className="text-racing-red text-sm">{errors.lugar_procedencia.message}</p>
         )}
       </div>

       <div className="flex flex-col gap-1">
         <label htmlFor="congregacion" className="text-carbon-black font-semibold text-sm">
           Congregación *
         </label>
         <input
           id="congregacion"
           type="text"
           {...register("congregacion")}
           className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red"
         />
         {errors.congregacion && (
           <p className="text-racing-red text-sm">{errors.congregacion.message}</p>
         )}
       </div>

       <div className="flex flex-col gap-1">
         <label htmlFor="telefono" className="text-carbon-black font-semibold text-sm">
           Teléfono (10 dígitos) *
         </label>
         <input
           id="telefono"
           type="tel"
           placeholder="8711234567"
           {...register("telefono")}
           className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red"
         />
         {errors.telefono && (
           <p className="text-racing-red text-sm">{errors.telefono.message}</p>
         )}
       </div>

       <div className="flex flex-col gap-1">
         <FotoParticipante
           onCambiar={(archivo) => {
             setFotoArchivo(archivo);
             if (archivo) setErrorFoto(null);
           }}
         />
         {errorFoto && <p className="text-racing-red text-sm">{errorFoto}</p>}
       </div>
     </div>
   )}

         {/* PASO 3 — Llegada y servicios (fusionado) */}
         {paso === 2 && (
           <div className="flex flex-col gap-6">
             <div className="flex items-center gap-3">
               <input
                 id="necesita_hospedaje"
                 type="checkbox"
                 checked={necesitaHospedaje}
                 onChange={(e) => alCambiarHospedaje(e.target.checked)}
                 className="w-5 h-5 accent-racing-red"
               />
               <label htmlFor="necesita_hospedaje" className="text-carbon-black text-sm">
                 ¿Necesitas hospedaje?
               </label>
             </div>

             {necesitaHospedaje && (
               <div className="flex flex-col gap-6 pl-1 border-l-2 border-racing-red/20 pl-4">
                 <div className="flex flex-col gap-1">
                   <label htmlFor="dia_llegada" className="text-carbon-black font-semibold text-sm">
                     Día de llegada *
                   </label>
                   <select
                     id="dia_llegada"
                     {...register("dia_llegada")}
                     defaultValue=""
                     className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red bg-bone-white"
                   >
                     <option value="" disabled>
                       Selecciona una opción
                     </option>
                     <option value="2026-12-09">Miércoles 9 de diciembre</option>
                     <option value="2026-12-10">Jueves 10 de diciembre</option>
                     <option value="2026-12-11">Viernes 11 de diciembre</option>
                     <option value="2026-12-12">Sábado 12 de diciembre</option>
                   </select>
                   {errors.dia_llegada && (
                     <p className="text-racing-red text-sm">{errors.dia_llegada.message}</p>
                   )}
                 </div>

                 <div className="flex flex-col gap-1">
                   <label htmlFor="medio_transporte" className="text-carbon-black font-semibold text-sm">
                     Medio de transporte *
                   </label>
                   <select
                     id="medio_transporte"
                     {...register("medio_transporte")}
                     defaultValue=""
                     className="border border-carbon-black/20 rounded px-4 py-2 focus:outline-none focus:border-racing-red bg-bone-white"
                   >
                     <option value="" disabled>
                       Selecciona una opción
                     </option>
                     <option value="autobus">Autobús</option>
                     <option value="auto_propio">Auto propio</option>
                     <option value="otro">Otro</option>
                   </select>
                   {errors.medio_transporte && (
                     <p className="text-racing-red text-sm">{errors.medio_transporte.message}</p>
                   )}
                 </div>

                 {medioTransporte && medioTransporte !== "auto_propio" && (
                   <div className="flex items-center gap-3">
                     <input
                       id="necesita_transporte_central"
                       type="checkbox"
                       {...register("necesita_transporte_central")}
                       className="w-5 h-5 accent-racing-red"
                     />
                     <label htmlFor="necesita_transporte_central" className="text-carbon-black text-sm">
                       ¿Necesitas transporte desde la central?
                     </label>
                   </div>
                 )}
               </div>
             )}
           </div>
         )}

         {/* Navegación entre pasos */}
         <div className="flex items-center justify-between mt-2">
           {paso > 0 ? (
             <button
               type="button"
               onClick={retroceder}
               className="text-carbon-black/60 font-semibold hover:text-carbon-black transition-colors"
             >
               ← Atrás
             </button>
           ) : (
             <span />
           )}

           {paso < TITULOS_PASO.length - 1 ? (
             <button
               type="button"
               onClick={avanzar}
               className="bg-racing-red text-bone-white px-6 py-3 rounded-full font-bold hover:bg-amber-gold hover:text-carbon-black transition-colors"
             >
               Continuar →
             </button>
           ) : (
                <button
     type="button"
     disabled={isSubmitting}
     onClick={handleSubmit(onSubmit)}
     className="bg-racing-red text-bone-white px-6 py-3 rounded-full font-bold hover:bg-amber-gold hover:text-carbon-black transition-colors disabled:opacity-50"
   >
     {isSubmitting ? "Enviando..." : "Registrarme"}
   </button>
           )}
         </div>
       </form>
     );
   }