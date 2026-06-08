// Recebe o lead do formulário das LPs e repassa pra planilha do Google
// (Apps Script). A URL fica em LEAD_WEBHOOK_URL — nunca exposta no cliente.

export async function POST(request: Request) {
  let lead: Record<string, unknown>;
  try {
    lead = await request.json();
  } catch {
    return Response.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  const payload = {
    nome: String(lead.nome ?? "").slice(0, 120),
    tel: String(lead.tel ?? "").slice(0, 40),
    ramo: String(lead.ramo ?? "").slice(0, 80),
    origem: String(lead.origem ?? "").slice(0, 80),
  };

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    // Sem destino configurado ainda: loga e não derruba o fluxo do usuário.
    console.warn("[lead] LEAD_WEBHOOK_URL não configurada", payload);
    return Response.json({ ok: true, saved: false });
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[lead] falha ao enviar pro webhook", err);
    return Response.json({ ok: false, saved: false }, { status: 502 });
  }

  return Response.json({ ok: true, saved: true });
}
