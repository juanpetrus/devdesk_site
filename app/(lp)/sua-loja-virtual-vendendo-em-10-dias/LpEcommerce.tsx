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

export default function LpEcommerce() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [ramo, setRamo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goWpp(e: React.MouseEvent) {
    e.preventDefault();
    if (submitting) return; // anti duplo-clique
    let msg = "Olá! Vim pela página e quero um orçamento de loja virtual.";
    if (nome) msg += ` Meu nome é ${nome}.`;
    if (ramo) msg += ` Vendo: ${ramo}.`;
    if (tel) msg += ` Meu WhatsApp: ${tel}.`;
    const temLead = !!(nome || tel);
    if (temLead) {
      const distinctId = tel || nome;
      posthog.identify(distinctId, { name: nome, phone: tel, ramo });
      posthog.capture("lead_submitted", {
        source: "lp-loja-virtual-10-dias",
        has_nome: !!nome,
        has_tel: !!tel,
        has_ramo: !!ramo,
        ramo,
      });
      gtagEvent("generate_lead", { source: "lp-loja-virtual-10-dias" });
      saveLead({
        nome,
        tel,
        ramo,
        origem: "lp-loja-virtual-10-dias",
        ...getTracking(),
      });
    } else {
      posthog.capture("whatsapp_cta_clicked", {
        source: "lp-loja-virtual-10-dias",
      });
      gtagEvent("whatsapp_cta_clicked", { source: "lp-loja-virtual-10-dias" });
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
            DevDesk
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
              Sua loja virtual{" "}
              <span className="hl accent">vendendo 24h por dia.</span>
            </h1>
            <p className="lede">
              Pare de depender do balcão e de responder venda no WhatsApp na mão.
              Uma loja profissional, com pagamento e frete configurados, no ar em
              até 10 dias — por quem constrói sistema de verdade.
            </p>
            <div className="hero-cta">
              <a href="#contato" className="btn btn-primary" onClick={goWpp}>
                <WppIcon />
                Quero minha loja
              </a>
              <a href="#preco" className="btn btn-ghost">
                Ver preço ↓
              </a>
            </div>
            <div className="trust-line">
              <span>
                <span className="check">✓</span> Pagamento e frete já configurados
              </span>
              <span>
                <span className="check">✓</span> Você gerencia sozinho
              </span>
              <span>
                <span className="check">✓</span> No ar em até 10 dias
              </span>
            </div>
          </div>
          <div className="reveal in" style={{ transitionDelay: ".15s" }}>
            <div className="hero-card">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span className="browser-url">sualoja.com.br</span>
              </div>
              <div className="shop-top">
                <div className="shop-logo" />
                <div className="cart-badge">
                  🛒 <b>3</b> · R$ 289
                </div>
              </div>
              <div className="prod-grid">
                <div className="prod">
                  <div className="img" />
                  <div className="price">R$ 89,90</div>
                  <div className="buy" />
                </div>
                <div className="prod">
                  <div className="img" />
                  <div className="price">R$ 129,90</div>
                  <div className="buy" />
                </div>
                <div className="prod">
                  <div className="img" />
                  <div className="price">R$ 59,90</div>
                  <div className="buy" />
                </div>
                <div className="prod">
                  <div className="img" />
                  <div className="price">R$ 199,90</div>
                  <div className="buy" />
                </div>
              </div>
              <div className="floating-tag">vendendo 24h ⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div className="strip">
        <div className="wrap">
          <div className="strip-grid">
            <div className="strip-item">
              <div className="big">24h</div>
              <div className="lbl">sua loja vende até dormindo</div>
            </div>
            <div className="strip-item">
              <div className="big">Pix + cartão</div>
              <div className="lbl">pagamento direto na sua conta</div>
            </div>
            <div className="strip-item">
              <div className="big">Brasil todo</div>
              <div className="lbl">venda além da sua cidade</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="block">
        <div className="wrap">
          <div className="reveal">
            <div className="kicker">A real é essa</div>
            <h2>Você só vende quando tá de plantão no WhatsApp?</h2>
            <p className="sub">
              Toda venda que depende de você responder na hora é uma venda que
              escorre.
            </p>
          </div>
          <div className="prob-grid reveal">
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Vende só pelo balcão ou pela cidade</strong> — e perde
                quem compraria de outro lugar.
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Cada pedido é você na mão:</strong> manda foto, calcula
                frete, passa Pix, confere comprovante.
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>De madrugada e no fim de semana</strong> você perde venda
                porque não tem ninguém pra responder.
              </p>
            </div>
            <div className="prob">
              <span className="x">✕</span>
              <p>
                <strong>Seu concorrente já tem loja</strong> e vende no automático
                enquanto você corre atrás.
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
            <h2>Uma loja que vende sozinha.</h2>
          </div>
          <div className="deliver reveal">
            <div className="dcard">
              <div className="ic">🏪</div>
              <h3>Loja profissional</h3>
              <p>
                Design sob medida com a cara da sua marca, em plataforma sólida
                (Yampi/Shopify). Nada de gambiarra.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">💳</div>
              <h3>Pagamento que converte</h3>
              <p>
                Pix, cartão e boleto configurados, caindo direto na sua conta.
                Checkout rápido pra não perder venda.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">📦</div>
              <h3>Frete automático</h3>
              <p>
                Correios e transportadoras integrados: o cliente vê o valor do
                frete na hora, sem você calcular nada.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">🏷️</div>
              <h3>Produtos cadastrados</h3>
              <p>
                Cadastro inicial dos seus produtos já feito, com fotos, preços e
                variações organizados.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">📊</div>
              <h3>Painel fácil</h3>
              <p>
                Você gerencia pedidos, estoque e produtos sozinho, sem depender de
                ninguém. E eu te ensino.
              </p>
            </div>
            <div className="dcard">
              <div className="ic">📱</div>
              <h3>Pronta pro celular e Google</h3>
              <p>
                Loja rápida, otimizada pra busca e com botão de WhatsApp pra fechar
                quem ainda tem dúvida.
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
                Loja virtual completa
                <span className="num">
                  <small>a partir de R$</small> 2.900
                </span>
                em até 12x no cartão.
              </p>
              <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 14 }}>
                Design, configuração de pagamento e frete, cadastro inicial de
                produtos e treinamento pra você gerenciar. Tudo incluso.
              </p>
            </div>
            <div className="mrr-box">
              <span className="tag">↑ E depois?</span>
              <div className="mrr-num">
                + R$ 397
                <span style={{ fontSize: 15, color: "var(--muted)" }}>/mês</span>
              </div>
              <p>
                Plano de manutenção opcional: loja sempre no ar, segura e
                atualizada, com suporte e pequenos ajustes sempre que precisar.
                Você cuida das vendas, a gente da tecnologia.
              </p>
            </div>
          </div>
          <div className="express-bar">
            <div className="express-left">
              <span className="express-badge">⚡ EXPRESS</span>
              <div>
                <strong>Com pressa? Sua loja no ar em 5 dias.</strong>
                <p>
                  Fura a fila e recebe a loja pronta em até 5 dias úteis após o
                  briefing.
                </p>
              </div>
            </div>
            <div className="express-price">
              + R$ 697<span>adicional único</span>
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
            *Valores de referência da DevDesk. A plataforma (Yampi/Shopify) pode
            ter taxa própria, que explico na conversa. O prazo conta a partir da
            entrega do material no briefing.
          </p>
        </div>
      </section>

      {/* PROOF / TABILIZE */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap reveal">
          <div className="proof">
            <div className="badge">🛒</div>
            <div>
              <blockquote>
                Não montamos só lojinha de template. Construímos software de
                verdade — incluindo o <span className="accent">Tabilize</span>, um
                sistema completo que roda no mercado todo dia.
              </blockquote>
              <cite>
                É essa engenharia que entra na sua loja. Pagamento, frete e estoque
                configurados pra funcionar de verdade — e suporte de quem não some
                depois.
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
            <h2>Em 3 passos você tá vendendo.</h2>
          </div>
          <div className="steps reveal">
            <div className="step">
              <h3>Conversa rápida</h3>
              <p>
                Você me conta sobre seus produtos no WhatsApp. Eu fecho preço e
                prazo na hora, sem enrolação.
              </p>
            </div>
            <div className="step">
              <h3>Eu construo</h3>
              <p>
                Você manda produtos e fotos (ou eu te ajudo). Monto a loja,
                configuro pagamento, frete e cadastro.
              </p>
            </div>
            <div className="step">
              <h3>Vendendo</h3>
              <p>
                Loja no ar, você recebe pedido e dinheiro no automático. Te ensino
                a gerenciar tudo sozinho.
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
            <summary>Preciso saber mexer com tecnologia?</summary>
            <p>
              Não. Entrego a loja pronta e te ensino a gerenciar pedidos e produtos
              no painel — é mais simples que parece. E com o plano de manutenção,
              ainda fico de retaguarda.
            </p>
          </details>
          <details>
            <summary>Como recebo o dinheiro das vendas?</summary>
            <p>
              Pix, cartão e boleto configurados pra cair direto na sua conta, via
              plataforma. Você acompanha tudo pelo painel.
            </p>
          </details>
          <details>
            <summary>E o frete, como funciona?</summary>
            <p>
              Configuro Correios e/ou transportadora com cálculo automático: o
              cliente já vê o valor do frete no checkout, sem você precisar calcular
              nada na mão.
            </p>
          </details>
          <details>
            <summary>Qual plataforma vocês usam?</summary>
            <p>
              Plataformas consolidadas e seguras como Yampi e Shopify, conforme o
              que faz mais sentido pro seu negócio. Elas podem ter uma taxa própria
              (mensal ou por venda) — explico tudo na conversa, sem pegadinha.
            </p>
          </details>
          <details>
            <summary>Em quanto tempo a loja fica pronta?</summary>
            <p>
              Em até 10 dias úteis depois que você me passar produtos, fotos e
              infos. Tem pressa? Com o <strong>Express (+R$ 697)</strong> fica
              pronta em até 5 dias úteis.
            </p>
          </details>
          <details>
            <summary>Quantos produtos posso cadastrar?</summary>
            <p>
              À vontade. O cadastro inicial de produtos já vem incluso, e você
              adiciona quantos quiser depois pelo painel.
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
            <h2>Bora colocar sua loja pra vender?</h2>
            <p className="sub" style={{ margin: "10px auto 0" }}>
              Preenche aqui que eu te chamo no WhatsApp com o preço fechado da sua
              loja.
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
              <label htmlFor="ramo">O que você vende?</label>
              <select
                id="ramo"
                value={ramo}
                onChange={(e) => setRamo(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option>Roupas / moda / acessórios</option>
                <option>Alimentos / bebidas</option>
                <option>Cosméticos / beleza</option>
                <option>Produtos para casa</option>
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
            alt="DevDesk"
            width={115}
            height={26}
            className="footer-mark"
          />
          <div className="logo">DevDesk</div>
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
          Quero minha loja vendendo
        </a>
      </div>
    </div>
  );
}
