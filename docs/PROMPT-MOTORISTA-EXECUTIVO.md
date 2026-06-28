# 🚗 Site de Motorista Executivo — Prompt + Documentação Técnica

Documento completo para gerar um site profissional de **Motorista Executivo / Transporte Executivo** usando **React + TypeScript + Supabase**, com formulário de mensagem ao motorista integrado ao WhatsApp e ao banco de dados.

Referências visuais: `tstransporteexecutivo.com.br` e `taxirapidobeto.com.br`.

---

## 📋 ÍNDICE

1. [O Prompt (copie e cole na IA)](#1--o-prompt-copie-e-cole-na-ia)
2. [Visão Geral do Projeto](#2--visão-geral-do-projeto)
3. [Stack Tecnológica](#3--stack-tecnológica)
4. [Paleta de Cores](#4--paleta-de-cores)
5. [Tipografia](#5--tipografia)
6. [Estrutura de Seções](#6--estrutura-de-seções)
7. [Funcionalidade: Mensagem ao Motorista](#7--funcionalidade-mensagem-ao-motorista)
8. [Setup do Supabase (passo a passo)](#8--setup-do-supabase-passo-a-passo)
9. [Código Pronto: Formulário + Supabase](#9--código-pronto-formulário--supabase)
10. [Customização](#10--customização)
11. [Deploy](#11--deploy)
12. [Checklist Final](#12--checklist-final)

---

## 1) 🤖 O PROMPT (copie e cole na IA)

> Copie todo o bloco abaixo e cole no Cursor / GitHub Copilot Chat / Windsurf / Claude / outra IA do seu VS Code.

```
Crie um site completo (single-page) para um MOTORISTA EXECUTIVO / TRANSPORTE EXECUTIVO, 
usando React + TypeScript + Vite + Tailwind CSS + Supabase.

=== OBJETIVO ===
Um site profissional, elegante e moderno que transmita luxo, confiança e profissionalismo.
O motorista oferece: traslado de aeroportos, transporte executivo corporativo, eventos, 
casamentos, city tour e viagens longas. Atendimento 24h via WhatsApp.

=== REFERÊNCIAS VISUAIS ===
- https://tstransporteexecutivo.com.br/
- https://taxirapidobeto.com.br/
(Use como inspiração de estrutura e conteúdo, mas com design MAIS premium e moderno)

=== STACK ===
- React 18+ com TypeScript
- Vite (NÃO usar Next.js — quero só frontend, sem backend próprio)
- Tailwind CSS para estilização
- Supabase JS client (@supabase/supabase-js) para salvar mensagens no banco
- lucide-react para ícones
- React Hook Form + Zod para validação do formulário (opcional)

=== PALETA DE CORES (OBRIGATÓRIA) ===
- Preto profundo (fundo principal): #0A0A0A
- Prezo card: #141414
- Cinza escuro (bordas/secundário): #1F1F1F e #2A2A2A
- Cinza médio (texto secundário): #A3A3A3
- Dourado (cor de destaque / primária): #D4AF37
- Dourado escuro: #C9A227
- Dourado claro: #E5C158
- Branco off-white (texto principal): #F5F5F4
- Verde WhatsApp (só botão flutuante): #25D366

Tema: DARK/LUXO (fundo preto, texto branco, destaques em dourado).

=== TIPOGRAFIA ===
- Títulos: "Playfair Display" (serifa elegante) via Google Fonts
- Corpo: "Inter" (sans-serif limpa) via Google Fonts

=== SEÇÕES DO SITE (nesta ordem) ===
1. NAVBAR fixa — logo "ELITE", links âncora (Serviços, Diferenciais, Frota, Cobertura, 
   Depoimentos, Contato), botão "Reservar agora" (WhatsApp). Vira menu hambúrguer no mobile.
   Fica transparente no topo e fica preta com blur ao rolar.

2. HERO — tela cheia. Imagem de fundo de sedan de luxo com overlay escuro gradiente.
   - Badge "24 horas • Todos os dias" (com bolinha pulsante dourada)
   - Título grande: "Transporte Executivo de Alto Padrão" (com "Alto Padrão" em gradiente dourado)
   - Subtítulo curto
   - 5 estrelas douradas + "5.0 · Clientes satisfeitos"
   - 2 CTAs: "Reservar pelo WhatsApp" (dourado sólido) + "Ver serviços" (contorno)
   - Info rápida: "Aeroportos CGH·GRU·VCP", "Veículos blindados", "Pix/cartão"

3. STATS — faixa com 4 números: "24h disponível", "12+ anos", "100% pontualidade", "5.0 avaliação"

4. SERVIÇOS (#servicos) — grid de 6 cards com ícone dourado, título e descrição:
   - Traslado Aeroportos (ícone avião)
   - Transporte Executivo (maleta)
   - Eventos Corporativos (prédio)
   - Casamentos & Cerimônias (coração)
   - City Tour Personalizado (mapa)
   - Viagens Longas (rota)
   Cada card com hover: sobe, borda fica dourada, aparece link "Solicitar este serviço" 
   que abre WhatsApp com mensagem pré-preenchida.

5. DIFERENCIAIS (#diferenciais) — 2 colunas. Esquerda: imagem de motorista profissional 
   com card flutuante "12+ anos de experiência" e selo "5.0". Direita: 4 cards 
   (Pontualidade, Segurança & Discrição, Conforto Premium, Profissionalismo).

6. FROTA (#frota) — 3 cards de veículos com foto, categoria, capacidade (passageiros/malas), 
   features com check dourado e botão "Reservar este veículo" (WhatsApp):
   - Sedan Executivo (Mercedes/BMW, 4 pax, 3 malas)
   - SUV de Luxo (Audi/Land Rover, 4 pax, 4 malas, blindado opcional)
   - Van Executiva (Mercedes V-Class, 7 pax, 7 malas)

7. COBERTURA (#cobertura) — 2 colunas. Esquerda: lista de cidades atendidas em pills 
   (Campinas, Vinhedo, Valinhos, Paulínia, etc) + 2 cards (Traslado Aeroportos, 
   Disponibilidade 24h). Direita: mapa estilizado em SVG/CSS com pinos dourados 
   conectados a um centro (Campinas) com linhas tracejadas.

8. DEPOIMENTOS (#depoimentos) — 3 cards com aspas decorativa, 5 estrelas, texto, 
   avatar com inicial do nome em círculo dourado.

9. CONTATO (#contato) — 2 colunas:
   - Esquerda: 3 cards de contato direto (WhatsApp destacado, Telefone, E-mail) 
     + card de Disponibilidade/Localização
   - Direita: FORMULÁRIO de mensagem com campos: Nome*, Telefone/WhatsApp*, 
     E-mail, Serviço* (select), Data/Hora, Mensagem. 
     Botão "Enviar mensagem ao motorista" com estados loading/success.

10. FOOTER — logo + descrição + social (WhatsApp, Instagram, Facebook), 
    coluna de navegação, coluna de contato, copyright.

11. BOTÃO FLUTUANTE WHATSAPP — aparece após rolar 500px, canto inferior direito, 
    verde com pulse animation, com balão de tooltip "Precisa de um transporte agora?".

=== FORMULÁRIO DE MENSAGEM (FUNCIONALIDADE PRINCIPAL) ===
Ao submeter o formulário, deve:
1. Validar campos obrigatórios (nome, telefone, serviço)
2. SALVAR a mensagem no Supabase (tabela "mensagens")
3. MONTAR uma mensagem de WhatsApp formatada com os dados e ABRIR wa.me 
   com o número do motorista já preenchido
4. Mostrar toast de sucesso e limpar o formulário

Estrutura da mensagem WhatsApp gerada:
*Nova solicitação pelo site*
*Nome:* [nome]
*Telefone:* [telefone]
*E-mail:* [email]
*Serviço:* [servico]
*Data/Hora:* [data]
*Mensagem:* [mensagem]

=== ESTRUTURA DE ARQUIVOS ===
src/
  components/
    Navbar.tsx
    Hero.tsx
    Stats.tsx
    Services.tsx
    Differentials.tsx
    Fleet.tsx
    Coverage.tsx
    Testimonials.tsx
    Contact.tsx
    Footer.tsx
    FloatingWhatsApp.tsx
    SectionHeading.tsx
  lib/
    site-config.ts      (todos os dados do motorista: contatos, serviços, frota, etc)
    supabase.ts         (client do supabase)
  App.tsx
  main.tsx
  index.css

=== REQUISITOS TÉCNICOS ===
- 100% responsivo (mobile-first), breakpoints sm/md/lg/xl
- Animações sutis de fade-up ao entrar na viewport (Intersection Observer ou framer-motion)
- Acessibilidade: labels, aria-labels, contraste adequado, navegação por teclado
- SEO: title, meta description, Open Graph, lang="pt-BR"
- Imagens otimizadas (use imagens reais de carros de luxo de Unsplash)
- Scroll suave entre seções (scroll-behavior: smooth + anchor links)
- Footer SEMPRE no bottom (flex column com min-h-screen no wrapper)

=== ENTREGÁVEIS ===
1. Todo o código React + TS comentado em português
2. Arquivo .env.example com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
3. SQL para criar a tabela "mensagens" no Supabase
4. Instruções de instalação e execução no README.md

Gere o projeto completo, arquivo por arquivo.
```

---

## 2) 📖 Visão Geral do Projeto

Um site institucional **single-page** (uma única página com rolagem) para um motorista que oferece serviço de transporte executivo. O objetivo é converter visitantes em clientes via **WhatsApp** e capturar solicitações via **formulário** que salva no Supabase.

**Público-alvo:** executivos, empresários, noivos, turistas e qualquer pessoa que precise de transporte seguro, pontual e confortável.

**Diferencial do site:** visual premium (preto + dourado), foco em conversão para WhatsApp, formulário que envia mensagem direta ao motorista.

---

## 3) 🛠️ Stack Tecnológica

| Camada | Tecnologia | Por quê? |
|---|---|---|
| Framework | **Vite + React 18** | Build rápido, sem backend, ideal para site institucional |
| Linguagem | **TypeScript** | Tipagem segura, mantém o código escalável |
| Estilo | **Tailwind CSS** | Utility-first, responsivo, rápido de iterar |
| Banco de dados | **Supabase** (PostgreSQL) | Salva mensagens do formulário sem precisar de backend |
| Ícones | **lucide-react** | Ícones limpos e modernos |
| Fontes | **Google Fonts** (Playfair + Inter) | Visual de luxo sem custo |
| Formulário | **React Hook Form + Zod** (opcional) | Validação robusta |
| Deploy | **Vercel** ou **Netlify** | Gratuito, CI/CD automático |

> 💡 **Por que Vite e não Next.js?** Como você não quer backend, o Vite gera um site estático puro, mais leve e simples de hospedar. O Supabase é acessado direto pelo client (com Row Level Security), então não precisa de servidor próprio.

---

## 4) 🎨 Paleta de Cores

Aplicar via variáveis CSS no `index.css` ou direto no `tailwind.config.js`.

```css
:root {
  /* Fundos */
  --color-bg: #0A0A0A;          /* preto profundo - fundo principal */
  --color-bg-card: #141414;     /* cards */
  --color-bg-muted: #1F1F1F;    /* secundário */
  --color-border: #2A2A2A;      /* bordas */

  /* Dourado (cor de marca) */
  --color-gold: #D4AF37;        /* dourado principal */
  --color-gold-dark: #C9A227;   /* hover / gradientes */
  --color-gold-light: #E5C158;  /* destaques claros */

  /* Texto */
  --color-text: #F5F5F4;        /* texto principal (off-white) */
  --color-text-muted: #A3A3A3;  /* texto secundário */

  /* Especiais */
  --color-whatsapp: #25D366;    /* só p/ botão flutuante WA */
}
```

**Classes Tailwind utilitárias sugeridas:**
```js
// tailwind.config.js
colors: {
  bg: '#0A0A0A',
  'bg-card': '#141414',
  'bg-muted': '#1F1F1F',
  border: '#2A2A2A',
  gold: { DEFAULT: '#D4AF37', dark: '#C9A227', light: '#E5C158' },
  'text-main': '#F5F5F4',
  'text-muted': '#A3A3A3',
  whatsapp: '#25D366',
}
```

**Gradiente dourado para texto (classe reutilizável):**
```css
.text-gold-gradient {
  background: linear-gradient(135deg, #f5e7a8 0%, #d4af37 45%, #c9a227 70%, #a8842a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 5) 🔤 Tipografia

Importar do Google Fonts no `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
```

| Uso | Fonte | Pesos |
|---|---|---|
| Títulos (H1, H2, H3) | Playfair Display | 600, 700, 800 |
| Corpo, botões, UI | Inter | 400, 500, 600, 700 |

---

## 6) 🧱 Estrutura de Seções

| # | Seção | ID | Objetivo |
|---|---|---|---|
| 1 | Navbar | — | Navegação + CTA WhatsApp sempre visível |
| 2 | Hero | `#topo` | Impacto visual + CTA principal |
| 3 | Stats | — | Prova social rápida (números) |
| 4 | Serviços | `#servicos` | Mostrar o que oferece |
| 5 | Diferenciais | `#diferenciais` | Por que escolher (trust) |
| 6 | Frota | `#frota` | Mostrar os veículos |
| 7 | Cobertura | `#cobertura` | Onde atende |
| 8 | Depoimentos | `#depoimentos` | Prova social em texto |
| 9 | Contato | `#contato` | **Formulário + contatos diretos** |
| 10 | Footer | — | Links, social, copyright |
| 11 | Botão flutuante | — | WhatsApp sempre acessível |

---

## 7) 💬 Funcionalidade: Mensagem ao Motorista

Esta é a **funcionalidade central** pedida. O fluxo é:

```
Usuário preenche formulário
        │
        ▼
Valida campos (nome, telefone, serviço obrigatórios)
        │
        ▼
┌───────────────────────────────────────┐
│  1. SALVA no Supabase (tabela mensagens) │
│  2. MONTA mensagem de WhatsApp           │
│  3. ABRE wa.me com nº do motorista       │
│  4. Mostra toast de sucesso              │
│  5. Limpa formulário                     │
└───────────────────────────────────────┘
```

### Por que enviar via WhatsApp E salvar no Supabase?

- **WhatsApp:** o cliente fala **na hora** com o motorista (conversão imediata).
- **Supabase:** o motorista tem um **histórico organizado** de todas as solicitações 
  (mesmo as que o cliente não finalize no WhatsApp), podendo fazer follow-up.

### Formato da mensagem WhatsApp gerada

```
*Nova solicitação pelo site*

*Nome:* João da Silva
*Telefone:* (19) 98888-7777
*E-mail:* joao@email.com
*Serviço:* Traslado Aeroporto
*Data/Hora:* 15/12 às 14h00

*Mensagem:*
Busca no aeroporto GRU, 2 passageiros, 3 malas
```

---

## 8) 🗄️ Setup do Supabase (passo a passo)

### Passo 1 — Criar o projeto
1. Acesse https://supabase.com e crie uma conta (ou login com GitHub).
2. Clique em **New Project** → dê um nome (ex: `elite-transporte`).
3. Defina uma senha forte para o banco. Escolha a região mais próxima (South America - São Paulo).
4. Aguarde ~2 min até o projeto ficar pronto.

### Passo 2 — Criar a tabela `mensagens`
Vá em **SQL Editor** → **New query** → cole o SQL abaixo → **Run**:

```sql
-- Tabela de mensagens recebidas pelo site
create table if not exists public.mensagens (
  id uuid default gen_random_uuid() primary key,
  -- Dados do cliente
  nome text not null,
  telefone text not null,
  email text,
  -- Detalhes da solicitação
  servico text not null,
  data_horario text,
  mensagem text,
  -- Controle
  status text not null default 'nova',  -- nova | em_atendimento | atendida | arquivada
  criado_em timestamptz not null default now()
);

-- Habilita Row Level Security (SEGURANÇA OBRIGATÓRIA)
alter table public.mensagens enable row level security;

-- Política: qualquer pessoa pode INSERIR mensagens (formulário público)
create policy "Permitir insert público"
  on public.mensagens for insert
  to anon
  with check (true);

-- Política: apenas autenticados podem LER (você, no painel do Supabase)
create policy "Permitir select autenticado"
  on public.mensagens for select
  to authenticated
  using (true);

-- Política: apenas autenticados podem ATUALIZAR status
create policy "Permitir update autenticado"
  on public.mensagens for update
  to authenticated
  using (true);

-- Índice para ordenar por data
create index if not exists mensagens_criado_em_idx
  on public.mensagens (criado_em desc);

-- Comentário para documentação
comment on table public.mensagens is
  'Mensagens recebidas pelo formulário do site do motorista executivo';
```

> ⚠️ **Sobre RLS (Row Level Security):** as políticas acima permitem que qualquer 
> visitante **insira** (envie) mensagens, mas só você (autenticado) pode **ver e gerenciar** 
> as mensagens no painel do Supabase. **Nunca** exponha a service_role key no frontend.

### Passo 3 — Obter as credenciais
Vá em **Project Settings** → **API**:
- `Project URL` → será sua `SUPABASE_URL`
- `anon public` key → será sua `SUPABASE_ANON_KEY`

> ✅ A chave `anon` é **pública e segura** para o frontend (só faz o que as RLS permitirem).
> ❌ A chave `service_role` é **secreta** — NUNCA coloque no código frontend.

### Passo 4 — Configurar variáveis de ambiente
Crie um arquivo `.env.local` (Vite) na raiz do projeto:

```bash
# IMPORTANTE: no Vite as variáveis DEVEM começar com VITE_
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui

# Dados do motorista (opcional - pode colocar direto no site-config.ts)
VITE_DRIVER_WHATSAPP=5519999999999
```

> No Next.js seria `NEXT_PUBLIC_SUPABASE_URL`. Em Vite é `VITE_SUPABASE_URL`.

---

## 9) 💻 Código Pronto: Formulário + Supabase

### 9.1 — Client do Supabase (`src/lib/supabase.ts`)

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local"
  );
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);

// Tipo da mensagem (TypeScript)
export interface Mensagem {
  id?: string;
  nome: string;
  telefone: string;
  email?: string | null;
  servico: string;
  data_horario?: string | null;
  mensagem?: string | null;
  status?: string;
  criado_em?: string;
}
```

### 9.2 — Config do site (`src/lib/site-config.ts`)

```typescript
export const siteConfig = {
  brand: "ELITE",
  brandSuffix: "Transporte Executivo",

  contact: {
    // DDI + DDD + número, só dígitos (ex: 55 = Brasil, 19 = DDD Campinas)
    whatsappNumber: import.meta.env.VITE_DRIVER_WHATSAPP ?? "5519999999999",
    whatsappDisplay: "(19) 99999-9999",
    phoneDisplay: "(19) 99999-9999",
    email: "contato@elitetransporte.com.br",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    city: "Campinas / Vinhedo",
  },

  availability: "24 horas • Todos os dias",

  coverageAreas: [
    "Campinas", "Vinhedo", "Valinhos", "Paulínia",
    "Itatiba", "Louveira", "Indaiatuba", "Jundiaí",
    "São Paulo (Capital)", "Aeroportos: CGH, GRU, VCP",
  ],
  // ... serviços, frota, diferenciais, stats, depoimentos
} as const;

/** Monta link wa.me com mensagem pré-preenchida */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

### 9.3 — Componente de Contato COMPLETO (`src/components/Contact.tsx`)

Este é o componente principal com **Supabase + WhatsApp integrados**:

```tsx
import { useState } from "react";
import { supabase, type Mensagem } from "@/lib/supabase";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { MessageCircle, Phone, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  "Traslado Aeroporto",
  "Transporte Executivo",
  "Evento Corporativo",
  "Casamento / Cerimônia",
  "City Tour",
  "Viagem Longa",
  "Outro",
];

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", date: "", message: "",
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação simples
    if (!form.name || !form.phone || !form.service) {
      alert("Preencha pelo menos nome, telefone e serviço.");
      return;
    }

    setLoading(true);

    try {
      // 2. SALVAR no Supabase
      const { error } = await supabase.from("mensagens").insert({
        nome: form.name,
        telefone: form.phone,
        email: form.email || null,
        servico: form.service,
        data_horario: form.date || null,
        mensagem: form.message || null,
        status: "nova",
      });

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
        // Continua mesmo com erro — ainda abre o WhatsApp
      }

      // 3. MONTAR mensagem de WhatsApp
      const mensagemWhatsApp = [
        `*Nova solicitação pelo site*`,
        ``,
        `*Nome:* ${form.name}`,
        `*Telefone:* ${form.phone}`,
        form.email ? `*E-mail:* ${form.email}` : "",
        `*Serviço:* ${form.service}`,
        form.date ? `*Data/Hora:* ${form.date}` : "",
        ``,
        `*Mensagem:*`,
        form.message || "(sem mensagem adicional)",
      ].filter(Boolean).join("\n");

      // 4. ABRIR WhatsApp com a mensagem pronta
      const waUrl = whatsappLink(mensagemWhatsApp);
      window.open(waUrl, "_blank", "noopener,noreferrer");

      // 5. Feedback de sucesso + limpar
      setSent(true);
      setForm({ name: "", phone: "", email: "", service: "", date: "", message: "" });

      setTimeout(() => setSent(false), 4500);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar. Tente novamente ou fale direto pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="font-display text-4xl font-bold text-center text-white mb-4">
          Envie uma <span className="text-gold-gradient">mensagem</span>
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          Preencha o formulário e fale com o motorista agora.
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contatos diretos */}
          <div className="lg:col-span-2 space-y-4">
            <a href={whatsappLink("Olá!")} target="_blank" rel="noreferrer"
               className="flex items-center gap-4 p-5 rounded-xl border border-gold/40 bg-gold/5 hover:border-gold/70 transition">
              <MessageCircle className="h-6 w-6 text-gold" />
              <div>
                <div className="text-xs text-neutral-400">WhatsApp</div>
                <div className="font-semibold text-white">{siteConfig.contact.whatsappDisplay}</div>
              </div>
            </a>
            <a href={`tel:+${siteConfig.contact.whatsappNumber}`}
               className="flex items-center gap-4 p-5 rounded-xl border border-[#2a2a2a] bg-[#141414] hover:border-gold/40 transition">
              <Phone className="h-6 w-6 text-gold" />
              <div>
                <div className="text-xs text-neutral-400">Telefone</div>
                <div className="font-semibold text-white">{siteConfig.contact.phoneDisplay}</div>
              </div>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`}
               className="flex items-center gap-4 p-5 rounded-xl border border-[#2a2a2a] bg-[#141414] hover:border-gold/40 transition">
              <Mail className="h-6 w-6 text-gold" />
              <div>
                <div className="text-xs text-neutral-400">E-mail</div>
                <div className="font-semibold text-white break-all">{siteConfig.contact.email}</div>
              </div>
            </a>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-neutral-200 mb-2">Nome completo *</label>
                <input type="text" required value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-200 mb-2">Telefone / WhatsApp *</label>
                <input type="tel" required value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-200 mb-2">E-mail</label>
                <input type="email" value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-200 mb-2">Serviço *</label>
                <select required value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none">
                  <option value="">Selecione...</option>
                  {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-neutral-200 mb-2">Data e horário</label>
                <input type="text" value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  placeholder="Ex: 15/12 às 14h00"
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-neutral-200 mb-2">Mensagem</label>
                <textarea rows={4} value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full resize-none rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
            </div>

            <button type="submit" disabled={loading || sent}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-dark px-6 py-4 font-semibold text-black disabled:opacity-70">
              {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</>)
               : sent ? (<><CheckCircle2 className="h-5 w-5" /> WhatsApp aberto!</>)
               : (<><Send className="h-5 w-5" /> Enviar mensagem ao motorista</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
```

### 9.4 — Painel para ver as mensagens (opcional)

Você pode ver as mensagens direto no **Supabase Studio** → Table Editor → `mensagens`.

Ou criar uma rota protegida `/admin` no seu site que lista as mensagens (exige login Supabase). Exemplo básico:

```tsx
// src/pages/Admin.tsx (proteger com autenticação Supabase)
import { useEffect, useState } from "react";
import { supabase, type Mensagem } from "@/lib/supabase";

export function Admin() {
  const [msgs, setMsgs] = useState<Mensagem[]>([]);

  useEffect(() => {
    supabase
      .from("mensagens")
      .select("*")
      .order("criado_em", { ascending: false })
      .then(({ data }) => setMsgs(data ?? []));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mensagens recebidas ({msgs.length})</h1>
      <div className="space-y-4">
        {msgs.map((m) => (
          <div key={m.id} className="border border-[#2a2a2a] bg-[#141414] p-4 rounded-lg">
            <div className="flex justify-between">
              <strong className="text-gold">{m.nome}</strong>
              <span className="text-xs text-neutral-500">
                {new Date(m.criado_em!).toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="text-sm text-neutral-300 mt-1">
              {m.servico} · {m.telefone}
            </div>
            {m.mensagem && <p className="text-sm mt-2 text-neutral-400">{m.mensagem}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 10) ⚙️ Customização

Tudo que é editável fica centralizado em **`src/lib/site-config.ts`**:

| Campo | O que editar |
|---|---|
| `brand` / `brandSuffix` | Nome da marca |
| `contact.whatsappNumber` | Seu WhatsApp (DDI+DDD+número, só dígitos) |
| `contact.email` | Seu e-mail |
| `contact.instagram` / `facebook` | Suas redes |
| `coverageAreas` | Cidades atendidas |
| `services` | Lista de serviços (ícone, título, descrição) |
| `fleet` | Veículos (nome, categoria, capacidade, features, imagem) |
| `differentials` | Diferenciais competitivos |
| `stats` | Números de destaque |
| `testimonials` | Depoimentos de clientes |

### Trocar as imagens
Substitua as URLs das imagens pelas suas próprias fotos (suba no Supabase Storage, 
Imgur, Cloudinary ou use o diretório `public/`).

### Trocar as cores
Edite as variáveis CSS em `src/index.css` (seção `:root`).

---

## 11) 🚀 Deploy

### Opção A — Vercel (recomendado)
1. Suba o código no GitHub.
2. Acesse https://vercel.com → **New Project** → importe o repositório.
3. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` = sua URL
   - `VITE_SUPABASE_ANON_KEY` = sua chave anon
   - `VITE_DRIVER_WHATSAPP` = seu número
4. **Deploy**. Pronto, site no ar em ~1 min com HTTPS.

### Opção B — Netlify
1. Suba no GitHub.
2. Netlify → **Add new site** → **Import**.
3. Build command: `npm run build` · Publish dir: `dist`.
4. Adicione as mesmas variáveis de ambiente em **Site settings → Environment**.
5. Deploy.

### Opção C — Domínio próprio
Após o deploy, compre/configure um domínio (ex: `www.seumotorista.com.br`) 
e aponte para a Vercel/Netlify (eles dão instruções automáticas de DNS).

---

## 12) ✅ Checklist Final

- [ ] Projeto Vite + React + TS criado
- [ ] Tailwind CSS configurado com a paleta preto/dourado
- [ ] Fontes Playfair + Inter importadas
- [ ] Todas as 11 seções implementadas
- [ ] Navbar responsiva com menu mobile
- [ ] Hero com imagem + CTAs
- [ ] Formulário valida campos obrigatórios
- [ ] Formulário SALVA no Supabase (tabela `mensagens`)
- [ ] Formulário ABRE WhatsApp com mensagem formatada
- [ ] Botão flutuante de WhatsApp
- [ ] Footer sticky no bottom
- [ ] 100% responsivo (testado em mobile e desktop)
- [ ] Variáveis de ambiente no `.env.local`
- [ ] Projeto no Supabase criado com RLS ativa
- [ ] Site deployado (Vercel/Netlify)
- [ ] Dados do motorista atualizados em `site-config.ts`

---

## 📞 Suporte / Próximos passos

Depois do site no ar, considere evoluir com:
- **Agenda online** (integração com Google Calendar via Supabase functions)
- **Pagamento online** (Mercado Pago / Stripe para sinal de reserva)
- **Painel admin** com gráfico de solicitações
- **Blog** com dicas de transporte/executivo (bom para SEO)
- **Notificação por e-mail** quando uma mensagem chegar (Supabase Webhooks + Resend)

---

*Documentação gerada para criar um site de Motorista Executivo premium com React + TypeScript + Supabase.*
