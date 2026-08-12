import { z } from "zod";

   export const esquemaRegistro = z.object({
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

     dia_llegada: z.enum(["2026-12-11", "2026-12-12"], {
     message: "Selecciona el día de llegada",
    }),

     medio_transporte: z.enum(["autobus", "auto_propio", "otro"], {
       message: "Selecciona un medio de transporte",
     }),

     necesita_transporte_central: z.boolean(),
   });

   export type RegistroFormData = z.infer<typeof esquemaRegistro>;