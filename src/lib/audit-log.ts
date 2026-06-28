/**
 * Sistema de log de auditoria para eventos de segurança.
 * 
 * Formato: [ISO_TIMESTAMP] [TIPO] [IP] mensagem
 * 
 * Não registra dados sensíveis como senhas ou tokens.
 */
const LOG_PREFIX = "[MC-TRANSPORTE-SEC]";

type AuditEventType =
  | "RATE_LIMIT_EXCEEDED"
  | "XSS_DETECTED"
  | "HONEYPOT_TRIGGERED"
  | "VALIDATION_ERROR"
  | "CORS_BLOCKED"
  | "ADMIN_ACTION"
  | "BODY_TOO_LARGE";

/**
 * Registra um evento de auditoria.
 * Em produção, poderia enviar para um serviço externo (Sentry, Logtail, etc.).
 */
export function auditLog(
  type: AuditEventType,
  ip: string,
  message: string
): void {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${type}] [${ip}] ${message}`;

  // Em desenvolvimento: loga no console
  // Em produção: poderia enviar para um arquivo ou serviço externo
  if (process.env.NODE_ENV === "development") {
    console.warn(`${LOG_PREFIX} ${logLine}`);
  } else {
    // Em produção, use console.warn para não poluir stdout
    // Considere integrar com Sentry, Logtail, etc.
    console.warn(`${LOG_PREFIX} ${logLine}`);
  }

  // TODO: Em produção, adicionar:
  // - Envio para serviço de logging (ex: Logtail, Datadog)
  // - Salvamento em arquivo ou banco
  // - Notificação por e-mail para eventos críticos
}
