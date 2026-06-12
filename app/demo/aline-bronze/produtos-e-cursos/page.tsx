import type { Metadata } from "next";
import ProdutosCursos from "./ProdutosCursos";

export const metadata: Metadata = {
  title: "Produtos & Cursos · Aline Bronze — Prévia DevDesk",
  description:
    "Bronze de Milhões, formação de especialistas e a linha de cosméticos e moda praia Aline Bronze.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ProdutosCursos />;
}
