   import { z } from "zod";

   export const esquemaRegistro = z
     .object({
       escuderia_id: z.string().uuid("Selecciona una escudería"),

       nombre_completo: z
         .string()
         .trim()
         .min(3, "El nombre debe tener al menos 3 caracteres")
         .max(150, "El nombre no puede exceder 150 caracteres"),

       lugar_procedencia: z
         .string()
         .trim()
         .min(2, "Indica tu lugar de procedencia")
         .max(100, "Máximo 100 caracteres"),

       congregacion: z
         .string()
         .trim()
         .min(2, "Indica tu congregación")
         .max(100, "Máximo 100 caracteres"),

       telefono: z
         .string()
         .trim()
         .regex(/^\d{10}$/, "El teléfono debe tener exactamente 10 dígitos, sin espacios ni guiones"),

       necesita_hospedaje: z.boolean(),

       dia_llegada: z
         .enum(["2026-12-09", "2026-12-10", "2026-12-11", "2026-12-12"])
         .optional(),

       medio_transporte: z.enum(["autobus", "auto_propio", "otro"]).optional(),

       necesita_transporte_central: z.boolean(),
     })
     .superRefine((datos, ctx) => {
       // dia_llegada y medio_transporte solo son obligatorios si necesita hospedaje
       if (datos.necesita_hospedaje) {
         if (!datos.dia_llegada) {
           ctx.addIssue({
             code: z.ZodIssueCode.custom,
             path: ["dia_llegada"],
             message: "Selecciona el día de llegada",
           });
         }
         if (!datos.medio_transporte) {
           ctx.addIssue({
             code: z.ZodIssueCode.custom,
             path: ["medio_transporte"],
             message: "Selecciona un medio de transporte",
           });
         }
       }
     });

   export type RegistroFormData = z.infer<typeof esquemaRegistro>;

   // Agrupación de campos por paso del wizard — usado para validar solo
   // los campos del paso actual antes de permitir avanzar.
   export const CAMPOS_POR_PASO: (keyof RegistroFormData)[][] = [
     ["escuderia_id"],
     ["nombre_completo", "lugar_procedencia", "congregacion", "telefono"],
     ["necesita_hospedaje", "dia_llegada", "medio_transporte", "necesita_transporte_central"],
   ];