/**
 * Validação de origem (CORS simplificado) para as API routes.
 * 
 * Em desenvolvimento: permite localhost:3000
 * Em produção: permite apenas o domínio configurado em NEXT_PUBLIC_SITE_URL
 */
import { NextResponse } from "next/server";
import { auditLog } from "./audit-log";

const DEVELOPMENT_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
];

/**
 * Verifica se a origem da requisição é permitida.
 * Retorna um NextResponse com 403 se a origem for inválida, ou null se permitido.
 */
export function checkOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  // Se não há origin (mesma origem, ex: Next.js server-side), permite
  if (!origin) return null;

  const isDev = process.env.NODE_ENV === "development";

  // Em desenvolvimento, permite origens locais
  if (isDev && DEVELOPMENT_ORIGINS.includes(origin)) {
    return null;
  }

  // Em produção, permite o domínio configurado
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && origin === siteUrl) {
    return null;
  }

  // Permite também a própria origem (caso de proxy reverso)
  if (siteUrl) {
    try {
      const originUrl = new URL(origin);
      const siteUrlObj = new URL(siteUrl);
      if (originUrl.hostname === siteUrlObj.hostname) {
        return null;
      }
    } catch {
      // URL inválida, continua para rejeitar
    }
  }

  auditLog("CORS_BLOCKED", ip, `Origem bloqueada: ${origin}`);

  return NextResponse.json(
    { success: false, error: "Origem não permitida." },
    { status: 403 }
  );
}
