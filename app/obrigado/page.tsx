import type { Metadata } from "next";
import Link from "next/link";
import TrackLead from "./TrackLead";

const WHATSAPP = "5569999222517";
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Olá! Acabei de preencher o formulário no site e quero meu orçamento.",
)}`;

export const metadata: Metadata = {
  title: "Recebido! | DevDesk",
  // Página de conversão: não deve ser indexada pelo Google.
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <TrackLead />

      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-3xl">
          ✅
        </div>

        <h1 className="mt-8 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Recebido! Já já te respondo. 👋
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-zinc-400">
          Seus dados chegaram aqui. Te chamo no WhatsApp com o orçamento o quanto
          antes — normalmente no mesmo dia.
        </p>

        <p className="mt-8 text-sm text-zinc-500">
          A janela do WhatsApp não abriu? Toca no botão:
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-semibold text-black shadow-xl shadow-black/30 transition-transform hover:scale-[1.03]"
        >
          Continuar no WhatsApp →
        </a>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-zinc-400 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}
