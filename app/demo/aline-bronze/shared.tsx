// Helpers e partes compartilhadas entre as páginas da demo Aline Bronze.

export const WA_BASE = "https://wa.me/5569992907169";
export const wa = (text: string) => WA_BASE + "?text=" + encodeURIComponent(text);

// Rotas internas da demo
export const HOME = "/demo/aline-bronze";
export const PRODUTOS = "/demo/aline-bronze/produtos-e-cursos";

export const sun = (size: number, sw = "2.4") =>
  `<svg viewBox="0 0 64 64" width="${size}" height="${size}" style="animation:spinSlow 40s linear infinite"><g stroke="#C8A25A" stroke-width="${sw}" stroke-linecap="round"><line x1="32" y1="4" x2="32" y2="15"/><line x1="32" y1="49" x2="32" y2="60"/><line x1="4" y1="32" x2="15" y2="32"/><line x1="49" y1="32" x2="60" y2="32"/><line x1="13" y1="13" x2="21" y2="21"/><line x1="43" y1="43" x2="51" y2="51"/><line x1="51" y1="13" x2="43" y2="21"/><line x1="21" y1="43" x2="13" y2="51"/></g></svg>`;

export const sunDot = (size: number) =>
  `<svg viewBox="0 0 64 64" width="${size}" height="${size}" style="animation:spinSlow 36s linear infinite"><g stroke="#C8A25A" stroke-width="2.4" stroke-linecap="round"><line x1="32" y1="3" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="61"/><line x1="3" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="61" y2="32"/><line x1="12" y1="12" x2="20" y2="20"/><line x1="44" y1="44" x2="52" y2="52"/><line x1="52" y1="12" x2="44" y2="20"/><line x1="20" y1="44" x2="12" y2="52"/></g><circle cx="32" cy="32" r="9" fill="#C8A25A"/></svg>`;

export const waIcon = (s = 17) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;

// Placeholder de imagem: <img> sobre um gradiente. Tenta .jpg, depois .png,
// e só então mostra o gradiente de fallback — aceita qualquer extensão.
export const slot = (id: string, label: string, grad: string) =>
  `<div style="position:relative;width:100%;height:100%;overflow:hidden;background:${grad}">
    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:#9a7a4a;font-size:13px;letter-spacing:.5px;font-family:'Jost',sans-serif">${label}</span>
    <img src="/demo/aline-bronze/${id}.jpg" alt="${label}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block" onerror="if(this.dataset.f!=='1'){this.dataset.f='1';this.src='/demo/aline-bronze/${id}.png'}else{this.style.display='none'}">
  </div>`;

export const nav = (active: "servicos" | "produtos" | "") => {
  const link = (href: string, label: string, on: boolean) =>
    on
      ? `<a href="${href}" style="color:#7A1620;border-bottom:2px solid #C8A25A;padding-bottom:2px">${label}</a>`
      : `<a href="${href}" class="ab-navlink" style="color:#4a382c;transition:color .25s">${label}</a>`;
  return `
  <nav id="ab-nav" style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px clamp(20px,5vw,60px);background:rgba(248,241,231,.65);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:background .4s,box-shadow .4s;border-bottom:1px solid rgba(200,162,90,.22)">
    <a href="${HOME}" style="display:flex;align-items:center;gap:11px">
      <span style="position:relative;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center">${sun(30, "3")}</span>
      <span style="display:flex;flex-direction:column;line-height:.82">
        <span style="font-family:Allura,cursive;font-size:26px;color:#7A1620;margin-bottom:-3px">Aline</span>
        <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:18px;letter-spacing:.5px;color:#7A1620">BRONZE</span>
      </span>
    </a>
    <div id="ab-desktopnav" style="display:flex;align-items:center;gap:30px;font-size:14px;letter-spacing:.5px;color:#4a382c">
      ${link(HOME + "#servicos", "Serviços", active === "servicos")}
      ${link(HOME + "#sobre", "Sobre", false)}
      ${link(PRODUTOS, "Produtos &amp; Cursos", active === "produtos")}
      ${link(HOME + "#local", "Localização", false)}
      <a href="${wa("Olá Aline! Vim pelo site e gostaria de agendar um horário.")}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:8px;background:#7A1620;color:#F8F1E7;padding:11px 20px;border-radius:999px;font-size:13px;letter-spacing:.6px;box-shadow:0 10px 22px -12px rgba(122,22,32,.7)">${waIcon(15)} WhatsApp</a>
    </div>
    <button id="ab-hamburger" style="display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px">
      <span style="width:24px;height:2px;background:#7A1620;border-radius:2px"></span>
      <span style="width:24px;height:2px;background:#7A1620;border-radius:2px"></span>
      <span style="width:24px;height:2px;background:#7A1620;border-radius:2px"></span>
    </button>
  </nav>
  <div id="ab-mobilemenu" style="position:fixed;top:62px;left:0;right:0;z-index:49;flex-direction:column;gap:2px;padding:16px clamp(20px,5vw,60px) 24px;background:rgba(248,241,231,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(200,162,90,.3);box-shadow:0 18px 30px -18px rgba(58,42,32,.3)">
    <a href="${HOME}#servicos" style="padding:13px 4px;font-size:18px;font-family:'Cormorant Garamond',serif;color:#4a382c;border-bottom:1px solid rgba(200,162,90,.2)">Serviços</a>
    <a href="${HOME}#sobre" style="padding:13px 4px;font-size:18px;font-family:'Cormorant Garamond',serif;color:#4a382c;border-bottom:1px solid rgba(200,162,90,.2)">Sobre</a>
    <a href="${PRODUTOS}" style="padding:13px 4px;font-size:18px;font-family:'Cormorant Garamond',serif;color:#7A1620;border-bottom:1px solid rgba(200,162,90,.2)">Produtos &amp; Cursos</a>
    <a href="${HOME}#local" style="padding:13px 4px;font-size:18px;font-family:'Cormorant Garamond',serif;color:#4a382c">Localização</a>
    <a href="${wa("Olá Aline! Vim pelo site e quero saber mais.")}" target="_blank" rel="noopener" style="margin-top:14px;text-align:center;background:#7A1620;color:#F8F1E7;padding:14px;border-radius:999px;font-size:15px;letter-spacing:.5px">Chamar no WhatsApp</a>
  </div>`;
};

export const footer = (firstLabel: string, firstLinks: string) => `
  <footer style="background:#3A0A10;color:#d9c3a8;padding:clamp(48px,7vw,70px) clamp(20px,5vw,60px) 34px">
    <div data-stack style="max-width:1160px;margin:0 auto;display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap">
      <div style="max-width:300px">
        <div style="display:flex;align-items:center;gap:11px;margin-bottom:16px">
          <span style="width:30px;height:30px;display:inline-flex">${sun(30, "3").replace("animation:spinSlow 40s linear infinite", "")}</span>
          <span style="display:flex;flex-direction:column;line-height:.82"><span style="font-family:Allura,cursive;font-size:26px;color:#E6CE97;margin-bottom:-3px">Aline</span><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:17px;letter-spacing:.5px;color:#E6CE97">BRONZE</span></span>
        </div>
        <p style="font-weight:300;font-size:14px;line-height:1.65;color:#b89e83;margin:0">Banhos &amp; Spa Corporais. Referência em bronzeamento em Porto Velho - RO. A cor do verão, o ano todo.</p>
      </div>
      <div style="display:flex;gap:54px;flex-wrap:wrap">
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:1px;text-transform:uppercase;color:#C8A25A;margin-bottom:14px">${firstLabel}</div>
          <div style="display:flex;flex-direction:column;gap:10px;font-weight:300;font-size:14.5px">${firstLinks}</div>
        </div>
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:1px;text-transform:uppercase;color:#C8A25A;margin-bottom:14px">Contato</div>
          <div style="display:flex;flex-direction:column;gap:10px;font-weight:300;font-size:14.5px">
            <a href="${WA_BASE}" target="_blank" rel="noopener" style="color:#d9c3a8">WhatsApp · (69) 99290-7169</a>
            <a href="https://instagram.com/alinebronzepvh" target="_blank" rel="noopener" style="color:#d9c3a8">Instagram · @alinebronzepvh</a>
            <span style="color:#b89e83">Joaquim Nabuco, 1919 — Centro</span>
            <span style="color:#b89e83">Porto Velho - RO</span>
          </div>
        </div>
      </div>
    </div>
    <div style="max-width:1160px;margin:34px auto 0;padding-top:22px;border-top:1px solid rgba(200,162,90,.2);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12.5px;color:#9c8268;font-weight:300">
      <span>© 2026 Aline Bronze · Banhos &amp; Spa Corporais</span>
      <span>Porto Velho - RO</span>
    </div>
  </footer>`;

export const ALINE_CSS = `
  #ab-root *{box-sizing:border-box}
  #ab-root a{color:inherit;text-decoration:none}
  #ab-root img{display:block;max-width:100%}
  #ab-root ::selection{background:#7A1620;color:#F8F1E7}
  @keyframes spinSlow{to{transform:rotate(360deg)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
  @keyframes marquee{to{transform:translateX(-50%)}}
  @keyframes pulseGlow{0%,100%{opacity:.45}50%{opacity:.85}}
  #ab-root [data-reveal]{opacity:0;transform:translateY(30px);transition:opacity 1s cubic-bezier(.16,.84,.44,1),transform 1s cubic-bezier(.16,.84,.44,1)}
  #ab-root [data-reveal].in{opacity:1;transform:none}
  #ab-root .ab-navlink:hover{color:#7A1620}
  #ab-root .ab-btn{transition:transform .3s,box-shadow .3s}
  #ab-root .ab-btn:hover{transform:translateY(-3px)}
  #ab-root .ab-card{transition:transform .4s,box-shadow .4s}
  #ab-root .ab-card:hover{transform:translateY(-8px);box-shadow:0 36px 64px -30px rgba(122,22,32,.45)}
  #ab-root .ab-banner{transition:transform .4s}
  #ab-root .ab-banner:hover{transform:translateY(-5px)}
  #ab-root .ab-out{transition:background .3s,color .3s}
  #ab-root .ab-out:hover{background:#7A1620;color:#F8F1E7}
  #ab-root .ab-ghost{transition:background .3s}
  #ab-root .ab-ghost:hover{background:rgba(255,255,255,.16)}
  #ab-root #ab-mobilemenu{display:none}
  @media(max-width:880px){
    #ab-root #ab-desktopnav{display:none!important}
    #ab-root #ab-hamburger{display:flex!important}
    #ab-root [data-stack]{flex-direction:column!important}
    #ab-root [data-hero-portrait]{order:-1;flex:none!important;width:100%!important;max-width:440px!important;margin:0 auto!important}
    #ab-root [data-media]{order:-1;flex:none!important;width:100%!important;max-width:520px!important;margin:0 auto!important}
    #ab-root [data-stack-rev]{flex-direction:column-reverse!important}
  }
  @media(min-width:881px){#ab-root #ab-hamburger{display:none!important}#ab-root #ab-mobilemenu{display:none!important}}
`;

// Liga reveal-on-scroll, nav-on-scroll e menu mobile. Retorna o cleanup.
export function setupAline(): () => void {
  const root = document.getElementById("ab-root");
  if (!root) return () => {};

  const io = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = (el.getAttribute("data-reveal-delay") || 0) + "ms";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
  );
  root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  const navEl = root.querySelector("#ab-nav") as HTMLElement | null;
  const onScroll = () => {
    if (!navEl) return;
    if (window.scrollY > 24) {
      navEl.style.background = "rgba(248,241,231,.94)";
      navEl.style.boxShadow = "0 10px 32px -16px rgba(58,42,32,.25)";
    } else {
      navEl.style.background = "rgba(248,241,231,.65)";
      navEl.style.boxShadow = "none";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const ham = root.querySelector("#ab-hamburger") as HTMLElement | null;
  const menu = root.querySelector("#ab-mobilemenu") as HTMLElement | null;
  const toggle = () => {
    if (menu) menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  };
  const close = () => {
    if (menu) menu.style.display = "none";
  };
  if (ham) ham.addEventListener("click", toggle);
  const menuLinks = menu ? Array.from(menu.querySelectorAll("a")) : [];
  menuLinks.forEach((a) => a.addEventListener("click", close));

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    if (ham) ham.removeEventListener("click", toggle);
    menuLinks.forEach((a) => a.removeEventListener("click", close));
  };
}

export const FONTS = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Allura&display=swap"
      rel="stylesheet"
    />
  </>
);
