/**
 * Club Configuration — White-label identity layer.
 * To adapt this platform for another club, duplicate this file and customize.
 */
const CLUB_CONFIG = {
  /* ---------- Identity ---------- */
  id: "corinthians",
  name: "O Calendário Que Importa",
  slogan: "Cada data, uma memória. Cada conquista, eterna.",
  clubName: "Sport Club Corinthians Paulista",
  foundingYear: 1910,
  logo: "img/logo.png",
  favicon: "favicon.ico",

  /* ---------- Meta / SEO ---------- */
  meta: {
    title: "O Calendário Que Importa — Memória Corinthiana",
    description: "O mais completo portal interativo de memória do Sport Club Corinthians Paulista. Calendário, linha do tempo, efemérides e mais.",
    ogImage: "img/logo.png",
    siteUrl: "https://ocalendarioqueimporta.com.br",
    canonical: "https://ocalendarioqueimporta.com.br/",
    language: "pt-BR",
    sitemap: true,
    schemaOrg: true,
  },

  /* ---------- Theme (CSS variable overrides) ---------- */
  theme: "themes/corinthians.css",

  /* ---------- Data ---------- */
  eventsUrl: "data/events.json",

  /* ---------- Categories ---------- */
  categories: [
    { id: "titulo", label: "Título", labelPlural: "Títulos", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M5 1h14v2H5V1zm-2 3h18v2h-1v6c0 1.1-.4 2.1-1 2.8V22h-2v-6H7v6H5v-7.2c-.6-.7-1-1.7-1-2.8V6H3V4zm4 2v6c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3V6H7z"/></svg>' },
    { id: "classico", label: "Clássico", labelPlural: "Clássicos", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12 6l1.5 3.5L17 10.2l-2.5 2.8.5 3.5L12 15l-3 1.5.5-3.5L7 10.2l3.5-.7z"/></svg>' },
    { id: "marco", label: "Marco", labelPlural: "Marcos", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M5 2v20h2v-7c0 0 1.5-1 4.5-1s4 1.5 7 1.5c1 0 1.5-.2 1.5-.2V3.5S19 4.5 17 4.5c-3 0-4-1.5-7-1.5C7.5 3 7 3.5 7 3.5V2H5z"/></svg>' },
    { id: "idolo", label: "Ídolo", labelPlural: "Ídolos", icon: "img", img: "img/socrates.png" },
    { id: "jogador", label: "Jogador", labelPlural: "Jogadores", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/></svg>' },
    { id: "ex_jogador", label: "Ex-Jogador", labelPlural: "Ex-Jogadores", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M16.5 3L12 5 7.5 3 2 6.5V11l3.5-1V22h13V10l3.5 1V6.5L16.5 3z"/></svg>' },
    { id: "recorde", label: "Recorde", labelPlural: "Recordes", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M16 1a7 7 0 0 1 5.75 11H22l-4 4-4-4h2.27A5 5 0 1 0 11 7H9a7 7 0 0 1 7-7zM8 23a7 7 0 0 1-5.75-11H2l4-4 4 4H7.73A5 5 0 1 0 13 17h2a7 7 0 0 1-7 7z"/></svg>' },
    { id: "comunidade", label: "Comunidade", labelPlural: "Comunidade", icon: "svg", svg: '<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><circle cx="9" cy="7" r="3.5"/><circle cx="17" cy="7" r="2.5"/><path d="M1 19v-1c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H1z"/><path d="M17 19v-1c0-1.5-.5-2.8-1.3-4 .7-.3 1.5-.5 2.3-.5h1c2.8 0 5 2.2 5 5v.5h-7z"/></svg>' },
  ],

  /* ---------- UI Labels (i18n-ready) ---------- */
  labels: {
    allFilter: "Todos",
    searchPlaceholder: "Buscar evento, jogador, data…",
    addEventBtn: "+ Evento",
    addEventTitle: "Adicionar Evento",
    addEventTitleField: "Título do Evento",
    addEventTitlePlaceholder: "Ex: Gol do Neto no Derby",
    addEventDateField: "Data",
    addEventCategoryField: "Categoria",
    addEventDescriptionField: "Descrição",
    addEventDescriptionPlaceholder: "Conte a história desse momento…",
    addEventCancel: "Cancelar",
    addEventSave: "Salvar",
    onThisDayPrefix: "Aconteceu em ",
    onThisDaySubtitle: "Eventos marcantes que ocorreram nesta mesma data em outros anos",
    onThisDayEmpty: "Nenhum evento registrado para esta data.",
    timelineTitle: "Linha do Tempo",
    timelineSubtitle: "De {startYear} até hoje — explore a história completa",
    timelineEmpty: "Nenhum evento registrado para este ano.",
    alsoOnThisDate: "Também nesta data",
    eventsOnDate: "{count} eventos nesta data",
    yearsAgo: "há {n} ano",
    yearsAgoPlural: "há {n} anos",
    parabensBtn: "Parabéns!",
    parabensSend: "Envie seus parabéns!",
    /* Reactions */
    reactionsTitle: "Reações",
    reactions: [
      { id: "fire", emoji: "🔥", label: "Arrepio" },
      { id: "heart", emoji: "❤️", label: "Amor" },
      { id: "cry", emoji: "😢", label: "Saudade" },
      { id: "muscle", emoji: "💪", label: "Orgulho" },
      { id: "trophy", emoji: "🏆", label: "Lendário" },
    ],
    /* Comments */
    commentsTitle: "Memórias da Fiel",
    commentsPlaceholder: "Compartilhe sua memória… (ex: Eu estava lá!)",
    commentsSend: "Enviar",
    commentsEmpty: "Seja o primeiro a compartilhar uma memória!",
    /* Quiz */
    quizTitle: "Quiz Corinthiano",
    quizSubtitle: "Teste seus conhecimentos sobre a história do Timão",
    quizStart: "Começar Quiz",
    quizNext: "Próxima",
    quizFinish: "Ver Resultado",
    quizCorrect: "Correto!",
    quizWrong: "Errado!",
    quizScore: "Você acertou {score} de {total}",
    quizPlayAgain: "Jogar Novamente",
    quizShare: "Compartilhar Resultado",
    /* Engagement */
    engagementTitle: "Nível de Fiel",
    engagementLevels: [
      { min: 0, title: "Torcedor Iniciante", icon: "⚽" },
      { min: 10, title: "Fiel de Carteirinha", icon: "🎫" },
      { min: 30, title: "Mosqueteiro", icon: "⚔️" },
      { min: 60, title: "Bando de Loucos", icon: "🔥" },
      { min: 100, title: "Lenda da Fiel", icon: "👑" },
    ],
    reportError: "Reportar erro",
    reportErrorPrompt: "Descreva o erro encontrado neste evento:",
    reportErrorDone: "Erro reportado!",
    suggestVideo: "Sugerir vídeo",
    suggestVideoPrompt: "Cole o link do vídeo (YouTube, etc.):",
    suggestVideoDone: "Vídeo sugerido!",
    watchVideo: "Assistir vídeo",
    suggestNews: "Sugerir reportagem",
    suggestNewsPrompt: "Cole o link da reportagem:",
    suggestNewsDone: "Reportagem sugerida!",
    readNews: "Ver reportagem",
    noResults: "Nenhum resultado",
    moreEvents: "+{n} mais",
    weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  },

  /* ---------- Footer ---------- */
  footer: {
    line1: "Vai, Corinthians! — Feito com amor pela Fiel Torcida",
    line2: "Dados históricos compilados com carinho. Ajude a completar adicionando eventos!",
  },

  /* ---------- Donations ---------- */
  donations: {
    enabled: true,
    title: "Apoie este projeto",
    subtitle: "Este é um projeto de fãs sem fins lucrativos. Sua doação ajuda a manter e expandir a memória corinthiana.",
    methods: [
      { type: "pix", label: "Pix", key: "79f0b1bf-2ad4-4dc5-a262-c44d250ad183", qrCode: "" },
    ],
    cta: "Fazer uma doação",
    thanks: "Obrigado pelo apoio, Fiel! ❤🖤",
  },

  /* ---------- Quiz ---------- */
  quiz: {
    enabled: true,
    questionsPerRound: 10,
  },

  /* ---------- Analytics ---------- */
  analytics: {
    enabled: true,
    trackEventViews: true,
    trackFilters: true,
    trackSearches: true,
    trackQuiz: true,
    trackReactions: true,
    trackShares: true,
    provider: "cloudflare", // "cloudflare" | "google" | "none"
  },

  /* ---------- Storage key prefix (avoids collision across clubs) ---------- */
  storagePrefix: "corinthians",

  /* ---------- Timeline ---------- */
  timelineStartYear: 1910,
  defaultTimelineYear: 2012,
};
