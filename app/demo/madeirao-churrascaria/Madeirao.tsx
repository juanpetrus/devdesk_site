"use client";

import { useEffect } from "react";

const IFOOD =
  "https://www.ifood.com.br/delivery/porto-velho-ro/madeirao-churrascaria-sao-cristovao";
const WA = "https://wa.me/5569992442874";
const MAPS =
  "https://maps.google.com/?q=Madeir%C3%A3o+Churrascaria+Av+Pinheiro+Machado+Porto+Velho";
const IG = "https://www.instagram.com/madeiraochurrascaria/";

const arrow = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const slot = (id: string, label: string) =>
  `<div style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(135deg,#2A1A0E,#19110B)">
    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;color:#7c6d5b;font-size:12px;letter-spacing:.04em;font-family:'Oswald',sans-serif">${label}</span>
    <img src="/demo/madeirao-churrascaria/${id}.jpg" alt="${label}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block" onerror="if(this.dataset.f!=='1'){this.dataset.f='1';this.src='/demo/madeirao-churrascaria/${id}.png'}else{this.style.display='none'}">
  </div>`;

type Item = { name: string; desc: string; tag?: string; price?: string };

const itemCard = (it: Item) => `
  <div style="display:flex;flex-direction:column;gap:11px;padding:24px;border:1px solid rgba(244,236,224,.1);border-radius:16px;background:linear-gradient(180deg,rgba(40,30,22,.55),rgba(22,16,11,.55))">
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px">
      <h3 style="margin:0;font-family:'Oswald',sans-serif;font-weight:600;font-size:19px;letter-spacing:.01em;text-transform:uppercase;color:#F7EFE2">${it.name}</h3>
      ${it.price ? `<span style="font-family:'Oswald',sans-serif;font-weight:700;color:#F5A12D;font-size:20px;white-space:nowrap">${it.price}</span>` : ""}
    </div>
    <p style="margin:0;color:#A89886;font-size:14px;line-height:1.55">${it.desc}</p>
    ${it.tag ? `<span style="align-self:flex-start;margin-top:2px;font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#E9C77E;border:1px solid rgba(233,199,126,.28);padding:6px 11px;border-radius:999px">${it.tag}</span>` : ""}
  </div>`;

const CATS: { id: string; label: string; items: Item[] }[] = [
  {
    id: "espetos",
    label: "Espetos na Brasa",
    items: [
      { name: "Picanha", desc: "Corte nobre, selada na brasa e fatiada na hora.", tag: "Na brasa" },
      { name: "Maminha", desc: "Macia e suculenta, assada no ponto certo.", tag: "Na brasa" },
      { name: "Alcatra", desc: "Clássico do rodízio, sabor marcante.", tag: "Na brasa" },
      { name: "Fraldinha", desc: "Fibras longas e muito sabor de churrasco.", tag: "Na brasa" },
      { name: "Costela bovina", desc: "Assada lentamente até quase desmanchar.", tag: "Na brasa" },
      { name: "Cupim", desc: "Macio e marmorizado, derrete na boca.", tag: "Na brasa" },
      { name: "Coração de frango", desc: "Temperado e bem passado, queridinho da casa.", tag: "Na brasa" },
      { name: "Linguiça artesanal", desc: "Levemente defumada, no capricho.", tag: "Na brasa" },
      { name: "Queijo coalho", desc: "Douradinho na brasa, com mel ou puro.", tag: "Na brasa" },
    ],
  },
  {
    id: "porcoes",
    label: "Porções",
    items: [
      { name: "Contra Filé, Alcatra ou Maminha", desc: "Acompanha vinagrete, macaxeira cozida e farofa.", tag: "Serve 2 pessoas" },
      { name: "Fraldinha, Costela ou Cupim", desc: "Acompanha vinagrete, macaxeira cozida e farofa.", tag: "Serve 2 pessoas" },
      { name: "Maionese da casa", desc: "Cremosa, do jeitinho que todo mundo gosta." },
      { name: "Banana Frita", desc: "Sequinha e levemente caramelizada." },
      { name: "Macaxeira Frita", desc: "Crocante por fora, macia por dentro." },
      { name: "Farofa Especial", desc: "Na manteiga, com aquele toque crocante." },
    ],
  },
  {
    id: "buffet",
    label: "Buffet & Marmitex",
    items: [
      { name: "Buffet à Kg", desc: "Self-service variado no almoço: você monta o prato e paga pelo peso.", tag: "Todo dia · 11h–14h45" },
      { name: "Rodízio Self Service", desc: "Espetos na brasa à vontade mais o buffet completo.", price: "R$ 64,90", tag: "Por pessoa" },
      { name: "Marmitex Completa", desc: "Arroz, feijão carioca, feijão tropeiro, maionese, farofa e a carne do dia.", tag: "Para levar" },
      { name: "Marmitex Família", desc: "Porção generosa para dividir em casa, com acompanhamentos.", tag: "Para levar" },
    ],
  },
];

const tabBtn = (id: string, label: string, active: boolean) =>
  `<button data-tab="${id}" style="cursor:pointer;font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.06em;font-size:14px;padding:12px 24px;border-radius:999px;border:1px solid;transition:all .2s;${active ? "background:linear-gradient(180deg,#F5A12D,#E0651C);color:#1A120B;border-color:transparent;box-shadow:0 10px 26px -10px rgba(224,101,28,.8)" : "background:transparent;color:#C9B8A4;border-color:rgba(244,236,224,.16)"}">${label}</button>`;

const catGrid = (id: string, items: Item[], active: boolean) =>
  `<div data-cat="${id}" style="display:${active ? "grid" : "none"};grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px">${items.map(itemCard).join("")}</div>`;

const REVIEWS = [
  { text: "Melhor churrasco de Porto Velho. Os espetos passam sem parar e a carne é macia demais.", name: "Rafael M.", place: "São Cristóvão", initial: "R" },
  { text: "Fui no almoço de buffet e amei a variedade. O feijão tropeiro é nota mil!", name: "Camila S.", place: "Porto Velho · RO", initial: "C" },
  { text: "Rodízio com ótimo custo-benefício, atendimento atencioso e ambiente família.", name: "João P.", place: "Centro", initial: "J" },
];

const feature = (icon: string, title: string, desc: string, border: boolean) => `
  <div style="padding:34px 26px;${border ? "border-right:1px solid rgba(244,236,224,.07);" : ""}display:flex;flex-direction:column;gap:12px">
    ${icon}
    <h3 style="margin:0;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:17px;color:#F4ECE0">${title}</h3>
    <p style="margin:0;font-size:13.5px;line-height:1.5;color:#9C8D7B">${desc}</p>
  </div>`;

const fIcon = (p: string) =>
  `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F5A12D" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow-x:hidden;background:#140F0B;color:#F4ECE0;font-family:'DM Sans',system-ui,sans-serif">

  <!-- NAV -->
  <nav id="md-nav" style="position:fixed;top:0;left:0;right:0;z-index:50;transition:background .3s,border-color .3s;background:transparent;border-bottom:1px solid transparent">
    <div style="max-width:1200px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px">
      <a href="#top" style="display:flex;flex-direction:column;line-height:.92">
        <span style="font-family:'Cinzel',serif;font-weight:700;font-size:23px;letter-spacing:.14em;color:#F7EFE2">MADEIRÃO</span>
        <span style="font-family:'Oswald',sans-serif;font-weight:400;font-size:9.5px;letter-spacing:.42em;color:#E0651C;padding-left:2px">CHURRASCARIA</span>
      </a>
      <div style="display:flex;align-items:center;gap:30px">
        <div id="md-navlinks" style="display:flex;gap:28px;align-items:center">
          <a href="#sobre" style="font-size:13.5px;letter-spacing:.04em;color:#D8C9B7">Sobre</a>
          <a href="#cardapio" style="font-size:13.5px;letter-spacing:.04em;color:#D8C9B7">Cardápio</a>
          <a href="#galeria" style="font-size:13.5px;letter-spacing:.04em;color:#D8C9B7">Galeria</a>
          <a href="#visite" style="font-size:13.5px;letter-spacing:.04em;color:#D8C9B7">Visite</a>
        </div>
        <a href="${IFOOD}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:13px;color:#1A120B;background:linear-gradient(180deg,#F5A12D,#E0651C);padding:11px 18px;border-radius:999px;box-shadow:0 10px 26px -10px rgba(224,101,28,.85)">Peça no iFood</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <header id="top" style="position:relative;min-height:100vh;display:flex;align-items:center;padding:120px 24px 70px;overflow:hidden;background:radial-gradient(120% 90% at 75% 10%,#2A1A0E 0%,#19110B 45%,#0E0A07 100%)">
    <div style="position:absolute;top:8%;right:6%;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(245,161,45,.32),rgba(224,101,28,.05) 60%,transparent 72%);filter:blur(8px);animation:flick 5s ease-in-out infinite;pointer-events:none"></div>
    <div style="position:absolute;bottom:-10%;left:-6%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(178,58,18,.28),transparent 68%);filter:blur(20px);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(115deg,transparent,transparent 12px,rgba(0,0,0,.18) 13px,transparent 15px);opacity:.25;mix-blend-mode:overlay;pointer-events:none"></div>

    <div data-hero-grid style="position:relative;z-index:2;max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(233,199,126,.3);border-radius:999px;padding:7px 14px;margin-bottom:26px">
          <span style="width:7px;height:7px;border-radius:50%;background:#E0651C;box-shadow:0 0 10px 2px rgba(224,101,28,.9)"></span>
          <span style="font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#E9C77E">Porto Velho · RO — desde 2021</span>
        </div>
        <h1 style="margin:0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(46px,7vw,88px);line-height:.95;letter-spacing:-.01em;text-transform:uppercase;color:#F7EFE2">O melhor da<br><span style="color:#F5A12D;text-shadow:0 0 40px rgba(245,161,45,.45)">brasa</span> em Porto&nbsp;Velho</h1>
        <p style="max-width:480px;margin:24px 0 0;font-size:17px;line-height:1.6;color:#C5B6A3">Espetos passando na mesa, buffet à vontade e marmitex pra levar. Cortes nobres assados no ponto certo do fogo — todo dia, do almoço à noite.</p>
        <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:34px">
          <a href="${IFOOD}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:15px;color:#1A120B;background:linear-gradient(180deg,#F5A12D,#E0651C);padding:16px 26px;border-radius:999px;box-shadow:0 16px 34px -12px rgba(224,101,28,.85)">Peça agora no iFood ${arrow}</a>
          <a href="#cardapio" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.05em;font-size:15px;color:#F4ECE0;border:1px solid rgba(244,236,224,.28);padding:16px 26px;border-radius:999px">Ver cardápio</a>
        </div>
        <div style="display:flex;align-items:center;gap:22px;margin-top:36px">
          <div style="display:flex;flex-direction:column">
            <div style="display:flex;align-items:center;gap:7px">
              <span style="font-family:'Oswald',sans-serif;font-weight:700;font-size:26px;color:#F7EFE2">4.8</span>
              <span style="color:#F5A12D;font-size:15px;letter-spacing:1px">★★★★★</span>
            </div>
            <span style="font-size:12px;color:#9A8B79;letter-spacing:.03em">886 avaliações no iFood</span>
          </div>
          <div style="width:1px;height:38px;background:rgba(244,236,224,.14)"></div>
          <div style="display:flex;flex-direction:column">
            <span style="font-family:'Oswald',sans-serif;font-weight:700;font-size:26px;color:#F7EFE2">+23 mil</span>
            <span style="font-size:12px;color:#9A8B79;letter-spacing:.03em">seguidores no Instagram</span>
          </div>
        </div>
      </div>

      <div data-hero-photos style="position:relative;height:520px">
        <div style="position:absolute;top:0;right:0;width:74%;height:62%;border-radius:20px;overflow:hidden;border:1px solid rgba(244,236,224,.12);box-shadow:0 30px 60px -20px rgba(0,0,0,.7)">${slot("hero-1", "Foto dos espetos")}</div>
        <div style="position:absolute;bottom:0;left:0;width:62%;height:50%;border-radius:20px;overflow:hidden;border:1px solid rgba(244,236,224,.12);box-shadow:0 30px 60px -20px rgba(0,0,0,.7);animation:floatY 7s ease-in-out infinite">${slot("hero-2", "Foto do prato")}</div>
        <div style="position:absolute;top:54%;right:-6px;z-index:3;background:linear-gradient(180deg,#F5A12D,#D1551A);color:#1A120B;border-radius:18px;padding:16px 20px;text-align:center;box-shadow:0 18px 40px -14px rgba(224,101,28,.9);border:1px solid rgba(255,255,255,.25)">
          <div style="font-family:'Oswald',sans-serif;font-weight:500;font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.85">Rodízio</div>
          <div style="font-family:'Oswald',sans-serif;font-weight:700;font-size:32px;line-height:1;white-space:nowrap">R$ 64,90</div>
          <div style="font-family:'Oswald',sans-serif;font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.85">por pessoa</div>
        </div>
      </div>
    </div>
  </header>

  <!-- FEATURES -->
  <section style="position:relative;background:#100C08;border-top:1px solid rgba(244,236,224,.07);border-bottom:1px solid rgba(244,236,224,.07)">
    <div data-feat style="max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr)">
      ${feature(fIcon('<path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1 0-2-.5-3 .5 4 2 5 2 8a6.5 6.5 0 0 1-13 0c0-3 3-5 3-8 0 2 1 3 2 3 1.5 0 1.5-2 .5-3-1-1.5-2-2 0-3z"/>'), "Espetos na brasa", "Cortes nobres no fogo, passando na mesa à noite.", true)}
      ${feature(fIcon('<path d="M12 3v3M5.5 6h13M6 6l-3 7a4 4 0 0 0 8 0L8 6M16 6l-3 7a4 4 0 0 0 8 0l-3-7M9 21h6M12 6v15"/>'), "Buffet à kg", "Almoço self-service variado, todos os dias.", true)}
      ${feature(fIcon('<path d="M18.2 9.8a6 6 0 1 0-1.4 5.4M18.2 9.8H22V6M5.8 14.2a6 6 0 0 0 1.4-5.4"/>'), "Rodízio à vontade", "Espetos + buffet completo por R$ 64,90.", true)}
      ${feature(fIcon('<path d="M3 8h11v8H3zM14 11h4l3 3v2h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>'), "Marmitex & delivery", "Peça no iFood e receba quentinho em casa.", false)}
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" style="position:relative;padding:110px 24px;background:linear-gradient(180deg,#140F0B,#19120C)">
    <div data-sobre style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center">
      <div data-sobre-photos style="position:relative;height:480px">
        <div style="position:absolute;top:0;left:0;width:66%;height:70%;border-radius:18px;overflow:hidden;border:1px solid rgba(244,236,224,.12);box-shadow:0 30px 60px -22px rgba(0,0,0,.7)">${slot("about-1", "Foto do salão / brasa")}</div>
        <div style="position:absolute;bottom:0;right:0;width:54%;height:54%;border-radius:18px;overflow:hidden;border:1px solid rgba(244,236,224,.12);box-shadow:0 30px 60px -22px rgba(0,0,0,.7)">${slot("about-2", "Foto da equipe")}</div>
        <div style="position:absolute;top:-16px;right:8%;font-family:'Cinzel',serif;font-weight:700;font-size:13px;letter-spacing:.3em;color:rgba(245,161,45,.5);writing-mode:vertical-rl">RUMO AO HEXA</div>
      </div>
      <div>
        <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#E0651C">Nossa história</span>
        <h2 style="margin:14px 0 0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(34px,4.4vw,52px);line-height:1.02;text-transform:uppercase;color:#F7EFE2">Tradição que<br>nasce no fogo</h2>
        <p style="margin:26px 0 0;font-size:16px;line-height:1.7;color:#C2B3A0">Desde 2021, o Madeirão acende a brasa em Porto Velho com um propósito simples: servir o melhor churrasco da cidade, do jeito que o rondoniense gosta — carne macia, tempero na medida e fartura no prato.</p>
        <p style="margin:18px 0 0;font-size:16px;line-height:1.7;color:#C2B3A0">No almoço, o buffet à kg e o rodízio reúnem famílias e amigos. À noite, os espetos na brasa tomam conta do salão. E quem prefere ficar em casa, pede no iFood e recebe tudo quentinho.</p>
        <div style="display:flex;gap:40px;margin-top:34px;flex-wrap:wrap">
          <div><div style="font-family:'Oswald',sans-serif;font-weight:700;font-size:34px;color:#F5A12D">2021</div><div style="font-size:12.5px;color:#9A8B79;letter-spacing:.04em">Acendendo a brasa</div></div>
          <div><div style="font-family:'Oswald',sans-serif;font-weight:700;font-size:34px;color:#F5A12D">+30</div><div style="font-size:12.5px;color:#9A8B79;letter-spacing:.04em">Cortes e acompanhamentos</div></div>
          <div><div style="font-family:'Oswald',sans-serif;font-weight:700;font-size:34px;color:#F5A12D">4.8</div><div style="font-size:12.5px;color:#9A8B79;letter-spacing:.04em">Nota no iFood</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- RODÍZIO BAND -->
  <section id="rodizio" style="position:relative;padding:90px 24px;background:radial-gradient(100% 140% at 50% 0%,#27170C,#100C08);overflow:hidden">
    <div style="position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:700px;height:500px;background:radial-gradient(circle,rgba(245,161,45,.16),transparent 65%);filter:blur(10px);pointer-events:none"></div>
    <div data-rodizio style="position:relative;max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;background:linear-gradient(180deg,rgba(38,27,18,.85),rgba(22,16,11,.85));border:1px solid rgba(245,161,45,.22);border-radius:26px;padding:14px;box-shadow:0 40px 80px -30px rgba(0,0,0,.8)">
      <div style="height:340px;border-radius:18px;overflow:hidden">${slot("rodizio-main", "Foto da tábua de carnes")}</div>
      <div style="padding:18px 32px 18px 8px">
        <span style="font-family:'Oswald',sans-serif;font-size:12.5px;letter-spacing:.28em;text-transform:uppercase;color:#E9C77E">Rodízio self service</span>
        <h2 style="margin:12px 0 0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(32px,4vw,46px);line-height:1;text-transform:uppercase;color:#F7EFE2">Churrasco<br>à vontade</h2>
        <p style="margin:18px 0 0;font-size:15.5px;line-height:1.6;color:#C2B3A0;max-width:380px">Espetos variados passando na mesa o tempo todo, mais o buffet completo com arroz, feijão tropeiro, farofa, vinagrete e saladas. Coma sem pressa.</p>
        <div style="display:flex;align-items:flex-end;gap:14px;margin:26px 0 22px">
          <span style="font-family:'Oswald',sans-serif;font-weight:700;font-size:56px;line-height:.8;color:#F5A12D">R$ 64,90</span>
          <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#9A8B79;padding-bottom:8px">por pessoa</span>
        </div>
        <a href="${WA}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:14px;color:#1A120B;background:linear-gradient(180deg,#F5A12D,#E0651C);padding:14px 24px;border-radius:999px;box-shadow:0 14px 30px -12px rgba(224,101,28,.85)">Reservar uma mesa</a>
      </div>
    </div>
  </section>

  <!-- CARDÁPIO -->
  <section id="cardapio" style="padding:110px 24px;background:#140F0B">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;max-width:620px;margin:0 auto 14px">
        <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#E0651C">Nosso cardápio</span>
        <h2 style="margin:14px 0 0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(34px,4.6vw,54px);line-height:1.02;text-transform:uppercase;color:#F7EFE2">Direto da brasa<br>pro seu prato</h2>
        <p style="margin:18px 0 0;font-size:15.5px;line-height:1.6;color:#9C8D7B">Cortes, porções e marmitex preparados na hora. Cardápio completo e pedidos pelo iFood.</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:40px 0 38px">
        ${CATS.map((c, i) => tabBtn(c.id, c.label, i === 0)).join("")}
      </div>
      ${CATS.map((c, i) => catGrid(c.id, c.items, i === 0)).join("")}
      <div style="display:flex;justify-content:center;margin-top:42px">
        <a href="${IFOOD}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:15px;color:#1A120B;background:linear-gradient(180deg,#F5A12D,#E0651C);padding:16px 30px;border-radius:999px;box-shadow:0 16px 34px -12px rgba(224,101,28,.85)">Ver cardápio completo no iFood ${arrow}</a>
      </div>
    </div>
  </section>

  <!-- GALERIA -->
  <section id="galeria" style="padding:110px 24px;background:linear-gradient(180deg,#100C08,#160F0A)">
    <div style="max-width:1200px;margin:0 auto">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-bottom:34px">
        <div>
          <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#E0651C">Galeria</span>
          <h2 style="margin:12px 0 0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(32px,4.4vw,50px);line-height:1;text-transform:uppercase;color:#F7EFE2">Da brasa pra mesa</h2>
        </div>
        <a href="${IG}" target="_blank" rel="noopener" style="font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.05em;font-size:13.5px;color:#E9C77E;border:1px solid rgba(233,199,126,.3);padding:11px 20px;border-radius:999px">@madeiraochurrascaria</a>
      </div>
      <div data-gallery style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;gap:14px">
        <div style="grid-column:span 2;grid-row:span 2;border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-1", "Foto destaque")}</div>
        <div style="border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-2", "Foto")}</div>
        <div style="border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-3", "Foto")}</div>
        <div style="grid-column:span 2;border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-4", "Foto")}</div>
        <div style="border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-5", "Foto")}</div>
        <div style="border-radius:16px;overflow:hidden;border:1px solid rgba(244,236,224,.1)">${slot("gal-6", "Foto")}</div>
      </div>
    </div>
  </section>

  <!-- AVALIAÇÕES -->
  <section style="padding:100px 24px;background:#140F0B">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#E0651C">Quem prova, aprova</span>
      <h2 style="margin:14px 0 8px;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(32px,4.4vw,50px);line-height:1.02;text-transform:uppercase;color:#F7EFE2">4.8 estrelas no iFood</h2>
      <p style="margin:0 0 44px;font-size:15px;color:#9C8D7B">Mais de 880 avaliações de quem já sentou à nossa mesa.</p>
      <div data-reviews style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;text-align:left">
        ${REVIEWS.map((r) => `
          <div style="display:flex;flex-direction:column;gap:14px;padding:28px;border:1px solid rgba(244,236,224,.1);border-radius:18px;background:linear-gradient(180deg,rgba(38,27,18,.5),rgba(20,15,10,.5))">
            <span style="color:#F5A12D;font-size:15px;letter-spacing:2px">★★★★★</span>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#D6C8B6">${r.text}</p>
            <div style="display:flex;align-items:center;gap:11px;margin-top:4px">
              <span style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#E0651C,#7A2E0C);display:flex;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-weight:600;color:#F7EFE2">${r.initial}</span>
              <div style="display:flex;flex-direction:column"><span style="font-size:13.5px;color:#F4ECE0;font-weight:600">${r.name}</span><span style="font-size:12px;color:#8A7B6A">${r.place}</span></div>
            </div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- VISITE -->
  <section id="visite" style="padding:0;background:#100C08">
    <div data-visite style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr">
      <div style="padding:90px 56px;display:flex;flex-direction:column;justify-content:center">
        <span style="font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#E0651C">Visite o Madeirão</span>
        <h2 style="margin:14px 0 0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);line-height:1.02;text-transform:uppercase;color:#F7EFE2">Te esperamos<br>na brasa</h2>
        <div style="display:flex;flex-direction:column;gap:22px;margin-top:36px">
          <div style="display:flex;gap:16px;align-items:flex-start">
            <span style="flex:none;width:42px;height:42px;border-radius:12px;border:1px solid rgba(245,161,45,.3);display:flex;align-items:center;justify-content:center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5A12D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span>
            <div><div style="font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:13px;color:#9A8B79">Endereço</div><div style="font-size:15.5px;color:#EADFCF;margin-top:3px;line-height:1.5">Av. Pinheiro Machado — São Cristóvão<br>Porto Velho · RO, 76804-079</div></div>
          </div>
          <div style="display:flex;gap:16px;align-items:flex-start">
            <span style="flex:none;width:42px;height:42px;border-radius:12px;border:1px solid rgba(245,161,45,.3);display:flex;align-items:center;justify-content:center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5A12D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></span>
            <div><div style="font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:13px;color:#9A8B79">Horário</div><div style="font-size:15.5px;color:#EADFCF;margin-top:3px;line-height:1.5">Almoço todos os dias · 11h às 14h45<br>Espetos na brasa à noite</div></div>
          </div>
          <div style="display:flex;gap:16px;align-items:flex-start">
            <span style="flex:none;width:42px;height:42px;border-radius:12px;border:1px solid rgba(245,161,45,.3);display:flex;align-items:center;justify-content:center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5A12D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg></span>
            <div><div style="font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:13px;color:#9A8B79">Telefone</div><div style="font-size:15.5px;color:#EADFCF;margin-top:3px">(69) 99244-2874</div></div>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:36px">
          <a href="${WA}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:14px;color:#fff;background:#128C4B;padding:14px 22px;border-radius:999px;box-shadow:0 12px 28px -12px rgba(18,140,75,.8)"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg> Chamar no WhatsApp</a>
          <a href="${MAPS}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.05em;font-size:14px;color:#F4ECE0;border:1px solid rgba(244,236,224,.28);padding:14px 22px;border-radius:999px">Ver no mapa</a>
        </div>
      </div>
      <a href="${MAPS}" target="_blank" rel="noopener" style="position:relative;min-height:520px;display:block;background:linear-gradient(135deg,#1C140D,#241A11);overflow:hidden">
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(245,161,45,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,161,45,.06) 1px,transparent 1px);background-size:48px 48px"></div>
        <div style="position:absolute;left:18%;top:30%;width:64%;height:8px;background:rgba(245,161,45,.18);transform:rotate(-18deg);border-radius:4px"></div>
        <div style="position:absolute;left:8%;top:62%;width:80%;height:8px;background:rgba(245,161,45,.12);transform:rotate(8deg);border-radius:4px"></div>
        <div style="position:absolute;left:50%;top:48%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center">
          <div style="display:flex;flex-direction:column;align-items:center;padding:10px 14px;background:rgba(16,12,8,.9);border:1px solid rgba(245,161,45,.35);border-radius:12px;backdrop-filter:blur(4px);white-space:nowrap">
            <span style="font-family:'Cinzel',serif;font-weight:700;font-size:13px;letter-spacing:.1em;color:#F7EFE2">MADEIRÃO</span>
            <span style="font-size:11px;color:#9A8B79">Av. Pinheiro Machado</span>
          </div>
          <span style="width:18px;height:18px;border-radius:50% 50% 50% 0;background:#E0651C;transform:rotate(45deg);margin-top:-2px;box-shadow:0 0 18px 4px rgba(224,101,28,.6)"></span>
        </div>
        <span style="position:absolute;bottom:18px;right:18px;font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#E9C77E;border:1px solid rgba(233,199,126,.3);padding:8px 14px;border-radius:999px;background:rgba(16,12,8,.6)">Abrir no Google Maps</span>
      </a>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section style="position:relative;padding:100px 24px;text-align:center;background:radial-gradient(90% 130% at 50% 0%,#2A1809,#120D08);overflow:hidden">
    <div style="position:absolute;top:-20%;left:50%;transform:translateX(-50%);width:620px;height:420px;background:radial-gradient(circle,rgba(245,161,45,.2),transparent 65%);filter:blur(12px);pointer-events:none"></div>
    <div style="position:relative;max-width:760px;margin:0 auto">
      <h2 style="margin:0;font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(40px,6vw,72px);line-height:.98;text-transform:uppercase;color:#F7EFE2">Bateu a fome?</h2>
      <p style="margin:20px auto 0;max-width:480px;font-size:17px;line-height:1.6;color:#C5B6A3">A brasa já está acesa. Garanta sua mesa ou peça pelo iFood e receba o melhor churrasco de Porto Velho em casa.</p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:34px">
        <a href="${IFOOD}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:15px;color:#1A120B;background:linear-gradient(180deg,#F5A12D,#E0651C);padding:17px 30px;border-radius:999px;box-shadow:0 16px 34px -12px rgba(224,101,28,.85)">Peça no iFood</a>
        <a href="${WA}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:15px;color:#fff;background:#128C4B;padding:17px 30px;border-radius:999px">Reservar no WhatsApp</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background:#0C0805;border-top:1px solid rgba(244,236,224,.08);padding:56px 24px 30px">
    <div data-footer style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px">
      <div>
        <div style="display:flex;flex-direction:column;line-height:.92">
          <span style="font-family:'Cinzel',serif;font-weight:700;font-size:24px;letter-spacing:.14em;color:#F7EFE2">MADEIRÃO</span>
          <span style="font-family:'Oswald',sans-serif;font-weight:400;font-size:10px;letter-spacing:.42em;color:#E0651C;padding-left:2px">CHURRASCARIA</span>
        </div>
        <p style="margin:18px 0 0;max-width:300px;font-size:14px;line-height:1.6;color:#8A7B6A">O melhor da brasa em Porto Velho desde 2021. Buffet à kg, rodízio, espetos na brasa e marmitex.</p>
        <div style="display:flex;gap:12px;margin-top:20px">
          <a href="${IG}" target="_blank" rel="noopener" style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(244,236,224,.18);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E9C77E" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#E9C77E" stroke="none"/></svg></a>
          <a href="${WA}" target="_blank" rel="noopener" style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(244,236,224,.18);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="#E9C77E"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20z"/></svg></a>
        </div>
      </div>
      <div>
        <div style="font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:13px;color:#9A8B79;margin-bottom:16px">Navegue</div>
        <div style="display:flex;flex-direction:column;gap:11px;font-size:14px;color:#C2B3A0">
          <a href="#sobre">Sobre nós</a><a href="#cardapio">Cardápio</a><a href="#galeria">Galeria</a><a href="#visite">Visite</a>
        </div>
      </div>
      <div>
        <div style="font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:13px;color:#9A8B79;margin-bottom:16px">Contato</div>
        <div style="display:flex;flex-direction:column;gap:11px;font-size:14px;color:#C2B3A0;line-height:1.5">
          <span>Av. Pinheiro Machado — São Cristóvão<br>Porto Velho · RO</span>
          <a href="tel:+5569992442874">(69) 99244-2874</a>
          <span>Almoço todos os dias · 11h–14h45</span>
        </div>
      </div>
    </div>
    <div style="max-width:1200px;margin:40px auto 0;padding-top:22px;border-top:1px solid rgba(244,236,224,.08);display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;font-size:12.5px;color:#6E6051">
      <span>© 2026 Madeirão Churrascaria. Todos os direitos reservados.</span>
      <span style="font-family:'Cinzel',serif;letter-spacing:.2em;color:#8A6A3A">RUMO AO HEXA</span>
    </div>
  </footer>
</div>`;

const MD_CSS = `
  #md-root *{box-sizing:border-box}
  #md-root a{color:inherit;text-decoration:none}
  #md-root img{display:block;max-width:100%}
  #md-root ::selection{background:#E0651C;color:#fff}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
  @keyframes flick{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
  #md-root [data-tab]:hover{filter:brightness(1.08)}
  @media(max-width:860px){
    #md-root #md-navlinks{display:none!important}
    #md-root [data-hero-grid]{grid-template-columns:1fr!important;gap:8px!important}
    #md-root [data-hero-photos]{display:none!important}
    #md-root [data-feat]{grid-template-columns:1fr 1fr!important}
    #md-root [data-sobre]{grid-template-columns:1fr!important;gap:40px!important}
    #md-root [data-sobre-photos]{height:360px!important}
    #md-root [data-rodizio]{grid-template-columns:1fr!important}
    #md-root [data-gallery]{grid-template-columns:1fr 1fr!important}
    #md-root [data-reviews]{grid-template-columns:1fr!important}
    #md-root [data-visite]{grid-template-columns:1fr!important}
    #md-root [data-footer]{grid-template-columns:1fr!important;gap:32px!important}
  }
`;

export default function Madeirao() {
  useEffect(() => {
    const root = document.getElementById("md-root");
    if (!root) return;

    const navEl = root.querySelector("#md-nav") as HTMLElement | null;
    const onScroll = () => {
      if (!navEl) return;
      if (window.scrollY > 40) {
        navEl.style.background = "rgba(16,12,8,.88)";
        navEl.style.backdropFilter = "blur(14px)";
        navEl.style.borderBottom = "1px solid rgba(244,236,224,.1)";
      } else {
        navEl.style.background = "transparent";
        navEl.style.backdropFilter = "none";
        navEl.style.borderBottom = "1px solid transparent";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const tabs = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-tab]")
    );
    const grids = Array.from(root.querySelectorAll<HTMLElement>("[data-cat]"));
    const setTab = (id: string) => {
      grids.forEach((g) => {
        g.style.display = g.getAttribute("data-cat") === id ? "grid" : "none";
      });
      tabs.forEach((x) => {
        const on = x.getAttribute("data-tab") === id;
        x.style.background = on
          ? "linear-gradient(180deg,#F5A12D,#E0651C)"
          : "transparent";
        x.style.color = on ? "#1A120B" : "#C9B8A4";
        x.style.borderColor = on ? "transparent" : "rgba(244,236,224,.16)";
        x.style.boxShadow = on ? "0 10px 26px -10px rgba(224,101,28,.8)" : "none";
      });
    };
    const onTab = (e: Event) => {
      const id = (e.currentTarget as HTMLElement).getAttribute("data-tab");
      if (id) setTab(id);
    };
    tabs.forEach((t) => t.addEventListener("click", onTab));

    return () => {
      window.removeEventListener("scroll", onScroll);
      tabs.forEach((t) => t.removeEventListener("click", onTab));
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Oswald:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
        rel="stylesheet"
      />
      <style>{MD_CSS}</style>
      <div
        id="md-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
