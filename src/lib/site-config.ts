/**
 * Configuração central do site do Milton Cesar — MC Transporte Executivo.
 * Edite estes dados para personalizar todo o site.
 */

export const siteConfig = {
  // ===== Identidade =====
  brand: "MC",
  brandFull: "MC Transporte Executivo",
  brandSuffix: "Transporte Executivo",
  driverName: "Milton Cesar",
  driverRole: "Motorista Executivo",
  tagline: "Pontualidade, respeito e segurança em cada trajeto",
  shortDescription:
    "Transporte executivo e viagens personalizadas com o motorista Milton Cesar. Carro HB20S, atendimento cordial e pontualidade garantida. Aceito Pix e dinheiro. Viagens para todos os locais.",

  // ===== Contatos =====
  contact: {
    // DDI + DDD + número, só dígitos
    whatsappNumber: "551991726000",
    whatsappDisplay: "(19) 99172-6000",
    phoneDisplay: "(19) 99172-6000",
    email: "milton@mctransporte.com.br",
    linkedin: "https://www.linkedin.com/in/milton-cesar",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    city: "Campinas / Vinhedo",
    region: "Região Metropolitana de Campinas",
  },

  // ===== Veículo =====
  vehicle: {
    model: "Hyundai HB20S",
    category: "Sedan Executivo",
    year: "Comfort Plus",
    capacity: "4 passageiros",
    luggage: "3 malas grandes",
    features: [
      "Ar-condicionado com temperatura ajustável",
      "Som ambiente",
      "Carregador USB",
      "Bancos em tecido premium",
      "Higiene e limpeza garantidas",
    ],
    image: "/milton.jpg", // placeholder; a foto do carro viria aqui
  },

  // ===== Pagamento =====
  payment: {
    methods: ["Pix", "Dinheiro"],
    pixInfo: "Chave Pix: (19) 99172-6000",
  },

  // ===== Disponibilidade =====
  availability: "24 horas • Todos os dias",

  // ===== Áreas atendidas (Campinas → Vinhedo + região) =====
  coverageAreas: [
    "Campinas",
    "Vinhedo",
    "Valinhos",
    "Paulínia",
    "Itatiba",
    "Louveira",
    "Indaiatuba",
    "Jundiaí",
    "Itupeva",
    "Cabreúva",
    "Morungaba",
    "Bom Jesus dos Perdões",
  ],

  // Aeroportos
  airports: [
    { code: "VCP", name: "Aeroporto de Viracopos (Campinas)" },
    { code: "GRU", name: "Aeroporto de Guarulhos (São Paulo)" },
    { code: "CGH", name: "Aeroporto de Congonhas (São Paulo)" },
  ],

  // ===== Serviços =====
  services: [
    {
      icon: "Plane",
      title: "Aeroporto",
      description:
        "Traslado para os aeroportos VCP, GRU e CGH com acompanhamento de voo e pontualidade garantida. Busca e embarque sem stress.",
    },
    {
      icon: "Briefcase",
      title: "Executivo",
      description:
        "Transporte executivo corporativo para reuniões, eventos de negócios e compromissos profissionais com discrição e conforto.",
    },
    {
      icon: "Route",
      title: "Viagens Intermunicipais",
      description:
        "Viagens para todos os locais — interestaduais ou regionais. Conforto, segurança e paradas conforme sua necessidade.",
    },
  ],

  // ===== Diferenciais =====
  differentials: [
    {
      icon: "Clock",
      title: "Pontualidade",
      description:
        "Chego sempre adiantado. Sua agenda é prioridade — nunca espere, seja esperado no horário combinado.",
    },
    {
      icon: "Heart",
      title: "Respeito",
      description:
        "Atendimento cordial, educado e atencioso. Cada passageiro é tratado com a devida consideração e cortesia.",
    },
    {
      icon: "ShieldCheck",
      title: "Segurança",
      description:
        "Direção defensiva, veículo revisado e trajetos planejados. Sua segurança e tranquilidade em primeiro lugar.",
    },
  ],

  // ===== Viagens personalizadas =====
  personalized: {
    title: "Viagens Personalizadas",
    description:
      "Cada viagem é única. Personalize sua experiência com opções que tornam o trajeto ainda mais confortável e agradável.",
    options: [
      {
        icon: "Thermometer",
        title: "Temperatura a escolha",
        description: "Ajuste o ar-condicionado na temperatura que preferir, do início ao fim da viagem.",
      },
      {
        icon: "Music",
        title: "Música ambiente",
        description: "Escolha o estilo musical ou traga sua própria playlist para a viagem.",
      },
      {
        icon: "Coffee",
        title: "Paradas programadas",
        description: "Pare para descanso, refeição ou onde desejar — roteiro flexível conforme sua necessidade.",
      },
      {
        icon: "Map",
        title: "Roteiro sob medida",
        description: "Defina o trajeto, horários e paradas. City tour ou viagem longa, do seu jeito.",
      },
    ],
  },

  // ===== Estatísticas =====
  stats: [
    { value: "24h", label: "Disponível todos os dias" },
    { value: "8+", label: "Anos de experiência" },
    { value: "100%", label: "Pontualidade garantida" },
    { value: "5.0", label: "Avaliação dos clientes" },
  ],

  // ===== Depoimentos iniciais (exibidos até ter avaliações reais suficientes) =====
  testimonials: [
    {
      name: "Ricardo Mendes",
      role: "Empresário",
      text: "O Milton é pontualíssimo e muito educado. Já fiz várias viagens intermunicipais com ele, sempre tranquilo e confortável.",
      rating: 5,
    },
    {
      name: "Fernanda Castro",
      role: "Advogada",
      text: "Atendimento impecável. Carro limpo, ar ajustado do meu jeito e conversa respeitosa. Recomendo demais.",
      rating: 5,
    },
    {
      name: "Carlos Eduardo",
      role: "Engenheiro",
      text: "Levo para o aeroporto sempre que posso. Nunca cheguei atrasado. Profissional de verdade.",
      rating: 5,
    },
  ],
} as const;

// ===== Helpers =====

/** Monta o link wa.me com mensagem pré-preenchida */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Link mailto */
export function emailLink(subject?: string) {
  return subject
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${siteConfig.contact.email}`;
}
