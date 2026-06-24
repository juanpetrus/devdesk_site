"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────
const A = "/demo/brazano-cafe";

// Parse an inline-style string into a React style object so the markup stays
// close to the original design-component source.
function s(css: string): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[key] = val;
  }
  return o as CSSProperties;
}

// Raw SVG icon — avoids hand-converting every SVG attribute to camelCase.
function Svg({ html, style }: { html: string; style?: CSSProperties }) {
  return (
    <span
      style={{ display: "inline-flex", ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const fmt = (v: number) => "R$ " + v.toFixed(2).replace(".", ",");

// ── Icons ────────────────────────────────────────────────────────────────
const IC = {
  bag: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  arrow: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>',
  trash: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  truck: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D17B4C" stroke-width="1.6"><path d="M3 7h13v10H3zM16 10h4l1 3v4h-5"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',
  shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D17B4C" stroke-width="1.6"><path d="M12 2 3 7v6c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7Z"/><path d="m9 12 2 2 4-4"/></svg>',
  leaf: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D17B4C" stroke-width="1.6"><path d="M12 22c5-3 8-7 8-12V5l-8-3-8 3v5c0 5 3 9 8 12Z"/></svg>',
  clock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D17B4C" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  checkG: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C7A4E" stroke-width="1.8"><path d="M20 6 9 17l-5-5"/></svg>',
  pix: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#3C7A4E"><path d="M12 2 2 12l10 10 10-10Zm0 4.2L17.8 12 12 17.8 6.2 12Z"/></svg>',
  card: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B5D4D" stroke-width="1.6"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>',
  bigCheck: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#E6B877" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  bagAdd: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  bagBig: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  insta: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E8DEC9" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="#E8DEC9"/></svg>',
  fb: '<svg width="17" height="17" viewBox="0 0 24 24" fill="#E8DEC9"><path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.5 2 17.4 2 16.3 2 13.7 2 12 3.7 12 6.6V10H9v4h3v8Z"/></svg>',
  wa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E8DEC9" stroke-width="1.6"><path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.4A8.5 8.5 0 0 1 7.6 19L3 20l1-4.5a8.5 8.5 0 1 1 17-4"/></svg>',
};

// ── Data ─────────────────────────────────────────────────────────────────
type Product = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  variety: string;
  origin: string;
  weight: string;
  price: number;
  badge: string;
  img: string;
  gallery: string[];
  desc: string;
  notes: string[];
  torra: string;
  corpo: string;
  acidez: string;
};

const PRODUCTS: Product[] = [
  {
    id: "reserva",
    name: "Reserva Tesouro da Amazônia",
    short: "Reserva Tesouro da Amazônia",
    tagline: "Café Indígena · Edição Limitada",
    variety: "100% Robusta Amazônico",
    origin: "Aldeia Tawá Aruá · Rondônia",
    weight: "200g",
    price: 189.9,
    badge: "Edição Limitada",
    img: `${A}/reserva-main.jpeg`,
    gallery: [`${A}/reserva-main.jpeg`, `${A}/reserva-box.jpeg`, `${A}/reserva-beans.jpeg`, `${A}/reserva-leaf.jpeg`],
    desc: "Produzido em parceria com o povo indígena Tawá Aruá, este Robusta Amazônico de altitude é fermentado e selecionado grão a grão. Apresentado em garrafa de vidro com estojo, é o nosso café mais raro — uma reserva limitada do coração da floresta.",
    notes: ["Cacau", "Castanha-do-Pará", "Mel silvestre"],
    torra: "Média-escura",
    corpo: "Encorpado",
    acidez: "Baixa",
  },
  {
    id: "arabica",
    name: "Café Especial Arábica",
    short: "Café Especial Arábica",
    tagline: "Especial · Minas Gerais",
    variety: "100% Arábica",
    origin: "Cerrado Mineiro · Minas Gerais",
    weight: "250g",
    price: 49.9,
    badge: "",
    img: `${A}/arabica-main.jpeg`,
    gallery: [`${A}/arabica-main.jpeg`, `${A}/arabica-flat.jpeg`],
    desc: "Cultivado nas montanhas de Minas Gerais e colhido no ponto certo de maturação. Corpo aveludado e doçura natural, com notas que lembram chocolate ao leite e caramelo. O equilíbrio clássico para o café de todo dia.",
    notes: ["Chocolate ao leite", "Caramelo", "Frutas amarelas"],
    torra: "Média",
    corpo: "Médio",
    acidez: "Média",
  },
  {
    id: "robusta",
    name: "Café Especial Robusta Amazônico",
    short: "Café Robusta Amazônico",
    tagline: "Especial · Rondônia",
    variety: "100% Robusta Amazônico",
    origin: "Amazônia · Rondônia",
    weight: "250g",
    price: 44.9,
    badge: "",
    img: `${A}/robusta-main.jpeg`,
    gallery: [`${A}/robusta-main.jpeg`, `${A}/robusta-flat.jpeg`],
    desc: "Direto do coração de Rondônia, na Amazônia. Intenso e encorpado, com crema densa e final persistente. Notas marcantes de cacau amargo e castanha — feito para quem gosta de espresso de verdade.",
    notes: ["Cacau amargo", "Castanha", "Crema densa"],
    torra: "Escura",
    corpo: "Intenso",
    acidez: "Baixa",
  },
  {
    id: "lata",
    name: "Lata Coleção Tesouro da Amazônia",
    short: "Lata Coleção",
    tagline: "Lata Colecionável · Edição Especial",
    variety: "Robusta Amazônico",
    origin: "Amazônia · Rondônia",
    weight: "250g",
    price: 79.9,
    badge: "Colecionável",
    img: `${A}/lata-flat.jpeg`,
    gallery: [`${A}/lata-flat.jpeg`, `${A}/lata-main.jpeg`, `${A}/lata-red.jpeg`],
    desc: "Nosso café especial em lata metálica ilustrada com a fauna e a flora da Amazônia — onça-pintada, arara e a locomotiva histórica de Rondônia. Além de preservar o frescor dos grãos, é uma peça de coleção. O presente perfeito para quem ama café.",
    notes: ["Cacau", "Castanha-do-Pará", "Final achocolatado"],
    torra: "Média-escura",
    corpo: "Encorpado",
    acidez: "Baixa",
  },
  {
    id: "poentes",
    name: "Seleção Poentes",
    short: "Seleção Poentes",
    tagline: "Edição Autoral · Robusta Amazônico",
    variety: "100% Robusta Amazônico",
    origin: "Rio Madeira · Rondônia",
    weight: "100g",
    price: 29.9,
    badge: "Novo",
    img: `${A}/poentes-flat.jpeg`,
    gallery: [`${A}/poentes-flat.jpeg`, `${A}/poentes-pair.jpeg`, `${A}/poentes-grinder.jpeg`],
    desc: "Uma edição autoral inspirada nos poentes do Rio Madeira — barcos, botos cor-de-rosa e o sol que tinge a Amazônia de laranja. Café especial Robusta Amazônico de origem Rondônia, em embalagem de 100g: ideal para experimentar ou presentear.",
    notes: ["Frutas tropicais", "Caramelo", "Doçura natural"],
    torra: "Média",
    corpo: "Médio",
    acidez: "Média",
  },
];

const GRINDS = ["Grãos inteiros", "Moído · Coado", "Moído · Espresso", "Moído · Prensa Francesa"];

const STARS = "★★★★★";

type CartItem = {
  key: string;
  id: string;
  name: string;
  img: string;
  grind: string;
  weight: string;
  price: number;
  qty: number;
};

const CSS = `
  .bz-root *{box-sizing:border-box}
  .bz-root ::selection{background:#D17B4C;color:#fff}
  @keyframes bzFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  @keyframes bzDrawerIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes bzOverlayIn{from{opacity:0}to{opacity:1}}
  @keyframes bzToastIn{from{opacity:0;transform:translateY(12px) translateX(-50%)}to{opacity:1;transform:translateY(0) translateX(-50%)}}
  .bz-card{transition:transform .3s ease,box-shadow .3s ease}
  .bz-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(46,34,24,.14)}
  .bz-related{transition:box-shadow .3s ease}
  .bz-related:hover{box-shadow:0 18px 40px rgba(46,34,24,.12)}
  .bz-addbtn{transition:background .2s ease}
  .bz-addbtn:hover{background:#D17B4C !important}
  .bz-primary{transition:background .2s ease}
  .bz-primary:hover{background:#B5612F !important}
  .bz-primaryL{transition:background .2s ease}
  .bz-primaryL:hover{background:#E08A5C !important}

  @media (max-width:960px){
    .bz-root .bz-navlink{display:none !important}
    .bz-root .bz-header{padding-left:18px !important;padding-right:18px !important}
    .bz-root .bz-pad{padding-left:22px !important;padding-right:22px !important}
    .bz-root .bz-grid2{grid-template-columns:1fr !important;gap:40px !important}
    .bz-root .bz-grid3{grid-template-columns:1fr 1fr !important}
    .bz-root .bz-nosticky{position:static !important;top:auto !important}
    .bz-root .bz-h1{font-size:44px !important}
    .bz-root .bz-h2{font-size:34px !important}
    .bz-root .bz-hero{min-height:0 !important}
    .bz-root .bz-hero-pad{padding:60px 0 70px !important}
    .bz-root .bz-hero-img{min-height:380px !important}
    .bz-root .bz-sobre-img{min-height:420px !important}
    .bz-root .bz-foot{grid-template-columns:1fr 1fr !important;gap:36px !important}
  }
  @media (max-width:620px){
    .bz-root .bz-pad{padding-left:18px !important;padding-right:18px !important}
    .bz-root .bz-grid3{grid-template-columns:1fr !important}
    .bz-root .bz-h1{font-size:36px !important}
    .bz-root .bz-h2{font-size:29px !important}
    .bz-root .bz-vpad{padding-top:60px !important;padding-bottom:60px !important}
    .bz-root .bz-checkrow{grid-template-columns:1fr !important}
    .bz-root .bz-stack-sm{flex-wrap:wrap !important}
    .bz-root .bz-foot{grid-template-columns:1fr !important;gap:30px !important}
  }
`;

// ── Component ──────────────────────────────────────────────────────────────
type Screen = "home" | "product" | "checkout";

export default function Brazano() {
  const [screen, setScreen] = useState<Screen>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [grind, setGrind] = useState(GRINDS[0]);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [payment, setPayment] = useState<"pix" | "card">("pix");
  const [imgIdx, setImgIdx] = useState(0);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (toastT.current) clearTimeout(toastT.current); }, []);

  const showToast = (msg: string) => {
    if (toastT.current) clearTimeout(toastT.current);
    setToast(msg);
    toastT.current = setTimeout(() => setToast(null), 2200);
  };

  const scrollTo = (id: string) => {
    setScreen("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
    }, 60);
  };

  const openProduct = (id: string) => {
    setScreen("product");
    setProductId(id);
    setGrind(GRINDS[0]);
    setQty(1);
    setImgIdx(0);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  const goHome = () => {
    setScreen("home");
    setCheckoutDone(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const addToCart = (prod: Product, g: string, q: number) => {
    const key = prod.id + "|" + g;
    setCart((prev) => {
      const ex = prev.find((c) => c.key === key);
      if (ex) return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + q } : c));
      return [...prev, { key, id: prod.id, name: prod.short, img: prod.img, grind: g, weight: prod.weight, price: prod.price, qty: q }];
    });
    showToast(prod.short + " adicionado à sacola");
  };
  const setQtyKey = (key: string, d: number) =>
    setCart((prev) => prev.map((c) => (c.key === key ? { ...c, qty: Math.max(1, c.qty + d) } : c)));
  const removeKey = (key: string) => setCart((prev) => prev.filter((c) => c.key !== key));

  const subtotal = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  const count = cart.reduce((acc, c) => acc + c.qty, 0);
  const frete = subtotal >= 120 || subtotal === 0;
  const freteCost = 19.9;

  const goCheckout = () => {
    setScreen("checkout");
    setCartOpen(false);
    setCheckoutDone(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  const placeOrder = () => {
    setCheckoutDone(true);
    setCart([]);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const featured = PRODUCTS[0];
  const cur = PRODUCTS.find((p) => p.id === productId) || null;
  const checkoutTotal = fmt(frete ? subtotal : subtotal + freteCost);

  const navBtn = "background:none;border:none;cursor:pointer;font-family:inherit;font-size:14.5px;letter-spacing:.04em;color:#4A3D2E;font-weight:500";

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{CSS}</style>

      <div className="bz-root" style={s("font-family:'Jost',sans-serif;color:#2E2218;background:#F7F1E6;min-height:100vh;position:relative;overflow-x:hidden")}>
        {/* ===== HEADER ===== */}
        <header style={s("position:sticky;top:0;z-index:40;background:rgba(247,241,230,.86);backdrop-filter:blur(12px);border-bottom:1px solid rgba(46,34,24,.09)")}>
          <div className="bz-header" style={s("max-width:1240px;margin:0 auto;padding:0 40px;height:78px;display:flex;align-items:center;justify-content:space-between;gap:30px")}>
            <button onClick={goHome} style={s("background:#21412E;border:none;cursor:pointer;display:inline-flex;align-items:center;padding:10px 20px;border-radius:14px")}>
              <img src={`${A}/logo.png`} alt="Brazano Café" style={s("height:34px;width:auto;display:block")} />
            </button>
            <nav style={s("display:flex;align-items:center;gap:34px")}>
              <button onClick={goHome} className="bz-navlink" style={s(navBtn)}>Início</button>
              <button onClick={() => scrollTo("bz-catalogo")} className="bz-navlink" style={s(navBtn)}>Cafés</button>
              <button onClick={() => scrollTo("bz-origem")} className="bz-navlink" style={s(navBtn)}>Origem</button>
              <button onClick={() => setCartOpen(true)} style={s("position:relative;background:#21412E;border:none;cursor:pointer;border-radius:40px;height:44px;padding:0 22px 0 18px;display:flex;align-items:center;gap:9px;color:#F7F1E6;font-family:inherit;font-weight:500;font-size:14px")}>
                <Svg html={IC.bag} />
                Sacola
                {cart.length > 0 && (
                  <span style={s("background:#D17B4C;color:#fff;border-radius:20px;min-width:21px;height:21px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;padding:0 5px")}>{count}</span>
                )}
              </button>
            </nav>
          </div>
        </header>

        <main>
          {screen === "home" && <Home featured={featured} openProduct={openProduct} scrollCatalog={() => scrollTo("bz-catalogo")} addToCart={addToCart} newsletter={() => showToast("Cupom de 10% enviado para o seu e-mail!")} />}

          {screen === "product" && cur && (
            <ProductPage
              cur={cur}
              imgIdx={imgIdx}
              setImgIdx={setImgIdx}
              grind={grind}
              setGrind={setGrind}
              qty={qty}
              setQty={setQty}
              addToCart={addToCart}
              openProduct={openProduct}
              goHome={goHome}
            />
          )}

          {screen === "checkout" && (
            <Checkout
              done={checkoutDone}
              cart={cart}
              subtotal={subtotal}
              frete={frete}
              freteCost={freteCost}
              total={checkoutTotal}
              payment={payment}
              setPayment={setPayment}
              openCart={() => setCartOpen(true)}
              submit={placeOrder}
              goHome={goHome}
            />
          )}
        </main>

        <Footer />

        {/* ===== CART DRAWER ===== */}
        {cartOpen && (
          <div style={s("position:fixed;inset:0;z-index:60")}>
            <div onClick={() => setCartOpen(false)} style={{ ...s("position:absolute;inset:0;background:rgba(30,22,14,.5)"), animation: "bzOverlayIn .25s ease" }}></div>
            <aside style={{ ...s("position:absolute;top:0;right:0;height:100%;width:430px;max-width:92vw;background:#F7F1E6;display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.28)"), animation: "bzDrawerIn .32s cubic-bezier(.22,1,.36,1)" }}>
              <div style={s("padding:24px 26px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(46,34,24,.1)")}>
                <h3 style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:26px;color:#21412E")}>Sua sacola</h3>
                <button onClick={() => setCartOpen(false)} style={s("background:none;border:none;cursor:pointer;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#6B5D4D")}>
                  <Svg html={IC.close} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div style={s("flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:40px;text-align:center")}>
                  <span style={s("width:74px;height:74px;border-radius:50%;background:#EBE2D0;display:flex;align-items:center;justify-content:center;color:#B0A088")}>
                    <Svg html={IC.bagBig} />
                  </span>
                  <p style={s("color:#6B5D4D;font-size:15.5px")}>Sua sacola está vazia.</p>
                  <button onClick={() => setCartOpen(false)} style={s("background:#21412E;color:#F7F1E6;border:none;border-radius:40px;padding:13px 28px;font-family:inherit;font-weight:500;cursor:pointer;font-size:14.5px")}>Explorar os cafés</button>
                </div>
              ) : (
                <>
                  <div style={s("flex:1;overflow-y:auto;padding:8px 26px")}>
                    {cart.map((item) => (
                      <div key={item.key} style={s("display:flex;gap:15px;padding:20px 0;border-bottom:1px solid rgba(46,34,24,.08)")}>
                        <div style={s("width:74px;height:90px;border-radius:8px;overflow:hidden;flex:none;background:#EBE2D0")}>
                          <img src={item.img} alt={item.name} style={s("width:100%;height:100%;object-fit:cover")} />
                        </div>
                        <div style={s("flex:1;min-width:0")}>
                          <div style={s("display:flex;justify-content:space-between;gap:8px")}>
                            <h4 style={s("font-weight:600;font-size:15px;color:#2E2218;line-height:1.25")}>{item.name}</h4>
                            <button onClick={() => removeKey(item.key)} style={s("background:none;border:none;cursor:pointer;color:#B0A088;flex:none")}>
                              <Svg html={IC.trash} />
                            </button>
                          </div>
                          <p style={s("font-size:12.5px;color:#8A7B68;margin-top:3px")}>{item.grind} · {item.weight}</p>
                          <div style={s("display:flex;align-items:center;justify-content:space-between;margin-top:12px")}>
                            <div style={s("display:flex;align-items:center;border:1px solid rgba(46,34,24,.16);border-radius:30px;overflow:hidden")}>
                              <button onClick={() => setQtyKey(item.key, -1)} style={s("background:none;border:none;cursor:pointer;width:30px;height:30px;font-size:17px;color:#4A3D2E;display:flex;align-items:center;justify-content:center")}>−</button>
                              <span style={s("min-width:24px;text-align:center;font-size:14px;font-weight:600")}>{item.qty}</span>
                              <button onClick={() => setQtyKey(item.key, 1)} style={s("background:none;border:none;cursor:pointer;width:30px;height:30px;font-size:16px;color:#4A3D2E;display:flex;align-items:center;justify-content:center")}>+</button>
                            </div>
                            <span style={s("font-weight:600;font-size:15px;color:#21412E")}>{fmt(item.price * item.qty)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={s("padding:22px 26px;border-top:1px solid rgba(46,34,24,.12);background:#F1E9D9")}>
                    <div style={s("display:flex;justify-content:space-between;font-size:14px;color:#6B5D4D;margin-bottom:8px")}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                    <div style={s("display:flex;justify-content:space-between;font-size:14px;color:#6B5D4D;margin-bottom:16px")}><span>Frete</span><span style={s("color:#3C7A4E;font-weight:600")}>{frete ? "Grátis" : fmt(freteCost)}</span></div>
                    <button onClick={goCheckout} className="bz-primary" style={s("width:100%;background:#D17B4C;color:#fff;border:none;border-radius:40px;padding:16px;font-family:inherit;font-weight:600;font-size:15.5px;letter-spacing:.02em;cursor:pointer")}>Finalizar compra · {fmt(subtotal)}</button>
                    <p style={s("text-align:center;font-size:12px;color:#9A8B76;margin-top:12px")}>Frete grátis acima de R$ 120</p>
                  </div>
                </>
              )}
            </aside>
          </div>
        )}

        {/* ===== TOAST ===== */}
        {toast && (
          <div style={{ ...s("position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:80;background:#21412E;color:#F7F1E6;padding:14px 24px;border-radius:40px;box-shadow:0 14px 40px rgba(0,0,0,.3);display:flex;align-items:center;gap:11px;font-size:14.5px;font-weight:500"), animation: "bzToastIn .3s ease" }}>
            <span style={s("width:22px;height:22px;border-radius:50%;background:#D17B4C;display:flex;align-items:center;justify-content:center")}>
              <Svg html={IC.check} />
            </span>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────
function Home({
  featured,
  openProduct,
  scrollCatalog,
  addToCart,
  newsletter,
}: {
  featured: Product;
  openProduct: (id: string) => void;
  scrollCatalog: () => void;
  addToCart: (p: Product, g: string, q: number) => void;
  newsletter: () => void;
}) {
  return (
    <div>
      {/* HERO */}
      <section style={s("position:relative;background:#21412E;color:#F2ECDC;overflow:hidden")}>
        <div style={s("position:absolute;inset:0;background:radial-gradient(120% 90% at 78% 30%,rgba(209,123,76,.22),transparent 60%)")}></div>
        <div style={s("position:absolute;top:-80px;right:-60px;width:320px;height:320px;border:1px solid rgba(194,154,78,.18);border-radius:50%")}></div>
        <div style={s("position:absolute;bottom:-120px;left:-80px;width:380px;height:380px;border:1px solid rgba(194,154,78,.12);border-radius:50%")}></div>
        <div className="bz-pad bz-grid2 bz-hero" style={s("max-width:1240px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center;min-height:620px;position:relative")}>
          <div className="bz-hero-pad" style={s("padding:80px 0")}>
            <span style={s("display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(194,154,78,.5);color:#D8C49A;border-radius:40px;padding:8px 17px;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:500;margin-bottom:28px")}>
              <span style={s("width:6px;height:6px;border-radius:50%;background:#C29A4E")}></span>Edição Limitada
            </span>
            <h1 className="bz-h1" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:64px;line-height:1.03;letter-spacing:-.01em;margin-bottom:22px")}>Reserva Tesouro<br />da Amazônia</h1>
            <p style={s("font-size:18px;line-height:1.65;color:#C6D2BB;max-width:440px;margin-bottom:18px")}>Café indígena produzido pelo povo <em style={s("font-style:italic;color:#E6B877")}>Tawá Aruá</em>, em Rondônia. Robusta Amazônico selecionado grão a grão, apresentado em garrafa de vidro com estojo.</p>
            <div style={s("display:flex;align-items:center;gap:22px;margin:30px 0 34px")}>
              <span style={s("font-family:'Cormorant Garamond';font-size:38px;font-weight:600;color:#F2ECDC")}>{fmt(featured.price)}</span>
              <span style={s("font-size:14px;color:#9FB295;line-height:1.4")}>200g · garrafa<br />de vidro</span>
            </div>
            <div style={s("display:flex;gap:14px;flex-wrap:wrap")}>
              <button onClick={() => openProduct("reserva")} className="bz-primaryL" style={s("background:#D17B4C;color:#fff;border:none;border-radius:40px;padding:16px 32px;font-family:'Jost';font-weight:600;font-size:15.5px;cursor:pointer;display:flex;align-items:center;gap:10px")}>Conhecer a Reserva<Svg html={IC.arrow} /></button>
              <button onClick={scrollCatalog} style={s("background:transparent;color:#F2ECDC;border:1px solid rgba(242,236,220,.35);border-radius:40px;padding:16px 30px;font-family:'Jost';font-weight:500;font-size:15.5px;cursor:pointer")}>Ver todos os cafés</button>
            </div>
          </div>
          <div className="bz-hero-img" style={s("position:relative;height:100%;min-height:560px")}>
            <div style={s("position:absolute;inset:38px 0 38px 8px;border-radius:16px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.4)")}>
              <img src={`${A}/reserva-box.jpeg`} alt="Reserva Tesouro da Amazônia" style={s("width:100%;height:100%;object-fit:cover")} />
            </div>
            <div style={s("position:absolute;bottom:60px;left:-26px;background:#F7F1E6;color:#21412E;border-radius:14px;padding:16px 20px;box-shadow:0 20px 50px rgba(0,0,0,.3);max-width:200px")}>
              <div style={s("display:flex;align-items:center;gap:8px;margin-bottom:6px")}><span style={s("color:#C29A4E;font-size:15px")}>{STARS}</span></div>
              <p style={s("font-size:13px;line-height:1.45;color:#4A3D2E")}>&ldquo;O café mais especial que já provei. Uma joia da floresta.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={s("background:#EFE6D3;border-bottom:1px solid rgba(46,34,24,.07)")}>
        <div className="bz-pad" style={s("max-width:1240px;margin:0 auto;padding:22px 40px;display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
          {[[IC.truck, "Frete grátis acima de R$ 120"], [IC.shield, "Torrado em pequenos lotes"], [IC.leaf, "Origem rastreável"], [IC.clock, "Pix com 5% off"]].map(([ic, txt]) => (
            <div key={txt} style={s("display:flex;align-items:center;gap:12px;color:#4A3D2E;font-size:14.5px;font-weight:500")}><Svg html={ic} />{txt}</div>
          ))}
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section style={s("background:#FBF6EC")}>
        <div className="bz-pad bz-grid2 bz-vpad" style={s("max-width:1240px;margin:0 auto;padding:96px 40px;display:grid;grid-template-columns:1.04fr .96fr;gap:60px;align-items:center")}>
          <div>
            <span style={s("font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>Sobre nós</span>
            <h2 className="bz-h2" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:44px;color:#21412E;margin:14px 0 4px;line-height:1.08;letter-spacing:-.01em")}>Cada xícara conta uma história</h2>
            <p style={s("font-family:'Cormorant Garamond';font-style:italic;font-size:22px;color:#8A7B68;margin-bottom:26px")}>Onde o sabor encontra memória e conexão</p>
            <p style={s("font-size:16.5px;line-height:1.78;color:#5A4D3C;margin-bottom:20px")}>Na <strong style={s("color:#21412E;font-weight:600")}>Brazano Café</strong>, acreditamos que o café vai além do sabor: ele conecta memórias, histórias e pessoas. Fundada em 2021, mas com vasta experiência no setor, buscamos levar o melhor do café brasileiro ao mundo, celebrando suas ricas tradições e diversidade cultural.</p>
            <p style={s("font-size:16.5px;line-height:1.78;color:#5A4D3C;margin-bottom:30px")}>Trabalhamos com arábica e robusta, cada um com características únicas, perfeitos para ocasiões e métodos variados. Para nós, um bom café não é só uma bebida; é uma experiência que cria momentos inesquecíveis.</p>
            <blockquote style={s("border-left:3px solid #D17B4C;padding-left:20px;margin:0")}>
              <p style={s("font-size:16px;line-height:1.7;color:#4A3D2E")}>Celebre a brasilidade em cada xícara, explorando diferentes perfis sensoriais.<br />Nossas torras são sempre frescas, disponíveis em grãos ou moídas.</p>
            </blockquote>
          </div>
          <div className="bz-sobre-img" style={s("position:relative;min-height:540px")}>
            <div style={s("position:absolute;top:0;right:0;width:80%;height:312px;border-radius:14px;overflow:hidden;box-shadow:0 22px 50px rgba(46,34,24,.16)")}>
              <img src={`${A}/sobre-cerejas.webp`} alt="Colheita de cerejas de café" style={s("display:block;width:100%;height:312px;object-fit:cover")} />
            </div>
            <div style={s("position:absolute;bottom:0;left:0;width:62%;height:348px;border-radius:14px;overflow:hidden;box-shadow:0 22px 50px rgba(46,34,24,.22);border:5px solid #FBF6EC")}>
              <img src={`${A}/sobre-cesto.webp`} alt="Cesto de cerejas de café" style={s("display:block;width:100%;height:338px;object-fit:cover")} />
            </div>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section style={s("background:#FFFCF6;border-top:1px solid rgba(46,34,24,.06)")}>
        <div className="bz-pad bz-grid2 bz-vpad" style={s("max-width:1240px;margin:0 auto;padding:90px 40px;display:grid;grid-template-columns:.92fr 1.08fr;gap:60px;align-items:center")}>
          <div style={s("border-radius:16px;overflow:hidden;box-shadow:0 26px 60px rgba(46,34,24,.18);aspect-ratio:4/4.6;background:#EBE2D0")}>
            <img src={`${A}/robusta-main.jpeg`} alt="Café Brazano" style={s("width:100%;height:100%;object-fit:cover")} />
          </div>
          <div>
            <span style={s("font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>O que fazemos</span>
            <h2 className="bz-h2" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:44px;color:#21412E;margin:14px 0 24px;line-height:1.08;letter-spacing:-.01em")}>Sabores que contam histórias</h2>
            <p style={s("font-size:16.5px;line-height:1.78;color:#5A4D3C;margin-bottom:20px")}>Na Brazano, selecionamos grãos de cafés excepcionais de produtores brasileiros — mulheres, jovens, agricultores familiares e indígenas — que compartilham nosso compromisso com qualidade e sustentabilidade.</p>
            <p style={s("font-size:16.5px;line-height:1.78;color:#5A4D3C;margin-bottom:28px")}>Nossos rótulos são mais do que embalagens: são janelas para histórias únicas. Descubra detalhes sobre o produtor, a região de origem, os métodos de processamento e o perfil sensorial, criando uma experiência de imersão em cada xícara.</p>
            <p style={s("font-size:16.5px;line-height:1.7;color:#4A3D2E;margin-bottom:6px")}>Conecte-se com a harmonia entre sabores, histórias e propósito.</p>
            <p style={s("font-size:18px;color:#4A3D2E")}>Viva a experiência <strong style={s("color:#3C7A4E;font-weight:600")}>Brazano Café</strong></p>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="bz-catalogo" className="bz-pad bz-vpad" style={s("max-width:1240px;margin:0 auto;padding:88px 40px 90px")}>
        <div style={s("text-align:center;margin-bottom:56px")}>
          <span style={s("font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>Nossa Coleção</span>
          <h2 className="bz-h2" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:48px;color:#21412E;margin-top:10px;letter-spacing:-.01em")}>Nossos cafés, um só ritual</h2>
          <p style={s("color:#6B5D4D;font-size:17px;max-width:560px;margin:14px auto 0;line-height:1.6")}>Da Amazônia ao Cerrado Mineiro. Escolha o seu café e a moagem ideal para o seu preparo.</p>
        </div>
        <div className="bz-grid3" style={s("display:grid;grid-template-columns:repeat(3,1fr);gap:30px")}>
          {PRODUCTS.map((p) => (
            <div key={p.id} className="bz-card" onClick={() => openProduct(p.id)} style={s("background:#fff;border:1px solid rgba(46,34,24,.08);border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column")}>
              <div style={s("position:relative;aspect-ratio:1/1.08;overflow:hidden;background:#EBE2D0")}>
                <img src={p.img} alt={p.name} style={s("width:100%;height:100%;object-fit:cover")} />
                {p.badge && <span style={s("position:absolute;top:16px;left:16px;background:#21412E;color:#E6B877;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding:7px 13px;border-radius:30px")}>{p.badge}</span>}
              </div>
              <div style={s("padding:24px 24px 26px;display:flex;flex-direction:column;flex:1")}>
                <span style={s("font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>{p.tagline}</span>
                <h3 style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:25px;color:#21412E;margin:8px 0 6px;line-height:1.15")}>{p.name}</h3>
                <p style={s("font-size:13.5px;color:#8A7B68")}>{p.variety} · {p.weight}</p>
                <div style={s("margin-top:auto;padding-top:20px;display:flex;align-items:center;justify-content:space-between")}>
                  <span style={s("font-family:'Cormorant Garamond';font-size:27px;font-weight:600;color:#2E2218")}>{fmt(p.price)}</span>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(p, GRINDS[0], 1); }} className="bz-addbtn" style={s("background:#21412E;color:#F7F1E6;border:none;width:46px;height:46px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none")}>
                    <Svg html={IC.plus} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORIGIN */}
      <section id="bz-origem" style={s("background:#2E2218;color:#EDE3CF;position:relative;overflow:hidden")}>
        <div className="bz-pad bz-grid2 bz-vpad" style={s("max-width:1240px;margin:0 auto;padding:90px 40px;display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center")}>
          <div style={s("position:relative")}>
            <div style={s("border-radius:16px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.4);aspect-ratio:3/4")}><img src={`${A}/reserva-beans.jpeg`} alt="Grãos da Reserva" style={s("width:100%;height:100%;object-fit:cover")} /></div>
            <div style={s("position:absolute;bottom:-24px;right:-24px;background:#D17B4C;color:#fff;border-radius:14px;padding:20px 24px;text-align:center;box-shadow:0 16px 40px rgba(0,0,0,.3)")}>
              <div style={s("font-family:'Cormorant Garamond';font-size:40px;font-weight:600;line-height:1")}>100%</div>
              <div style={s("font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-top:2px")}>Origem amazônica</div>
            </div>
          </div>
          <div>
            <span style={s("font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#E6B877;font-weight:600")}>Da floresta para a sua xícara</span>
            <h2 className="bz-h2" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:46px;line-height:1.08;margin:14px 0 22px;letter-spacing:-.01em")}>Um café com nome,<br />rosto e território</h2>
            <p style={s("font-size:16.5px;line-height:1.75;color:#C7BBA4;margin-bottom:20px")}>A Brazano nasceu em Rondônia, no coração da Amazônia. Trabalhamos lado a lado com produtores e comunidades indígenas — como o povo <strong style={s("color:#E6B877;font-weight:600")}>Tawá Aruá</strong> — para levar o Robusta Amazônico ao mundo, com rastreabilidade e respeito à floresta.</p>
            <div style={s("display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:32px")}>
              {[["3", "origens", "selecionadas"], ["+12", "famílias", "produtoras"], ["100%", "comércio", "justo"]].map(([n, a, b]) => (
                <div key={n}><div style={s("font-family:'Cormorant Garamond';font-size:36px;font-weight:600;color:#E6B877")}>{n}</div><div style={s("font-size:13.5px;color:#A99C84;line-height:1.4;margin-top:4px")}>{a}<br />{b}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={s("background:#EFE6D3")}>
        <div className="bz-pad" style={s("max-width:760px;margin:0 auto;padding:72px 40px;text-align:center")}>
          <span style={s("font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>Clube Brazano</span>
          <h2 className="bz-h2" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:40px;color:#21412E;margin:12px 0 14px;letter-spacing:-.01em")}>Receba histórias e ofertas do café</h2>
          <p style={s("color:#6B5D4D;font-size:16px;line-height:1.6;margin-bottom:28px")}>Assine nossa newsletter e ganhe <strong style={s("color:#B5612F")}>10% de desconto</strong> na primeira compra.</p>
          <form onSubmit={(e) => { e.preventDefault(); newsletter(); }} style={s("display:flex;gap:10px;max-width:480px;margin:0 auto;flex-wrap:wrap;justify-content:center")}>
            <input type="email" required placeholder="seu@email.com" style={s("flex:1;min-width:240px;background:#fff;border:1px solid rgba(46,34,24,.16);border-radius:40px;padding:15px 22px;font-family:'Jost';font-size:15px;color:#2E2218;outline:none")} />
            <button type="submit" className="bz-addbtn" style={s("background:#21412E;color:#F7F1E6;border:none;border-radius:40px;padding:15px 30px;font-family:'Jost';font-weight:600;font-size:15px;cursor:pointer")}>Quero meu desconto</button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ── Product page ─────────────────────────────────────────────────────────────
function ProductPage({
  cur,
  imgIdx,
  setImgIdx,
  grind,
  setGrind,
  qty,
  setQty,
  addToCart,
  openProduct,
  goHome,
}: {
  cur: Product;
  imgIdx: number;
  setImgIdx: (n: number) => void;
  grind: string;
  setGrind: (g: string) => void;
  qty: number;
  setQty: (n: number) => void;
  addToCart: (p: Product, g: string, q: number) => void;
  openProduct: (id: string) => void;
  goHome: () => void;
}) {
  const mainImg = cur.gallery[imgIdx] || cur.gallery[0];
  const related = PRODUCTS.filter((p) => p.id !== cur.id);
  return (
    <div className="bz-pad" style={s("max-width:1240px;margin:0 auto;padding:30px 40px 90px")}>
      <button onClick={goHome} style={s("background:none;border:none;cursor:pointer;font-family:'Jost';font-size:14px;color:#6B5D4D;display:flex;align-items:center;gap:8px;margin-bottom:26px;font-weight:500")}><Svg html={IC.back} />Voltar aos cafés</button>
      <div className="bz-grid2" style={s("display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start")}>
        {/* Gallery */}
        <div className="bz-nosticky" style={s("position:sticky;top:100px")}>
          <div style={s("border-radius:18px;overflow:hidden;background:#EBE2D0;aspect-ratio:1/1.12;box-shadow:0 24px 60px rgba(46,34,24,.16)")}>
            <img src={mainImg} alt={cur.name} style={s("width:100%;height:100%;object-fit:cover")} />
          </div>
          <div style={s("display:flex;gap:12px;margin-top:14px")}>
            {cur.gallery.map((g, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={s(`flex:1;aspect-ratio:1/1;border-radius:11px;overflow:hidden;border:2px solid ${i === imgIdx ? "#D17B4C" : "transparent"};cursor:pointer;padding:0;background:#EBE2D0`)}>
                <img src={g} alt="" style={s("width:100%;height:100%;object-fit:cover")} />
              </button>
            ))}
          </div>
        </div>
        {/* Info */}
        <div>
          {cur.badge && <span style={s("display:inline-block;background:#21412E;color:#E6B877;font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:600;padding:7px 14px;border-radius:30px;margin-bottom:16px")}>{cur.badge}</span>}
          <span style={s("display:block;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#D17B4C;font-weight:600;margin-bottom:8px")}>{cur.tagline}</span>
          <h1 className="bz-h1" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:46px;color:#21412E;line-height:1.08;letter-spacing:-.01em")}>{cur.name}</h1>
          <div style={s("display:flex;align-items:center;gap:13px;margin:14px 0 20px")}>
            <span style={s("color:#C29A4E;font-size:16px;letter-spacing:1px")}>{STARS}</span>
            <span style={s("font-size:13.5px;color:#8A7B68")}>128 avaliações</span>
          </div>
          <p style={s("font-size:16.5px;line-height:1.75;color:#5A4D3C;margin-bottom:24px")}>{cur.desc}</p>

          {/* Notes */}
          <div style={s("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:26px")}>
            {cur.notes.map((n) => (
              <span key={n} style={s("background:#EFE6D3;color:#5A4D3C;border-radius:30px;padding:8px 16px;font-size:13.5px;font-weight:500;display:inline-flex;align-items:center;gap:7px")}><span style={s("width:6px;height:6px;border-radius:50%;background:#D17B4C")}></span>{n}</span>
            ))}
          </div>

          {/* Attributes */}
          <div style={s("display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(46,34,24,.1);border:1px solid rgba(46,34,24,.1);border-radius:12px;overflow:hidden;margin-bottom:30px")}>
            {[["Torra", cur.torra], ["Corpo", cur.corpo], ["Acidez", cur.acidez]].map(([k, v]) => (
              <div key={k} style={s("background:#FBF7EE;padding:16px 18px")}><div style={s("font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:#9A8B76;margin-bottom:5px")}>{k}</div><div style={s("font-weight:600;font-size:15px;color:#2E2218")}>{v}</div></div>
            ))}
          </div>

          {/* Grind selection */}
          <div style={s("margin-bottom:24px")}>
            <div style={s("font-size:13.5px;font-weight:600;color:#2E2218;margin-bottom:11px")}>Moagem</div>
            <div style={s("display:grid;grid-template-columns:1fr 1fr;gap:10px")}>
              {GRINDS.map((g) => {
                const a = g === grind;
                return (
                  <button key={g} onClick={() => setGrind(g)} style={s(`text-align:left;border:1.5px solid ${a ? "#21412E" : "rgba(46,34,24,.16)"};background:${a ? "#EBF0E7" : "#fff"};color:${a ? "#21412E" : "#4A3D2E"};border-radius:12px;padding:13px 16px;font-family:'Jost';font-size:14.5px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:10px`)}>
                    <span style={s(`width:16px;height:16px;border-radius:50%;border:2px solid ${a ? "#21412E" : "#B0A088"};flex:none;display:flex;align-items:center;justify-content:center`)}><span style={s(`width:7px;height:7px;border-radius:50%;background:${a ? "#21412E" : "transparent"}`)}></span></span>{g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty + Add */}
          <div style={s("display:flex;gap:14px;align-items:stretch;margin-bottom:18px")}>
            <div style={s("display:flex;align-items:center;border:1.5px solid rgba(46,34,24,.16);border-radius:40px;overflow:hidden")}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={s("background:none;border:none;cursor:pointer;width:48px;height:56px;font-size:22px;color:#4A3D2E")}>−</button>
              <span style={s("min-width:34px;text-align:center;font-size:17px;font-weight:600")}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={s("background:none;border:none;cursor:pointer;width:48px;height:56px;font-size:20px;color:#4A3D2E")}>+</button>
            </div>
            <button onClick={() => addToCart(cur, grind, qty)} className="bz-primary" style={s("flex:1;background:#D17B4C;color:#fff;border:none;border-radius:40px;font-family:'Jost';font-weight:600;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px")}><Svg html={IC.bagAdd} />Adicionar · {fmt(cur.price * qty)}</button>
          </div>
          <div className="bz-stack-sm" style={s("display:flex;gap:20px;font-size:13px;color:#8A7B68;padding-top:6px")}>
            <span style={s("display:flex;align-items:center;gap:7px")}><Svg html={IC.checkG} />Frete grátis acima de R$ 120</span>
            <span style={s("display:flex;align-items:center;gap:7px")}><Svg html={IC.checkG} />Torra recente garantida</span>
          </div>
        </div>
      </div>

      {/* Related */}
      <div style={s("margin-top:80px")}>
        <h3 style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:32px;color:#21412E;margin-bottom:28px")}>Você também vai gostar</h3>
        <div className="bz-grid2" style={s("display:grid;grid-template-columns:1fr 1fr;gap:26px")}>
          {related.map((p) => (
            <div key={p.id} className="bz-related" onClick={() => openProduct(p.id)} style={s("background:#fff;border:1px solid rgba(46,34,24,.08);border-radius:16px;overflow:hidden;cursor:pointer;display:flex;align-items:center;gap:0")}>
              <div style={s("width:150px;height:160px;flex:none;background:#EBE2D0")}><img src={p.img} alt={p.name} style={s("width:100%;height:100%;object-fit:cover")} /></div>
              <div style={s("padding:20px 24px;flex:1")}>
                <span style={s("font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;color:#D17B4C;font-weight:600")}>{p.tagline}</span>
                <h4 style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:23px;color:#21412E;margin:5px 0 8px;line-height:1.15")}>{p.name}</h4>
                <span style={s("font-family:'Cormorant Garamond';font-size:23px;font-weight:600;color:#2E2218")}>{fmt(p.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Checkout ─────────────────────────────────────────────────────────────────
function Checkout({
  done,
  cart,
  subtotal,
  frete,
  freteCost,
  total,
  payment,
  setPayment,
  openCart,
  submit,
  goHome,
}: {
  done: boolean;
  cart: CartItem[];
  subtotal: number;
  frete: boolean;
  freteCost: number;
  total: string;
  payment: "pix" | "card";
  setPayment: (p: "pix" | "card") => void;
  openCart: () => void;
  submit: () => void;
  goHome: () => void;
}) {
  const inputStyle = "background:#fff;border:1px solid rgba(46,34,24,.16);border-radius:11px;padding:14px 16px;font-family:'Jost';font-size:15px;outline:none";
  const stepNum = "width:26px;height:26px;border-radius:50%;background:#21412E;color:#F7F1E6;display:flex;align-items:center;justify-content:center;font-size:13px";
  const stepH = "font-family:'Jost';font-weight:600;font-size:15px;letter-spacing:.04em;color:#21412E;margin-bottom:16px;display:flex;align-items:center;gap:10px";

  if (done) {
    return (
      <div className="bz-pad" style={s("max-width:600px;margin:0 auto;padding:90px 40px;text-align:center")}>
        <span style={s("width:88px;height:88px;border-radius:50%;background:#21412E;display:inline-flex;align-items:center;justify-content:center;margin-bottom:26px")}><Svg html={IC.bigCheck} /></span>
        <h1 className="bz-h1" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:44px;color:#21412E;margin-bottom:14px")}>Pedido confirmado!</h1>
        <p style={s("font-size:17px;color:#5A4D3C;line-height:1.65;margin-bottom:8px")}>Obrigado pela compra. Enviamos a confirmação e o código de rastreio para o seu e-mail.</p>
        <p style={s("font-size:15px;color:#8A7B68;margin-bottom:30px")}>Pedido <strong style={s("color:#2E2218")}>#BRZ-2026-0847</strong> · Torramos e enviamos em até 2 dias úteis.</p>
        <button onClick={goHome} className="bz-primary" style={s("background:#D17B4C;color:#fff;border:none;border-radius:40px;padding:15px 32px;font-family:'Jost';font-weight:600;font-size:15.5px;cursor:pointer")}>Voltar à loja</button>
      </div>
    );
  }

  const payOpt = (active: boolean) => ({
    border: active ? "#21412E" : "rgba(46,34,24,.16)",
    bg: active ? "#EBF0E7" : "#fff",
    dot: active ? "#21412E" : "#B0A088",
    fill: active ? "#21412E" : "transparent",
  });
  const pix = payOpt(payment === "pix");
  const card = payOpt(payment === "card");

  return (
    <div className="bz-pad" style={s("max-width:1140px;margin:0 auto;padding:30px 40px 90px")}>
      <button onClick={openCart} style={s("background:none;border:none;cursor:pointer;font-family:'Jost';font-size:14px;color:#6B5D4D;display:flex;align-items:center;gap:8px;margin-bottom:8px;font-weight:500")}><Svg html={IC.back} />Voltar à sacola</button>
      <h1 className="bz-h1" style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:42px;color:#21412E;margin-bottom:30px")}>Finalizar compra</h1>
      <div className="bz-grid2" style={s("display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:start")}>
        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); submit(); }} style={s("display:flex;flex-direction:column;gap:30px")}>
          <div>
            <h3 style={s(stepH)}><span style={s(stepNum)}>1</span>Contato</h3>
            <div style={s("display:flex;flex-direction:column;gap:12px")}>
              <input required placeholder="Nome completo" style={s(inputStyle)} />
              <div style={s("display:grid;grid-template-columns:1fr 1fr;gap:12px")}>
                <input required type="email" placeholder="E-mail" style={s(inputStyle)} />
                <input required placeholder="Celular / WhatsApp" style={s(inputStyle)} />
              </div>
            </div>
          </div>
          <div>
            <h3 style={s(stepH)}><span style={s(stepNum)}>2</span>Entrega</h3>
            <div style={s("display:flex;flex-direction:column;gap:12px")}>
              <div style={s("display:grid;grid-template-columns:1fr 2fr;gap:12px")}>
                <input required placeholder="CEP" style={s(inputStyle)} />
                <input required placeholder="Endereço" style={s(inputStyle)} />
              </div>
              <div className="bz-checkrow" style={s("display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px")}>
                <input required placeholder="Número" style={s(inputStyle)} />
                <input required placeholder="Cidade" style={s(inputStyle)} />
                <input required placeholder="UF" maxLength={2} style={s(inputStyle + ";text-transform:uppercase")} />
              </div>
            </div>
          </div>
          <div>
            <h3 style={s(stepH)}><span style={s(stepNum)}>3</span>Pagamento</h3>
            <div style={s("display:flex;flex-direction:column;gap:12px")}>
              <button type="button" onClick={() => setPayment("pix")} style={s(`text-align:left;border:1.5px solid ${pix.border};background:${pix.bg};border-radius:12px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px;font-family:'Jost'`)}>
                <span style={s(`width:18px;height:18px;border-radius:50%;border:2px solid ${pix.dot};flex:none;display:flex;align-items:center;justify-content:center`)}><span style={s(`width:8px;height:8px;border-radius:50%;background:${pix.fill}`)}></span></span>
                <span style={s("flex:1")}><span style={s("font-weight:600;font-size:15px;color:#2E2218;display:block")}>Pix</span><span style={s("font-size:13px;color:#8A7B68")}>Aprovação na hora · <strong style={s("color:#3C7A4E")}>5% de desconto</strong></span></span>
                <Svg html={IC.pix} />
              </button>
              <button type="button" onClick={() => setPayment("card")} style={s(`text-align:left;border:1.5px solid ${card.border};background:${card.bg};border-radius:12px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px;font-family:'Jost'`)}>
                <span style={s(`width:18px;height:18px;border-radius:50%;border:2px solid ${card.dot};flex:none;display:flex;align-items:center;justify-content:center`)}><span style={s(`width:8px;height:8px;border-radius:50%;background:${card.fill}`)}></span></span>
                <span style={s("flex:1")}><span style={s("font-weight:600;font-size:15px;color:#2E2218;display:block")}>Cartão de crédito</span><span style={s("font-size:13px;color:#8A7B68")}>Em até 3x sem juros</span></span>
                <Svg html={IC.card} />
              </button>
            </div>
          </div>
          <button type="submit" className="bz-primary" style={s("background:#D17B4C;color:#fff;border:none;border-radius:40px;padding:17px;font-family:'Jost';font-weight:600;font-size:16px;cursor:pointer;margin-top:6px")}>Concluir pedido · {total}</button>
        </form>

        {/* Summary */}
        <aside className="bz-nosticky" style={s("background:#fff;border:1px solid rgba(46,34,24,.1);border-radius:18px;padding:26px;position:sticky;top:100px")}>
          <h3 style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:24px;color:#21412E;margin-bottom:18px")}>Resumo do pedido</h3>
          <div style={s("display:flex;flex-direction:column;gap:14px;margin-bottom:18px;max-height:260px;overflow-y:auto")}>
            {cart.map((item) => (
              <div key={item.key} style={s("display:flex;gap:13px;align-items:center")}>
                <div style={s("position:relative;width:54px;height:64px;border-radius:8px;overflow:hidden;flex:none;background:#EBE2D0")}><img src={item.img} alt={item.name} style={s("width:100%;height:100%;object-fit:cover")} /><span style={s("position:absolute;top:-6px;right:-6px;background:#21412E;color:#F7F1E6;width:21px;height:21px;border-radius:50%;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600")}>{item.qty}</span></div>
                <div style={s("flex:1;min-width:0")}><div style={s("font-weight:600;font-size:13.5px;color:#2E2218;line-height:1.2")}>{item.name}</div><div style={s("font-size:12px;color:#8A7B68;margin-top:2px")}>{item.grind}</div></div>
                <span style={s("font-weight:600;font-size:14px;color:#21412E")}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={s("border-top:1px solid rgba(46,34,24,.1);padding-top:16px;display:flex;flex-direction:column;gap:9px")}>
            <div style={s("display:flex;justify-content:space-between;font-size:14.5px;color:#6B5D4D")}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div style={s("display:flex;justify-content:space-between;font-size:14.5px;color:#6B5D4D")}><span>Frete</span><span style={s("color:#3C7A4E;font-weight:600")}>{frete ? "Grátis" : fmt(freteCost)}</span></div>
            <div style={s("display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid rgba(46,34,24,.1);margin-top:8px;padding-top:14px")}><span style={s("font-weight:600;font-size:16px;color:#21412E")}>Total</span><span style={s("font-family:'Cormorant Garamond';font-weight:600;font-size:30px;color:#21412E")}>{total}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={s("background:#21412E;color:#E8DEC9;margin-top:0")}>
      <div className="bz-pad bz-foot" style={s("max-width:1240px;margin:0 auto;padding:72px 40px 40px;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px")}>
        <div>
          <img src={`${A}/logo.png`} alt="Brazano Café" style={s("height:54px;width:auto;display:block;margin-bottom:20px")} />
          <p style={s("font-size:15px;line-height:1.7;color:#B9C7AE;max-width:330px")}>Café especial da Amazônia e de Minas Gerais. Torrado em pequenos lotes, do grão à sua xícara.</p>
          <div style={s("display:flex;gap:12px;margin-top:24px")}>
            {[IC.insta, IC.fb, IC.wa].map((ic, i) => (
              <span key={i} style={s("width:40px;height:40px;border-radius:50%;border:1px solid rgba(232,222,201,.28);display:flex;align-items:center;justify-content:center")}><Svg html={ic} /></span>
            ))}
          </div>
        </div>
        <div>
          <h4 style={s("font-family:'Jost';font-weight:600;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#D8C49A;margin-bottom:18px")}>Loja</h4>
          <ul style={s("list-style:none;display:flex;flex-direction:column;gap:13px;font-size:15px;color:#B9C7AE;padding:0;margin:0")}>
            <li>Café Arábica</li><li>Café Robusta Amazônico</li><li>Reserva Tesouro da Amazônia</li><li>Kits &amp; Presentes</li>
          </ul>
        </div>
        <div>
          <h4 style={s("font-family:'Jost';font-weight:600;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#D8C49A;margin-bottom:18px")}>Atendimento</h4>
          <ul style={s("list-style:none;display:flex;flex-direction:column;gap:13px;font-size:15px;color:#B9C7AE;padding:0;margin:0")}>
            <li>Rastrear pedido</li><li>Trocas &amp; devoluções</li><li>Fale conosco</li><li>WhatsApp: (69) 99999-0000</li>
          </ul>
        </div>
      </div>
      <div className="bz-pad" style={s("border-top:1px solid rgba(232,222,201,.16);max-width:1240px;margin:0 auto;padding:22px 40px;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#94A589;flex-wrap:wrap;gap:10px")}>
        <span>© 2026 Brazano Café · Porto Velho, Rondônia</span>
        <span style={s("display:flex;gap:10px;align-items:center")}>Pagamento seguro · Pix · Cartão</span>
      </div>
    </footer>
  );
}
