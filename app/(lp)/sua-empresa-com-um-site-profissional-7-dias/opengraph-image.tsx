import { renderOg } from "@/app/og-template";

export const alt = "Site profissional pra sua empresa em 7 dias | DevDesk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Site profissional · preço fechado",
    title: "Sua empresa no ar em 7 dias.",
  });
}
