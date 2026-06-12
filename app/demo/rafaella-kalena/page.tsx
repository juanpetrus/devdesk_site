import type { Metadata } from "next";
import RafaellaKalena from "./RafaellaKalena";

export const metadata: Metadata = {
  title: "Rafaella Kalena · Fisioterapeuta — Prévia DevDesk",
  description:
    "Prévia do site da fisioterapeuta Rafaella Kalena: terapia da dor, liberação miofascial e cuidado para o corpo feminino.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RafaellaKalena />;
}
