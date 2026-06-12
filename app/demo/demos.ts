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
];
