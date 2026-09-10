   "use client";

   import { useRef, useState } from "react";
   import { comprimirImagen } from "@/lib/comprimirImagen";

   const FORMATOS_PERMITIDOS = ["image/jpeg", "image/jpg", "image/png"];
   const TAMANO_MAXIMO_MB = 8;

   type Props = {
     onCambiar: (archivo: File | null) => void;
   };

   export default function FotoParticipante({ onCambiar }: Props) {
     const inputRef = useRef<HTMLInputElement>(null);
     const [preview, setPreview] = useState<string | null>(null);
     const [error, setError] = useState<string | null>(null);
     const [procesando, setProcesando] = useState(false);

     const manejarSeleccion = async (e: React.ChangeEvent<HTMLInputElement>) => {
       const archivo = e.target.files?.[0];
       if (!archivo) return;

       setError(null);

       if (!FORMATOS_PERMITIDOS.includes(archivo.type)) {
         setError("Imagen no válida. Selecciona un archivo JPG o PNG.");
         return;
       }

       if (archivo.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
         setError("La imagen supera el tamaño máximo permitido (8 MB).");
         return;
       }

       setProcesando(true);
       try {
         const comprimida = await comprimirImagen(archivo);
         setPreview(URL.createObjectURL(comprimida));
         onCambiar(comprimida);
       } catch {
         setError("No se pudo procesar la imagen. Intenta con otra.");
       } finally {
         setProcesando(false);
       }
     };

     const eliminar = () => {
       setPreview(null);
       setError(null);
       onCambiar(null);
       if (inputRef.current) inputRef.current.value = "";
     };

     return (
       <div className="flex flex-col gap-1">
         <label className="text-carbon-black font-semibold text-sm">
           Fotografía del participante *
         </label>

         <div className="flex items-center gap-4">
           {/* Preview pequeño */}
           <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-carbon-black/20 bg-carbon-black/5 flex items-center justify-center overflow-hidden shrink-0">
             {preview ? (
               // eslint-disable-next-line @next/next/no-img-element -- preview local (blob URL), next/image no aplica aquí
               <img src={preview} alt="Previsualización de la foto" className="w-full h-full object-cover" />
             ) : (
               <span className="text-carbon-black/30 text-[10px] text-center px-2">
                 {procesando ? "Procesando…" : "Agrega tu fotografía"}
               </span>
             )}
           </div>

           <div className="flex flex-col gap-2">
             <button
               type="button"
               onClick={() => inputRef.current?.click()}
               disabled={procesando}
               className="text-sm font-semibold text-racing-red border border-racing-red rounded-full px-4 py-2 hover:bg-racing-red hover:text-bone-white transition-colors disabled:opacity-50 self-start"
             >
               {preview ? "Cambiar foto" : "Seleccionar foto"}
             </button>

             {preview && (
               <button
                 type="button"
                 onClick={eliminar}
                 className="text-xs text-carbon-black/50 hover:text-carbon-black text-left"
               >
                 Eliminar
               </button>
             )}

             <span className="text-xs text-carbon-black/40">JPG, PNG · Máx. 8 MB</span>
           </div>

           <input
             ref={inputRef}
             type="file"
             accept="image/jpeg,image/jpg,image/png"
             onChange={manejarSeleccion}
             className="hidden"
           />
         </div>

         {error && <p className="text-racing-red text-sm">{error}</p>}
       </div>
     );
   }