"use client";

import { useEffect } from "react";
import {
  wa,
  PRODUTOS,
  HOME,
  sun,
  sunDot,
  waIcon,
  slot,
  nav,
  footer,
  ALINE_CSS,
  setupAline,
  FONTS,
} from "./shared";

const waAgendar = wa("Olá Aline! Vim pelo site e gostaria de agendar um horário.");

const marqueeRun = `<span style="display:flex;gap:30px;padding-right:30px;align-items:center"><span>Flash Bronze</span><span style="color:#C8A25A">✦</span><span>Bronze de Milhões</span><span style="color:#C8A25A">✦</span><span>Spa Corporal</span><span style="color:#C8A25A">✦</span><span>Banhos Relaxantes</span><span style="color:#C8A25A">✦</span><span>Massagem</span><span style="color:#C8A25A">✦</span><span>Cosméticos</span><span style="color:#C8A25A">✦</span></span>`;

const serv = (
  id: string,
  grad: string,
  badge: string,
  title: string,
  desc: string,
  cta: string,
  waText: string,
  delay: number
) => `
  <article data-reveal data-reveal-delay="${delay}" class="ab-card" style="background:#fff;border-radius:22px;overflow:hidden;border:1px solid rgba(200,162,90,.28);box-shadow:0 24px 50px -32px rgba(58,42,32,.4)">
    <div style="position:relative;height:230px;overflow:hidden">
      ${slot(id, "Foto " + title, grad)}
      ${badge ? `<div style="position:absolute;top:14px;left:14px;background:rgba(122,22,32,.92);color:#F0D9A8;font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:6px 13px;border-radius:999px">${badge}</div>` : ""}
    </div>
    <div style="padding:26px 26px 30px">
      <h3 style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:27px;color:#7A1620;margin:0 0 8px">${title}</h3>
      <p style="margin:0 0 16px;color:#7a6757;font-weight:300;line-height:1.6;font-size:15px">${desc}</p>
      <a href="${wa(waText)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:7px;color:#C8A25A;font-size:14px;letter-spacing:.5px">${cta} →</a>
    </div>
  </article>`;

const valor = (title: string, sub: string) => `
  <div style="display:flex;align-items:flex-start;gap:11px"><span style="color:#C8A25A;font-size:20px;line-height:1">✦</span><div><div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:18px;color:#7A1620">${title}</div><div style="font-size:13px;color:#8a7666;font-weight:300">${sub}</div></div></div>`;

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow-x:hidden;background:#F8F1E7;color:#3A2A20;font-family:'Jost',system-ui,sans-serif">

  ${nav("servicos")}

  <!-- HERO -->
  <header style="position:relative;padding:128px clamp(20px,5vw,60px) 70px;background:radial-gradient(120% 90% at 18% 12%,#FBF7F0 0%,transparent 55%),radial-gradient(100% 80% at 88% 0%,#F3E7D2 0%,transparent 50%),linear-gradient(165deg,#F8F1E7 0%,#F3E8D7 100%);overflow:hidden">
    <div style="position:absolute;top:-120px;right:-120px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(200,162,90,.28),transparent 70%);animation:pulseGlow 7s ease-in-out infinite;pointer-events:none"></div>
    <div style="position:absolute;bottom:-90px;left:-80px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(122,22,32,.10),transparent 70%);pointer-events:none"></div>
    <div data-stack style="max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:clamp(28px,5vw,70px)">
      <div style="flex:1;min-width:0">
        <div data-reveal style="display:inline-flex;align-items:center;gap:10px;padding:7px 16px;border:1px solid rgba(200,162,90,.55);border-radius:999px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#A07C3C;background:rgba(255,255,255,.4);margin-bottom:26px">
          <span style="width:6px;height:6px;border-radius:50%;background:#C8A25A"></span>Referência em bronzeamento · Porto Velho - RO
        </div>
        <h1 data-reveal data-reveal-delay="80" style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(46px,7vw,84px);line-height:.98;letter-spacing:-1px;color:#3A2A20;margin:0 0 22px">
          A cor do verão,<br><span style="font-style:italic;color:#7A1620">o ano </span><span style="font-family:Allura,cursive;color:#C8A25A;font-size:1.18em">todo</span><span style="color:#7A1620">.</span>
        </h1>
        <p data-reveal data-reveal-delay="160" style="max-width:480px;font-size:clamp(16px,1.5vw,19px);line-height:1.65;color:#5c4a3c;margin:0 0 34px;font-weight:300">Referência em bronzeamento e estética, estou aqui para garantir que você tenha a cor do verão o ano todo. Explore meus serviços, produtos e cursos criados para realçar sua beleza natural.</p>
        <div data-reveal data-reveal-delay="240" style="display:flex;flex-wrap:wrap;gap:14px;align-items:center">
          <a href="${waAgendar}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7A1620;color:#F8F1E7;padding:16px 30px;border-radius:999px;font-size:15px;letter-spacing:.6px;box-shadow:0 16px 30px -14px rgba(122,22,32,.75)">${waIcon(17)} Agendar no WhatsApp</a>
          <a href="#servicos" class="ab-out" style="display:inline-flex;align-items:center;gap:8px;color:#7A1620;padding:16px 26px;border-radius:999px;border:1px solid rgba(122,22,32,.4);font-size:15px;letter-spacing:.6px">Conhecer serviços →</a>
        </div>
        <div data-reveal data-reveal-delay="320" style="display:flex;flex-wrap:wrap;gap:26px;margin-top:42px">
          <div><div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#7A1620">+14 mil</div><div style="font-size:12.5px;letter-spacing:.5px;color:#9a8676">seguidores</div></div>
          <div style="width:1px;background:rgba(200,162,90,.4)"></div>
          <div><div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#7A1620">Linha própria</div><div style="font-size:12.5px;letter-spacing:.5px;color:#9a8676">Aline Bronze Cosméticos</div></div>
          <div style="width:1px;background:rgba(200,162,90,.4)"></div>
          <div><div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#7A1620">Spa &amp; Banhos</div><div style="font-size:12.5px;letter-spacing:.5px;color:#9a8676">experiência completa</div></div>
        </div>
      </div>
      <div data-hero-portrait data-reveal data-reveal-delay="180" style="flex:0 0 430px;max-width:430px;position:relative">
        <div style="position:absolute;top:-26px;right:-12px;width:84px;height:84px;z-index:3;animation:floatY 6s ease-in-out infinite">${sunDot(84)}</div>
        <div style="position:absolute;inset:-16px;border:1px solid rgba(200,162,90,.6);border-radius:236px 236px 30px 30px"></div>
        <div style="position:relative;width:100%;aspect-ratio:3/4;border-radius:222px 222px 22px 22px;overflow:hidden;border:3px solid #C8A25A;box-shadow:0 36px 70px -28px rgba(122,22,32,.5)">
          ${slot("hero-aline", "Foto da Aline (retrato)", "linear-gradient(150deg,#F3E4D7,#E4C2B4)")}
        </div>
        <div style="position:absolute;bottom:24px;left:-22px;z-index:3;display:flex;align-items:center;gap:11px;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);padding:12px 18px;border-radius:16px;box-shadow:0 18px 36px -18px rgba(58,42,32,.45);border:1px solid rgba(200,162,90,.35);animation:floatY 7s ease-in-out infinite">
          <span style="font-size:24px">✨</span>
          <div><div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:18px;color:#7A1620;line-height:1">Flash Bronze</div><div style="font-size:11.5px;color:#9a8676;letter-spacing:.4px">marquinha perfeita</div></div>
        </div>
      </div>
    </div>
  </header>

  <!-- MARQUEE -->
  <div style="background:#7A1620;color:#F0D9A8;overflow:hidden;padding:13px 0;border-top:1px solid rgba(200,162,90,.4);border-bottom:1px solid rgba(200,162,90,.4)">
    <div style="display:flex;width:max-content;animation:marquee 26s linear infinite;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:21px;letter-spacing:1px">${marqueeRun}${marqueeRun}</div>
  </div>

  <!-- SERVIÇOS -->
  <section id="servicos" style="scroll-margin-top:90px;padding:clamp(64px,9vw,110px) clamp(20px,5vw,60px);background:#F8F1E7">
    <div style="max-width:1200px;margin:0 auto">
      <div data-reveal style="text-align:center;margin-bottom:54px">
        <div style="font-family:Allura,cursive;font-size:32px;color:#C8A25A;line-height:1">nossos</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,56px);color:#3A2A20;margin:2px 0 14px;letter-spacing:-.5px">Serviços</h2>
        <p style="max-width:520px;margin:0 auto;color:#7a6757;font-weight:300;font-size:17px;line-height:1.6">Uma experiência completa de cuidado, relaxamento e autoestima — pensada nos mínimos detalhes para você.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:26px">
        ${serv("serv-flash", "linear-gradient(150deg,#F6E7E2,#E4C2B4)", "Mais procurado", "Flash Bronze", "Bronzeamento expresso com pigmentação natural e uniforme. Sua marquinha pronta em uma única sessão, com segurança e acabamento impecável.", "Agendar sessão", "Olá Aline! Quero saber mais sobre o Flash Bronze.", 0)}
        ${serv("serv-banho", "linear-gradient(150deg,#EFE6D6,#D9C6A6)", "", "Banhos Relaxantes", "Rituais de banho aromáticos que renovam corpo e mente. Um momento de pausa e bem-estar para reequilibrar a sua energia.", "Reservar", "Olá Aline! Quero saber mais sobre os Banhos Relaxantes.", 110)}
        ${serv("serv-spa", "linear-gradient(150deg,#F0E0DD,#DDBFC0)", "", "Spa Corporal &amp; Massagem", "Massagens e tratamentos corporais que aliviam tensões e devolvem a leveza. Cuidado profissional num ambiente acolhedor.", "Quero relaxar", "Olá Aline! Quero saber mais sobre o Spa Corporal.", 220)}
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" style="scroll-margin-top:90px;position:relative;padding:clamp(64px,9vw,110px) clamp(20px,5vw,60px);background:linear-gradient(180deg,#F3E8D7 0%,#F8F1E7 100%);overflow:hidden">
    <div data-stack-rev style="max-width:1160px;margin:0 auto;display:flex;align-items:center;gap:clamp(34px,5vw,72px)">
      <div data-media data-reveal style="flex:0 0 400px;max-width:420px;position:relative">
        <div style="position:absolute;inset:-14px;border:1px solid rgba(200,162,90,.55);border-radius:18px"></div>
        <div style="position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/5;border:3px solid #C8A25A;box-shadow:0 34px 60px -30px rgba(122,22,32,.45)">
          ${slot("sobre-aline", "Foto da Aline (sobre)", "linear-gradient(150deg,#EFE6D6,#E7C9BC)")}
        </div>
        <div style="position:absolute;bottom:22px;right:-20px;background:#7A1620;color:#F0D9A8;padding:16px 22px;border-radius:14px;box-shadow:0 20px 40px -18px rgba(122,22,32,.6);text-align:center">
          <div style="font-family:Allura,cursive;font-size:34px;line-height:.8;color:#F0D9A8">Aline</div>
          <div style="font-size:10.5px;letter-spacing:2px;text-transform:uppercase;margin-top:4px;color:#dcb877">Especialista</div>
        </div>
      </div>
      <div data-reveal data-reveal-delay="120" style="flex:1;min-width:0">
        <div style="font-family:Allura,cursive;font-size:32px;color:#C8A25A;line-height:1">prazer,</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,54px);color:#3A2A20;margin:2px 0 22px;letter-spacing:-.5px">sou a Aline</h2>
        <p style="color:#5c4a3c;font-weight:300;font-size:17px;line-height:1.75;margin:0 0 18px;max-width:520px">Referência em bronzeamento em Porto Velho, transformei minha paixão por estética em um espaço onde cada cliente é cuidada com carinho e profissionalismo. Aqui, beleza e bem-estar caminham juntos.</p>
        <p style="color:#5c4a3c;font-weight:300;font-size:17px;line-height:1.75;margin:0 0 30px;max-width:520px">Da marquinha perfeita à minha linha exclusiva de cosméticos, tudo é pensado para realçar a sua beleza natural — o ano todo.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;max-width:540px">
          ${valor("Naturalidade", "marquinha realista e segura")}
          ${valor("Acolhimento", "ambiente pensado pra você")}
          ${valor("Experiência", "técnica que vira referência")}
          ${valor("Linha própria", "Aline Bronze Cosméticos")}
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUTOS & CURSOS CTA -->
  <section style="padding:0 clamp(20px,5vw,60px) clamp(40px,7vw,90px);background:#F8F1E7">
    <a href="${PRODUTOS}" data-reveal class="ab-banner" style="display:block;max-width:1200px;margin:0 auto;position:relative;overflow:hidden;border-radius:26px;background:linear-gradient(120deg,#5A0E16 0%,#7A1620 55%,#8d2230 100%);padding:clamp(38px,5vw,64px) clamp(28px,5vw,64px);box-shadow:0 40px 70px -36px rgba(122,22,32,.7)">
      <div style="position:absolute;top:-80px;right:-40px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(200,162,90,.4),transparent 65%)"></div>
      <div style="position:absolute;bottom:-110px;left:30%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(200,162,90,.22),transparent 65%)"></div>
      <div data-stack style="position:relative;display:flex;align-items:center;justify-content:space-between;gap:30px">
        <div>
          <div style="font-family:Allura,cursive;font-size:34px;color:#E6CE97;line-height:1">descubra</div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,4.4vw,50px);color:#F8F1E7;margin:4px 0 12px;line-height:1.04">Produtos, Cosméticos &amp; Cursos VIP</h2>
          <p style="color:#ecd3b6;font-weight:300;font-size:17px;line-height:1.6;max-width:560px;margin:0">Bronze de Milhões, formação de especialistas e a linha completa de cosméticos. Tudo o que você precisa para o seu momento sol — e para faturar alto no mercado de bronzeamento.</p>
        </div>
        <span style="flex:none;display:inline-flex;align-items:center;gap:10px;background:#E6CE97;color:#5A0E16;padding:16px 28px;border-radius:999px;font-size:15px;letter-spacing:.6px;font-weight:500;box-shadow:0 16px 30px -14px rgba(0,0,0,.4)">Ver tudo →</span>
      </div>
    </a>
  </section>

  <!-- LOCALIZAÇÃO -->
  <section id="local" style="scroll-margin-top:90px;padding:clamp(64px,9vw,110px) clamp(20px,5vw,60px);background:linear-gradient(180deg,#F8F1E7 0%,#F3E8D7 100%)">
    <div style="max-width:1160px;margin:0 auto">
      <div data-reveal style="text-align:center;margin-bottom:48px">
        <div style="font-family:Allura,cursive;font-size:32px;color:#C8A25A;line-height:1">venha nos</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,56px);color:#3A2A20;margin:2px 0;letter-spacing:-.5px">visitar</h2>
      </div>
      <div data-stack style="display:flex;gap:30px;align-items:stretch">
        <div data-reveal style="flex:1;min-width:0;display:flex;flex-direction:column;gap:18px">
          <div style="background:#fff;border-radius:18px;padding:24px;border:1px solid rgba(200,162,90,.3);box-shadow:0 20px 44px -30px rgba(58,42,32,.4);display:flex;gap:15px;align-items:flex-start">
            <span style="flex:none;width:42px;height:42px;border-radius:50%;background:rgba(122,22,32,.1);display:inline-flex;align-items:center;justify-content:center;color:#7A1620"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <div><div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:20px;color:#7A1620">Endereço</div><div style="color:#5c4a3c;font-weight:300;line-height:1.55;margin-top:2px">Joaquim Nabuco, 1919 — Centro<br>Porto Velho - RO</div></div>
          </div>
          <div style="background:#fff;border-radius:18px;padding:24px;border:1px solid rgba(200,162,90,.3);box-shadow:0 20px 44px -30px rgba(58,42,32,.4);display:flex;gap:15px;align-items:flex-start">
            <span style="flex:none;width:42px;height:42px;border-radius:50%;background:rgba(122,22,32,.1);display:inline-flex;align-items:center;justify-content:center;color:#7A1620"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></span>
            <div><div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:20px;color:#7A1620">Contato</div><div style="color:#5c4a3c;font-weight:300;line-height:1.55;margin-top:2px">(69) 99290-7169<br>@alinebronzepvh</div></div>
          </div>
          <div style="background:#fff;border-radius:18px;padding:24px;border:1px solid rgba(200,162,90,.3);box-shadow:0 20px 44px -30px rgba(58,42,32,.4)">
            <div style="display:flex;gap:15px;align-items:flex-start;margin-bottom:14px">
              <span style="flex:none;width:42px;height:42px;border-radius:50%;background:rgba(122,22,32,.1);display:inline-flex;align-items:center;justify-content:center;color:#7A1620"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
              <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:20px;color:#7A1620;padding-top:8px">Horário de funcionamento</div>
            </div>
            <div style="font-size:14.5px;color:#5c4a3c;font-weight:300">
              <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(200,162,90,.2)"><span>Segunda-feira</span><span style="color:#a85a5a">Fechado</span></div>
              <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(200,162,90,.2)"><span>Terça a Sábado</span><span style="color:#7A1620">08h às 18h</span></div>
              <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(200,162,90,.2)"><span>Domingos</span><span style="color:#7A1620">07h30 às 11h</span></div>
              <div style="display:flex;justify-content:space-between;padding:7px 0"><span>Feriados</span><span style="color:#7A1620">08h às 14h</span></div>
              <div style="margin-top:10px;font-size:12.5px;font-style:italic;color:#9a8676">* Último domingo do mês: folga coletiva</div>
            </div>
          </div>
        </div>
        <div data-reveal data-reveal-delay="120" style="flex:1.1;min-width:0;display:flex;flex-direction:column;border-radius:18px;overflow:hidden;border:1px solid rgba(200,162,90,.4);box-shadow:0 24px 50px -30px rgba(58,42,32,.45);min-height:420px">
          <iframe title="Mapa Aline Bronze" src="https://www.google.com/maps?q=Joaquim%20Nabuco%201919%20Centro%20Porto%20Velho%20RO&output=embed" style="flex:1;width:100%;border:0;min-height:340px;filter:saturate(.85)"></iframe>
          <a href="https://www.google.com/maps/search/?api=1&query=Joaquim%20Nabuco%201919%20Centro%20Porto%20Velho%20RO" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:9px;background:#7A1620;color:#F8F1E7;padding:16px;font-size:14.5px;letter-spacing:.5px">Como chegar →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section style="position:relative;padding:clamp(70px,10vw,120px) clamp(20px,5vw,60px);background:#7A1620;overflow:hidden;text-align:center">
    <div style="position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:160px;height:160px;opacity:.5">${sun(160, "1.5")}</div>
    <div data-reveal style="position:relative;max-width:680px;margin:0 auto">
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5.5vw,60px);color:#F8F1E7;line-height:1.04;margin:0 0 18px">Pronta para a sua<br><span style="font-family:Allura,cursive;color:#E6CE97;font-size:1.15em">marquinha</span> perfeita?</h2>
      <p style="color:#ecd3b6;font-weight:300;font-size:18px;line-height:1.6;margin:0 0 32px">Agende seu horário e venha viver a experiência Aline Bronze.</p>
      <a href="${waAgendar}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:10px;background:#E6CE97;color:#5A0E16;padding:18px 36px;border-radius:999px;font-size:16px;letter-spacing:.6px;font-weight:500;box-shadow:0 20px 40px -16px rgba(0,0,0,.5)">${waIcon(18)} Falar no WhatsApp</a>
    </div>
  </section>

  ${footer(
    "Navegar",
    `<a href="${HOME}#servicos" style="color:#d9c3a8">Serviços</a><a href="${HOME}#sobre" style="color:#d9c3a8">Sobre</a><a href="${PRODUTOS}" style="color:#d9c3a8">Produtos &amp; Cursos</a><a href="${HOME}#local" style="color:#d9c3a8">Localização</a>`
  )}

</div>`;

export default function AlineBronze() {
  useEffect(() => setupAline(), []);
  return (
    <>
      {FONTS}
      <style>{ALINE_CSS}</style>
      <div
        id="ab-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
    </>
  );
}
