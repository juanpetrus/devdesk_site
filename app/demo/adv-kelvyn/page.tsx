import type { Metadata } from "next";
import AdvKelvyn from "./AdvKelvyn";

export const metadata: Metadata = {
  title: "Kelvyn Lebkuchen · Advocacia FIES Médicos — Prévia DevDesk",
  description:
    "Prévia do site Kelvyn Lebkuchen: advocacia especializada em abatimento e renegociação do FIES para médicos. Atendimento em todo o Brasil.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdvKelvyn />;
}
