import type { Metadata } from "next";
import AlineBronze from "./AlineBronze";

export const metadata: Metadata = {
  title: "Aline Bronze · Bronzeamento & Estética — Prévia DevDesk",
  description:
    "Prévia do site Aline Bronze: referência em bronzeamento, banhos, spa corporal e cosméticos em Porto Velho - RO.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AlineBronze />;
}
