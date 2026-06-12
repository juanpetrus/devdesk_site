"use client";

import { useEffect } from "react";

// WhatsApp do cliente (DDI 55 + DDD + número, só dígitos)
const WA =
  "https://wa.me/556981079598?text=" +
  encodeURIComponent("Olá! Gostaria de agendar um horário no Vida Leve Spa.");

const HB = `<svg viewBox="0 0 230 175" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;overflow:visible"><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M97 98 C84 60 102 30 142 13 C118 39 113 67 120 99 Z" fill="currentColor" fill-opacity="0.12"/><path d="M96 99 C113 79 143 77 161 88 C174 95 171 110 156 116 C135 124 110 120 96 99 Z" fill="currentColor" fill-opacity="0.18"/><circle cx="164" cy="88" r="8.5" fill="currentColor" fill-opacity="0.18"/><circle cx="167" cy="86" r="1.6" fill="currentColor" stroke="none"/><path d="M172 85 L214 76"/><path d="M93 103 C72 119 56 140 47 167"/><path d="M101 100 C87 122 79 143 75 169"/></g></svg>`;

const services = [
  { num: "01", tag: "Mais procurado", name: "Pacotes Day Spa", desc: "Rituais completos de relaxamento — banhos, massagens e cuidados que renovam o corpo e a mente.", bg: "linear-gradient(150deg,#F3E4D7,#E7C9BC)", delay: "0s" },
  { num: "02", tag: "Relaxamento", name: "Massagens", desc: "Técnicas terapêuticas e relaxantes para aliviar tensões e devolver a leveza ao seu dia.", bg: "linear-gradient(150deg,#EFE6D6,#D9C6A6)", delay: ".06s" },
  { num: "03", tag: "Seu grande dia", name: "Noivas", desc: "Day da noiva e pacotes exclusivos para você brilhar dos pés à cabeça no momento mais especial.", bg: "linear-gradient(150deg,#F6E7E2,#EAD3C9)", delay: ".12s" },
  { num: "04", tag: "15 anos", name: "Debutantes", desc: "A festa dos sonhos com produção completa, beleza e momentos verdadeiramente inesquecíveis.", bg: "linear-gradient(150deg,#F0D9CF,#E4C2B4)", delay: ".06s" },
  { num: "05", tag: "Beleza", name: "Penteados & Cabelos", desc: "Penteados, tratamentos e finalização impecável para todas as ocasiões especiais.", bg: "linear-gradient(150deg,#F4EAD6,#E3CDA0)", delay: ".12s" },
  { num: "06", tag: "Beleza", name: "Maquiagem", desc: "Make profissional que realça a sua beleza natural com sofisticação e durabilidade.", bg: "linear-gradient(150deg,#F0E0DD,#DDBFC0)", delay: ".18s" },
];

const gallery = [
  { label: "Ambiente", bg: "linear-gradient(150deg,#F3E4D7,#E7C9BC)", col: "span 2", row: "span 2", delay: "0s" },
  { label: "Day Spa", bg: "linear-gradient(150deg,#EFE6D6,#D9C6A6)", col: "span 1", row: "span 1", delay: ".06s" },
  { label: "Noivas", bg: "linear-gradient(150deg,#F6E7E2,#EAD3C9)", col: "span 1", row: "span 1", delay: ".12s" },
  { label: "Massagem", bg: "linear-gradient(150deg,#F4EAD6,#E3CDA0)", col: "span 2", row: "span 1", delay: ".1s" },
  { label: "Cabelos", bg: "linear-gradient(150deg,#F0E0DD,#DDBFC0)", col: "span 1", row: "span 1", delay: ".14s" },
  { label: "Make", bg: "linear-gradient(150deg,#F0D9CF,#E4C2B4)", col: "span 1", row: "span 1", delay: ".18s" },
  { label: "Debutantes", bg: "linear-gradient(150deg,#EFE6D6,#E7C9BC)", col: "span 2", row: "span 1", delay: ".16s" },
];

const testimonials = [
  { quote: "Fiz o Day da Noiva e foi um sonho. Saí radiante e relaxada para o momento mais importante da minha vida.", name: "Larissa M.", role: "Noiva", initial: "L", bg: "linear-gradient(135deg,#F6E7E2,#EAD3C9)", delay: "0s" },
  { quote: "Atendimento impecável e um ambiente que te transporta. Saio de cada sessão completamente renovada.", name: "Camila R.", role: "Cliente Day Spa", initial: "C", bg: "linear-gradient(135deg,#F4EAD6,#E3CDA0)", delay: ".08s" },
  { quote: "A produção da minha festa de 15 anos foi perfeita, do penteado à make. Me senti uma verdadeira princesa.", name: "Helena S.", role: "Debutante", initial: "H", bg: "linear-gradient(135deg,#F0E0DD,#DDBFC0)", delay: ".16s" },
];

const particles = Array.from({ length: 16 }).map((_, i) => {
  const left = (i * 61 + 7) % 100;
  const bottom = (i * 37) % 36;
  const size = 3 + (i % 4);
  const dur = 9 + (i % 6) * 1.4;
  const delay = (i % 8) * 1.3;
  return `<span style="position:absolute;left:${left}%;bottom:${bottom}%;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,#E9CE86,rgba(233,206,134,0) 70%);animation:vlDrift ${dur}s linear -${delay}s infinite;pointer-events:none"></span>`;
}).join("");

const ctaPrimary =
  "text-decoration:none;display:inline-flex;align-items:center;gap:11px;padding:17px 32px;border-radius:999px;background:linear-gradient(135deg,#B8902E,#E0BC62 52%,#B8902E);color:#2E2410;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;box-shadow:0 16px 32px -12px rgba(150,110,20,.6)";
const ctaGhost =
  "text-decoration:none;display:inline-flex;align-items:center;gap:10px;padding:17px 30px;border-radius:999px;border:1px solid rgba(150,115,40,.42);color:#5A4A2C;background:rgba(255,255,255,.45);font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:500";

const heroEditorial = `
  <div data-hero-grid data-pad style="position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:64px;align-items:center">
    <div>
      <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:26px">
        <span style="width:42px;height:1px;background:linear-gradient(90deg,transparent,#C2972F)"></span>
        <span style="font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:#9A7E45">Spa Urbano · Bem-estar</span>
      </div>
      <h1 data-h1 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:78px;line-height:1.02;letter-spacing:-.01em;margin:0 0 8px;color:#2E2A24">A arte de</h1>
      <h1 data-h1 data-reveal style="font-family:'Pinyon Script',cursive;font-weight:400;font-size:96px;line-height:.92;margin:0 0 26px;background:linear-gradient(100deg,#9C7726,#E6C56B 45%,#B8902E 72%,#E6C56B);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% auto;animation:vlShimmer 8s linear infinite;transition-delay:.08s">se sentir leve</h1>
      <p data-reveal style="font-size:18px;line-height:1.75;color:#6B6258;max-width:480px;margin:0 0 38px;font-weight:300;transition-delay:.16s">Massagens, day spa e produção de beleza para noivas, debutantes e para você. Um refúgio pensado nos mínimos detalhes para o corpo descansar e a alma respirar.</p>
      <div data-reveal style="display:flex;flex-wrap:wrap;gap:16px;transition-delay:.24s">
        <a href="${WA}" target="_blank" rel="noopener" style="${ctaPrimary}">Agendar pelo WhatsApp</a>
        <a href="#servicos" style="${ctaGhost}">Nossos serviços</a>
      </div>
      <div data-reveal data-stats style="display:flex;gap:38px;margin-top:48px;transition-delay:.32s">
        <div><div style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#B8902E;font-weight:600">12,7 mil</div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-top:2px">Seguidores</div></div>
        <div style="width:1px;background:linear-gradient(180deg,transparent,#D8C49A,transparent)"></div>
        <div><div style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#B8902E;font-weight:600">+1.500</div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-top:2px">Momentos criados</div></div>
        <div style="width:1px;background:linear-gradient(180deg,transparent,#D8C49A,transparent)"></div>
        <div><div style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#B8902E;font-weight:600">6 dias</div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-top:2px">Terça a sábado</div></div>
      </div>
    </div>
    <div data-hero-img data-reveal class="vl-edhero" style="position:relative;transition-delay:.18s">
      <div style="position:absolute;inset:-26px;border:1px solid rgba(184,144,46,.35);border-radius:280px 280px 20px 20px;animation:vlSpin 90s linear infinite;pointer-events:none"></div>
      <div class="vl-ph" style="position:relative;height:600px;border-radius:270px 270px 18px 18px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(90,60,20,.5);background:linear-gradient(150deg,#F6E7E2,#E4C2B4)">
        <div class="vl-ph-img" style="position:absolute;inset:0;background-image:url('/demo/vida-leve-spa/hero-noiva.png');background-size:cover;background-position:50% 18%;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(46,38,28,0) 55%,rgba(46,38,28,.28))"></div>
      </div>
      <div data-edbadge style="position:absolute;left:-34px;bottom:48px;background:rgba(255,253,249,.92);backdrop-filter:blur(8px);border:1px solid rgba(184,144,46,.25);border-radius:16px;padding:16px 20px;box-shadow:0 24px 50px -24px rgba(90,60,20,.45);animation:vlFloatSlow 6s ease-in-out infinite">
        <div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#2E2A24;font-weight:600">Day Spa</div>
        <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9A8A6E">Ritual completo</div>
      </div>
      <div data-edbadge style="position:absolute;right:-22px;top:54px;width:74px;height:74px;border-radius:50%;background:linear-gradient(135deg,#B8902E,#E6C56B);display:flex;align-items:center;justify-content:center;box-shadow:0 18px 36px -16px rgba(150,110,20,.7);animation:vlFloat 5s ease-in-out infinite">
        <span style="font-family:'Pinyon Script',cursive;font-size:30px;color:#FFF8E8">VL</span>
      </div>
    </div>
  </div>`;

const heroCentro = `
  <div data-pad style="position:relative;z-index:2;width:100%;max-width:980px;margin:0 auto;text-align:center;display:flex;flex-direction:column;align-items:center">
    <span data-hb data-reveal style="width:90px;color:#B8902E;margin-bottom:18px;animation:vlFloat 5s ease-in-out infinite"></span>
    <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:22px">
      <span style="width:36px;height:1px;background:linear-gradient(90deg,transparent,#C2972F)"></span>
      <span style="font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:#9A7E45">Vida Leve · Spa Urbano</span>
      <span style="width:36px;height:1px;background:linear-gradient(90deg,#C2972F,transparent)"></span>
    </div>
    <h1 data-h1 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:84px;line-height:1.02;margin:0 0 10px;color:#2E2A24;transition-delay:.06s">Respire fundo.</h1>
    <h1 data-h1 data-reveal style="font-family:'Pinyon Script',cursive;font-weight:400;font-size:104px;line-height:.9;margin:0 0 24px;background:linear-gradient(100deg,#9C7726,#E6C56B 45%,#B8902E 72%,#E6C56B);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% auto;animation:vlShimmer 8s linear infinite;transition-delay:.12s">Você chegou.</h1>
    <p data-reveal style="font-size:18.5px;line-height:1.75;color:#6B6258;max-width:560px;margin:0 0 38px;font-weight:300;transition-delay:.2s">Um refúgio de bem-estar para cuidar de você — do day spa relaxante à beleza completa para os seus momentos mais especiais.</p>
    <div data-reveal style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;transition-delay:.28s">
      <a href="${WA}" target="_blank" rel="noopener" style="${ctaPrimary}">Agendar pelo WhatsApp</a>
      <a href="#servicos" style="${ctaGhost}">Nossos serviços</a>
    </div>
  </div>`;

const heroRevista = `
  <div data-hero-grid data-pad style="position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center">
    <span aria-hidden="true" style="position:absolute;left:-10px;top:-40px;font-family:'Pinyon Script',cursive;font-size:230px;line-height:1;color:rgba(184,144,46,.10);pointer-events:none;user-select:none;white-space:nowrap">Vida Leve</span>
    <div style="position:relative">
      <div data-reveal style="font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:#9A7E45;margin-bottom:22px">Estética · Relaxamento · Beleza</div>
      <h1 data-h1 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:74px;line-height:1.0;margin:0 0 24px;color:#2E2A24;transition-delay:.06s">Beleza e descanso, <em style="font-style:italic;color:#B8902E">do seu jeito.</em></h1>
      <p data-reveal style="font-size:17.5px;line-height:1.75;color:#6B6258;max-width:440px;margin:0 0 36px;font-weight:300;transition-delay:.16s">Penteados, maquiagem, massagens e pacotes de day spa em um só lugar — com o cuidado e a sofisticação que o seu momento merece.</p>
      <a data-reveal href="${WA}" target="_blank" rel="noopener" style="${ctaPrimary};transition-delay:.24s">Quero agendar</a>
    </div>
    <div data-hero-img data-reveal style="position:relative;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:16px;transition-delay:.18s">
      <div class="vl-ph" style="grid-row:span 2;position:relative;height:520px;border-radius:18px;overflow:hidden;box-shadow:0 34px 64px -36px rgba(90,60,20,.5)">
        <div class="vl-ph-img" style="position:absolute;inset:0;background:linear-gradient(150deg,#F6E7E2,#E4C2B4);transition:transform 1.4s cubic-bezier(.2,.7,.2,1)"></div>
        <span style="position:absolute;left:16px;bottom:14px;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#7A5E2E;opacity:.6">Noivas</span>
      </div>
      <div class="vl-ph" style="position:relative;height:252px;border-radius:18px;overflow:hidden;box-shadow:0 24px 44px -30px rgba(90,60,20,.45)">
        <div class="vl-ph-img" style="position:absolute;inset:0;background:linear-gradient(150deg,#F4EAD6,#E3CDA0);transition:transform 1.4s cubic-bezier(.2,.7,.2,1)"></div>
        <span style="position:absolute;left:14px;bottom:12px;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#7A5E2E;opacity:.6">Day Spa</span>
      </div>
      <div class="vl-ph" style="position:relative;height:252px;border-radius:18px;overflow:hidden;box-shadow:0 24px 44px -30px rgba(90,60,20,.45)">
        <div class="vl-ph-img" style="position:absolute;inset:0;background:linear-gradient(150deg,#F0E0DD,#DDBFC0);transition:transform 1.4s cubic-bezier(.2,.7,.2,1)"></div>
        <span style="position:absolute;left:14px;bottom:12px;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#7A5E2E;opacity:.6">Make</span>
      </div>
    </div>
  </div>`;

const servicesHtml = services
  .map(
    (s) => `
    <div class="vl-svc" data-reveal style="position:relative;background:#FFFDF9;border:1px solid rgba(184,144,46,.16);border-radius:18px;overflow:hidden;box-shadow:0 18px 44px -30px rgba(90,60,20,.4);transition:transform .6s cubic-bezier(.2,.7,.2,1),box-shadow .6s ease,border-color .6s ease;transition-delay:${s.delay}">
      <div style="position:relative;height:230px;overflow:hidden">
        <div class="vl-svc-img" style="position:absolute;inset:0;background:${s.bg};transition:transform 1.2s cubic-bezier(.2,.7,.2,1)"></div>
        <span style="position:absolute;top:16px;left:18px;font-family:'Cormorant Garamond',serif;font-size:24px;color:rgba(122,94,46,.6);font-weight:600">${s.num}</span>
        <span style="position:absolute;bottom:14px;right:16px;font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:rgba(122,94,46,.55)">Foto</span>
      </div>
      <div style="padding:26px 26px 30px">
        <div style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#B8902E;margin-bottom:10px">${s.tag}</div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:28px;line-height:1.1;margin:0 0 12px;color:#2E2A24">${s.name}</h3>
        <p style="font-size:14.5px;line-height:1.7;color:#6B6258;font-weight:300;margin:0 0 18px">${s.desc}</p>
        <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#8A6A2A;font-weight:500">Saiba mais <span style="font-size:15px">→</span></a>
      </div>
    </div>`
  )
  .join("");

const galleryHtml = gallery
  .map(
    (g) => `
    <div class="vl-ph" data-reveal style="position:relative;border-radius:16px;overflow:hidden;box-shadow:0 20px 44px -30px rgba(90,60,20,.4);grid-column:${g.col};grid-row:${g.row};transition-delay:${g.delay}">
      <div class="vl-ph-img" style="position:absolute;inset:0;background:${g.bg};transition:transform 1.3s cubic-bezier(.2,.7,.2,1)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(60,40,18,.34))"></div>
      <span style="position:absolute;left:16px;bottom:14px;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(255,250,240,.92)">${g.label}</span>
    </div>`
  )
  .join("");

const testimonialsHtml = testimonials
  .map(
    (t) => `
    <div data-reveal style="background:#FFFDF9;border:1px solid rgba(184,144,46,.16);border-radius:18px;padding:34px 30px;box-shadow:0 18px 44px -30px rgba(90,60,20,.36);transition-delay:${t.delay}">
      <div style="font-family:'Cormorant Garamond',serif;font-size:56px;line-height:.4;color:#E0BC62;height:30px">"</div>
      <p style="font-size:16px;line-height:1.78;color:#54493A;font-weight:300;font-style:italic;margin:0 0 26px;font-family:'Cormorant Garamond',serif">${t.quote}</p>
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:46px;height:46px;border-radius:50%;background:${t.bg};display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:20px;color:#7A5E2E;font-weight:600">${t.initial}</div>
        <div>
          <div style="font-size:14px;color:#2E2A24;font-weight:500">${t.name}</div>
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9A8A6E;margin-top:2px">${t.role}</div>
        </div>
      </div>
    </div>`
  )
  .join("");

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow:hidden;background:#FBF6EE;color:#2E2A24;font-family:'Jost',sans-serif">

  <header id="vl-header" data-pad style="position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;justify-content:space-between;padding:22px 54px;background:rgba(251,246,238,0);transition:background .5s ease,box-shadow .5s ease,padding .5s ease">
    <a href="#topo" style="text-decoration:none;display:flex;flex-direction:column;line-height:.8">
      <span style="font-family:'Pinyon Script',cursive;font-size:34px;background:linear-gradient(100deg,#9C7726,#E6C56B 45%,#B8902E 72%,#E6C56B);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% auto;animation:vlShimmer 7s linear infinite">Vida Leve</span>
      <span style="font-family:'Jost',sans-serif;font-size:9px;letter-spacing:.52em;color:#9A7E45;margin-left:4px;margin-top:2px">SPA URBANO</span>
    </a>
    <nav id="vl-navlinks" style="display:flex;align-items:center;gap:38px">
      <a href="#sobre" style="text-decoration:none;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:#5A4A2C;font-weight:400">Sobre</a>
      <a href="#servicos" style="text-decoration:none;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:#5A4A2C;font-weight:400">Serviços</a>
      <a href="#galeria" style="text-decoration:none;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:#5A4A2C;font-weight:400">Galeria</a>
      <a href="#depoimentos" style="text-decoration:none;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:#5A4A2C;font-weight:400">Depoimentos</a>
      <a href="#contato" style="text-decoration:none;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:#5A4A2C;font-weight:400">Contato</a>
    </nav>
    <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:9px;padding:13px 24px;border-radius:999px;background:linear-gradient(135deg,#B8902E,#E0BC62 52%,#B8902E);color:#2E2410;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;box-shadow:0 12px 26px -12px rgba(150,110,20,.65)">
      <span style="width:7px;height:7px;border-radius:50%;background:#2E2410;opacity:.7"></span>Agendar
    </a>
  </header>

  <section id="topo" style="position:relative;min-height:100vh;display:flex;align-items:center;padding:128px 54px 70px;background:radial-gradient(120% 90% at 80% 10%,#FCF3E7 0%,#FBF6EE 45%,#F4E9DB 100%)">
    <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none">
      <div style="position:absolute;top:-12%;right:-8%;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(231,201,134,.34),rgba(231,201,134,0) 68%)"></div>
      <div style="position:absolute;bottom:-14%;left:-10%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(230,199,187,.32),rgba(230,199,187,0) 68%)"></div>
      ${particles}
    </div>

    <div data-hero="editorial" style="width:100%">${heroEditorial}</div>
    <div data-hero="centro" style="width:100%;display:none">${heroCentro}</div>
    <div data-hero="revista" style="width:100%;display:none">${heroRevista}</div>

    <a href="#sobre" data-hide-sm style="position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:8px;text-decoration:none">
      <span style="font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#9A8A6E">Explore</span>
      <span style="width:1px;height:40px;background:linear-gradient(180deg,#C2972F,transparent)"></span>
    </a>
  </section>

  <section id="sobre" data-pad style="position:relative;padding:120px 54px;background:#FBF6EE">
    <div data-two style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center">
      <div data-reveal style="position:relative">
        <div class="vl-ph" style="position:relative;height:540px;border-radius:18px;overflow:hidden;box-shadow:0 40px 80px -44px rgba(90,60,20,.5)">
          <div class="vl-ph-img" style="position:absolute;inset:0;background:linear-gradient(155deg,#EFE6D6 0%,#E7C9BC 60%,#D9B6A8 100%);transition:transform 1.4s cubic-bezier(.2,.7,.2,1)"></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.42"><span data-hb style="width:140px;color:#8A6A2A"></span></div>
        </div>
        <div style="position:absolute;right:-26px;bottom:-26px;background:#FFFDF9;border:1px solid rgba(184,144,46,.22);border-radius:16px;padding:22px 26px;box-shadow:0 28px 56px -28px rgba(90,60,20,.4);max-width:230px;animation:vlFloatSlow 7s ease-in-out infinite">
          <div style="font-family:'Pinyon Script',cursive;font-size:30px;color:#B8902E;line-height:1">Leveza</div>
          <div style="font-size:13px;color:#6B6258;font-weight:300;margin-top:4px">em cada detalhe do seu cuidado</div>
        </div>
      </div>
      <div>
        <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:22px"><span style="width:40px;height:1px;background:#C2972F"></span><span style="font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:#9A7E45">Sobre nós</span></div>
        <h2 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:52px;line-height:1.08;margin:0 0 26px;color:#2E2A24;transition-delay:.06s">Um refúgio urbano dedicado ao seu bem-estar</h2>
        <p data-reveal style="font-size:17px;line-height:1.8;color:#6B6258;font-weight:300;margin:0 0 20px;transition-delay:.12s">No Vida Leve, acreditamos que cuidar de si é um ato de amor. Por isso criamos um espaço onde cada toque, aroma e detalhe foi pensado para você desacelerar, relaxar e se reconectar com a sua melhor versão.</p>
        <p data-reveal style="font-size:17px;line-height:1.8;color:#6B6258;font-weight:300;margin:0 0 34px;transition-delay:.18s">Do day spa relaxante à beleza completa para noivas e debutantes, oferecemos experiências exclusivas com atendimento atencioso e o capricho que o seu momento merece.</p>
        <div data-reveal style="display:flex;gap:14px;flex-wrap:wrap;transition-delay:.24s">
          <span style="padding:10px 18px;border-radius:999px;background:rgba(230,199,187,.4);border:1px solid rgba(184,144,46,.2);font-size:12px;letter-spacing:.1em;color:#7A5E2E;text-transform:uppercase">Atendimento com hora marcada</span>
          <span style="padding:10px 18px;border-radius:999px;background:rgba(231,201,134,.3);border:1px solid rgba(184,144,46,.2);font-size:12px;letter-spacing:.1em;color:#7A5E2E;text-transform:uppercase">Produtos premium</span>
          <span style="padding:10px 18px;border-radius:999px;background:rgba(230,199,187,.4);border:1px solid rgba(184,144,46,.2);font-size:12px;letter-spacing:.1em;color:#7A5E2E;text-transform:uppercase">Ambiente acolhedor</span>
        </div>
      </div>
    </div>
  </section>

  <section id="servicos" data-pad style="position:relative;padding:110px 54px 120px;background:linear-gradient(180deg,#F4E9DB,#FBF6EE)">
    <div style="max-width:1240px;margin:0 auto">
      <div style="text-align:center;margin-bottom:64px">
        <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:18px"><span style="width:36px;height:1px;background:linear-gradient(90deg,transparent,#C2972F)"></span><span style="font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:#9A7E45">O que oferecemos</span><span style="width:36px;height:1px;background:linear-gradient(90deg,#C2972F,transparent)"></span></div>
        <h2 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:56px;line-height:1.05;margin:0;color:#2E2A24;transition-delay:.06s">Experiências feitas para <em style="font-style:italic;color:#B8902E">você</em></h2>
      </div>
      <div data-svc style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px">${servicesHtml}</div>
    </div>
  </section>

  <section data-pad style="position:relative;padding:0;margin:0">
    <div style="position:relative;min-height:520px;display:flex;align-items:center;justify-content:center;overflow:hidden">
      <div style="position:absolute;inset:0;background:linear-gradient(140deg,#2E2620 0%,#5A4630 45%,#8A6A38 100%)"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(120% 120% at 70% 20%,rgba(231,201,134,.28),transparent 60%)"></div>
      <div style="position:absolute;inset:0;opacity:.16;background:linear-gradient(150deg,#F3E4D7,#D9B6A8);mix-blend-mode:overlay"></div>
      <div data-reveal style="position:relative;z-index:2;text-align:center;max-width:760px;padding:90px 40px">
        <span data-hb style="display:inline-block;width:78px;color:#E6C56B;margin-bottom:22px"></span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:46px;line-height:1.22;margin:0 0 26px;color:#FBF3E4;max-width:620px;text-wrap:balance">"Você merece <em style="font-style:italic;color:#E6C56B">viver essa experiência.</em>"</h2>
        <p style="font-size:17px;line-height:1.75;color:rgba(251,243,228,.82);font-weight:300;max-width:500px;margin:0 auto 34px">Presenteie quem você ama — ou a si mesma — com momentos de relaxamento e beleza que ficam guardados para sempre.</p>
        <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:11px;padding:17px 34px;border-radius:999px;background:linear-gradient(135deg,#E0BC62,#FBE9B8 52%,#E0BC62);color:#3a2f12;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;box-shadow:0 18px 40px -16px rgba(0,0,0,.5)">Presentear agora</a>
      </div>
    </div>
  </section>

  <section id="galeria" data-pad style="position:relative;padding:114px 54px;background:#FBF6EE">
    <div style="max-width:1240px;margin:0 auto">
      <div data-two style="display:grid;grid-template-columns:1fr auto;gap:30px;align-items:end;margin-bottom:50px">
        <div>
          <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:18px"><span style="width:40px;height:1px;background:#C2972F"></span><span style="font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:#9A7E45">Galeria</span></div>
          <h2 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:54px;line-height:1.05;margin:0;color:#2E2A24;transition-delay:.06s">Momentos Vida Leve</h2>
        </div>
        <a data-reveal href="https://instagram.com/spavidaleve" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:9px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8A6A2A;font-weight:500;transition-delay:.12s">@spavidaleve <span style="font-size:16px">→</span></a>
      </div>
      <div data-gallery style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:170px;gap:18px">${galleryHtml}</div>
    </div>
  </section>

  <section id="depoimentos" data-pad style="position:relative;padding:110px 54px;background:linear-gradient(180deg,#FBF6EE,#F4E9DB)">
    <div style="max-width:1180px;margin:0 auto">
      <div style="text-align:center;margin-bottom:58px">
        <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:18px"><span style="width:36px;height:1px;background:linear-gradient(90deg,transparent,#C2972F)"></span><span style="font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:#9A7E45">Depoimentos</span><span style="width:36px;height:1px;background:linear-gradient(90deg,#C2972F,transparent)"></span></div>
        <h2 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:54px;line-height:1.05;margin:0;color:#2E2A24;transition-delay:.06s">Quem viveu, recomenda</h2>
      </div>
      <div data-svc style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px">${testimonialsHtml}</div>
    </div>
  </section>

  <section id="contato" data-pad style="position:relative;padding:114px 54px;background:#FBF6EE">
    <div data-contact-grid style="max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center">
      <div>
        <div data-reveal style="display:inline-flex;align-items:center;gap:12px;margin-bottom:20px"><span style="width:40px;height:1px;background:#C2972F"></span><span style="font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:#9A7E45">Agende seu horário</span></div>
        <h2 data-reveal style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:56px;line-height:1.05;margin:0 0 22px;color:#2E2A24;transition-delay:.06s">Vamos cuidar de <em style="font-style:italic;color:#B8902E">você</em></h2>
        <p data-reveal style="font-size:17px;line-height:1.78;color:#6B6258;font-weight:300;margin:0 0 36px;max-width:440px;transition-delay:.12s">Fale com a gente pelo WhatsApp e reserve o seu momento de leveza. Atendimento com hora marcada.</p>
        <a data-reveal href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:12px;padding:19px 38px;border-radius:999px;background:linear-gradient(135deg,#B8902E,#E0BC62 52%,#B8902E);color:#2E2410;font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;box-shadow:0 18px 40px -14px rgba(150,110,20,.6);transition-delay:.18s">Chamar no WhatsApp</a>
      </div>
      <div data-reveal style="background:#FFFDF9;border:1px solid rgba(184,144,46,.2);border-radius:22px;padding:14px;box-shadow:0 34px 70px -38px rgba(90,60,20,.45);transition-delay:.12s">
        <div style="position:relative;height:200px;border-radius:14px;overflow:hidden;margin-bottom:6px">
          <div style="position:absolute;inset:0;background:linear-gradient(150deg,#EFE6D6,#E7C9BC)"></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.5"><span data-hb style="width:96px;color:#8A6A2A"></span></div>
        </div>
        <div style="padding:22px 24px 18px;display:flex;flex-direction:column;gap:20px">
          <div style="display:flex;align-items:flex-start;gap:14px">
            <span style="width:40px;height:40px;flex:none;border-radius:50%;background:rgba(231,201,134,.3);display:flex;align-items:center;justify-content:center;color:#8A6A2A;font-size:18px">☎</span>
            <div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-bottom:3px">Telefone · WhatsApp</div><div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#2E2A24;font-weight:600">(69) 8107-9598</div></div>
          </div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#E8D9B8,transparent)"></div>
          <div style="display:flex;align-items:flex-start;gap:14px">
            <span style="width:40px;height:40px;flex:none;border-radius:50%;background:rgba(231,201,134,.3);display:flex;align-items:center;justify-content:center;color:#8A6A2A;font-size:18px">☷</span>
            <div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-bottom:3px">Horário</div><div style="font-size:16px;color:#2E2A24;font-weight:400">Terça a Sábado · 8h às 19h</div><div style="font-size:13px;color:#9A8A6E;margin-top:2px">Não fechamos para almoço · Dom e Seg fechado</div></div>
          </div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#E8D9B8,transparent)"></div>
          <div style="display:flex;align-items:flex-start;gap:14px">
            <span style="width:40px;height:40px;flex:none;border-radius:50%;background:rgba(231,201,134,.3);display:flex;align-items:center;justify-content:center;color:#8A6A2A;font-size:16px">@</span>
            <div><div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;margin-bottom:3px">Instagram</div><a href="https://instagram.com/spavidaleve" target="_blank" rel="noopener" style="font-size:16px;color:#2E2A24;font-weight:400;text-decoration:none">@spavidaleve</a></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer data-pad style="position:relative;padding:64px 54px 40px;background:linear-gradient(180deg,#2E2620,#231C16);color:#E8DCC6">
    <div data-two style="max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px;align-items:start;padding-bottom:44px">
      <div>
        <div style="display:flex;flex-direction:column;line-height:.8;margin-bottom:18px">
          <span style="font-family:'Pinyon Script',cursive;font-size:40px;background:linear-gradient(100deg,#C2972F,#F2DA94 50%,#C2972F);-webkit-background-clip:text;background-clip:text;color:transparent">Vida Leve</span>
          <span style="font-size:9px;letter-spacing:.52em;color:#B79A5E;margin-left:4px;margin-top:3px">SPA URBANO</span>
        </div>
        <p style="font-size:14px;line-height:1.7;color:rgba(232,220,198,.6);font-weight:300;max-width:300px;margin:0">Bem-estar, beleza e relaxamento em um refúgio urbano pensado para você viver leve.</p>
      </div>
      <div>
        <div style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#B79A5E;margin-bottom:18px">Navegar</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <a href="#sobre" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">Sobre</a>
          <a href="#servicos" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">Serviços</a>
          <a href="#galeria" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">Galeria</a>
          <a href="#contato" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">Contato</a>
        </div>
      </div>
      <div>
        <div style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#B79A5E;margin-bottom:18px">Contato</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">(69) 8107-9598</a>
          <a href="https://instagram.com/spavidaleve" target="_blank" rel="noopener" style="text-decoration:none;font-size:14px;color:rgba(232,220,198,.78)">@spavidaleve</a>
          <span style="font-size:14px;color:rgba(232,220,198,.6)">Terça a Sábado · 8h às 19h</span>
        </div>
      </div>
    </div>
    <div style="max-width:1180px;margin:0 auto;border-top:1px solid rgba(183,154,94,.2);padding-top:24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <span style="font-size:12px;color:rgba(232,220,198,.45)">© Vida Leve · Spa Urbano. Todos os direitos reservados.</span>
      <span style="font-size:12px;color:rgba(232,220,198,.45)">Feito com cuidado e leveza</span>
    </div>
  </footer>

  <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp" style="position:fixed;right:26px;bottom:26px;z-index:70;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#25b34a,#1e9e40);display:flex;align-items:center;justify-content:center;box-shadow:0 16px 34px -12px rgba(20,120,40,.6);animation:vlFloatSlow 4s ease-in-out infinite">
    <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7.9-1.8c1.8 1 3.9 1.5 6.1 1.5 6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4 .9.9-3.8-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.1 9.5 9.9 4.9 16 4.9s10.9 4.6 10.9 10.1S22.1 24.7 16 24.7zm6-7.7c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.3-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>
  </a>

  <div data-switch style="position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:65;display:flex;align-items:center;gap:6px;padding:7px 9px;border-radius:999px;background:rgba(255,253,249,.86);backdrop-filter:blur(12px);border:1px solid rgba(184,144,46,.28);box-shadow:0 18px 40px -18px rgba(90,60,20,.4)">
    <span style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#9A8A6E;padding:0 8px 0 6px">Home</span>
    <button data-set-hero="editorial" class="vl-hbtn">Editorial</button>
    <button data-set-hero="centro" class="vl-hbtn">Centro</button>
    <button data-set-hero="revista" class="vl-hbtn">Revista</button>
  </div>

</div>`;

export default function VidaLeve() {
  useEffect(() => {
    const root = document.getElementById("vl-root");
    if (!root) return;

    // injeta o beija-flor nos slots [data-hb]
    root.querySelectorAll<HTMLElement>("[data-hb]").forEach((el) => {
      el.innerHTML = HB;
    });

    // reveal on scroll
    const show = (el: HTMLElement) => {
      el.setAttribute("data-shown", "1");
      el.style.setProperty(
        "animation",
        "vlRise 1.05s cubic-bezier(.16,.84,.34,1) both",
        "important"
      );
      window.setTimeout(() => {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
      }, 1300);
    };
    const revealCheck = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > -60) show(el);
        });
    };
    const revealAll = () =>
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach(show);

    const onReveal = () => requestAnimationFrame(revealCheck);
    window.addEventListener("scroll", onReveal, { passive: true });
    window.addEventListener("resize", onReveal, { passive: true });
    requestAnimationFrame(revealCheck);
    const t1 = window.setTimeout(revealCheck, 120);
    const t2 = window.setTimeout(revealCheck, 500);
    const t3 = window.setTimeout(revealAll, 1900);

    // header scroll state
    const header = document.getElementById("vl-header");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 24) {
        header.style.background = "rgba(251,246,238,0.9)";
        header.style.backdropFilter = "blur(14px)";
        header.style.boxShadow = "0 12px 40px -22px rgba(90,60,20,0.42)";
        header.style.padding = "14px 54px";
      } else {
        header.style.background = "rgba(251,246,238,0)";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
        header.style.padding = "22px 54px";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // hero switcher
    const btns = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-set-hero]")
    );
    const setHero = (key: string) => {
      root.querySelectorAll<HTMLElement>("[data-hero]").forEach((el) => {
        el.style.display = el.getAttribute("data-hero") === key ? "" : "none";
      });
      btns.forEach((b) =>
        b.classList.toggle("is-active", b.getAttribute("data-set-hero") === key)
      );
      // re-injeta beija-flor e reavalia reveal no hero recém-exibido
      root.querySelectorAll<HTMLElement>("[data-hb]:empty").forEach((el) => {
        el.innerHTML = HB;
      });
      requestAnimationFrame(revealCheck);
    };
    btns.forEach((b) =>
      b.addEventListener("click", () =>
        setHero(b.getAttribute("data-set-hero") || "editorial")
      )
    );
    setHero("editorial");

    return () => {
      window.removeEventListener("scroll", onReveal);
      window.removeEventListener("resize", onReveal);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Pinyon+Script&display=swap"
        rel="stylesheet"
      />
      <style>{`
        #vl-root *{box-sizing:border-box}
        #vl-root ::selection{background:#E6C56B;color:#3a2f12}
        #vl-root a{color:inherit}
        @keyframes vlShimmer{to{background-position:200% center}}
        @keyframes vlFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes vlFloatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes vlSpin{to{transform:rotate(360deg)}}
        @keyframes vlDrift{0%{transform:translateY(0) translateX(0);opacity:0}12%{opacity:.8}88%{opacity:.45}100%{transform:translateY(-150px) translateX(26px);opacity:0}}
        @keyframes vlRise{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        #vl-root [data-reveal]{opacity:0}
        #vl-root .vl-svc:hover{transform:translateY(-8px);box-shadow:0 36px 64px -34px rgba(90,60,20,.5);border-color:rgba(184,144,46,.5)}
        #vl-root .vl-svc:hover .vl-svc-img{transform:scale(1.07)}
        #vl-root .vl-ph:hover .vl-ph-img{transform:scale(1.07)}
        #vl-root .vl-hbtn{border:none;cursor:pointer;padding:9px 16px;border-radius:999px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:500;transition:all .4s ease;background:transparent;color:#9A8A6E}
        #vl-root .vl-hbtn.is-active{background:linear-gradient(135deg,#B8902E,#E0BC62);color:#2E2410;box-shadow:0 8px 18px -8px rgba(150,110,20,.6)}
        @media(max-width:980px){
          #vl-root #vl-navlinks{display:none !important}
          #vl-root [data-two]{grid-template-columns:1fr !important}
          #vl-root [data-hero-grid]{grid-template-columns:1fr !important;text-align:center;gap:40px !important}
          #vl-root [data-hero-img]{margin:8px auto 0 !important;max-width:430px;width:100%}
          #vl-root .vl-edhero .vl-ph{height:440px !important}
          #vl-root [data-edbadge]{display:none !important}
          #vl-root [data-stats]{justify-content:center;gap:24px !important;flex-wrap:wrap}
          #vl-root [data-svc]{grid-template-columns:1fr 1fr !important}
          #vl-root [data-hide-sm]{display:none !important}
          #vl-root [data-h1]{font-size:54px !important}
          #vl-root [data-contact-grid]{grid-template-columns:1fr !important}
        }
        @media(max-width:620px){
          #vl-root [data-svc]{grid-template-columns:1fr !important}
          #vl-root [data-h1]{font-size:42px !important}
          #vl-root h2{font-size:36px !important;line-height:1.14 !important}
          #vl-root [data-pad]{padding-left:22px !important;padding-right:22px !important}
          #vl-root #topo{padding-top:104px !important}
          #vl-root #sobre,#vl-root #servicos,#vl-root #galeria,#vl-root #depoimentos,#vl-root #contato{padding-top:74px !important;padding-bottom:74px !important}
          #vl-root [data-gallery]{grid-template-columns:repeat(2,1fr) !important;grid-auto-rows:138px !important}
          #vl-root .vl-edhero .vl-ph{height:400px !important}
          #vl-root [data-stats]{gap:18px !important}
          #vl-root [data-switch]{display:none !important}
        }
      `}</style>
      <div
        id="vl-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
