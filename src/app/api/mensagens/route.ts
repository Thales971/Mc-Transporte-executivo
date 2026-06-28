import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mensagemSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { validateHoneypot } from "@/lib/honeypot";
import { checkOrigin } from "@/lib/cors";
import { auditLog } from "@/lib/audit-log";

/**
 * POST /api/mensagens
 * Salva a mensagem enviada pelo formulário de contato no banco.
 * (Além de abrir o WhatsApp — feito no frontend.)
 * Aplica validação Zod, rate limit, sanitização e honeypot.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    // 1. Verifica origem
    const originCheck = checkOrigin(req);
    if (originCheck) return originCheck;

    // 2. Rate limiting (10 requests/minuto/IP)
    const rateLimitCheck = checkRateLimit(ip, "mensagens");
    if (rateLimitCheck) {
      auditLog("RATE_LIMIT_EXCEEDED", ip, "Rate limit excedido em /api/mensagens");
      return rateLimitCheck;
    }

    // 3. Limite de tamanho do body (1MB)
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 1_048_576) {
      auditLog("BODY_TOO_LARGE", ip, `Body muito grande: ${contentLength} bytes`);
      return NextResponse.json(
        { success: false, error: "Requisição muito grande (máx 1MB)." },
        { status: 413 }
      );
    }

    // 4. Lê o body
    const body = await req.json();

    // 5. Verifica honeypot anti-bot
    if (validateHoneypot(body)) {
      auditLog("HONEYPOT_TRIGGERED", ip, "Honeypot acionado em /api/mensagens");
      // Retorna 200 silenciosamente para não alertar o bot
      return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso." });
    }

    // 6. Sanitização contra XSS em todos os campos de texto
    const sanitizedBody = {
      nome: sanitizeText(body.nome || "", "mensagem", ip),
      telefone: sanitizeText(body.telefone || "", "mensagem", ip),
      email: body.email ? sanitizeText(body.email, "mensagem", ip) : null,
      servico: sanitizeText(body.servico || "", "mensagem", ip),
      dataHora: body.dataHora ? sanitizeText(body.dataHora, "mensagem", ip) : null,
      mensagem: body.mensagem ? sanitizeText(body.mensagem, "mensagem", ip) : null,
    };

    // 7. Validação com Zod
    const parsed = mensagemSchema.safeParse(sanitizedBody);

    if (!parsed.success) {
      const erros = parsed.error.issues.map((issue) => issue.message);
      auditLog("VALIDATION_ERROR", ip, `Erro de validação em mensagem: ${erros.join(", ")}`);
      return NextResponse.json(
        { success: false, error: erros.join(". ") },
        { status: 400 }
      );
    }

    const { nome, telefone, email, servico, dataHora, mensagem } = parsed.data;

    // 8. Salva no banco
    const nova = await db.mensagem.create({
      data: {
        nome: nome.slice(0, 100),
        telefone: telefone.slice(0, 30),
        email: email && email.length > 0 ? email.slice(0, 150) : null,
        servico: servico.slice(0, 100),
        dataHora: dataHora ? dataHora.slice(0, 100) : null,
        mensagem: mensagem ? mensagem.slice(0, 2000) : null,
        status: "nova",
      },
    });

    return NextResponse.json({ success: true, data: nova }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);

    // Erro de JSON malformado
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Formato JSON inválido." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erro ao salvar mensagem" },
      { status: 500 }
    );
  }
}
