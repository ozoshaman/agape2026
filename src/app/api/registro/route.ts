   import { randomUUID } from "crypto";
   import { NextRequest, NextResponse } from "next/server";
   import { esquemaRegistro } from "@/lib/validaciones";
   import { supabaseAdmin } from "@/lib/supabaseAdmin";

   const MAX_INTENTOS_NUMERO = 8;

   export async function POST(request: NextRequest) {
     // 1. Leer el FormData (ya no es JSON puro, porque incluye un archivo)
     let formData: FormData;
     try {
       formData = await request.formData();
     } catch {
       return NextResponse.json({ error: "Cuerpo de la petición inválido." }, { status: 400 });
     }
          // 2. Verificar el token de Turnstile con Cloudflare
     const turnstileToken = formData.get("turnstileToken");
     if (typeof turnstileToken !== "string" || !turnstileToken) {
       return NextResponse.json(
         { error: "Verificación de seguridad no completada. Recarga la página e intenta de nuevo." },
         { status: 400 }
       );
     }

     const verificacion = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         secret: process.env.TURNSTILE_SECRET_KEY,
         response: turnstileToken,
       }),
     });

     const resultadoVerificacion = await verificacion.json();

     if (!resultadoVerificacion.success) {
       return NextResponse.json(
         { error: "No se pudo verificar que eres una persona real. Intenta de nuevo." },
         { status: 403 }
       );
     }

        const FORMATOS_PERMITIDOS = ["image/jpeg", "image/jpg", "image/png"];
   const TAMANO_MAXIMO_BYTES = 8 * 1024 * 1024; // 8 MB

   const foto = formData.get("foto");
   if (!(foto instanceof File)) {
     return NextResponse.json({ error: "La fotografía es obligatoria." }, { status: 400 });
   }

   if (!FORMATOS_PERMITIDOS.includes(foto.type)) {
     return NextResponse.json(
       { error: "Imagen no válida. Solo se aceptan archivos JPG o PNG." },
       { status: 400 }
     );
   }

   if (foto.size > TAMANO_MAXIMO_BYTES) {
     return NextResponse.json(
       { error: "La imagen supera el tamaño máximo permitido (8 MB)." },
       { status: 400 }
     );
   }

   if (foto.size === 0) {
     return NextResponse.json({ error: "El archivo de la fotografía está vacío." }, { status: 400 });
   }

     // 2. Reconstruir los datos "planos" y validar con el mismo esquema de Zod
     const datosCrudos = {
       escuderia_id: formData.get("escuderia_id"),
       nombre_completo: formData.get("nombre_completo"),
       lugar_procedencia: formData.get("lugar_procedencia"),
       congregacion: formData.get("congregacion"),
       telefono: formData.get("telefono"),
       necesita_hospedaje: formData.get("necesita_hospedaje") === "true",
       dia_llegada: formData.get("dia_llegada") || undefined,
       medio_transporte: formData.get("medio_transporte") || undefined,
       necesita_transporte_central: formData.get("necesita_transporte_central") === "true",
     };

     const resultado = esquemaRegistro.safeParse(datosCrudos);
     if (!resultado.success) {
       return NextResponse.json(
         { error: "Datos inválidos.", detalles: resultado.error.flatten().fieldErrors },
         { status: 400 }
       );
     }
     const datos = resultado.data;

     // 3. Subir la foto a Supabase Storage (bucket privado)
     const extension = foto.name.split(".").pop() || "jpg";
     const nombreArchivo = `${randomUUID()}.${extension}`;

     const { error: errorSubida } = await supabaseAdmin.storage
       .from("registros-fotos")
       .upload(nombreArchivo, foto, { contentType: foto.type });

     if (errorSubida) {
       console.error("Error al subir foto:", errorSubida.message);
       return NextResponse.json(
         { error: "No se pudo subir la fotografía. Intenta de nuevo." },
         { status: 500 }
       );
     }

     // 4. Generar numero_corredor aleatorio con reintentos ante colisiones
     let insertado = false;
     let intento = 0;

     while (!insertado && intento < MAX_INTENTOS_NUMERO) {
       intento++;
       const numeroCorredor = Math.floor(Math.random() * 999) + 1;

       const { error } = await supabaseAdmin.from("registros").insert({
         escuderia_id: datos.escuderia_id,
         nombre_completo: datos.nombre_completo,
         lugar_procedencia: datos.lugar_procedencia,
         congregacion: datos.congregacion,
         telefono: datos.telefono,
         necesita_hospedaje: datos.necesita_hospedaje,
         dia_llegada: datos.dia_llegada ?? null,
         medio_transporte: datos.medio_transporte ?? null,
         necesita_transporte_central: datos.necesita_transporte_central,
         foto_url: nombreArchivo,
         numero_corredor: numeroCorredor,
       });

       if (!error) {
         insertado = true;
         break;
       }

       if (error.code === "23505") {
         if (error.message.includes("telefono")) {
           return NextResponse.json(
             { error: "Ya existe un registro con este número de teléfono." },
             { status: 409 }
           );
         }
         if (error.message.includes("numero_corredor")) {
           // Colisión de número aleatorio: reintentamos con otro número
           continue;
         }
       }

       console.error("Error al insertar registro:", error.message);
       return NextResponse.json(
         { error: "Ocurrió un error al guardar tu registro. Intenta de nuevo." },
         { status: 500 }
       );
     }

     if (!insertado) {
       console.error("No se pudo asignar numero_corredor tras varios intentos.");
       return NextResponse.json(
         { error: "Ocurrió un error al guardar tu registro. Intenta de nuevo." },
         { status: 500 }
       );
     }

     // 5. Éxito
     return NextResponse.json({ ok: true }, { status: 201 });
   }