export type Expositor = {
     id: string;
     nombre: string;
     tipo: "predicador" | "taller_canto";
     foto_url: string | null;
     biografia: string | null;
     tema: string | null;
     orden: number;
     created_at: string;
   };

   export type ItemGaleria = {
     id: string;
     tipo: "foto" | "video";
     url: string;
     descripcion: string | null;
     evento_anio: number;
     created_at: string;
   };