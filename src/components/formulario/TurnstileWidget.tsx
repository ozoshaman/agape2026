   "use client";

   import { useEffect, useRef } from "react";
   import Script from "next/script";

   declare global {
     interface Window {
       turnstile?: {
         render: (
           container: HTMLElement,
           options: {
             sitekey: string;
             callback: (token: string) => void;
             "expired-callback"?: () => void;
             theme?: "light" | "dark";
           }
         ) => string;
         reset: (widgetId?: string) => void;
       };
     }
   }

   type Props = {
     onToken: (token: string | null) => void;
   };

   export default function TurnstileWidget({ onToken }: Props) {
     const contenedorRef = useRef<HTMLDivElement>(null);
     const widgetIdRef = useRef<string | null>(null);

     const renderizar = () => {
       if (!contenedorRef.current || !window.turnstile || widgetIdRef.current) return;

       widgetIdRef.current = window.turnstile.render(contenedorRef.current, {
         sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
         callback: (token) => onToken(token),
         "expired-callback": () => onToken(null),
         theme: "light",
       });
     };

     useEffect(() => {
       if (window.turnstile) renderizar();
     }, []);

     return (
       <>
         <Script
           src="https://challenges.cloudflare.com/turnstile/v0/api.js"
           strategy="afterInteractive"
           onLoad={renderizar}
         />
         <div ref={contenedorRef} />
       </>
     );
   }