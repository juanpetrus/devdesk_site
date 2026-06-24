import type { Metadata } from "next";
import Brazano from "./Brazano";

export const metadata: Metadata = {
  title: "Brazano Café — Prévia DevDesk",
  description:
    "Prévia da loja Brazano Café: café especial da Amazônia e de Minas Gerais, com catálogo, página de produto e checkout.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Brazano />;
}
