import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { avaliacaoSchema } from "@/lib/validations";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { validateHoneypot } from "@/lib/honeypot";
import { checkOrigin } from "@/lib/cors";
import { auditLog } from "@/lib/audit-log";

/**
 * GET /api/avaliacoes
 * Retorna apenas avaliações APROVADAS (para exibir no site público).
 * Suporte a query param ?all=true para retornar todas (uso admin).
 */
export async function GET(req: NextRequest) {
  try {
    // Verifica origem
    const originCheck = checkOrigin(req);
    if (originCheck) return originCheck;

    const url = new URL(req.url);
    const all = url.searchParams.get("all") === "true";

    const avaliacoes = await db.avaliacao.findMany({
      where: all ? {} : { aprovado: true },
      orderBy: { createdAt: "desc" },
      take: all ? undefined : 50,
    });

    return NextResponse.json({ success: true, data: avaliacoes });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar avaliações" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/avaliacoes
 * Cria uma nova avaliação com moderação (aprovado: false por padrão).
 * Aplica validação Zod, rate limit, sanitização e honeypot.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    // 1. Verifica origem
    const originCheck = checkOrigin(req);
    if (originCheck) return originCheck;

    // 2. Rate limiting (5 requests/minuto/IP)
    const rateLimitCheck = checkRateLimit(ip, "avaliacoes");
    if (rateLimitCheck) {
      auditLog("RATE_LIMIT_EXCEEDED", ip, "Rate limit excedido em /api/avaliacoes");
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
      auditLog("HONEYPOT_TRIGGERED", ip, "Honeypot acionado em /api/avaliacoes");
      // Retorna 200 silenciosamente para não alertar o bot
      return NextResponse.json({ success: true, message: "Avaliação registrada." });
    }

    // 6. Sanitização contra XSS em todos os campos de texto
    const sanitizedBody = {
      nome: sanitizeText(body.nome || "", "avaliacao", ip),
      nota: body.nota,
      comentario: sanitizeText(body.comentario || "", "avaliacao", ip),
      servico: body.servico ? sanitizeText(body.servico, "avaliacao", ip) : null,
    };

    // 7. Validação com Zod
    const parsed = avaliacaoSchema.safeParse(sanitizedBody);

    if (!parsed.success) {
      const erros = parsed.error.issues.map((issue) => issue.message);
      auditLog("VALIDATION_ERROR", ip, `Erro de validação: ${erros.join(", ")}`);
      return NextResponse.json(
        { success: false, error: erros.join(". ") },
        { status: 400 }
      );
    }

    const { nome, nota, comentario, servico } = parsed.data;

    // 8. Salva no banco (sempre não aprovado por padrão — moderação)
    const nova = await db.avaliacao.create({
      data: {
        nome: nome.slice(0, 100),
        nota: Math.round(nota),
        comentario: comentario.slice(0, 1000),
        servico: servico?.slice(0, 100) || null,
        aprovado: false, // 🔒 Moderação: precisa aprovação manual
      },
    });

    return NextResponse.json({ success: true, data: nova }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);

    // Erro de JSON malformado
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Formato JSON inválido." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erro ao salvar avaliação" },
      { status: 500 }
    );
  }
}

