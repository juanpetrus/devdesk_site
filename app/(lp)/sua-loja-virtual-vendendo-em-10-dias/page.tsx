import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import LpEcommerce from "./LpEcommerce";
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
  title: "Loja virtual pra sua empresa vendendo em 10 dias | DevDesk",
  description:
    "Pare de vender só no balcão. Loja virtual profissional, com pagamento e frete configurados, no ar em até 10 dias — preço fechado, por quem desenvolve de verdade.",
  openGraph: {
    title: "Loja virtual pra sua empresa vendendo em 10 dias | DevDesk",
    description:
      "Pagamento e frete configurados, você gerencia sozinho e vende 24h por dia. No ar em até 10 dias.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <LpEcommerce />
    </div>
  );
}
