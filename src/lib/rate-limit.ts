/**
 * Rate Limiter simples em memória para evitar abuso das API routes.
 * 
 * Limites:
 * - /api/avaliacoes: 5 requests por minuto por IP
 * - /api/mensagens: 10 requests por minuto por IP
 * 
 * Limpeza automática de entradas expiradas a cada requisição.
 */
import { NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number; // timestamp em ms
}

const store = new Map<string, RateLimitEntry>();

// Limpeza periódica de entradas expiradas (a cada minuto)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }, 60_000);
}

export interface RateLimitConfig {
  /** Máximo de requests permitidos no período */
  maxRequests: number;
  /** Período em segundos (padrão: 60s = 1 minuto) */
  windowSeconds: number;
}

const defaultConfigs: Record<string, RateLimitConfig> = {
  avaliacoes: { maxRequests: 5, windowSeconds: 60 },
  mensagens: { maxRequests: 10, windowSeconds: 60 },
};

/**
 * Aplica rate limiting para uma requisição.
 * Retorna um NextResponse com 429 se exceder o limite, ou null se permitido.
 */
export function checkRateLimit(
  ip: string,
  endpoint: keyof typeof defaultConfigs
): NextResponse | null {
  const config = defaultConfigs[endpoint] ?? { maxRequests: 30, windowSeconds: 60 };
  const now = Date.now();
  const key = `${endpoint}:${ip}`;

  // Limpa entradas expiradas (lazy cleanup)
  for (const [k, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // Primeira requisição ou janela expirou — cria nova entrada
    store.set(key, {
      count: 1,
      resetAt: now + config.windowSeconds * 1000,
    });
    return null; // permitido
  }

  entry.count += 1;

  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      {
        success: false,
        error: `Muitas requisições. Tente novamente em ${retryAfter} segundos.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(config.maxRequests),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  return null; // permitido
}

/**
 * Extrai o IP real do cliente, considerando proxies (Vercel, Cloudflare, etc.)
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}
