// Conteúdo do site, em português (pt) e espanhol (es).
// Para acrescentar fotos da exposição em Cuba, coloque o arquivo em img/cuba/
// e acrescente uma linha na lista "imagens" da obra correspondente, em EXPOSICAO.

const TEXTOS = {
  pt: {
    titulo: 'O Mar e a Escada',
    subtitulo: 'Bitácoras do Brejo Paraibano',
    nav: { inicio: 'Início', bitacora: 'Bitácora', esquecimento: 'Exercícios de esquecimento', exposicao: 'Exposição' },
    trocarIdioma: 'Español',
    abertura: 'Abertura 19.11.2026 · Taller Cultural Luis Díaz Oduardo · Santiago de Cuba',
    entrar: 'Embarcar',
    intro: [
      'Durante uma viagem pelo Brejo Paraibano, região de relevo alto e úmido, pouco presente no imaginário mais difundido sobre o Nordeste brasileiro, Lonelas encontrou vestígios fósseis que a levaram a imaginar um antigo oceano. Entre pedras, vegetação e escadarias naturais, a artista começou a se perguntar como suas lembranças daquela paisagem poderiam dialogar com outras eras, anteriores à própria experiência humana.',
      'Fotografias, desenhos e anotações deram origem a fanzines pensados como bitácoras, diários de bordo usados para registrar percursos e acontecimentos de uma viagem. Essas imagens se reorganizam em esculturas e instalações que transitam entre o documento e a ficção, propondo exercícios de memória e esquecimento. A exposição convida o público a imaginar aquilo que não pôde presenciar.',
      'Realizada com a Bolsa de Mobilidade FUNARTE 2026, no Taller Cultural Luis Díaz Oduardo, em Santiago de Cuba, a exposição retoma uma história de intercâmbios artísticos entre a Paraíba e Cuba. Na década de 1990, o Núcleo de Arte Contemporânea da Universidade Federal da Paraíba, em João Pessoa, já participava dessa circulação cultural. Agora, a artista faz o caminho até Cuba, levando consigo outras paisagens e memórias do Nordeste brasileiro.'
    ],
    assinatura: 'Maycon Albuquerque, historiador da arte e artista visual',
    conceitoTitulo: 'Navegar num fóssil de oceano',
    conceito: [
      'A série nasce da residência artística O Homem, o Mar e a Escada, realizada em 2025 no Brejo Paraibano com apoio da Política Nacional Aldir Blanc, tendo como referência a poesia de Augusto dos Anjos. Ela fala da fragilidade da memória, do tempo geológico e de contemplar uma paisagem que já não existe.',
      'Durante milhões de anos aquele território esteve coberto pelo mar. Ao caminhar por suas serras, as plantas ganharam aparência de algas, as pedras viraram recifes e a paisagem passou a ser lida como um fóssil vivo. Conservar não significa imobilizar o passado: esta exposição nasce da tensão entre lembrar e imaginar.'
    ],
    areas: {
      bitacora: 'Os quatro fanzines e as 16 colagens do diário de bordo.',
      esquecimento: 'Escolha um fragmento da paisagem e receba uma instrução para esquecer.',
      exposicao: 'As obras da exposição em Santiago de Cuba e da série no Brasil.'
    },
    bitacoraTitulo: 'Bitácora',
    bitacoraIntro: 'O núcleo da pesquisa são 16 colagens que unem fotografia experimental, desenho, escrita manuscrita e trechos de poemas de Augusto dos Anjos. Agrupadas, elas formam quatro fanzines, diários de bordo de uma navegação por um mar que já não existe.',
    fanzine: 'Fanzine',
    poema: 'A partir do poema',
    pagina: 'página',
    de: 'de',
    anterior: 'Anterior',
    proxima: 'Próxima',
    voltarBitacora: 'Voltar aos fanzines',
    fechar: 'Fechar',
    ampliar: 'Ampliar',
    esquecimentoTitulo: 'Exercícios de esquecimento',
    esquecimentoIntro: 'Na instalação, o público pega um pedaço de papel, lê a instrução impressa no alto, escreve algo que gostaria de esquecer (um nome, um lugar, um dia) e amarra o papel à estrutura. Aqui, a paisagem foi recortada em fragmentos. Escolha um.',
    esquecimentoAviso: 'Nada do que você escreve é enviado ou guardado.',
    contador: (n, t) => `${n} de ${t} fragmentos esquecidos`,
    escreva: 'Escreva aqui o que você quer esquecer',
    esquecer: 'Amarrar e soltar',
    desistir: 'Agora não',
    fimTitulo: 'A paisagem foi esquecida.',
    fimTexto: 'Restou o mar de antes da paisagem. O que escolhemos lembrar, e o que precisamos desaprender para continuar subindo a nossa própria escada?',
    recomecar: 'Recomeçar',
    categorias: { nome: 'Um nome', lugar: 'Um lugar', dia: 'Um dia' },
    mar: {
      nav: 'O mar',
      convite: 'Aperte uma das linhas e receba um ritual de esquecimento. As linhas com ícone são exercícios para fazer no seu aparelho.',
      lembrar: 'Antes de esquecer, é preciso lembrar.',
      lembrei: 'Lembrei',
      feito: 'Feito',
      soltar: 'Soltar',
      naoFecha: 'não fecha',
      fita: 'Contas anteriores',
      contador: (n, t) => `${n} de ${t} linhas esquecidas`
    },
    exposicaoTitulo: 'Exposição',
    cubaTitulo: 'Llegadas (Cheganças), Santiago de Cuba, 2026',
    cubaInfo: 'Taller Cultural Luis Díaz Oduardo · Bolsa de Mobilidade FUNARTE 2026 · Abertura em 19 de novembro de 2026',
    simulacao: 'Simulação 3D',
    planta: 'Planta da sala',
    brasilTitulo: 'O Homem, o Mar e a Escada, Paraíba, 2025',
    brasilInfo: 'Exposição virtual e ativações públicas · Política Nacional Aldir Blanc',
    rodape: 'Lonelas (Lohanna Oliveira) · Todos os direitos reservados às obras e imagens.'
  },
  es: {
    titulo: 'El mar y la escalera',
    subtitulo: 'Bitácoras del Brejo Paraibano',
    nav: { inicio: 'Inicio', bitacora: 'Bitácora', esquecimento: 'Ejercicios de olvido', exposicao: 'Exposición' },
    trocarIdioma: 'Português',
    abertura: 'Inauguración 19.11.2026 · Taller Cultural Luis Díaz Oduardo · Santiago de Cuba',
    entrar: 'Embarcar',
    intro: [
      'Durante un viaje por el Brejo Paraibano, una región de relieve elevado y húmedo, poco presente en el imaginario más extendido sobre el Nordeste brasileño, Lonelas encontró vestigios fósiles que la llevaron a imaginar un antiguo océano. Entre piedras, vegetación y escalinatas naturales, la artista comenzó a preguntarse cómo sus recuerdos de aquel paisaje podrían dialogar con otras eras, anteriores a la propia experiencia humana.',
      'Fotografías, dibujos y anotaciones dieron origen a fanzines concebidos como bitácoras, diarios de a bordo utilizados para registrar recorridos y acontecimientos de un viaje. Estas imágenes se reorganizan en esculturas e instalaciones que transitan entre el documento y la ficción, proponiendo ejercicios de memoria y olvido. La exposición invita al público a imaginar aquello que no pudo presenciar.',
      'Realizada gracias a la Beca de Movilidad FUNARTE 2026, en el Taller Cultural Luis Díaz Oduardo, en Santiago de Cuba, la exposición retoma una historia de intercambios artísticos entre Paraíba y Cuba. En la década de 1990, el Núcleo de Arte Contemporânea de la Universidade Federal da Paraíba, en João Pessoa, ya participaba en esta circulación cultural. Ahora, la artista emprende el camino hacia Cuba, llevando consigo otros paisajes y memorias del Nordeste brasileño.'
    ],
    assinatura: 'Maycon Albuquerque, historiador del arte y artista visual',
    conceitoTitulo: 'Navegar en un fósil de océano',
    conceito: [
      'La serie nace de la residencia artística O Homem, o Mar e a Escada, realizada en 2025 en el Brejo Paraibano con el apoyo de la Política Nacional Aldir Blanc, a partir de la poesía de Augusto dos Anjos. Habla de la fragilidad de la memoria, del tiempo geológico y de contemplar un paisaje que ya no existe.',
      'Durante millones de años ese territorio estuvo cubierto por el mar. Al caminar por sus montañas, las plantas adquirieron la apariencia de algas, las piedras se transformaron en arrecifes y el paisaje pasó a ser leído como un fósil vivo. Conservar no significa inmovilizar el pasado: esta exposición nace de la tensión entre recordar e imaginar.'
    ],
    areas: {
      bitacora: 'Los cuatro fanzines y los 16 collages del diario de a bordo.',
      esquecimento: 'Elige un fragmento del paisaje y recibe una instrucción para olvidar.',
      exposicao: 'Las obras de la exposición en Santiago de Cuba y de la serie en Brasil.'
    },
    bitacoraTitulo: 'Bitácora',
    bitacoraIntro: 'El núcleo de la investigación son 16 collages que unen fotografía experimental, dibujo, escritura manuscrita y fragmentos de poemas de Augusto dos Anjos. Agrupados, forman cuatro fanzines, diarios de a bordo de una navegación por un mar que ya no existe.',
    fanzine: 'Fanzine',
    poema: 'A partir del poema',
    pagina: 'página',
    de: 'de',
    anterior: 'Anterior',
    proxima: 'Siguiente',
    voltarBitacora: 'Volver a los fanzines',
    fechar: 'Cerrar',
    ampliar: 'Ampliar',
    esquecimentoTitulo: 'Ejercicios de olvido',
    esquecimentoIntro: 'En la instalación, el público toma un papel, lee la instrucción impresa en la parte superior, escribe algo que le gustaría olvidar (un nombre, un lugar, un día) y ata el papel a la estructura. Aquí, el paisaje fue recortado en fragmentos. Elige uno.',
    esquecimentoAviso: 'Nada de lo que escribes se envía ni se guarda.',
    contador: (n, t) => `${n} de ${t} fragmentos olvidados`,
    escreva: 'Escribe aquí lo que quieres olvidar',
    esquecer: 'Atar y soltar',
    desistir: 'Ahora no',
    fimTitulo: 'El paisaje fue olvidado.',
    fimTexto: 'Quedó el mar de antes del paisaje. ¿Qué elegimos recordar, y qué necesitamos desaprender para seguir subiendo nuestra propia escalera?',
    recomecar: 'Empezar de nuevo',
    categorias: { nome: 'Un nombre', lugar: 'Un lugar', dia: 'Un día' },
    mar: {
      nav: 'El mar',
      convite: 'Toca una de las líneas y recibe un ritual de olvido. Las líneas con ícono son ejercicios para hacer en tu aparato.',
      lembrar: 'Antes de olvidar, hay que recordar.',
      lembrei: 'Recordé',
      feito: 'Hecho',
      soltar: 'Soltar',
      naoFecha: 'no cierra',
      fita: 'Cuentas anteriores',
      contador: (n, t) => `${n} de ${t} líneas olvidadas`
    },
    exposicaoTitulo: 'Exposición',
    cubaTitulo: 'Llegadas (Cheganças), Santiago de Cuba, 2026',
    cubaInfo: 'Taller Cultural Luis Díaz Oduardo · Beca de Movilidad FUNARTE 2026 · Inauguración el 19 de noviembre de 2026',
    simulacao: 'Simulación 3D',
    planta: 'Plano de la sala',
    brasilTitulo: 'O Homem, o Mar e a Escada, Paraíba, 2025',
    brasilInfo: 'Exposición virtual y activaciones públicas · Política Nacional Aldir Blanc',
    rodape: 'Lonelas (Lohanna Oliveira) · Todos los derechos reservados sobre las obras e imágenes.'
  }
};

const col = n => `img/colagens/${n}.webp`;

const FANZINES = [
  {
    id: 'brejo-i', titulo: { pt: 'Brejo I', es: 'Brejo I' }, poema: 'Queixas Noturnas',
    imagens: ['brejo-01', 'brejo-02', 'brejo-03', 'brejo-04'].map(col),
    texto: {
      pt: 'Primeiro conjunto de colagens, inspirado no poema Queixas Noturnas, de Augusto dos Anjos. As imagens misturam registros das cidades do Brejo Paraibano (serras, engenhos, texturas orgânicas) com ilustrações e fragmentos de escrita, criando uma paisagem que oscila entre memória e fabulação.',
      es: 'Primer conjunto de collages, inspirado en el poema Queixas Noturnas, de Augusto dos Anjos. Las imágenes mezclan registros de las ciudades del Brejo Paraibano (sierras, ingenios, texturas orgánicas) con ilustraciones y fragmentos de escritura, creando un paisaje que oscila entre memoria y fabulación.'
    }
  },
  {
    id: 'brejo-ii', titulo: { pt: 'Brejo II', es: 'Brejo II' }, poema: 'Queixas Noturnas',
    imagens: ['brejo-05', 'brejo-06', 'brejo-07', 'brejo-08'].map(col),
    texto: {
      pt: 'Continuação do políptico do Brejo: igrejas, oratórios, moinhos e o passado histórico da região de Areia, sobrepostos à paisagem atual e à letra manuscrita do diário de viagem.',
      es: 'Continuación del políptico del Brejo: iglesias, oratorios, molinos y el pasado histórico de la región de Areia, superpuestos al paisaje actual y a la letra manuscrita del diario de viaje.'
    }
  },
  {
    id: 'mangue', titulo: { pt: 'Mangue', es: 'Manglar' }, poema: 'Alucinação à Beira-Mar',
    imagens: ['mangue-01', 'mangue-02', 'mangue-03', 'mangue-04'].map(col),
    texto: {
      pt: 'Inspirado no poema Alucinação à Beira-Mar, este fanzine mergulha no manguezal como paisagem-limite. As imagens combinam raízes, lama, folhagens, resíduos urbanos, fragmentos de cartas e desenhos.',
      es: 'Inspirado en el poema Alucinação à Beira-Mar, este fanzine se sumerge en el manglar como paisaje límite. Las imágenes combinan raíces, lodo, follajes, residuos urbanos, fragmentos de cartas y dibujos.'
    }
  },
  {
    id: 'costa', titulo: { pt: 'Costa / Oceano', es: 'Costa / Océano' }, poema: 'O Mar, o Homem e a Escada',
    imagens: ['costa-01', 'costa-02', 'costa-03', 'costa-04'].map(col),
    texto: {
      pt: 'Este conjunto une mar, escada e corpo, inspirado no poema O Mar, o Homem e a Escada. Combina imagens coletadas no Brejo com fotografias do litoral, propondo um fluxo contínuo entre interior e costa. A escada aparece como metáfora do esforço humano de acessar o que está sempre em movimento: a água, a memória, o tempo.',
      es: 'Este conjunto une mar, escalera y cuerpo, inspirado en el poema O Mar, o Homem e a Escada. Combina imágenes recogidas en el Brejo con fotografías del litoral, proponiendo un flujo continuo entre el interior y la costa. La escalera aparece como metáfora del esfuerzo humano por alcanzar lo que está siempre en movimiento: el agua, la memoria, el tiempo.'
    }
  }
];

// Instruções provisórias, escritas a partir da obra: trocar pelas que estão impressas nos papéis da instalação.
// "recorte" diz qual colagem e qual parte dela (x e y em %) aparece no fragmento.
const INSTRUCOES = [
  { cat: 'nome', recorte: ['brejo-01', 30, 40],
    pt: 'Escreva o nome que você quer esquecer. Repita-o baixinho até que vire só som, sem dono.',
    es: 'Escribe el nombre que quieres olvidar. Repítelo en voz baja hasta que sea solo sonido, sin dueño.' },
  { cat: 'lugar', recorte: ['costa-02', 60, 40],
    pt: 'Escreva o nome de um lugar. Imagine-o coberto de água, há milhões de anos, antes de ter nome.',
    es: 'Escribe el nombre de un lugar. Imagínalo cubierto de agua, hace millones de años, antes de tener nombre.' },
  { cat: 'dia', recorte: ['mangue-02', 50, 60],
    pt: 'Escreva uma data. Some os algarismos até restar um só. Guarde apenas esse número.',
    es: 'Escribe una fecha. Suma las cifras hasta que quede una sola. Guarda solo ese número.' },
  { cat: 'nome', recorte: ['brejo-06', 25, 55],
    pt: 'Escreva o nome de trás para frente. Leia o que restou como uma palavra de outra língua.',
    es: 'Escribe el nombre al revés. Lee lo que queda como una palabra de otro idioma.' },
  { cat: 'lugar', recorte: ['costa-01', 30, 50],
    pt: 'Descreva a vista que você tem agora. Depois troque cada coisa: a pedra vira recife, a planta vira alga.',
    es: 'Describe la vista que tienes ahora. Luego cambia cada cosa: la piedra se vuelve arrecife, la planta se vuelve alga.' },
  { cat: 'dia', recorte: ['brejo-03', 55, 35],
    pt: 'Escreva o dia que você quer esquecer. Pense que, para uma pedra, ele não durou nem um instante.',
    es: 'Escribe el día que quieres olvidar. Piensa que, para una piedra, no duró ni un instante.' },
  { cat: 'nome', recorte: ['mangue-03', 45, 45],
    pt: 'Escreva o nome só com as vogais. O que sobra já não chama ninguém.',
    es: 'Escribe el nombre solo con las vocales. Lo que queda ya no llama a nadie.' },
  { cat: 'lugar', recorte: ['brejo-04', 60, 50],
    pt: 'Escreva um caminho que você faz sempre. Amanhã, faça outro.',
    es: 'Escribe un camino que haces siempre. Mañana, toma otro.' },
  { cat: 'dia', recorte: ['costa-03', 40, 40],
    pt: 'Conte o que aconteceu naquele dia como uma previsão do tempo: nublado, maré alta, vento leste.',
    es: 'Cuenta lo que pasó aquel día como un pronóstico del tiempo: nublado, marea alta, viento del este.' },
  { cat: 'nome', recorte: ['brejo-07', 30, 45],
    pt: 'Escreva o nome e, para cada letra, pense numa coisa do mar: uma alga, uma concha, um coral. Deixe que o mar fique com ele.',
    es: 'Escribe el nombre y, por cada letra, piensa en algo del mar: un alga, una concha, un coral. Deja que el mar se lo quede.' },
  { cat: 'lugar', recorte: ['mangue-04', 55, 50],
    pt: 'Escreva o lugar onde algo aconteceu. Imagine a escada que leva até ele e desça um degrau de cada vez.',
    es: 'Escribe el lugar donde algo pasó. Imagina la escalera que lleva hasta él y baja un escalón a la vez.' },
  { cat: 'dia', recorte: ['costa-04', 35, 55],
    pt: 'Escreva a hora em que tudo começou. Quando essa hora chegar de novo, faça outra coisa.',
    es: 'Escribe la hora en que todo empezó. Cuando esa hora llegue de nuevo, haz otra cosa.' }
];

const cuba = n => `img/cuba/${n}.webp`;

const EXPOSICAO = {
  cuba: [
    {
      titulo: 'Llegadas Zines', ano: '2025',
      ficha: {
        pt: 'Instalação com 24 fanzines para manipulação, suporte de madeira e cordas de sisal. Dimensões variáveis.',
        es: 'Instalación con 24 fanzines para manipulación, soporte de madera y cuerdas de sisal. Dimensiones variables.'
      },
      texto: {
        pt: 'Os fanzines ficam presos à parede por um cordão de sisal, junto ao texto de sala, perto da entrada. O público escolhe um exemplar, folheia e o devolve ao lugar.',
        es: 'Los fanzines permanecen sujetos a la pared mediante un cordón de sisal, junto al texto de sala, cerca de la entrada. El público elige un ejemplar, lo hojea y lo vuelve a colocar en su lugar.'
      },
      imagens: [{ src: cuba('zines-detalhe') }, { src: cuba('sim-zines'), sim: true }, { src: cuba('sim-zines-mao'), sim: true }]
    },
    {
      titulo: 'Escadaria', ano: '2026',
      ficha: {
        pt: 'Instalação. Sublimação sobre tecido, fotografia experimental, corda de sisal e rede decorativa. Dimensões variáveis.',
        es: 'Instalación. Sublimación sobre tejido, fotografía experimental, cuerda de sisal y red decorativa. Dimensiones variables.'
      },
      imagens: [{ src: cuba('escadaria') }, { src: cuba('escadaria-detalhe') }, { src: cuba('sim-escadaria'), sim: true }, { src: cuba('sim-escadaria-2'), sim: true }]
    },
    {
      titulo: 'Fósseis, espadas e outras lembranças', ano: '2026',
      ficha: {
        pt: 'Instalação. Sublimação sobre tecido, madeira de pinho e corda de sisal. Dimensões variáveis, adaptáveis ao espaço expositivo.',
        es: 'Instalación. Sublimación sobre tejido, madera de pino y cuerda de sisal. Dimensiones variables, adaptables al espacio expositivo.'
      },
      imagens: [{ src: cuba('fosseis') }, { src: cuba('fosseis-detalhe') }, { src: cuba('sim-fosseis'), sim: true }, { src: cuba('sim-fosseis-2'), sim: true }]
    },
    {
      titulo: 'Ejercicio de olvido', ano: '2026',
      ficha: {
        pt: 'Instalação interativa e site-specific. Varas de bambu, corda de sisal, papéis impressos e lápis. Dimensões variáveis.',
        es: 'Instalación interactiva y site-specific. Varillas de bambú, cuerda de sisal, papeles impresos y lápices. Dimensiones variables.'
      },
      texto: {
        pt: 'A instalação convida o público a escrever nos papéis algo que gostaria de esquecer: um nome, um lugar, uma data ou outra lembrança. As instruções estão impressas no alto de cada papel. Depois de escrever, o visitante amarra o papel à estrutura, transformando a obra ao longo da exposição.',
        es: 'La instalación invita al público a escribir en los papeles disponibles algo que le gustaría olvidar: un nombre, un lugar, una fecha u otro recuerdo. Las instrucciones de participación están impresas en la parte superior de cada papel. Después de escribir, el visitante ata el papel a la estructura, contribuyendo a la transformación de la obra a lo largo de la exposición.'
      },
      imagens: [{ src: cuba('olvido') }, { src: cuba('olvido-gesto') }, { src: cuba('sim-olvido'), sim: true }, { src: cuba('sim-olvido-2'), sim: true }, { src: cuba('sim-lapis'), sim: true }]
    }
  ],
  brasil: [
    {
      titulo: 'As Escadarias I a IX', ano: '2025',
      ficha: {
        pt: 'Fotografia experimental impressa em papel reciclável, cortada em tiras; colagem; estrutura em bambu; corda de sisal. Aprox. 60 × 30 cm cada. Brejo (I a III), Mangue (IV a VI) e Mar (VII a IX).',
        es: 'Fotografía experimental impresa en papel reciclable, cortada en tiras; collage; estructura de bambú; cuerda de sisal. Aprox. 60 × 30 cm cada una. Brejo (I a III), Manglar (IV a VI) y Mar (VII a IX).'
      },
      texto: {
        pt: 'A série nasce do desejo de transformar o fanzine em objeto tridimensional. O formato vem do balão de São João, um objeto suspenso que depende de uma escada invisível: delicadas demais para sustentar um corpo, resistentes apenas o suficiente para sustentar uma memória.',
        es: 'La serie nace del deseo de transformar el fanzine en objeto tridimensional. La forma viene del globo de San Juan, un objeto suspendido que depende de una escalera invisible: demasiado delicadas para sostener un cuerpo, resistentes apenas lo suficiente para sostener una memoria.'
      },
      imagens: Array.from({ length: 9 }, (_, i) => ({ src: `img/escadarias/escadaria-0${i + 1}.webp` }))
    },
    {
      titulo: 'Exercícios de Esquecimento I a III', ano: '2025',
      ficha: {
        pt: '“Um nome”, “Um lugar” e “Um dia”. Instalações efêmeras coletivas: tiras de fotografia experimental em papel reciclável, bambu, corda de sisal, grafite e tinta. EcoBosque do Jardim Oceania, João Pessoa, 5 de dezembro de 2025.',
        es: '“Un nombre”, “Un lugar” y “Un día”. Instalaciones efímeras colectivas: tiras de fotografía experimental en papel reciclable, bambú, cuerda de sisal, grafito y tinta. EcoBosque del Jardim Oceania, João Pessoa, 5 de diciembre de 2025.'
      },
      texto: {
        pt: 'Cápsulas de esquecimento efêmeras: em vez de guardar memórias para o futuro, convidaram 16 participantes a escrever no verso das tiras fotográficas o que desejavam deixar ir.',
        es: 'Cápsulas de olvido efímeras: en lugar de guardar memorias para el futuro, invitaron a 16 participantes a escribir en el reverso de las tiras fotográficas aquello que deseaban dejar ir.'
      },
      imagens: ['um-nome', 'um-lugar', 'um-dia', 'ativacao-01', 'ativacao-02', 'ativacao-03', 'ativacao-04'].map(n => ({ src: `img/exercicios/${n}.webp` }))
    },
    {
      titulo: 'Fanzines e testes', ano: '2025',
      ficha: {
        pt: 'Primeiros fanzines da série, impressos em A4 e guardados num pequeno baú durante a oficina dos Exercícios de Esquecimento.',
        es: 'Primeros fanzines de la serie, impresos en A4 y guardados en un pequeño baúl durante el taller de los Ejercicios de Olvido.'
      },
      imagens: [{ src: col('fanzines-teste') }]
    }
  ]
};
