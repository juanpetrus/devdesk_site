import type { Metadata } from "next";
import BpcLoas from "./BpcLoas";

export const metadata: Metadata = {
  title: "BPC/LOAS · Kelvyn Lebkuchen — Prévia DevDesk",
  description:
    "Prévia da landing page BPC/LOAS do Kelvyn Lebkuchen: benefício de prestação continuada para idosos 65+ e pessoas com deficiência de baixa renda.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BpcLoas />;
}
