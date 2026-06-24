// Registro central das prévias/demos de clientes.
// Pra adicionar uma nova: crie app/demo/<slug>/page.tsx e adicione uma linha aqui.
export type Demo = {
  slug: string;
  cliente: string;
  segmento: string;
  cor: string; // gradiente do card
};

export const demos: Demo[] = [
  {
    slug: "vida-leve-spa",
    cliente: "Vida Leve",
    segmento: "Spa Urbano · Bem-estar",
    cor: "linear-gradient(150deg,#F3E4D7,#E7C9BC)",
  },
  {
    slug: "aline-bronze",
    cliente: "Aline Bronze",
    segmento: "Bronzeamento & Estética · Porto Velho",
    cor: "linear-gradient(150deg,#7A1620,#C8A25A)",
  },
  {
    slug: "madeirao-churrascaria",
    cliente: "Madeirão Churrascaria",
    segmento: "Churrascaria · Porto Velho",
    cor: "linear-gradient(150deg,#2A1A0E,#E0651C)",
  },
  {
    slug: "rafaella-kalena",
    cliente: "Rafaella Kalena",
    segmento: "Fisioterapia · Terapia da dor",
    cor: "linear-gradient(150deg,#ECCBA6,#A1693F)",
  },
  {
    slug: "meta-sun",
    cliente: "Meta Sun Energia Solar",
    segmento: "Energia solar · Porto Velho",
    cor: "linear-gradient(150deg,#0C2B5E,#F58220)",
  },
  {
    slug: "brazano-cafe",
    cliente: "Brazano Café",
    segmento: "Café especial · E-commerce · Rondônia",
    cor: "linear-gradient(150deg,#21412E,#D17B4C)",
  },
];
