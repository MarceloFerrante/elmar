// Navegação por hash: #inicio, #bitacora, #bitacora/<fanzine>/<página>, #esquecimento, #exposicao.

const main = document.getElementById('conteudo');
let lang = idiomaInicial();
const esquecidos = new Set(); // fragmentos já esquecidos nesta visita (só na memória da página)

function idiomaInicial() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'pt' || q === 'es') return q;
  try {
    const salvo = localStorage.getItem('idioma');
    if (salvo === 'pt' || salvo === 'es') return salvo;
  } catch (e) { /* sem armazenamento */ }
  return 'es'; // espanhol é o idioma principal (exposição em Cuba)
}

const t = chave => chave.split('.').reduce((o, k) => (o ? o[k] : undefined), TEXTOS[lang]);
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
};

function traduzirFixos() {
  document.documentElement.lang = lang;
  document.title = `${t('titulo')} · Lonelas`;
  document.querySelectorAll('[data-t]').forEach(e => { e.textContent = t(e.dataset.t); });
  document.querySelector('.lupa-fechar').setAttribute('aria-label', t('fechar'));
}

document.querySelector('.idioma').addEventListener('click', () => {
  lang = lang === 'pt' ? 'es' : 'pt';
  try { localStorage.setItem('idioma', lang); } catch (e) { /* ok */ }
  traduzirFixos();
  rota();
});

// ---------- Início ----------

function inicio() {
  const s = el('section', 'inicio');
  const capa = el('div', 'capa');
  capa.style.backgroundImage = `url(img/colagens/costa-03.webp)`;
  const tit = el('div', 'capa-texto');
  tit.append(el('p', 'artista', 'Lonelas'), el('h1', null, t('titulo')), el('p', 'sub', t('subtitulo')), el('p', 'abertura', t('abertura')));
  const ir = el('a', 'botao', t('entrar'));
  ir.href = '#bitacora';
  tit.append(ir);
  capa.append(tit);
  s.append(capa);

  const txt = el('div', 'texto');
  t('intro').forEach(p => txt.append(el('p', null, p)));
  txt.append(el('p', 'assinatura', t('assinatura')));
  txt.append(el('h2', null, t('conceitoTitulo')));
  t('conceito').forEach(p => txt.append(el('p', null, p)));
  s.append(txt);

  const areas = el('div', 'areas');
  [['bitacora', 'img/colagens/brejo-05.webp'], ['esquecimento', 'img/colagens/mangue-03.webp'], ['exposicao', 'img/cuba/escadaria.webp']].forEach(([id, img]) => {
    const a = el('a', 'area');
    a.href = `#${id}`;
    const im = el('img');
    im.src = img; im.alt = ''; im.loading = 'lazy';
    a.append(im, el('h3', null, t(`nav.${id}`)), el('p', null, t(`areas.${id}`)));
    areas.append(a);
  });
  s.append(areas);
  return s;
}

// ---------- Bitácora ----------

function bitacora() {
  const s = el('section', 'bitacora');
  s.append(el('h1', null, t('bitacoraTitulo')), el('p', 'lead', t('bitacoraIntro')));
  const lista = el('div', 'fanzines');
  FANZINES.forEach((f, i) => {
    const a = el('a', 'fanzine-capa');
    a.href = `#bitacora/${f.id}/1`;
    const pilha = el('div', 'pilha');
    f.imagens.slice(0, 3).reverse().forEach(src => {
      const im = el('img');
      im.src = src; im.alt = ''; im.loading = 'lazy';
      pilha.append(im);
    });
    a.append(pilha, el('span', 'num', `${t('fanzine')} ${i + 1}`), el('h2', null, f.titulo[lang]), el('p', 'poema', `${t('poema')} ${f.poema}`));
    lista.append(a);
  });
  s.append(lista);
  return s;
}

function fanzine(id, pag) {
  const f = FANZINES.find(x => x.id === id);
  if (!f) return bitacora();
  const n = f.imagens.length;
  const p = Math.min(Math.max(1, pag || 1), n);
  const i = FANZINES.indexOf(f);
  const s = el('section', 'leitor');

  const cab = el('div', 'leitor-cab');
  const volta = el('a', 'voltar', `← ${t('voltarBitacora')}`);
  volta.href = '#bitacora';
  cab.append(volta, el('span', 'num', `${t('fanzine')} ${i + 1}`), el('h1', null, f.titulo[lang]), el('p', 'poema', `${t('poema')} ${f.poema}`));
  s.append(cab);

  const pagina = el('figure', 'pagina');
  const im = el('img');
  im.src = f.imagens[p - 1];
  im.alt = `${f.titulo[lang]}, ${t('pagina')} ${p}`;
  im.title = t('ampliar');
  im.addEventListener('click', () => abrirLupa(im.src, im.alt));
  pagina.append(im);
  s.append(pagina);

  const ctl = el('div', 'controles');
  const ant = el('a', 'seta', `← ${t('anterior')}`);
  const prox = el('a', 'seta', `${t('proxima')} →`);
  if (p > 1) ant.href = `#bitacora/${id}/${p - 1}`; else ant.setAttribute('aria-disabled', 'true');
  if (p < n) prox.href = `#bitacora/${id}/${p + 1}`; else prox.setAttribute('aria-disabled', 'true');
  const pontos = el('div', 'pontos');
  f.imagens.forEach((_, k) => {
    const d = el('a', k + 1 === p ? 'ponto atual' : 'ponto');
    d.href = `#bitacora/${id}/${k + 1}`;
    d.setAttribute('aria-label', `${t('pagina')} ${k + 1}`);
    pontos.append(d);
  });
  ctl.append(ant, pontos, prox);
  s.append(ctl, el('p', 'texto-fanzine', f.texto[lang]));

  // gesto de arrastar e setas do teclado
  let x0 = null;
  pagina.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  pagina.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (dx < -50 && p < n) location.hash = `#bitacora/${id}/${p + 1}`;
    if (dx > 50 && p > 1) location.hash = `#bitacora/${id}/${p - 1}`;
  });
  teclas = e => {
    if (!document.querySelector('.lupa').hidden) return;
    if (e.key === 'ArrowRight' && p < n) location.hash = `#bitacora/${id}/${p + 1}`;
    if (e.key === 'ArrowLeft' && p > 1) location.hash = `#bitacora/${id}/${p - 1}`;
  };
  return s;
}

let teclas = null;
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharLupa();
  if (teclas) teclas(e);
});

// ---------- O mar (faixas) ----------
// Cada colagem vira um bloco cortado em 10 linhas verticais; a linha N é o fragmento CC.N do doc.
// Rituais sem código ocupam as linhas livres da sua colagem. Linhas sem ritual ficam inertes.

// PROVISÓRIO: ordem colagem 01..16 -> arquivo, a confirmar com a autora.
const COLAGENS = ['brejo-01', 'brejo-02', 'brejo-03', 'brejo-04', 'brejo-05', 'brejo-06', 'brejo-07', 'brejo-08',
  'costa-01', 'costa-02', 'costa-03', 'costa-04', 'mangue-01', 'mangue-02', 'mangue-03', 'mangue-04'];
const LINHAS = 10;
const linhasEsquecidas = new Set(); // índices em RITUAIS, só na memória da página
const exerciciosFeitos = new Set(); // ids em EXERCICIOS

// Cada posição: { ritual: i } | { exercicio: i } | null (inerte)
function linhasDaColagem(col) {
  const slots = Array(LINHAS).fill(null);
  const daCol = RITUAIS.map((r, i) => [r, i]).filter(([r]) => r.colagem === col);
  daCol.filter(([r]) => r.codigo).forEach(([r, i]) => { slots[parseInt(r.codigo.split('.')[1], 10) - 1] = { ritual: i }; });
  daCol.filter(([r]) => !r.codigo).forEach(([, i]) => {
    const livre = slots.indexOf(null);
    if (livre >= 0) slots[livre] = { ritual: i };
  });
  EXERCICIOS.forEach((ex, i) => {
    if (ex.linha[0] !== col) return;
    let n = ex.linha[1] - 1;
    if (slots[n]) n = slots.lastIndexOf(null);
    if (n >= 0) slots[n] = { exercicio: i };
    else console.warn(`exercício ${ex.id} sem linha livre na colagem ${col}`);
  });
  return slots;
}

function icone(nome) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icone');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = ICONES[nome] || '';
  return svg;
}

function mar(abrir) {
  const s = el('section', 'mar-faixas');
  const contador = el('p', 'mar-contador');
  const mares = el('div', 'mares');
  let total = 0;
  let aAbrir = null;
  const atualizar = () => {
    const feitas = linhasEsquecidas.size + exerciciosFeitos.size;
    contador.textContent = t('mar.contador')(feitas, total);
    s.classList.toggle('vazio', feitas === total);
  };

  COLAGENS.forEach((img, c) => {
    const col = String(c + 1).padStart(2, '0');
    const bloco = el('div', 'mar-bloco');
    bloco.style.backgroundImage = `url(img/colagens/${img}.webp)`;
    linhasDaColagem(col).forEach((pos, n) => {
      if (!pos) { bloco.append(el('span', 'linha inerte')); return; }
      total++;
      const b = el('button', 'linha');
      b.type = 'button';
      if ('ritual' in pos) {
        const ri = pos.ritual;
        b.dataset.codigo = RITUAIS[ri].codigo || col;
        b.setAttribute('aria-label', RITUAIS[ri][lang].titulo);
        if (linhasEsquecidas.has(ri)) b.classList.add('esquecida');
        b.addEventListener('click', () => abrirRitual(ri, b, img, n, atualizar));
      } else {
        const ex = EXERCICIOS[pos.exercicio];
        b.classList.add('exercicio');
        b.dataset.codigo = `${col}.${n + 1}`;
        b.setAttribute('aria-label', `${ex[lang].verbo} · ${ex[lang].titulo}`);
        b.title = ex[lang].verbo;
        b.append(icone(ex.icone));
        if (exerciciosFeitos.has(ex.id)) b.classList.add('esquecida');
        b.addEventListener('click', () => abrirExercicioDigital(ex, b, img, n, atualizar));
        if (ex.id === abrir) aAbrir = b;
      }
      bloco.append(b);
    });
    mares.append(bloco);
  });

  // link direto: #mar/<exercício> abre o exercício por cima do mar
  if (aAbrir) {
    history.replaceState(null, '', '#mar');
    setTimeout(() => aAbrir.click(), 0);
  }

  const fim = el('div', 'mar-fim');
  const rec = el('button', 'botao', t('recomecar'));
  rec.type = 'button';
  rec.addEventListener('click', () => { linhasEsquecidas.clear(); exerciciosFeitos.clear(); rota(); });
  fim.append(el('h2', null, t('fimTitulo')), el('p', null, t('fimTexto')), rec);

  s.append(el('p', 'mar-convite', t('mar.convite')), mares, contador, fim);
  atualizar();
  return s;
}

function abrirRitual(ri, linha, img, n, atualizar) {
  if (linhasEsquecidas.has(ri)) return;
  const r = RITUAIS[ri][lang];
  const fundo = el('div', 'papel-fundo');
  const papel = el('div', 'papel ritual');
  papel.setAttribute('role', 'dialog');
  papel.setAttribute('aria-modal', 'true');
  const tira = el('div', 'ritual-tira');
  tira.style.backgroundImage = `url(img/colagens/${img}.webp)`;
  tira.style.backgroundPosition = `${(n / (LINHAS - 1)) * 100}% 50%`;
  const corpo = el('div', 'ritual-corpo');
  const cod = el('p', 'ritual-codigo', linha.dataset.codigo);
  const tit = el('h2', 'ritual-titulo', r.titulo);
  const fala = el('p', 'ritual-lembrar', t('mar.lembrar'));
  const acoes = el('div', 'acoes');
  const nao = el('button', 'botao leve', t('desistir'));
  const lembrei = el('button', 'botao', t('mar.lembrei'));
  nao.type = lembrei.type = 'button';
  acoes.append(nao, lembrei);
  corpo.append(cod, tit, fala, acoes);
  papel.append(tira, corpo);
  fundo.append(papel);
  document.body.append(fundo);
  document.body.classList.add('travado');
  setTimeout(() => lembrei.focus(), 50);

  const fechar = () => { fundo.remove(); document.body.classList.remove('travado'); linha.focus(); };
  nao.addEventListener('click', fechar);
  fundo.addEventListener('click', e => { if (e.target === fundo) fechar(); });
  fundo.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  // 1) lembrar  2) ler o ritual e escrever  3) soltar: a escrita se desfaz e a linha some do mar
  lembrei.addEventListener('click', () => {
    const texto = el('p', 'instrucao', r.texto);
    const campo = el('textarea');
    campo.rows = 3;
    campo.placeholder = t('escreva');
    campo.setAttribute('aria-label', t('escreva'));
    const escrita = el('p', 'escrita');
    const sim = el('button', 'botao', t('esquecer'));
    sim.type = 'button';
    fala.replaceWith(texto);
    lembrei.replaceWith(sim);
    texto.after(campo, escrita);
    campo.focus();

    sim.addEventListener('click', () => {
      const dito = campo.value.trim() || '· · ·';
      campo.value = '';
      campo.remove();
      [...dito].forEach(ch => {
        const span = el('span', null, ch);
        span.style.setProperty('--atraso', `${Math.random() * 1.2}s`);
        span.style.setProperty('--deriva', `${(Math.random() - 0.5) * 40}px`);
        escrita.append(span);
      });
      acoes.remove();
      papel.classList.add('soltando');
      setTimeout(() => {
        fechar();
        linhasEsquecidas.add(ri);
        linha.classList.add('esquecida');
        atualizar();
      }, 2600);
    });
  });
}

// Exercício digital numa linha do mar: lembrar, passos que se apagam um a um, conceito, soltar.
function abrirExercicioDigital(ex, linha, img, n, atualizar) {
  if (exerciciosFeitos.has(ex.id)) return;
  const x = ex[lang];
  const fundo = el('div', 'papel-fundo');
  const papel = el('div', 'papel ritual digital');
  papel.setAttribute('role', 'dialog');
  papel.setAttribute('aria-modal', 'true');
  const tira = el('div', 'ritual-tira');
  tira.style.backgroundImage = `url(img/colagens/${img}.webp)`;
  tira.style.backgroundPosition = `${(n / (LINHAS - 1)) * 100}% 50%`;
  const corpo = el('div', 'ritual-corpo');
  const cod = el('p', 'ritual-codigo', `${x.verbo} · ${x.dispositivo}`);
  cod.prepend(icone(ex.icone));
  const tit = el('h2', 'ritual-titulo', x.titulo);
  const fala = el('p', 'ritual-lembrar', t('mar.lembrar'));
  const evoc = el('p', 'instrucao', x.evocacao);
  const acoes = el('div', 'acoes');
  const nao = el('button', 'botao leve', t('desistir'));
  const lembrei = el('button', 'botao', t('mar.lembrei'));
  nao.type = lembrei.type = 'button';
  acoes.append(nao, lembrei);
  corpo.append(cod, tit, fala, evoc, acoes);
  papel.append(tira, corpo);
  fundo.append(papel);
  document.body.append(fundo);
  document.body.classList.add('travado');
  setTimeout(() => lembrei.focus(), 50);

  const fechar = () => { fundo.remove(); document.body.classList.remove('travado'); linha.focus(); };
  nao.addEventListener('click', fechar);
  fundo.addEventListener('click', e => { if (e.target === fundo) fechar(); });
  fundo.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  lembrei.addEventListener('click', () => {
    const lista = el('ol', 'passos');
    lista.setAttribute('aria-live', 'polite');
    const itens = x.passos.map((p, i) => {
      const li = el('li', 'passo oculto');
      li.append(el('span', 'passo-n', String(i + 1)), el('span', null, p));
      lista.append(li);
      return li;
    });
    const feito = el('button', 'botao', t('mar.feito'));
    feito.type = 'button';
    fala.remove();
    evoc.classList.add('lembrada');
    evoc.after(lista);
    lembrei.replaceWith(feito);
    let atual = -1;

    const irPara = k => {
      itens.forEach((li, i) => {
        li.classList.toggle('ativo', i === k);
        li.classList.toggle('esquecido', i < k);
        li.classList.toggle('oculto', i > k);
      });
      atual = k;
    };
    const concluir = () => {
      if (atual === itens.length) return;
      itens.forEach(li => { li.classList.remove('ativo', 'oculto'); li.classList.add('esquecido'); });
      atual = itens.length;
      const soltar = el('button', 'botao', t('mar.soltar'));
      soltar.type = 'button';
      lista.after(el('p', 'conceito', x.conceito));
      feito.replaceWith(soltar);
      nao.remove();
      soltar.focus();
      soltar.addEventListener('click', () => {
        acoes.remove();
        papel.classList.add('soltando');
        setTimeout(() => {
          fechar();
          exerciciosFeitos.add(ex.id);
          linha.classList.add('esquecida');
          atualizar();
        }, 2600);
      });
    };
    feito.addEventListener('click', () => { if (atual < itens.length - 1) irPara(atual + 1); else concluir(); });
    irPara(0);
    feito.focus();

    // Dissolver acontece aqui: a calculadora leva os passos adiante (zero -> observar, C -> concluir)
    if (ex.dentro) {
      const ferramenta = el('div', 'ex-ferramenta');
      acoes.before(ferramenta);
      papel.classList.add('com-ferramenta');
      Calculadora.montar(ferramenta, {
        naoFecha: t('mar.naoFecha'),
        rotuloFita: t('mar.fita'),
        aoZerar() { if (atual >= 0 && atual < itens.length - 1) irPara(itens.length - 1); },
        aoLimpar() { if (atual === itens.length - 1) setTimeout(concluir, 2400); }
      });
    }
  });
}

// ---------- Exercícios de esquecimento ----------

function esquecimento() {
  const s = el('section', 'esquecimento');
  s.append(el('h1', null, t('esquecimentoTitulo')), el('p', 'lead', t('esquecimentoIntro')));

  const contador = el('p', 'contador');
  const mar = el('div', 'mar');
  const mosaico = el('div', 'mosaico');
  mar.append(mosaico);

  const atualizar = () => {
    contador.textContent = t('contador')(esquecidos.size, INSTRUCOES.length);
    mar.classList.toggle('vazio', esquecidos.size === INSTRUCOES.length);
  };

  INSTRUCOES.forEach((ins, i) => {
    const b = el('button', 'fragmento');
    b.type = 'button';
    const [img, x, y] = ins.recorte;
    b.style.backgroundImage = `url(img/colagens/${img}.webp)`;
    b.style.backgroundPosition = `${x}% ${y}%`;
    b.style.setProperty('--giro', `${((i * 37) % 7) - 3}deg`);
    b.setAttribute('aria-label', `${t('categorias')[ins.cat]} · ${i + 1}`);
    if (esquecidos.has(i)) b.classList.add('esquecido', 'ja');
    b.addEventListener('click', () => abrirExercicio(i, b, atualizar));
    mosaico.append(b);
  });

  const fim = el('div', 'fim');
  const rec = el('button', 'botao', t('recomecar'));
  rec.type = 'button';
  rec.addEventListener('click', () => { esquecidos.clear(); rota(); });
  fim.append(el('h2', null, t('fimTitulo')), el('p', null, t('fimTexto')), rec);
  mar.append(fim);

  s.append(contador, mar, el('p', 'aviso', t('esquecimentoAviso')));
  atualizar();
  return s;
}

function abrirExercicio(i, frag, atualizar) {
  if (esquecidos.has(i)) return;
  const ins = INSTRUCOES[i];
  const fundo = el('div', 'papel-fundo');
  const papel = el('div', 'papel');
  papel.setAttribute('role', 'dialog');
  papel.setAttribute('aria-modal', 'true');
  const tira = el('div', 'tira');
  tira.style.backgroundImage = frag.style.backgroundImage;
  tira.style.backgroundPosition = frag.style.backgroundPosition;
  const cat = el('p', 'categoria', t('categorias')[ins.cat]);
  const instr = el('p', 'instrucao', ins[lang]);
  const campo = el('textarea');
  campo.rows = 3;
  campo.placeholder = t('escreva');
  campo.setAttribute('aria-label', t('escreva'));
  const escrita = el('p', 'escrita');
  const acoes = el('div', 'acoes');
  const nao = el('button', 'botao leve', t('desistir'));
  const sim = el('button', 'botao', t('esquecer'));
  nao.type = sim.type = 'button';
  acoes.append(nao, sim);
  papel.append(tira, cat, instr, campo, escrita, acoes);
  fundo.append(papel);
  document.body.append(fundo);
  document.body.classList.add('travado');
  setTimeout(() => campo.focus(), 50);

  const fechar = () => { fundo.remove(); document.body.classList.remove('travado'); frag.focus(); };
  nao.addEventListener('click', fechar);
  fundo.addEventListener('click', e => { if (e.target === fundo) fechar(); });
  fundo.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

  sim.addEventListener('click', () => {
    // o que foi escrito se desfaz letra por letra e nunca sai desta página
    const texto = campo.value.trim() || '· · ·';
    campo.value = '';
    campo.remove();
    [...texto].forEach(c => {
      const span = el('span', null, c);
      span.style.setProperty('--atraso', `${Math.random() * 1.2}s`);
      span.style.setProperty('--deriva', `${(Math.random() - 0.5) * 40}px`);
      escrita.append(span);
    });
    acoes.remove();
    papel.classList.add('soltando');
    setTimeout(() => {
      fechar();
      esquecidos.add(i);
      frag.classList.add('esquecido');
      atualizar();
    }, 2600);
  });
}

// ---------- Exposição ----------

function exposicao() {
  const s = el('section', 'exposicao');
  s.append(el('h1', null, t('exposicaoTitulo')));
  const bloco = (titulo, info, obras, extra) => {
    const b = el('div', 'bloco');
    b.append(el('h2', null, titulo), el('p', 'info', info));
    obras.forEach(o => {
      const art = el('article', 'obra');
      art.append(el('h3', null, `${o.titulo}, ${o.ano}`), el('p', 'ficha', o.ficha[lang]));
      if (o.texto) art.append(el('p', null, o.texto[lang]));
      const gal = el('div', 'galeria');
      o.imagens.forEach(im => {
        const fig = el('figure');
        const img = el('img');
        img.src = im.src; img.alt = o.titulo; img.loading = 'lazy';
        const leg = im.sim ? t('simulacao') : '';
        img.addEventListener('click', () => abrirLupa(im.src, leg ? `${o.titulo} · ${leg}` : o.titulo));
        fig.append(img);
        if (leg) fig.append(el('figcaption', null, leg));
        gal.append(fig);
      });
      art.append(gal);
      b.append(art);
    });
    if (extra) b.append(extra);
    return b;
  };
  const planta = el('figure', 'planta');
  const pi = el('img');
  pi.src = 'img/cuba/planta.webp'; pi.alt = t('planta'); pi.loading = 'lazy';
  planta.append(pi, el('figcaption', null, t('planta')));
  s.append(bloco(t('cubaTitulo'), t('cubaInfo'), EXPOSICAO.cuba, planta));
  s.append(bloco(t('brasilTitulo'), t('brasilInfo'), EXPOSICAO.brasil));
  return s;
}

// ---------- Lupa (imagem ampliada) ----------

const lupa = document.querySelector('.lupa');
function abrirLupa(src, legenda) {
  lupa.querySelector('img').src = src;
  lupa.querySelector('img').alt = legenda || '';
  lupa.querySelector('.lupa-legenda').textContent = legenda || '';
  lupa.hidden = false;
  document.body.classList.add('travado');
  lupa.querySelector('.lupa-fechar').focus();
}
function fecharLupa() {
  if (lupa.hidden) return;
  lupa.hidden = true;
  document.body.classList.remove('travado');
}
lupa.addEventListener('click', e => { if (e.target !== lupa.querySelector('img')) fecharLupa(); });

// ---------- Rotas ----------

function rota() {
  const [sec, a, b] = location.hash.replace(/^#/, '').split('/');
  teclas = null;
  let view;
  if (sec === 'bitacora' && a) view = fanzine(a, parseInt(b, 10));
  else if (sec === 'bitacora') view = bitacora();
  else if (sec === 'esquecimento') view = esquecimento();
  else if (sec === 'mar') view = mar(a);
  else if (sec === 'exposicao') view = exposicao();
  else view = inicio();
  main.replaceChildren(view);
  document.querySelectorAll('.menu a').forEach(l => l.classList.toggle('ativo', l.getAttribute('href') === `#${sec}`));
  document.body.dataset.secao = sec || 'inicio';
  if (!(sec === 'bitacora' && a && main.dataset.ultimo === `bitacora/${a}`)) window.scrollTo(0, 0);
  main.dataset.ultimo = sec === 'bitacora' && a ? `bitacora/${a}` : sec;
}

window.addEventListener('hashchange', rota);
traduzirFixos();
rota();
