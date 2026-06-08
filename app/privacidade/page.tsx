import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "contato@devdesk.com.br";
const CIDADE = "Porto Velho, RO";
const ATUALIZADO = "8 de junho de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade | DevDesk",
  description:
    "Como a DevDesk Tecnologia coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  robots: { index: true, follow: true },
};

function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {titulo}
      </h2>
      <div className="mt-4 space-y-4 leading-7 text-zinc-400">{children}</div>
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-bold leading-none tracking-tight text-white text-xl">
              DevDesk<span className="text-brand-soft">Tech</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Última atualização: {ATUALIZADO}
        </p>

        <p className="mt-8 leading-7 text-zinc-300">
          Esta Política descreve como a <strong>DevDesk Tecnologia</strong> (“DevDesk”,
          “nós”) coleta, utiliza, armazena e protege os dados pessoais de quem
          visita nossas páginas e entra em contato conosco, em conformidade com a
          Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).
        </p>

        <Bloco titulo="1. Quem é o controlador dos dados">
          <p>
            A DevDesk Tecnologia, sediada em {CIDADE}, é a responsável (controladora)
            pelo tratamento dos dados pessoais coletados em nossos sites e páginas de
            campanha. Para qualquer questão sobre privacidade, fale com a gente pelo
            e-mail{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-brand-soft hover:text-white"
            >
              {EMAIL}
            </a>
            .
          </p>
        </Bloco>

        <Bloco titulo="2. Quais dados coletamos">
          <p>Coletamos apenas o necessário para atender você:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Dados que você nos fornece:</strong> nome, número de WhatsApp,
              ramo de atividade e demais informações que você envia voluntariamente
              pelo formulário ou ao iniciar uma conversa conosco.
            </li>
            <li>
              <strong>Dados de navegação coletados automaticamente:</strong>{" "}
              endereço IP, tipo de dispositivo e navegador, páginas visitadas e
              interações, coletados por meio de cookies e tecnologias semelhantes
              (veja o item 5).
            </li>
          </ul>
        </Bloco>

        <Bloco titulo="3. Para que usamos seus dados">
          <ul className="list-disc space-y-2 pl-5">
            <li>Responder seu contato e elaborar orçamentos e propostas.</li>
            <li>Prestar os serviços contratados e dar suporte.</li>
            <li>
              Medir e melhorar o desempenho dos nossos anúncios e páginas, entendendo
              quais campanhas geram contato.
            </li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </Bloco>

        <Bloco titulo="4. Base legal">
          <p>
            Tratamos seus dados com base no seu <strong>consentimento</strong>, na
            execução de contrato ou de procedimentos preliminares a seu pedido, no
            atendimento a obrigações legais e no <strong>legítimo interesse</strong>{" "}
            para medir e melhorar nossas campanhas — sempre respeitando seus direitos.
          </p>
        </Bloco>

        <Bloco titulo="5. Cookies e ferramentas de medição">
          <p>
            Utilizamos cookies e tecnologias de medição, incluindo o{" "}
            <strong>Meta Pixel</strong> (Facebook/Instagram) e ferramentas de
            análise, para entender como você usa nossas páginas e para mensurar e
            otimizar nossos anúncios. Essas ferramentas podem coletar dados de
            navegação e identificadores do dispositivo.
          </p>
          <p>
            Você pode bloquear ou apagar cookies nas configurações do seu navegador.
            Ao desativá-los, algumas funcionalidades podem ser afetadas.
          </p>
        </Bloco>

        <Bloco titulo="6. Compartilhamento de dados">
          <p>
            Não vendemos seus dados. Podemos compartilhá-los apenas com fornecedores
            que viabilizam nossa operação, como:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Plataformas de anúncios e análise (ex.: Meta Platforms, Google), para
              medição e veiculação de campanhas;
            </li>
            <li>
              Serviços de mensageria (ex.: WhatsApp), quando você opta por falar
              conosco por esse canal;
            </li>
            <li>Serviços de hospedagem e infraestrutura das páginas.</li>
          </ul>
          <p>
            Esses parceiros possuem suas próprias políticas de privacidade e podem
            tratar dados conforme suas práticas.
          </p>
        </Bloco>

        <Bloco titulo="7. Por quanto tempo guardamos">
          <p>
            Mantemos seus dados pelo tempo necessário para as finalidades desta
            Política ou para cumprir obrigações legais. Depois disso, eles são
            eliminados ou anonimizados.
          </p>
        </Bloco>

        <Bloco titulo="8. Seus direitos (LGPD)">
          <p>
            Você pode, a qualquer momento, solicitar: confirmação da existência de
            tratamento; acesso aos seus dados; correção de dados incompletos ou
            desatualizados; anonimização ou eliminação; portabilidade; informação
            sobre compartilhamento; e revogação do consentimento. Para exercer esses
            direitos, escreva para{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-brand-soft hover:text-white"
            >
              {EMAIL}
            </a>
            .
          </p>
        </Bloco>

        <Bloco titulo="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger seus
            dados contra acesso não autorizado, perda ou uso indevido.
          </p>
        </Bloco>

        <Bloco titulo="10. Alterações desta Política">
          <p>
            Podemos atualizar esta Política periodicamente. A data da última revisão
            fica sempre indicada no topo desta página.
          </p>
        </Bloco>

        <Bloco titulo="11. Contato">
          <p>
            Dúvidas sobre privacidade ou sobre o tratamento dos seus dados? Fale com a
            DevDesk Tecnologia pelo e-mail{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-brand-soft hover:text-white"
            >
              {EMAIL}
            </a>
            .
          </p>
        </Bloco>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center text-sm text-zinc-500">
          DevDesk Tecnologia · {CIDADE} · {EMAIL}
        </div>
      </footer>
    </div>
  );
}
