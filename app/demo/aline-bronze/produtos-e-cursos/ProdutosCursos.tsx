"use client";

import { useEffect } from "react";
import {
  wa,
  HOME,
  PRODUTOS,
  sun,
  sunDot,
  waIcon,
  slot,
  nav,
  footer,
  ALINE_CSS,
  setupAline,
  FONTS,
} from "../shared";

const prod = (
  id: string,
  grad: string,
  tag: string,
  title: string,
  desc: string,
  delay: number
) => `
  <article data-reveal data-reveal-delay="${delay}" class="ab-card" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(200,162,90,.28);box-shadow:0 24px 50px -32px rgba(58,42,32,.4)">
    <div style="height:240px;overflow:hidden">${slot(id, title, grad)}</div>
    <div style="padding:24px"><div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#C8A25A;margin-bottom:6px">${tag}</div><h3 style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:25px;color:#7A1620;margin:0 0 8px">${title}</h3><p style="margin:0;color:#7a6757;font-weight:300;line-height:1.6;font-size:14.5px">${desc}</p></div>
  </article>`;

const fcard = (title: string, sub: string) => `
  <div style="background:rgba(255,255,255,.06);border:1px solid rgba(230,206,151,.22);border-radius:14px;padding:16px 18px"><div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:19px;color:#E6CE97;margin-bottom:3px">${title}</div><div style="font-size:13.5px;color:#cbb59b;font-weight:300">${sub}</div></div>`;

const bullet = (txt: string) => `
  <div style="display:flex;align-items:center;gap:13px"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:rgba(122,22,32,.1);display:inline-flex;align-items:center;justify-content:center;color:#7A1620;font-size:15px">✓</span><span style="color:#4a382c;font-size:16px">${txt}</span></div>`;

const PAGE_HTML = `
<div style="position:relative;width:100%;overflow-x:hidden;background:#F8F1E7;color:#3A2A20;font-family:'Jost',system-ui,sans-serif">

  ${nav("produtos")}

  <!-- HERO -->
  <header style="position:relative;padding:140px clamp(20px,5vw,60px) 96px;background:radial-gradient(120% 100% at 80% 0%,#8d2230 0%,transparent 55%),linear-gradient(160deg,#5A0E16 0%,#430A11 100%);overflow:hidden;text-align:center">
    <div style="position:absolute;top:-70px;left:50%;transform:translateX(-50%);width:220px;height:220px;opacity:.55">${sun(220, "1.3")}</div>
    <div style="position:absolute;bottom:-120px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(200,162,90,.25),transparent 65%);animation:pulseGlow 8s ease-in-out infinite;pointer-events:none"></div>
    <div data-reveal style="position:relative;max-width:760px;margin:0 auto">
      <div style="display:inline-flex;align-items:center;gap:10px;padding:7px 16px;border:1px solid rgba(200,162,90,.55);border-radius:999px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#E6CE97;background:rgba(255,255,255,.06);margin-bottom:26px"><span style="width:6px;height:6px;border-radius:50%;background:#C8A25A"></span>A experiência completa Aline Bronze</div>
      <div style="font-family:Allura,cursive;font-size:clamp(34px,5vw,46px);color:#E6CE97;line-height:1">tudo para o seu</div>
      <h1 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(44px,7vw,80px);line-height:.98;letter-spacing:-1px;color:#F8F1E7;margin:2px 0 22px">momento sol</h1>
      <p style="max-width:560px;margin:0 auto 34px;color:#ecd3b6;font-weight:300;font-size:clamp(16px,1.5vw,19px);line-height:1.65">Bronzeamento de alto padrão, formação para profissionais e a linha exclusiva de cosméticos e moda praia. Conheça os três pilares que fazem da Aline Bronze uma referência.</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
        <a href="#bronze" class="ab-btn" style="background:#E6CE97;color:#5A0E16;padding:14px 26px;border-radius:999px;font-size:14.5px;letter-spacing:.5px;font-weight:500">Bronze de Milhões</a>
        <a href="#formacao" class="ab-ghost" style="background:rgba(255,255,255,.08);color:#F8F1E7;padding:14px 26px;border-radius:999px;font-size:14.5px;letter-spacing:.5px;border:1px solid rgba(230,206,151,.4)">Formação VIP</a>
        <a href="#produtos" class="ab-ghost" style="background:rgba(255,255,255,.08);color:#F8F1E7;padding:14px 26px;border-radius:999px;font-size:14.5px;letter-spacing:.5px;border:1px solid rgba(230,206,151,.4)">Produtos</a>
      </div>
    </div>
  </header>

  <!-- 1 · BRONZE DE MILHÕES -->
  <section id="bronze" style="scroll-margin-top:90px;padding:clamp(64px,9vw,120px) clamp(20px,5vw,60px);background:#F8F1E7">
    <div data-stack style="max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:clamp(34px,5vw,76px)">
      <div data-media data-reveal style="flex:0 0 46%;max-width:520px;position:relative">
        <div style="position:absolute;top:-22px;left:-18px;width:74px;height:74px;z-index:3;animation:floatY 6s ease-in-out infinite">${sunDot(74)}</div>
        <div style="position:absolute;inset:-14px;border:1px solid rgba(200,162,90,.55);border-radius:20px"></div>
        <div style="position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/5;border:3px solid #C8A25A;box-shadow:0 34px 64px -30px rgba(122,22,32,.5)">
          ${slot("prod-bronze", "Foto bronzeamento / resultado marquinha", "linear-gradient(150deg,#F6E7E2,#E4C2B4)")}
        </div>
      </div>
      <div data-reveal data-reveal-delay="120" style="flex:1;min-width:0">
        <div style="display:inline-flex;align-items:center;gap:8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A07C3C;margin-bottom:14px"><span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;letter-spacing:0;color:#C8A25A">01</span> Pilar exclusivo</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,56px);color:#7A1620;margin:0 0 18px;line-height:1.02;letter-spacing:-.5px">Bronze de Milhões</h2>
        <p style="color:#5c4a3c;font-weight:300;font-size:18px;line-height:1.7;margin:0 0 26px;max-width:520px">Protocolos exclusivos de bronzeamento para garantir sua marquinha com segurança e naturalidade — o ano todo. Técnica refinada, acabamento impecável e aquela cor de verão que vira sua marca registrada.</p>
        <div style="display:flex;flex-direction:column;gap:13px;margin-bottom:32px;max-width:480px">
          ${bullet("Marquinha natural e uniforme")}
          ${bullet("Segurança e cuidado em cada sessão")}
          ${bullet("Resultado que dura o ano inteiro")}
        </div>
        <a href="${wa("Olá Aline! Quero agendar o Bronze de Milhões.")}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7A1620;color:#F8F1E7;padding:15px 28px;border-radius:999px;font-size:15px;letter-spacing:.5px;box-shadow:0 16px 30px -14px rgba(122,22,32,.7)">Agendar meu bronze →</a>
      </div>
    </div>
  </section>

  <!-- 2 · FORMAÇÃO -->
  <section id="formacao" style="scroll-margin-top:90px;position:relative;padding:clamp(64px,9vw,120px) clamp(20px,5vw,60px);background:linear-gradient(160deg,#5A0E16 0%,#430A11 100%);overflow:hidden">
    <div style="position:absolute;top:-90px;right:-60px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(200,162,90,.22),transparent 65%);pointer-events:none"></div>
    <div data-stack-rev style="max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:clamp(34px,5vw,76px)">
      <div data-reveal style="flex:1;min-width:0">
        <div style="display:inline-flex;align-items:center;gap:8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#E6CE97;margin-bottom:14px"><span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;letter-spacing:0;color:#C8A25A">02</span> Para profissionais</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,56px);color:#F8F1E7;margin:0 0 18px;line-height:1.02;letter-spacing:-.5px">Formação de<br>Especialistas</h2>
        <p style="color:#ecd3b6;font-weight:300;font-size:18px;line-height:1.7;margin:0 0 26px;max-width:520px">Aprenda o método que me tornou referência e transforme sua carreira. Cursos <strong style="color:#E6CE97;font-weight:500">VIP</strong> para quem deseja faturar alto no mercado de bronzeamento.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:32px;max-width:540px">
          ${fcard("O método", "o protocolo Bronze de Milhões na prática")}
          ${fcard("Marquinha perfeita", "técnica, acabamento e naturalidade")}
          ${fcard("Faturar alto", "precificação e atendimento de luxo")}
          ${fcard("Suporte VIP", "acompanhamento de quem é referência")}
        </div>
        <a href="${wa("Olá Aline! Quero saber mais sobre a Formação de Especialistas.")}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:9px;background:#E6CE97;color:#5A0E16;padding:15px 28px;border-radius:999px;font-size:15px;letter-spacing:.5px;font-weight:500;box-shadow:0 16px 30px -14px rgba(0,0,0,.5)">Quero me tornar especialista →</a>
      </div>
      <div data-media data-reveal data-reveal-delay="120" style="flex:0 0 44%;max-width:500px;position:relative">
        <div style="position:absolute;inset:-14px;border:1px solid rgba(230,206,151,.4);border-radius:20px"></div>
        <div style="position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/5;border:3px solid #C8A25A;box-shadow:0 40px 70px -30px rgba(0,0,0,.6)">
          ${slot("prod-curso", "Foto da Aline ensinando / turma", "linear-gradient(150deg,#7A1620,#C8A25A)")}
        </div>
        <div style="position:absolute;bottom:22px;right:-20px;background:#F8F1E7;color:#7A1620;padding:14px 20px;border-radius:14px;box-shadow:0 20px 40px -18px rgba(0,0,0,.5);text-align:center;animation:floatY 7s ease-in-out infinite">
          <div style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:22px;line-height:1">VIP</div>
          <div style="font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px;color:#A07C3C">formação</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3 · PRODUTOS -->
  <section id="produtos" style="scroll-margin-top:90px;padding:clamp(64px,9vw,120px) clamp(20px,5vw,60px);background:linear-gradient(180deg,#F3E8D7 0%,#F8F1E7 100%)">
    <div style="max-width:1180px;margin:0 auto">
      <div data-reveal style="text-align:center;max-width:620px;margin:0 auto 54px">
        <div style="display:inline-flex;align-items:center;gap:8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#A07C3C;margin-bottom:12px"><span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;letter-spacing:0;color:#C8A25A">03</span> Linha exclusiva</div>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5vw,56px);color:#7A1620;margin:0 0 16px;letter-spacing:-.5px">Produtos &amp; Moda Praia</h2>
        <p style="color:#7a6757;font-weight:300;font-size:18px;line-height:1.65;margin:0">Tudo o que você precisa para o seu momento sol. Da nossa linha exclusiva de cosméticos aos biquínis que valorizam a sua marquinha.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px">
        ${prod("prod-cosmetico", "linear-gradient(150deg,#F6E7E2,#E4C2B4)", "Aline Bronze Cosméticos", "Aceleradores &amp; Bronzeadores", "Fórmulas que intensificam e prolongam a sua cor com nutrição e brilho natural.", 0)}
        ${prod("prod-possol", "linear-gradient(150deg,#EFE6D6,#D9C6A6)", "Cuidado pós-sol", "Hidratação &amp; Pós-Sol", "Para manter a pele macia, saudável e a marquinha firme por muito mais tempo.", 90)}
        ${prod("prod-moda", "linear-gradient(150deg,#F0E0DD,#DDBFC0)", "Moda praia", "Biquínis &amp; Marquinha", "Modelagens pensadas para valorizar o seu bronzeado e a sua marquinha perfeita.", 180)}
      </div>
      <div data-reveal style="text-align:center;margin-top:46px">
        <a href="${wa("Olá Aline! Quero conhecer os produtos e a moda praia.")}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:9px;background:#7A1620;color:#F8F1E7;padding:16px 32px;border-radius:999px;font-size:15px;letter-spacing:.5px;box-shadow:0 16px 30px -14px rgba(122,22,32,.7)">Falar com a Aline →</a>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section style="position:relative;padding:clamp(70px,10vw,120px) clamp(20px,5vw,60px);background:#7A1620;overflow:hidden;text-align:center">
    <div style="position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:160px;height:160px;opacity:.5">${sun(160, "1.5")}</div>
    <div data-reveal style="position:relative;max-width:680px;margin:0 auto">
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,5.5vw,58px);color:#F8F1E7;line-height:1.04;margin:0 0 18px">Bora começar o seu<br><span style="font-family:Allura,cursive;color:#E6CE97;font-size:1.15em">momento sol</span>?</h2>
      <p style="color:#ecd3b6;font-weight:300;font-size:18px;line-height:1.6;margin:0 0 32px">Bronzeamento, formação ou produtos — fale comigo no WhatsApp e eu te ajudo a escolher.</p>
      <a href="${wa("Olá Aline! Vim pelo site e quero saber mais.")}" target="_blank" rel="noopener" class="ab-btn" style="display:inline-flex;align-items:center;gap:10px;background:#E6CE97;color:#5A0E16;padding:18px 36px;border-radius:999px;font-size:16px;letter-spacing:.6px;font-weight:500;box-shadow:0 20px 40px -16px rgba(0,0,0,.5)">${waIcon(18)} Falar no WhatsApp</a>
    </div>
  </section>

  ${footer(
    "Explorar",
    `<a href="${HOME}" style="color:#d9c3a8">Página inicial</a><a href="${PRODUTOS}#bronze" style="color:#d9c3a8">Bronze de Milhões</a><a href="${PRODUTOS}#formacao" style="color:#d9c3a8">Formação VIP</a><a href="${PRODUTOS}#produtos" style="color:#d9c3a8">Produtos</a>`
  )}

</div>`;

export default function ProdutosCursos() {
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
