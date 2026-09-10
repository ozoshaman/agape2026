   /**
    * Comprime una imagen en el navegador usando <canvas>, sin librerías externas.
    * Redimensiona al ancho máximo indicado y reduce la calidad JPEG.
    */
   export function comprimirImagen(
     archivo: File,
     anchoMaximo = 800,
     calidad = 0.75
   ): Promise<File> {
     return new Promise((resolve, reject) => {
       const lector = new FileReader();

       lector.onload = (evento) => {
         const imagen = new Image();

         imagen.onload = () => {
           const escala = Math.min(1, anchoMaximo / imagen.width);
           const ancho = imagen.width * escala;
           const alto = imagen.height * escala;

           const canvas = document.createElement("canvas");
           canvas.width = ancho;
           canvas.height = alto;

           const contexto = canvas.getContext("2d");
           if (!contexto) {
             reject(new Error("No se pudo procesar la imagen."));
             return;
           }

           contexto.drawImage(imagen, 0, 0, ancho, alto);

           canvas.toBlob(
             (blob) => {
               if (!blob) {
                 reject(new Error("No se pudo comprimir la imagen."));
                 return;
               }
               const archivoComprimido = new File([blob], archivo.name, {
                 type: "image/jpeg",
               });
               resolve(archivoComprimido);
             },
             "image/jpeg",
             calidad
           );
         };

         imagen.onerror = () => reject(new Error("El archivo no es una imagen válida."));
         imagen.src = evento.target?.result as string;
       };

       lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
       lector.readAsDataURL(archivo);
     });
   }