import Script from "next/script";

// ID de medição do Google Analytics 4 (gtag.js).
const GA_ID = "G-WHJR93THWB";

// ID da tag do Google Ads (conversões). Usa o mesmo gtag.js do GA4.
const ADS_ID = "AW-18224802606";

// Carrega o Google Analytics 4 + tag do Google Ads. Vai no <head> via next/script.
export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
gtag('config', '${ADS_ID}');`}
      </Script>
    </>
  );
}
