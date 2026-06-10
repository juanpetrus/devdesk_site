"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

// Dispara os eventos de conversão quando a página de obrigado carrega:
// - "Lead" do Meta Pixel (fbq)
// - "conversion_event_submit_lead_form" do Google Ads/GA4 (gtag)
// Cada evento dispara UMA vez; segue tentando por alguns segundos caso o
// script ainda não tenha inicializado.
export default function TrackLead() {
  useEffect(() => {
    posthog.capture("lead_converted");

    let tries = 0;
    let fbqFired = false;
    let gtagFired = false;

    const fire = () => {
      const win = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };

      if (!fbqFired && win.fbq) {
        win.fbq("track", "Lead");
        fbqFired = true;
      }
      if (!gtagFired && win.gtag) {
        win.gtag("event", "conversion_event_submit_lead_form");
        gtagFired = true;
      }

      if ((fbqFired && gtagFired) || tries++ >= 20) return;
      window.setTimeout(fire, 250);
    };
    fire();
  }, []);

  return null;
}
