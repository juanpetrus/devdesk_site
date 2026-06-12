"use client";

import { useEffect } from "react";

// Número placeholder — troque pelo WhatsApp real da Rafaella.
const WA_NUM = "5537999999999";
const waLink =
  `https://wa.me/${WA_NUM}?text=` +
  encodeURIComponent("Oi, Rafa! Vim pelo site e gostaria de agendar uma avaliação.");
const instaLink = "https://instagram.com/rafaellak.fisio";

const waSvg = (s: number, fill: string) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.04c-.24.68-1.42 1.32-1.96 1.36-.5.05-1.14.07-1.84-.12-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.83-4.2-4.98-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.04.9 2.19.07.15.12.32.02.51-.09.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.59.75 1.86.89.27.14.45.2.52.31.07.12.07.66-.17 1.34z"/></svg>`;

const sicon = (paths: string[]) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8C5732" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${paths.map((d) => `<path d="${d}"/>`).join("")}</svg>`;

const seal = (sfx: string, stroke: string, fill: string) =>
  `<svg width="132" height="132" viewBox="0 0 200 200"><defs><path id="rkTop${sfx}" d="M 22,100 A 78,78 0 0 1 178,100"/><path id="rkBot${sfx}" d="M 178,100 A 78,78 0 0 1 22,100"/></defs><circle cx="100" cy="100" r="95" fill="none" stroke="${stroke}" stroke-width="1"/><circle cx="100" cy="100" r="62" fill="none" stroke="${stroke}" stroke-width="0.6" opacity="0.5"/><text font-family="Jost, sans-serif" font-size="12" letter-spacing="3.4" fill="${fill}" dy="-8"><textPath href="#rkTop${sfx}" startOffset="50%" text-anchor="middle">DRA. RAFAELLA KALENA</textPath></text><text font-family="Jost, sans-serif" font-size="11" letter-spacing="3" fill="${fill}" dy="18"><textPath href="#rkBot${sfx}" startOffset="50%" text-anchor="middle">FISIOTERAPEUTA · TERAPIA DA DOR</textPath></text><text x="100" y="118" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="600" font-size="64" fill="${fill}" letter-spacing="-2">RK</text></svg>`;

const slot = (id: string, label: string, css: string) =>
  `<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#F0DCC4,#E0BB94);${css}">
    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:#8C5732;font-size:12px;letter-spacing:.04em;font-family:'Jost',sans-serif">${label}</span>
    <img src="/demo/rafaella-kalena/${id}.jpg" alt="${label}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block" onerror="if(this.dataset.f!=='1'){this.dataset.f='1';this.src='/demo/rafaella-kalena/${id}.png'}else{this.style.display='none'}">
  </div>`;

const SERVICOS = [
  { title: "Liberação Miofascial", desc: "Libera tensões profundas da fáscia, devolvendo mobilidade e aliviando dores crônicas.", icon: sicon(["M4 12c3-4 5-4 8 0s5 4 8 0"]) },
  { title: "Terapia da Dor", desc: "Protocolo manual e instrumental que trata a causa da dor — não apenas o sintoma.", icon: sicon(["M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"]) },
  { title: "Terapia na Gestação", desc: "Alívio das dores e tensões da gravidez, com técnicas seguras para mãe e bebê.", icon: sicon(["M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M12 10c-3 1-4 4-4 7 0 2 1 3 4 3"]) },
  { title: "Dor de Cabeça & Cervical", desc: "Tratamento das tensões que disparam enxaqueca, dor cervical e peso nos ombros.", icon: sicon(["M9 9a3 3 0 1 1 4 2.8c-1 .5-1 1.2-1 2.2", "M12 17v.5"]) },
  { title: "Recuperação & Performance", desc: "Acelera a recuperação muscular, melhora a performance e previne lesões.", icon: sicon(["M4 14l4-4 3 3 5-6 4 4"]) },
  { title: "Ventosaterapia & Instrumental", desc: "Cupping e ferramentas que potencializam a circulação e o relaxamento profundo.", icon: sicon(["M7 4h10v5a5 5 0 0 1-10 0z", "M12 14v6"]) },
];

const DORES = [
  "Dor e tensão no pescoço e ombros",
  "Enxaqueca e dor de cabeça frequente",
  "Dores na lombar e na coluna",
  "Tensões e desconfortos da gestação",
  "Rigidez e cansaço muscular",
  "Estresse, ansiedade e bruxismo",
];

const PASSOS = [
  { n: "01", title: "Avaliação", desc: "Entendo sua história, sua dor e seus objetivos com atenção." },
  { n: "02", title: "Plano sob medida", desc: "Monto um protocolo personalizado para o seu corpo e rotina." },
  { n: "03", title: "Tratamento", desc: "Sessões com técnicas manuais e instrumentais, no seu tempo." },
  { n: "04", title: "Evolução", desc: "Acompanho seus resultados e ajusto o caminho com você." },
];

const DEPOIMENTOS = [
  { quote: "Cheguei com uma enxaqueca que não passava com nada. Em poucas sessões voltei a ter meus dias de volta.", name: "Paciente · liberação miofascial" },
  { quote: "A Rafa entende o corpo da mulher como ninguém. Me sinto cuidada de verdade a cada sessão.", name: "Paciente · terapia da dor" },
  { quote: "Saí de cada atendimento mais leve. Hoje me movimento sem dor e com muito mais energia.", name: "Paciente · recuperação" },
];

const FAQS = [
  { q: "Preciso de pedido médico?", a: "Não é obrigatório. Faço uma avaliação completa para entender sua dor e indicar o melhor caminho de tratamento para você." },
  { q: "Quantas sessões vou precisar?", a: "Depende de cada caso. Na avaliação eu defino um plano com a frequência ideal para os seus objetivos." },
  { q: "O atendimento dói?", a: "As técnicas são confortáveis e sempre ajustadas ao seu limite. O objetivo é alívio e bem-estar, nunca desconforto." },
  { q: "Você atende gestantes?", a: "Sim. Uso técnicas seguras e específicas para cada fase da gestação, com todo o cuidado para mãe e bebê." },
  { q: "Onde fica o atendimento?", a: "Atendo em consultório reservado e acolhedor. Te envio a localização exata ao confirmarmos o agendamento pelo WhatsApp." },
];

const navLink = (href: string, label: string) =>
  `<a href="${href}" style="font-size:13px;letter-spacing:.06em;color:#5B4636">${label}</a>`;

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow-x:hidden;background:#FBF7F2;color:#2A211B;font-family:'Jost',sans-serif">

  <!-- NAV -->
  <header style="position:fixed;top:0;left:0;right:0;z-index:90;backdrop-filter:blur(14px);background:rgba(251,247,242,.78);border-bottom:1px solid rgba(42,33,27,.08)">
    <div style="max-width:1200px;margin:0 auto;padding:14px clamp(20px,4vw,40px);display:flex;align-items:center;justify-content:space-between;gap:20px">
      <a href="#topo" style="display:flex;align-items:center;gap:12px">
        <span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ECCBA6 0%,#C7905F 55%,#A1693F 100%);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:20px;color:#3A2A1E;letter-spacing:-.04em;box-shadow:0 6px 18px rgba(166,107,67,.28)">RK</span>
        <span style="display:flex;flex-direction:column;line-height:1.05">
          <span style="font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;letter-spacing:.02em;white-space:nowrap">Rafaella Kalena</span>
          <span style="font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:#A86E45;white-space:nowrap">Fisioterapeuta</span>
        </span>
      </a>
      <nav id="rk-desktopnav" style="display:flex;align-items:center;gap:30px">
        ${navLink("#sobre", "Sobre")}
        ${navLink("#tratamentos", "Tratamentos")}
        ${navLink("#dores", "Para quem é")}
        ${navLink("#metodo", "Como funciona")}
        ${navLink("#faq", "Dúvidas")}
        <a href="${waLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;background:#2A211B;color:#FBF7F2;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;padding:12px 20px;border-radius:100px">Agendar</a>
      </nav>
      <button id="rk-hamburger" aria-label="Menu" style="width:44px;height:44px;flex-direction:column;align-items:center;justify-content:center;gap:5px;background:transparent;border:1px solid rgba(42,33,27,.15);border-radius:50%;cursor:pointer">
        <span style="display:block;width:18px;height:1.5px;background:#2A211B"></span>
        <span style="display:block;width:18px;height:1.5px;background:#2A211B"></span>
      </button>
    </div>
  </header>

  <!-- MOBILE MENU -->
  <div id="rk-mobilemenu" style="position:fixed;inset:0;z-index:95;background:rgba(251,247,242,.98);backdrop-filter:blur(8px);flex-direction:column;padding:26px clamp(20px,5vw,40px)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span style="font-family:'Cormorant Garamond',serif;font-size:22px">Rafaella Kalena</span>
      <button data-close aria-label="Fechar" style="width:44px;height:44px;background:transparent;border:1px solid rgba(42,33,27,.15);border-radius:50%;font-size:20px;cursor:pointer;color:#2A211B">✕</button>
    </div>
    <nav style="display:flex;flex-direction:column;gap:6px;margin-top:48px">
      <a href="#sobre" style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:400;padding:10px 0;border-bottom:1px solid rgba(42,33,27,.08)">Sobre</a>
      <a href="#tratamentos" style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:400;padding:10px 0;border-bottom:1px solid rgba(42,33,27,.08)">Tratamentos</a>
      <a href="#dores" style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:400;padding:10px 0;border-bottom:1px solid rgba(42,33,27,.08)">Para quem é</a>
      <a href="#metodo" style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:400;padding:10px 0;border-bottom:1px solid rgba(42,33,27,.08)">Como funciona</a>
      <a href="#faq" style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:400;padding:10px 0;border-bottom:1px solid rgba(42,33,27,.08)">Dúvidas</a>
    </nav>
    <a href="${waLink}" target="_blank" rel="noopener" style="margin-top:auto;display:flex;align-items:center;justify-content:center;gap:10px;background:#2A211B;color:#FBF7F2;font-size:14px;letter-spacing:.14em;text-transform:uppercase;padding:18px;border-radius:100px">Agendar avaliação</a>
  </div>

  <!-- HERO -->
  <section id="topo" style="position:relative;padding:clamp(110px,16vw,150px) clamp(20px,4vw,40px) clamp(48px,7vw,80px)">
    <div style="position:absolute;top:-12%;right:-6%;width:46vw;max-width:620px;height:46vw;max-height:620px;border-radius:50%;background:radial-gradient(circle at 40% 40%,rgba(231,199,164,.45),rgba(231,199,164,0) 70%);pointer-events:none"></div>
    <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:clamp(32px,5vw,68px)">
      <div style="flex:1 1 400px;min-width:300px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:26px">
          <span style="width:30px;height:1px;background:#A86E45"></span>
          <span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Fisioterapia · Terapia da dor</span>
        </div>
        <h1 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(42px,6.4vw,78px);line-height:1.06;letter-spacing:-.01em;color:#2A211B">O cuidado que devolve <em style="font-style:italic;color:#A86E45">leveza</em> ao corpo feminino.</h1>
        <p style="margin-top:30px;max-width:480px;font-size:clamp(15px,1.6vw,17px);line-height:1.7;color:#5B4636;font-weight:300">Liberação miofascial e terapia da dor com técnicas manuais e instrumentais. Um atendimento exclusivo, humano e personalizado — para você voltar a se mover sem dor.</p>
        <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:38px">
          <a href="${waLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:11px;background:#2A211B;color:#FBF7F2;font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:17px 30px;border-radius:100px;box-shadow:0 14px 30px rgba(42,33,27,.18)">${waSvg(17, "#FBF7F2")} Agendar avaliação</a>
          <a href="#tratamentos" style="display:inline-flex;align-items:center;gap:9px;color:#2A211B;font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:17px 26px;border-radius:100px;border:1px solid rgba(42,33,27,.22)">Conhecer tratamentos</a>
        </div>
        <div style="display:flex;align-items:center;gap:18px;margin-top:34px;font-size:12px;letter-spacing:.04em;color:#8A7560">
          <span>CREFITO 278563-F</span>
          <span style="width:4px;height:4px;border-radius:50%;background:#C9B8A4"></span>
          <span>Atendimento 100% feminino</span>
        </div>
      </div>
      <div style="flex:1 1 380px;min-width:300px;position:relative">
        ${slot("rk-hero", "Foto principal da Rafa", "width:100%;height:clamp(420px,62vh,640px);border-top-left-radius:240px;border-top-right-radius:240px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;box-shadow:0 30px 70px rgba(42,33,27,.22)")}
        <div style="position:absolute;bottom:-22px;left:-18px;background:#FBF7F2;border:1px solid rgba(42,33,27,.1);border-radius:18px;padding:14px 18px;box-shadow:0 16px 40px rgba(42,33,27,.12);display:flex;align-items:center;gap:12px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:500;color:#A86E45;line-height:1">+8</span>
          <span style="font-size:11px;line-height:1.4;color:#5B4636">anos cuidando<br>do corpo feminino</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUST STRIP -->
  <section style="background:#2A211B;color:#EFE4D6;padding:clamp(28px,4vw,40px) clamp(20px,4vw,40px)">
    <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px">
      <div style="flex:1 1 200px;display:flex;align-items:center;gap:13px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7905F" stroke-width="1.3"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg><span style="font-size:13.5px;letter-spacing:.02em;line-height:1.4;color:#EFE4D6">Técnicas manuais<br>& instrumentais</span></div>
      <div style="flex:1 1 200px;display:flex;align-items:center;gap:13px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7905F" stroke-width="1.3"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c.6-3.4 3.2-5.5 6.5-5.5S18 16.6 18.5 20"/></svg><span style="font-size:13.5px;letter-spacing:.02em;line-height:1.4;color:#EFE4D6">Atendimento<br>100% feminino</span></div>
      <div style="flex:1 1 200px;display:flex;align-items:center;gap:13px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7905F" stroke-width="1.3"><path d="M4 6h16M4 12h16M4 18h10"/></svg><span style="font-size:13.5px;letter-spacing:.02em;line-height:1.4;color:#EFE4D6">Plano personalizado<br>para cada dor</span></div>
      <div style="flex:1 1 200px;display:flex;align-items:center;gap:13px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7905F" stroke-width="1.3"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg><span style="font-size:13.5px;letter-spacing:.02em;line-height:1.4;color:#EFE4D6">Ambiente acolhedor<br>e reservado</span></div>
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" style="padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:clamp(36px,6vw,80px)">
      <div style="flex:1 1 320px;min-width:280px;position:relative">
        ${slot("rk-sobre", "Retrato da Rafa", "width:100%;height:clamp(380px,55vh,560px);border-radius:20px;box-shadow:0 24px 60px rgba(42,33,27,.16)")}
        <div style="position:absolute;top:-34px;right:-22px;animation:floatSeal 7s ease-in-out infinite">${seal("a", "#8C5732", "#5B3E28")}</div>
      </div>
      <div style="flex:1 1 380px;min-width:300px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
          <span style="width:30px;height:1px;background:#A86E45"></span>
          <span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Sobre</span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5vw,56px);line-height:1.04;color:#2A211B">Prazer,<br><em style="font-style:italic;color:#A86E45">Rafaella Kalena.</em></h2>
        <p style="margin-top:26px;font-size:16px;line-height:1.75;color:#5B4636;font-weight:300">Sou fisioterapeuta especializada no tratamento da dor e na recuperação do corpo feminino. Acredito em um cuidado que vai além da técnica: eu escuto, avalio e crio um plano feito para o seu corpo e a sua rotina.</p>
        <p style="margin-top:18px;font-size:16px;line-height:1.75;color:#5B4636;font-weight:300">Cada sessão é um espaço seguro para você respirar, relaxar e evoluir. Mais do que aliviar a dor, meu propósito é devolver a sua <em style="font-style:italic;color:#2A211B">liberdade de movimento</em>.</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:30px">
          <span style="font-size:12px;letter-spacing:.06em;color:#5B4636;border:1px solid rgba(42,33,27,.16);border-radius:100px;padding:9px 16px">Especialista em dor</span>
          <span style="font-size:12px;letter-spacing:.06em;color:#5B4636;border:1px solid rgba(42,33,27,.16);border-radius:100px;padding:9px 16px">Terapia na gestação</span>
          <span style="font-size:12px;letter-spacing:.06em;color:#5B4636;border:1px solid rgba(42,33,27,.16);border-radius:100px;padding:9px 16px">Liberação miofascial</span>
        </div>
        <div style="margin-top:34px;display:flex;align-items:flex-end;gap:14px">
          <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:38px;color:#2A211B;line-height:.8">Rafaella</span>
          <span style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8A7560;padding-bottom:6px">Fisioterapeuta · CREFITO 278563-F</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TRATAMENTOS -->
  <section id="tratamentos" style="background:#F4ECE2;padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;max-width:640px;margin:0 auto 56px">
        <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:20px"><span style="width:24px;height:1px;background:#A86E45"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Tratamentos</span><span style="width:24px;height:1px;background:#A86E45"></span></div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5vw,56px);line-height:1.05;color:#2A211B">Um cuidado para cada tipo de dor</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px">
        ${SERVICOS.map((s) => `
          <div class="rk-card" style="background:#FBF7F2;border:1px solid rgba(42,33,27,.07);border-radius:20px;padding:34px 30px;display:flex;flex-direction:column;gap:14px">
            <span style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#F0DCC4,#E0BB94);display:flex;align-items:center;justify-content:center">${s.icon}</span>
            <h3 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:25px;color:#2A211B;line-height:1.1;margin-top:6px">${s.title}</h3>
            <p style="font-size:14.5px;line-height:1.65;color:#5B4636;font-weight:300">${s.desc}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- DORES -->
  <section id="dores" style="padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:clamp(36px,6vw,80px)">
      <div style="flex:1 1 380px;min-width:300px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px"><span style="width:30px;height:1px;background:#A86E45"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Para quem é</span></div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(32px,4.6vw,52px);line-height:1.05;color:#2A211B">Esse cuidado é para você que sente…</h2>
        <div style="display:flex;flex-direction:column;margin-top:30px">
          ${DORES.map((d) => `
            <div style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid rgba(42,33,27,.1)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A86E45" stroke-width="1.6"><path d="M5 12l5 5L20 6"/></svg>
              <span style="font-size:16px;color:#3F3228;font-weight:300">${d}</span>
            </div>`).join("")}
        </div>
        <a href="${waLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;margin-top:34px;background:#2A211B;color:#FBF7F2;font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:16px 28px;border-radius:100px">Quero me sentir melhor</a>
      </div>
      <div style="flex:1 1 320px;min-width:280px">
        <div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#F0DCC4,#E0BB94);width:100%;height:clamp(380px,58vh,580px);border-radius:20px;border-bottom-left-radius:160px;border-bottom-right-radius:160px;box-shadow:0 24px 60px rgba(42,33,27,.16)">
          <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:#8C5732;font-size:12px;letter-spacing:.04em">Vídeo de atendimento</span>
          <video src="/demo/rafaella-kalena/rk-dores.mp4" autoplay muted loop playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.display='none'"></video>
        </div>
      </div>
    </div>
  </section>

  <!-- MÉTODO -->
  <section id="metodo" style="background:#2A211B;color:#EFE4D6;padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1140px;margin:0 auto">
      <div style="text-align:center;max-width:620px;margin:0 auto 60px">
        <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:20px"><span style="width:24px;height:1px;background:#C7905F"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#C7905F">Como funciona</span><span style="width:24px;height:1px;background:#C7905F"></span></div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5vw,56px);line-height:1.05;color:#FBF7F2">Do primeiro encontro à sua evolução</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px">
        ${PASSOS.map((p) => `
          <div style="border-top:1px solid rgba(239,228,214,.22);padding-top:24px">
            <span style="font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:300;color:#C7905F;line-height:1">${p.n}</span>
            <h3 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:24px;color:#FBF7F2;margin-top:8px">${p.title}</h3>
            <p style="font-size:14px;line-height:1.65;color:#C9B8A4;font-weight:300;margin-top:10px">${p.desc}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- GALERIA -->
  <section style="padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1200px;margin:0 auto">
      <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:40px">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px"><span style="width:30px;height:1px;background:#A86E45"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">O espaço</span></div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(32px,4.6vw,52px);line-height:1.04;color:#2A211B">Pensado para o seu conforto</h2>
        </div>
        <p style="max-width:340px;font-size:15px;line-height:1.7;color:#5B4636;font-weight:300">Um ambiente reservado, silencioso e acolhedor — feito para você desacelerar desde o momento em que chega.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">
        ${slot("rk-esp-1", "Foto do espaço", "width:100%;height:clamp(300px,40vh,420px);border-radius:18px;grid-row:span 2")}
        ${slot("rk-esp-2", "Foto do espaço", "width:100%;height:clamp(140px,19vh,203px);border-radius:18px")}
        ${slot("rk-esp-3", "Foto do espaço", "width:100%;height:clamp(140px,19vh,203px);border-radius:18px")}
        ${slot("rk-esp-4", "Foto do espaço", "width:100%;height:clamp(140px,19vh,203px);border-radius:18px;grid-column:span 2")}
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section style="background:#F4ECE2;padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:1140px;margin:0 auto">
      <div style="text-align:center;max-width:600px;margin:0 auto 54px">
        <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:20px"><span style="width:24px;height:1px;background:#A86E45"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Depoimentos</span><span style="width:24px;height:1px;background:#A86E45"></span></div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5vw,56px);line-height:1.05;color:#2A211B">Quem cuidou, sentiu a diferença</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px">
        ${DEPOIMENTOS.map((t) => `
          <div style="background:#FBF7F2;border:1px solid rgba(42,33,27,.07);border-radius:20px;padding:34px 30px;display:flex;flex-direction:column;gap:18px">
            <span style="font-family:'Cormorant Garamond',serif;font-size:60px;line-height:.4;color:#E0BB94">“</span>
            <p style="font-size:16.5px;line-height:1.65;color:#3F3228;font-style:italic;font-family:'Cormorant Garamond',serif;font-weight:500">${t.quote}</p>
            <span style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#A86E45;margin-top:auto">${t.name}</span>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" style="padding:clamp(72px,10vw,140px) clamp(20px,4vw,40px)">
    <div style="max-width:820px;margin:0 auto">
      <div style="text-align:center;margin-bottom:50px">
        <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:20px"><span style="width:24px;height:1px;background:#A86E45"></span><span style="font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#A86E45">Dúvidas frequentes</span><span style="width:24px;height:1px;background:#A86E45"></span></div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5vw,56px);line-height:1.05;color:#2A211B">Antes de agendar</h2>
      </div>
      <div style="display:flex;flex-direction:column">
        ${FAQS.map((f, i) => `
          <div class="rk-faq${i === 0 ? " open" : ""}" data-faq style="border-bottom:1px solid rgba(42,33,27,.12)">
            <button class="rk-faq-q" style="width:100%;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 4px;text-align:left">
              <span style="font-family:'Cormorant Garamond',serif;font-size:clamp(20px,2.6vw,26px);font-weight:500;color:#2A211B">${f.q}</span>
              <span class="rk-faq-icon" style="flex-shrink:0;width:34px;height:34px;border-radius:50%;border:1px solid rgba(42,33,27,.2);display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A86E45" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></span>
            </button>
            <div class="rk-faq-panel"><p style="font-size:15.5px;line-height:1.7;color:#5B4636;font-weight:300;padding:0 4px 26px">${f.a}</p></div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section style="padding:0 clamp(20px,4vw,40px) clamp(72px,9vw,120px)">
    <div style="max-width:1140px;margin:0 auto;position:relative;overflow:hidden;background:linear-gradient(135deg,#2A211B 0%,#4A3526 100%);border-radius:32px;padding:clamp(48px,7vw,90px) clamp(28px,5vw,72px);text-align:center">
      <div style="position:absolute;top:-30%;right:-10%;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(199,144,95,.4),transparent 70%);pointer-events:none"></div>
      <div style="position:relative">
        <div style="display:flex;justify-content:center;margin-bottom:28px;animation:floatSeal 7s ease-in-out infinite">${seal("b", "rgba(231,199,164,.55)", "#E7C7A4")}</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,5.5vw,62px);line-height:1.04;color:#FBF7F2;max-width:640px;margin:0 auto">Seu corpo merece se mover <em style="font-style:italic;color:#E0BB94">sem dor</em>.</h2>
        <p style="margin:22px auto 0;max-width:460px;font-size:16px;line-height:1.7;color:#C9B8A4;font-weight:300">Agende sua avaliação e descubra um plano de cuidado feito só para você.</p>
        <a href="${waLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:12px;margin-top:36px;background:#FBF7F2;color:#2A211B;font-size:13.5px;letter-spacing:.12em;text-transform:uppercase;padding:18px 34px;border-radius:100px;box-shadow:0 16px 40px rgba(0,0,0,.3)">${waSvg(18, "#2A211B")} Falar no WhatsApp</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background:#1F1814;color:#C9B8A4;padding:clamp(48px,6vw,72px) clamp(20px,4vw,40px) 36px">
    <div style="max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px">
      <div style="flex:1 1 280px;max-width:340px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ECCBA6 0%,#C7905F 55%,#A1693F 100%);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:21px;color:#3A2A1E">RK</span>
          <span style="display:flex;flex-direction:column;line-height:1.1">
            <span style="font-family:'Cormorant Garamond',serif;font-size:20px;color:#FBF7F2">Rafaella Kalena</span>
            <span style="font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:#A86E45">Fisioterapeuta</span>
          </span>
        </div>
        <p style="margin-top:20px;font-size:14px;line-height:1.7;font-weight:300;color:#A8957F">Fisioterapia, terapia da dor e liberação miofascial para o corpo feminino. Cuidado humano, técnico e personalizado.</p>
      </div>
      <div style="flex:0 1 auto">
        <span style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#7A6855">Navegação</span>
        <div style="display:flex;flex-direction:column;gap:11px;margin-top:18px">
          <a href="#sobre" style="font-size:14.5px;color:#C9B8A4">Sobre</a>
          <a href="#tratamentos" style="font-size:14.5px;color:#C9B8A4">Tratamentos</a>
          <a href="#dores" style="font-size:14.5px;color:#C9B8A4">Para quem é</a>
          <a href="#faq" style="font-size:14.5px;color:#C9B8A4">Dúvidas</a>
        </div>
      </div>
      <div style="flex:0 1 auto">
        <span style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#7A6855">Contato</span>
        <div style="display:flex;flex-direction:column;gap:11px;margin-top:18px">
          <a href="${waLink}" target="_blank" rel="noopener" style="font-size:14.5px;color:#C9B8A4;display:inline-flex;align-items:center;gap:9px">${waSvg(15, "#C7905F")} WhatsApp</a>
          <a href="${instaLink}" target="_blank" rel="noopener" style="font-size:14.5px;color:#C9B8A4;display:inline-flex;align-items:center;gap:9px"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7905F" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#C7905F" stroke="none"/></svg> @rafaellak.fisio</a>
          <span style="font-size:14.5px;color:#C9B8A4">CREFITO 278563-F</span>
        </div>
      </div>
    </div>
    <div style="max-width:1140px;margin:48px auto 0;padding-top:24px;border-top:1px solid rgba(201,184,164,.15);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px">
      <span style="font-size:12px;color:#7A6855">© 2026 Rafaella Kalena · Fisioterapeuta</span>
      <span style="font-size:12px;color:#7A6855">Feito com cuidado.</span>
    </div>
  </footer>

  <a href="${waLink}" target="_blank" rel="noopener" aria-label="WhatsApp" style="position:fixed;bottom:22px;right:22px;z-index:80;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(37,211,102,.45)">${waSvg(30, "#fff")}</a>

</div>`;

const RK_CSS = `
  #rk-root *{box-sizing:border-box}
  #rk-root a{color:inherit;text-decoration:none}
  #rk-root img{display:block;max-width:100%}
  #rk-root ::selection{background:#E7C7A4;color:#2A211B}
  @keyframes floatSeal{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  #rk-root .rk-card{transition:transform .35s ease,box-shadow .35s ease}
  #rk-root .rk-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(42,33,27,.12)}
  #rk-root .rk-faq-q{font-family:inherit}
  #rk-root .rk-faq-panel{overflow:hidden;max-height:0;opacity:0;transition:max-height .35s ease,opacity .25s ease}
  #rk-root .rk-faq.open .rk-faq-panel{max-height:360px;opacity:1}
  #rk-root .rk-faq-icon{transition:transform .3s ease,background .3s ease,border-color .3s ease}
  #rk-root .rk-faq.open .rk-faq-icon{transform:rotate(135deg);border-color:#A86E45;background:#F4ECE2}
  #rk-root #rk-mobilemenu{display:none}
  #rk-root #rk-hamburger{display:none}
  @media(max-width:980px){
    #rk-root #rk-desktopnav{display:none!important}
    #rk-root #rk-hamburger{display:flex!important}
  }
`;

export default function RafaellaKalena() {
  useEffect(() => {
    const root = document.getElementById("rk-root");
    if (!root) return;

    const ham = root.querySelector("#rk-hamburger") as HTMLElement | null;
    const menu = root.querySelector("#rk-mobilemenu") as HTMLElement | null;
    const openMenu = () => {
      if (menu) menu.style.display = "flex";
    };
    const closeMenu = () => {
      if (menu) menu.style.display = "none";
    };
    if (ham) ham.addEventListener("click", openMenu);
    const closers = menu
      ? Array.from(menu.querySelectorAll("a, [data-close]"))
      : [];
    closers.forEach((a) => a.addEventListener("click", closeMenu));

    const faqs = Array.from(root.querySelectorAll<HTMLElement>("[data-faq]"));
    const qs = faqs
      .map((f) => f.querySelector<HTMLElement>(".rk-faq-q"))
      .filter(Boolean) as HTMLElement[];
    const onFaq = (e: Event) => {
      const item = (e.currentTarget as HTMLElement).closest("[data-faq]");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      faqs.forEach((f) => f.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    };
    qs.forEach((q) => q.addEventListener("click", onFaq));

    return () => {
      if (ham) ham.removeEventListener("click", openMenu);
      closers.forEach((a) => a.removeEventListener("click", closeMenu));
      qs.forEach((q) => q.removeEventListener("click", onFaq));
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{RK_CSS}</style>
      <div
        id="rk-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
