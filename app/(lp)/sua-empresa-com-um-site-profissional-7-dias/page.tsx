import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Lp from "./Lp";
import "./lp.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-lp-display",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lp-body",
});

export const metadata: Metadata = {
  title: "Site profissional pra sua empresa em 7 dias | DevDesk",
  description:
    "Preço fechado, sem orçamento enrolado. Site rápido, no Google e feito pra transformar visitante em cliente — por quem desenvolve de verdade. No ar em 7 dias.",
  openGraph: {
    title: "Site profissional pra sua empresa em 7 dias | DevDesk",
    description:
      "Preço fechado, entrega em 7 dias e atendimento direto com quem desenvolve.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Lp />
    </div>
  );
}
