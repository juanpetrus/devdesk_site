import { renderOg } from "@/app/og-template";

export const alt = "DevDesk — Sites, lojas virtuais e sistemas sob medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Tecnologia sob medida",
    title: "Sites, lojas e sistemas que trabalham por você.",
  });
}
