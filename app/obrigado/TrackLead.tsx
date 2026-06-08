"use client";

import { useEffect } from "react";

// Dispara o evento "Lead" do Meta Pixel quando a página de obrigado carrega.
// Tenta de novo por alguns segundos caso o fbq ainda não tenha inicializado.
export default function TrackLead() {
  useEffect(() => {
    let tries = 0;
    const fire = () => {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (fbq) {
        fbq("track", "Lead");
        return;
      }
      if (tries++ < 20) window.setTimeout(fire, 250);
    };
    fire();
  }, []);

  return null;
}
