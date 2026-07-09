"use client";

import { useState } from "react";

const WA =
  "https://wa.me/5569999200176?text=" +
  encodeURIComponent("Olá! Gostaria de uma avaliação gratuita sobre o BPC/LOAS.");

const erros = [
  { n: "1", t: "Renda declarada acima do limite", d: "Sem excluir gastos com saúde, medicamentos ou outro benefício da família, o cálculo fica errado." },
  { n: "2", t: "Laudo médico frágil", d: "Documentação que não comprova o impedimento de longo prazo derruba o pedido logo na análise." },
  { n: "3", t: "Erro no CadÚnico", d: "Cadastro desatualizado ou com dados divergentes é uma das maiores causas de indeferimento." },
  { n: "4", t: "Perícia mal preparada", d: "Chegar à perícia do INSS sem orientação pode custar o benefício de quem realmente tem direito." },
  { n: "5", t: "Composição familiar incorreta", d: "Quem entra ou não no grupo familiar muda toda a conta da renda per capita." },
  { n: "6", t: "Desistir após a negativa", d: "Muita gente não sabe que pode recorrer ou entrar na Justiça — e abandona um direito legítimo." },
];

const steps = [
  { n: "01", t: "Análise gratuita", d: "Você conta a sua situação e avaliamos, sem custo, se há direito ao benefício." },
  { n: "02", t: "Organização dos documentos", d: "Orientamos exatamente o que reunir para fortalecer o seu pedido." },
  { n: "03", t: "Pedido ou recurso", d: "Entramos com o requerimento, o recurso ou a ação judicial adequada ao seu caso." },
  { n: "04", t: "Acompanhamento", d: "Você é informado de cada etapa até a decisão final — sem juridiquês." },
];

const depoimentos = [
  { i: "M", n: "Maria S.", c: "Beneficiária · idosa 65+", q: "Meu pedido tinha sido negado. O escritório reuniu tudo de novo e hoje recebo meu benefício." },
  { i: "J", n: "João P.", c: "Familiar cuidador", q: "Explicaram cada passo com paciência. Senti que meu pai estava em boas mãos." },
  { i: "A", n: "Ana R.", c: "Beneficiária · PcD", q: "Achei que não tinha mais o que fazer. Fui muito bem orientada do começo ao fim." },
];

const faqData = [
  { q: "Preciso ter contribuído para o INSS?", a: "Não. O BPC/LOAS é um benefício assistencial: não exige contribuição prévia. Ele é garantido a idosos 65+ e a pessoas com deficiência de baixa renda que cumpram os requisitos." },
  { q: "Meu pedido foi negado. Ainda posso conseguir?", a: "Sim. Uma negativa não é o fim. É possível recorrer administrativamente ou ingressar com ação judicial. Muitas negativas ocorrem por falhas que podem ser corrigidas." },
  { q: "Quanto vou receber?", a: "O BPC/LOAS corresponde a 1 salário mínimo por mês. Não gera 13º salário nem deixa pensão por morte, por ser um benefício assistencial." },
  { q: "Qual é o limite de renda da família?", a: "Em regra, a renda mensal por pessoa da família deve ser inferior a 1/4 do salário mínimo. Há situações que permitem flexibilizar esse critério — por isso cada caso merece análise." },
  { q: "O atendimento é presencial?", a: "O atendimento é 100% online e feito em todo o Brasil, com segurança e sigilo. Você resolve tudo pelo WhatsApp, sem sair de casa." },
  { q: "Quanto custa começar?", a: "A avaliação inicial do seu caso é gratuita e sem compromisso. As condições de honorários são explicadas com total transparência antes de qualquer passo." },
];

export default function BpcLoas() {
  const [openFaq, setOpenFaq] = useState(-1);
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");
  const [perfil, setPerfil] = useState("Sou idoso(a) 65+");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      `Olá! Meu nome é ${nome || "(não informado)"}.`,
      `Perfil: ${perfil}.`,
      tel ? `Telefone: ${tel}.` : "",
      msg || "Gostaria de uma avaliação gratuita sobre o BPC/LOAS.",
    ]
      .filter(Boolean)
      .join(" ");
    window.open(
      `https://wa.me/5569999200176?text=${encodeURIComponent(parts)}`,
      "_blank"
    );
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        #ak-bpc *{box-sizing:border-box}
        #ak-bpc ::selection{background:#b18f5d;color:#16233f}
        #ak-bpc a{color:#b18f5d;text-decoration:none}
        #ak-bpc a:hover{color:#16233f}
        #ak-bpc html{scroll-behavior:smooth}
        #ak-bpc body{margin:0;-webkit-font-smoothing:antialiased}
        #ak-bpc input,#ak-bpc textarea{font-family:'Jost',sans-serif}
        #ak-bpc .ak-faq-btn{cursor:pointer;transition:background .2s}
        #ak-bpc .ak-faq-btn:hover{background:#faf6ee}
        @keyframes lbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes lbPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
        #ak-bpc .ak-faq-answer{animation:akFadeIn .25s ease both}
        @keyframes akFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){
          #ak-bpc .ak-hero-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-err-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-steps-grid{grid-template-columns:1fr 1fr !important}
          #ak-bpc .ak-dep-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-sobre-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-footer-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-avaliacao-grid{grid-template-columns:1fr !important}
          #ak-bpc .ak-nav-links{display:none !important}
        }
        @media(max-width:480px){
          #ak-bpc .ak-steps-grid{grid-template-columns:1fr !important}
        }
      `}</style>
      <div id="ak-bpc" style={{ maxWidth: "100%", overflowX: "hidden", background: "#f5f0e6", color: "#16233f" }}>
        {/* HEADER */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(22,35,63,.96)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(177,143,93,.35)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: 6,
                  color: "#f5f0e6",
                }}
              >
                LEBKUCHEN
              </span>
              <span
                style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 9,
                  letterSpacing: 5,
                  color: "#b18f5d",
                  marginTop: 5,
                }}
              >
                ADVOGADOS ASSOCIADOS
              </span>
            </div>
            <nav className="ak-nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <a href="#direito" style={{ color: "#d9d2c3", fontSize: 14, letterSpacing: ".5px" }}>
                Quem tem direito
              </a>
              <a href="#ajuda" style={{ color: "#d9d2c3", fontSize: 14, letterSpacing: ".5px" }}>
                Como ajudamos
              </a>
              <a href="#faq" style={{ color: "#d9d2c3", fontSize: 14, letterSpacing: ".5px" }}>
                Dúvidas
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noopener"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25d366",
                  color: "#0a2e17",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "11px 20px",
                  borderRadius: 999,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.7-.9 2.7.1 1.3.9 2.6 1.1 2.8.2.2 2.2 3.5 5.4 4.8 2 .8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.4z" />
                </svg>
                Fale agora
              </a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section
          style={{
            background: "#16233f",
            backgroundImage: "radial-gradient(1200px 600px at 85% -10%,rgba(177,143,93,.22),transparent 60%)",
            color: "#f5f0e6",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="ak-hero-grid"
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "64px 28px 0",
              display: "grid",
              gridTemplateColumns: "1.05fr .95fr",
              gap: 40,
              alignItems: "start",
            }}
          >
            <div style={{ paddingBottom: 72 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid rgba(177,143,93,.5)",
                  borderRadius: 999,
                  padding: "7px 16px",
                  marginBottom: 26,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b18f5d" }} />
                <span style={{ fontSize: 11, letterSpacing: 3, color: "#d9c9ac" }}>
                  ADVOCACIA PREVIDENCIÁRIA · BPC / LOAS
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(24px,3vw,34px)",
                  color: "#d9c9ac",
                  margin: "0 0 6px",
                }}
              >
                Teve o benefício negado?
              </p>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px,5.4vw,68px)",
                  lineHeight: 1.02,
                  margin: "0 0 22px",
                  letterSpacing: ".5px",
                }}
              >
                Você ainda<br />
                pode ter <span style={{ fontStyle: "italic", color: "#e6d3b0" }}>direito.</span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(16px,1.4vw,19px)",
                  lineHeight: 1.6,
                  color: "#cbd3e0",
                  maxWidth: 480,
                  margin: "0 0 32px",
                }}
              >
                Analiso o seu caso <strong style={{ color: "#f5f0e6" }}>gratuitamente</strong> e mostro o caminho
                para conquistar o BPC/LOAS — o benefício de 1 salário mínimo para{" "}
                <strong style={{ color: "#f5f0e6" }}>idosos 65+</strong> e{" "}
                <strong style={{ color: "#f5f0e6" }}>pessoas com deficiência</strong> de baixa renda.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#25d366",
                    color: "#0a2e17",
                    fontWeight: 600,
                    fontSize: 16,
                    padding: "16px 28px",
                    borderRadius: 999,
                    boxShadow: "0 12px 30px rgba(37,211,102,.28)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.7-.9 2.7.1 1.3.9 2.6 1.1 2.8.2.2 2.2 3.5 5.4 4.8 2 .8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.4z" />
                  </svg>
                  Falar com o advogado
                </a>
                <a
                  href="#avaliacao"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#f5f0e6",
                    fontWeight: 500,
                    fontSize: 16,
                    padding: "16px 26px",
                    borderRadius: 999,
                    border: "1px solid rgba(245,240,230,.35)",
                  }}
                >
                  Avaliar meu caso grátis
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 22,
                  marginTop: 34,
                  paddingTop: 26,
                  borderTop: "1px solid rgba(245,240,230,.14)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "#cbd3e0" }}>
                  <span style={{ color: "#b18f5d" }}>✓</span> Atendimento 100% online
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "#cbd3e0" }}>
                  <span style={{ color: "#b18f5d" }}>✓</span> Todo o Brasil
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "#cbd3e0" }}>
                  <span style={{ color: "#b18f5d" }}>✓</span> Sem pagar nada para começar
                </div>
              </div>
            </div>
            <div style={{ position: "relative", alignSelf: "start" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "34px 0 0 12px",
                  border: "1px solid rgba(177,143,93,.55)",
                  borderRadius: "260px 260px 18px 18px",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "250px 250px 12px 12px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,.4)",
                }}
              >
                <img
                  src="/demo/adv-kelvyn/lp/kelvyn.jpg"
                  alt="Kelvyn Lebkuchen, advogado"
                  style={{ display: "block", width: "100%", height: 560, objectFit: "cover", objectPosition: "50% 18%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top,rgba(22,35,63,.55),transparent 42%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: -14,
                  bottom: 26,
                  zIndex: 2,
                  background: "#f5f0e6",
                  color: "#16233f",
                  borderRadius: 12,
                  padding: "14px 18px",
                  boxShadow: "0 16px 34px rgba(0,0,0,.28)",
                }}
              >
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 17 }}>
                  Dr. Kelvyn Lebkuchen
                </div>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#b18f5d", marginTop: 2 }}>
                  ADVOGADO · DIREITO PREVIDENCIÁRIO
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUEM TEM DIREITO */}
        <section id="direito" style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 28px 20px" }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>O QUE É O BPC / LOAS</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 600,
                fontSize: "clamp(30px,3.6vw,44px)",
                lineHeight: 1.1,
                margin: "14px 0 16px",
              }}
            >
              Um direito de quem<br />
              mais precisa
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#4c5563", margin: 0 }}>
              O <strong>Benefício de Prestação Continuada (BPC/LOAS)</strong> garante{" "}
              <strong>1 salário mínimo por mês</strong> a quem não tem como se sustentar. Não exige contribuição
              ao INSS — mas exige atenção aos detalhes. Veja quem pode receber:
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "#fff", border: "1px solid #e6ddca", borderRadius: 18, padding: 34 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: "#16233f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 18,
                }}
              >
                🧓
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: "0 0 10px" }}>
                Idosos com 65 anos ou mais
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#4c5563", margin: 0 }}>
                Pessoas idosas de baixa renda, sem condições de prover o próprio sustento nem de tê-lo provido pela
                família.
              </p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e6ddca", borderRadius: 18, padding: 34 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: "#16233f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 18,
                }}
              >
                ♿
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 24, margin: "0 0 10px" }}>
                Pessoas com deficiência
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#4c5563", margin: 0 }}>
                De qualquer idade, com impedimento de longo prazo (físico, mental, intelectual ou sensorial) que
                dificulte a participação plena na sociedade.
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              background: "#16233f",
              color: "#f5f0e6",
              borderRadius: 18,
              padding: "30px 34px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
              justifyContent: "space-between",
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 22, color: "#e6d3b0", marginBottom: 6 }}>
                Critério de renda
              </div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#cbd3e0" }}>
                Em regra, a renda por pessoa da família deve ser inferior a{" "}
                <strong style={{ color: "#f5f0e6" }}>1/4 do salário mínimo</strong>. Mas há exceções — cada caso
                merece uma análise cuidadosa.
              </p>
            </div>
            <a
              href={WA}
              target="_blank"
              rel="noopener"
              style={{
                whiteSpace: "nowrap",
                background: "#b18f5d",
                color: "#16233f",
                fontWeight: 600,
                padding: "14px 24px",
                borderRadius: 999,
              }}
            >
              Será que eu tenho direito?
            </a>
          </div>
        </section>

        {/* ERROS COMUNS */}
        <section style={{ background: "#efe7d6", marginTop: 70 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 28px" }}>
            <div style={{ maxWidth: 680, marginBottom: 44 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>
                POR QUE TANTOS PEDIDOS SÃO NEGADOS
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px,3.4vw,42px)",
                  lineHeight: 1.1,
                  margin: "14px 0 12px",
                }}
              >
                Erros que fazem o INSS negar o benefício
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "#4c5563", margin: 0 }}>
                Ter direito não basta: é preciso provar. A maioria dos indeferimentos acontece por falhas evitáveis.
                Um pedido negado <strong>não é o fim</strong> — pode ser revisto ou levado à Justiça.
              </p>
            </div>
            <div className="ak-err-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {erros.map((e) => (
                <div
                  key={e.n}
                  style={{ background: "#fff", borderRadius: 16, padding: 26, border: "1px solid #e6ddca" }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "#16233f",
                      color: "#e6d3b0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 600,
                      fontSize: 16,
                      marginBottom: 14,
                    }}
                  >
                    {e.n}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 7px", color: "#16233f" }}>{e.t}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#5a6270", margin: 0 }}>{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO AJUDAMOS */}
        <section id="ajuda" style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 28px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>COMO O ESCRITÓRIO AJUDA</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 600,
                fontSize: "clamp(30px,3.6vw,44px)",
                lineHeight: 1.1,
                margin: "14px 0 12px",
              }}
            >
              Do primeiro contato<br />
              à conquista do benefício
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#4c5563", margin: 0 }}>
              Um acompanhamento próximo, humano e sem juridiquês. Você entende cada passo.
            </p>
          </div>
          <div className="ak-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {steps.map((s) => (
              <div key={s.n} style={{ position: "relative", paddingTop: 14 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#e0d3b6",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 20, margin: "10px 0 8px" }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#5a6270", margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOBRE */}
        <section style={{ background: "#16233f", color: "#f5f0e6" }}>
          <div
            className="ak-sobre-grid"
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "80px 28px",
              display: "grid",
              gridTemplateColumns: ".85fr 1.15fr",
              gap: 52,
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "18px -14px -14px 18px",
                  border: "1px solid rgba(177,143,93,.5)",
                  borderRadius: 16,
                }}
              />
              <img
                src="/demo/adv-kelvyn/lp/kelvyn.jpg"
                alt="Dr. Kelvyn Lebkuchen"
                style={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  height: 470,
                  objectFit: "cover",
                  objectPosition: "50% 22%",
                  borderRadius: 16,
                  boxShadow: "0 24px 50px rgba(0,0,0,.4)",
                }}
              />
            </div>
            <div>
              <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>SOBRE O ADVOGADO</span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: "clamp(30px,3.6vw,42px)",
                  lineHeight: 1.1,
                  margin: "14px 0 18px",
                }}
              >
                Dr. Kelvyn Lebkuchen
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#cbd3e0", margin: "0 0 16px" }}>
                Dedico minha atuação ao Direito Previdenciário porque acredito que, por trás de cada processo, existe
                uma <em style={{ color: "#e6d3b0", fontStyle: "italic" }}>família e uma história de trabalho</em>. Meu
                compromisso é tratar o seu caso com o cuidado que ele merece — com clareza, atenção e transparência do
                início ao fim.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#cbd3e0", margin: "0 0 26px" }}>
                À frente do <strong style={{ color: "#f5f0e6" }}>Lebkuchen Advogados Associados</strong>, atuo na
                concessão, revisão e recurso do BPC/LOAS, orientando cada cliente sobre o melhor caminho para o seu
                direito.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#25d366",
                    color: "#0a2e17",
                    fontWeight: 600,
                    padding: "15px 26px",
                    borderRadius: 999,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.7-.9 2.7.1 1.3.9 2.6 1.1 2.8.2.2 2.2 3.5 5.4 4.8 2 .8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.4z" />
                  </svg>
                  Conversar com o Dr. Kelvyn
                </a>
                <span style={{ fontSize: 13, letterSpacing: 2, color: "#8f9bb3" }}>OAB/RO</span>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section style={{ maxWidth: 1180, margin: "0 auto", padding: "84px 28px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
            <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>QUEM JÁ FOI ATENDIDO</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 600,
                fontSize: "clamp(28px,3.4vw,42px)",
                lineHeight: 1.1,
                margin: "14px 0 0",
              }}
            >
              Histórias que voltaram a ter tranquilidade
            </h2>
          </div>
          <div className="ak-dep-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {depoimentos.map((d) => (
              <div
                key={d.i}
                style={{
                  background: "#fff",
                  border: "1px solid #e6ddca",
                  borderRadius: 16,
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ color: "#b18f5d", fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "#2b3550",
                    margin: 0,
                  }}
                >
                  &ldquo;{d.q}&rdquo;
                </p>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#efe7d6",
                      color: "#16233f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 600,
                    }}
                  >
                    {d.i}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: "#16233f" }}>{d.n}</div>
                    <div style={{ fontSize: 12.5, color: "#8a8372" }}>{d.c}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12.5, color: "#a39d8c", margin: "26px 0 0" }}>
            Depoimentos ilustrativos — serão substituídos pelos relatos reais dos clientes.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ background: "#efe7d6" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "84px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>DÚVIDAS FREQUENTES</span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px,3.4vw,42px)",
                  lineHeight: 1.1,
                  margin: "14px 0 0",
                }}
              >
                Perguntas que todo mundo faz
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqData.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    style={{ background: "#fff", border: "1px solid #e6ddca", borderRadius: 14, overflow: "hidden" }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="ak-faq-btn"
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "22px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        fontFamily: "'Jost',sans-serif",
                        fontSize: 17,
                        fontWeight: 500,
                        color: "#16233f",
                      }}
                    >
                      <span>{f.q}</span>
                      <span
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: 24,
                          color: "#b18f5d",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        className="ak-faq-answer"
                        style={{ padding: "0 24px 24px", fontSize: 15.5, lineHeight: 1.65, color: "#4c5563" }}
                      >
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AVALIAÇÃO / FORM */}
        <section
          id="avaliacao"
          style={{
            background: "#16233f",
            color: "#f5f0e6",
            backgroundImage: "radial-gradient(900px 500px at 15% 120%,rgba(177,143,93,.2),transparent 60%)",
          }}
        >
          <div
            className="ak-avaliacao-grid"
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "84px 28px",
              display: "grid",
              gridTemplateColumns: "1fr .95fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: 12, letterSpacing: 4, color: "#b18f5d" }}>AVALIAÇÃO GRATUITA</span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: "clamp(30px,3.8vw,48px)",
                  lineHeight: 1.08,
                  margin: "14px 0 18px",
                }}
              >
                Descubra em minutos<br />
                se você tem <span style={{ fontStyle: "italic", color: "#e6d3b0" }}>direito</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "#cbd3e0", maxWidth: 440, margin: "0 0 26px" }}>
                Preencha seus dados e receba uma primeira orientação diretamente no WhatsApp. Sem compromisso e sem
                custo para começar.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#e5e9f0" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(177,143,93,.2)",
                      color: "#e6d3b0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓
                  </span>
                  Resposta rápida e humana
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#e5e9f0" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(177,143,93,.2)",
                      color: "#e6d3b0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓
                  </span>
                  Sigilo total sobre o seu caso
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#e5e9f0" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(177,143,93,.2)",
                      color: "#e6d3b0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓
                  </span>
                  Atendimento em todo o Brasil
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#f5f0e6",
                borderRadius: 20,
                padding: 34,
                boxShadow: "0 30px 60px rgba(0,0,0,.35)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 600,
                  fontSize: 22,
                  color: "#16233f",
                  marginBottom: 20,
                }}
              >
                Fale com o escritório
              </div>
              <label style={{ display: "block", fontSize: 13, color: "#5a6270", marginBottom: 6 }}>Seu nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como podemos te chamar?"
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  border: "1px solid #d8cdb4",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 15,
                  color: "#16233f",
                  marginBottom: 16,
                  outline: "none",
                }}
              />
              <label style={{ display: "block", fontSize: 13, color: "#5a6270", marginBottom: 6 }}>
                WhatsApp / Telefone
              </label>
              <input
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="(00) 00000-0000"
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  border: "1px solid #d8cdb4",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 15,
                  color: "#16233f",
                  marginBottom: 16,
                  outline: "none",
                }}
              />
              <label style={{ display: "block", fontSize: 13, color: "#5a6270", marginBottom: 6 }}>Seu perfil</label>
              <select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  border: "1px solid #d8cdb4",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 15,
                  color: "#16233f",
                  marginBottom: 16,
                  outline: "none",
                }}
              >
                <option>Sou idoso(a) 65+</option>
                <option>Sou pessoa com deficiência</option>
                <option>Cuido de um familiar</option>
                <option>Meu pedido foi negado</option>
                <option>Outro</option>
              </select>
              <label style={{ display: "block", fontSize: 13, color: "#5a6270", marginBottom: 6 }}>
                Conte um pouco (opcional)
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Descreva sua situação..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  border: "1px solid #d8cdb4",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 15,
                  color: "#16233f",
                  marginBottom: 20,
                  outline: "none",
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: "#25d366",
                  color: "#0a2e17",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: 16,
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontFamily: "'Jost',sans-serif",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.7-.9 2.7.1 1.3.9 2.6 1.1 2.8.2.2 2.2 3.5 5.4 4.8 2 .8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.4z" />
                </svg>
                Enviar pelo WhatsApp
              </button>
              <p style={{ fontSize: 12, color: "#8a8372", textAlign: "center", margin: "14px 0 0" }}>
                Ao enviar, você será direcionado ao WhatsApp do escritório.
              </p>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#101a30", color: "#9aa5bd" }}>
          <div
            className="ak-footer-grid"
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "56px 28px 30px",
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr",
              gap: 36,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 22, letterSpacing: 5, color: "#f5f0e6" }}>
                LEBKUCHEN
              </div>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "#b18f5d", marginTop: 5 }}>
                ADVOGADOS ASSOCIADOS
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: "18px 0 0", maxWidth: 320 }}>
                Advocacia previdenciária dedicada ao BPC/LOAS. Cuidamos do seu caso como se fosse da nossa própria
                família.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e6d3b0", marginBottom: 14 }}>CONTATO</div>
              <div style={{ fontSize: 14.5, lineHeight: 2 }}>
                <div>WhatsApp: (69) 99920-0176</div>
                <div>E-mail: kelvynlebkuchen@gmail.com</div>
                <div>Atendimento online — todo o Brasil</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e6d3b0", marginBottom: 14 }}>NAVEGAÇÃO</div>
              <div style={{ fontSize: 14.5, lineHeight: 2, display: "flex", flexDirection: "column" }}>
                <a href="#direito" style={{ color: "#9aa5bd" }}>
                  Quem tem direito
                </a>
                <a href="#ajuda" style={{ color: "#9aa5bd" }}>
                  Como ajudamos
                </a>
                <a href="#faq" style={{ color: "#9aa5bd" }}>
                  Dúvidas frequentes
                </a>
                <a href="#avaliacao" style={{ color: "#9aa5bd" }}>
                  Avaliação gratuita
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "20px 28px 44px",
              borderTop: "1px solid rgba(255,255,255,.08)",
              fontSize: 11.5,
              lineHeight: 1.6,
              color: "#6d778f",
            }}
          >
            © 2026 Lebkuchen Advogados Associados · OAB/RO. Conteúdo de caráter meramente informativo, em
            conformidade com o Código de Ética e Disciplina da OAB. Não há promessa de resultado; cada caso é
            analisado individualmente.
          </div>
        </footer>

        {/* FLOATING WHATSAPP */}
        <a
          href={WA}
          target="_blank"
          rel="noopener"
          aria-label="Falar no WhatsApp"
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            zIndex: 60,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25d366",
            color: "#0a2e17",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 28px rgba(37,211,102,.4)",
            animation: "lbFloat 3.5s ease-in-out infinite, lbPulse 2.6s infinite",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm0 18.13c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
          </svg>
        </a>
      </div>
    </>
  );
}
