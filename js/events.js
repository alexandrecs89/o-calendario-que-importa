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
  { id: 32, date: "1990-12-16", title: "Campeonato Brasileiro 1990", category: "titulo", description: "Primeiro título brasileiro oficial do Corinthians! Campanha emocionante sob o comando de Neto, Tupãzinho e cia." },
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
  { id: 42, date: "2012-07-04", title: "Copa Libertadores da América 2012", category: "titulo", description: "O MAIOR TÍTULO DA HISTÓRIA! Corinthians conquista a Libertadores pela primeira vez, vencendo o Boca Juniors na final com gols de Emerson Sheik. Cássio faz defesas históricas. Vai, Corinthians!" },

  // ===== MUNDIAIS =====
  { id: 43, date: "2000-01-14", title: "Mundial de Clubes FIFA 2000", category: "titulo", description: "Corinthians é o primeiro campeão mundial de clubes da FIFA! Venceu o Vasco na final nos pênaltis, com Dida pegando a cobrança decisiva. Rincón, Marcelinho e Edilson brilharam." },
  { id: 44, date: "2012-12-16", title: "Mundial de Clubes FIFA 2012", category: "titulo", description: "BICAMPEÃO MUNDIAL! Corinthians vence o Chelsea na final com gol de Guerrero. Time inesquecível de Cássio, Chicão, Ralf, Paulinho, Emerson Sheik e cia." },

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
  { id: 58, date: "2012-06-27", title: "Corinthians 2 x 0 Boca Juniors — Final Libertadores (ida)", category: "classico", description: "Emerson Sheik marca os dois gols na vitória sobre o Boca Juniors na Bombonera." },
  { id: 59, date: "2012-07-04", title: "Corinthians 2 x 0 Boca Juniors — Final Libertadores (volta)", category: "classico", description: "No Pacaembu, Emerson Sheik marca novamente e o Corinthians conquista a primeira Libertadores. Cássio faz defesas milagrosas." },
  { id: 60, date: "2012-12-16", title: "Corinthians 1 x 0 Chelsea — Final Mundial de Clubes", category: "classico", description: "Guerrero marca de cabeça e o Corinthians vence o Chelsea, campeão da Champions League, para se sagrar bicampeão mundial!" },
  { id: 61, date: "2020-02-22", title: "Corinthians 2 x 1 Palmeiras — Derby na Arena", category: "classico", description: "Vitória emocionante no Derby com gol nos acréscimos." },
  { id: 62, date: "2018-09-10", title: "Corinthians 2 x 1 São Paulo — Majestoso histórico", category: "classico", description: "Vitória corinthiana no Majestoso com grande atuação coletiva." },

  // ===== MARCOS HISTÓRICOS =====
  { id: 70, date: "1910-09-01", title: "Fundação do Corinthians", category: "marco", description: "O Sport Club Corinthians Paulista foi fundado no Bom Retiro por operários e trabalhadores." },
  { id: 71, date: "1933-01-01", title: "Corinthians se profissionaliza", category: "marco", description: "O Corinthians adere ao futebol profissional, um dos primeiros clubes do Brasil a dar o passo." },
  { id: 72, date: "1982-03-01", title: "Início da Democracia Corinthiana", category: "marco", description: "Movimento político-social dentro do clube onde jogadores, funcionários e dirigentes tinham poder de voto igualitário. Liderado por Sócrates, Wladimir e Casagrande, foi um marco na história do futebol brasileiro e da luta pela democracia no país." },
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
];
