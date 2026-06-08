import { renderOg } from "@/app/og-template";

export const alt = "Loja virtual vendendo em 10 dias | DevDesk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Loja virtual · preço fechado",
    title: "Sua loja vendendo 24h por dia.",
  });
}
