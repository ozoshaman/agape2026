import { supabase } from "./supabaseClient";
   import type { Expositor, ItemGaleria } from "@/types";

   export async function obtenerExpositores(): Promise<Expositor[]> {
     const { data, error } = await supabase
       .from("expositores")
       .select("*")
       .order("created_at", { ascending: true });

     if (error) {
       console.error("Error al obtener expositores:", error.message);
       return [];
     }

     return data ?? [];
   }

   export async function obtenerGaleria(): Promise<ItemGaleria[]> {
     const { data, error } = await supabase
       .from("galeria")
       .select("*")
       .order("created_at", { ascending: true });

     if (error) {
       console.error("Error al obtener galeria:", error.message);
       return [];
     }

     return data ?? [];
   }