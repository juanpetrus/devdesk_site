import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "./components/GoogleTagManager";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devdesktech.com"),
  title: "DevDesk Tecnologia — Sites, lojas virtuais e sistemas sob medida",
  description:
    "Tiramos sua empresa do WhatsApp e da planilha. Sites que vendem, lojas que convertem e sistemas que automatizam — feitos por quem desenvolve de verdade.",
  keywords: [
    "desenvolvimento de sites",
    "loja virtual",
    "e-commerce",
    "sistema sob medida",
    "software para empresas",
    "DevDesk",
  ],
  openGraph: {
    title: "DevDesk Tecnologia",
    description:
      "Sites, lojas virtuais e sistemas sob medida para sua empresa parar de perder tempo (e cliente).",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
