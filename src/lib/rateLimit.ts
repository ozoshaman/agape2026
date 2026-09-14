   type RegistroIntento = {
     timestamps: number[];
   };

   const intentosPorIp = new Map<string, RegistroIntento>();

   const VENTANA_MS = 10 * 60 * 1000; // 10 minutos
   const MAX_INTENTOS = 5;

   /**
    * Retorna true si la IP puede continuar, false si excedió el límite.
    * Límite simple en memoria: 5 intentos cada 10 minutos por IP.
    */
   export function permitirIntento(ip: string): boolean {
     const ahora = Date.now();
     const registro = intentosPorIp.get(ip) ?? { timestamps: [] };

     // Filtramos solo los intentos dentro de la ventana de tiempo vigente
     const intentosRecientes = registro.timestamps.filter(
       (marca) => ahora - marca < VENTANA_MS
     );

     if (intentosRecientes.length >= MAX_INTENTOS) {
       intentosPorIp.set(ip, { timestamps: intentosRecientes });
       return false;
     }

     intentosRecientes.push(ahora);
     intentosPorIp.set(ip, { timestamps: intentosRecientes });
     return true;
   }