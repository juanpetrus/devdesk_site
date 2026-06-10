// Helpers para disparar eventos no Google (GA4 / Google Ads via gtag.js).
// O gtag é carregado globalmente em app/components/GoogleAnalytics.tsx.

type GtagFn = (...args: unknown[]) => void;

// Lê da URL os parâmetros que indicam de qual anúncio a pessoa veio.
// gclid = Google Ads, fbclid = Meta. Só inclui os que existirem.
export function getAdSource(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "gclid",
    "fbclid",
  ]) {
    const v = p.get(k);
    if (v) out[k] = v;
  }
  return out;
}

// Dispara um evento no Google levando junto a origem do anúncio.
// No-op no server e enquanto o gtag ainda não tiver carregado.
export function gtagEvent(
  event: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (!gtag) return;
  gtag("event", event, { ...getAdSource(), ...params });
}
