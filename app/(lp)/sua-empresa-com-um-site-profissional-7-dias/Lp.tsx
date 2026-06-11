"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { gtagEvent } from "@/lib/gtag";

// Número do WhatsApp (DDI 55 + DDD + número, só dígitos)
const WHATSAPP = "5569999222517";

// Máscara de celular BR: (69) 9 9999-9999
function maskTel(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
}

// Lê UTMs e fbclid da URL pra saber qual anúncio gerou o lead.
function getTracking(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    fbclid: p.get("fbclid") || "",
  };
}

// Salva o lead na nossa API (que repassa pra planilha) sem travar o fluxo.
function saveLead(data: Record<string, string>) {
  try {
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* nunca bloqueia o WhatsApp */
  }
}

function WppIcon() {
  return (
    <svg className="wpp-ico" viewBox="0 0 24 24" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function Lp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [ramo, setRamo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goWpp(e: React.MouseEvent) {
    e.preventDefault();
    if (submitting) return; // anti duplo-clique
    let msg = "Olá! Vim pela página e quero um orçamento de site pra minha empresa.";
    if (nome) msg += ` Meu nome é ${nome}.`;
    if (ramo) msg += ` Ramo: ${ramo}.`;
    if (tel) msg += ` Meu WhatsApp: ${tel}.`;
    const temLead = !!(nome || tel);
    if (temLead) {
      const distinctId = tel || nome;
      posthog.identify(distinctId, { name: nome, phone: tel, ramo });
      posthog.capture("lead_submitted", {
        source: "lp-site-7-dias",
        has_nome: !!nome,
        has_tel: !!tel,
        has_ramo: !!ramo,
        ramo,
      });
      gtagEvent("generate_lead", { source: "lp-site-7-dias" });
      // Conversão do Google Ads: envio do formulário de lead.
      gtagEvent("conversion_event_submit_lead_form_1", {
        source: "lp-site-7-dias",
      });
      saveLead({ nome, tel, ramo, origem: "lp-site-7-dias", ...getTracking() });
    } else {
      posthog.capture("whatsapp_cta_clicked", {
        source: "lp-site-7-dias",
      });
      gtagEvent("whatsapp_cta_clicked", { source: "lp-site-7-dias" });
    }
    setSubmitting(true);
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    if (temLead) {
      // Vai pra página de obrigado (dispara o evento Lead do Pixel).
      window.location.href = "/obrigado";
    } else {
      window.setTimeout(() => setSubmitting(false), 1500);
    }
  }

  // Botão da hero: leva pro formulário (rola suave e foca o 1º campo).
  function goToForm(e: React.MouseEvent) {
    e.preventDefault();
    posthog.capture("hero_cta_clicked", { source: "lp-site-7-dias" });
    document
      .getElementById("contato")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    // foca o campo "nome" após o scroll, sem brigar com a rolagem suave
    window.setTimeout(
      () => document.getElementById("nome")?.focus({ preventScroll: true }),
      600,
    );
  }

  // Reveal on scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp-scope" ref={rootRef}>
      <header>
        <div className="wrap nav">
          <div className="logo">
            <Image
              src="/images/logo-devdesk-icon-coral.png"
              alt="DevDesk"
              width={115}
              height={26}
              className="logo-mark"
              priority
            />
            <span className="logo-text">
              DevDesk<span className="tech">Tech</span>
            </span>
          </div>
          <a href="#contato" className="btn btn-primary" onClick={goWpp}>
            <WppIcon />
            <span className="btn-text">Falar no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="wrap hero-grid">
          <div className="reveal in">
            <span className="eyebrow">
              <span className="pulse" />
              Vagas limitadas este mês
            </span>
            <h1>
              Sua empresa com um site{" "}
              <span className="hl accent">profissional no ar em 7 dias.</span>
            </h1>
            <p className="lede">
              Preço fechado, sem orçamento enrolado. Site rápido, no Google e
              feito pra transformar visitante em cliente — por quem desenvolve de
              verdade, não por template pronto.
            </p>
            <div className="hero-cta">
              <a href="#contato" className="btn btn-primary" onClick={goToForm}>
                <WppIcon />
                Quero meu site
              </a>
              <a href="#preco" className="btn btn-ghost">
                Ver preço ↓
              </a>
            </div>
            <div className="trust-line">
              <span>
                <span className="check">✓</span> Preço fechado, sem surpresa
              </span>
              <span>
                <span className="check">✓</span> Entrega em 7 dias
              </span>
              <span>
                <span className="check">✓</span> Atendimento direto com quem
                desenvolve
              </span>
            </div>
          </div>
          <div className="reveal in" style={{ transitionDelay: ".15s" }}>
            <div className="hero-card">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span className="browser-url">suaempresa.com.br</span>
              </div>
              <div className="mock-hero" />
              <div className="mock-row">
                <div className="mock-tile amber" />
                <div className="mock-tile" />
              </div>
              <div className="mock-row">
                <div className="mock-tile" />
                <div className="mock-tile" />
                <div className="mock-tile" />
              </div>
              <div className="floating-tag">no ar em 7 dias ⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div className="strip">
        <div className="wrap">
          <div className="strip-grid">
            <div className="strip-item">
              <div className="big">7 dias</div>
              <div className="lbl">do briefing ao site no ar</div>
            </div>
            <div className="strip-item">
              <div className="big">100%</div>
              <div className="lbl">responsivo e otimizado pro Google</div>
            </div>
            <div className="strip-item">
              <div className="big">Direto</div>
              <div className="lbl">você fala com quem desenvolve</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="block">
        <div className="wrap">
          <div className="reveal">
            <div className="kicker">A real é essa</div>
            <h2>Sua empresa ainda passa imagem de amador?</h2>
            <p className="sub">
              Enquanto você improvisa, seu concorrente já tá fechando pelo
              digital.
            </p>
          </div>
          <div className="prob-grid reveal">
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Você não tem site</strong> — ou tem um que parece de 2010
                e não aparece no Google.
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Cliente te acha pelo Instagram</strong> e desconfia:
                &ldquo;será que é empresa séria mesmo?&rdquo;
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Toda venda depende de você</strong> responder mensagem na
                mão, no improviso.
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Orçamento de site vira novela:</strong> ninguém te dá
                preço nem prazo de verdade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <div className="kicker">O que você recebe</div>
            <h2>Um site que trabalha por você.</h2>
          </div>
          <div className="deliver reveal">
            <div className="dcard">
              <div className="ic">🎯</div>
              <h3>Design sob medida</h3>
              <p>
                Nada de template genérico. Visual profissional com a cara da sua
                empresa, feito pra passar confiança na hora.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">📱</div>
              <h3>Perfeito no celular</h3>
              <p>
                90% dos seus clientes acessam pelo celular. Seu site abre rápido
                e bonito em qualquer tela.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">🔍</div>
              <h3>Achado no Google</h3>
              <p>
                Otimizado pra SEO desde o primeiro dia, pra quem procura seu
                serviço encontrar você.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">💬</div>
              <h3>Botão de WhatsApp</h3>
              <p>
                Visitante vira conversa com um toque. Cada acesso é uma chance
                real de venda.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">⚡</div>
              <h3>Rápido de verdade</h3>
              <p>
                Site leve que carrega em segundos — Google adora e cliente não
                desiste de esperar.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">🛠️</div>
              <h3>Pronto pra crescer</h3>
              <p>
                Hoje um site institucional; amanhã loja virtual ou sistema. A
                base já fica preparada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="block" id="preco" style={{ paddingTop: 0 }}>
        <div className="wrap reveal">
          <div className="kicker">Preço fechado</div>
          <h2>Sem orçamento enrolado. Você já sabe quanto vai pagar.</h2>
          <div className="price-wrap">
            <div style={{ position: "relative", zIndex: 1 }}>
              <p className="price-tag">
                Site profissional completo
                <span className="num">
                  <small>a partir de R$</small> 997
                </span>
                em até 12x no cartão.
              </p>
              <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 14 }}>
                Domínio, hospedagem do 1º mês, design, SEO e botão de WhatsApp —
                tudo incluso. Sem letra miúda.
              </p>
            </div>
            <div className="mrr-box">
              <span className="tag">↑ E depois? (opcional)</span>
              <div className="mrr-num">
                + R$ 297
                <span style={{ fontSize: 15, color: "var(--muted)" }}>
                  /mês · opcional
                </span>
              </div>
              <p>
                Plano de manutenção opcional: hospedagem, segurança, atualizações
                e pequenos ajustes sempre que precisar. Seu site sempre no ar,
                você só cuida do negócio.
              </p>
            </div>
          </div>
          <div className="express-bar">
            <div className="express-left">
              <span className="express-badge">⚡ EXPRESS</span>
              <div>
                <strong>Com pressa? Seu site no ar em 3 dias.</strong>
                <p>
                  Fura a fila e recebe seu site em até 3 dias úteis após o
                  briefing.
                </p>
              </div>
            </div>
            <div className="express-price">
              + R$ 497<span>adicional único</span>
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: 22,
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            *Valores de referência. O preço final fechado é confirmado na
            conversa, conforme o escopo do seu site. O prazo (padrão ou Express)
            começa a contar a partir da entrega do material no briefing.
          </p>
        </div>
      </section>

      {/* PROOF / TABILIZE */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap reveal">
          <div className="proof">
            <div className="badge">🏗️</div>
            <div>
              <blockquote>
                Não montamos só sites. Construímos software de verdade — incluindo
                o <span className="accent">Tabilize</span>, um sistema completo no
                ar usado por empresas todo dia.
              </blockquote>
              <cite>
                É essa engenharia que entra no seu site. Você não contrata um
                freelancer sumido — contrata quem desenvolve sistemas que rodam de
                verdade.
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <div className="kicker">Simples do começo ao fim</div>
            <h2>Em 3 passos você tá no ar.</h2>
          </div>
          <div className="steps reveal">
            <div className="step">
              <h3>Conversa rápida</h3>
              <p>
                Você me conta sobre o negócio no WhatsApp. Em minutos eu entendo o
                que você precisa e fecho preço e prazo.
              </p>
            </div>
            <div className="step">
              <h3>Eu construo</h3>
              <p>
                Você manda logo, textos e fotos (ou eu te ajudo a montar). Em até
                7 dias seu site fica pronto pra revisar.
              </p>
            </div>
            <div className="step">
              <h3>No ar</h3>
              <p>
                Ajustes finais, publicação e seu site oficialmente vivo — com
                botão de WhatsApp pronto pra vender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap reveal" style={{ maxWidth: 760 }}>
          <div className="kicker">Perguntas rápidas</div>
          <h2 style={{ marginBottom: 30 }}>Tira a dúvida e bora.</h2>
          <details>
            <summary>Em quanto tempo meu site fica pronto?</summary>
            <p>
              Em até 7 dias úteis depois que você me passar o material (logo,
              textos e fotos). Tem pressa? Com o <strong>Express (+R$ 497)</strong>{" "}
              seu site fica pronto em até 3 dias úteis. Se ainda não tiver o
              material, eu te oriento o que mandar.
            </p>
          </details>
          <details>
            <summary>
              Esse preço é o final mesmo? Vai aparecer taxa escondida?
            </summary>
            <p>
              O preço a partir de R$ 997 cobre o site institucional completo. O
              valor fechado depende do escopo (quantas páginas, funções) e é
              confirmado na conversa, antes de qualquer coisa. Sem surpresa.
            </p>
          </details>
          <details>
            <summary>Preciso pagar mensalidade?</summary>
            <p>
              Não é obrigatório. O plano de manutenção de R$ 297/mês é opcional,
              pra quem quer o site sempre atualizado, seguro e no ar sem se
              preocupar. Você decide.
            </p>
          </details>
          <details>
            <summary>E se eu quiser vender online depois (loja virtual)?</summary>
            <p>
              Tranquilo. Eu já deixo a base preparada e a gente evolui pra loja
              virtual ou até um sistema sob medida quando você quiser.
            </p>
          </details>
          <details>
            <summary>Com quem eu vou falar?</summary>
            <p>
              Direto comigo, que desenvolvo. Nada de atendente que não entende
              nada e some. Suporte de verdade.
            </p>
          </details>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="block" id="contato" style={{ paddingTop: 0 }}>
        <div className="wrap reveal">
          <div className="cta-final">
            <div className="kicker" style={{ position: "relative" }}>
              Vagas limitadas este mês
            </div>
            <h2>Bora colocar sua empresa no ar?</h2>
            <p className="sub" style={{ margin: "10px auto 0" }}>
              Preenche aqui que eu te chamo no WhatsApp com o preço fechado do seu
              site.
            </p>
            <div className="form">
              <label htmlFor="nome">Seu nome</label>
              <input
                id="nome"
                type="text"
                placeholder="Como posso te chamar?"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <label htmlFor="tel">Seu WhatsApp</label>
              <input
                id="tel"
                type="tel"
                inputMode="numeric"
                placeholder="(69) 9 9999-9999"
                value={tel}
                onChange={(e) => setTel(maskTel(e.target.value))}
              />
              <label htmlFor="ramo">Qual seu ramo?</label>
              <select
                id="ramo"
                value={ramo}
                onChange={(e) => setRamo(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option>Comércio / loja</option>
                <option>Serviços</option>
                <option>Restaurante / alimentação</option>
                <option>Saúde / clínica</option>
                <option>Outro</option>
              </select>
              <button
                className="btn btn-primary"
                onClick={goWpp}
                disabled={submitting}
              >
                <WppIcon />
                {submitting ? "Abrindo WhatsApp…" : "Chamar no WhatsApp agora"}
              </button>
              <p className="form-note">Resposta no mesmo dia. Sem compromisso.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <Image
            src="/images/logo-devdesk-icon-coral.png"
            alt="DevDeskTech"
            width={115}
            height={26}
            className="footer-mark"
          />
          <div className="logo">
            DevDesk<span className="tech">Tech</span>
          </div>
          <p>
            Sites, lojas virtuais e sistemas sob medida · Porto Velho, RO
            <br />© 2026 DevDesk. Tecnologia que trabalha por você.
            <br />
            <a href="/privacidade">Política de Privacidade</a>
          </p>
        </div>
      </footer>

      <div className="sticky-cta">
        <a href="#contato" className="btn btn-primary" onClick={goWpp}>
          <WppIcon />
          Quero meu site em 7 dias
        </a>
      </div>
    </div>
  );
}
