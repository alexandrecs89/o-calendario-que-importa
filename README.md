# O Calendário Que Importa

**Plataforma white-label de memória de clubes de futebol** — Um calendário interativo com eventos históricos, linha do tempo, efemérides e muito mais.

Atualmente configurado para o **Sport Club Corinthians Paulista**, mas projetado para ser facilmente replicado para qualquer clube.

---

## Funcionalidades

- **Calendário interativo** — Navegue mês a mês pelos eventos históricos
- **Aconteceu Hoje** — Card destacando eventos que ocorreram na mesma data em outros anos
- **Filtros por categoria** — Títulos, Clássicos, Marcos Históricos, Ídolos, Jogadores, Ex-Jogadores, Recordes
- **Linha do Tempo** — Modo de visualização anual com timeline completa desde a fundação
- **Busca por evento** — Pesquise por nome de conquista, jogador ou data
- **Multi-categoria** — Jogadores podem pertencer a múltiplas categorias (ex: Ídolo + Ex-Jogador)
- **Botão Parabéns** — Envie parabéns a jogadores no dia do aniversário
- **Botões de ação** — Assistir vídeo, ver reportagem, reportar erro em cada evento
- **Persistência com localStorage** — Eventos da comunidade, parabéns, sugestões
- **Totalmente monocromático** — Preto, branco e cinza

---

## Arquitetura White-Label

O projeto é **configuration-driven** — toda a identidade do clube é definida em um único arquivo de configuração:

```
├── js/config.js           # Identidade do clube (nome, cores, categorias, labels)
├── data/events.json       # Banco de dados de eventos (fonte canônica)
├── themes/corinthians.css # Tema CSS (variáveis de cor)
├── js/events.js           # Fallback p/ file:// (gerado a partir do JSON)
├── js/app.js              # Engine (agnóstico de clube)
├── css/style.css          # Estilos base (usa CSS variables)
└── index.html             # Estrutura (populada dinamicamente)
```

### Para adaptar a outro clube:

1. **Crie um novo `config.js`** — Altere nome, slogan, logo, categorias, labels
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
| `storagePrefix` | Prefixo do localStorage (evita colisão entre clubes) |

---

## Eventos

**179 eventos** incluídos na versão Corinthians:

- Todos os títulos paulistas (1914–2019)
- Campeonatos Brasileiros (1990, 1998, 1999, 2005, 2011, 2015, 2017)
- Copas do Brasil (1995, 2002, 2009)
- Libertadores 2012 + Mundial de Clubes (2000, 2012)
- Clássicos históricos (Derby, Majestoso e mais)
- Marcos (Fundação, Democracia Corinthiana, Arena, Série B e volta)
- 76 aniversários de jogadores + 12 falecimentos
- Recordes (invencibilidade, artilharia, público)

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

## Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- Fontes: Oswald + Open Sans (Google Fonts)
- Persistência: localStorage
- Zero dependências externas / zero build step

---

## Estrutura

```
├── index.html              # Página principal (estrutura dinâmica)
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
├── favicon.ico             # Favicon
└── README.md
```

---

## Contribuindo

Quer adicionar um evento? Use o botão **"+ Evento"** no site ou edite `data/events.json` e abra um PR.

---

**Vai, Corinthians!**
