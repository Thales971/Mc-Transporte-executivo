"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";
import { siteConfig, whatsappLink, emailLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { honeypotProps } from "@/lib/honeypot";

export function Contact() {
  const { form, onSubmit, onError, loading, sent, serviceOptions } = useContactForm();

  return (
    <motion.section
      id="contato"
      className="relative py-20 sm:py-28 bg-muted/30 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contato"
          title={
            <>
              Vamos conversar sobre{" "}
              <span className="text-gold-gradient">sua viagem</span>
            </>
          }
          description="Preencha o formulário que abriremos o WhatsApp diretamente com Milton Cesar. Ou use os contatos abaixo."
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Formulário */}
          <div className="lg:col-span-3">
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
              {/* 🔒 Honeypot anti-bot */}
              <input type="text" {...honeypotProps()} defaultValue="" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    Solicitação enviada!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    O WhatsApp abriu em uma nova aba. Se não abriu, clique no botão abaixo para tentar novamente.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open(whatsappLink("Olá Milton! Gostaria de solicitar um orçamento."), "_blank", "noopener,noreferrer")}
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Abrir WhatsApp
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Nome + Serviço */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nome <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="text"
                        {...form.register("nome")}
                        placeholder="Seu nome completo"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      />
                      {form.formState.errors.nome && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {form.formState.errors.nome.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Serviço <span className="text-[#d4af37]">*</span>
                      </label>
                      <select
                        {...form.register("servico")}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      >
                        <option value="">Selecione...</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {form.formState.errors.servico && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {form.formState.errors.servico.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Telefone + Data/Hora */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Telefone <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="tel"
                        {...form.register("telefone")}
                        placeholder="(19) 99999-9999"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      />
                      {form.formState.errors.telefone && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {form.formState.errors.telefone.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Data/Hora desejada{" "}
                        <span className="text-muted-foreground font-normal">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        {...form.register("dataHora")}
                        placeholder="Ex: 20/12 às 08h"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      />
                      {form.formState.errors.dataHora && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {form.formState.errors.dataHora.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      E-mail{" "}
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      {...form.register("email")}
                      placeholder="seu@email.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                    />
                    {form.formState.errors.email && (
                      <span className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {form.formState.errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Mensagem{" "}
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </label>
                    <textarea
                      rows={4}
                      {...form.register("mensagem")}
                      placeholder="Conte detalhes do trajeto, quantidade de passageiros, malas..."
                      maxLength={2000}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors resize-none"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        Máximo 2000 caracteres
                      </span>
                    </div>
                  </div>

                  {/* Botão de envio */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-8 py-4 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Enviar pelo WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    Ao enviar, você concorda com o processamento dos dados para atendimento. Seus dados estão seguros.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Informações de contato */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
              <h3 className="font-display text-xl font-bold text-foreground mb-5">
                Outros contatos
              </h3>
              <div className="space-y-5">
                <a
                  href={whatsappLink("Olá Milton! Gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-transparent bg-muted/40 p-4 transition-all hover:border-[#d4af37]/30 hover:bg-muted/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      WhatsApp 24h
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {siteConfig.contact.whatsappDisplay}
                    </div>
                    <div className="text-xs text-[#d4af37] mt-1 font-medium">
                      Resposta rápida
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:+${siteConfig.contact.whatsappNumber}`}
                  className="flex items-start gap-4 rounded-xl border border-transparent bg-muted/40 p-4 transition-all hover:border-[#d4af37]/30 hover:bg-muted/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Ligação / WhatsApp
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {siteConfig.contact.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a
                  href={emailLink()}
                  className="flex items-start gap-4 rounded-xl border border-transparent bg-muted/40 p-4 transition-all hover:border-[#d4af37]/30 hover:bg-muted/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      E-mail
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5 break-all">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl border border-transparent bg-muted/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Localização
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {siteConfig.contact.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Destaque Pix/Dinheiro */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
              <h3 className="font-display text-base font-bold text-foreground mb-3">
                Formas de pagamento
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteConfig.payment.methods.map((m) => (
                  <span
                    key={m}
                    className="rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/5 px-3 py-1.5 text-xs font-bold text-[#d4af37] tracking-wide"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                {siteConfig.payment.pixInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}