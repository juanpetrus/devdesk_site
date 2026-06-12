import type { Metadata } from "next";
import VidaLeve from "./VidaLeve";

export const metadata: Metadata = {
  title: "Vida Leve · Spa Urbano — Prévia DevDesk",
  description:
    "Prévia do site Vida Leve Spa: massagens, day spa e produção de beleza para noivas e debutantes.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VidaLeve />;
}
