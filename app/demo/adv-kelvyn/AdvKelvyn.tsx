"use client";

import { useEffect } from "react";

const WA =
  "https://wa.me/5569999200176?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site e quero um diagnóstico do meu FIES."
  );

const servicos = [
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 8l7-4 7 4M5 8v8l7 4 7-4V8"/></svg>`,
    title: "Abatimento do FIES",
    desc: "Análise para reduzir de forma significativa o valor da sua dívida do FIES com base nas suas condições reais.",
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>`,
    title: "Renegociação de dívida",
    desc: "Condições de pagamento viáveis, com prazos e valores que cabem na realidade de quem está começando a carreira.",
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>`,
    title: "Suspensão de cobranças",
    desc: "Contestação de cobranças indevidas, juros abusivos e negativações que não deveriam existir.",
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/></svg>`,
    title: "Revisão de contrato",
    desc: "Leitura técnica do seu contrato para encontrar cláusulas questionáveis e oportunidades de revisão.",
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 21V9l6-4 6 4v12"/><path d="M10 21v-6h4v6"/></svg>`,
    title: "Defesa em execução",
    desc: "Atuação quando a dívida já virou processo judicial, protegendo seu patrimônio e sua tranquilidade.",
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
    title: "Consultoria dedicada",
    desc: "Orientação contínua e humanizada, para você entender cada passo sem juridiquês.",
  },
];

const passos = [
  { num: "01", title: "Diagnóstico gratuito", desc: "Você conta sua situação no WhatsApp e recebemos os dados da sua dívida sem custo algum." },
  { num: "02", title: "Análise do contrato", desc: "Estudamos o seu contrato do FIES em detalhe para mapear as melhores oportunidades jurídicas." },
  { num: "03", title: "Estratégia jurídica", desc: "Definimos juntos o caminho — abatimento, renegociação ou defesa — com total transparência." },
  { num: "04", title: "Redução e alívio", desc: "Conduzimos o processo até a redução ou quitação, mantendo você informado do começo ao fim." },
];

const stats = [
  { value: "+300", label: "médicos já orientados sobre o FIES" },
  { value: "até 99%", label: "de redução possível em casos elegíveis" },
  { value: "24h", label: "tempo médio de primeira resposta" },
  { value: "100%", label: "atendimento remoto e humanizado" },
];

const depoimentos = [
  { quote: "Eu achava que ia carregar essa dívida do FIES a vida inteira. O Kelvyn explicou tudo com calma e hoje respiro aliviado.", name: "Dra. Marina A.", role: "Médica — SP", initial: "M" },
  { quote: "Atendimento direto, sem enrolação e sem juridiquês. Senti que estavam cuidando do meu caso de verdade.", name: "Dr. Renato F.", role: "Médico — RO", initial: "R" },
  { quote: "A recém-formada aqui estava desesperada com os boletos. Consegui uma condição que finalmente cabe no meu bolso.", name: "Dra. Camila S.", role: "Médica — MG", initial: "C" },
];

const reels = [
  { caption: "Você pode pagar apenas 1% da sua dívida do FIES?" },
  { caption: "Tem como abater o FIES? Tem sim." },
  { caption: "O erro que faz o médico pagar caro demais" },
];

const faqs = [
  { q: "É possível realmente reduzir a dívida do FIES?", a: "Em muitos casos, sim. Dependendo das condições do seu contrato e da sua situação, existem caminhos jurídicos para abatimento, renegociação e contestação de valores indevidos. O primeiro passo é o diagnóstico gratuito." },
  { q: "Preciso morar em Porto Velho para ser atendido?", a: "Não. O atendimento é 100% remoto e feito em todo o Brasil. Tudo pode ser resolvido por WhatsApp, e-mail e videochamada, sem que você precise sair da sua rotina." },
  { q: "Quanto custa o diagnóstico inicial?", a: "O diagnóstico do seu caso é gratuito e sem compromisso. Você só decide seguir depois de entender exatamente o que pode ser feito." },
  { q: "Quanto tempo leva para resolver?", a: "Depende da complexidade do seu caso, mas você acompanha cada etapa com transparência. Damos a primeira resposta em até 24h e mantemos você informado durante todo o processo." },
  { q: "Atende apenas médicos?", a: "O foco principal é o FIES de médicos, por ser a área de maior especialização. Se você é de outra área da saúde, fale com a gente — avaliamos seu caso individualmente." },
];

const servicosHtml = servicos
  .map(
    (s) => `
    <div class="ak-svc" data-reveal style="background:#131519;border:1px solid rgba(242,239,233,.08);border-radius:14px;padding:30px 28px;transition:border-color .25s ease,transform .25s ease">
      <div style="width:46px;height:46px;border-radius:11px;background:rgba(201,168,106,.12);border:1px solid rgba(201,168,106,.3);display:flex;align-items:center;justify-content:center;color:#c9a86a;margin-bottom:22px">${s.icon}</div>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:23px;font-weight:600;margin:0 0 10px;color:#f2efe9">${s.title}</h3>
      <p style="font-size:14px;line-height:1.65;color:#a5a29a;font-weight:300;margin:0">${s.desc}</p>
    </div>`
  )
  .join("");

const passosHtml = passos
  .map(
    (p) => `
    <div data-reveal style="position:relative;padding-top:30px">
      <div style="font-family:'Cormorant Garamond',serif;font-size:60px;font-weight:600;color:rgba(201,168,106,.28);line-height:.8">${p.num}</div>
      <div style="width:100%;height:1px;background:rgba(201,168,106,.22);margin-top:20px;margin-bottom:22px;position:relative">
        <span style="position:absolute;left:0;top:-3px;width:7px;height:7px;border-radius:50%;background:#c9a86a"></span>
      </div>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin:0 0 10px;color:#f2efe9">${p.title}</h3>
      <p style="font-size:14px;line-height:1.65;color:#a5a29a;font-weight:300;margin:0">${p.desc}</p>
    </div>`
  )
  .join("");

const statsHtml = stats
  .map(
    (st, i) => `
    <div style="background:#0f1116;padding:44px 24px;text-align:center;${i < stats.length - 1 ? 'border-right:1px solid rgba(201,168,106,.15);' : ''}" class="ak-stat">
      <div style="font-family:'Cormorant Garamond',serif;font-size:clamp(40px,5vw,60px);font-weight:600;color:#c9a86a;line-height:1">${st.value}</div>
      <div style="font-size:13px;color:#a5a29a;margin-top:10px;line-height:1.4">${st.label}</div>
    </div>`
  )
  .join("");

const depoimentosHtml = depoimentos
  .map(
    (d) => `
    <div data-reveal style="background:#131519;border:1px solid rgba(242,239,233,.08);border-radius:16px;padding:32px 30px;display:flex;flex-direction:column;gap:20px">
      <div style="font-family:'Cormorant Garamond',serif;font-size:44px;line-height:.4;color:#c9a86a;height:24px">&ldquo;</div>
      <p style="font-size:15px;line-height:1.7;color:#d8d5cd;font-weight:300;margin:0;flex:1">${d.quote}</p>
      <div style="display:flex;align-items:center;gap:13px;padding-top:6px">
        <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#c9a86a,#8a6f3d);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:600;color:#0c0d10;font-size:17px">${d.initial}</div>
        <div>
          <div style="font-size:14px;font-weight:600;color:#f2efe9">${d.name}</div>
          <div style="font-size:12px;color:#9a978f">${d.role}</div>
        </div>
      </div>
    </div>`
  )
  .join("");

const reelsHtml = reels
  .map(
    (r) => `
    <a href="https://instagram.com/kelvynlebkuchen" target="_blank" rel="noopener" style="position:relative;display:block;aspect-ratio:9/13;border-radius:14px;overflow:hidden;border:1px solid rgba(242,239,233,.1);text-decoration:none" class="ak-reel">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,transparent,rgba(12,13,16,.85))"></div>
      <div style="position:absolute;inset:0;background:#131519;display:flex;align-items:center;justify-content:center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#c9a86a" style="opacity:.4"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div style="position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;background:rgba(12,13,16,.55);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;pointer-events:none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div style="position:absolute;left:16px;right:16px;bottom:16px;pointer-events:none">
        <div style="font-size:14px;font-weight:600;color:#fff;line-height:1.3">${r.caption}</div>
      </div>
    </a>`
  )
  .join("");

const faqsHtml = faqs
  .map(
    (f) => `
    <details style="background:#131519;border:1px solid rgba(242,239,233,.08);border-radius:12px;overflow:hidden">
      <summary style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 26px;font-size:16px;font-weight:600;color:#f2efe9;cursor:pointer;list-style:none">
        ${f.q}
        <span style="flex:none;width:26px;height:26px;border:1px solid rgba(201,168,106,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c9a86a;font-size:18px;font-weight:400;transition:transform .2s ease">+</span>
      </summary>
      <div style="padding:0 26px 24px;font-size:15px;line-height:1.7;color:#a5a29a;font-weight:300">
        ${f.a}
      </div>
    </details>`
  )
  .join("");

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow:hidden;background:#0c0d10;color:#f2efe9;font-family:'Manrope',sans-serif;min-height:100vh">

  <header id="ak-header" style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:18px clamp(20px,5vw,64px);background:rgba(12,13,16,.72);backdrop-filter:blur(14px);border-bottom:1px solid rgba(201,168,106,.14)">
    <a href="#topo" style="text-decoration:none;display:flex;align-items:center;gap:12px">
      <span style="width:34px;height:34px;border:1px solid rgba(201,168,106,.55);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;color:#c9a86a">KL</span>
      <span style="line-height:1.1">
        <span style="display:block;font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;letter-spacing:.02em;color:#f2efe9">Kelvyn Lebkuchen</span>
        <span style="display:block;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#8f8c84">Advogado</span>
      </span>
    </a>
    <div style="display:flex;align-items:center;gap:34px">
      <div id="ak-navlinks" style="display:flex;align-items:center;gap:30px;font-size:14px;color:#c4c1b9">
        <a href="#sobre" style="text-decoration:none;color:#c4c1b9;transition:color .2s">Sobre</a>
        <a href="#servicos" style="text-decoration:none;color:#c4c1b9;transition:color .2s">Atuação</a>
        <a href="#processo" style="text-decoration:none;color:#c4c1b9;transition:color .2s">Como funciona</a>
        <a href="#resultados" style="text-decoration:none;color:#c4c1b9;transition:color .2s">Resultados</a>
        <a href="#faq" style="text-decoration:none;color:#c4c1b9;transition:color .2s">Dúvidas</a>
      </div>
      <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:#c9a86a;color:#0c0d10;border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.01em;transition:background .2s,transform .2s">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>
        WhatsApp
      </a>
    </div>
  </header>

  <section id="topo" style="position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0;background-image:url('/demo/adv-kelvyn/kelvyn-hero-bg.png');background-size:cover;background-position:right 22%"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(12,13,16,.98) 0%,rgba(12,13,16,.96) 50%,rgba(12,13,16,.55) 100%)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,13,16,.96) 0%,rgba(12,13,16,.35) 42%,rgba(12,13,16,.96) 100%)"></div>
    <div style="position:relative;z-index:2;padding:0 clamp(20px,5vw,64px) clamp(56px,9vh,110px);max-width:1320px;width:100%;margin:0 auto">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:26px">
        <span style="width:34px;height:1px;background:#c9a86a"></span>
        <span style="font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#c9a86a">Advocacia especializada &bull; FIES Médicos</span>
      </div>
      <h1 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(38px,6.4vw,88px);line-height:.98;letter-spacing:-.01em;margin:0;max-width:15ch">
        <span style="font-style:italic;font-weight:400;font-size:.44em;display:block;color:#c4c1b9;letter-spacing:.01em;margin-bottom:.35em">Nem todo problema jurídico</span>
        É só um <span style="color:#c9a86a">processo.</span>
      </h1>
      <p style="max-width:44ch;font-size:clamp(15px,1.5vw,18px);line-height:1.65;color:#c4c1b9;margin-top:28px;font-weight:300">
        Para o médico, a dívida do FIES é a história de anos de dedicação — e precisa ser resolvida com <span style="color:#f2efe9;font-weight:500">cuidado</span>. Você cuidou de vidas. Aqui, cuidamos do seu FIES.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:36px">
        <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:9px;padding:15px 28px;background:#c9a86a;color:#0c0d10;border-radius:999px;font-size:15px;font-weight:600;transition:background .2s,transform .2s">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>
          Falar no WhatsApp
        </a>
        <a href="#processo" style="text-decoration:none;display:inline-flex;align-items:center;gap:9px;padding:15px 26px;border:1px solid rgba(242,239,233,.25);border-radius:999px;font-size:15px;font-weight:500;color:#f2efe9;transition:border-color .2s,background .2s">Como funciona</a>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:28px;margin-top:52px;padding-top:30px;border-top:1px solid rgba(242,239,233,.1);max-width:640px">
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:#c9a86a;line-height:1">+300</div>
          <div style="font-size:12px;color:#9a978f;margin-top:4px">médicos atendidos</div>
        </div>
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:#c9a86a;line-height:1">até 99%</div>
          <div style="font-size:12px;color:#9a978f;margin-top:4px">de redução possível</div>
        </div>
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:#c9a86a;line-height:1">100%</div>
          <div style="font-size:12px;color:#9a978f;margin-top:4px">atendimento humanizado</div>
        </div>
      </div>
    </div>
  </section>

  <section id="sobre" style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
    <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(36px,6vw,88px);align-items:center" class="ak-two-col">
      <div style="position:relative">
        <div style="border-radius:14px;overflow:hidden;aspect-ratio:4/5;border:1px solid rgba(201,168,106,.2)">
          <div style="width:100%;height:100%;background-image:url('/demo/adv-kelvyn/kelvyn-portrait.png');background-size:cover;background-position:70% top"></div>
        </div>
        <div style="position:absolute;bottom:-18px;left:-18px;background:#131519;border:1px solid rgba(201,168,106,.25);border-radius:12px;padding:16px 20px;box-shadow:0 20px 50px rgba(0,0,0,.5)">
          <div style="font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:#f2efe9">Kelvyn Lebkuchen</div>
          <div style="font-size:11px;letter-spacing:.06em;color:#9a978f;margin-top:2px">Advogado &bull; OAB/RO</div>
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
          <span style="width:28px;height:1px;background:#c9a86a"></span>
          <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Quem é</span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0 0 24px">O advogado que fala a língua de quem cuida de gente.</h2>
        <p style="font-size:16px;line-height:1.75;color:#c4c1b9;font-weight:300;margin:0 0 18px">Kelvyn Lebkuchen é advogado dedicado ao <span style="color:#f2efe9;font-weight:500">abatimento e renegociação do FIES para médicos</span>. Enquanto você dedicava sua formação a salvar vidas, a dívida crescia. O trabalho aqui é devolver a sua tranquilidade financeira — com estratégia jurídica e linguagem clara.</p>
        <p style="font-size:16px;line-height:1.75;color:#c4c1b9;font-weight:300;margin:0 0 30px">Nada de juridiquês. Aqui o atendimento é <span style="color:#f2efe9;font-weight:500">humanizado</span>, direto ao ponto e pensado para a rotina de quem não tem tempo a perder.</p>
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <span style="padding:9px 16px;border:1px solid rgba(242,239,233,.16);border-radius:999px;font-size:13px;color:#d8d5cd">Atendimento em todo o Brasil</span>
          <span style="padding:9px 16px;border:1px solid rgba(242,239,233,.16);border-radius:999px;font-size:13px;color:#d8d5cd">Foco em FIES médicos</span>
          <span style="padding:9px 16px;border:1px solid rgba(242,239,233,.16);border-radius:999px;font-size:13px;color:#d8d5cd">Diagnóstico sem compromisso</span>
        </div>
      </div>
    </div>
  </section>

  <section id="servicos" style="background:#0f1116;border-top:1px solid rgba(201,168,106,.12);border-bottom:1px solid rgba(201,168,106,.12)">
    <div style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
      <div style="max-width:640px;margin-bottom:52px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
          <span style="width:28px;height:1px;background:#c9a86a"></span>
          <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Áreas de atuação</span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Como podemos resolver o seu FIES</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px">${servicosHtml}</div>
    </div>
  </section>

  <section id="processo" style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
    <div style="max-width:640px;margin-bottom:56px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
        <span style="width:28px;height:1px;background:#c9a86a"></span>
        <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Como funciona</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Quatro passos até o alívio</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:26px">${passosHtml}</div>
  </section>

  <section id="resultados" style="background:#0f1116;border-top:1px solid rgba(201,168,106,.12);border-bottom:1px solid rgba(201,168,106,.12)">
    <div style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
      <div style="text-align:center;max-width:620px;margin:0 auto 60px">
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:22px">
          <span style="width:28px;height:1px;background:#c9a86a"></span>
          <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Resultados</span>
          <span style="width:28px;height:1px;background:#c9a86a"></span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Números que devolvem noites de sono</h2>
      </div>
      <div style="border:1px solid rgba(201,168,106,.15);border-radius:16px;overflow:hidden;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">${statsHtml}</div>
    </div>
  </section>

  <section id="depoimentos" style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
    <div style="max-width:640px;margin-bottom:52px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
        <span style="width:28px;height:1px;background:#c9a86a"></span>
        <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Depoimentos</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Quem já respira aliviado</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">${depoimentosHtml}</div>
  </section>

  <section id="conteudo" style="background:#0f1116;border-top:1px solid rgba(201,168,106,.12)">
    <div style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:1320px;margin:0 auto">
      <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:44px">
        <div style="max-width:560px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
            <span style="width:28px;height:1px;background:#c9a86a"></span>
            <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">No Instagram</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Conteúdo que descomplica o FIES</h2>
        </div>
        <a href="https://instagram.com/kelvynlebkuchen" target="_blank" rel="noopener" style="color:#c9a86a;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;transition:color .2s">
          @kelvynlebkuchen
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
        </a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px">${reelsHtml}</div>
    </div>
  </section>

  <section id="faq" style="padding:clamp(70px,11vh,130px) clamp(20px,5vw,64px);max-width:920px;margin:0 auto">
    <div style="text-align:center;margin-bottom:52px">
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:22px">
        <span style="width:28px;height:1px;background:#c9a86a"></span>
        <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">Dúvidas frequentes</span>
        <span style="width:28px;height:1px;background:#c9a86a"></span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4vw,52px);line-height:1.05;margin:0">Perguntas que todo médico faz</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">${faqsHtml}</div>
  </section>

  <section id="contato" style="position:relative;padding:clamp(70px,12vh,140px) clamp(20px,5vw,64px);text-align:center;overflow:hidden;background:linear-gradient(180deg,#0c0d10,#12100b)">
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;height:400px;background:rgba(201,168,106,.1);border-radius:50%;filter:blur(120px);pointer-events:none"></div>
    <div style="position:relative;max-width:720px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px">
        <span style="width:28px;height:1px;background:#c9a86a"></span>
        <span style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c9a86a">O primeiro passo é grátis</span>
        <span style="width:28px;height:1px;background:#c9a86a"></span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5.5vw,68px);line-height:1.02;margin:0 0 20px">Vamos resolver o seu FIES?</h2>
      <p style="font-size:17px;line-height:1.7;color:#c4c1b9;font-weight:300;margin:0 auto 38px;max-width:48ch">Envie uma mensagem no WhatsApp e receba um diagnóstico do seu caso sem compromisso. Atendimento humano, resposta rápida.</p>
      <a href="${WA}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;gap:11px;padding:18px 38px;background:#c9a86a;color:#0c0d10;border-radius:999px;font-size:17px;font-weight:700;transition:background .2s,transform .2s">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>
        Falar no WhatsApp agora
      </a>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:26px;margin-top:44px;font-size:14px;color:#9a978f">
        <a href="mailto:kelvynlebkuchen@gmail.com" style="color:#c9a86a;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:color .2s">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          kelvynlebkuchen@gmail.com
        </a>
        <span style="display:inline-flex;align-items:center;gap:8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a978f" stroke-width="1.8"><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          Porto Velho — RO &bull; Atendimento em todo o Brasil
        </span>
      </div>
    </div>
  </section>

  <footer style="border-top:1px solid rgba(201,168,106,.12);padding:34px clamp(20px,5vw,64px)">
    <div style="max-width:1320px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="width:30px;height:30px;border:1px solid rgba(201,168,106,.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:#c9a86a">KL</span>
        <span style="font-size:13px;color:#8f8c84">&copy; 2026 Kelvyn Lebkuchen Advocacia &bull; OAB/RO</span>
      </div>
      <div style="display:flex;gap:22px;font-size:13px;color:#8f8c84">
        <a href="#sobre" style="color:#c9a86a;text-decoration:none;transition:color .2s">Sobre</a>
        <a href="#servicos" style="color:#c9a86a;text-decoration:none;transition:color .2s">Atuação</a>
        <a href="#faq" style="color:#c9a86a;text-decoration:none;transition:color .2s">Dúvidas</a>
        <a href="https://instagram.com/kelvynlebkuchen" target="_blank" rel="noopener" style="color:#c9a86a;text-decoration:none;transition:color .2s">Instagram</a>
      </div>
    </div>
  </footer>

  <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp" style="position:fixed;right:26px;bottom:26px;z-index:70;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#25b34a,#1e9e40);display:flex;align-items:center;justify-content:center;box-shadow:0 16px 34px -12px rgba(20,120,40,.6)">
    <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7.9-1.8c1.8 1 3.9 1.5 6.1 1.5 6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4 .9.9-3.8-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.1 9.5 9.9 4.9 16 4.9s10.9 4.6 10.9 10.1S22.1 24.7 16 24.7zm6-7.7c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.3-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>
  </a>

</div>`;

export default function AdvKelvyn() {
  useEffect(() => {
    const root = document.getElementById("ak-root");
    if (!root) return;

    // details/summary rotate +
    root.querySelectorAll("details").forEach((d) => {
      const plus = d.querySelector("summary span:last-child");
      if (!plus) return;
      const update = () => {
        (plus as HTMLElement).style.transform = d.open
          ? "rotate(45deg)"
          : "rotate(0deg)";
      };
      d.addEventListener("toggle", update);
      update();
    });

    // reveal on scroll
    const show = (el: HTMLElement) => {
      el.setAttribute("data-shown", "1");
      el.style.setProperty(
        "animation",
        "akRise 1.05s cubic-bezier(.16,.84,.34,1) both",
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
    const header = document.getElementById("ak-header");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 24) {
        header.style.background = "rgba(12,13,16,.9)";
        header.style.backdropFilter = "blur(14px)";
        header.style.boxShadow = "0 12px 40px -22px rgba(0,0,0,.42)";
        header.style.padding = "14px clamp(20px,5vw,64px)";
      } else {
        header.style.background = "rgba(12,13,16,.72)";
        header.style.backdropFilter = "blur(14px)";
        header.style.boxShadow = "none";
        header.style.padding = "18px clamp(20px,5vw,64px)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        #ak-root *{box-sizing:border-box}
        #ak-root ::selection{background:#c9a86a;color:#0c0d10}
        #ak-root a{color:inherit}
        #ak-root html{scroll-behavior:smooth}
        #ak-root body{margin:0;-webkit-font-smoothing:antialiased}
        @keyframes akRise{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        #ak-root [data-reveal]{opacity:0}
        #ak-root .ak-svc:hover{border-color:rgba(201,168,106,.4) !important;transform:translateY(-4px)}
        #ak-root .ak-reel:hover .ak-reel-bg{transform:scale(1.05)}
        #ak-root .ak-stat:last-child{border-right:none !important}
        #ak-root details summary::-webkit-details-marker,
        #ak-root details summary::marker{display:none;content:""}
        #ak-root details[open] summary span:last-child{transform:rotate(45deg)}
        #ak-root header a[href]:hover{color:#c9a86a !important}
        #ak-root header a[href*="wa.me"]:hover{background:#e0c48c !important;transform:translateY(-2px)}
        #ak-root section a[href*="wa.me"]:hover{background:#e0c48c !important;transform:translateY(-2px)}
        #ak-root section a[href="#processo"]:hover{border-color:rgba(201,168,106,.6);background:rgba(201,168,106,.08)}
        #ak-root section a[href="https://instagram.com/kelvynlebkuchen"]:hover{color:#e0c48c !important}
        #ak-root footer a:hover{color:#e0c48c !important}
        #ak-root #ak-navlinks a:hover{color:#c9a86a !important}
        @media(max-width:768px){
          #ak-root #ak-navlinks{display:none !important}
          #ak-root .ak-two-col{grid-template-columns:1fr !important}
        }
        @media(max-width:640px){
          #ak-root .ak-stat{border-right:none !important;border-bottom:1px solid rgba(201,168,106,.15) !important}
          #ak-root .ak-stat:last-child{border-bottom:none !important}
        }
      `}</style>
      <div
        id="ak-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
