"use client";

import { useEffect } from "react";

const WA_NUM = "5569993412188";
const IG = "https://instagram.com/metasun.energiasolar";
const wpp = (txt: string) =>
  `https://wa.me/${WA_NUM}?text=` + encodeURIComponent(txt);
const ctaWpp = wpp("Olá, Meta Sun! Vim pelo site e quero um orçamento de energia solar.");

const waPath = `<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.09c-.25.69-1.43 1.32-1.97 1.4-.5.08-1.14.11-1.84-.11-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5-4.43-.15-.2-1.2-1.59-1.2-3.04s.76-2.16 1.03-2.46c.27-.3.59-.37.79-.37l.57.01c.18.01.43-.07.67.51.25.6.84 2.05.91 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5l-.45.52c-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.13.07.74-.18 1.43Z"/>`;
const waIcon = (s: number, fill: string) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}">${waPath}</svg>`;

const sun = (id: string) =>
  `<svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD24A"/><stop offset="1" stop-color="#F58220"/></linearGradient></defs><circle cx="24" cy="24" r="8.5" fill="url(#${id})"/><g stroke="url(#${id})" stroke-width="3" stroke-linecap="round"><line x1="24" y1="3" x2="24" y2="9"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(45 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(90 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(135 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(180 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(225 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(270 24 24)"/><line x1="24" y1="3" x2="24" y2="9" transform="rotate(315 24 24)"/></g></svg>`;

const wordmark = `<div style="line-height:1"><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:21px;letter-spacing:1px;color:#0C2B5E">META<span style="color:#F58220;font-weight:700;letter-spacing:4px;font-size:14px;margin-left:3px">SUN</span></div><div style="font-size:9px;letter-spacing:4px;color:#8A97AB;font-weight:700;margin-top:3px">ENERGIA SOLAR</div></div>`;

const slot = (id: string, label: string, css: string) =>
  `<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#13386f,#0C2B5E);${css}">
    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;color:#9FB0CC;font-size:13px;font-weight:600">${label}</span>
    <img src="/demo/meta-sun/${id}.jpg" alt="${label}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block" onerror="if(this.dataset.f!=='1'){this.dataset.f='1';this.src='/demo/meta-sun/${id}.png'}else{this.style.display='none'}">
  </div>`;

const arrow = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const trust = (icon: string, txt: string, border: boolean) =>
  `<div style="padding:26px 20px;${border ? "border-right:1px solid #ffffff14;" : ""}display:flex;align-items:center;gap:13px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><span style="font-weight:700;font-size:14.5px">${txt}</span></div>`;

const step = (grad: string, icon: string, n: string, title: string, desc: string) =>
  `<div class="scard" style="background:#fff;border:1px solid #E7ECF4;border-radius:22px;padding:34px 30px;transition:transform .25s;box-shadow:0 18px 40px -30px rgba(12,43,94,.6)">
    <div style="width:62px;height:62px;border-radius:16px;background:${grad};display:flex;align-items:center;justify-content:center;margin-bottom:22px">${icon}</div>
    <div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:15px;color:#F58220;margin-bottom:6px">${n}</div>
    <h3 style="font-family:'Archivo',sans-serif;font-weight:800;font-size:23px;margin:0 0 10px;color:#0C2B5E">${title}</h3>
    <p style="font-size:16px;color:#5A6A82;line-height:1.6;margin:0">${desc}</p>
  </div>`;

const PROJETOS = [
  { slot: "proj-1", tipo: "COMERCIAL", nome: "Pharmapele", local: "Porto Velho - RO", potencia: "52,8 kWp", geracao: "5.544 kWh" },
  { slot: "proj-2", tipo: "COMERCIAL", nome: "Spaço Della's", local: "Porto Velho - RO", potencia: "8,08 kWp", geracao: "8.085 kWh" },
  { slot: "proj-3", tipo: "RESIDENCIAL", nome: "Residência Rio Madeira", local: "Porto Velho - RO", potencia: "9,9 kWp", geracao: "1.380 kWh" },
];

const DEPOIMENTOS = [
  { inicial: "R", nome: "Ricardo M.", cargo: "Empresário — Porto Velho", texto: "Minha conta caiu drasticamente já no primeiro mês. A equipe explicou cada detalhe do projeto antes de instalar. Recomendo demais." },
  { inicial: "A", nome: "Ana Paula", cargo: "Residencial — Porto Velho", texto: "Atendimento de quem é daqui e entende o nosso sol. Instalação rápida e limpa, e a economia veio exatamente como prometido." },
  { inicial: "J", nome: "Jorge L.", cargo: "Comércio — Rondônia", texto: "O diferencial foi o projeto bem pensado e o suporte depois da obra. Hoje pago quase nada de energia no meu estabelecimento." },
];

const stars = Array.from({ length: 5 })
  .map(() => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 17.6 5.8 20.9l1.4-6.9L2 9.3l7-.8z"/></svg>`)
  .join("");

const projetoCard = (p: (typeof PROJETOS)[number]) => `
  <div class="pcard" style="background:#fff;border-radius:22px;overflow:hidden;border:1px solid #E7ECF4;box-shadow:0 18px 40px -30px rgba(12,43,94,.6);transition:transform .25s,box-shadow .25s">
    <div style="position:relative">
      ${slot(p.slot, "Foto da obra", "display:block;width:100%;height:230px")}
      <div style="position:absolute;top:14px;left:14px;background:#F58220;color:#fff;font-weight:800;font-size:12px;letter-spacing:.5px;padding:6px 13px;border-radius:99px">${p.tipo}</div>
    </div>
    <div style="padding:24px 24px 26px">
      <h3 style="font-family:'Archivo',sans-serif;font-weight:800;font-size:22px;margin:0 0 4px;color:#0C2B5E">${p.nome}</h3>
      <div style="display:flex;align-items:center;gap:6px;color:#7B8AA0;font-weight:600;font-size:14px;margin-bottom:18px"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-12a8 8 0 1 0-16 0c0 8 8 12 8 12z"/><circle cx="12" cy="10" r="2.5"/></svg>${p.local}</div>
      <div style="display:flex;gap:10px">
        <div style="flex:1;background:#F6F8FC;border-radius:12px;padding:13px"><div style="font-size:11.5px;color:#7B8AA0;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">Potência</div><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:18px;color:#0C2B5E">${p.potencia}</div></div>
        <div style="flex:1;background:#FFF4E9;border-radius:12px;padding:13px"><div style="font-size:11.5px;color:#C2741E;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">Geração média</div><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:18px;color:#F58220">${p.geracao}</div></div>
      </div>
    </div>
  </div>`;

const depoCard = (d: (typeof DEPOIMENTOS)[number]) => `
  <div style="background:#F6F8FC;border:1px solid #E7ECF4;border-radius:22px;padding:32px;display:flex;flex-direction:column">
    <div style="display:flex;gap:3px;margin-bottom:18px;color:#FFB23E">${stars}</div>
    <p style="font-size:16.5px;line-height:1.65;color:#33415A;font-weight:500;margin:0 0 24px;flex:1">“${d.texto}”</p>
    <div style="display:flex;align-items:center;gap:13px">
      <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#123C7E,#0C2B5E);color:#FFB23E;display:flex;align-items:center;justify-content:center;font-family:'Archivo',sans-serif;font-weight:800;font-size:18px">${d.inicial}</div>
      <div><div style="font-weight:800;font-size:15.5px;color:#0C2B5E">${d.nome}</div><div style="font-size:13.5px;color:#7B8AA0;font-weight:600">${d.cargo}</div></div>
    </div>
  </div>`;

const PAGE_HTML = `
<div style="overflow-x:hidden;font-family:'Manrope',system-ui,sans-serif;color:#0D1B33;background:#fff">

  <!-- NAV -->
  <nav style="position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EAEEF5">
    <div style="max-width:1200px;margin:0 auto;padding:0 24px;height:78px;display:flex;align-items:center;justify-content:space-between;gap:24px">
      <a href="#topo" style="display:flex;align-items:center;gap:12px">${sun("sunNav")}${wordmark}</a>
      <div class="ms-navlinks" style="display:flex;align-items:center;gap:30px;font-weight:600;font-size:15px;color:#33415A">
        <a class="ms-navlink" href="#como" style="transition:color .2s">Como funciona</a>
        <a class="ms-navlink" href="#simulador" style="transition:color .2s">Simulador</a>
        <a class="ms-navlink" href="#bess" style="transition:color .2s">BESS</a>
        <a class="ms-navlink" href="#projetos" style="transition:color .2s">Projetos</a>
        <a class="ms-navlink" href="#sobre" style="transition:color .2s">Sobre</a>
      </div>
      <a href="${ctaWpp}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#F58220;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:99px;box-shadow:0 8px 20px -8px rgba(245,130,32,.7);white-space:nowrap">${waIcon(17, "currentColor")} Orçamento grátis</a>
    </div>
  </nav>

  <!-- HERO -->
  <section id="topo" class="ms-pad" style="position:relative;background:radial-gradient(120% 120% at 80% 0%,#123C7E 0%,#0C2B5E 45%,#081A38 100%);color:#fff;padding:88px 24px 96px;overflow:hidden">
    <div style="position:absolute;inset:0;background-image:linear-gradient(#ffffff10 1px,transparent 1px),linear-gradient(90deg,#ffffff10 1px,transparent 1px);background-size:56px 56px;opacity:.35;mask-image:radial-gradient(80% 80% at 60% 20%,#000,transparent)"></div>
    <div style="position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,#F58220 0%,transparent 65%);opacity:.4;top:-160px;right:-120px;animation:msPulse 6s ease-in-out infinite"></div>
    <div class="ms-grid2" style="position:relative;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:9px;background:#ffffff14;border:1px solid #ffffff2e;padding:8px 16px;border-radius:99px;font-size:13px;font-weight:700;letter-spacing:.4px;margin-bottom:26px">
          <span style="width:8px;height:8px;border-radius:50%;background:#3FD27E;box-shadow:0 0 0 4px #3fd27e33"></span>
          Pioneiros em sistema BESS na Região Norte
        </div>
        <h1 class="ms-h1" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:62px;line-height:1.02;letter-spacing:-1.5px;margin:0 0 22px">Economize até <span style="color:#FFB23E">95%</span> na sua conta de luz com energia solar</h1>
        <p style="font-size:19px;line-height:1.6;color:#C5D2E8;max-width:520px;margin:0 0 34px;font-weight:500">Projetos sob medida para a sua casa ou empresa, com quem realmente entende a <strong style="color:#fff">Região Norte e o Centro-Oeste</strong>. Energia 100% limpa, valorização do imóvel e proteção contra os reajustes.</p>
        <div style="display:flex;flex-wrap:wrap;gap:14px;margin-bottom:42px">
          <a href="#simulador" style="display:inline-flex;align-items:center;gap:9px;background:#F58220;color:#fff;font-weight:800;font-size:16px;padding:17px 28px;border-radius:99px;box-shadow:0 14px 32px -10px rgba(245,130,32,.75)">Simular minha economia ${arrow}</a>
          <a href="${ctaWpp}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:9px;background:#ffffff14;border:1px solid #ffffff33;color:#fff;font-weight:700;font-size:16px;padding:17px 26px;border-radius:99px">${waIcon(18, "currentColor")} Falar no WhatsApp</a>
        </div>
        <div style="display:flex;gap:34px;flex-wrap:wrap">
          <div><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:30px;color:#FFB23E">95%</div><div style="font-size:13px;color:#A9B8D2;font-weight:600">de economia na conta</div></div>
          <div style="width:1px;background:#ffffff22"></div>
          <div><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:30px;color:#fff">+25 anos</div><div style="font-size:13px;color:#A9B8D2;font-weight:600">de geração garantida</div></div>
          <div style="width:1px;background:#ffffff22"></div>
          <div><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:30px;color:#fff">100%</div><div style="font-size:13px;color:#A9B8D2;font-weight:600">energia limpa e renovável</div></div>
        </div>
      </div>
      <div style="position:relative">
        <div style="position:absolute;inset:-14px;border-radius:30px;background:linear-gradient(135deg,#F58220,#FFD24A);opacity:.25;filter:blur(28px)"></div>
        ${slot("hero-foto", "Foto de instalação / painéis", "position:relative;display:block;width:100%;height:440px;border-radius:24px;box-shadow:0 30px 70px -28px rgba(0,0,0,.6)")}
        <div style="position:absolute;left:-22px;bottom:30px;background:#fff;color:#0C2B5E;border-radius:18px;padding:16px 20px;box-shadow:0 20px 44px -18px rgba(0,0,0,.5);display:flex;align-items:center;gap:14px;animation:msFloat 5s ease-in-out infinite">
          <div style="width:46px;height:46px;border-radius:12px;background:#FFF1E2;display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F58220" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg></div>
          <div style="line-height:1.1"><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:22px">R$ 0,00</div><div style="font-size:12px;color:#6B7A92;font-weight:600">é o que você quer pagar de luz</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUST STRIP -->
  <div style="background:#0C2B5E;color:#fff">
    <div class="ms-grid4" style="max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr)">
      ${trust('<path d="M20 6 9 17l-5-5"/>', "Projeto pensado, não só vendido", true)}
      ${trust('<path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3z"/>', "Equipamentos de alta qualidade", true)}
      ${trust('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="2.5"/>', "Time técnico local em Rondônia", true)}
      ${trust('<path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v5h-5"/>', "Proteção contra reajustes", false)}
    </div>
  </div>

  <!-- COMO FUNCIONA -->
  <section id="como" class="ms-pad" style="padding:100px 24px;background:#F6F8FC">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;max-width:680px;margin:0 auto 56px">
        <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#F58220;margin-bottom:14px">COMO FUNCIONA</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:44px;line-height:1.06;letter-spacing:-1px;margin:0 0 16px;color:#0C2B5E">A energia solar, simples assim</h2>
        <p style="font-size:18px;color:#5A6A82;line-height:1.6;margin:0;font-weight:500">Do sol à sua tomada em três passos. Você gera a própria energia e usa a rede como uma “bateria” gratuita.</p>
      </div>
      <div class="ms-grid3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
        ${step("linear-gradient(135deg,#123C7E,#0C2B5E)", '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M3 9h18M3 13h18M9 4v13M15 4v13"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>', "PASSO 01", "Os painéis captam o sol", "As placas instaladas no telhado captam a luz do sol e a transformam em energia elétrica para sua casa ou empresa.")}
        ${step("linear-gradient(135deg,#F58220,#FFC83D)", '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>', "PASSO 02", "Alimenta seus equipamentos", "A energia gerada alimenta diretamente luzes, ar-condicionado, máquinas e tudo que estiver ligado no imóvel.")}
        ${step("linear-gradient(135deg,#123C7E,#0C2B5E)", '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3FD27E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v5h-5"/></svg>', "PASSO 03", "O excesso vira crédito", "A energia que sobra vira crédito na rede, usado à noite e em dias nublados — reduzindo a conta de luz em até 95%.")}
      </div>
    </div>
  </section>

  <!-- SIMULADOR -->
  <section id="simulador" class="ms-pad" style="padding:100px 24px;background:radial-gradient(120% 120% at 10% 0%,#123C7E,#0C2B5E 55%,#081A38);color:#fff">
    <div class="ms-grid2" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center">
      <div>
        <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#FFB23E;margin-bottom:14px">SIMULADOR DE ECONOMIA</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:44px;line-height:1.05;letter-spacing:-1px;margin:0 0 18px">Quanto você pode deixar de pagar?</h2>
        <p style="font-size:18px;color:#C5D2E8;line-height:1.6;margin:0 0 30px;font-weight:500">Arraste para informar o valor médio da sua conta de luz e veja, na hora, o tamanho da sua economia com a Meta Sun.</p>
        <div style="background:#ffffff10;border:1px solid #ffffff26;border-radius:20px;padding:30px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
            <span style="font-weight:700;font-size:15px;color:#C5D2E8">Sua conta de luz por mês</span>
            <span id="ms-conta-fmt" style="font-family:'Archivo',sans-serif;font-weight:800;font-size:30px;color:#FFB23E">R$ 850,00</span>
          </div>
          <input id="ms-range" class="ms-sim" type="range" min="200" max="6000" step="50" value="850" style="margin:14px 0 6px" />
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#8FA0BE;font-weight:600"><span>R$ 200</span><span>R$ 6.000</span></div>
        </div>
      </div>
      <div class="ms-simcard" style="background:#fff;color:#0C2B5E;border-radius:26px;padding:40px;box-shadow:0 40px 90px -36px rgba(0,0,0,.7)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:26px">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F58220" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v5h-5"/></svg>
          <span style="font-family:'Archivo',sans-serif;font-weight:800;font-size:18px">Sua projeção de economia</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
          <div style="background:#F6F8FC;border-radius:16px;padding:20px"><div style="font-size:13px;color:#6B7A92;font-weight:700;margin-bottom:6px">Nova conta estimada</div><div id="ms-nova" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:28px;color:#0C2B5E">R$ 42,50</div></div>
          <div style="background:#FFF4E9;border-radius:16px;padding:20px;border:1px solid #FCD9B6"><div style="font-size:13px;color:#C2741E;font-weight:700;margin-bottom:6px">Economia por mês</div><div id="ms-econ-mes" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:28px;color:#F58220">R$ 807,50</div></div>
        </div>
        <div style="background:linear-gradient(135deg,#0C2B5E,#123C7E);border-radius:18px;padding:24px;color:#fff;margin-bottom:26px">
          <div class="ms-simrow" style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:14px"><span style="font-size:14px;color:#C5D2E8;font-weight:700">Economia em 12 meses</span><span id="ms-econ-ano" style="font-family:'Archivo',sans-serif;font-weight:800;font-size:22px;color:#FFB23E">R$ 9.690,00</span></div>
          <div style="height:1px;background:#ffffff22;margin-bottom:14px"></div>
          <div class="ms-simrow" style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span style="font-size:14px;color:#C5D2E8;font-weight:700">Economia em 25 anos</span><span id="ms-econ-25" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:26px;color:#fff">R$ 242.250,00</span></div>
        </div>
        <a id="ms-cta-simular" href="${ctaWpp}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#25D366;color:#fff;font-weight:800;font-size:16px;padding:17px;border-radius:14px;width:100%;box-shadow:0 14px 30px -12px rgba(37,211,102,.7)">${waIcon(20, "currentColor")} Quero esse resultado — pedir orçamento</a>
        <p style="text-align:center;font-size:12.5px;color:#9AA7BC;margin:14px 0 0">*Estimativa ilustrativa. A economia final depende do projeto e do seu consumo.</p>
      </div>
    </div>
  </section>

  <!-- BESS -->
  <section id="bess" class="ms-pad" style="padding:100px 24px;background:#081A38;color:#fff;position:relative;overflow:hidden">
    <div style="position:absolute;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,#F58220,transparent 65%);opacity:.22;bottom:-200px;left:-120px"></div>
    <div class="ms-grid2" style="position:relative;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:#F5822022;border:1px solid #F5822055;color:#FFB23E;font-weight:800;letter-spacing:1.5px;font-size:12px;padding:7px 14px;border-radius:99px;margin-bottom:20px">TECNOLOGIA BESS</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:44px;line-height:1.05;letter-spacing:-1px;margin:0 0 18px">Armazene energia e nunca fique no escuro</h2>
        <p style="font-size:18px;color:#B9C7E0;line-height:1.65;margin:0 0 28px;font-weight:500">O <strong style="color:#fff">BESS (Battery Energy Storage System)</strong> guarda a energia gerada durante o dia para você usar à noite, em quedas de energia ou nos horários mais caros. A Meta Sun é <strong style="color:#FFB23E">pioneira nesse sistema na Região Norte</strong>.</p>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;gap:14px;align-items:flex-start"><div style="flex-shrink:0;width:36px;height:36px;border-radius:10px;background:#F5822022;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg></div><div><div style="font-weight:800;font-size:16.5px">Energia mesmo na falta de luz</div><div style="font-size:15px;color:#9FB0CC">Continue operando casa e negócio durante apagões.</div></div></div>
          <div style="display:flex;gap:14px;align-items:flex-start"><div style="flex-shrink:0;width:36px;height:36px;border-radius:10px;background:#F5822022;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M5 9l7-7 7 7"/></svg></div><div><div style="font-weight:800;font-size:16.5px">Mais autonomia e independência</div><div style="font-size:15px;color:#9FB0CC">Use sua própria energia nos horários de pico.</div></div></div>
          <div style="display:flex;gap:14px;align-items:flex-start"><div style="flex-shrink:0;width:36px;height:36px;border-radius:10px;background:#F5822022;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><div><div style="font-weight:800;font-size:16.5px">Pronto para o futuro da energia</div><div style="font-size:15px;color:#9FB0CC">Tecnologia que coloca Rondônia na frente.</div></div></div>
        </div>
      </div>
      <div style="position:relative">
        <div style="position:absolute;inset:-10px;border-radius:26px;background:linear-gradient(135deg,#F58220,#FFD24A);opacity:.22;filter:blur(26px)"></div>
        ${slot("bess-foto", "Foto do sistema BESS / baterias", "position:relative;display:block;width:100%;height:420px;border-radius:22px;box-shadow:0 30px 70px -28px rgba(0,0,0,.7)")}
      </div>
    </div>
  </section>

  <!-- DIFERENCIAIS -->
  <section class="ms-pad" style="padding:100px 24px;background:#fff">
    <div style="max-width:1200px;margin:0 auto">
      <div class="ms-grid2" style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
        <div>
          <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#F58220;margin-bottom:14px">FEITO PARA O NORTE E O CENTRO-OESTE</div>
          <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:42px;line-height:1.06;letter-spacing:-1px;margin:0 0 18px;color:#0C2B5E">Quem entende o nosso clima projeta melhor</h2>
          <p style="font-size:18px;color:#5A6A82;line-height:1.65;margin:0 0 26px;font-weight:500">Sol forte, calor intenso e chuvas de verão. A Meta Sun dimensiona cada projeto para a realidade da Região Norte e do Centro-Oeste — para você gerar o máximo o ano inteiro.</p>
          <div class="ms-grid2" style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div style="background:#F6F8FC;border-radius:14px;padding:18px;border:1px solid #E7ECF4"><div style="font-family:'Archivo',sans-serif;font-weight:900;font-size:24px;color:#0C2B5E">Porto Velho</div><div style="font-size:14px;color:#5A6A82;font-weight:600">Base e equipe local — RO</div></div>
            <div style="background:#F6F8FC;border-radius:14px;padding:18px;border:1px solid #E7ECF4"><div style="font-family:'Archivo',sans-serif;font-weight:900;font-size:24px;color:#0C2B5E">Sob medida</div><div style="font-size:14px;color:#5A6A82;font-weight:600">Residencial, comercial e rural</div></div>
          </div>
        </div>
        <div style="position:relative;background:radial-gradient(120% 120% at 70% 10%,#123C7E,#0C2B5E);border-radius:26px;padding:44px;color:#fff;overflow:hidden;min-height:340px;display:flex;flex-direction:column;justify-content:center">
          <div style="position:absolute;inset:0;background-image:linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px);background-size:40px 40px;opacity:.5"></div>
          <div style="position:relative;display:flex;align-items:center;gap:14px;margin-bottom:24px"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span style="font-family:'Archivo',sans-serif;font-weight:800;font-size:22px">Atendimento de quem está aqui</span></div>
          <div style="position:relative;display:flex;flex-direction:column;gap:18px">
            <div style="display:flex;gap:12px;align-items:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FD27E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:16.5px;color:#DCE6F5;font-weight:600">Visita técnica e análise da sua conta</span></div>
            <div style="display:flex;gap:12px;align-items:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FD27E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:16.5px;color:#DCE6F5;font-weight:600">Homologação junto à concessionária</span></div>
            <div style="display:flex;gap:12px;align-items:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FD27E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:16.5px;color:#DCE6F5;font-weight:600">Instalação e suporte pós-obra</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROJETOS -->
  <section id="projetos" class="ms-pad" style="padding:100px 24px;background:#F6F8FC">
    <div style="max-width:1200px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:48px">
        <div style="max-width:600px">
          <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#F58220;margin-bottom:14px">PROJETOS ENTREGUES</div>
          <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:44px;line-height:1.06;letter-spacing:-1px;margin:0;color:#0C2B5E">Obras reais, economia real</h2>
        </div>
        <a href="${ctaWpp}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;color:#0C2B5E;font-weight:800;font-size:15px;border:2px solid #0C2B5E;padding:13px 22px;border-radius:99px">Quero meu projeto <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </div>
      <div class="ms-grid3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">${PROJETOS.map(projetoCard).join("")}</div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="ms-pad" style="padding:100px 24px;background:#fff">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;max-width:640px;margin:0 auto 52px">
        <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#F58220;margin-bottom:14px">QUEM JÁ ECONOMIZA</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:44px;line-height:1.06;letter-spacing:-1px;margin:0;color:#0C2B5E">A confiança de quem trocou a conta cara pelo sol</h2>
      </div>
      <div class="ms-grid3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">${DEPOIMENTOS.map(depoCard).join("")}</div>
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" class="ms-pad" style="padding:100px 24px;background:#0C2B5E;color:#fff">
    <div class="ms-grid2" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center">
      <div style="position:relative">
        <div style="position:absolute;inset:-10px;border-radius:26px;background:linear-gradient(135deg,#F58220,#FFD24A);opacity:.2;filter:blur(24px)"></div>
        ${slot("sobre-foto", "Foto da equipe / escritório", "position:relative;display:block;width:100%;height:420px;border-radius:22px;box-shadow:0 30px 70px -28px rgba(0,0,0,.7)")}
      </div>
      <div>
        <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#FFB23E;margin-bottom:14px">SOBRE A META SUN</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:42px;line-height:1.07;letter-spacing:-1px;margin:0 0 18px">Gerando economia e sustentabilidade na Amazônia</h2>
        <p style="font-size:18px;color:#C5D2E8;line-height:1.65;margin:0 0 22px;font-weight:500">A Meta Sun Energia Solar nasceu para democratizar o acesso à energia limpa na Região Norte e no Centro-Oeste. Mais do que vender placas, entregamos <strong style="color:#fff">projetos pensados</strong>, dimensionados para o seu consumo e para o nosso clima.</p>
        <p style="font-size:18px;color:#C5D2E8;line-height:1.65;margin:0 0 30px;font-weight:500">Somos <strong style="color:#FFB23E">pioneiros em sistema BESS na Região Norte</strong>, com time técnico local em Porto Velho e atendimento próximo do começo ao fim da obra.</p>
        <div style="display:flex;gap:36px;flex-wrap:wrap">
          <div><div style="font-family:'Archivo',sans-serif;font-weight:900;font-size:34px;color:#FFB23E">100%</div><div style="font-size:14px;color:#A9B8D2;font-weight:600">foco em energia limpa</div></div>
          <div><div style="font-family:'Archivo',sans-serif;font-weight:900;font-size:34px;color:#fff">Local</div><div style="font-size:14px;color:#A9B8D2;font-weight:600">equipe em Rondônia</div></div>
          <div><div style="font-family:'Archivo',sans-serif;font-weight:900;font-size:34px;color:#fff">Pioneira</div><div style="font-size:14px;color:#A9B8D2;font-weight:600">em BESS no Norte</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section id="contato" class="ms-pad" style="padding:100px 24px;background:#F6F8FC">
    <div class="ms-grid2" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center">
      <div>
        <div style="font-weight:800;letter-spacing:2px;font-size:13px;color:#F58220;margin-bottom:14px">PEÇA SEU ORÇAMENTO</div>
        <h2 class="ms-h2" style="font-family:'Archivo',sans-serif;font-weight:900;font-size:42px;line-height:1.06;letter-spacing:-1px;margin:0 0 18px;color:#0C2B5E">Comece a economizar ainda este mês</h2>
        <p style="font-size:18px;color:#5A6A82;line-height:1.65;margin:0 0 28px;font-weight:500">Preencha os dados e fale direto com um consultor da Meta Sun pelo WhatsApp. Análise da sua conta sem compromisso.</p>
        <div style="display:flex;flex-direction:column;gap:16px">
          <a href="https://wa.me/${WA_NUM}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #E7ECF4;border-radius:14px;padding:16px 18px">
            <div style="width:44px;height:44px;border-radius:12px;background:#25D36618;display:flex;align-items:center;justify-content:center">${waIcon(22, "#25D366")}</div>
            <div><div style="font-size:13px;color:#7B8AA0;font-weight:700">WhatsApp</div><div style="font-weight:800;font-size:17px;color:#0C2B5E">(69) 9.9341-2188</div></div>
          </a>
          <div style="display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #E7ECF4;border-radius:14px;padding:16px 18px">
            <div style="width:44px;height:44px;border-radius:12px;background:#F5822018;display:flex;align-items:center;justify-content:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F58220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-12a8 8 0 1 0-16 0c0 8 8 12 8 12z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
            <div><div style="font-size:13px;color:#7B8AA0;font-weight:700">Endereço</div><div style="font-weight:700;font-size:15px;color:#0C2B5E;line-height:1.4">Av. Eng. Anysio da Rocha Compasso, 5055 — Rio Madeira, Porto Velho - RO</div></div>
          </div>
        </div>
      </div>
      <form id="ms-form" style="background:#fff;border:1px solid #E7ECF4;border-radius:24px;padding:34px;box-shadow:0 30px 70px -40px rgba(12,43,94,.6)">
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <label style="display:block;font-weight:700;font-size:13.5px;color:#33415A;margin-bottom:7px">Nome completo</label>
            <input id="ms-nome" class="ms-field" type="text" placeholder="Seu nome" style="width:100%;padding:13px 15px;border:1.5px solid #E1E7F0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;transition:.2s" />
          </div>
          <div style="display:flex;gap:14px">
            <div style="flex:1"><label style="display:block;font-weight:700;font-size:13.5px;color:#33415A;margin-bottom:7px">WhatsApp</label><input id="ms-tel" class="ms-field" type="tel" placeholder="(69) 90000-0000" style="width:100%;padding:13px 15px;border:1.5px solid #E1E7F0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;transition:.2s" /></div>
            <div style="flex:1"><label style="display:block;font-weight:700;font-size:13.5px;color:#33415A;margin-bottom:7px">Cidade</label><input id="ms-cidade" class="ms-field" type="text" placeholder="Porto Velho" style="width:100%;padding:13px 15px;border:1.5px solid #E1E7F0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;transition:.2s" /></div>
          </div>
          <div>
            <label style="display:block;font-weight:700;font-size:13.5px;color:#33415A;margin-bottom:7px">Tipo de imóvel</label>
            <select id="ms-tipo" class="ms-field" style="width:100%;padding:13px 15px;border:1.5px solid #E1E7F0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;transition:.2s;background:#fff;color:#0C2B5E"><option>Residencial</option><option>Comercial</option><option>Rural</option><option>Industrial</option></select>
          </div>
          <div>
            <label style="display:block;font-weight:700;font-size:13.5px;color:#33415A;margin-bottom:7px">Valor médio da conta de luz</label>
            <input id="ms-fconta" class="ms-field" type="text" placeholder="Ex: R$ 850" style="width:100%;padding:13px 15px;border:1.5px solid #E1E7F0;border-radius:12px;font-size:15px;font-family:inherit;outline:none;transition:.2s" />
          </div>
          <button type="submit" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#25D366;color:#fff;font-weight:800;font-size:16px;padding:16px;border:none;border-radius:13px;cursor:pointer;box-shadow:0 14px 30px -12px rgba(37,211,102,.7);font-family:inherit">${waIcon(20, "currentColor")} Enviar pelo WhatsApp</button>
          <p style="text-align:center;font-size:12.5px;color:#9AA7BC;margin:0">Resposta rápida em horário comercial.</p>
        </div>
      </form>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background:#081A38;color:#fff;padding:64px 24px 32px">
    <div style="max-width:1200px;margin:0 auto">
      <div class="ms-grid3" style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px;padding-bottom:44px;border-bottom:1px solid #ffffff1a">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">${sun("sunFoot")}<div style="line-height:1"><div style="font-family:'Archivo',sans-serif;font-weight:800;font-size:21px;letter-spacing:1px;color:#fff">META<span style="color:#F58220;font-weight:700;letter-spacing:4px;font-size:14px;margin-left:3px">SUN</span></div><div style="font-size:9px;letter-spacing:4px;color:#8FA0BE;font-weight:700;margin-top:3px">ENERGIA SOLAR</div></div></div>
          <p style="font-size:15px;color:#9FB0CC;line-height:1.6;max-width:340px;margin:0">Gerando economia e sustentabilidade na Região Norte e Centro-Oeste. Pioneiros em sistema BESS.</p>
        </div>
        <div>
          <div style="font-weight:800;font-size:14px;margin-bottom:18px;color:#fff">Navegação</div>
          <div style="display:flex;flex-direction:column;gap:12px;font-size:15px;color:#9FB0CC;font-weight:600">
            <a class="ms-navlink" href="#como" style="transition:color .2s">Como funciona</a>
            <a class="ms-navlink" href="#simulador" style="transition:color .2s">Simulador de economia</a>
            <a class="ms-navlink" href="#bess" style="transition:color .2s">Tecnologia BESS</a>
            <a class="ms-navlink" href="#projetos" style="transition:color .2s">Projetos</a>
            <a class="ms-navlink" href="#sobre" style="transition:color .2s">Sobre nós</a>
          </div>
        </div>
        <div>
          <div style="font-weight:800;font-size:14px;margin-bottom:18px;color:#fff">Contato</div>
          <div style="display:flex;flex-direction:column;gap:14px;font-size:15px;color:#9FB0CC;font-weight:600">
            <a href="https://wa.me/${WA_NUM}" target="_blank" rel="noopener" style="display:flex;gap:9px;align-items:center">${waIcon(17, "#25D366")}(69) 9.9341-2188</a>
            <a href="${IG}" target="_blank" rel="noopener" style="display:flex;gap:9px;align-items:center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1.2" fill="#FFB23E" stroke="none"/></svg>@metasun.energiasolar</a>
            <div style="display:flex;gap:9px;align-items:flex-start;line-height:1.5"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFB23E" stroke-width="2" style="flex-shrink:0;margin-top:2px"><path d="M12 22s8-4 8-12a8 8 0 1 0-16 0c0 8 8 12 8 12z"/><circle cx="12" cy="10" r="2.5"/></svg>Av. Eng. Anysio da Rocha Compasso, 5055, Rio Madeira — Porto Velho/RO</div>
          </div>
        </div>
      </div>
      <div style="padding-top:26px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13.5px;color:#7587A6;font-weight:600">
        <span>© 2026 Meta Sun Energia Solar. Todos os direitos reservados.</span>
        <span>Energia limpa para o Norte e o Centro-Oeste ☀</span>
      </div>
    </div>
  </footer>

  <a href="${ctaWpp}" target="_blank" rel="noopener" aria-label="WhatsApp" style="position:fixed;right:22px;bottom:22px;z-index:60;width:60px;height:60px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px -8px rgba(37,211,102,.8)">${waIcon(32, "#fff")}</a>

</div>`;

const MS_CSS = `
  #ms-root *{box-sizing:border-box}
  #ms-root a{text-decoration:none;color:inherit}
  #ms-root img{display:block;max-width:100%}
  #ms-root ::selection{background:#F58220;color:#fff}
  #ms-root section{scroll-margin-top:92px}
  #ms-root input[type=range].ms-sim{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:99px;outline:none;cursor:pointer;background:linear-gradient(90deg,#F58220 0%,#FFB23E 11%,#ffffff33 11%,#ffffff33 100%)}
  #ms-root input[type=range].ms-sim::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:28px;height:28px;border-radius:50%;background:#F58220;border:5px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.35);cursor:pointer}
  #ms-root input[type=range].ms-sim::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:#F58220;border:5px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.35);cursor:pointer}
  #ms-root .ms-field:focus{border-color:#F58220 !important;box-shadow:0 0 0 4px rgba(245,130,32,.15) !important}
  #ms-root .ms-navlink:hover{color:#F58220 !important}
  #ms-root .pcard:hover{transform:translateY(-6px);box-shadow:0 26px 60px -24px rgba(8,26,56,.55) !important}
  #ms-root .scard:hover{transform:translateY(-5px)}
  @keyframes msFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes msPulse{0%,100%{opacity:.5}50%{opacity:1}}
  @media (max-width:900px){
    #ms-root .ms-navlinks{display:none !important}
    #ms-root .ms-grid2{grid-template-columns:1fr !important}
    #ms-root .ms-grid3{grid-template-columns:1fr !important}
    #ms-root .ms-grid4{grid-template-columns:1fr 1fr !important}
    #ms-root .ms-h1{font-size:46px !important}
    #ms-root .ms-h2{font-size:34px !important}
    #ms-root .ms-pad{padding:64px 20px !important}
    #ms-root .ms-simcard{padding:24px !important}
    #ms-root .ms-simrow{flex-wrap:wrap}
    #ms-root .ms-simrow span:last-child{font-size:22px !important}
  }
`;

export default function MetaSun() {
  useEffect(() => {
    const root = document.getElementById("ms-root");
    if (!root) return;

    const fmt = (n: number) =>
      Number(n).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    const range = root.querySelector("#ms-range") as HTMLInputElement | null;
    const elContaFmt = root.querySelector("#ms-conta-fmt");
    const elNova = root.querySelector("#ms-nova");
    const elMes = root.querySelector("#ms-econ-mes");
    const elAno = root.querySelector("#ms-econ-ano");
    const el25 = root.querySelector("#ms-econ-25");
    const ctaSim = root.querySelector("#ms-cta-simular") as HTMLAnchorElement | null;

    const updateSim = (conta: number) => {
      const economiaMensal = Math.round(conta * 0.95);
      const novaConta = conta - economiaMensal;
      const economiaAnual = economiaMensal * 12;
      const em25 = economiaAnual * 25;
      const pct = Math.round(((conta - 200) / (6000 - 200)) * 100);
      if (elContaFmt) elContaFmt.textContent = fmt(conta);
      if (elNova) elNova.textContent = fmt(novaConta);
      if (elMes) elMes.textContent = fmt(economiaMensal);
      if (elAno) elAno.textContent = fmt(economiaAnual);
      if (el25) el25.textContent = fmt(em25);
      if (range)
        range.style.background = `linear-gradient(90deg,#F58220 0%,#FFB23E ${pct}%,#ffffff33 ${pct}%,#ffffff33 100%)`;
      if (ctaSim)
        ctaSim.href = wpp(
          `Olá, Meta Sun! Vim pelo site. Minha conta de luz é cerca de ${fmt(conta)}/mês e quero simular minha economia com energia solar.`
        );
    };
    const onRange = () => updateSim(Number(range?.value || 850));
    if (range) range.addEventListener("input", onRange);
    updateSim(Number(range?.value || 850));

    const form = root.querySelector("#ms-form") as HTMLFormElement | null;
    const val = (id: string) =>
      (root.querySelector(id) as HTMLInputElement | null)?.value.trim() || "";
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const linhas = [
        "Olá, Meta Sun! Quero um orçamento de energia solar. ☀",
        val("#ms-nome") && `Nome: ${val("#ms-nome")}`,
        val("#ms-tel") && `WhatsApp: ${val("#ms-tel")}`,
        val("#ms-cidade") && `Cidade: ${val("#ms-cidade")}`,
        `Tipo de imóvel: ${val("#ms-tipo") || "Residencial"}`,
        val("#ms-fconta") && `Conta de luz média: ${val("#ms-fconta")}`,
      ].filter(Boolean) as string[];
      window.open(wpp(linhas.join("\n")), "_blank");
    };
    if (form) form.addEventListener("submit", onSubmit);

    return () => {
      if (range) range.removeEventListener("input", onRange);
      if (form) form.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{MS_CSS}</style>
      <div
        id="ms-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
