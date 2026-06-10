import Image from "next/image";
import { WaCta } from "./components/WaCta";

// ─── Substitua pelos seus dados ────────────────────────────────────────────
const WHATSAPP = "5569999222517"; // DDI+DDD+número, só dígitos
const WHATSAPP_MSG = "Olá! Vim pelo site e quero um orçamento.";
const EMAIL = "contato.devdesk@gmail.com";
const CIDADE = "Rondônia / RO";
// ───────────────────────────────────────────────────────────────────────────

const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

const servicos = [
  {
    tag: "Site & Landing Page",
    titulo: "Sua empresa encontrada no Google e levada a sério.",
    texto:
      "Site rápido, responsivo e otimizado pra aparecer nas buscas e transformar visitante em cliente. Presença profissional, sem enrolação.",
    preco: "A partir de R$ 997",
    icon: "🌐",
  },
  {
    tag: "Loja Virtual / E-commerce",
    titulo: "Venda online sem depender só do balcão.",
    texto:
      "Loja completa com checkout que converte, cadastro de produtos, pagamento e frete configurados. Sua marca vendendo 24h por dia.",
    preco: "A partir de R$ 1.997",
    icon: "🛒",
  },
  {
    tag: "Sistema Sob Medida",
    titulo: "Pare de fazer no caderno, na planilha e no grito.",
    texto:
      "Sistemas web feitos pra sua operação: controle de clientes, automações, painéis, integrações. Software pensado pro seu processo.",
    preco: "Sob orçamento · a partir de R$ 5.970",
    icon: "⚙️",
  },
  {
    tag: "Plano de Manutenção",
    titulo: "Seu site e sistema sempre no ar, sempre atualizados.",
    texto:
      "Hospedagem, monitoramento, ajustes e melhorias contínuas. Você toca o negócio, a gente cuida da tecnologia.",
    preco: "A partir de R$ 297/mês",
    icon: "🛡️",
  },
];

const passos = [
  {
    n: "1",
    titulo: "Conversa",
    texto: "Você me conta o problema, eu entendo a operação.",
  },
  {
    n: "2",
    titulo: "Proposta",
    texto: "Escopo claro, prazo e valor fechados, sem surpresa.",
  },
  {
    n: "3",
    titulo: "Desenvolvimento",
    texto: "Você acompanha e fala direto comigo, sem intermediário.",
  },
  {
    n: "4",
    titulo: "Entrega + suporte",
    texto: "No ar, funcionando, com manutenção contínua.",
  },
];

const problemas = [
  "Você anota pedido no caderno e controla tudo no WhatsApp.",
  "Seu site (se tem) parece de 2010 — ou nem aparece no Google.",
  "Toda venda online depende de você responder mensagem na mão.",
  "Tarefas repetitivas tomam horas que poderiam ir pro que importa.",
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <Hero />
        <Credibilidade />
        <Problema />
        <Servicos />
        <ComoFunciona />
        <Cases />
        <Sobre />
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFlutuante />
    </div>
  );
}

/* ─────────────────────────────── HEADER ─────────────────────────────── */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#topo" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-devdesk-icon-coral.png"
            alt="DevDesk"
            width={106}
            height={24}
            priority
            className="h-6 w-auto"
          />
          <Logo className="text-xl" />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          <a href="#servicos" className="transition-colors hover:text-white">
            Serviços
          </a>
          <a href="#como-funciona" className="transition-colors hover:text-white">
            Como funciona
          </a>
          <a href="#cases" className="transition-colors hover:text-white">
            Projetos
          </a>
        </nav>

        <WaCta
          href={waLink}
          section="header"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03]"
        >
          Pedir orçamento
        </WaCta>
      </div>
    </header>
  );
}

/* ──────────────────────────────── HERO ──────────────────────────────── */
function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* Imagem de fundo do destaque */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-30"
      />
      {/* Gradiente escuro pra manter o texto legível sobre a imagem */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
          Atendimento direto com quem desenvolve
        </span>

        <h1 className="mt-7 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
          Tecnologia sob medida pra sua empresa parar de{" "}
          <span className="text-brand-soft">perder tempo</span> (e cliente).
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Sites, lojas virtuais e sistemas que automatizam o que hoje você faz na
          mão — feitos por quem desenvolve de verdade, não por template pronto.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WaCta
            href={waLink}
            section="hero"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand/30 transition-transform hover:scale-[1.03]"
          >
            Pedir orçamento no WhatsApp
            <span aria-hidden>→</span>
          </WaCta>
          <a
            href="#cases"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-zinc-200 transition-colors hover:bg-white/5"
          >
            Ver projetos ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAIXA DE CREDIBILIDADE ───────────────────── */
function Credibilidade() {
  const itens = [
    "Atendimento direto com quem desenvolve",
    "Entrega no prazo",
    "Suporte de verdade",
  ];
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-5 py-5 text-sm text-zinc-400 sm:flex-row sm:gap-8">
        {itens.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <CheckIcon />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────── PROBLEMA ────────────────────────────── */
function Problema() {
  return (
    <section className="reveal mx-auto max-w-6xl px-5 py-24">
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
        Sua empresa ainda funciona no improviso?
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {problemas.map((p) => (
          <li
            key={p}
            className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-zinc-300"
          >
            <span className="mt-0.5 text-brand-soft" aria-hidden>
              ✕
            </span>
            {p}
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-xl leading-8 text-zinc-300">
        Enquanto isso, seu concorrente tá vendendo no automático.{" "}
        <strong className="font-semibold text-white">
          A DevDesk resolve isso.
        </strong>
      </p>
    </section>
  );
}

/* ────────────────────────────── SERVIÇOS ────────────────────────────── */
function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-soft">
          Serviços
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          O que a gente entrega pra sua empresa
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {servicos.map((s) => (
          <article
            key={s.tag}
            className="reveal group relative flex flex-col rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-colors hover:border-brand/40"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-xl"
                aria-hidden
              >
                {s.icon}
              </span>
              <p className="text-sm font-semibold text-brand-soft">{s.tag}</p>
            </div>

            <h3 className="mt-5 text-xl font-semibold leading-snug text-white">
              {s.titulo}
            </h3>
            <p className="mt-3 flex-1 leading-7 text-zinc-400">{s.texto}</p>

            <p className="mt-6 text-sm font-medium text-zinc-300">{s.preco}</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <WaCta
          href={waLink}
          section="services"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03]"
        >
          Quero um orçamento <span aria-hidden>→</span>
        </WaCta>
      </div>
    </section>
  );
}

/* ──────────────────────────── COMO FUNCIONA ─────────────────────────── */
function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-soft">
          Como funciona
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Simples do começo ao fim
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {passos.map((p) => (
          <div
            key={p.n}
            className="reveal rounded-2xl border border-white/8 bg-white/[0.02] p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {p.n}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{p.titulo}</h3>
            <p className="mt-2 leading-7 text-zinc-400">{p.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── CASES ──────────────────────────────── */
function Cases() {
  return (
    <section id="cases" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-soft">
          Projetos no ar
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Não é teoria. É produto no ar.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="reveal relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-brand/10 to-transparent p-8">
          <p className="text-sm font-semibold text-brand-soft">SaaS · Contabilidade</p>
          <h3 className="mt-3 text-2xl font-bold text-white">Tabilize</h3>
          <p className="mt-4 leading-7 text-zinc-300">
            Plataforma SaaS completa pra escritórios de contabilidade: gestão de
            clientes, prazos fiscais, processamento de NF-e e portal do cliente.
            Construído do zero, da arquitetura ao deploy.
          </p>
          <a
            href="https://tabilize.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-soft transition-colors hover:text-white"
          >
            tabilize.com.br <span aria-hidden>↗</span>
          </a>
        </article>

        <article className="reveal relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-brand/10 to-transparent p-8">
          <p className="text-sm font-semibold text-brand-soft">SaaS · Disparo de mensagens</p>
          <h3 className="mt-3 text-2xl font-bold text-white">Zylo</h3>
          <p className="mt-4 leading-7 text-zinc-300">
            Plataforma de disparo de mensagens em escala: campanhas, contatos e
            automações pra empresas falarem com seus clientes sem trabalho manual.
            Construída do zero, da arquitetura ao deploy.
          </p>
          <a
            href="https://usezylo.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-soft transition-colors hover:text-white"
          >
            usezylo.com.br <span aria-hidden>↗</span>
          </a>
        </article>

        <article className="reveal relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-brand/10 to-transparent p-8">
          <p className="text-sm font-semibold text-brand-soft">E-commerce · Café</p>
          <h3 className="mt-3 text-2xl font-bold text-white">Brazano</h3>
          <p className="mt-4 leading-7 text-zinc-300">
            Loja virtual para venda de cafés especiais: catálogo de produtos,
            checkout, pagamento e frete configurados. Vendendo online, 24h por dia.
          </p>
          <a
            href="https://brazanocafe.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-soft transition-colors hover:text-white"
          >
            brazanocafe.com.br <span aria-hidden>↗</span>
          </a>
        </article>
      </div>
    </section>
  );
}

/* ─────────────────────────────── SOBRE ──────────────────────────────── */
function Sobre() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="reveal rounded-3xl border border-white/8 bg-white/[0.03] p-8 sm:p-12">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Por que DevDesk?
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Porque você fala{" "}
          <strong className="font-semibold text-white">
            direto com quem desenvolve
          </strong>{" "}
          — sem fila de atendimento, sem ficar refém de uma agência que
          terceiriza tudo. A DevDesk é tecnologia de verdade, feita por quem já
          construiu produtos completos do zero. Você ganha código sob medida,
          atenção real e alguém que entende o seu negócio, não só o seu site.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────── CTA FINAL ───────────────────────────── */
function CtaFinal() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Bora tirar sua ideia do papel?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
          Me conta o que sua empresa precisa. A primeira conversa é sem
          compromisso.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WaCta
            href={waLink}
            section="cta_final"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand/30 transition-transform hover:scale-[1.03]"
          >
            Falar no WhatsApp <span aria-hidden>→</span>
          </WaCta>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-zinc-200 transition-colors hover:bg-white/5"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── FOOTER ──────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Image
            src="/images/logo-devdesk-icon-coral.png"
            alt="DevDeskTech"
            width={124}
            height={28}
            className="h-7 w-auto opacity-90"
          />
          <Logo className="text-lg opacity-80" />
        </div>
        <p className="text-center text-sm text-zinc-500 sm:text-right">
          DevDesk Tecnologia · {CIDADE}
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          {EMAIL}
          <br />
          <a
            href="/privacidade"
            className="text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-300 hover:underline"
          >
            Política de Privacidade
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────── WHATSAPP FLUTUANTE ────────────────────────── */
function WhatsAppFlutuante() {
  return (
    <WaCta
      href={waLink}
      section="floating"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-black shadow-2xl shadow-black/40 transition-transform hover:scale-105"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">Fala comigo 👋</span>
    </WaCta>
  );
}

/* ─────────────────────────────── LOGO ───────────────────────────────── */
function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-bold leading-none tracking-tight text-white ${className}`}
    >
      DevDesk<span className="text-brand-soft">Tech</span>
    </span>
  );
}

/* ─────────────────────────────── ÍCONES ─────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-brand-soft"
      aria-hidden
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-2.55 4.41c-.13 0-.34.05-.52.24-.18.2-.69.67-.69 1.64 0 .97.71 1.91.81 2.04.1.13 1.39 2.13 3.38 2.99.47.2.84.32 1.13.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.12-.94-.05-.08-.18-.13-.38-.23-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.61-.99-.6-.53-1-1.19-1.11-1.39-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.08-.62-1.48-.16-.38-.32-.33-.44-.34l-.37-.01z" />
    </svg>
  );
}
