import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAprovacaoSchema } from "@/lib/validations";
import { getClientIp } from "@/lib/rate-limit";
import { auditLog } from "@/lib/audit-log";

/**
 * Middleware simples para verificar o token de admin.
 * Token deve ser passado no header `x-admin-token`.
 */
function checkAdmin(request: Request): { authorized: boolean; ip: string } {
  const ip = getClientIp(request);
  const adminToken = request.headers.get("x-admin-token");
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken) {
    console.warn("[SECURITY] ADMIN_TOKEN não configurado no .env!");
    return { authorized: false, ip };
  }

  if (adminToken !== expectedToken) {
    return { authorized: false, ip };
  }

  return { authorized: true, ip };
}

/**
 * GET /api/admin/avaliacoes
 * Lista TODAS as avaliações (aprovadas e pendentes).
 * Protegida por token admin.
 */
export async function GET(req: NextRequest) {
  const { authorized, ip } = checkAdmin(req);

  if (!authorized) {
    auditLog("ADMIN_ACTION", ip, "Tentativa de acesso admin sem token válido");
    return NextResponse.json(
      { success: false, error: "Não autorizado. Forneça o token de admin no header x-admin-token." },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const aprovado = url.searchParams.get("aprovado"); // "true", "false", ou null (todos)

    const where = aprovado !== null ? { aprovado: aprovado === "true" } : {};

    const avaliacoes = await db.avaliacao.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      data: avaliacoes,
      total: avaliacoes.length,
    });
  } catch (error) {
    console.error("Erro ao listar avaliações (admin):", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar avaliações" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/avaliacoes
 * Aprova ou rejeita uma avaliação.
 * Protegida por token admin.
 * Body: { id: string, aprovado: boolean }
 */
export async function PATCH(req: NextRequest) {
  const { authorized, ip } = checkAdmin(req);

  if (!authorized) {
    auditLog("ADMIN_ACTION", ip, "Tentativa de ação admin sem token válido");
    return NextResponse.json(
      { success: false, error: "Não autorizado. Forneça o token de admin no header x-admin-token." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const parsed = adminAprovacaoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos. Envie { id, aprovado }." },
        { status: 400 }
      );
    }

    const { id, aprovado } = parsed.data;

    const updated = await db.avaliacao.update({
      where: { id },
      data: { aprovado },
    });

    auditLog("ADMIN_ACTION", ip, `Avaliação ${id} ${aprovado ? "aprovada" : "rejeitada"}`);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Formato JSON inválido." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erro ao atualizar avaliação. Verifique se o ID existe." },
      { status: 500 }
    );
  }
}
