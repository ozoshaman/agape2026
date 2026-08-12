import { NextRequest, NextResponse } from "next/server";
   import { esquemaRegistro } from "@/lib/validaciones";
   import { supabaseAdmin } from "@/lib/supabaseAdmin";

   export async function POST(request: NextRequest) {
     // 1. Leer el cuerpo de la petición
     let body: unknown;
     try {
       body = await request.json();
     } catch {
       return NextResponse.json(
         { error: "Cuerpo de la petición inválido." },
         { status: 400 }
       );
     }

     // 2. Validar con el mismo esquema de Zod que usa el cliente
     //    (nunca confiamos en que el cliente ya validó correctamente)
     const resultado = esquemaRegistro.safeParse(body);

     if (!resultado.success) {
       return NextResponse.json(
         {
           error: "Datos inválidos.",
           detalles: resultado.error.flatten().fieldErrors,
         },
         { status: 400 }
       );
     }

     const datos = resultado.data;

     // 3. Insertar en Supabase usando la llave de servicio
     const { error } = await supabaseAdmin.from("registros").insert({
       nombre_completo: datos.nombre_completo,
       lugar_procedencia: datos.lugar_procedencia,
       congregacion: datos.congregacion,
       telefono: datos.telefono,
       necesita_hospedaje: datos.necesita_hospedaje,
       dia_llegada: datos.dia_llegada,
       medio_transporte: datos.medio_transporte,
       necesita_transporte_central: datos.necesita_transporte_central,
     });

     // 4. Manejar el caso de teléfono duplicado (índice único que creamos)
     if (error) {
       if (error.code === "23505") {
         return NextResponse.json(
           { error: "Ya existe un registro con este número de teléfono." },
           { status: 409 }
         );
       }

       console.error("Error al insertar registro:", error.message);
       return NextResponse.json(
         { error: "Ocurrió un error al guardar tu registro. Intenta de nuevo." },
         { status: 500 }
       );
     }

     // 5. Éxito
     return NextResponse.json({ ok: true }, { status: 201 });
   }