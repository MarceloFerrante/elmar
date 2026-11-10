// El mar y la escalera · Bitácoras del Brejo Paraibano — conteúdo do site.
// Tudo o que é texto, ficha, foto ou ordem fica aqui, separado da interface
// (briefing de 07/11/2026, "Manutenção"). Para trocar uma foto ou um texto,
// mude só este arquivo. Imagens: caminho dentro de img/, sem ".webp".
//
// Origem dos textos: texto curatorial e textos das obras vêm dos PDFs em
// referencias/ (o espanhol é o original). Português e inglês são traduções.
// Títulos e instruções dos 16 exercícios são PROVISÓRIOS (briefing, pág. 10).

// ---------- interface ----------
const TEXTOS = {
  pt: {
    lingua: 'Português',
    menu: 'abrir menu', fechar: 'fechar menu', voltar: 'voltar', inicio: 'início', inicioMenu: 'Início', paginaInicial: 'Página inicial', creditosSite: 'Créditos do site',
    titulo1: 'El mar', titulo2: 'y la escalera', sub: 'Bitácoras del Brejo Paraibano',
    exposicao: 'A exposição', diarios: 'Diários de viagem', ciberpoesia: 'Ciberpoesias interativas', ciberCurto: 'Ciberpoesia',
    degrauExpo: 'curadoria, obras e construção da mostra',
    degrauDiarios: 'praia, mangue e brejo',
    degrauCiber: 'dezesseis retalhos, dezesseis gestos de esquecimento',
    sobe: 'suba a escada',
    curatorial: 'Texto curatorial', por: 'por Maycon Albuquerque',
    fichaMostra: 'Ficha da mostra',
    navegue: 'Navegue pela exposição',
    obras: 'Obras', construcao: 'Processos', construcaoSub: 'registro dos processos',
    obrasSub: 'quatro obras, fichas e textos da artista',
    lerSobre: 'Ler sobre a obra', fecharTexto: 'Fechar texto',
    lerCompleto: 'Ler texto completo', fecharCompleto: 'Recolher texto', fichaCat: 'Ficha catalográfica', sobreObra: 'Sobre a obra', lerMais: 'Ler mais', verObraDet: 'ver detalhes da obra', sobreSub: 'artista e curador',
    ano: 'ano', tecnica: 'técnica', materiais: 'materiais', dimensoes: 'dimensões', credito: 'fotos',
    obraAnterior: 'obra anterior', obraProxima: 'próxima obra', outrasObras: 'outras obras',
    fotoAnterior: 'foto anterior', fotoProxima: 'próxima foto',
    construcaoTexto: 'Registro dos processos.',
    diariosLema: 'cadernos de campo entre o litoral, o mangue e o planalto',
    diariosIntro: 'Três territórios, um mesmo percurso. Do nível do mar à serra: a escada imita a subida da Borborema.',
    imagens: (n) => `${n} imagens`, deslize: 'deslize para percorrer o diário',
    diarioDe: 'diário', posicao: (a, b) => `${a} / ${b}`,
    ciberLema: 'Exercícios para apagar, deslocar e transformar memórias.',
    ciberIntro: 'As imagens dos diários foram picotadas em retângulos. No verso de cada retalho há um exercício de esquecimento. Role, deixe os fragmentos se sobreporem e toque no que chamar sua atenção.',
    escolha: 'escolha um fragmento', toqueFragmento: 'toque em um fragmento para iniciar o exercício',
    fragmento: 'fragmento', exercicio: 'exercício', fazer: 'fazer o exercício', virar: 'virar de volta',
    reiniciar: 'recomeçar', voltarArquivo: 'voltar aos fragmentos',
    exAnterior: 'exercício anterior', fragAnterior: 'fragmento anterior', fragProximo: 'próximo fragmento', exProximo: 'próximo exercício',
    feito: 'esquecido.',
    privacidade: 'o que você escreve aqui fica só neste aparelho e some ao sair.',
    familias: { desenho: 'desenhar', calculo: 'calcular', apagamento: 'pressionar', sobreposicao: 'arrastar', conexao: 'conectar', dispersao: 'deslizar', costura: 'alinhar' },
    sobre: 'Sobre', creditos: 'Créditos', conceito: 'Conceito das obras',
    sobreArtista: 'Sobre a artista', maisArtista: 'Mais sobre a artista e o curador', sobreCurador: 'Sobre o curador', siteArtista: 'site da artista', sobreObras: 'Sobre as obras, nas palavras da artista', curriculo: 'Currículo', atual: 'atual',
    rodape: 'apoio e colaboração', apoio: 'Apoio', colaboracao: 'Colaboração',
    saibaMais: 'Saiba mais sobre a obra',
    ciberSaiba: 'Na exposição, Exercício de esquecimento é uma instalação de varas, sisal e papéis: na frente de cada papel há um pedaço das fotocolagens dos diários; no verso, um exercício para fazer na rua, na paisagem da cidade. A versão física é só de quem visita a mostra. Aqui, a mesma obra ganha outra vida: os exercícios acontecem dentro da tela.',
    verObra: 'ver a obra na exposição',
    reduzMov: 'menos movimento',
  },
  es: {
    lingua: 'Español',
    menu: 'abrir menú', fechar: 'cerrar menú', voltar: 'volver', inicio: 'inicio', inicioMenu: 'Inicio', paginaInicial: 'Inicio', creditosSite: 'Créditos del sitio',
    titulo1: 'El mar', titulo2: 'y la escalera', sub: 'Bitácoras del Brejo Paraibano',
    exposicao: 'La exposición', diarios: 'Diarios de viaje', ciberpoesia: 'Ciberpoesías interactivas', ciberCurto: 'Ciberpoesía',
    degrauExpo: 'curaduría, obras y construcción de la muestra',
    degrauDiarios: 'playa, manglar y brejo',
    degrauCiber: 'dieciséis retazos, dieciséis gestos de olvido',
    sobe: 'sube la escalera',
    curatorial: 'Texto curatorial', por: 'por Maycon Albuquerque',
    fichaMostra: 'Ficha de la muestra',
    navegue: 'Recorre la exposición',
    obras: 'Obras', construcao: 'Procesos', construcaoSub: 'registro de los procesos',
    obrasSub: 'cuatro obras, fichas y textos de la artista',
    lerSobre: 'Leer sobre la obra', fecharTexto: 'Cerrar texto',
    lerCompleto: 'Leer texto completo', fecharCompleto: 'Recoger texto', fichaCat: 'Ficha catalográfica', sobreObra: 'Sobre la obra', lerMais: 'Leer más', verObraDet: 'ver detalles de la obra', sobreSub: 'artista y curador',
    ano: 'año', tecnica: 'técnica', materiais: 'materiales', dimensoes: 'dimensiones', credito: 'fotos',
    obraAnterior: 'obra anterior', obraProxima: 'obra siguiente', outrasObras: 'otras obras',
    fotoAnterior: 'foto anterior', fotoProxima: 'foto siguiente',
    construcaoTexto: 'Registro de los procesos.',
    diariosLema: 'cuadernos de campo entre el litoral, el manglar y la meseta',
    diariosIntro: 'Tres territorios, un mismo recorrido. Del nivel del mar a la sierra: la escalera imita la subida de la Borborema.',
    imagens: (n) => `${n} imágenes`, deslize: 'desliza para recorrer el diario',
    diarioDe: 'diario', posicao: (a, b) => `${a} / ${b}`,
    ciberLema: 'Ejercicios para borrar, desplazar y transformar recuerdos.',
    ciberIntro: 'Las imágenes de los diarios fueron recortadas en rectángulos. En el reverso de cada retazo hay un ejercicio de olvido. Desplázate, deja que los fragmentos se superpongan y toca el que te llame la atención.',
    escolha: 'elige un fragmento', toqueFragmento: 'toca un fragmento para iniciar el ejercicio',
    fragmento: 'fragmento', exercicio: 'ejercicio', fazer: 'hacer el ejercicio', virar: 'dar la vuelta',
    reiniciar: 'recomenzar', voltarArquivo: 'volver a los fragmentos',
    exAnterior: 'ejercicio anterior', fragAnterior: 'fragmento anterior', fragProximo: 'fragmento siguiente', exProximo: 'ejercicio siguiente',
    feito: 'olvidado.',
    privacidade: 'lo que escribes aquí queda solo en este aparato y desaparece al salir.',
    familias: { desenho: 'dibujar', calculo: 'calcular', apagamento: 'presionar', sobreposicao: 'arrastrar', conexao: 'conectar', dispersao: 'deslizar', costura: 'alinear' },
    sobre: 'Sobre', creditos: 'Créditos', conceito: 'Concepto de las obras',
    sobreArtista: 'Sobre la artista', maisArtista: 'Más sobre la artista y el curador', sobreCurador: 'Sobre el curador', siteArtista: 'sitio de la artista', sobreObras: 'Sobre las obras, en palabras de la artista', curriculo: 'Currículum', atual: 'actual',
    rodape: 'apoyo y colaboración', apoio: 'Apoyo', colaboracao: 'Colaboración',
    saibaMais: 'Saber más sobre la obra',
    ciberSaiba: 'En la exposición, Ejercicio de olvido es una instalación de varillas, sisal y papeles: en el frente de cada papel hay un pedazo de los fotocollages de los diarios; en el reverso, un ejercicio para hacer en la calle, en el paisaje de la ciudad. La versión física es solo para quien visita la muestra. Aquí, la misma obra tiene otra vida: los ejercicios suceden dentro de la pantalla.',
    verObra: 'ver la obra en la exposición',
    reduzMov: 'menos movimiento',
  },
  en: {
    lingua: 'English',
    menu: 'open menu', fechar: 'close menu', voltar: 'back', inicio: 'home', inicioMenu: 'Home', paginaInicial: 'Home', creditosSite: 'Website credits',
    titulo1: 'El mar', titulo2: 'y la escalera', sub: 'Bitácoras del Brejo Paraibano',
    exposicao: 'The exhibition', diarios: 'Travel diaries', ciberpoesia: 'Interactive cyberpoems', ciberCurto: 'Cyberpoetry',
    degrauExpo: 'curatorship, works and the making of the show',
    degrauDiarios: 'beach, mangrove and brejo',
    degrauCiber: 'sixteen scraps, sixteen gestures of forgetting',
    sobe: 'climb the stairs',
    curatorial: 'Curatorial text', por: 'by Maycon Albuquerque',
    fichaMostra: 'Exhibition credits',
    navegue: 'Explore the exhibition',
    obras: 'Works', construcao: 'Process', construcaoSub: 'a record of the process',
    obrasSub: 'four works, captions and texts by the artist',
    lerSobre: 'Read about the work', fecharTexto: 'Close text',
    lerCompleto: 'Read full text', fecharCompleto: 'Collapse text', fichaCat: 'Catalogue entry', sobreObra: 'About the work', lerMais: 'Read more', verObraDet: 'see work details', sobreSub: 'artist and curator',
    ano: 'year', tecnica: 'technique', materiais: 'materials', dimensoes: 'dimensions', credito: 'photos',
    obraAnterior: 'previous work', obraProxima: 'next work', outrasObras: 'other works',
    fotoAnterior: 'previous photo', fotoProxima: 'next photo',
    construcaoTexto: 'A record of the process.',
    diariosLema: 'field notebooks between the coast, the mangrove and the plateau',
    diariosIntro: 'Three territories, one route. From sea level to the highlands: the staircase mimics the climb of the Borborema plateau.',
    imagens: (n) => `${n} images`, deslize: 'swipe to travel through the diary',
    diarioDe: 'diary', posicao: (a, b) => `${a} / ${b}`,
    ciberLema: 'Exercises to erase, displace and transform memories.',
    ciberIntro: 'The diary images were cut into rectangles. On the back of each scrap there is an exercise in forgetting. Scroll, let the fragments overlap, and touch the one that catches your eye.',
    escolha: 'choose a fragment', toqueFragmento: 'touch a fragment to start the exercise',
    fragmento: 'fragment', exercicio: 'exercise', fazer: 'do the exercise', virar: 'turn back',
    reiniciar: 'start again', voltarArquivo: 'back to the fragments',
    exAnterior: 'previous exercise', fragAnterior: 'previous fragment', fragProximo: 'next fragment', exProximo: 'next exercise',
    feito: 'forgotten.',
    privacidade: 'what you write here stays on this device and vanishes when you leave.',
    familias: { desenho: 'draw', calculo: 'calculate', apagamento: 'press', sobreposicao: 'drag', conexao: 'connect', dispersao: 'swipe', costura: 'align' },
    sobre: 'About', creditos: 'Credits', conceito: 'About the works',
    sobreArtista: 'About the artist', maisArtista: 'More about the artist and the curator', sobreCurador: 'About the curator', siteArtista: 'artist’s website', sobreObras: 'About the works, in the artist’s words', curriculo: 'CV', atual: 'present',
    rodape: 'support and collaboration', apoio: 'Support', colaboracao: 'Collaboration',
    saibaMais: 'Learn more about the work',
    ciberSaiba: 'In the exhibition, Exercise in forgetting is an installation of rods, sisal and papers: on the front of each paper is a piece of the diaries’ photocollages; on the back, an exercise to do in the street, in the city’s landscape. The physical version belongs to those who visit the show. Here the same work takes on another life: the exercises happen inside the screen.',
    verObra: 'see the work in the exhibition',
    reduzMov: 'less motion',
  },
};

// ---------- a exposição ----------
const EXPOSICAO = {
  // texto integral de Maycon Albuquerque (original em espanhol)
  curatorial: {
    es: [
      'Durante un viaje por el Brejo Paraibano, una región de relieve elevado y húmedo, poco presente en el imaginario más extendido sobre el Nordeste brasileño, Lonelas encontró vestigios fósiles que la llevaron a imaginar un antiguo océano. Entre piedras, vegetación y escalinatas naturales, la artista comenzó a preguntarse cómo sus recuerdos de aquel paisaje podrían dialogar con otras eras, anteriores a la propia experiencia humana.',
      'Fotografías, dibujos y anotaciones dieron origen a fanzines concebidos como bitácoras, diarios de a bordo utilizados para registrar recorridos y acontecimientos de un viaje. Estas imágenes se reorganizan en esculturas e instalaciones que transitan entre el documento y la ficción, proponiendo ejercicios de memoria y olvido. La exposición invita al público a imaginar aquello que no pudo presenciar.',
      'Realizada gracias a la Beca de Movilidad FUNARTE 2026, en el Taller Cultural Luis Díaz Oduardo, en Santiago de Cuba, la exposición retoma una historia de intercambios artísticos entre Paraíba y Cuba. En la década de 1990, el Núcleo de Arte Contemporânea de la Universidade Federal da Paraíba, en João Pessoa, ya participaba en esta circulación cultural. Ahora, la artista emprende el camino hacia Cuba, llevando consigo otros paisajes y memorias del Nordeste brasileño.',
    ],
    pt: [
      'Durante uma viagem pelo Brejo Paraibano, uma região de relevo elevado e úmido, pouco presente no imaginário mais difundido sobre o Nordeste brasileiro, Lonelas encontrou vestígios fósseis que a levaram a imaginar um antigo oceano. Entre pedras, vegetação e escadarias naturais, a artista começou a se perguntar como suas lembranças daquela paisagem poderiam dialogar com outras eras, anteriores à própria experiência humana.',
      'Fotografias, desenhos e anotações deram origem a fanzines concebidos como diários de bordo, usados para registrar percursos e acontecimentos de uma viagem. Essas imagens se reorganizam em esculturas e instalações que transitam entre o documento e a ficção, propondo exercícios de memória e esquecimento. A exposição convida o público a imaginar aquilo que não pôde presenciar.',
      'Realizada graças à Bolsa de Mobilidade FUNARTE 2026, no Taller Cultural Luis Díaz Oduardo, em Santiago de Cuba, a exposição retoma uma história de intercâmbios artísticos entre a Paraíba e Cuba. Na década de 1990, o Núcleo de Arte Contemporânea da Universidade Federal da Paraíba, em João Pessoa, já participava dessa circulação cultural. Agora, a artista toma o caminho de Cuba, levando consigo outras paisagens e memórias do Nordeste brasileiro.',
    ],
    en: [
      'During a journey through the Brejo Paraibano, a high, humid region rarely present in the most widespread imagery of Brazil’s Northeast, Lonelas came across fossil traces that led her to imagine an ancient ocean. Among stones, vegetation and natural stairways, the artist began to wonder how her memories of that landscape might converse with other eras, older than human experience itself.',
      'Photographs, drawings and notes gave rise to fanzines conceived as logbooks, diaries used to record the routes and events of a journey. These images are reorganised into sculptures and installations that move between document and fiction, proposing exercises in memory and forgetting. The exhibition invites the public to imagine what it could not witness.',
      'Made possible by the FUNARTE 2026 Mobility Grant, at the Taller Cultural Luis Díaz Oduardo in Santiago de Cuba, the exhibition takes up a history of artistic exchange between Paraíba and Cuba. In the 1990s, the Núcleo de Arte Contemporânea of the Universidade Federal da Paraíba, in João Pessoa, already took part in this cultural circulation. Now the artist sets out for Cuba, carrying other landscapes and memories of the Brazilian Northeast.',
    ],
  },
  assinatura: { pt: 'Maycon Albuquerque, historiador da arte e artista visual', es: 'Maycon Albuquerque, historiador del arte y artista visual', en: 'Maycon Albuquerque, art historian and visual artist' },
  // só dados confirmados nos PDFs
  ficha: [
    { r: { pt: 'artista', es: 'artista', en: 'artist' }, v: 'Lohanna Lonelas' },
    { r: { pt: 'curadoria', es: 'curaduría', en: 'curator' }, v: 'Maycon Albuquerque' },
    { r: { pt: 'abertura', es: 'inauguración', en: 'opening' }, v: '18 · 11 · 2026' },
    { r: { pt: 'local', es: 'lugar', en: 'venue' }, v: 'Taller Cultural Luis Díaz Oduardo · Santiago de Cuba' },
    { r: { pt: 'apoio', es: 'apoyo', en: 'support' }, v: { pt: 'Bolsa de Mobilidade FUNARTE 2026, Ministério da Cultura', es: 'Beca de Movilidad FUNARTE 2026, Ministério da Cultura', en: 'FUNARTE 2026 Mobility Grant, Brazilian Ministry of Culture' } },
    { r: { pt: 'colaboração', es: 'colaboración', en: 'collaboration' }, v: 'Ateliê Lonelas · Consejo Provincial de Artes Plásticas · Centro de Arte Santiago de Cuba' },
  ],
};

// créditos do site (autoria e desenvolvimento)
const CREDITOS_SITE = [
  { r: { pt: 'Concepção e direção artística', es: 'Concepción y dirección artística', en: 'Concept and art direction' }, v: 'Lohanna Lonelas' },
  { r: { pt: 'Design e direção de interface', es: 'Diseño y dirección de interfaz', en: 'Design and interface direction' }, v: 'Lohanna Lonelas' },
  { r: { pt: 'Desenvolvimento web e programação', es: 'Desarrollo web y programación', en: 'Web development and programming' }, v: 'Marcelo Ferrante' },
  { r: { pt: 'Criação e desenvolvimento das experiências interativas', es: 'Creación y desarrollo de las experiencias interactivas', en: 'Creation and development of the interactive experiences' }, v: { pt: 'Lohanna Lonelas e Marcelo Ferrante', es: 'Lohanna Lonelas y Marcelo Ferrante', en: 'Lohanna Lonelas and Marcelo Ferrante' } },
];

// As 4 obras. Texto das obras: etiquetas da exposição (referencias/etiquetas cuba.pdf).
const OBRAS = [
  {
    id: 'escalera',
    titulo: { pt: 'Escadaria', es: 'Escalera', en: 'Staircase' },
    ano: '2026',
    tecnica: { pt: 'instalação', es: 'instalación', en: 'installation' },
    materiais: { pt: 'sublimação sobre tecido, fotografia experimental, corda de sisal e rede decorativa', es: 'sublimación sobre tejido, fotografía experimental, cuerda de sisal y red decorativa', en: 'dye sublimation on fabric, experimental photography, sisal rope and decorative netting' },
    dimensoes: { pt: 'dimensões variáveis', es: 'dimensiones variables', en: 'variable dimensions' },
    fotos: [
      { img: 'site/escadaria-1', alt: { pt: 'Tiras de tecido impresso caem de uma vara de madeira e se espalham pelo chão como uma cascata', es: 'Tiras de tejido impreso caen de una varilla de madera y se esparcen por el suelo como una cascada', en: 'Strips of printed fabric fall from a wooden rod and spread across the floor like a waterfall' } },
      { img: 'site/escadaria-2', alt: { pt: 'A instalação vista de frente, com as tiras amontoadas no chão de cimento', es: 'La instalación vista de frente, con las tiras amontonadas en el suelo de cemento', en: 'The installation seen from the front, with the strips piled on the concrete floor' } },
      { img: 'site/escadaria-3', alt: { pt: 'A artista passa, em movimento, diante da cascata de tiras', es: 'La artista pasa, en movimiento, delante de la cascada de tiras', en: 'The artist walks past the cascade of strips, in motion' } },
      { img: 'site/escadaria-4', alt: { pt: 'Mão segura uma das tiras, com fotografia impressa e escrita à mão', es: 'Una mano sostiene una de las tiras, con fotografía impresa y escritura a mano', en: 'A hand holds one of the strips, with a printed photograph and handwriting' } },
    ],
    texto: {
      es: ['Esta instalación puede recordar una cascada, pero también el flujo del agua que desciende desde las zonas más elevadas del territorio hasta el mar, el mismo movimiento que inspiró mis fotocollages.', 'Durante el viaje, me interesó especialmente imaginar el pasado geológico de esta región, donde todavía se encuentran vestigios de fósiles marinos. Hace millones de años, mucho antes de la presencia humana, este territorio estuvo cubierto por el océano.', 'A partir de esa idea, comencé a transformar fotografías del paisaje actual en alegorías de un fondo marino desaparecido. Las plantas se convierten en algas, las rocas en arrecifes y las imágenes se fragmentan como recuerdos de un tiempo que nunca conocimos.', 'Para mí, esta instalación es una forma de navegar por el fósil de un océano, de recorrer memorias que ya no existen, o que quizás nunca existieron.'],
      pt: ['Esta instalação pode lembrar uma cascata, mas também o fluxo da água que desce das partes mais altas do território até o mar, o mesmo movimento que inspirou minhas fotocolagens.', 'Durante a viagem, me interessou especialmente imaginar o passado geológico desta região, onde ainda se encontram vestígios de fósseis marinhos. Há milhões de anos, muito antes da presença humana, este território esteve coberto pelo oceano.', 'A partir dessa ideia, comecei a transformar fotografias da paisagem atual em alegorias de um fundo do mar desaparecido. As plantas viram algas, as pedras viram recifes e as imagens se fragmentam como lembranças de um tempo que nunca conhecemos.', 'Para mim, esta instalação é uma forma de navegar pelo fóssil de um oceano, de percorrer memórias que já não existem, ou que talvez nunca tenham existido.'],
      en: ['This installation may recall a waterfall, but also the flow of water descending from the highest parts of the territory to the sea, the same movement that inspired my photocollages.', 'During the journey I was especially drawn to imagining the geological past of this region, where traces of marine fossils can still be found. Millions of years ago, long before any human presence, this land lay under the ocean.', 'From that idea I began to turn photographs of today’s landscape into allegories of a vanished seabed. Plants become algae, rocks become reefs, and the images break apart like memories of a time we never knew.', 'For me, this installation is a way of sailing through the fossil of an ocean, of travelling through memories that no longer exist, or perhaps never did.'],
    },
  },
  {
    id: 'fosiles',
    titulo: { pt: 'Fósseis, espadas e outras lembranças', es: 'Fósiles, espadas y otros recuerdos', en: 'Fossils, swords and other memories' },
    ano: '2026',
    tecnica: { pt: 'instalação', es: 'instalación', en: 'installation' },
    materiais: { pt: 'sublimação sobre tecido, madeira de pinho e corda de sisal', es: 'sublimación sobre tejido, madera de pino y cuerda de sisal', en: 'dye sublimation on fabric, pine wood and sisal rope' },
    dimensoes: { pt: 'dimensões variáveis, adaptáveis ao espaço expositivo', es: 'dimensiones variables, adaptables al espacio expositivo', en: 'variable dimensions, adaptable to the space' },
    fotos: [
      { img: 'site/fosseis-capa', alt: { pt: 'Cruzes e círculos de madeira na parede, com feixes de tecido impresso pendurados e ligados por cordas', es: 'Cruces y círculos de madera en la pared, con haces de tejido impreso colgados y unidos por cuerdas', en: 'Wooden crosses and circles on the wall, with bundles of printed fabric hanging and linked by cords' } },
      { img: 'site/fosseis-2', alt: { pt: 'A artista caminha diante da instalação, em movimento', es: 'La artista camina delante de la instalación, en movimiento', en: 'The artist walks in front of the installation, in motion' } },
      { img: 'site/fosseis-3', alt: { pt: 'Detalhe de uma espada de madeira com tecidos escritos à mão e cordas de sisal', es: 'Detalle de una espada de madera con tejidos escritos a mano y cuerdas de sisal', en: 'Detail of a wooden sword with handwritten fabrics and sisal cords' } },
      { img: 'site/fosseis-4', alt: { pt: 'Detalhe de uma cruz de madeira com o feixe de tecidos impressos amarrado', es: 'Detalle de una cruz de madera con el haz de tejidos impresos atado', en: 'Detail of a wooden cross with the bundle of printed fabrics tied to it' } },
    ],
    texto: {
      es: ['Al crear esta instalación, comencé a imaginar las batallas, la colonización, la catequesis y las distintas experiencias humanas que transformaron este territorio a lo largo del tiempo.', 'Me interesó pensar su historia como una especie de colcha de retazos culturales, formada por encuentros, conflictos, rupturas y memorias que se superponen. Las imágenes aparecen fragmentadas, como si fueran restos de un pasado que intentamos reconstruir.', 'La escalinata, además de sugerir la topografía y las formas del paisaje, también me hizo imaginar las historias que pudieron desarrollarse en esta región.', 'Esta obra es, para mí, un ejercicio de imaginación sobre esas huellas. No busco reconstruir los acontecimientos históricos, sino jugar con sus fragmentos, mezclando recuerdos, ficciones y vestigios para inventar otras formas de mirar el pasado.'],
      pt: ['Ao criar esta instalação, comecei a imaginar as batalhas, a colonização, a catequese e as diferentes experiências humanas que transformaram este território ao longo do tempo.', 'Me interessou pensar sua história como uma espécie de colcha de retalhos culturais, formada por encontros, conflitos, rupturas e memórias que se sobrepõem. As imagens aparecem fragmentadas, como se fossem restos de um passado que tentamos reconstruir.', 'A escadaria, além de sugerir a topografia e as formas da paisagem, também me fez imaginar as histórias que podem ter acontecido nesta região.', 'Esta obra é, para mim, um exercício de imaginação sobre esses rastros. Não busco reconstruir os acontecimentos históricos, mas brincar com seus fragmentos, misturando lembranças, ficções e vestígios para inventar outras formas de olhar o passado.'],
      en: ['While making this installation I began to imagine the battles, the colonisation, the catechism and the many human experiences that transformed this territory over time.', 'I was interested in thinking of its history as a kind of patchwork quilt of cultures, made of encounters, conflicts, ruptures and memories laid over one another. The images appear fragmented, as if they were remains of a past we try to rebuild.', 'Besides suggesting the topography and shapes of the landscape, the stairway also made me imagine the stories that may have unfolded in this region.', 'For me this work is an exercise of imagination about those traces. I do not try to reconstruct historical events, but to play with their fragments, mixing memories, fictions and vestiges to invent other ways of looking at the past.'],
    },
  },
  {
    id: 'ejercicio',
    titulo: { pt: 'Exercício de esquecimento', es: 'Ejercicio de olvido', en: 'Exercise in forgetting' },
    ano: '2026',
    tecnica: { pt: 'instalação interativa', es: 'instalación interactiva', en: 'interactive installation' },
    materiais: { pt: 'varas de madeira, corda de sisal e papéis impressos', es: 'varillas de madera, cuerda de sisal, papeles impresos', en: 'wooden rods, sisal rope and printed papers' },
    dimensoes: { pt: 'dimensões variáveis, adaptáveis ao espaço expositivo', es: 'dimensiones variables, adaptables al espacio expositivo', en: 'variable dimensions, adaptable to the space' },
    fotos: [
      { img: 'site/esquecimento-1', alt: { pt: 'Varas de madeira e cordas de sisal desenham montanhas e círculos numa parede branca, com papéis impressos presos ao longo das linhas', es: 'Varillas de madera y cuerdas de sisal dibujan montañas y círculos en una pared blanca, con papeles impresos atados a lo largo de las líneas', en: 'Wooden rods and sisal ropes draw mountains and circles on a white wall, with printed papers tied along the lines' } },
      { img: 'site/esquecimento-2', alt: { pt: 'A artista de pé diante da parede, olhando a instalação', es: 'La artista de pie frente a la pared, mirando la instalación', en: 'The artist standing before the wall, looking at the installation' } },
      { img: 'site/esquecimento-3', alt: { pt: 'Detalhe dos papéis presos aos nós da corda de sisal, com fragmentos das fotocolagens e exercícios como “Para olvidar un abrazo”', es: 'Detalle de los papeles atados a los nudos de la cuerda de sisal, con fragmentos de los fotocollages y ejercicios como «Para olvidar un abrazo»', en: 'Detail of the papers tied to the knots of the sisal rope, with fragments of the photocollages and exercises such as “Para olvidar un abrazo”' } },
    ],
    link: '#/ciberpoesia',
    texto: {
      es: ['Esta instalación nace de una pregunta sobre la fragilidad de la memoria: ¿qué elegimos recordar y qué nos gustaría olvidar?', 'Para crearla, retomé las imágenes de mis diarios de viaje, las fragmenté y las transformé en pequeños papeles que contienen ejercicios de olvido.', 'Te invito a elegir uno de estos fragmentos y leer su propuesta. Si lo deseas, puedes desprenderlo y llevártelo para realizar el ejercicio fuera de la exposición, explorando el paisaje que te rodea.', 'Así como durante mi residencia artística en Brasil recorrí un territorio para construir mis propias memorias e imaginaciones, aquí propongo que cada visitante establezca una relación con el paisaje de la ciudad que acoge esta exposición.', 'En el sitio web también encontrarás una versión virtual de la obra, para realizar los ejercicios más adelante, sin necesidad de intervenir físicamente en el espacio urbano.'],
      pt: ['Esta instalação nasce de uma pergunta sobre a fragilidade da memória: o que escolhemos lembrar e o que gostaríamos de esquecer?', 'Para criá-la, retomei as imagens dos meus diários de viagem, fragmentei-as e as transformei em pequenos papéis que contêm exercícios de esquecimento.', 'Convido você a escolher um desses fragmentos e ler sua proposta. Se quiser, pode destacá-lo e levá-lo para fazer o exercício fora da exposição, explorando a paisagem ao seu redor.', 'Assim como, durante minha residência artística no Brasil, percorri um território para construir minhas próprias memórias e imaginações, aqui proponho que cada visitante estabeleça uma relação com a paisagem da cidade que acolhe esta exposição.', 'No site você também encontra uma versão virtual da obra, para fazer os exercícios mais tarde, sem precisar intervir fisicamente no espaço urbano.'],
      en: ['This installation grows out of a question about the fragility of memory: what do we choose to remember, and what would we like to forget?', 'To make it, I went back to the images of my travel diaries, broke them into fragments and turned them into small papers holding exercises in forgetting.', 'I invite you to choose one of these fragments and read what it proposes. If you like, you can detach it and take it with you to do the exercise outside the exhibition, exploring the landscape around you.', 'Just as during my residency in Brazil I walked a territory to build my own memories and imaginings, here I propose that each visitor build a relationship with the landscape of the city hosting this exhibition.', 'On this website you will also find a virtual version of the work, so you can do the exercises later without physically intervening in the city.'],
    },
  },
  {
    id: 'llegadas',
    titulo: { pt: 'Chegadas (zines)', es: 'Llegadas (zines)', en: 'Arrivals (zines)' },
    ano: '2025',
    tecnica: { pt: 'instalação com 24 fanzines para manusear', es: 'instalación con 24 fanzines para manipulación', en: 'installation with 24 fanzines to handle' },
    materiais: { pt: 'fanzines, suporte de madeira e cordas de sisal', es: 'fanzines, soporte de madera y cuerdas de sisal', en: 'fanzines, wooden support and sisal cords' },
    dimensoes: { pt: 'dimensões variáveis', es: 'dimensiones variables', en: 'variable dimensions' },
    fotos: [
      { img: 'site/zines-1', alt: { pt: 'Três fileiras de fanzines presas por cordas de sisal a suportes de madeira na parede', es: 'Tres hileras de fanzines sujetas con cuerdas de sisal a soportes de madera en la pared', en: 'Three rows of fanzines hanging on sisal cords from wooden brackets on the wall' } },
      { img: 'site/zines-2', alt: { pt: 'Mão segura um fanzine aberto, com escrita à mão e colagens', es: 'Una mano sostiene un fanzine abierto, con escritura a mano y collages', en: 'A hand holds an open fanzine, with handwriting and collages' } },
    ],
    link: '#/diarios',
    texto: {
      es: ['Durante mi viaje, realicé fotografías experimentales que fui superponiendo mediante transparencias para construir una especie de bitácora visual. De este proceso surgieron cuatro modelos de pequeños diarios, organizados como fotocollages que reúnen distintos momentos del recorrido.', 'Al crearlos, imaginé el movimiento del agua descendiendo desde las zonas más elevadas del territorio hasta el mar. Así, las imágenes recorren tres paisajes: las tierras altas, una zona intermedia que evoca el manglar y, finalmente, la playa.', 'Estas fotografías también sirven como punto de partida para las demás instalaciones de la exposición, donde aparecen recortadas y transformadas en nuevas formas.', '¡Puedes tocar las obras! Estos pequeños diarios están hechos para que puedas hojearlos y explorar sus imágenes libremente.'],
      pt: ['Durante a viagem, fiz fotografias experimentais que fui sobrepondo por transparências para construir uma espécie de diário de bordo visual. Desse processo surgiram quatro modelos de pequenos diários, organizados como fotocolagens que reúnem diferentes momentos do percurso.', 'Ao criá-los, imaginei o movimento da água descendo das partes mais altas do território até o mar. Assim, as imagens percorrem três paisagens: as terras altas, uma zona intermediária que evoca o mangue e, por fim, a praia.', 'Essas fotografias também são o ponto de partida das outras instalações da exposição, onde aparecem recortadas e transformadas em novas formas.', 'Você pode tocar nas obras! Estes pequenos diários foram feitos para serem folheados e explorados livremente.'],
      en: ['During my journey I made experimental photographs that I layered through transparencies to build a kind of visual logbook. Out of this process came four models of small diaries, arranged as photocollages that gather different moments of the route.', 'While making them I imagined the movement of water descending from the highest parts of the territory to the sea. So the images travel through three landscapes: the highlands, an in-between zone that evokes the mangrove and, finally, the beach.', 'These photographs are also the starting point for the other installations in the exhibition, where they appear cut up and turned into new forms.', 'You can touch the works! These small diaries are made to be leafed through and explored freely.'],
    },
  },
];


// Construção da exposição: o making of (álbum "WIP exposição" da artista, 08/11/2026), em três etapas.
const _tri = (pt, es, en) => ({ pt, es, en });
// Processos: só as fotos dos dois links da artista — álbum "WIP exposição" (Google Photos, 01–10)
// e pasta "Obras de arte wip" (Drive, 11–15). Sem etapas nem legendas: só as imagens.
const CONSTRUCAO = [
  { img: 'processos/01', alt: _tri('Estrutura de varas amarradas, rolo de sisal, tesoura e um tecido impresso sobre a mesa', 'Estructura de varillas atadas, rollo de sisal, tijeras y un tejido impreso sobre la mesa', 'Structure of tied rods, a roll of sisal, scissors and a printed fabric on the table') },
  { img: 'processos/02', alt: _tri('A artista serra varas de madeira na bancada, ao lado de uma serra tico-tico', 'La artista sierra varillas de madera en el banco, junto a una caladora', 'The artist saws wooden rods at the workbench, next to a jigsaw') },
  { img: 'processos/03', alt: _tri('Mãos ajustam a maquete de varas amarradas, com o desenho no tablet', 'Manos ajustan la maqueta de varillas atadas, con el dibujo en la tableta', 'Hands adjust the model of tied rods, with the drawing on a tablet') },
  { img: 'processos/04', alt: _tri('Em preto e branco, a artista serra as varas', 'En blanco y negro, la artista sierra las varillas', 'In black and white, the artist saws the rods') },
  { img: 'processos/05', alt: _tri('A artista estende o tecido sobre a mesa do ateliê', 'La artista extiende el tejido sobre la mesa del taller', 'The artist spreads the fabric on the studio table') },
  { img: 'processos/06', alt: _tri('Tecido impresso sendo passado a ferro', 'Tejido impreso planchado', 'Printed fabric being ironed') },
  { img: 'processos/07', alt: _tri('O tecido translúcido erguido contra a luz', 'El tejido translúcido alzado contra la luz', 'The translucent fabric held up against the light') },
  { img: 'processos/08', alt: _tri('Em preto e branco, a artista recorta o tecido impresso no colo', 'En blanco y negro, la artista recorta el tejido impreso sobre el regazo', 'In black and white, the artist cuts the printed fabric on her lap') },
  { img: 'processos/09', alt: _tri('A artista recorta o tecido no sofá, com um cachorro ao fundo', 'La artista recorta el tejido en el sofá, con un perro al fondo', 'The artist cuts the fabric on the sofa, with a dog in the background') },
  { img: 'processos/10', alt: _tri('De perto, a tesoura corta uma tira do tecido', 'De cerca, la tijera corta una tira del tejido', 'Close up, the scissors cut a strip of fabric') },
  { img: 'processos/11', alt: _tri('A artista, de pé junto à bancada, prende a rede de pesca', 'La artista, de pie junto a la encimera, sujeta la red de pesca', 'The artist, standing by the counter, fastens the fishing net') },
  { img: 'processos/12', alt: _tri('Em preto e branco, sentada no chão, a artista amarra tiras impressas na rede', 'En blanco y negro, sentada en el suelo, la artista ata tiras impresas a la red', 'In black and white, sitting on the floor, the artist ties printed strips to the net') },
  { img: 'processos/13', alt: _tri('De pijama rosa, ajoelhada, a artista ajeita as tiras que pendem da rede', 'En pijama rosa, de rodillas, la artista acomoda las tiras que cuelgan de la red', 'In a pink pyjama, kneeling, the artist arranges the strips hanging from the net') },
  { img: 'processos/14', alt: _tri('De perto, as tiras de tecido impresso se enrolam umas nas outras', 'De cerca, las tiras de tejido impreso se enredan unas con otras', 'Close up, the printed fabric strips curl into each other') },
  { img: 'processos/15', alt: _tri('Nina, a gata, sentada sobre a rede estendida no chão', 'Nina, la gata, sentada sobre la red extendida en el suelo', 'Nina, the cat, sitting on the net spread on the floor'), leg: 'Nina' },
];
const DEDICATORIA = _tri('Para Nina, que acompanhou cada nó desta rede.', 'Para Nina, que acompañó cada nudo de esta red.', 'For Nina, who kept watch over every knot of this net.');

// ---------- diários ----------
// Do mais baixo ao mais alto: praia → mangue → brejo (a subida da Borborema).
// O brejo reúne dois diários numa única jornada mais longa.
const DIARIOS = [
  { id: 'praia', nome: { pt: 'praia', es: 'playa', en: 'beach' }, imgs: ['diarios/1-1', 'diarios/1-2', 'diarios/1-3', 'diarios/1-4'] },
  { id: 'mangue', nome: { pt: 'mangue', es: 'manglar', en: 'mangrove' }, imgs: ['diarios/3-1', 'diarios/3-2', 'diarios/3-3', 'diarios/3-4'] },
  { id: 'brejo', nome: { pt: 'brejo paraibano', es: 'brejo paraibano', en: 'brejo paraibano' }, nota: { pt: 'dois diários numa só jornada', es: 'dos diarios en una sola travesía', en: 'two diaries in a single journey' }, imgs: ['diarios/2-1', 'diarios/2-2', 'diarios/2-3', 'diarios/2-4', 'diarios/2-5', 'diarios/2-6', 'diarios/2-7', 'diarios/2-8'] },
];

// ---------- ciberpoesia: 16 fragmentos → 16 exercícios ----------
// img: recorte em img/fragmentos/NN.webp (praia 1–4, mangue 5–8, brejo I 9–12, brejo II 13–16).
// tipo: a mecânica em js/exercicios.js. Títulos e instruções: provisórios.
const EXERCICIOS = [
  { tipo: 'nevoa', familia: 'desenho',
    titulo: { pt: 'Desenhar na névoa', es: 'Dibujar en la niebla', en: 'Drawing in the mist' },
    instrucao: { pt: 'Desenhe com o dedo a forma de um lugar que você quer esquecer. A névoa vai cobrindo o traço enquanto você desenha.', es: 'Dibuja con el dedo la forma de un lugar que quieres olvidar. La niebla irá cubriendo el trazo mientras dibujas.', en: 'Draw with your finger the shape of a place you want to forget. The mist will cover the line as you draw.' } },
  { tipo: 'liquida', familia: 'desenho',
    titulo: { pt: 'Lembrança líquida', es: 'Recuerdo líquido', en: 'Liquid memory' },
    instrucao: { pt: 'Escreva um rosto na tela como quem escreve na água. Espere as linhas escorrerem até a borda.', es: 'Dibuja un rostro en la pantalla como quien dibuja en el agua. Espera a que las líneas escurran hasta el borde.', en: 'Draw a face on the screen as if on water. Wait for the lines to run down to the edge.' } },
  { tipo: 'dataDividida', familia: 'calculo',
    titulo: { pt: 'Data dividida', es: 'Fecha dividida', en: 'Divided date' },
    instrucao: { pt: 'Digite uma data que você quer esquecer. Some, divida e multiplique o dia e o mês até que a data deixe de ser uma data.', es: 'Escribe una fecha que quieres olvidar. Suma, divide y multiplica el día y el mes hasta que la fecha deje de ser una fecha.', en: 'Type a date you want to forget. Add, divide and multiply the day and month until the date is no longer a date.' } },
  { tipo: 'tabuada', familia: 'calculo',
    titulo: { pt: 'Tabuada do retorno', es: 'Tabla del regreso', en: 'Times table of return' },
    instrucao: { pt: 'Digite a data. As contas somam ou subtraem os algarismos dela; a cada uma que você acertar, um deles vai embora.', es: 'Escribe la fecha. Las cuentas suman o restan sus cifras; por cada una que aciertes, una de ellas se va.', en: 'Type the date. The sums add or subtract its digits; each one you get right takes one of them away.' } },
  { tipo: 'pressao', familia: 'apagamento',
    titulo: { pt: 'Pressão do silêncio', es: 'Presión del silencio', en: 'The pressure of silence' },
    instrucao: { pt: 'Escreva algo que você não quer mais carregar. Depois pressione e segure sobre as palavras até que se calem.', es: 'Escribe algo que ya no quieres cargar. Luego presiona y mantén sobre las palabras hasta que callen.', en: 'Write something you no longer want to carry. Then press and hold on the words until they fall silent.' } },
  { tipo: 'letra', familia: 'apagamento',
    titulo: { pt: 'Letra por letra', es: 'Letra por letra', en: 'Letter by letter' },
    instrucao: { pt: 'Escreva um nome. Toque em cada letra para apagá-la, uma de cada vez, sem pressa.', es: 'Escribe un nombre. Toca cada letra para borrarla, una por una, sin prisa.', en: 'Write a name. Touch each letter to erase it, one at a time, without hurrying.' } },
  { tipo: 'velar', familia: 'sobreposicao',
    titulo: { pt: 'Velar a frase', es: 'Velar la frase', en: 'Veiling the sentence' },
    instrucao: { pt: 'Arraste os retalhos da paisagem para cobrir, palavra por palavra, a frase que ficou.', es: 'Arrastra los retazos del paisaje para cubrir, palabra por palabra, la frase que quedó.', en: 'Drag the scraps of landscape to cover, word by word, the sentence that remained.' },
    frase: { pt: 'hoje esqueci o nome do caminho mas o corpo lembra do relevo', es: 'hoy olvidé el nombre del camino pero el cuerpo recuerda el relieve', en: 'today I forgot the name of the path but the body remembers the relief' } },
  { tipo: 'janela', familia: 'sobreposicao',
    titulo: { pt: 'Janela móvel', es: 'Ventana móvil', en: 'Moving window' },
    instrucao: { pt: 'Passe a janela sobre a paisagem coberta. O que você vê volta a se cobrir assim que a janela se afasta.', es: 'Pasa la ventana sobre el paisaje cubierto. Lo que ves vuelve a cubrirse en cuanto la ventana se aleja.', en: 'Slide the window over the covered landscape. What you see is covered again as soon as the window moves on.' } },
  { tipo: 'trajeto', familia: 'conexao',
    titulo: { pt: 'Trajeto interrompido', es: 'Trayecto interrumpido', en: 'Interrupted route' },
    instrucao: { pt: 'Este é o caminho da praia ao brejo. Toque nos pontos para tirá-los do mapa até que só reste a partida e a chegada.', es: 'Este es el camino de la playa al brejo. Toca los puntos para quitarlos del mapa hasta que solo queden la salida y la llegada.', en: 'This is the route from the beach to the brejo. Touch the points to remove them from the map until only departure and arrival remain.' } },
  { tipo: 'constelacao', familia: 'conexao',
    titulo: { pt: 'Constelação provisória', es: 'Constelación provisional', en: 'Provisional constellation' },
    instrucao: { pt: 'Toque no céu, ou arraste o dedo, para marcar os lugares de uma lembrança. As linhas se ligam sozinhas. Depois, desfaça a constelação.', es: 'Toca el cielo, o arrastra el dedo, para marcar los lugares de un recuerdo. Las líneas se unen solas. Después, deshaz la constelación.', en: 'Touch the sky, or drag your finger, to mark the places of a memory. The lines join by themselves. Then undo the constellation.' } },
  { tipo: 'poeira', familia: 'dispersao',
    titulo: { pt: 'Poeira do lugar', es: 'Polvo del lugar', en: 'Dust of the place' },
    instrucao: { pt: 'Passe o dedo sobre o fragmento. A imagem vira poeira e o vento leva.', es: 'Pasa el dedo sobre el fragmento. La imagen se vuelve polvo y el viento se la lleva.', en: 'Run your finger over the fragment. The image turns to dust and the wind carries it off.' } },
  { tipo: 'vento', familia: 'dispersao',
    titulo: { pt: 'Vento contrário', es: 'Viento contrario', en: 'Headwind' },
    instrucao: { pt: 'Escreva uma palavra. Sopre contra ela com o dedo, deslizando, até as letras se espalharem pela tela.', es: 'Escribe una palabra. Sopla contra ella con el dedo, deslizando, hasta que las letras se esparzan por la pantalla.', en: 'Write a word. Blow against it with your finger, swiping, until the letters scatter across the screen.' } },
  { tipo: 'costura', familia: 'costura',
    titulo: { pt: 'Costura da ausência', es: 'Costura de la ausencia', en: 'Sewing the absence' },
    instrucao: { pt: 'Arraste as faixas para cima ou para baixo e alinhe a imagem. Quando ela se completar, uma das faixas se desfaz com o vento: é a parte que você esqueceu.', es: 'Arrastra las franjas hacia arriba o hacia abajo y alinea la imagen. Cuando se complete, una de las franjas se deshace con el viento: es la parte que olvidaste.', en: 'Drag the strips up or down to line up the image. Once it is whole, one of the strips comes apart in the wind: it is the part you forgot.' } },
  { tipo: 'sutura', familia: 'costura',
    titulo: { pt: 'Pontos de sutura', es: 'Puntos de sutura', en: 'Stitches' },
    instrucao: { pt: 'Ligue uma borda à outra com o dedo, ponto por ponto. A cada ponto, as duas metades se aproximam.', es: 'Une un borde con el otro con el dedo, punto por punto. Con cada punto, las dos mitades se acercan.', en: 'Join one edge to the other with your finger, stitch by stitch. With each stitch the two halves draw closer.' } },
  { tipo: 'camadas', familia: 'sobreposicao',
    titulo: { pt: 'Memória em camadas', es: 'Memoria en capas', en: 'Layered memory' },
    instrucao: { pt: 'Três fragmentos, um sobre o outro. Toque no de cima para mandá-lo para o fundo até não saber mais qual veio primeiro.', es: 'Tres fragmentos, uno sobre otro. Toca el de arriba para mandarlo al fondo hasta no saber cuál vino primero.', en: 'Three fragments, one on top of another. Touch the top one to send it to the back until you no longer know which came first.' } },
  { tipo: 'calendario', familia: 'calculo',
    titulo: { pt: 'Calendário desfeito', es: 'Calendario deshecho', en: 'Undone calendar' },
    instrucao: { pt: 'Digite uma data. Some seus algarismos, e depois some de novo, até que reste um só número. Então deixe-o ir.', es: 'Escribe una fecha. Suma sus cifras, y luego vuelve a sumar, hasta que quede un solo número. Entonces déjalo ir.', en: 'Type a date. Add up its digits, then add again, until a single number remains. Then let it go.' } },
];

// recortes dos diários usados na ciberpoesia (um por exercício, mesma ordem)
const FRAGMENTOS = ['fragmentos/01', 'fragmentos/02', 'fragmentos/03', 'fragmentos/04', 'fragmentos/05', 'fragmentos/06', 'fragmentos/07', 'fragmentos/08', 'fragmentos/09', 'fragmentos/10', 'fragmentos/11', 'fragmentos/12', 'fragmentos/13', 'fragmentos/14', 'fragmentos/15', 'fragmentos/16'];
// faixa do topo de cada exercício: o mesmo recorte, tirado do diário original em alta resolução (só a tira que aparece)
const FAIXAS = ['fragmentos/faixa-01', 'fragmentos/faixa-02', 'fragmentos/faixa-03', 'fragmentos/faixa-04', 'fragmentos/faixa-05', 'fragmentos/faixa-06', 'fragmentos/faixa-07', 'fragmentos/faixa-08', 'fragmentos/faixa-09', 'fragmentos/faixa-10', 'fragmentos/faixa-11', 'fragmentos/faixa-12', 'fragmentos/faixa-13', 'fragmentos/faixa-14', 'fragmentos/faixa-15', 'fragmentos/faixa-16'];
// de onde vem cada recorte (pranchas): praia 1–4, mangue 5–8, brejo I 9–12, brejo II 13–16
const ORIGEM_FRAGMENTO = (i) => (i < 4 ? 'praia' : i < 8 ? 'mangue' : 'brejo');

// ---------- sobre ----------
// currículo da artista (imagem enviada por Elu em 07/11/2026); telefone e e-mail não são publicados
const CV = {
  origem: { pt: 'Lonelas — 1997, Porto Velho, Rondônia, Brasil (Amazônia Legal). Vive e trabalha em João Pessoa, Paraíba, Brasil.', es: 'Lonelas — 1997, Porto Velho, Rondônia, Brasil (Amazonia Legal). Vive y trabaja en João Pessoa, Paraíba, Brasil.', en: 'Lonelas — 1997, Porto Velho, Rondônia, Brazil (Legal Amazon). Lives and works in João Pessoa, Paraíba, Brazil.' },
  redes: [['lonelas.com', 'https://www.lonelas.com'], ['Instagram /lonelas', 'https://www.instagram.com/lonelas/'], ['YouTube /lonelas', 'https://www.youtube.com/@lonelas']],
  secoes: [
    { t: { pt: 'Formação acadêmica', es: 'Formación académica', en: 'Education' }, itens: [
      ['2025 – atual', 'Mestrado em Artes Visuais, Processos Criativos — Universidade Federal da Paraíba (UFPB)'],
      ['2018 – 2023', 'Licenciatura em Artes Visuais — Universidade Federal da Paraíba (UFPB)'] ] },
    { t: { pt: 'Atuação profissional', es: 'Actuación profesional', en: 'Professional activity' }, itens: [
      ['2024 – atual', 'Agente Territorial de Cultura — Ministério da Cultura'] ] },
    { t: { pt: 'Residências artísticas', es: 'Residencias artísticas', en: 'Artist residencies' }, itens: [
      ['2026', 'Galería Universal — Centro Provincial de Artes Plásticas. FUNARTE. Santiago, Cuba.'],
      ['2025', 'Lab Ocupações Artes Visuais, Usina Cultural Energisa. João Pessoa, Brasil.'],
      ['2023', 'Arapuca Arte Residência. Conde, Brasil. Em colaboração com FUNESC.'],
      ['2023', '(R)EXISTO, UFPB. João Pessoa, Brasil.'] ] },
    { t: { pt: 'Exposição individual', es: 'Exposición individual', en: 'Solo exhibition' }, itens: [
      ['2024', 'Eu Sonho: Exercícios entre o Hoje e o Amanhã — Projeto ExpoSesc, Sesc Centro, João Pessoa, PB'] ] },
    { t: { pt: 'Exposições coletivas selecionadas', es: 'Exposiciones colectivas seleccionadas', en: 'Selected group exhibitions' }, itens: [
      ['2026', 'MODUS. KH7 Artspace. Aarhus, Dinamarca.'],
      ['2026', 'Mulheres de Março — Sesc Centro, João Pessoa, PB.'],
      ['2025', 'Natureza Integral: a obra como mundo. Usina Cultural Energisa, João Pessoa, PB'],
      ['2025', 'Expedição Sesc em Artes Visuais: A vida acontece com Sesc do Litoral ao Sertão. Exposição itinerante, Brasil'],
      ['2025', 'XVIII Salão Municipal de Artes Plásticas — SAMAP. FUNJOPE, João Pessoa, PB'],
      ['2024', 'Contemporaneidades na Paraíba. Exposição itinerante, Brasil'],
      ['2024', 'Bienal Mundial de Fotografia de Estudantes. Novi Sad, Sérvia'],
      ['2024', 'Natureza e Natureza Imaginada. Galeria Archidy Picado — FUNESC'],
      ['2023', 'Bienal de Arte Contemporânea do Sesc. Exposição itinerante, Brasil'] ] },
    { t: { pt: 'Prêmios', es: 'Premios', en: 'Awards' }, itens: [
      ['2026', 'Política Nacional Aldir Blanc — Desenvolvimento de Projetos Culturais'],
      ['2025', 'Política Nacional Aldir Blanc — Fomento à Criação Artístico-Cultural'],
      ['2025', '||Entre|| arte e acesso. Itaú Cultural. São Paulo.'],
      ['2024', 'Projeto ExpoSesc — Seleção Pública'],
      ['2024', 'Política Nacional Aldir Blanc — Fomento à Criação Artístico-Cultural'],
      ['2023', 'Prêmio Jovem Pesquisador — UFPB'],
      ['2023', 'Prêmio Aquisição — Bienal de Arte Contemporânea do Sesc'],
      ['2023', 'Prêmio Láurea Acadêmica — UFPB'],
      ['2023', 'Edital Projeto Panapaná — FUNESC'] ] },
    { t: { pt: 'Bolsas', es: 'Becas', en: 'Grants' }, itens: [
      ['2025 – atual', 'Bolsa de Mestrado — CAPES / FAPESQ-PB'],
      ['2021 – 2024', 'Bolsa de Apoio ao Desenvolvimento Tecnológico — FAPESQ-PB'],
      ['2022 – 2023', 'PIBIC — CNPq / UFPB'],
      ['2021', 'PROLICEN — UFPB'] ] },
  ],
};

// Texto da artista ("Concepto de las obras", referencias/Cuba FUNARTE 2026…pdf).
// Bio curta da artista e do curador: ainda não recebidas — completar aqui.
const SOBRE = {
  site: 'https://lonelas.com', // site principal da artista (confirmado)
  artista: {
    nome: 'Lohanna Lonelas',
    fotoCredito: 'O. F. Busatto', // nome do arquivo no Drive: "foto artista 01 por O F Busatto"
    fotoAlt: { pt: 'Retrato em preto e branco de Lohanna Lonelas, de chapéu e blusa pretos, diante de peças de tecido penduradas na parede', es: 'Retrato en blanco y negro de Lohanna Lonelas, con sombrero y blusa negros, frente a piezas de tela colgadas en la pared', en: 'Black-and-white portrait of Lohanna Lonelas, in a black hat and top, in front of fabric pieces hanging on the wall' },
    papel: { pt: 'artista visual, arte-educadora e pesquisadora', es: 'artista visual, arte-educadora e investigadora', en: 'visual artist, art educator and researcher' },
    // bio enviada por Lohanna em 07/11/2026 (pt original; es e en traduzidos)
    bio: {
      pt: ['Lonelas é artista visual, arte-educadora, pesquisadora e amazônida. Atualmente mora e trabalha em João Pessoa, Paraíba. Desenvolve instalações multimídia que investigam as relações entre corpo, ecologia e memória, articulando fotografia experimental, documentos e estruturas efêmeras.', 'Participou de exposições coletivas no Brasil e no exterior, como a Bienal Mundial de Arte e Fotografia para Estudantes, na Sérvia (2023), além de mostras em estados como São Paulo, Bahia e em diversas cidades da Paraíba (João Pessoa, Campina Grande, Guarabira). Em 2024, realizou sua primeira exposição individual, Eu Sonho: Exercícios entre o Hoje e o Amanhã, no Sesc Paraíba, como parte do projeto Expo Sesc. Já participou de programas de mentoria e residências como o II Entre II – Arte e Acesso (Itaú Cultural), (R)EXISTO e Arte Arapuca (PB). Atua também como arte-educadora em festivais e feiras literárias, como o Arte em Cena e a FLIrede, ambos desenvolvidos pela Secretaria de Educação do Estado da Paraíba, nos quais também integrou bancas de jurados.'],
      es: ['Lonelas es artista visual, arte-educadora, investigadora y amazónida. Actualmente vive y trabaja en João Pessoa, Paraíba. Desarrolla instalaciones multimedia que investigan las relaciones entre cuerpo, ecología y memoria, articulando fotografía experimental, documentos y estructuras efímeras.', 'Participó en exposiciones colectivas en Brasil y en el exterior, como la Bienal Mundial de Arte y Fotografía para Estudiantes, en Serbia (2023), además de muestras en estados como São Paulo, Bahia y en diversas ciudades de Paraíba (João Pessoa, Campina Grande, Guarabira). En 2024 realizó su primera exposición individual, Eu Sonho: Exercícios entre o Hoje e o Amanhã, en el Sesc Paraíba, como parte del proyecto Expo Sesc. Participó en programas de mentoría y residencias como II Entre II – Arte e Acesso (Itaú Cultural), (R)EXISTO y Arte Arapuca (PB). También trabaja como arte-educadora en festivales y ferias literarias, como Arte em Cena y FLIrede, ambos desarrollados por la Secretaría de Educación del Estado de Paraíba, en los que también integró jurados.'],
      en: ['Lonelas is a visual artist, art educator, researcher and Amazonian. She currently lives and works in João Pessoa, Paraíba. She makes multimedia installations that investigate the relations between body, ecology and memory, bringing together experimental photography, documents and ephemeral structures.', 'She has taken part in group exhibitions in Brazil and abroad, such as the World Biennial of Student Art and Photography in Serbia (2023), and in shows in São Paulo, Bahia and several cities in Paraíba (João Pessoa, Campina Grande, Guarabira). In 2024 she held her first solo exhibition, Eu Sonho: Exercícios entre o Hoje e o Amanhã, at Sesc Paraíba, as part of the Expo Sesc project. She has joined mentoring and residency programmes such as II Entre II – Arte e Acesso (Itaú Cultural), (R)EXISTO and Arte Arapuca (PB). She also works as an art educator at festivals and literary fairs such as Arte em Cena and FLIrede, both run by the Paraíba State Department of Education, where she has also served on juries.'],
    },
    texto: {
      es: ['Esta exposición reúne imágenes producidas durante un viaje por una región montañosa del nordeste de Brasil. En lugar de registrar el paisaje como un documento, me interesó recorrerlo desde la imaginación. Durante millones de años ese territorio estuvo cubierto por el mar. Hoy las montañas conservan rastros de ese pasado geológico y, al caminar por ellas, comencé a imaginar un océano que ya no existe. Las plantas adquirieron la apariencia de algas, las piedras se transformaron en arrecifes y el paisaje pasó a ser leído como un fósil vivo.', 'Las fotografías, los dibujos y las anotaciones realizadas durante el viaje fueron trasladados a tejidos translúcidos y convertidos en esculturas e instalaciones. Las obras no intentan reconstruir ese pasado. Proponen una cartografía imaginaria donde tiempos distintos conviven y donde la memoria deja de ser un registro fiel para convertirse en una forma de invención.', 'Presentar este proyecto en una institución que celebra cincuenta años también invita a pensar el papel de los museos y los centros culturales como lugares de preservación y, al mismo tiempo, de transformación de la memoria. Conservar no significa inmovilizar el pasado. Significa crear las condiciones para que nuevas generaciones de artistas produzcan otras lecturas del territorio, de la historia y de las imágenes que heredamos. Esta exposición nace precisamente de esa tensión entre recordar e imaginar.'],
      pt: ['Esta exposição reúne imagens produzidas durante uma viagem por uma região montanhosa do Nordeste do Brasil. Em vez de registrar a paisagem como um documento, me interessou percorrê-la a partir da imaginação. Durante milhões de anos esse território esteve coberto pelo mar. Hoje as montanhas guardam rastros desse passado geológico e, ao caminhar por elas, comecei a imaginar um oceano que já não existe. As plantas ganharam a aparência de algas, as pedras se transformaram em recifes e a paisagem passou a ser lida como um fóssil vivo.', 'As fotografias, os desenhos e as anotações feitos durante a viagem foram transferidos para tecidos translúcidos e transformados em esculturas e instalações. As obras não tentam reconstruir esse passado. Propõem uma cartografia imaginária onde tempos distintos convivem e onde a memória deixa de ser um registro fiel para se tornar uma forma de invenção.', 'Apresentar este projeto em uma instituição que celebra cinquenta anos também convida a pensar o papel dos museus e dos centros culturais como lugares de preservação e, ao mesmo tempo, de transformação da memória. Conservar não significa imobilizar o passado. Significa criar as condições para que novas gerações de artistas produzam outras leituras do território, da história e das imagens que herdamos. Esta exposição nasce justamente dessa tensão entre lembrar e imaginar.'],
      en: ['This exhibition brings together images made during a journey through a mountainous region of north-eastern Brazil. Rather than recording the landscape as a document, I wanted to travel through it with the imagination. For millions of years this territory lay under the sea. Today the mountains hold traces of that geological past and, walking through them, I began to imagine an ocean that no longer exists. Plants took on the look of algae, stones turned into reefs, and the landscape came to be read as a living fossil.', 'The photographs, drawings and notes made during the journey were transferred onto translucent fabrics and turned into sculptures and installations. The works do not try to rebuild that past. They propose an imaginary cartography where different times coexist and where memory stops being a faithful record and becomes a form of invention.', 'Presenting this project at an institution celebrating its fiftieth anniversary also invites us to think about museums and cultural centres as places of preservation and, at the same time, of transformation of memory. To preserve is not to freeze the past. It is to create the conditions for new generations of artists to produce other readings of territory, history and the images we inherit. This exhibition is born precisely from that tension between remembering and imagining.'],
    },
  },
  curador: {
    nome: 'Maycon Albuquerque',
    instagram: 'https://www.instagram.com/myycnn',
    fotoAlt: { pt: 'Retrato em preto e branco de Maycon Albuquerque, sorrindo, de camisa listrada, diante de quadros na parede', es: 'Retrato en blanco y negro de Maycon Albuquerque, sonriendo, con camisa a rayas, frente a cuadros en la pared', en: 'Black-and-white portrait of Maycon Albuquerque, smiling, in a striped shirt, in front of framed works on the wall' },
    papel: { pt: 'artista visual e curador', es: 'artista visual y curador', en: 'visual artist and curator' },
    // mini bio enviada por Lohanna em 07/11/2026 (pt original; es e en traduzidos)
    bio: {
      pt: ['Maycon Albuquerque (1997, João Pessoa, PB) é artista visual, bacharel e licenciado em Artes Visuais e mestre em Artes Visuais pelo PPGAV UFPB/UFPE. Sua pesquisa nasce do interesse pelas marcas que o tempo e o abandono deixam sobre a cidade, conduzindo a uma produção que cruza fotografia, lambe e impressão sobre suportes não convencionais, como madeira, concreto, tecido, metal e tapumes. Reside e trabalha em João Pessoa. Participou de exposições individuais como “Resquícios” (FUNESC, 2025) e “Concluído, inaugurado e funcionando...” (SESC-PB, 2021), além de mostras coletivas como “Existências (in)visíveis” (Estação Cabo Branco, 2025), a II Bienal de Arte Contemporânea do SESC (SESC-PB, 2023) e o XVII Salão Municipal de Artes Plásticas – SAMAP (Galeria Casarão 34, 2022), entre outras. É premiado em editais como Arte na Bagagem (Secult/PB, 2024) e Arte em Toda Parte (FUNARTE, 2020).'],
      es: ['Maycon Albuquerque (1997, João Pessoa, PB) es artista visual, licenciado en Artes Visuales y magíster en Artes Visuales por el PPGAV UFPB/UFPE. Su investigación nace del interés por las marcas que el tiempo y el abandono dejan sobre la ciudad, y lo lleva a una producción que cruza fotografía, lambe-lambe e impresión sobre soportes no convencionales, como madera, hormigón, tela, metal y vallas de obra. Vive y trabaja en João Pessoa. Realizó exposiciones individuales como “Resquícios” (FUNESC, 2025) y “Concluído, inaugurado e funcionando...” (SESC-PB, 2021), y participó en muestras colectivas como “Existências (in)visíveis” (Estação Cabo Branco, 2025), la II Bienal de Arte Contemporáneo del SESC (SESC-PB, 2023) y el XVII Salón Municipal de Artes Plásticas – SAMAP (Galeria Casarão 34, 2022), entre otras. Fue premiado en convocatorias como Arte na Bagagem (Secult/PB, 2024) y Arte em Toda Parte (FUNARTE, 2020).'],
      en: ['Maycon Albuquerque (1997, João Pessoa, PB) is a visual artist with a bachelor’s degree and teaching degree in Visual Arts and a master’s in Visual Arts from PPGAV UFPB/UFPE. His research grows from an interest in the marks that time and neglect leave on the city, leading to work that combines photography, paste-ups and printing on unconventional surfaces such as wood, concrete, fabric, metal and hoardings. He lives and works in João Pessoa. His solo exhibitions include “Resquícios” (FUNESC, 2025) and “Concluído, inaugurado e funcionando...” (SESC-PB, 2021), and he has shown in group exhibitions such as “Existências (in)visíveis” (Estação Cabo Branco, 2025), the 2nd SESC Contemporary Art Biennial (SESC-PB, 2023) and the 17th Municipal Visual Arts Salon – SAMAP (Galeria Casarão 34, 2022), among others. He has received awards such as Arte na Bagagem (Secult/PB, 2024) and Arte em Toda Parte (FUNARTE, 2020).'],
    },
  },
  logos: [
    { img: 'apoio/apoio', rot: 'apoio', alt: 'Funarte Brasil Conexões Internacionais · Mobilidade Artística · Funarte 50 anos · Ministério da Cultura · Governo do Brasil' },
    { img: 'apoio/colaboracao', rot: 'colaboracao', alt: 'Ateliê Lonelas · Consejo Provincial de Artes Plásticas Santiago de Cuba · Centro de Arte Santiago de Cuba · Taller Cultural 50 aniversario · Taller Cultural' },
  ],
};
