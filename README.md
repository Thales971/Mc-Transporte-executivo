# 🚗 MC Transporte Executivo — Site do Milton Cesar

Site profissional para o motorista executivo **Milton Cesar**, com tema preto/dourado, modo claro e escuro, formulário de contato que envia mensagens via WhatsApp, sistema de avaliações funcionais, segurança completa e muito mais.

---

## 📋 O que está incluído

- ✅ **Next.js 16 + React + TypeScript** (App Router)
- ✅ **Tailwind CSS 4 + shadcn/ui** (componentes premium)
- ✅ **Prisma ORM + SQLite** (banco de dados local para avaliações e mensagens)
- ✅ **Modo claro e escuro** com toggle na navbar
- ✅ **Logo MC** em SVG (escalável)
- ✅ **11 seções**: Hero, Stats, Serviços, Conheça o Milton, Diferenciais, Viagens Personalizadas, Veículo (HB20S), Cobertura, Avaliações, Contato, Footer
- ✅ **Sistema de avaliações** funcional (API + banco de dados)
- ✅ **Formulário de contato** que salva no banco E abre o WhatsApp
- ✅ **Botão flutuante de WhatsApp**
- ✅ **100% responsivo** (mobile + desktop)
- ✅ **Segurança completa** (veja `SECURITY.md`)

---

## 🚀 Como rodar localmente

### Pré-requisitos
- **Node.js 18+** (ou [Bun](https://bun.sh) — recomendado)
- Git

### Passo a passo

```bash
# 1. Entre na pasta do projeto
cd mc-transporte-executivo

# 2. Instale as dependências
npm install
# ou, se tiver o Bun instalado (mais rápido):
bun install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# O DATABASE_URL já vem configurado para SQLite local

# 4. Crie o banco de dados (cria o arquivo dev.db com as tabelas)
npx prisma db push
# ou: bunx prisma db push

# 5. Inicie o servidor de desenvolvimento
npm run dev
# ou: bun run dev

# 6. Abra no navegador
# http://localhost:3000
```

Pronto! O site estará rodando em `http://localhost:3000`.

---

## 🧪 Testes Manuais Recomendados

Após rodar `npm run dev`, teste manualmente:

1. **Toggle de tema** — clique no botão sol/lua no canto superior direito
2. **Formulário de contato** — preencha e envie → deve abrir WhatsApp
3. **Formulário de avaliação** — envie uma avaliação → deve aparecer na lista
4. **Validação** — tente enviar campos vazios → deve mostrar erro
5. **Rate limit** — envie 6 avaliações seguidas → deve bloquear na 6ª
6. **Menu mobile** — reduza a janela para < 1280px → menu hamburguer deve aparecer
7. **Scroll** — role a página, navbar deve mudar de transparente para sólida
8. **Acessibilidade** — pressione `Tab` → deve ver o outline dourado nos campos

---

## 📁 Estrutura do projeto

```
mc-transporte-executivo/
├── docs/
│   └── PROMPT-MOTORISTA-EXECUTIVO.md   # Documentação + prompt para IA
├── prisma/
│   └── schema.prisma                    # Schema do banco (Avaliacao + Mensagem)
├── public/
│   ├── logo-mc.svg                      # Logo completa
│   ├── logo-mc-icon.svg                 # Ícone da logo
│   └── milton.jpg                       # Foto do Milton
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── avaliacoes/route.ts      # API de avaliações (GET/POST)
│   │   │   ├── admin/avaliacoes/route.ts # Painel admin de avaliações
│   │   │   └── mensagens/route.ts       # API de mensagens (POST)
│   │   ├── globals.css                  # Estilos + temas claro/escuro
│   │   ├── layout.tsx                   # Layout raiz + metadata SEO + skip link
│   │   ├── page.tsx                     # Página principal (compõe as seções)
│   │   ├── sitemap.ts                   # XML sitemap dinâmico
│   │   └── robots.ts                    # Robots.txt dinâmico
│   ├── components/
│   │   ├── site/                        # Componentes do site (17 arquivos)
│   │   │   ├── navbar.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── about-milton.tsx         # Seção "Conheça o Milton"
│   │   │   ├── services.tsx
│   │   │   ├── differentials.tsx        # Pontualidade/Respeito/Segurança
│   │   │   ├── personalized.tsx         # Viagens personalizadas
│   │   │   ├── fleet.tsx                # HB20S
│   │   │   ├── coverage.tsx             # Mapa Campinas-Vinhedo
│   │   │   ├── reviews.tsx              # Avaliações + formulário
│   │   │   ├── contact.tsx              # Contato (formulário + WhatsApp)
│   │   │   ├── footer.tsx
│   │   │   ├── floating-whatsapp.tsx
│   │   │   ├── theme-provider.tsx       # Modo claro/escuro
│   │   │   ├── theme-toggle.tsx
│   │   │   └── section-heading.tsx
│   │   └── ui/                          # Componentes shadcn/ui (40+ arquivos)
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── use-toast.ts
│   │   ├── use-contact-form.ts          # Hook do formulário de contato
│   │   └── use-review-form.ts           # Hook do formulário de avaliação
│   └── lib/
│       ├── site-config.ts               # ⭐ DADOS DO MILTON (edite aqui!)
│       ├── db.ts                        # Cliente Prisma
│       ├── validations.ts               # Schemas Zod
│       ├── rate-limit.ts                # Rate limiter
│       ├── sanitize.ts                  # Sanitização XSS
│       ├── honeypot.ts                  # Anti-bot
│       ├── cors.ts                      # Validação de origem
│       ├── audit-log.ts                 # Log de auditoria
│       └── utils.ts                     # Utilitários (cn, etc.)
├── .env.example                         # Variáveis de ambiente (exemplo)
├── SECURITY.md                          # Documentação de segurança
├── package.json                         # Dependências
├── next.config.ts                       # Config do Next.js + headers de segurança
├── tailwind.config.ts                   # Config do Tailwind
├── tsconfig.json                        # Config do TypeScript
└── README.md                            # Este arquivo
```

---

## ✏️ Como personalizar

### Dados do Milton
Edite **`src/lib/site-config.ts`** — lá estão todos os dados:

```typescript
export const siteConfig = {
  brand: "MC",
  driverName: "Milton Cesar",
  contact: {
    whatsappNumber: "551991726000",     // ← Seu WhatsApp
    whatsappDisplay: "(19) 99172-6000",
    email: "milton@mctransporte.com.br", // ← Seu e-mail
    linkedin: "https://www.linkedin.com/in/milton-cesar", // ← Seu LinkedIn
    instagram: "", // ← Seu Instagram
    facebook: "", // ← Seu Facebook
  },
  vehicle: {
    model: "Hyundai HB20S",
    year: "2024",
    category: "Sedan Executivo",
    capacity: "4 passageiros",
    luggage: "3 malas grandes",
    features: [
      "Ar-condicionado digital",
      "Bancos em couro",
      "Bagageiro amplo",
      "Carregador USB",
      "Água mineral inclusa",
    ],
    image: "/hb20s.jpg", // foto do carro em public/
  },
  payment: {
    methods: ["Pix", "Dinheiro"],
    pixInfo: "Pix: chave aleatória enviada no WhatsApp",
  },
  // ... serviços, diferenciais, áreas, etc.
}
```

### Cores
Edite as variáveis CSS em **`src/app/globals.css`** (seções `:root` para claro e `.dark` para escuro).

### Foto do Milton
Substitua **`public/milton.jpg`** por outra foto (mantenha o mesmo nome).

---

## 🛡️ Segurança

Este projeto implementa **10 camadas de segurança**. Leia o arquivo **`SECURITY.md`** para detalhes completos.

### Resumo Rápido
- ✅ Validação Zod em todas as APIs
- ✅ Rate limiting (5 req/min avaliações, 10 req/min mensagens)
- ✅ Sanitização XSS
- ✅ Honeypot anti-bot
- ✅ Headers de segurança (CSP, HSTS, X-Frame-Options)
- ✅ Validação de origem (CORS)
- ✅ Limite de body 1MB
- ✅ Moderação de avaliações (admin por token)
- ✅ Log de auditoria

---

## 🗄️ Banco de dados

O projeto usa **SQLite** (arquivo local `dev.db`), então não precisa configurar servidor.

### Tabelas:
- **`Avaliacao`**: nome, nota (1-5), comentário, serviço, aprovado, createdAt
- **`Mensagem`**: nome, telefone, email, servico, dataHora, mensagem, status, createdAt

### Ver mensagens/avaliações salvas:
```bash
# Abre o Prisma Studio (interface visual do banco)
npx prisma studio
# Acesse: http://localhost:5555
```

---

## 🌙 Modo claro/escuro

- O tema padrão é **escuro** (luxo)
- Clique no botão **sun/moon** no canto superior direito para alternar
- A preferência é salva no navegador (localStorage)

---

## 📱 Funcionalidades principais

### 1. Formulário de contato
- Preencha nome, telefone, serviço, etc.
- Ao enviar: **salva no banco** E **abre o WhatsApp** com a mensagem formatada
- Honeypot anti-bot invisível
- Validação em tempo real

### 2. Avaliações
- Qualquer visitante pode deixar uma avaliação (nome + nota + comentário)
- **Moderação ativada**: avaliações ficam pendentes (`aprovado: false`)
- Apenas admin pode aprovar via API

### 3. Painel Admin de Avaliações
Para moderar avaliações, use o endpoint:

```bash
# Listar todas (pendentes + aprovadas)
curl -H "x-admin-token: SEU_TOKEN_AQUI" http://localhost:3000/api/admin/avaliacoes

# Aprovar uma avaliação
curl -X PATCH \
  -H "x-admin-token: SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"id":"ID_DA_AVALIACAO","aprovado":true}' \
  http://localhost:3000/api/admin/avaliacoes

# Apenas pendentes
curl -H "x-admin-token: SEU_TOKEN_AQUI" "http://localhost:3000/api/admin/avaliacoes?aprovado=false"
```

**⚠️ O token é definido em `.env` → `ADMIN_TOKEN`**

### 4. WhatsApp
- Todos os botões "Reservar" / "Falar" abrem o WhatsApp com mensagem pré-preenchida
- Número configurado: **(19) 99172-6000**
- Botão flutuante fixo no canto inferior direito (mobile)

---

## 🚢 Deploy (publicar online)

### Opção 1: Vercel (recomendado, gratuito)

1. **Suba o projeto para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: projeto MC Transporte Executivo"
   git remote add origin https://github.com/seu-usuario/mc-transporte.git
   git push -u origin main
   ```

2. **Acesse [vercel.com](https://vercel.com)** → **New Project** → importe o repositório

3. **Configure variáveis de ambiente** na Vercel (Settings → Environment Variables):
   ```
   DATABASE_URL=file:./dev.db
   NEXT_PUBLIC_SITE_URL=https://mctransporte.com.br
   ADMIN_TOKEN=senha-super-segura-aqui
   ```

4. **Deploy!** — automático a cada push no GitHub

### Opção 2: Netlify
Similar à Vercel. Configure o build command como `npm run build`.

### Banco de dados em produção
⚠️ **SQLite não funciona em ambientes serverless (Vercel/Netlify).**  
Para produção, migre para:
- [Supabase](https://supabase.com) (PostgreSQL gratuito)
- [PlanetScale](https://planetscale.com) (MySQL gratuito)
- [Railway](https://railway.app) (PostgreSQL)

Veja a documentação do Prisma para migração: https://www.prisma.io/docs/orm/overview/databases

---

## 🔍 SEO — Aparecer no Google

### 1. Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Clique em **"Adicionar propriedade"**
3. Escolha **"Prefixo do URL"** e digite `https://mctransporte.com.br`
4. Verifique o ownership:
   - **Método recomendado**: baixe o arquivo HTML de verificação e coloque em `public/`
   - **Alternativa**: adicione uma meta tag no `src/app/layout.tsx`
5. Envie o **sitemap**: `https://mctransporte.com.br/sitemap.xml` (já configurado!)

### 2. Google Analytics (opcional)

1. Crie uma conta no [Google Analytics](https://analytics.google.com)
2. Crie uma propriedade e copie o **Measurement ID** (formato `G-XXXXXXXXXX`)
3. Adicione no `.env`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 3. Dicas de SEO já implementadas

- ✅ Metadata completa (title, description, keywords)
- ✅ OpenGraph (Facebook/WhatsApp/LinkedIn)
- ✅ Twitter Card
- ✅ JSON-LD estruturado (LocalBusiness)
- ✅ Sitemap.xml dinâmico (`src/app/sitemap.ts`)
- ✅ Robots.txt (`src/app/robots.ts`)
- ✅ URL semânticas (`/servicos`, `/contato`, etc.)
- ✅ Heading hierarchy (h1 → h2 → h3)
- ✅ Alt text em todas as imagens
- ✅ Core Web Vitals otimizado (Next.js 16)

---

## 📚 Documentação completa

Veja **`docs/PROMPT-MOTORISTA-EXECUTIVO.md`** — contém:
- Prompt completo para IA de VS Code
- Setup detalhado
- Guia de customização e deploy
- Troubleshooting

Veja **`SECURITY.md`** — documentação de segurança completa.

---

## 🆘 Problemas comuns

| Problema | Solução |
|----------|---------|
| Erro ao rodar `prisma db push` | Certifique-se que `.env` existe com `DATABASE_URL="file:./dev.db"` |
| Imagens não carregam | O `next.config.ts` já permite `sfile.chatglm.cn` e URLs `https:` |
| Página em branco | Rode `npm install` novamente e reinicie o dev server |
| Avaliações não aparecem | Verifique se `prisma db push` rodou e as tabelas foram criadas |
| Deploy na Vercel falha | SQLite não funciona em serverless — migre para Supabase |
| WhatsApp não abre | Verifique bloqueador de pop-ups no navegador |

---

## 📞 Contato do Milton

- **WhatsApp/Telefone:** (19) 99172-6000
- **E-mail:** milton@mctransporte.com.br
- **LinkedIn:** Milton Cesar
- **Veículo:** Hyundai HB20S
- **Pagamento:** Pix e Dinheiro
- **Atendimento:** 24h, todos os dias

---

## 🎯 Stack Tecnológica

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Next.js API Routes
- **Banco:** Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Validação:** Zod
- **Formulários:** React Hook Form
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Tema:** next-themes
- **Deploy:** Vercel (recomendado)

---

**Feito com ❤️ para o Milton Cesar — MC Transporte Executivo**

*Desenvolvido com foco em segurança, performance e experiência do usuário.*