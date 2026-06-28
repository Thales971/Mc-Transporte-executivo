/**
 * Honeypot anti-bot para formulários.
 * 
 * Adiciona um campo hidden "website" nos formulários.
 * Bots preenchem tudo automaticamente, humanos não veem o campo (sr-only).
 * Se preenchido, rejeita silenciosamente (retorna 200 mas não salva).
 */
export const HONEYPOT_FIELD = "website";

/**
 * Verifica se o honeypot foi acionado.
 * Retorna true se o campo honeypot estiver preenchido (é um bot).
 */
export function validateHoneypot(body: Record<string, unknown>): boolean {
  if (body && typeof body === "object" && HONEYPOT_FIELD in body) {
    const value = body[HONEYPOT_FIELD];
    if (value && String(value).trim().length > 0) {
      return true; // Bot detectado
    }
  }
  return false;
}

/**
 * Props para adicionar o campo honeypot em formulários React.
 */
export function honeypotProps() {
  return {
    name: HONEYPOT_FIELD,
    tabIndex: -1,
    autoComplete: "off" as const,
    className: "sr-only",
    "aria-hidden": true,
  };
}
