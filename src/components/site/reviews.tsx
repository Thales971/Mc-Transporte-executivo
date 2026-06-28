"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Star, Quote, MessageSquarePlus, Loader2, CheckCircle2, Star as StarIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { useToast } from "@/hooks/use-toast";

interface Avaliacao {
  id: string;
  nome: string;
  nota: number;
  comentario: string;
  servico: string | null;
  createdAt: string;
}

const serviceOptions = [
  "Aeroporto",
  "Executivo",
  "Viagens Intermunicipais",
  "Outro",
];

export function Reviews() {
  const { toast } = useToast();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState(5);
  const [servico, setServico] = useState("");
  const [comentario, setComentario] = useState("");
  const [hoverNota, setHoverNota] = useState(0);

  // Função para carregar avaliações (chamada manualmente e no mount)
  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/avaliacoes");
      const json = await res.json();
      if (json.success) {
        setAvaliacoes(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega avaliações ao montar o componente
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/avaliacoes");
        const json = await res.json();
        if (json.success && mounted) {
          setAvaliacoes(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || nome.trim().length < 2) {
      toast({
        title: "Nome obrigatório",
        description: "Digite seu nome (mínimo 2 caracteres).",
        variant: "destructive",
      });
      return;
    }
    if (!comentario.trim() || comentario.trim().length < 5) {
      toast({
        title: "Comentário obrigatório",
        description: "Escreva um comentário (mínimo 5 caracteres).",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          nota,
          comentario: comentario.trim(),
          servico: servico || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast({
          title: "Avaliação enviada!",
          description: "Obrigado pelo seu feedback. Sua avaliação já está visível.",
        });
        setNome("");
        setNota(5);
        setServico("");
        setComentario("");
        setShowForm(false);
        await carregar();
      } else {
        throw new Error(json.error || "Erro ao enviar");
      }
    } catch (e) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Calcula média
  const media =
    avaliacoes.length > 0
      ? (
          avaliacoes.reduce((sum, a) => sum + a.nota, 0) / avaliacoes.length
        ).toFixed(1)
      : "5.0";

  // Combina depoimentos iniciais + avaliações reais (se houver)
  const listaExibida =
    avaliacoes.length > 0
      ? avaliacoes
      : siteConfig.testimonials.map((t, i) => ({
          id: `init-${i}`,
          nome: t.name,
          nota: t.rating,
          comentario: t.text,
          servico: t.role,
          createdAt: new Date().toISOString(),
        }));

  return (
    <motion.section
      id="avaliacoes"
      className="relative py-20 sm:py-28 bg-muted/30 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-luxury-grid opacity-30" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Avaliações"
          title={
            <>
              O que dizem quem já{" "}
              <span className="text-gold-gradient">viajou comigo</span>
            </>
          }
          description="Avaliações reais de clientes. Sua opinião é muito importante — compartilhe sua experiência."
        />

        {/* Resumo da média */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="font-display text-5xl font-bold text-gold-gradient">
              {media}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#d4af37] text-[#d4af37]"
                  />
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {avaliacoes.length > 0
                  ? `${avaliacoes.length} avaliações`
                  : "Baseado em depoimentos"}
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-12 w-px bg-border" />

          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Deixar avaliação
          </button>
        </div>

        {/* Formulário de avaliação */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up"
          >
            {/* 🔒 Honeypot anti-bot — invisível para humanos */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
              defaultValue=""
            />
            <h3 className="font-display text-xl font-bold text-foreground mb-5">
              Compartilhe sua experiência
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Seu nome <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Serviço */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Serviço utilizado
                </label>
                <select
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  <option value="">Selecione...</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nota (estrelas clicáveis) */}
            <div className="mt-5 space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sua nota <span className="text-[#d4af37]">*</span>
              </label>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  const filled = value <= (hoverNota || nota);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNota(value)}
                      onMouseEnter={() => setHoverNota(value)}
                      onMouseLeave={() => setHoverNota(0)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`${value} estrela${value > 1 ? "s" : ""}`}
                    >
                      <StarIcon
                        className={`h-7 w-7 transition-colors ${
                          filled
                            ? "fill-[#d4af37] text-[#d4af37]"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-3 text-sm text-muted-foreground">
                  {nota} de 5
                </span>
              </div>
            </div>

            {/* Comentário */}
            <div className="mt-5 space-y-2">
              <label className="text-sm font-medium text-foreground">
                Seu comentário <span className="text-[#d4af37]">*</span>
              </label>
              <textarea
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Conte como foi sua experiência com o Milton..."
                maxLength={1000}
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
              <div className="text-right text-xs text-muted-foreground">
                {comentario.length}/1000
              </div>
            </div>

            {/* Ações */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Publicar avaliação
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Lista de avaliações */}
        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listaExibida.map((av, i) => (
                <article
                  key={av.id || i}
                  className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-[#d4af37]/40"
                >
                  <Quote className="absolute top-5 right-5 h-9 w-9 text-[#d4af37]/10" />

                  {/* Estrelas */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: av.nota }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-[#d4af37] text-[#d4af37]"
                      />
                    ))}
                  </div>

                  {/* Comentário */}
                  <p className="relative text-foreground/90 leading-relaxed text-[15px]">
                    &ldquo;{av.comentario}&rdquo;
                  </p>

                  {/* Autor */}
                  <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a8842a] text-black font-display font-bold">
                      {av.nome.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {av.nome}
                      </div>
                      {av.servico && (
                        <div className="text-xs text-muted-foreground">
                          {av.servico}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
