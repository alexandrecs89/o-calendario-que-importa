# O Calendário Que Importa

**Plataforma white-label de memória de clubes de futebol** — Um calendário interativo com eventos históricos, linha do tempo, efemérides e muito mais.

🌐 **[ocalendarioqueimporta.com.br](https://ocalendarioqueimporta.com.br)**

Atualmente configurado para o **Sport Club Corinthians Paulista**, mas projetado para ser facilmente replicado e vendido para qualquer clube.

*"Cada data, uma memória. Cada conquista, eterna."*

---

## Funcionalidades

### Calendário e Navegação
- **Calendário interativo** — Navegue mês a mês pelos eventos históricos com indicadores coloridos por categoria
- **Aconteceu Hoje** — Card em destaque mostrando eventos que ocorreram na mesma data em outros anos
- **Linha do Tempo** — Visualização cronológica vertical agrupada por ano, desde a fundação do clube
- **Busca por evento** — Pesquise por nome de conquista, jogador, data ou qualquer termo

### Categorias e Filtros
- **7 categorias** — Títulos, Clássicos, Marcos Históricos, Ídolos, Jogadores, Ex-Jogadores, Recordes
- **Multi-categoria** — Jogadores podem pertencer a múltiplas categorias (ex: Ralf é Ídolo + Ex-Jogador)
- **Filtro dinâmico** — Filtre eventos por qualquer combinação de categorias

### Interatividade
- **Botão Parabéns** — Envie parabéns a jogadores no dia do aniversário (persistido via localStorage)
- **Compartilhar evento** — Copie link do evento para compartilhar nas redes sociais
- **Assistir vídeo** — Link direto para vídeos dos eventos, ou sugira um vídeo se não houver
- **Ver reportagem** — Link para matérias sobre o evento, ou sugira uma reportagem
- **Reportar erro** — Sinalize informações incorretas em qualquer evento
- **+ Evento** — Adicione eventos da comunidade (salvos localmente)

### PWA e Offline
- **Instalável como app** — Manifest.json + Service Worker para instalação no dispositivo
- **Funciona offline** — Cache de recursos para acesso sem internet
- **Banner de instalação** — Convite para instalar o app na primeira visita

### Doações
- **Seção de doações** — Modal com métodos de pagamento configuráveis
- **Pix integrado** — Chave Pix para doações voluntárias da torcida

### Outros
- **Botão SAFIEL JÁ!** — Link centralizado na barra superior para campanha da torcida
- **Deploy automático** — Push na branch `base-init` → GitHub Actions → Cloudflare Pages
- **Persistência com localStorage** — Eventos da comunidade, parabéns, sugestões de vídeo/reportagem, erros reportados

---

## Banco de Dados

**498 eventos** na versão Corinthians:

| Categoria | Qtd | Exemplos |
|-----------|-----|----------|
| Ex-Jogadores | 168 | Sócrates, Wladimir, Chicão, Fábio Santos, Paulinho, Tevez |
| Ídolos | 117 | Neco, Rivellino, Marcelinho, Cássio, Rincón, Ralf, Emerson Sheik |
| Clássicos | 107 | Derbys, Majestosos, finais de Libertadores/Mundial, jogos decisivos |
| Marcos Históricos | 99 | Fundação, Democracia Corinthiana, Arena, Série B, Gaviões, faxina política 2026 |
| Títulos | 56 | Paulistas (1914–2019), Brasileiros, Copas do Brasil, Libertadores 2012, Mundiais |
| Recordes | 33 | Invencibilidade, artilharia, público, campanhas históricas |
| Jogadores (elenco atual) | 28 | Hugo Souza, Garro, Lingard, Memphis, Bidon |

Inclui: 182 aniversários de jogadores, falecimentos, todos os títulos paulistas (1914–2019), Brasileiros, Copas do Brasil, Libertadores 2012, Mundiais (2000, 2012), transferências históricas (Tevez, Ronaldo, Adriano, Memphis), eventos políticos (Dualib, expulsões de 2026), Democracia Corinthiana, Gaviões da Fiel e mais.

---

## Arquitetura White-Label

O projeto é **configuration-driven** — toda a identidade do clube é definida em um único arquivo de configuração:

```
├── js/config.js           # Identidade do clube (nome, cores, categorias, labels, doações)
├── data/events.json       # Banco de dados de eventos (fonte canônica)
├── themes/corinthians.css # Tema CSS (variáveis de cor)
├── js/events.js           # Fallback p/ file:// (gerado a partir do JSON)
├── js/app.js              # Engine (agnóstico de clube)
├── css/style.css          # Estilos base (usa CSS variables)
└── index.html             # Estrutura (populada dinamicamente)
```

### Para adaptar a outro clube:

1. **Crie um novo `config.js`** — Altere nome, slogan, logo, categorias, labels, doações
2. **Crie um novo `events.json`** — Popule com os eventos do novo clube
3. **Crie um novo tema CSS** — Defina as cores do clube em `themes/meu-clube.css`
4. **Substitua os assets** — Logo, favicon, ícone de ídolo

Nenhuma mudança no `app.js` ou `style.css` é necessária.

### config.js — O que é configurável:

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único do clube |
| `name` | Nome exibido no header |
| `slogan` | Subtítulo/slogan |
| `clubName` | Nome oficial do clube |
| `foundingYear` | Ano de fundação (início da timeline) |
| `logo` / `favicon` | Caminhos para assets visuais |
| `theme` | Caminho para CSS de tema |
| `eventsUrl` | URL do JSON de eventos |
| `categories[]` | Lista de categorias com id, label, ícone |
| `labels{}` | Todos os textos da UI (i18n-ready) |
| `footer{}` | Textos do rodapé |
| `donations{}` | Configuração de doações (métodos, textos, chave Pix) |
| `storagePrefix` | Prefixo do localStorage (evita colisão entre clubes) |

---

## Como usar

### Com servidor (recomendado):
```bash
git clone https://github.com/alexandrecs89/o-calendario-que-importa.git
cd o-calendario-que-importa
python3 -m http.server 8080
# Abra http://localhost:8080
```

### Sem servidor (file://):
```bash
# Basta abrir index.html — o fallback js/events.js garante funcionamento
open index.html
```

---

## Deploy

O site é publicado automaticamente via **GitHub Actions + Cloudflare Pages**:

1. Push na branch `base-init` → Trigger do workflow `.github/workflows/deploy.yml`
2. GitHub Actions faz upload dos arquivos para o Cloudflare Pages
3. Site atualizado em [ocalendarioqueimporta.com.br](https://ocalendarioqueimporta.com.br)

**Secrets necessários no GitHub:**
- `CLOUDFLARE_API_TOKEN` — Token da API do Cloudflare com permissão Pages + DNS
- `CLOUDFLARE_ACCOUNT_ID` — ID da conta Cloudflare

---

## Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- Fontes: Oswald + Open Sans (Google Fonts)
- Persistência: localStorage
- PWA: manifest.json + Service Worker
- Deploy: GitHub Actions + Cloudflare Pages
- Zero dependências externas / zero build step

---

## Estrutura

```
├── index.html              # Página principal (estrutura dinâmica)
├── manifest.json           # Manifest PWA (instalável)
├── sw.js                   # Service Worker (cache offline)
├── css/
│   └── style.css           # Estilos base + CSS variables
├── themes/
│   └── corinthians.css     # Tema Corinthians (monochrome)
├── js/
│   ├── config.js           # Configuração do clube (white-label)
│   ├── events.js           # Fallback de eventos (file://)
│   └── app.js              # Engine principal (config-driven)
├── data/
│   └── events.json         # Banco de eventos (fonte canônica)
├── img/
│   ├── logo.png            # Logo do projeto
│   └── socrates.png        # Ícone da categoria Ídolo
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD → Cloudflare Pages
└── favicon.ico             # Favicon
```

---

## Próximos Passos

### Fase 1 — Completude do Conteúdo
- [ ] Expandir para **500+ eventos** (temporadas completas, jogos decisivos, transferências)
- [ ] Adicionar **perfis de jogadores** com foto, estatísticas e biografia resumida
- [ ] Incluir **fotos e imagens** nos eventos (capas de jornal, fotos históricas)
- [ ] Mapear **rivalidades** com timeline específica de clássicos
- [ ] Adicionar eventos de **bastidores e política** (eleições, escândalos, conquistas administrativas)

### Fase 2 — Interatividade e Engajamento
- [ ] **Notificações push** — Avisar sobre efemérides do dia via Service Worker
- [ ] **Quiz corinthiano** — Perguntas sobre história do clube com ranking
- [ ] **Reações nos eventos** — Além de Parabéns, permitir 🔥❤️😢 etc.
- [ ] **Comentários da comunidade** — Torcedores compartilhando memórias em cada evento
- [ ] **Ranking de engajamento** — Gamificação para torcedores mais ativos
- [ ] **Compartilhamento social** — Cards gerados automaticamente para Instagram/Twitter/WhatsApp

### Fase 3 — Infraestrutura e Escalabilidade
- [ ] **Backend** — Migrar de localStorage para Firebase/Supabase (sugestões, erros, parabéns persistem na nuvem)
- [ ] **CMS de eventos** — Painel administrativo para gerenciar eventos sem editar JSON
- [ ] **Moderação de conteúdo** — Revisar sugestões de vídeo/reportagem antes de publicar
- [ ] **Analytics** — Entender quais eventos são mais acessados, quais filtros são mais usados
- [ ] **SEO** — Meta tags dinâmicas, sitemap, Open Graph para cada evento

### Fase 4 — Produto Multi-Tenant
- [ ] **Sistema de temas** — Gerador visual de temas (defina cores → CSS gerado automaticamente)
- [ ] **Painel de onboarding** — Formulário para criar instância de novo clube (nome, cores, logo → site pronto)
- [ ] **Subdomínios automáticos** — `flamengo.ocalendarioqueimporta.com.br`
- [ ] **API de eventos** — Endpoint REST para consultar eventos programaticamente
- [ ] **Dashboard de vendas** — Métricas de uso por clube, gestão de assinaturas
- [ ] **Documentação de vendas** — Pitch deck, demo interativa, comparativo de planos

### Fase 5 — Migração de Framework (quando necessário)
- [ ] Avaliar migração para **Next.js** ou **SvelteKit** (SSR, SEO, routing)
- [ ] **Internacionalização (i18n)** — Suporte a múltiplos idiomas (PT, EN, ES)
- [ ] **Testes automatizados** — Cypress/Playwright para regressão visual
- [ ] **CI/CD robusto** — Lint, testes, deploy preview por PR

---

## Contribuindo

Quer adicionar um evento? Use o botão **"+ Evento"** no site ou edite `data/events.json` e abra um PR.

Encontrou um erro? Use o botão **"Reportar Erro"** dentro do evento ou abra uma issue.

---

## Licença

Este é um projeto de fãs sem fins lucrativos. Mantido por doações voluntárias da Fiel.

---

**Vai, Corinthians!**
