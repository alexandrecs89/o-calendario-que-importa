# O Calendário Que Importa 🖤🤍

**Plataforma de apoio à memória Corinthiana** — Um calendário interativo com todos os eventos históricos do Sport Club Corinthians Paulista.

## Funcionalidades

- 📅 **Calendário interativo** — Navegue mês a mês pelos eventos históricos do Corinthians
- 🎂 **Aconteceu Hoje** — Card destacando eventos que ocorreram na mesma data em outros anos
- 🏆 **Filtros por categoria** — Títulos, Clássicos, Marcos Históricos, Ídolos, Recordes
- 📜 **Visão por ano (Linha do Tempo)** — Modo de visualização anual com timeline completa
- 🔍 **Busca por evento** — Pesquise por nome de conquista, jogador ou data
- 💾 **Persistência com localStorage** — Eventos adicionados pela comunidade são salvos localmente
- ➕ **Adicionar eventos** — A Fiel pode contribuir com novos eventos e memórias

## Eventos incluídos

O banco de dados inclui mais de 70 eventos históricos:
- Todos os títulos paulistas (1914–2019)
- Campeonatos Brasileiros (1990, 1998, 1999, 2005, 2011, 2015, 2017)
- Copas do Brasil (1995, 2002, 2009)
- Libertadores 2012
- Mundiais de Clubes (2000, 2012)
- Clássicos históricos (Derby, Majestoso e mais)
- Marcos (Fundação, Democracia Corinthiana, Arena, Série B e volta)
- Ídolos (Rivellino, Sócrates, Marcelinho, Ronaldo, Cássio, Tite e mais)
- Recordes (invencibilidade, artilharia, público)

## Como usar

Basta abrir o `index.html` em qualquer navegador moderno. Não requer servidor, build ou dependências externas.

```bash
# Clone o repositório
git clone https://github.com/alexandrecs89/o-calendario-que-importa.git
cd o-calendario-que-importa

# Abra no navegador
open index.html
# ou
xdg-open index.html
```

## Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- Fontes: Oswald + Open Sans (Google Fonts)
- Persistência: localStorage

## Estrutura

```
├── index.html       # Página principal
├── css/
│   └── style.css    # Estilos (tema escuro, responsivo)
├── js/
│   ├── events.js    # Banco de dados de eventos históricos
│   └── app.js       # Lógica do calendário, busca, filtros
└── README.md
```

## Contribuindo

Quer adicionar um evento? Use o botão **"+ Evento"** no site ou abra um PR adicionando ao array `CORINTHIANS_EVENTS` em `js/events.js`.

---

**Vai, Corinthians!** ⚫⚪
