"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { esquemaRegistro, type RegistroFormData } from "@/lib/validaciones";

export default function FormularioRegistro() {
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      necesita_hospedaje: false,
      necesita_transporte_central: false,
    },
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xl mx-auto">
      {errorEnvio && (
        <div className="bg-racing-red/10 border border-racing-red text-racing-red rounded px-4 py-3 text-sm">
          {errorEnvio}
        </div>
      )}

      {/* Nombre completo */}
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

      {/* Lugar de procedencia */}
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

      {/* Congregación */}
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

      {/* Teléfono */}
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

      {/* Día de llegada */}
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
          <option value="2026-12-11">Viernes 11 de diciembre</option>
          <option value="2026-12-12">Sábado 12 de diciembre</option>
        </select>
        {errors.dia_llegada && (
          <p className="text-racing-red text-sm">{errors.dia_llegada.message}</p>
        )}
      </div>

      {/* Medio de transporte */}
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

      {/* Necesita hospedaje */}
      <div className="flex items-center gap-3">
        <input
          id="necesita_hospedaje"
          type="checkbox"
          {...register("necesita_hospedaje")}
          className="w-5 h-5 accent-racing-red"
        />
        <label htmlFor="necesita_hospedaje" className="text-carbon-black text-sm">
          ¿Necesitas hospedaje?
        </label>
      </div>

      {/* Necesita transporte desde la central */}
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

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-racing-red text-bone-white px-6 py-3 rounded font-bold hover:bg-amber-gold hover:text-carbon-black transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar registro"}
      </button>
    </form>
  );
}