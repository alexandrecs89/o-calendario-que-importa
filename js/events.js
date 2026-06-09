/**
 * Banco de dados de eventos históricos do Sport Club Corinthians Paulista.
 * Cada evento: { id, date (YYYY-MM-DD), title, category, description }
 * Categorias: titulo | classico | marco | idolo | recorde
 */
const CORINTHIANS_EVENTS = [
  // ===== FUNDAÇÃO =====
  { id: 1, date: "1910-09-01", title: "Fundação do Sport Club Corinthians Paulista", category: "marco", description: "O Corinthians foi fundado no bairro do Bom Retiro, por um grupo de operários liderados por Joaquim Ambrósio. O nome veio do Corinthian FC da Inglaterra, que excursionava pelo Brasil na época." },

  // ===== TÍTULOS PAULISTAS =====
  { id: 2, date: "1914-11-22", title: "1º Campeonato Paulista", category: "titulo", description: "Corinthians conquista seu primeiro título paulista, apenas 4 anos após sua fundação, consolidando-se como potência do futebol de São Paulo." },
  { id: 3, date: "1916-12-10", title: "Campeonato Paulista 1916", category: "titulo", description: "Bicampeonato paulista do Corinthians." },
  { id: 4, date: "1922-12-17", title: "Campeonato Paulista 1922", category: "titulo", description: "Mais um título estadual para o Timão." },
  { id: 5, date: "1923-12-16", title: "Campeonato Paulista 1923", category: "titulo", description: "Bicampeonato consecutivo, consolidando a força corinthiana no início do século XX." },
  { id: 6, date: "1924-12-14", title: "Campeonato Paulista 1924", category: "titulo", description: "Tricampeonato consecutivo — primeira grande dinastia corinthiana." },
  { id: 7, date: "1928-12-09", title: "Campeonato Paulista 1928", category: "titulo", description: "Corinthians volta ao topo do futebol paulista." },
  { id: 8, date: "1929-12-15", title: "Campeonato Paulista 1929", category: "titulo", description: "Mais um bi consecutivo para o Corinthians." },
  { id: 9, date: "1930-12-14", title: "Campeonato Paulista 1930", category: "titulo", description: "Tri consecutivo novamente — era de ouro na década de 1920-30." },
  { id: 10, date: "1937-12-12", title: "Campeonato Paulista 1937", category: "titulo", description: "Título paulista de 1937." },
  { id: 11, date: "1938-12-11", title: "Campeonato Paulista 1938", category: "titulo", description: "Bicampeonato paulista 1937-38." },
  { id: 12, date: "1939-12-17", title: "Campeonato Paulista 1939", category: "titulo", description: "Tricampeonato consecutivo — domínio total nos anos 1930." },
  { id: 13, date: "1941-12-14", title: "Campeonato Paulista 1941", category: "titulo", description: "Título paulista de 1941." },
  { id: 14, date: "1951-12-16", title: "Campeonato Paulista 1951", category: "titulo", description: "Corinthians campeão paulista com grande campanha." },
  { id: 15, date: "1952-12-21", title: "Campeonato Paulista 1952", category: "titulo", description: "Bi paulista 1951-52." },
  { id: 16, date: "1954-12-12", title: "Campeonato Paulista 1954", category: "titulo", description: "Título estadual de 1954." },
  { id: 17, date: "1977-11-27", title: "Campeonato Paulista 1977", category: "titulo", description: "Fim de um longo jejum! Após 23 anos sem título paulista, o Corinthians se sagra campeão em campanha histórica que ficou conhecida como a 'invasão corinthiana'." },
  { id: 18, date: "1979-12-02", title: "Campeonato Paulista 1979", category: "titulo", description: "Título paulista no auge da Democracia Corinthiana, período de gestão democrática liderada por Sócrates, Wladimir e Casagrande." },
  { id: 19, date: "1982-12-19", title: "Campeonato Paulista 1982", category: "titulo", description: "A Democracia Corinthiana no seu auge: título conquistado com futebol bonito e ideais de liberdade." },
  { id: 20, date: "1983-12-18", title: "Campeonato Paulista 1983", category: "titulo", description: "Bicampeonato da Democracia Corinthiana. Time histórico com Sócrates, Casagrande e companhia." },
  { id: 21, date: "1988-05-08", title: "Campeonato Paulista 1988", category: "titulo", description: "Título paulista com goleada na final." },
  { id: 22, date: "1995-06-25", title: "Campeonato Paulista 1995", category: "titulo", description: "Título paulista de 1995 — era de grandes ídolos como Marcelinho Carioca e Edilson." },
  { id: 23, date: "1997-12-14", title: "Campeonato Paulista 1997", category: "titulo", description: "Mais um título estadual para a Fiel." },
  { id: 24, date: "1999-06-13", title: "Campeonato Paulista 1999", category: "titulo", description: "Título paulista de 1999, prelúdio da grande era de títulos nacionais." },
  { id: 25, date: "2001-06-24", title: "Campeonato Paulista 2001", category: "titulo", description: "Corinthians campeão paulista no ano seguinte ao Mundial de Clubes." },
  { id: 26, date: "2003-06-22", title: "Campeonato Paulista 2003", category: "titulo", description: "Título paulista de 2003 com grande elenco." },
  { id: 27, date: "2009-05-03", title: "Campeonato Paulista 2009", category: "titulo", description: "Título paulista no retorno triunfal à Série A. Ronaldo Fenômeno brilha." },
  { id: 28, date: "2013-05-19", title: "Campeonato Paulista 2013", category: "titulo", description: "Título paulista de 2013, ano da inauguração da Arena Corinthians." },
  { id: 29, date: "2017-05-07", title: "Campeonato Paulista 2017", category: "titulo", description: "Título paulista de 2017 com grande campanha invicta." },
  { id: 30, date: "2018-04-08", title: "Campeonato Paulista 2018", category: "titulo", description: "Bicampeonato paulista consecutivo 2017-2018." },
  { id: 31, date: "2019-04-21", title: "Campeonato Paulista 2019", category: "titulo", description: "Tricampeonato paulista consecutivo — domínio total do Corinthians no estadual." },

  // ===== TÍTULOS BRASILEIROS =====
  { id: 32, date: "1990-12-16", title: "Campeonato Brasileiro 1990", category: "titulo", description: "Primeiro título brasileiro oficial do Corinthians! Campanha emocionante sob o comando de Neto, Tupãzinho e cia.", videoUrl: "https://www.youtube.com/watch?v=3nO-s9EhFJ0" },
  { id: 33, date: "1998-12-13", title: "Campeonato Brasileiro 1998", category: "titulo", description: "Bicampeonato brasileiro! Time de Dida, Rincón, Edilson e Marcelinho Carioca conquista o título em campanha brilhante." },
  { id: 34, date: "1999-12-22", title: "Campeonato Brasileiro 1999", category: "titulo", description: "Tricampeonato consecutivo! Time comandado por Oswaldo de Oliveira faz história." },
  { id: 35, date: "2005-12-04", title: "Campeonato Brasileiro 2005", category: "titulo", description: "Título brasileiro com Tevez, Mascherano e cia. Corinthians de grandes estrelas internacionais." },
  { id: 36, date: "2011-12-04", title: "Campeonato Brasileiro 2011", category: "titulo", description: "Pentacampeonato brasileiro! Time de Tite, com Liedson, Alex e companhia, domina o campeonato." },
  { id: 37, date: "2015-11-22", title: "Campeonato Brasileiro 2015", category: "titulo", description: "Hexacampeonato brasileiro com grande campanha sob o comando de Tite." },
  { id: 38, date: "2017-11-15", title: "Campeonato Brasileiro 2017", category: "titulo", description: "Heptacampeonato brasileiro! Corinthians conquista mais um caneco com campanha impressionante." },

  // ===== COPA DO BRASIL =====
  { id: 39, date: "1995-07-12", title: "Copa do Brasil 1995", category: "titulo", description: "Primeiro título da Copa do Brasil! Corinthians vence o Grêmio na final em jogos eletrizantes." },
  { id: 40, date: "2002-07-10", title: "Copa do Brasil 2002", category: "titulo", description: "Bicampeonato da Copa do Brasil, vencendo o Brasiliense na final." },
  { id: 41, date: "2009-07-01", title: "Copa do Brasil 2009", category: "titulo", description: "Terceira Copa do Brasil! Ronaldo marca na final e o Corinthians levanta a taça." },

  // ===== LIBERTADORES =====
  { id: 42, date: "2012-07-04", title: "Copa Libertadores da América 2012", category: "titulo", description: "O MAIOR TÍTULO DA HISTÓRIA! Corinthians conquista a Libertadores pela primeira vez, vencendo o Boca Juniors na final com gols de Emerson Sheik. Cássio faz defesas históricas. Vai, Corinthians!", videoUrl: "https://www.youtube.com/watch?v=GyKXFKJZeno", newsUrl: "https://ge.globo.com/futebol/times/corinthians/noticia/2012/07/corinthians-e-campeao-da-libertadores.ghtml" },

  // ===== MUNDIAIS =====
  { id: 43, date: "2000-01-14", title: "Mundial de Clubes FIFA 2000", category: "titulo", description: "Corinthians é o primeiro campeão mundial de clubes da FIFA! Venceu o Vasco na final nos pênaltis, com Dida pegando a cobrança decisiva. Rincón, Marcelinho e Edilson brilharam.", videoUrl: "https://www.youtube.com/watch?v=z8WPGNZfKcY" },
  { id: 44, date: "2012-12-16", title: "Mundial de Clubes FIFA 2012", category: "titulo", description: "BICAMPEÃO MUNDIAL! Corinthians vence o Chelsea na final com gol de Guerrero. Time inesquecível de Cássio, Chicão, Ralf, Paulinho, Emerson Sheik e cia.", videoUrl: "https://www.youtube.com/watch?v=fWYbMqFJVdI", newsUrl: "https://ge.globo.com/futebol/times/corinthians/noticia/2012/12/corinthians-vence-chelsea-e-e-bicampeao-mundial.ghtml" },

  // ===== RECOPA =====
  { id: 45, date: "2013-07-17", title: "Recopa Sul-Americana 2013", category: "titulo", description: "Corinthians vence o São Paulo na final da Recopa Sul-Americana." },

  // ===== CLÁSSICOS HISTÓRICOS =====
  { id: 50, date: "1945-09-02", title: "Corinthians 8 x 0 Santos", category: "classico", description: "Uma das maiores goleadas em clássicos: Timão aplica 8 a 0 no Santos." },
  { id: 51, date: "1968-10-13", title: "Rivellino brilha no Derby: Corinthians 3 x 1 Palmeiras", category: "classico", description: "Rivellino marca golaço no clássico e comanda a vitória corintiana." },
  { id: 52, date: "1977-10-30", title: "Invasão Corinthiana — Final do Paulista 1977", category: "classico", description: "Mais de 70 mil torcedores invadem o Morumbi para apoiar o Corinthians na final do Paulista contra a Ponte Preta. Cena histórica da maior torcida do Brasil." },
  { id: 53, date: "1983-04-10", title: "Derby da Democracia: Corinthians 1 x 0 Palmeiras", category: "classico", description: "Sócrates marca de cabeça e o Corinthians da Democracia Corinthiana vence o Derby em jogo memorável." },
  { id: 54, date: "1995-06-11", title: "Final do Paulista 1995: Corinthians 1 x 0 Palmeiras", category: "classico", description: "Marcelinho Carioca marca de falta e dá o título paulista ao Corinthians em cima do rival." },
  { id: 55, date: "1999-12-19", title: "Corinthians 3 x 0 Atlético-MG — Decisão do Brasileiro 1999", category: "classico", description: "Vitória categórica que garantiu o título brasileiro de 1999." },
  { id: 56, date: "2000-01-14", title: "Corinthians x Vasco — Final do Mundial 2000", category: "classico", description: "O Corinthians vence o Vasco nos pênaltis no Maracanã e se torna o primeiro campeão mundial de clubes da FIFA. Dida pega o pênalti decisivo." },
  { id: 57, date: "2009-06-24", title: "Corinthians 2 x 1 Internacional — Final Copa do Brasil", category: "classico", description: "Ronaldo marca o gol decisivo na final da Copa do Brasil 2009 em Porto Alegre." },
  { id: 58, date: "2012-06-27", title: "Corinthians 2 x 0 Boca Juniors — Final Libertadores (ida)", category: "classico", description: "Emerson Sheik marca os dois gols na vitória sobre o Boca Juniors na Bombonera.", videoUrl: "https://www.youtube.com/watch?v=9qF3UlBNmsQ" },
  { id: 59, date: "2012-07-04", title: "Corinthians 2 x 0 Boca Juniors — Final Libertadores (volta)", category: "classico", description: "No Pacaembu, Emerson Sheik marca novamente e o Corinthians conquista a primeira Libertadores. Cássio faz defesas milagrosas." },
  { id: 60, date: "2012-12-16", title: "Corinthians 1 x 0 Chelsea — Final Mundial de Clubes", category: "classico", description: "Guerrero marca de cabeça e o Corinthians vence o Chelsea, campeão da Champions League, para se sagrar bicampeão mundial!" },
  { id: 61, date: "2020-02-22", title: "Corinthians 2 x 1 Palmeiras — Derby na Arena", category: "classico", description: "Vitória emocionante no Derby com gol nos acréscimos." },
  { id: 62, date: "2018-09-10", title: "Corinthians 2 x 1 São Paulo — Majestoso histórico", category: "classico", description: "Vitória corinthiana no Majestoso com grande atuação coletiva." },

  // ===== MARCOS HISTÓRICOS =====
  { id: 70, date: "1910-09-01", title: "Fundação do Corinthians", category: "marco", description: "O Sport Club Corinthians Paulista foi fundado no Bom Retiro por operários e trabalhadores." },
  { id: 71, date: "1933-01-01", title: "Corinthians se profissionaliza", category: "marco", description: "O Corinthians adere ao futebol profissional, um dos primeiros clubes do Brasil a dar o passo." },
  { id: 72, date: "1982-03-01", title: "Início da Democracia Corinthiana", category: "marco", description: "Movimento político-social dentro do clube onde jogadores, funcionários e dirigentes tinham poder de voto igualitário. Liderado por Sócrates, Wladimir e Casagrande, foi um marco na história do futebol brasileiro e da luta pela democracia no país.", videoUrl: "https://www.youtube.com/watch?v=Pd3Y5dGAHQo" },
  { id: 73, date: "2008-12-17", title: "Retorno à Série A", category: "marco", description: "Corinthians conquista o acesso à Série A do Brasileirão em 2008, encerrando um dos momentos mais difíceis da história do clube." },
  { id: 74, date: "2014-05-18", title: "Inauguração da Arena Corinthians", category: "marco", description: "A Arena Corinthians (Itaquerão) é inaugurada oficialmente, servindo também como sede da Copa do Mundo de 2014. Um sonho antigo realizado pela Fiel Torcida." },
  { id: 75, date: "2014-06-12", title: "Copa do Mundo 2014 — Jogo de Abertura na Arena Corinthians", category: "marco", description: "A Arena Corinthians sedia o jogo de abertura da Copa do Mundo FIFA 2014: Brasil 3 x 1 Croácia." },
  { id: 76, date: "1971-04-14", title: "Rivellino marca o 'Gol Mil' do Corinthians", category: "marco", description: "Rivellino marca o milésimo gol da história do Corinthians em jogos oficiais." },
  { id: 77, date: "2023-09-01", title: "Corinthians completa 113 anos", category: "marco", description: "O Timão do Povo completa mais de um século de história, glórias e paixão." },
  { id: 78, date: "1984-04-16", title: "Sócrates e o voto das Diretas Já", category: "marco", description: "Sócrates usa a camisa do Corinthians para apoiar o movimento Diretas Já, simbolizando a luta pela democracia." },
  { id: 79, date: "2017-09-01", title: "Timão alcança 30 milhões de torcedores", category: "marco", description: "Pesquisa aponta o Corinthians com mais de 30 milhões de torcedores, a maior torcida de São Paulo." },
  { id: 80, date: "2007-10-26", title: "Rebaixamento para a Série B", category: "marco", description: "Um dos dias mais tristes da história corinthiana. O Corinthians é rebaixado para a Série B do Brasileirão em 2007. Mas a Fiel não abandonou." },
  { id: 81, date: "2008-11-15", title: "Maior público da Série B: 46.179 fiéis", category: "marco", description: "Mesmo na Série B, a Fiel lota o estádio: recorde de público na segunda divisão brasileira." },

  // ===== ÍDOLOS =====
  { id: 90, date: "1965-01-10", title: "Estreia de Rivellino pelo Corinthians", category: "idolo", description: "Roberto Rivellino, um dos maiores craques da história do futebol brasileiro, estreia pelo Corinthians. Suas patadas ficariam eternizadas." },
  { id: 91, date: "1978-01-15", title: "Chegada de Sócrates ao Corinthians", category: "idolo", description: "Sócrates, o Doutor, chega ao Corinthians e se torna muito mais que um jogador — se torna símbolo de democracia e resistência." },
  { id: 92, date: "1993-03-15", title: "Marcelinho Carioca chega ao Corinthians", category: "idolo", description: "O Pé de Anjo chega ao Corinthians e se torna um dos maiores ídolos da história com seus gols de falta espetaculares." },
  { id: 93, date: "2009-01-02", title: "Ronaldo é apresentado no Corinthians", category: "idolo", description: "O Fenômeno Ronaldo é apresentado oficialmente como jogador do Corinthians. Maior contratação da história do clube até então. Lotação total no Parque São Jorge." },
  { id: 94, date: "2012-01-10", title: "Cássio chega ao Corinthians", category: "idolo", description: "Cássio Ramos é contratado pelo Corinthians, tornando-se o goleiro mais vitorioso da história do clube. Suas defesas na Libertadores são lendárias." },
  { id: 95, date: "1988-01-10", title: "Neto chega ao Corinthians", category: "idolo", description: "Neto, o artilheiro que seria fundamental no título brasileiro de 1990, se junta ao elenco." },
  { id: 96, date: "1966-02-01", title: "Wladimir começa nas categorias de base", category: "idolo", description: "Wladimir, o lateral que se tornaria símbolo da Democracia Corinthiana e o jogador com mais jogos pelo clube (806 partidas)." },
  { id: 97, date: "2004-12-20", title: "Tevez é contratado pelo Corinthians", category: "idolo", description: "Carlos Tevez, craque argentino, é contratado pela MSI e se torna peça-chave do título brasileiro de 2005." },
  { id: 98, date: "2004-06-15", title: "Mascherano chega ao Corinthians", category: "idolo", description: "Javier Mascherano, futuro capitão da Argentina, joga pelo Corinthians em parceria com a MSI." },
  { id: 99, date: "1998-03-01", title: "Rincón chega ao Corinthians", category: "idolo", description: "Freddy Rincón, o maestro colombiano, se junta ao Timão e é peça-chave nos títulos de 1998, 1999 e do Mundial 2000." },
  { id: 100, date: "2011-06-01", title: "Emerson Sheik retorna ao Corinthians", category: "idolo", description: "Sheik retorna ao Corinthians e se torna herói das finais da Libertadores 2012 com gols históricos." },
  { id: 101, date: "2010-01-15", title: "Tite assume o Corinthians", category: "idolo", description: "Adenor Leonardo Bacchi, o Tite, assume o comando do Corinthians e inicia a era mais vitoriosa do clube: Brasileiro 2011, Libertadores 2012 e Mundial 2012." },

  // ===== RECORDES =====
  { id: 110, date: "2012-07-04", title: "Cássio: Defesa impossível na Libertadores", category: "recorde", description: "A defesa de Cássio no chute de Roncaglia na final da Libertadores é considerada uma das maiores da história do futebol sul-americano." },
  { id: 111, date: "2005-10-23", title: "Tevez: Artilheiro do Brasileiro com 20 gols", category: "recorde", description: "Carlos Tevez termina o Brasileirão 2005 como artilheiro com 20 gols, sendo decisivo no título." },
  { id: 112, date: "1952-03-09", title: "Corinthians 11 x 0 Santo André", category: "recorde", description: "Uma das maiores goleadas da história do clube em competições oficiais." },
  { id: 113, date: "2017-10-01", title: "Corinthians: 34 jogos invictos no Brasileirão", category: "recorde", description: "O Corinthians estabelece uma sequência histórica de 34 jogos invictos no Campeonato Brasileiro de 2017." },
  { id: 114, date: "1977-10-30", title: "Público recorde: mais de 70 mil no Morumbi", category: "recorde", description: "A invasão corinthiana na final do Paulista de 1977 leva mais de 70 mil torcedores ao Morumbi, quebrando recordes de público." },
  { id: 115, date: "2014-05-18", title: "Arena Corinthians: maior estádio construído para a Copa", category: "recorde", description: "Com capacidade para mais de 49 mil torcedores, a Arena Corinthians é o maior estádio construído do zero para a Copa do Mundo de 2014." },
  { id: 116, date: "2019-10-01", title: "Cássio: goleiro com mais jogos pelo Corinthians", category: "recorde", description: "Cássio ultrapassa marcas históricas e se torna o goleiro com mais partidas pelo Corinthians." },
  { id: 117, date: "2023-04-01", title: "Wladimir: 806 jogos — recorde absoluto", category: "recorde", description: "O lateral Wladimir detém o recorde de mais jogos pelo Corinthians com 806 partidas." },
  { id: 118, date: "1990-12-16", title: "Neto: artilheiro decisivo no título de 1990", category: "recorde", description: "Neto termina o Brasileirão de 1990 como artilheiro do time, com gols decisivos na campanha do título." },

  // ===== ANIVERSÁRIOS DE JOGADORES =====
  // Cada evento de aniversário tem type:"aniversario" e playerStatus:"vivo" ou "falecido"
  // Eventos de falecimento têm type:"falecimento"

  // --- Neco (Manuel Nunes) — 1913-1930 ---
  { id: 200, date: "1895-03-07", title: "Nasce Neco — primeiro grande ídolo do Corinthians", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Manuel Nunes, o Neco, nasceu em São Paulo. Foi o primeiro grande ídolo corinthiano, jogando de 1913 a 1930 com 297 jogos e 242 gols. Conquistou 8 Campeonatos Paulistas." },
  { id: 201, date: "1977-05-31", title: "Neco — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Manuel Nunes, o Neco, primeiro grande ídolo da história do Corinthians, aos 82 anos." },

  // --- Teleco (Uriel Fernandes) — 1934-1944 ---
  { id: 202, date: "1913-11-12", title: "Nasce Teleco — o artilheiro lendário", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Uriel Fernandes, o Teleco, nasceu em Curitiba. Jogou pelo Corinthians de 1934 a 1944 com média de mais de 1 gol por jogo (257 gols em 250 jogos). Terceiro maior artilheiro da história do clube." },
  { id: 203, date: "2000-07-22", title: "Teleco — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Uriel Fernandes, o Teleco, lendário artilheiro do Corinthians, aos 86 anos." },

  // --- Cláudio (Cláudio Christóvam de Pinho) — 1945-1957 ---
  { id: 204, date: "1922-07-18", title: "Nasce Cláudio — maior artilheiro da história do Corinthians", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Cláudio Christóvam de Pinho nasceu em Santos. Com 311 gols, é o maior goleador de todos os tempos do Corinthians. Apelidado de 'O Gerente', formou trio devastador com Baltazar e Luizinho." },
  { id: 205, date: "2000-05-01", title: "Cláudio — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Cláudio Christóvam de Pinho, o maior artilheiro da história do Corinthians (311 gols), aos 77 anos." },

  // --- Baltazar (Oswaldo Silva) — 1945-1957 ---
  { id: 206, date: "1926-01-14", title: "Nasce Baltazar — Cabecinha de Ouro", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Oswaldo Silva, o Baltazar, nasceu em Santos. Segundo maior artilheiro da história do Corinthians com 269 gols, era conhecido como 'Cabecinha de Ouro' por suas jogadas aéreas." },
  { id: 207, date: "1997-03-25", title: "Baltazar — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Oswaldo Silva, o Baltazar, 'Cabecinha de Ouro', segundo maior artilheiro da história do Corinthians, aos 71 anos." },

  // --- Luizinho (Luis Trochillo) — 1948-1962 ---
  { id: 208, date: "1930-03-07", title: "Nasce Luizinho — O Pequeno Polegar", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Luis Trochillo, o Luizinho, nasceu em São Paulo. Apelidado de 'Pequeno Polegar', é o terceiro jogador com mais jogos na história do Corinthians (606 partidas). Formou trio lendário com Cláudio e Baltazar." },
  { id: 209, date: "1998-01-17", title: "Luizinho — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Luis Trochillo, o Luizinho, 'Pequeno Polegar', terceiro jogador com mais jogos na história do Corinthians, aos 67 anos." },

  // --- Rivellino (Roberto Rivellino) — 1965-1974 ---
  { id: 210, date: "1946-01-01", title: "Nasce Rivellino — Patada Atômica", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Roberto Rivellino nasceu em São Paulo. Um dos maiores jogadores da história do futebol brasileiro, foi camisa 10 do Corinthians de 1965 a 1974 e campeão mundial com a Seleção em 1970. Sua canhota ficou eternizada como 'Patada Atômica'." },

  // --- Basílio (João Roberto Basílio) — 1975-1981 ---
  { id: 211, date: "1949-02-04", title: "Nasce Basílio — Pé de Anjo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "João Roberto Basílio nasceu em São Paulo. Marcou o gol que tirou o Corinthians da 'fila' de 23 anos sem título, na final do Paulista de 1977 contra a Ponte Preta. Ficou conhecido como 'Pé de Anjo'." },

  // --- Zé Maria (José Maria Rodrigues Alves) — 1970-1983 ---
  { id: 212, date: "1949-05-18", title: "Nasce Zé Maria — Super Zé", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "José Maria Rodrigues Alves, o Zé Maria, nasceu em Botucatu. Considerado o maior lateral-direito da história do Corinthians, é o quinto jogador com mais jogos pelo clube. Conquistou 4 Campeonatos Paulistas." },

  // --- Sócrates (Sócrates Brasileiro Sampaio de Souza Vieira de Oliveira) — 1978-1984 ---
  { id: 213, date: "1954-02-19", title: "Nasce Sócrates — O Doutor", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Sócrates Brasileiro nasceu em Belém do Pará. Médico e meio-campista genial, é unanimidade no time de todos os tempos do Corinthians. Líder da Democracia Corinthiana e do movimento Diretas Já. Jogou de 1978 a 1984 com 297 jogos e 172 gols." },
  { id: 246, date: "2011-12-04", title: "Sócrates — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Sócrates Brasileiro, o Doutor, unanimidade no time de todos os tempos do Corinthians, aos 57 anos. Líder da Democracia Corinthiana e ícone da luta pela democracia no Brasil." },

  // --- Wladimir (Wladimir Rodrigues dos Santos) — 1972-1985 ---
  { id: 214, date: "1954-08-29", title: "Nasce Wladimir — recordista de jogos do Corinthians", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Wladimir Rodrigues dos Santos nasceu em São Paulo. O lateral-esquerdo detém o recorde absoluto de jogos pelo Corinthians com 806 partidas. Pilar da Democracia Corinthiana ao lado de Sócrates e Casagrande." },

  // --- Biro-Biro (Antônio José da Silva Filho) — 1978-1988 ---
  { id: 215, date: "1959-05-18", title: "Nasce Biro-Biro — coração do meio-campo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Antônio José da Silva Filho, o Biro-Biro, nasceu em Olinda. Volante raçudo, fez 590 jogos pelo Corinthians (6º maior) e é o volante que mais marcou pelo clube (75 gols). Participou da Democracia Corinthiana e foi campeão paulista em 1979, 1982, 1983 e 1988." },

  // --- Casagrande (Walter Casagrande Júnior) — 1980-1986, 1994-1995 ---
  { id: 216, date: "1963-04-15", title: "Nasce Casagrande — artilheiro da Democracia Corinthiana", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Walter Casagrande Júnior nasceu em São Paulo. Centroavante de 1,91m, foi revelado pelo Corinthians e formou dupla letal com Sócrates na Democracia Corinthiana. Campeão paulista em 1982 e 1983. Depois jogou no Porto, Ascoli e Torino." },

  // --- Neto (José Ferreira Neto) — 1989-1993, 1996-1997 ---
  { id: 217, date: "1966-09-09", title: "Nasce Neto — herói do 1º Brasileiro", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "José Ferreira Neto, o Craque Neto, nasceu em Santo Antônio de Posse. Principal jogador do Corinthians na conquista do primeiro título brasileiro em 1990, foi artilheiro e ídolo absoluto. Jogou 199 partidas e marcou 103 gols pelo clube." },

  // --- Freddy Rincón — 1997-2000 ---
  { id: 218, date: "1966-08-14", title: "Nasce Freddy Rincón — o maestro colombiano", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Freddy Eusébio Rincón Valencia nasceu em Buenaventura, Colômbia. Meio-campista genial, foi peça fundamental nos títulos brasileiros de 1998 e 1999 e no Mundial de Clubes 2000. Um dos maiores estrangeiros da história do Corinthians." },
  { id: 219, date: "2022-04-13", title: "Freddy Rincón — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Freddy Rincón, o maestro colombiano do Corinthians, aos 55 anos, vítima de acidente automobilístico em Cáli." },

  // --- Ronaldo Giovanelli — 1987-1997 ---
  { id: 220, date: "1967-11-20", title: "Nasce Ronaldo Giovanelli — o goleiro raçudo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Ronaldo Soares Giovanelli nasceu em São Paulo. Goleiro de personalidade forte, atuou por 10 anos consecutivos no Corinthians (1987-1997). É o segundo goleiro com mais jogos pelo clube e o quarto jogador geral." },

  // --- Edilson (Edílson da Silva Ferreira) — 1998-2001 ---
  { id: 221, date: "1970-09-17", title: "Nasce Edilson — Capetinha", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Edílson da Silva Ferreira, o Capetinha, nasceu em Salvador. Atacante habilidoso e irreverente, foi peça-chave nos títulos do Corinthians em 1998, 1999 e no Mundial 2000. Também foi campeão mundial com a Seleção em 2002." },

  // --- Marcelinho Carioca (Marcelo Pereira Surcin) — 1994-2001, 2006 ---
  { id: 222, date: "1971-01-01", title: "Nasce Marcelinho Carioca — Pé de Anjo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Marcelo Pereira Surcin, o Marcelinho Carioca, nasceu no Rio de Janeiro. Maior cobrador de faltas da história do futebol (78 gols), é ídolo absoluto do Corinthians com mais de 200 gols pelo clube. Decisivo nos títulos de 1995, 1997, 1998, 1999 e 2001." },

  // --- Roberto Carlos — 2010-2011 ---
  { id: 223, date: "1973-04-10", title: "Nasce Roberto Carlos — o lateral mais ofensivo da história", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Roberto Carlos da Silva Rocha nasceu em Garça, SP. Considerado o maior lateral-esquerdo da história, jogou pelo Corinthians em 2010-2011 após longa carreira no Real Madrid. Campeão mundial com a Seleção em 2002." },

  // --- Dida (Nelson de Jesus da Silva) — 1994-1999 ---
  { id: 224, date: "1973-10-07", title: "Nasce Dida — o Paredão", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Nelson de Jesus da Silva, o Dida, nasceu em Irará, Bahia. Goleiro lendário, foi decisivo no Mundial de Clubes 2000 ao defender o pênalti na final contra o Vasco. Campeão brasileiro em 1998 e 1999. Também foi campeão mundial com a Seleção em 2002." },

  // --- Vampeta (Marcos André Batista Santos) — 1998-2000, 2002-2003, 2007 ---
  { id: 225, date: "1974-03-13", title: "Nasce Vampeta — o volante campeão", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Marcos André Batista Santos, o Vampeta, nasceu em Nazaré, Bahia. Volante carismático, foi peça fundamental nos títulos brasileiros de 1998 e 1999, no Paulista de 1999 e no Mundial 2000. Também foi campeão mundial com a Seleção em 2002." },

  // --- Luizão (Luiz Carlos Bombonato Goulart) — 1999-2002 ---
  { id: 226, date: "1975-11-14", title: "Nasce Luizão — o matador", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Luiz Carlos Bombonato Goulart, o Luizão, nasceu em Rubinéia, SP. Artilheiro devastador, foi decisivo no Brasileiro de 1999 e no Mundial 2000. Artilheiro da Libertadores de 2000 com 15 gols e marcou 4 gols em sua estreia no Brasileirão contra o Gama." },

  // --- Ricardinho (Ricardo Luis Pozzi Rodrigues) — 1998-2002, 2006 ---
  { id: 227, date: "1976-05-23", title: "Nasce Ricardinho — o meia campeão do mundo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Ricardo Luis Pozzi Rodrigues, o Ricardinho, nasceu em São Paulo. Meio-campista habilidoso, foi destaque nos títulos brasileiros de 1998, 1999 e no Mundial 2000 do Corinthians. Também foi campeão mundial com a Seleção em 2002." },

  // --- Ronaldo (Ronaldo Luís Nazário de Lima) — 2009-2011 ---
  { id: 228, date: "1976-09-18", title: "Nasce Ronaldo — o Fenômeno", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Ronaldo Luís Nazário de Lima nasceu em Itaguaí, RJ. O Fenômeno, três vezes melhor do mundo pela FIFA, jogou no Corinthians de 2009 a 2011. Marcou na final da Copa do Brasil 2009 e foi decisivo no título paulista de 2009." },

  // --- Emerson Sheik (Marcio Passos de Albuquerque) — 2011-2015, 2015-2016 ---
  { id: 229, date: "1978-09-06", title: "Nasce Emerson Sheik — herói da Libertadores", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Márcio Passos de Albuquerque, o Emerson Sheik, nasceu em Nova Iguaçu, RJ. Artilheiro e herói das finais da Libertadores 2012, marcando os dois gols na vitória sobre o Boca Juniors na Bombonera. Ídolo incontestável da Fiel." },

  // --- Adriano (Adriano Leite Ribeiro) — 2011-2012 ---
  { id: 230, date: "1982-02-17", title: "Nasce Adriano — o Imperador", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Adriano Leite Ribeiro, o Imperador, nasceu no Rio de Janeiro. Considerado um dos maiores atacantes de sua geração, jogou no Corinthians em 2011-2012 após brilhar na Inter de Milão." },

  // --- Jadson (Jadson Rodrigues da Silva) — 2014-2015, 2017-2020 ---
  { id: 231, date: "1983-10-05", title: "Nasce Jadson — o camisa 10 do hepta", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Jadson Rodrigues da Silva nasceu em Londrina, PR. Meia habilidoso, foi destaque nos títulos brasileiros de 2015 e 2017 pelo Corinthians. Líder de assistências do Brasileirão 2017 e eleito melhor meia da competição." },

  // --- Javier Mascherano — 2005-2006 ---
  { id: 232, date: "1984-06-08", title: "Nasce Mascherano — o futuro capitão da Argentina", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Javier Alejandro Mascherano nasceu em San Lorenzo, Argentina. Volante de classe mundial, jogou no Corinthians em 2005-2006 antes de brilhar no Liverpool e Barcelona. Capitão da Seleção Argentina por muitos anos." },

  // --- Paolo Guerrero — 2012-2015 ---
  { id: 233, date: "1984-01-01", title: "Nasce Paolo Guerrero — o herói do bi mundial", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "José Paolo Guerrero González nasceu em Lima, Peru. O 'Depredador' marcou o gol da vitória contra o Chelsea na final do Mundial de Clubes 2012, sagrando o Corinthians bicampeão mundial. Ídolo absoluto." },

  // --- Carlos Tevez — 2005-2006 ---
  { id: 234, date: "1984-02-05", title: "Nasce Carlos Tevez — o Apache", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Carlos Alberto Tevez nasceu em Buenos Aires, Argentina. Atacante explosivo, foi artilheiro do Brasileirão 2005 com 20 gols e peça fundamental no título brasileiro do Corinthians. Ganhou o prêmio de Bola de Ouro do futebol brasileiro." },

  // --- Jô (João Alves de Assis Silva) — 2003-2005, 2017-2021 ---
  { id: 235, date: "1987-03-20", title: "Nasce Jô — o Rei dos Clássicos", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "João Alves de Assis Silva, o Jô, nasceu em São Paulo. Revelado pelo Corinthians aos 16 anos, retornou em 2017 e ficou conhecido como 'Rei dos Clássicos' por marcar gols decisivos contra todos os rivais. Herói do título brasileiro de 2017." },

  // --- Cássio (Cássio Roberto Ramos) — 2012-2024 ---
  { id: 236, date: "1987-06-06", title: "Nasce Cássio — o Gigante", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Cássio Roberto Ramos nasceu em Veranópolis, RS. O 'Gigante' é o goleiro mais vitorioso da história do Corinthians, com defesas lendárias na Libertadores 2012. Jogou de 2012 a 2024, sendo ídolo incontestável da Fiel Torcida." },

  // --- Gil (Carlos Gilberto Nascimento Silva) — 2013-2016, 2019-2023 ---
  { id: 237, date: "1987-06-12", title: "Nasce Gil — a muralha alvinegra", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Carlos Gilberto Nascimento Silva, o Gil, nasceu em Campos dos Goytacazes, RJ. Zagueiro sólido e confiável, jogou pelo Corinthians de 2013 a 2016 e de 2019 a 2023, sendo peça fundamental na defesa em diversas campanhas vitoriosas." },

  // --- Renato Augusto (Renato Soares de Oliveira Augusto) — 2013-2015, 2021-2023 ---
  { id: 238, date: "1988-02-08", title: "Nasce Renato Augusto — classe e liderança", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Renato Soares de Oliveira Augusto nasceu no Rio de Janeiro. Meia elegante, foi Bola de Ouro do Brasileirão 2015 e liderou o Corinthians ao hexacampeonato. Medalhista de ouro olímpico em 2016 com a Seleção Brasileira." },

  // --- Paulinho (José Paulo Bezerra Maciel Júnior) — 2010-2013, 2022-2024 ---
  { id: 239, date: "1988-07-25", title: "Nasce Paulinho — o volante da Libertadores", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "José Paulo Bezerra Maciel Júnior, o Paulinho, nasceu em São Paulo. Volante dinâmico, foi fundamental no título brasileiro de 2011 e na conquista da Libertadores 2012, marcando gols decisivos. Depois brilhou no Tottenham e Barcelona." },

  // --- Willian (Willian Borges da Silva) — 2006-2007, 2021-2022 ---
  { id: 240, date: "1988-08-09", title: "Nasce Willian — talento da base corinthiana", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Willian Borges da Silva nasceu em Ribeirão Pires, SP. Revelado pelo Corinthians, brilhou no Shakhtar Donetsk e Chelsea antes de retornar ao clube em 2021. Campeão da Copa América 2019 com a Seleção Brasileira." },

  // --- Fagner (Fagner Conserva Lemos) — 2006-2007, 2014-2024 ---
  { id: 241, date: "1989-06-11", title: "Nasce Fagner — fidelidade alvinegra", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Fagner Conserva Lemos nasceu em São Paulo. Lateral-direito raçudo e fiel, é cria da base corinthiana. Jogou pelo Corinthians de 2014 a 2024 em sua segunda passagem, sendo um dos jogadores com mais jogos na história do clube." },

  // --- Memphis Depay — 2024- ---
  { id: 242, date: "1994-02-13", title: "Nasce Memphis Depay — o holandês do Corinthians", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Memphis Depay nasceu em Moordrecht, Holanda. Maior artilheiro da história da Seleção Holandesa, chegou ao Corinthians em 2024 após passagens por PSV, Manchester United, Lyon, Barcelona e Atlético de Madrid. Camisa 10 do Timão." },

  // --- Róger Guedes — 2021-2023 ---
  { id: 243, date: "1996-10-02", title: "Nasce Róger Guedes — gols decisivos", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Róger Krug Guedes nasceu em Ibirubá, RS. Atacante decisivo, marcou gols importantes pelo Corinthians entre 2021 e 2023, incluindo gols em clássicos contra o Palmeiras. Usou a camisa 123 em homenagem ao aniversário do filho." },

  // --- Pedrinho (Pedro Victor Delmino da Silva) — 2017-2020 ---
  { id: 244, date: "1998-04-13", title: "Nasce Pedrinho — joia da base", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Pedro Victor Delmino da Silva, o Pedrinho, nasceu em Maceió, AL. Revelado pela base do Corinthians, foi eleito melhor jogador da Copinha 2017 e se destacou como meia habilidoso antes de se transferir para o Benfica." },

  // --- Yuri Alberto — 2022- ---
  { id: 245, date: "2001-03-18", title: "Nasce Yuri Alberto — o artilheiro atual", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Yuri Alberto Monteiro da Silva nasceu em São José dos Campos, SP. Atacante e atual camisa 9 do Corinthians, chegou em 2022 e se tornou referência do ataque corinthiano com gols importantes em clássicos e competições." },

  // ===== EXPANSÃO: JOGADORES HISTÓRICOS E ELENCO ATUAL =====

  // --- Olavo (Olavo Martins de Oliveira) — 1952-1961 ---
  { id: 300, date: "1927-11-09", title: "Nasce Olavo — pilar da defesa dos anos 50", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Olavo Martins de Oliveira nasceu em Santos. Zagueiro titular nos anos 50, disputou 508 jogos pelo Corinthians, sendo o 10º jogador com mais partidas na história do clube. Campeão paulista em 1953 e 1954." },
  { id: 301, date: "2004-03-12", title: "Olavo — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Olavo Martins de Oliveira, zagueiro que disputou 508 jogos pelo Corinthians, aos 76 anos." },

  // --- Idário (Idário Sanches Peinado) — 1949-1959 ---
  { id: 302, date: "1927-05-09", title: "Nasce Idário — Sangue Azul", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Idário Sanches Peinado nasceu em São Paulo. Lateral-direito raçudo apelidado de 'Sangue Azul', revelado na base corinthiana. Disputou 472 jogos pelo Timão, sendo o 12º com mais partidas. Campeão do IV Centenário em 1954." },
  { id: 303, date: "2009-09-18", title: "Idário — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Idário Sanches Peinado, 'Sangue Azul', lateral icônico que disputou 472 jogos pelo Corinthians, aos 82 anos." },

  // --- Servílio (Servílio de Jesus) — 1938-1949 ---
  { id: 304, date: "1915-12-15", title: "Nasce Servílio — O Bailarino", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Servílio de Jesus nasceu em São Félix, BA. Apelidado de 'O Bailarino' pela elegância de seu jogo, disputou 364 jogos e marcou 200 gols pelo Corinthians entre 1938 e 1949." },
  { id: 305, date: "1984-04-10", title: "Servílio — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Servílio de Jesus, 'O Bailarino', que marcou 200 gols em 364 jogos pelo Corinthians, aos 68 anos." },

  // --- Oreco (Valdemar Rodrigues Martins) — 1949-1964 ---
  { id: 306, date: "1932-06-13", title: "Nasce Oreco — defensor incansável", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Valdemar Rodrigues Martins, o Oreco, nasceu em Santa Maria, RS. Zagueiro e lateral-esquerdo, disputou 409 jogos pelo Corinthians entre 1949 e 1964. Convocado 7 vezes pela Seleção Brasileira." },
  { id: 307, date: "1985-04-03", title: "Oreco — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Valdemar Rodrigues Martins, o Oreco, que disputou 409 jogos pelo Corinthians, aos 52 anos, durante uma partida de veteranos." },

  // --- Gilmar (Gylmar dos Santos Neves) — 1951-1961 ---
  { id: 308, date: "1930-08-22", title: "Nasce Gilmar — o goleiro bicampeão do mundo", category: "idolo", type: "aniversario", playerStatus: "falecido", description: "Gylmar dos Santos Neves nasceu em Santos. Goleiro titular da Seleção Brasileira nas Copas de 1958 e 1962, iniciou sua carreira no Corinthians onde disputou 397 jogos de 1951 a 1961. Um dos maiores goleiros da história do futebol." },
  { id: 309, date: "2013-08-25", title: "Gilmar — In Memoriam", category: "idolo", type: "falecimento", description: "Falecimento de Gylmar dos Santos Neves, goleiro bicampeão mundial pela Seleção Brasileira e ídolo do Corinthians, aos 83 anos." },

  // --- Vaguinho (Wagno de Freitas) — 1971-1981 ---
  { id: 310, date: "1950-02-11", title: "Nasce Vaguinho — herói do Paulista de 1977", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Wagno de Freitas, o Vaguinho, nasceu em Sete Lagoas, MG. Ponta-direita que disputou 551 jogos e marcou 110 gols pelo Corinthians entre 1971 e 1981. Peça-chave no título paulista de 1977 que encerrou 23 anos de jejum." },

  // --- Tião (Sebastião Carlos Silva) — 1968-1977 ---
  { id: 311, date: "1948-03-08", title: "Nasce Tião Corinthians — escudeiro de Rivellino", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Sebastião Carlos Silva, o Tião, nasceu em Santa Leopoldina, ES. Volante que formou dupla icônica com Rivellino no meio-campo corinthiano. Disputou 367 jogos pelo Timão entre 1968 e 1977." },

  // --- Wilson Mano — 1986-1992, 1994 ---
  { id: 312, date: "1964-05-23", title: "Nasce Wilson Mano — o coringa alvinegro", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Wilson Carlos Mano nasceu em Auriflama, SP. Jogador polivalente que atuou como volante, lateral, zagueiro e meia, disputou 405 jogos pelo Corinthians. Campeão paulista em 1988 e brasileiro em 1990." },

  // --- Viola (Paulo Sérgio Rosa) — 1988-1995 ---
  { id: 313, date: "1969-01-01", title: "Nasce Viola — o gol do título em 1988", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Paulo Sérgio Rosa, o Viola, nasceu em São Paulo. Atacante que marcou o gol decisivo do título paulista de 1988 contra o Guarani. Campeão do mundo pela Seleção Brasileira em 1994. Disputou 144 jogos e marcou 49 gols pelo Timão." },

  // --- Ralf (Ralf de Souza Teles) — 2010-2015, 2018-2020 ---
  { id: 314, date: "1984-06-09", title: "Nasce Ralf — o Pitbull do meio-campo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Ralf de Souza Teles nasceu em São Paulo. Volante apelidado de 'Pitbull' por seus desarmes precisos, disputou 437 jogos pelo Corinthians. Peça fundamental nos títulos do Brasileiro 2011, Libertadores 2012 e Mundial 2012." },

  // --- Fábio Santos (Fábio Santos Romeu) — 2011-2015, 2020-2023 ---
  { id: 315, date: "1985-09-16", title: "Nasce Fábio Santos — lateral multicampeão", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Fábio Santos Romeu nasceu em São Paulo. Lateral-esquerdo que disputou 374 jogos pelo Corinthians em duas passagens. Campeão do Brasileiro 2011, Libertadores 2012, Mundial 2012 e Paulista 2013." },

  // --- Chicão (Anderson Sebastião Cardoso) — 2008-2013 ---
  { id: 316, date: "1981-06-03", title: "Nasce Chicão — zagueiro da reconstrução", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Anderson Sebastião Cardoso, o Chicão, nasceu em Mogi Guaçu, SP. Zagueiro que foi pilar da reconstrução corinthiana desde a Série B em 2008. Campeão do Brasileiro 2011, Libertadores 2012 e Mundial 2012." },

  // --- Alessandro (Alessandro Mori Nunes) — 2008-2013 ---
  { id: 317, date: "1979-01-10", title: "Nasce Alessandro — o Capitão América", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Alessandro Mori Nunes nasceu em Assis Chateaubriand, PR. Lateral-direito apelidado de 'Capitão América' pela raça e liderança. Capitão do Corinthians na conquista da Libertadores 2012 e Mundial 2012." },

  // --- Danilo (Danilo Gabriel de Andrade) — 2010-2018 ---
  { id: 318, date: "1979-06-11", title: "Nasce Danilo — Zidanilo, gênio da Libertadores", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Danilo Gabriel de Andrade nasceu em São Gotardo, MG. Meia elegante apelidado de 'Zidanilo', disputou 359 jogos pelo Corinthians. Marcou gols decisivos na Libertadores 2012 e foi fundamental no título brasileiro de 2011." },

  // --- Jorge Henrique — 2009-2013 ---
  { id: 319, date: "1982-04-23", title: "Nasce Jorge Henrique — o Robozinho da Fiel", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Jorge Henrique de Souza nasceu em Resende, RJ. Atacante versátil apelidado de 'Robozinho', foi titular na final da Libertadores 2012 e no Mundial contra o Chelsea. Disputou 216 jogos pelo Corinthians." },

  // --- Liedson — 2003, 2011-2012 ---
  { id: 320, date: "1977-12-17", title: "Nasce Liedson — do Timão ao Sporting", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Liedson da Silva Muniz nasceu em Cairu, BA. Atacante que brilhou no Paulista 2003 pelo Corinthians antes de se consagrar no Sporting de Portugal. Retornou ao Timão em 2011 e participou da campanha do Brasileiro daquele ano." },

  // --- Alexandre Pato — 2013-2016 ---
  { id: 321, date: "1989-09-02", title: "Nasce Alexandre Pato — o menino de ouro", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Alexandre Rodrigues da Silva, o Pato, nasceu em Pato Branco, PR. Atacante prodígio que brilhou no Milan, assinou com o Corinthians em 2013 por 15 milhões de euros. Campeão paulista em 2013 pelo Timão." },

  // --- Dentinho (Bruno Ferreira Bonfim) — 2007-2011 ---
  { id: 322, date: "1989-01-19", title: "Nasce Dentinho — revelação da base", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Bruno Ferreira Bonfim, o Dentinho, nasceu em São Paulo. Atacante revelado pela base do Corinthians, foi destaque na conquista da Série B 2008 ao lado de Ronaldo. Artilheiro do time na temporada." },

  // --- Vágner Love — 2015-2016, 2019-2020 ---
  { id: 323, date: "1984-06-11", title: "Nasce Vágner Love — o Artilheiro do Amor", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Vágner Silva de Souza nasceu no Rio de Janeiro. Atacante decisivo que foi artilheiro do Brasileiro 2015 pelo Corinthians. Marcou o gol do título paulista de 2019 contra o São Paulo. 29 gols em 121 jogos pelo Timão." },

  // --- Danilo Avelar — 2018-2022 ---
  { id: 324, date: "1989-06-09", title: "Nasce Danilo Avelar — polivalente defensor", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Danilo Fernando Avelar nasceu em Paranavaí, PR. Lateral-esquerdo e zagueiro versátil, marcou gols decisivos em clássicos contra Palmeiras e São Paulo. Campeão paulista em 2019 pelo Corinthians." },

  // --- Ángel Romero — 2014-2019, 2023-2025 ---
  { id: 325, date: "1992-07-04", title: "Nasce Ángel Romero — o paraguaio corintiano", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Ángel Rodrigo Romero Villamayor nasceu em Fernando de la Mora, Paraguai. Atacante que disputou 377 jogos pelo Corinthians em duas passagens. Campeão brasileiro em 2015 e 2017, além de três paulistas." },

  // ===== ELENCO ATUAL 2026 =====

  // --- Hugo Souza — 2024- ---
  { id: 326, date: "1999-01-31", title: "Nasce Hugo Souza — o novo paredão", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Hugo de Souza Nogueira nasceu em Duque de Caxias, RJ. Goleiro titular do Corinthians desde 2024, chegou emprestado do Flamengo e rapidamente se consolidou como um dos melhores goleiros do Brasil." },

  // --- Rodrigo Garro — 2024- ---
  { id: 327, date: "1998-01-04", title: "Nasce Rodrigo Garro — o Mago argentino", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Rodrigo Garro nasceu em General Pico, Argentina. Meia ofensivo que chegou ao Corinthians em 2024 e foi eleito melhor jogador do Brasileirão com 10 gols e 10 assistências. Camisa 8 do Timão." },

  // --- Matheus Pereira — 2026- ---
  { id: 328, date: "1998-02-25", title: "Nasce Matheus Pereira — meia criativo", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Matheus Pereira da Silva nasceu em São Paulo. Meia central habilidoso, chegou ao Corinthians em 2026 emprestado pelo Fortaleza para reforçar o meio-campo alvinegro." },

  // --- Jesse Lingard — 2026- ---
  { id: 329, date: "1992-12-15", title: "Nasce Jesse Lingard — Lingardinho", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Jesse Ellis Lingard nasceu em Warrington, Inglaterra. Meia-atacante formado no Manchester United, campeão da Europa League e da FA Cup. Chegou ao Corinthians em 2026 após passagem pelo FC Seoul." },

  // --- Breno Bidon — 2023- ---
  { id: 330, date: "2005-02-20", title: "Nasce Breno Bidon — joia do futuro", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Breno de Souza Bidon nasceu em São Paulo. Volante revelado pela base do Corinthians, promovido ao profissional em 2023. Uma das maiores promessas da base corinthiana." },

  // --- Gabriel Paulista — 2026- ---
  { id: 331, date: "1990-11-26", title: "Nasce Gabriel Paulista — zagueiro corintiano de coração", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Gabriel Armando de Abreu nasceu em São Paulo. Zagueiro com passagens por Arsenal e Valencia, escolheu o Corinthians em 2026 por ser corintiano desde criança, em homenagem ao irmão falecido." },

  // --- André Ramalho — 2024- ---
  { id: 332, date: "1992-02-16", title: "Nasce André Ramalho — experiência europeia", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "André Ramalho Silva nasceu em Ibiúna, SP. Zagueiro com longa carreira na Europa (Red Bull Salzburg, PSV), chegou ao Corinthians em 2024 trazendo experiência e liderança para a defesa." },

  // --- Matheuzinho — 2024- ---
  { id: 333, date: "2000-09-08", title: "Nasce Matheuzinho — lateral campeão", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Matheus França Silva nasceu em Londrina, PR. Lateral-direito campeão da Libertadores pelo Flamengo, chegou ao Corinthians em 2024. Eleito melhor lateral-direito do Paulista 2025." },

  // --- Matheus Bidu — 2023- ---
  { id: 334, date: "1999-05-04", title: "Nasce Matheus Bidu — velocidade pela esquerda", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Matheus Lima Beltrão Oliveira, o Matheus Bidu, nasceu em São Paulo. Lateral-esquerdo veloz que chegou ao Corinthians em 2023. Campeão paulista em 2025." },

  // --- Raniele — 2024- ---
  { id: 335, date: "1996-12-31", title: "Nasce Raniele — volante aguerrido", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Raniele Almeida Melo nasceu em Baixa Grande, BA. Volante que chegou ao Corinthians em 2024 após se destacar no Cruzeiro. Campeão paulista em 2025." },

  // --- Gustavo Henrique — 2024- ---
  { id: 336, date: "1993-03-24", title: "Nasce Gustavo Henrique — zagueiro experiente", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Gustavo Henrique Vernes nasceu em São Paulo. Zagueiro de 1,94m formado no Santos, com passagens por Flamengo e Valladolid. Chegou ao Corinthians em 2024 como reforço para a defesa." },

  // --- José Martínez — 2024- ---
  { id: 337, date: "1994-08-07", title: "Nasce José Martínez — garra venezuelana", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "José Andrés Martínez Torres nasceu em Maracaibo, Venezuela. Volante internacional pela Venezuela, chegou ao Corinthians em 2024 vindo do Philadelphia Union da MLS." },

  // --- Pedro Raul — 2024- ---
  { id: 338, date: "1996-11-05", title: "Nasce Pedro Raul — centroavante de área", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Pedro Raul Garay da Silva nasceu em Porto Alegre, RS. Centroavante de 1,93m que chegou ao Corinthians em 2024. Campeão paulista em 2025 pelo Timão." },

  // --- Gui Negão — base ---
  { id: 339, date: "2007-02-06", title: "Nasce Gui Negão — promessa da base", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Guilherme William Silva Inácio, o Gui Negão, nasceu em 2007. Atacante revelado pela base do Corinthians, é uma das maiores promessas da nova geração do futebol brasileiro." },

  // --- Cacá (Carlos de Menezes Júnior) — 2024-2025 ---
  { id: 340, date: "1999-04-25", title: "Nasce Cacá — zagueiro artilheiro", category: "idolo", type: "aniversario", playerStatus: "vivo", description: "Carlos de Menezes Júnior, o Cacá, nasceu em Visconde do Rio Branco, MG. Zagueiro que se destacou no Corinthians em 2024 com gols importantes, incluindo contra o Fluminense." },
];
