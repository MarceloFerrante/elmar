// Os 8 exercícios digitais (vindos de ~/exercicios-de-esquecimentos), em pt/es.
// Cada um ocupa uma linha vazia do mar: linha [colagem, N]. Se um ritual do doc
// ganhar esse código depois, o exercício passa para a última linha livre da colagem.
// "dentro": o exercício acontece no próprio site (a calculadora).
// Espanhol: tradução minha, a revisar.

const ICONES = {
  calculadora: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><rect x="8" y="5.5" width="8" height="3.5" rx=".5"/><path d="M8.5 13h0M12 13h0M15.5 13h0M8.5 16.5h0M12 16.5h0M15.5 16.5h0"/>',
  teclado: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h0M9 10h0M12 10h0M15 10h0M18 10h0M7 14h10"/>',
  foco: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><circle cx="12" cy="12" r="3"/>',
  mapa: '<path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  relogio: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
  copiar: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  desligar: '<path d="M12 3v8"/><path d="M6.3 7a8 8 0 1 0 11.4 0"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>'
};

const EXERCICIOS = [
  {
    id: 'dissolver', icone: 'calculadora', linha: ['02', 10], dentro: true,
    pt: {
      verbo: 'Dissolver', titulo: 'A conta que não fecha', dispositivo: 'Calculadora',
      evocacao: 'Escolha uma data que você gostaria de esquecer.',
      passos: [
        'Digite essa data na calculadora como uma sequência de números.',
        'Faça operações livres: some, subtraia, divida, multiplique.',
        'Continue até que o resultado já não se pareça com a data inicial.',
        'Subtraia o último resultado dele mesmo.',
        'Observe o zero na tela antes de limpar a calculadora.'
      ],
      conceito: 'A memória é submetida a operações matemáticas que dissolvem sua referência inicial. O zero funciona como representação simbólica de uma ausência, embora o gesto de calcular também seja uma maneira de revisitar aquilo que se deseja esquecer.'
    },
    es: {
      verbo: 'Disolver', titulo: 'La cuenta que no cierra', dispositivo: 'Calculadora',
      evocacao: 'Elige una fecha que te gustaría olvidar.',
      passos: [
        'Escribe esa fecha en la calculadora como una secuencia de números.',
        'Haz operaciones libres: suma, resta, divide, multiplica.',
        'Sigue hasta que el resultado ya no se parezca a la fecha inicial.',
        'Resta el último resultado de sí mismo.',
        'Observa el cero en la pantalla antes de limpiar la calculadora.'
      ],
      conceito: 'La memoria se somete a operaciones matemáticas que disuelven su referencia inicial. El cero funciona como representación simbólica de una ausencia, aunque el gesto de calcular también sea una manera de volver a aquello que se desea olvidar.'
    }
  },
  {
    id: 'distorcer', icone: 'teclado', linha: ['03', 10],
    pt: {
      verbo: 'Distorcer', titulo: 'Escrever até esquecer', dispositivo: 'Teclado e corretor automático',
      evocacao: 'Pense em uma palavra associada a alguma lembrança.',
      passos: [
        'Abra um campo de escrita no seu aparelho.',
        'Escreva a palavra.',
        'A partir dela, construa uma frase usando apenas as sugestões do teclado.',
        'Continue aceitando sugestões até que a frase se distancie da sua intenção original.',
        'Leia o resultado.',
        'Apague o texto.'
      ],
      conceito: 'O exercício desloca a autoria da lembrança para um sistema de previsão linguística. O algoritmo participa da reescrita da memória, produzindo associações inesperadas. Esquecer torna-se deformação narrativa, e não eliminação.'
    },
    es: {
      verbo: 'Distorsionar', titulo: 'Escribir hasta olvidar', dispositivo: 'Teclado y corrector automático',
      evocacao: 'Piensa en una palabra asociada a algún recuerdo.',
      passos: [
        'Abre un campo de escritura en tu aparato.',
        'Escribe la palabra.',
        'A partir de ella, construye una frase usando solo las sugerencias del teclado.',
        'Sigue aceptando sugerencias hasta que la frase se aleje de tu intención original.',
        'Lee el resultado.',
        'Borra el texto.'
      ],
      conceito: 'El ejercicio desplaza la autoría del recuerdo hacia un sistema de predicción lingüística. El algoritmo participa en la reescritura de la memoria y produce asociaciones inesperadas. Olvidar se vuelve deformación narrativa, y no eliminación.'
    }
  },
  {
    id: 'desfocar', icone: 'foco', linha: ['04', 10],
    pt: {
      verbo: 'Desfocar', titulo: 'Uma imagem que já não reconheço', dispositivo: 'Galeria de fotografias',
      evocacao: 'Escolha uma fotografia.',
      passos: [
        'Abra a fotografia e observe-a por alguns segundos, procurando seus detalhes.',
        'Amplie a imagem aos poucos, até não reconhecer mais a cena.',
        'Fique um tempo olhando apenas cores, pixels, texturas e fragmentos.',
        'Feche a imagem sem voltar a vê-la inteira.'
      ],
      conceito: 'A imagem continua armazenada, mas deixa por um momento de funcionar como representação reconhecível. O esquecimento é experimentado como perda de contexto, uma abstração voluntária.'
    },
    es: {
      verbo: 'Desenfocar', titulo: 'Una imagen que ya no reconozco', dispositivo: 'Galería de fotografías',
      evocacao: 'Elige una fotografía.',
      passos: [
        'Abre la fotografía y obsérvala unos segundos, buscando sus detalles.',
        'Amplía la imagen poco a poco, hasta no reconocer más la escena.',
        'Quédate un tiempo mirando solo colores, píxeles, texturas y fragmentos.',
        'Cierra la imagen sin volver a verla entera.'
      ],
      conceito: 'La imagen sigue guardada, pero por un momento deja de funcionar como representación reconocible. El olvido se experimenta como pérdida de contexto, una abstracción voluntaria.'
    }
  },
  {
    id: 'afastar', icone: 'mapa', linha: ['05', 10],
    pt: {
      verbo: 'Afastar', titulo: 'Geografia de uma ausência', dispositivo: 'Aplicativo de mapas',
      evocacao: 'Pense em um lugar associado a uma lembrança.',
      passos: [
        'Procure esse lugar no mapa.',
        'Observe sua localização.',
        'Afaste a visualização aos poucos, até o lugar virar um ponto entre muitos.',
        'Continue afastando até que ele desapareça na escala do mapa.',
        'Feche o aplicativo.'
      ],
      conceito: 'O esquecimento como mudança de escala. O espaço afetivo e íntimo passa a integrar uma cartografia impessoal. Aquilo que parecia central torna-se periférico.'
    },
    es: {
      verbo: 'Alejar', titulo: 'Geografía de una ausencia', dispositivo: 'Aplicación de mapas',
      evocacao: 'Piensa en un lugar asociado a un recuerdo.',
      passos: [
        'Busca ese lugar en el mapa.',
        'Observa su ubicación.',
        'Aleja la vista poco a poco, hasta que el lugar sea un punto entre muchos.',
        'Sigue alejando hasta que desaparezca en la escala del mapa.',
        'Cierra la aplicación.'
      ],
      conceito: 'El olvido como cambio de escala. El espacio afectivo e íntimo pasa a formar parte de una cartografía impersonal. Lo que parecía central se vuelve periférico.'
    }
  },
  {
    id: 'suspender', icone: 'relogio', linha: ['06', 10],
    pt: {
      verbo: 'Suspender', titulo: 'O tempo necessário para esquecer', dispositivo: 'Temporizador',
      evocacao: 'Escolha uma lembrança que você quer deixar de alimentar por alguns instantes.',
      passos: [
        'Abra o temporizador e marque um minuto.',
        'Nos primeiros segundos, deixe a lembrança aparecer.',
        'No tempo que resta, observe outras coisas: sons, temperatura, respiração, objetos ao redor.',
        'Quando o tempo terminar, desligue o alarme.',
        'Não tente verificar se esqueceu.'
      ],
      conceito: 'O tempo como unidade simbólica de afastamento. O exercício questiona a expectativa de que o esquecimento possa ser medido ou concluído num prazo.'
    },
    es: {
      verbo: 'Suspender', titulo: 'El tiempo necesario para olvidar', dispositivo: 'Temporizador',
      evocacao: 'Elige un recuerdo que quieras dejar de alimentar por unos instantes.',
      passos: [
        'Abre el temporizador y marca un minuto.',
        'En los primeros segundos, deja que el recuerdo aparezca.',
        'En el tiempo que queda, observa otras cosas: sonidos, temperatura, respiración, objetos alrededor.',
        'Cuando el tiempo termine, apaga la alarma.',
        'No intentes comprobar si olvidaste.'
      ],
      conceito: 'El tiempo como unidad simbólica de alejamiento. El ejercicio cuestiona la expectativa de que el olvido pueda medirse o concluirse en un plazo.'
    }
  },
  {
    id: 'substituir', icone: 'copiar', linha: ['07', 10],
    pt: {
      verbo: 'Substituir', titulo: 'Sobrescrever', dispositivo: 'Copiar e colar',
      evocacao: 'Escolha uma palavra que represente algo de que você quer se afastar.',
      passos: [
        'Escreva essa palavra e copie-a.',
        'Escolha uma segunda palavra, sem relação com a primeira.',
        'Copie a segunda palavra. Ela ocupa o lugar da anterior.',
        'Cole em um campo vazio.',
        'Observe a palavra que está no lugar da outra.'
      ],
      conceito: 'O esquecimento encenado como substituição, na lógica tecnológica da sobrescrita: uma informação ocupa o espaço de outra, sem necessariamente apagá-la de todos os registros.'
    },
    es: {
      verbo: 'Sustituir', titulo: 'Sobrescribir', dispositivo: 'Copiar y pegar',
      evocacao: 'Elige una palabra que represente algo de lo que quieres alejarte.',
      passos: [
        'Escribe esa palabra y cópiala.',
        'Elige una segunda palabra, sin relación con la primera.',
        'Copia la segunda palabra. Ocupa el lugar de la anterior.',
        'Pégala en un campo vacío.',
        'Observa la palabra que está en el lugar de la otra.'
      ],
      conceito: 'El olvido escenificado como sustitución, en la lógica tecnológica de la sobrescritura: una información ocupa el espacio de otra, sin borrarla necesariamente de todos los registros.'
    }
  },
  {
    id: 'silenciar', icone: 'desligar', linha: ['08', 10],
    pt: {
      verbo: 'Silenciar', titulo: 'Ritual de desconexão', dispositivo: 'Modo avião e tela bloqueada',
      evocacao: 'Segure o celular com as duas mãos e escolha mentalmente algo de que gostaria de se afastar.',
      passos: [
        'Ative o modo avião.',
        'Bloqueie a tela e deixe o aparelho virado para baixo.',
        'Afaste-se do aparelho por alguns instantes.',
        'Ao voltar, desbloqueie-o e restabeleça a conexão.'
      ],
      conceito: 'O ato de desligar como gesto de suspensão ritual. A interrupção da conectividade produz uma pausa na circulação de mensagens e registros, e um procedimento operacional vira uma cerimônia de separação.'
    },
    es: {
      verbo: 'Silenciar', titulo: 'Ritual de desconexión', dispositivo: 'Modo avión y pantalla bloqueada',
      evocacao: 'Sostén el celular con las dos manos y elige mentalmente algo de lo que te gustaría alejarte.',
      passos: [
        'Activa el modo avión.',
        'Bloquea la pantalla y deja el aparato boca abajo.',
        'Aléjate del aparato por unos instantes.',
        'Al volver, desbloquéalo y restablece la conexión.'
      ],
      conceito: 'Apagar como gesto de suspensión ritual. La interrupción de la conectividad produce una pausa en la circulación de mensajes y registros, y un procedimiento operativo se vuelve una ceremonia de separación.'
    }
  },
  {
    id: 'abandonar', icone: 'fechar', linha: ['09', 10],
    pt: {
      verbo: 'Abandonar', titulo: 'A janela abandonada', dispositivo: 'Navegador',
      evocacao: 'Pense em três coisas que despertam a sua curiosidade agora.',
      passos: [
        'Abra três abas, cada uma com uma página sobre uma dessas coisas.',
        'Escolha uma aba que você ainda não explorou.',
        'Feche-a sem ler o conteúdo.',
        'Fique alguns segundos diante das abas que restaram.',
        'Continue navegando sem recuperar a página abandonada.'
      ],
      conceito: 'Aqui a memória é interrompida antes de se constituir. O esquecimento como renúncia à informação, contra o impulso de acessar, acumular e registrar continuamente.'
    },
    es: {
      verbo: 'Abandonar', titulo: 'La ventana abandonada', dispositivo: 'Navegador',
      evocacao: 'Piensa en tres cosas que despiertan tu curiosidad ahora.',
      passos: [
        'Abre tres pestañas, cada una con una página sobre una de esas cosas.',
        'Elige una pestaña que todavía no hayas explorado.',
        'Ciérrala sin leer el contenido.',
        'Quédate unos segundos frente a las pestañas que quedaron.',
        'Sigue navegando sin recuperar la página abandonada.'
      ],
      conceito: 'Aquí la memoria se interrumpe antes de constituirse. El olvido como renuncia a la información, contra el impulso de acceder, acumular y registrar continuamente.'
    }
  }
];
