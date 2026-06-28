# 🔒 Segurança — MC Transporte Executivo

Este documento descreve todas as proteções de segurança implementadas no projeto.

---

## 🛡️ Camadas de Segurança

### 1. Validação de Input (Zod)
- **Arquivo:** `src/lib/validations.ts`
- Todos os campos passam por schemas Zod antes de chegar ao banco
- Limites rigorosos: nome 2–100, telefone 8–30, mensagem até 2000
- Rejeição com erro 400 e mensagem em português

### 2. Rate Limiting
- **Arquivo:** `src/lib/rate-limit.ts`
- `/api/avaliacoes`: 5 requests por minuto por IP
- `/api/mensagens`: 10 requests por minuto por IP
- Limpeza automática de entradas expiradas
- Resposta 429 com header `Retry-After`

### 3. Sanitização contra XSS
- **Arquivo:** `src/lib/sanitize.ts`
- Remove tags HTML, scripts, eventos de clique (`onclick`, etc.)
- Detecta padrões perigosos: `<script>`, `javascript:`, `<iframe>`, `alert()`, etc.
- Loga tentativas de XSS via `auditLog`
- Nunca usa `dangerouslySetInnerHTML` no frontend

### 4. Honeypot Anti-Bot
- **Arquivo:** `src/lib/honeypot.ts`
- Campo hidden `website` nos formulários (classe `sr-only`, `tabindex="-1"`)
- Bots preenchem tudo automaticamente → detectados e bloqueados
- Retorno 200 silencioso para não alertar o bot

### 5. Headers de Segurança (CSP, HSTS, etc.)
- **Arquivo:** `next.config.ts`
- `X-Frame-Options: DENY` — bloqueia clickjacking
- `X-Content-Type-Options: nosniff` — previne MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — bloqueia APIs sensíveis
- `Content-Security-Policy` rigorosa:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
  - `style-src 'self' 'unsafe-inline'`
  - `img-src 'self' data: https:`
  - `connect-src 'self' https://wa.me`
  - `frame-ancestors 'none'`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (apenas produção)

### 6. CORS Simplificado
- **Arquivo:** `src/lib/cors.ts`
- Desenvolvimento: permite `localhost:3000`, `localhost:3001`, `127.0.0.1:3000`
- Produção: permite apenas `NEXT_PUBLIC_SITE_URL` configurado
- Bloqueia origins desconhecidas com 403
- Loga tentativas de acesso inválidas

### 7. Limite de Tamanho de Request
- Máximo **1MB** por body nas API routes
- Rejeição com 413 se exceder

### 8. Moderação de Avaliações
- Todas as avaliações novas criam com `aprovado: false`
- Painel admin em `/api/admin/avaliacoes` protegido por token `ADMIN_TOKEN`
- Apenas administrador pode aprovar/rejeitar
- Visibilidade pública apenas de avaliações aprovadas

### 9. Log de Auditoria
- **Arquivo:** `src/lib/audit-log.ts`
- Formato: `[ISO_TIMESTAMP] [TIPO] [IP] mensagem`
- Eventos registrados:
  - `RATE_LIMIT_EXCEEDED`
  - `XSS_DETECTED`
  - `HONEYPOT_TRIGGERED`
  - `VALIDATION_ERROR`
  - `CORS_BLOCKED`
  - `ADMIN_ACTION`
  - `BODY_TOO_LARGE`
- Não registra dados sensíveis (senhas, tokens)

### 10. Proteção de Variáveis de Ambiente
- `.env` está no `.gitignore` (linha 34)
- `.env.example` contém apenas placeholders
- Apenas variáveis com `NEXT_PUBLIC_` são expostas no browser
- `DATABASE_URL`, `ADMIN_TOKEN` nunca chegam ao client

---

## 🚨 Boas Práticas Aplicadas

1. **Princípio do menor privilégio** — APIs não expõem dados além do necessário
2. **Defense in depth** — múltiplas camadas: validação → sanitização → honeypot → rate limit → CORS
3. **Fail-safe** — em caso de erro, retorna 500 sem stack trace no JSON
4. **Logs sem dados sensíveis** — apenas IP, tipo do evento e mensagem genérica
5. **Acessibilidade** — skip link, `aria-label`, `role="main"`, navegação por teclado
6. **HTTPS obrigatório em produção** — HSTS força HTTPS por 1 ano

---

## 📋 Checklist de Segurança

| Item | Status |
|------|--------|
| Validação Zod em todas as entradas | ✅ |
| Rate limiting por IP | ✅ |
| Sanitização XSS | ✅ |
| Honeypot anti-bot | ✅ |
| Headers de segurança (7+) | ✅ |
| CORS por origem | ✅ |
| Limite de body (1MB) | ✅ |
| Moderação de avaliações | ✅ |
| Log de auditoria | ✅ |
| `.env` no `.gitignore` | ✅ |
| Variáveis sensíveis não expostas | ✅ |
| HTTPS via HSTS | ✅ |

---

## 🔧 Configuração Obrigatória em Produção

1. **Variável `ADMIN_TOKEN`** — defina uma senha forte no `.env`
2. **Variável `NEXT_PUBLIC_SITE_URL`** — coloque o domínio real (ex: `https://mctransporte.com.br`)
3. **Database** — considere migrar de SQLite para Supabase/PlanetScale em produção

---

## 📞 Responsável

Projeto desenvolvido para **Milton Cesar — MC Transporte Executivo**.  
Dúvidas sobre segurança? Consulte a documentação do [Next.js](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy) e [Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/crud).