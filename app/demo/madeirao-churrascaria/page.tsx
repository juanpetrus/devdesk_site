import type { Metadata } from "next";
import Madeirao from "./Madeirao";

export const metadata: Metadata = {
  title: "Madeirão Churrascaria — Prévia DevDesk",
  description:
    "Prévia do site Madeirão Churrascaria: rodízio, buffet à kg, espetos na brasa e marmitex em Porto Velho - RO.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Madeirao />;
}
