import type { Metadata } from "next";
import MetaSun from "./MetaSun";

export const metadata: Metadata = {
  title: "Meta Sun Energia Solar — Prévia DevDesk",
  description:
    "Prévia do site Meta Sun: energia solar, sistema BESS e simulador de economia em Porto Velho - RO.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MetaSun />;
}
