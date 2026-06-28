/**
 * Funções de sanitização para prevenir XSS (Cross-Site Scripting).
 * Remove tags HTML, scripts e caracteres perigosos de strings.
 */
import { auditLog } from "./audit-log";

/**
 * Remove todas as tags HTML e scripts de uma string.
 * Também converte entidades HTML para seus caracteres equivalentes.
 */
export function sanitizeText(input: string, context?: string, ip?: string): string {
  if (!input) return "";

  // Detecta tentativa de XSS
  const xssPatterns = [
    /<script[\s>]/i,
    /on\w+=['"]/i,
    /javascript\s*:/i,
    /<iframe[\s>]/i,
    /<object[\s>]/i,
    /<embed[\s>]/i,
    /<svg[\s>]/i,
    /<style[\s>]/i,
    /evaluation\s*\(/i,
    /document\s*\./i,
    /window\s*\./i,
    /\.innerHTML/i,
    /alert\s*\(/i,
    /prompt\s*\(/i,
    /confirm\s*\(/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      auditLog("XSS_DETECTED", ip || "unknown", `Tentativa de XSS detectada: ${pattern}. Input: ${input.substring(0, 100)}`);
      break;
    }
  }

  // Remove tags HTML
  let sanitized = input.replace(/<[^>]*>/g, "");

  // Remove entidades HTML perigosas
  sanitized = sanitized.replace(/&#\d+;/g, ""); // entidades decimais
  sanitized = sanitized.replace(/&#x[0-9a-fA-F]+;/g, ""); // entidades hexadecimais

  // Normaliza espaços múltiplos
  sanitized = sanitized.replace(/\s+/g, " ").trim();

  return sanitized;
}

/**
 * Sanitiza um objeto de strings recursivamente.
 * Útil para sanitizar todo o body de uma requisição de uma vez.
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  context?: string,
  ip?: string
): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = sanitizeText(value, context, ip);
    } else if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = sanitizeObject(value as Record<string, unknown>, context, ip);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "string"
          ? sanitizeText(item, context, ip)
          : typeof item === "object" && item !== null
          ? sanitizeObject(item as Record<string, unknown>, context, ip)
          : item
      );
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
