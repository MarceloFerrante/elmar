// El mar y la escalera — rotas, vistas e interações. Conteúdo em js/dados.js,
// mecânicas dos 16 exercícios em js/exercicios.js.
(() => {
  'use strict';

  // ---------- utilidades ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const guarda = {
    ler(k) { try { return localStorage.getItem(k); } catch { return null; } },
    pôr(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const LINGUAS = ['pt', 'es', 'en'];
  let lingua = LINGUAS.includes(guarda.ler('lingua')) ? guarda.ler('lingua') : 'pt';
  const t = (k) => TEXTOS[lingua][k] ?? TEXTOS.pt[k] ?? k;
  const L = (o) => (o == null ? '' : typeof o === 'string' ? o : o[lingua] ?? o.pt ?? '');
  const src = (nome) => (window.IMAGENS && window.IMAGENS[nome]) || `img/${nome}.webp`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dois = (n) => String(n).padStart(2, '0');
  const reduz = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // tudo o que uma vista liga (eventos, timers, laços) é desligado ao trocar de rota
  let limpezas = [];
  const ao = (alvo, ev, fn, op) => { alvo.addEventListener(ev, fn, op); limpezas.push(() => alvo.removeEventListener(ev, fn, op)); };
  const limpar = () => { limpezas.forEach((f) => { try { f(); } catch {} }); limpezas = []; };

  // ---------- desenhos (só linhas retas, círculos e retângulos) ----------
  const estrela = (cls = '') => `<svg class="estrela ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18Z"/></svg>`;
  const luas = () => `<svg class="luas" viewBox="0 0 170 20" aria-hidden="true">${[0, 1, 2, 3, 4].map((i) => {
    const x = 10 + i * 37, f = [-0.6, -0.25, 0, 0.25, 0.6][i];
    return `<circle cx="${x}" cy="10" r="8" class="lua-fundo"/><circle cx="${x + f * 16}" cy="10" r="8" class="lua-sombra" clip-path="circle(8px at ${x}px 10px)"/>`;
  }).join('')}</svg>`;
  // círculo de transmutação: círculos concêntricos, eixo, quadrado inscrito
  const circulo = (cls = '') => `<svg class="transmuta ${cls}" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="70" class="tracejado"/><circle cx="100" cy="100" r="30"/>
    <rect x="50.5" y="50.5" width="99" height="99" transform="rotate(45 100 100)"/>
    <line x1="100" y1="0" x2="100" y2="200" class="tracejado"/><line x1="0" y1="100" x2="200" y2="100"/>
    <circle cx="100" cy="4" r="3" class="cheio"/><circle cx="196" cy="100" r="3"/><circle cx="100" cy="196" r="3"/><circle cx="4" cy="100" r="3" class="cheio"/></svg>`;
  const seta = '<span class="seta" aria-hidden="true">→</span>';

  // ---------- topo, idiomas, menu ----------
  const topo = $('.topo'), voltar = $('.topo-voltar'), casa = $('.topo-casa'), rotulo = $('.topo-rotulo');
  const btnMenu = $('.abre-menu'), menu = $('#menu');

  // DEBUG: atalho para os 16 fragmentos ao lado dos idiomas. Desligar (false) antes de publicar no repositório público.
  const DEBUG_FRAGMENTOS = false;
  const debugFrag = DEBUG_FRAGMENTOS ? document.createElement('select') : null;
  if (debugFrag) {
    debugFrag.className = 'debug-frag'; debugFrag.setAttribute('aria-label', 'debug: fragmentos');
    debugFrag.innerHTML = '<option value="">frag</option>' + Array.from({ length: 16 }, (_, i) => `<option value="${i + 1}">frag ${i + 1}</option>`).join('');
    debugFrag.addEventListener('change', () => { if (debugFrag.value) location.hash = '#/ciberpoesia/' + debugFrag.value; });
    $('.linguas').before(debugFrag);
  }

  function desenhaLinguas() {
    $('.linguas').innerHTML = LINGUAS.map((l) => `<button type="button" lang="${l}" aria-pressed="${l === lingua}" aria-label="${TEXTOS[l].lingua}">${l.toUpperCase()}</button>`).join('');
  }
  $('.linguas').addEventListener('click', (e) => {
    const b = e.target.closest('button[lang]');
    if (!b || b.lang === lingua) return;
    lingua = b.lang; guarda.pôr('lingua', lingua);
    desenhaLinguas(); desenhaMenu(); marcaCheia(); rota();
  });

  // tela cheia, ao lado dos idiomas. Onde há Fullscreen API, usa a nativa; no iPhone (o Safari não a tem para páginas)
  // faz como o Oráculo Serpentina: "pseudo tela cheia" — esconde o rodapé e rola um pouco para o Safari recolher as barras.
  // Adicionado à Tela de Início, abre sem barras (apple-mobile-web-app-capable no index.html).
  const btnCheia = $('.cheia'), raizDoc = document.documentElement;
  const TELA_CHEIA = { pt: ['Tela cheia', 'Sair da tela cheia'], es: ['Pantalla completa', 'Salir de pantalla completa'], en: ['Full screen', 'Exit full screen'] };
  let cheiaFalsa = false;
  const emCheia = () => !!(document.fullscreenElement || document.webkitFullscreenElement || cheiaFalsa);
  function marcaCheia() {
    const on = emCheia(), r = TELA_CHEIA[lingua] || TELA_CHEIA.pt;
    btnCheia.setAttribute('aria-pressed', on); btnCheia.setAttribute('aria-label', r[on ? 1 : 0]); btnCheia.title = r[on ? 1 : 0];
    document.body.classList.toggle('cheia-ativa', on);
  }
  const falsa = (on) => {
    cheiaFalsa = on; document.body.classList.toggle('cheia-falsa', on); marcaCheia();
    if (on) try { scrollTo({ top: Math.max(scrollY + 150, 150), behavior: 'smooth' }); } catch {}
  };
  btnCheia.hidden = false; marcaCheia();
  btnCheia.addEventListener('click', () => {
    if (cheiaFalsa) { falsa(false); return; }
    if (document.fullscreenElement || document.webkitFullscreenElement) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    const pede = raizDoc.requestFullscreen || raizDoc.webkitRequestFullscreen;
    if (!pede || !(document.fullscreenEnabled || document.webkitFullscreenEnabled)) { falsa(true); return; }
    try { const p = pede.call(raizDoc); if (p && p.catch) p.catch(() => falsa(true)); } catch { falsa(true); }
    // se o pedido nativo "passou" mas nada entrou em tela cheia (WebKit do iPhone pode aceitar calado), cai na pseudo
    setTimeout(() => { if (!document.fullscreenElement && !document.webkitFullscreenElement && !cheiaFalsa) falsa(true); }, 600);
  });
  document.addEventListener('fullscreenchange', marcaCheia);
  document.addEventListener('webkitfullscreenchange', marcaCheia);

  function desenhaMenu() {
    const item = (href, txt, sub = '') => `<li><a href="${href}"><span>${txt}</span>${sub ? `<small>${sub}</small>` : ''}</a></li>`;
    $('.menu-dentro').innerHTML = `
      <p class="menu-inicio"><a href="#/">${t('inicioMenu')}</a></p>
      <ol class="menu-escada">
        <li class="degrau d3"><a href="#/exposicao"><i>03</i><span>${t('exposicao')}</span></a>
          <ul>${item('#/exposicao/obras', t('obras'))}${item('#/exposicao/construcao', t('construcao'))}</ul></li>
        <li class="degrau d2"><a href="#/diarios"><i>02</i><span>${t('diarios')}</span></a>
          <ul>${DIARIOS.map((d) => item(`#/diarios/${d.id}`, L(d.nome))).join('')}</ul></li>
        <li class="degrau d1"><a href="#/ciberpoesia"><i>01</i><span>${t('ciberpoesia')}</span></a></li>
      </ol>
      <p class="menu-pe"><a href="#/sobre">${t('sobre')} / ${t('creditos')}</a></p>
      ${circulo('menu-circulo')}`;
    btnMenu.setAttribute('aria-label', menu.hidden ? t('menu') : t('fechar'));
  }
  function abreMenu(abrir) {
    menu.hidden = !abrir; document.body.classList.toggle('menu-aberto', abrir);
    btnMenu.setAttribute('aria-expanded', abrir); btnMenu.setAttribute('aria-label', abrir ? t('fechar') : t('menu'));
    if (abrir) $('a', menu).focus();
  }
  btnMenu.addEventListener('click', () => abreMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) abreMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!$('.zoom').hidden) fechaZoom(); else if (!menu.hidden) { abreMenu(false); btnMenu.focus(); }
  });

  // ---------- zoom (ampliar sem cortar) ----------
  // com zoom > 1: arrastar (1 dedo ou mouse) move a imagem dentro de limites; pinça ajusta o zoom em volta do ponto da pinça;
  // duplo toque (ou um clique, no mouse) alterna entre inteira e ampliada; roda do mouse aproxima em volta do cursor
  const zoom = $('.zoom'), zoomImg = $('.zoom img'), zoomArea = $('.zoom-area');
  let zoomVolta = null, zoomHist = false;
  const Z = { s: 1, x: 0, y: 0 }, ZMAX = 5, ZDUPLO = 2.5;
  const zAplica = (anima) => {
    zoomImg.classList.toggle('mexendo', !anima);
    zoomImg.style.transform = Z.s === 1 && !Z.x && !Z.y ? '' : `translate(${Z.x}px, ${Z.y}px) scale(${Z.s})`;
    zoom.classList.toggle('perto', Z.s > 1.001);
  };
  // centro da imagem sem transformação, em coordenadas da tela
  const zCentro = () => { const r = zoomArea.getBoundingClientRect(); return { x: r.left + zoomImg.offsetLeft + zoomImg.offsetWidth / 2, y: r.top + zoomImg.offsetTop + zoomImg.offsetHeight / 2 }; };
  // limites: maior que a tela, a borda da imagem não entra na tela; menor, fica centrada
  const zLimita = () => {
    const c = zCentro(), w = zoomImg.offsetWidth * Z.s, h = zoomImg.offsetHeight * Z.s, VW = zoom.clientWidth, VH = zoom.clientHeight;
    const eixo = (t, centro, tam, V) => (tam <= V ? V / 2 - centro : Math.min(tam / 2 - centro, Math.max(V - tam / 2 - centro, t)));
    if (Z.s <= 1) { Z.s = 1; Z.x = 0; Z.y = 0; return; }
    Z.x = eixo(Z.x, c.x, w, VW); Z.y = eixo(Z.y, c.y, h, VH);
  };
  // escala s em volta do ponto P (tela), partindo do estado b, com o ponto P0 de b indo parar em P
  const zEm = (s, P, b = Z, P0 = P) => {
    const c = zCentro(); s = Math.max(1, Math.min(ZMAX, s));
    Z.x = P.x - c.x - (s / b.s) * (P0.x - c.x - b.x); Z.y = P.y - c.y - (s / b.s) * (P0.y - c.y - b.y); Z.s = s;
  };
  const zZera = () => { Z.s = 1; Z.x = 0; Z.y = 0; };
  function abreZoom(nome, alt, origem) {
    zoomVolta = origem || document.activeElement;
    zoomImg.src = src(nome); zoomImg.alt = alt || '';
    zZera(); zAplica(false); zoom.hidden = false;
    // uma entrada no histórico: o voltar do navegador (ou o gesto do iPhone) fecha a imagem sem sair da página
    if (!zoomHist) { try { history.pushState({ zoom: 1 }, '', location.href); zoomHist = true; } catch {} }
    $('.zoom-fecha').setAttribute('aria-label', t('fecharZoom')); $('.zoom-fecha').textContent = '×'; $('.zoom-volta').setAttribute('aria-label', t('voltar'));
    requestAnimationFrame(() => zoom.classList.add('aberto'));
    $('.zoom-fecha').focus();
  }
  function fechaZoom(peloHistorico) {
    if (zoom.hidden) return;
    if (zoomHist && peloHistorico !== true) { zoomHist = false; history.back(); }
    if (peloHistorico === true) zoomHist = false;
    dedos.clear(); gesto = null;
    zoom.classList.remove('aberto'); zoom.hidden = true; zoomImg.removeAttribute('src'); zZera(); zAplica(false);
    if (zoomVolta) zoomVolta.focus();
  }
  // a tela do zoom cobre a seta de voltar do topo: uma seta no mesmo lugar fecha a imagem
  $('.zoom-fecha').addEventListener('click', () => fechaZoom()); $('.zoom-volta').addEventListener('click', () => fechaZoom());
  window.addEventListener('popstate', () => { if (!zoom.hidden) fechaZoom(true); else zoomHist = false; });
  window.addEventListener('hashchange', () => { if (!zoom.hidden) fechaZoom(true); });
  const dedos = new Map(); let gesto = null, ultimoToque = null;
  const alterna = (P) => { if (Z.s > 1.001) zZera(); else { zEm(ZDUPLO, P); zLimita(); } zAplica(true); };
  const comeca = () => {
    const ps = [...dedos.values()];
    if (ps.length >= 2) {
      const [a, b] = ps; gesto = { tipo: 'pinca', base: { ...Z }, d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, m0: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, moveu: true };
    } else if (ps.length === 1) gesto = { tipo: 'arrasta', base: { ...Z }, p0: { ...ps[0] }, moveu: gesto ? gesto.moveu : false };
  };
  zoomArea.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    try { zoomArea.setPointerCapture(e.pointerId); } catch {}
    dedos.set(e.pointerId, { x: e.clientX, y: e.clientY, t: e.pointerType });
    if (dedos.size === 1) gesto = null;
    comeca();
  });
  zoomArea.addEventListener('pointermove', (e) => {
    if (!dedos.has(e.pointerId) || !gesto) return;
    dedos.set(e.pointerId, { x: e.clientX, y: e.clientY, t: e.pointerType });
    const ps = [...dedos.values()];
    if (gesto.tipo === 'pinca' && ps.length >= 2) {
      const [a, b] = ps, d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      zEm(gesto.base.s * (d / gesto.d0), m, gesto.base, gesto.m0); zLimita(); zAplica(false);
    } else if (gesto.tipo === 'arrasta') {
      const dx = e.clientX - gesto.p0.x, dy = e.clientY - gesto.p0.y;
      if (Math.hypot(dx, dy) > 6) gesto.moveu = true;
      if (gesto.moveu && Z.s > 1.001) { Z.x = gesto.base.x + dx; Z.y = gesto.base.y + dy; zLimita(); zAplica(false); }
    }
  });
  const solta = (e) => {
    if (!dedos.has(e.pointerId)) return;
    const p = dedos.get(e.pointerId); dedos.delete(e.pointerId);
    if (dedos.size) { comeca(); gesto.moveu = true; return; } // um dedo saiu da pinça: segue arrastando com o outro
    const g = gesto; gesto = null;
    if (e.type === 'pointercancel' || !g || g.moveu) return;
    const P = { x: e.clientX, y: e.clientY };
    if (p.t === 'mouse') { alterna(P); return; }
    // toque: só o duplo toque alterna
    const agora = Date.now();
    if (ultimoToque && agora - ultimoToque.t < 320 && Math.hypot(P.x - ultimoToque.x, P.y - ultimoToque.y) < 40) { ultimoToque = null; alterna(P); }
    else ultimoToque = { t: agora, x: P.x, y: P.y };
  };
  zoomArea.addEventListener('pointerup', solta); zoomArea.addEventListener('pointercancel', solta);
  // pinça do trackpad (chega como roda com ctrl) aproxima; com a imagem ampliada, rolar (dois dedos no trackpad ou a roda) move a imagem
  zoomArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    const f = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? zoom.clientHeight : 1;
    if (!e.ctrlKey && Z.s > 1.001) { Z.x -= e.deltaX * f; Z.y -= e.deltaY * f; }
    else zEm(Z.s * Math.exp(-e.deltaY * f * (e.ctrlKey ? 0.01 : 0.0022)), { x: e.clientX, y: e.clientY });
    zLimita(); zAplica(false);
  }, { passive: false });
  // no Safari do iPhone, a pinça não pode virar zoom da página
  ['gesturestart', 'gesturechange'].forEach((n) => zoom.addEventListener(n, (e) => e.preventDefault()));
  window.addEventListener('resize', () => { if (!zoom.hidden) { zLimita(); zAplica(false); } });

  // ---------- vistas ----------
  const V = {};

  // título em linhas curtas, como no cartaz: EL / MAR / Y LA / ESCALERA
  const linhasTitulo = () => {
    const ls = [];
    `${t('titulo1')} ${t('titulo2')}`.split(/\s+/).forEach((w) => {
      const u = ls[ls.length - 1];
      if (u && w.length <= 2 && u.every((x) => x.length <= 2)) u.push(w); else ls.push([w]);
    });
    return ls.map((l) => `<span>${esc(l.join(' '))}</span>`).join('');
  };
  // cabeçalho das páginas internas: rótulo pequeno, título espaçado, traço
  const cabecalho = (rot, titulo, extra = '') => `
      <header class="cab">
        <p class="rotulo">${rot}</p>
        <h1 class="titulo">${titulo}</h1>
        <span class="traco"></span>${extra}
      </header>`;

  V.inicio = () => ({
    pe: 'pe',
    html: `
    <div class="ini-duas">
    <section class="inicio">
      <img class="ini-colagem" src="${src('capa/colagem')}" alt="">
      <div class="ini-titulo">
        <h1>${linhasTitulo()}</h1>
        <span class="ini-traco"></span>
        <p class="ini-sub"><span>${t('sub')}</span><span>Lohanna Lonelas</span></p>
      </div>
      <img class="ini-linha" src="${src('capa/linha')}" alt="">
      <nav class="ini-escada" aria-label="${t('sobe')}">
        <a class="ini-degrau d3" href="#/exposicao"><span>${t('exposicao')}</span>${seta}</a>
        <a class="ini-degrau d2" href="#/diarios"><span>${t('diarios')}</span>${seta}</a>
        <a class="ini-degrau d1" href="#/ciberpoesia"><span>${t('ciberpoesia')}</span>${seta}</a>
      </nav>
      <img class="ini-faixa" src="${src('capa/faixa')}" alt="">
    </section>
    <section class="pagina ini-artista" aria-labelledby="h-artista">
      <p class="rotulo">${t('sobreArtista')}</p>
      <h2 id="h-artista" class="titulo">${SOBRE.artista.nome}</h2>
      <span class="traco"></span>
      <p class="papel">${L(SOBRE.artista.papel)}</p>
      <p class="texto-corrido">${esc(L(SOBRE.artista.bio)[0])}</p>
      <p class="ini-artista-links"><a class="link-seta" href="#/sobre">${t('maisArtista')} ${seta}</a>
        <a class="link-seta" href="${SOBRE.site}" target="_blank" rel="noopener">${t('siteArtista')} ↗</a></p>
    </section>
    </div>
    <section class="ini-apoio" aria-label="${t('rodape')}">
      <div class="ini-logos">
        <p class="ini-logos-rot">${t('apoio')}</p>
        <div class="ini-fila"><img class="lg-fb" src="${src('apoio/funarte-brasil')}" alt="Funarte Brasil Conexões Internacionais · Mobilidade Artística"></div>
        <div class="ini-fila"><img class="lg-f50" src="${src('apoio/funarte-50')}" alt="Funarte 50 anos"><img class="lg-minc" src="${src('apoio/minc')}" alt="Ministério da Cultura"><img class="lg-gov" src="${src('apoio/governo')}" alt="Governo do Brasil"></div>
        <p class="ini-logos-rot">${t('colaboracao')}</p>
        <div class="ini-fila col"><img src="${src('apoio/atelie-lonelas')}" alt="Ateliê Lonelas"><img src="${src('apoio/cpap')}" alt="Consejo Provincial de Artes Plásticas Santiago de Cuba"><img src="${src('apoio/centro-arte')}" alt="Centro de Arte Santiago de Cuba"><img src="${src('apoio/taller-50')}" alt="Taller Cultural 50 aniversario"><img src="${src('apoio/taller')}" alt="Taller Cultural"></div>
      </div>
      <div class="ini-colagem2" aria-hidden="true">
        <img class="c-ocre" src="${src('capa/apoio-ocre')}" alt="" loading="lazy">
        <img class="c-pedras" src="${src('capa/apoio-pedras')}" alt="" loading="lazy">
        <img class="c-arvore" src="${src('capa/apoio-arvore')}" alt="" loading="lazy">
      </div>
    </section>`,
  });

  // assinatura: nome em negrito, papel em regular, alinhada à direita
  const assinatura = (s) => { const k = s.indexOf(','); return k < 0 ? `<b>${esc(s)}</b>` : `<b>${esc(s.slice(0, k))}</b>${esc(s.slice(k))}`; };

  V.exposicao = () => {
    const cur = L(EXPOSICAO.curatorial);
    const linha = (href, img, txt) => `<li><a href="${href}"><img src="${src(img)}" alt=""><span>${txt}</span>${seta}</a></li>`;
    return {
      rotulo: t('inicio'), volta: '#/', pe: 'pe',
      html: `
      <article class="pagina expo">
        <img class="cab-colagem" src="${src('textura/cab-colagem')}" alt="">
        ${cabecalho(t('exposicao'), linhasTitulo())}
        <section class="curatorial" aria-labelledby="h-cur">
          <h2 id="h-cur" class="subtitulo">${t('curatorial')}<small>${t('por')}</small></h2>
          <div class="texto-corrido">
            <p>${esc(cur[0])}</p>
            <div id="cur-resto" hidden>${cur.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          </div>
          <p class="assina">${assinatura(L(EXPOSICAO.assinatura))}</p>
          ${cur.length > 1 ? `<button type="button" class="link-seta ler-completo" aria-expanded="false" aria-controls="cur-resto"><span>${t('lerCompleto')}</span> ${seta}</button>` : ''}
        </section>
        <nav class="navegue" aria-labelledby="h-nav">
          <span class="traco"></span>
          <h2 id="h-nav" class="subtitulo fino">${t('navegue')}</h2>
          <ul class="nav-linhas">
            ${linha('#/exposicao/obras', 'textura/marmore', t('obras'))}
            ${linha('#/sobre', 'textura/marmore-2', `${t('sobre')} <small>${t('sobreSub')}</small>`)}
            ${linha('#/exposicao/construcao', 'textura/ocre', `${t('construcao')} <small>${t('construcaoSub')}</small>`)}
          </ul>
        </nav>
      </article>`,
      montar(raiz) {
        const b = $('.ler-completo', raiz); if (!b) return;
        // no celular o resto do texto abre no próprio lugar; no computador ele já vem aberto na coluna direita (CSS)
        ao(b, 'click', () => {
          const r = $('#cur-resto', raiz), abrir = r.hidden;
          r.hidden = !abrir; b.setAttribute('aria-expanded', abrir);
          $('span', b).textContent = abrir ? t('fecharCompleto') : t('lerCompleto');
        });
      },
    };
  };

  // carrossel genérico: trilho com scroll-snap, setas e pontos
  const ligaCarrossel = (raiz, aoMudar) => {
    const trilho = $('.car-trilho', raiz), itens = $$('.car-item', raiz), pontos = $$('.car-pontos button', raiz);
    const atual = () => {
      const c = trilho.scrollLeft + trilho.clientWidth / 2;
      let j = 0, m = Infinity;
      itens.forEach((it, i) => { const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - c); if (d < m) { m = d; j = i; } });
      return j;
    };
    const vai = (k) => {
      k = (k + itens.length) % itens.length; const it = itens[k];
      trilho.scrollTo({ left: it.offsetLeft - (trilho.clientWidth - it.offsetWidth) / 2, behavior: reduz() ? 'auto' : 'smooth' });
    };
    let ult = -1;
    const marca = () => { const j = atual(); pontos.forEach((p, k) => p.setAttribute('aria-current', k === j)); if (j !== ult) { ult = j; aoMudar?.(j); } };
    marca(); ao(trilho, 'scroll', marca, { passive: true });
    ao(raiz, 'click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('car-ant')) vai(atual() - 1);
      else if (b.classList.contains('car-prox')) vai(atual() + 1);
      else if (b.closest('.car-pontos')) vai(+b.dataset.k);
    });
    ao(trilho, 'keydown', (e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); vai(atual() - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); vai(atual() + 1); } });
    return { atual, vai };
  };
  const pontosHtml = (n) => `<span class="car-pontos">${Array.from({ length: n }, (_, k) => `<button type="button" data-k="${k}" aria-label="${k + 1} / ${n}"></button>`).join('')}</span>`;
  const meta = (o) => `${o.ano} · ${esc(L(o.tecnica))}, ${esc(L(o.materiais))}`;

  V.obras = () => ({
    rotulo: t('exposicao'), volta: '#/exposicao', pe: 'pe',
    html: `
    <article class="pagina obras">
      ${cabecalho(t('exposicao'), t('obras'))}
      <div class="carrossel lista" aria-roledescription="carrossel" aria-label="${t('obras')}">
        <ul class="car-trilho" tabindex="0">${OBRAS.map((o, i) => `
          <li class="car-item"><a href="#/exposicao/obras/${i + 1}" tabindex="-1"><img src="${src(o.fotos[0].img)}" alt="${esc(L(o.fotos[0].alt))}"></a></li>`).join('')}
        </ul>
        <div class="car-ctrl">
          <button type="button" class="car-ant" aria-label="${t('obraAnterior')}">←</button>
          ${pontosHtml(OBRAS.length)}
          <button type="button" class="car-prox" aria-label="${t('obraProxima')}">→</button>
        </div>
      </div>
      <div class="obras-leg" aria-live="polite"></div>
    </article>`,
    montar(raiz) {
      const leg = $('.obras-leg', raiz);
      ligaCarrossel(raiz, (j) => {
        const o = OBRAS[j];
        leg.innerHTML = `<div><h2>${esc(L(o.titulo))}</h2><p>${meta(o)}</p></div>
          <a class="circulo-mais" href="#/exposicao/obras/${j + 1}" aria-label="${t('verObraDet')}: ${esc(L(o.titulo))}">+</a>`;
      });
    },
  });

  V.obra = (n) => {
    const i = Math.min(Math.max(1, n | 0), OBRAS.length) - 1, o = OBRAS[i];
    const ant = ((i - 1 + OBRAS.length) % OBRAS.length) + 1, prox = ((i + 1) % OBRAS.length) + 1;
    const nf = o.fotos.length;
    return {
      rotulo: t('obras'), volta: '#/exposicao/obras', pe: 'pe-escada',
      html: `
      <article class="pagina obra">
        <header class="cab obra-cab">
          <p class="rotulo">${t('obras')}</p>
          <h1 class="titulo">${esc(L(o.titulo))}</h1>
          <p class="contador" aria-live="polite"><span class="car-n">1</span> / ${nf}</p>
        </header>
        <div class="carrossel foto" aria-roledescription="carrossel" aria-label="${esc(L(o.titulo))}">
          <div class="car-trilho" tabindex="0">${o.fotos.map((f, k) => `
            <figure class="car-item" aria-roledescription="slide" aria-label="${k + 1} / ${nf}">
              <button type="button" class="car-amplia" data-k="${k}" aria-label="${t('ampliar')}: ${esc(L(f.alt))}"><img src="${src(f.img)}" alt="${esc(L(f.alt))}"></button>
            </figure>`).join('')}
          </div>
          ${nf > 1 ? `<button type="button" class="car-ant" aria-label="${t('fotoAnterior')}">←</button><button type="button" class="car-prox" aria-label="${t('fotoProxima')}">→</button>` : ''}
        </div>
        <div class="abas" role="tablist">
          <button type="button" role="tab" id="aba-ficha" aria-controls="painel-ficha" aria-selected="true">${t('fichaCat')}</button>
          <button type="button" role="tab" id="aba-sobre" aria-controls="painel-sobre" aria-selected="false" tabindex="-1">${t('sobreObra')}</button>
        </div>
        <div class="painel" id="painel-ficha" role="tabpanel" aria-labelledby="aba-ficha">
          <dl class="ficha">
            <div><dt>${t('ano')}</dt><dd>${o.ano}</dd></div>
            <div><dt>${t('tecnica')}</dt><dd>${esc(L(o.tecnica))}</dd></div>
            <div><dt>${t('materiais')}</dt><dd>${esc(L(o.materiais))}</dd></div>
            <div><dt>${t('dimensoes')}</dt><dd>${esc(L(o.dimensoes))}</dd></div>
          </dl>
          <button type="button" class="pilula ler-mais">${t('lerMais')} <span aria-hidden="true">+</span></button>
        </div>
        <div class="painel texto-corrido" id="painel-sobre" role="tabpanel" aria-labelledby="aba-sobre" hidden>
          ${L(o.texto).map((p) => `<p>${esc(p)}</p>`).join('')}
          <p class="assina"><b>Lohanna Lonelas</b></p>
          ${o.link ? `<p><a class="link-seta" href="${o.link}">${o.link.includes('ciber') ? t('ciberpoesia') : t('diarios')} ${seta}</a></p>` : ''}
        </div>
        <nav class="obra-nav" aria-label="${t('outrasObras')}">
          <a href="#/exposicao/obras/${ant}"><span aria-hidden="true">←</span> ${t('obraAnterior')}</a>
          <a href="#/exposicao/obras/${prox}">${t('obraProxima')} <span aria-hidden="true">→</span></a>
        </nav>
      </article>`,
      montar(raiz) {
        const car = $('.carrossel', raiz), nEl = $('.car-n', raiz);
        ligaCarrossel(car, (j) => { nEl.textContent = j + 1; });
        ao(car, 'click', (e) => { const b = e.target.closest('.car-amplia'); if (b) { const f = o.fotos[+b.dataset.k]; abreZoom(f.img, L(f.alt), b); } });
        const abas = $$('[role="tab"]', raiz);
        const escolhe = (aba, foco) => abas.forEach((a) => {
          const sim = a === aba; a.setAttribute('aria-selected', sim); a.tabIndex = sim ? 0 : -1;
          $('#' + a.getAttribute('aria-controls'), raiz).hidden = !sim; if (sim && foco) a.focus();
        });
        ao($('.abas', raiz), 'click', (e) => { const a = e.target.closest('[role="tab"]'); if (a) escolhe(a); });
        ao($('.abas', raiz), 'keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); escolhe(abas[abas.indexOf(document.activeElement) ^ 1] || abas[0], true); } });
        ao($('.ler-mais', raiz), 'click', () => escolhe(abas[1], true));
      },
    };
  };



  // construção da exposição: o making of, em etapas; cada foto amplia
  V.construcao = () => {
    const todas = CONSTRUCAO;
    return {
      rotulo: t('construcao'), volta: '#/exposicao',
      html: `
      <article class="pagina construcao">
        <header class="cab">
          <p class="rotulo">03 · II</p>
          <h1 class="titulo">${t('construcao')}</h1>
          <span class="traco"></span>
          <p class="cab-sub">${t('construcaoTexto')}</p>
        </header>
        <div class="making">${todas.map((f, k) => `
          ${f.leg ? '<figure class="proc-fig">' : ''}<button type="button" class="proc-img" data-k="${k}" aria-label="${t('ampliar')}: ${esc(L(f.alt))}"><img src="${src(f.img)}" alt="${esc(L(f.alt))}" loading="lazy"></button>${f.leg ? `<figcaption class="proc-leg">${esc(f.leg)}</figcaption></figure>` : ''}`).join('')}
        </div>
        <p class="dedicatoria">${esc(L(DEDICATORIA))}</p>
        <nav class="obra-nav"><a href="#/exposicao"><span aria-hidden="true">←</span> ${t('exposicao')}</a><a href="#/exposicao/obras">${t('obras')} <span aria-hidden="true">→</span></a></nav>
      </article>`,
      montar(raiz) {
        ao(raiz, 'click', (e) => { const b = e.target.closest('.proc-img'); if (b) { const f = todas[+b.dataset.k]; abreZoom(f.img, L(f.alt), b); } });
      },
    };
  };

  // índice dos diários: uma cartografia em escada (praia embaixo, brejo no alto)
  V.diarios = () => {
    // no celular os pontos ficam sobre a própria escada (pé, patamar e topo dos degraus), calculados pela posição do PNG
    // (largura 92%, esquerda 2%, topo 18% de um mapa 3:4); pc: posições do computador
    const naEscada = (ix, iy) => ({ x: +(2 + ix * 92).toFixed(1), y: +(18 + iy * 92 * (1429 / 1600) * 0.75).toFixed(1) });
    const pos = [naEscada(0.07, 0.86), naEscada(0.55, 0.585), naEscada(0.69, 0.30)], pc = [{ x: 18, y: 84 }, { x: 46, y: 54 }, { x: 78, y: 20 }];
    return {
      rotulo: t('diarios'), volta: '#/',
      html: `
      <article class="pagina diarios">
        <header class="cab">
          <p class="rotulo">02 · ${t('diarios')}</p>
          <h1 class="titulo">${t('diarios')}</h1>
          <span class="traco"></span>
          <p class="cab-sub">${t('diariosLema')}</p>
        </header>
        <div class="mapa">
          <img class="mapa-colagem" src="${src(DIARIOS[2].imgs[0])}" alt="">
          ${circulo('mapa-circulo')}
          <img class="mapa-escada" src="${src('capa/escada')}" alt="">
          <svg class="mapa-trilha" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline class="so-cel" points="${pos.map((p) => `${p.x},${p.y}`).join(' ')}"/>
            <polyline class="so-pc" points="${pc.map((p) => `${p.x},${p.y}`).join(' ')}"/>
          </svg>
          ${estrela('mapa-estrela')}
          ${DIARIOS.map((d, i) => `
            <a class="mapa-ponto p${i}" href="#/diarios/${d.id}" style="--x:${pos[i].x}%;--y:${pos[i].y}%;--xd:${pc[i].x}%;--yd:${pc[i].y}%;--d:${(0.5 + i * 0.5).toFixed(1)}s">
              <span class="alvo" aria-hidden="true"></span>
              <span class="mapa-nome"><span class="ondas" aria-hidden="true"><b></b><b></b></span>${esc(L(d.nome))}<small>${t('imagens')(d.imgs.length)}${d.nota ? ` · ${L(d.nota)}` : ''}</small></span>
            </a>`).join('')}
        </div>
        <p class="nota-lateral">${t('diariosIntro')}</p>
      </article>`,
    };
  };

  // leitor: um panorama horizontal único, imagens coladas, sem texto por cima
  V.diario = (id) => {
    const k = DIARIOS.findIndex((d) => d.id === id);
    if (k < 0) return V.diarios();
    const d = DIARIOS[k], prox = DIARIOS[(k + 1) % DIARIOS.length];
    return {
      rotulo: `${t('diarioDe')} · ${L(d.nome)}`, volta: '#/diarios', classe: 'tela-cheia',
      html: `
      <article class="leitor">
        <h1 class="so-leitor">${t('diarios')} — ${esc(L(d.nome))}</h1>
        <div class="panorama" tabindex="0" aria-label="${t('deslize')}">
          <div class="pano-faixa">${d.imgs.map((im, i) => `<button type="button" class="pano-img" data-k="${i}" aria-label="${t('ampliar')} ${i + 1} / ${d.imgs.length}"><img src="${src(im)}" alt="${esc(L(d.nome))} ${i + 1}" ${i > 1 ? 'loading="lazy"' : ''} width="2400" height="1697"></button>`).join('')}
            <a class="pano-fim" href="#/diarios/${prox.id}"><i>${t('diarioDe')}</i>${esc(L(prox.nome))} ${seta}</a>
          </div>
        </div>
        <footer class="leitor-pe">
          <button type="button" class="pano-ant" aria-label="←">←</button>
          <div class="pano-meio"><span class="pano-dica">${t('deslize')}</span><span class="pano-barra"><span></span></span><span class="pano-pos" aria-live="polite"></span></div>
          <button type="button" class="pano-prox" aria-label="→">→</button>
        </footer>
      </article>`,
      montar(raiz) {
        const pano = $('.panorama', raiz), barra = $('.pano-barra span', raiz), posEl = $('.pano-pos', raiz);
        const imgs = $$('.pano-img', raiz);
        const atual = () => {
          const c = pano.scrollLeft + pano.clientWidth / 2;
          let j = 0; imgs.forEach((im, i) => { if (im.offsetLeft <= c) j = i; }); return j;
        };
        const marca = () => {
          const max = pano.scrollWidth - pano.clientWidth;
          barra.style.transform = `scaleX(${max > 0 ? pano.scrollLeft / max : 0})`;
          posEl.textContent = t('posicao')(dois(atual() + 1), dois(imgs.length));
          raiz.classList.toggle('andou', pano.scrollLeft > 40);
        };
        const vai = (j) => {
          j = Math.max(0, Math.min(imgs.length, j));
          const alvo = j >= imgs.length ? pano.scrollWidth : imgs[j].offsetLeft - (pano.clientWidth - imgs[j].offsetWidth) / 2;
          pano.scrollTo({ left: alvo, behavior: reduz() ? 'auto' : 'smooth' });
        };
        marca(); ao(pano, 'scroll', marca, { passive: true }); ao(window, 'resize', marca);
        // roda do mouse anda para o lado (o diário é uma faixa só)
        ao(pano, 'wheel', (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); pano.scrollLeft += e.deltaY; } }, { passive: false });
        ao(pano, 'keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); vai(atual() + 1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); vai(atual() - 1); }
        });
        ao($('.pano-ant', raiz), 'click', () => vai(atual() - 1));
        ao($('.pano-prox', raiz), 'click', () => vai(atual() + 1));
        // arrastar com o mouse; um toque sem arrastar amplia
        let arr = null;
        ao(pano, 'pointerdown', (e) => { if (e.pointerType === 'mouse') arr = { x: e.clientX, s: pano.scrollLeft, mov: 0 }; });
        ao(window, 'pointermove', (e) => { if (!arr) return; arr.mov = Math.abs(e.clientX - arr.x); pano.scrollLeft = arr.s - (e.clientX - arr.x); if (arr.mov > 4) pano.classList.add('arrastando'); });
        ao(window, 'pointerup', () => { setTimeout(() => { arr = null; pano.classList.remove('arrastando'); }, 0); });
        ao(pano, 'click', (e) => {
          const b = e.target.closest('.pano-img'); if (!b || (arr && arr.mov > 4)) return;
          abreZoom(d.imgs[+b.dataset.k], `${L(d.nome)} ${+b.dataset.k + 1}`, b);
        });
        pano.focus({ preventScroll: true });
      },
    };
  };

  // ---------- ciberpoesia ----------
  // posição de cada retalho na cena: coluna (x, %), altura (y, em telas), largura, velocidade.
  // A cada abertura sorteia-se uma semente nova; ?seed=N (ou #/ciberpoesia?seed=N) repete uma
  // disposição. SEMENTE_PADRAO (0) é a disposição de referência de 08/11/2026, para comparar mudanças.
  const SEMENTE_PADRAO = 0;
  const sementePedida = () => {
    const m = (location.search + '&' + location.hash).match(/[?&]seed=(-?\d+)/);
    return m ? +m[1] : null;
  };
  // Papel rasgado: para cada fragmento (280×809), 2 ou 3 lados rasgados (dentes de 2–4% da largura),
  // os outros retos; topo e base inclinados até 5°; alguns cantos recortados; nos lados rasgados,
  // um véu branco de 70% na borda até 0% numa faixa de 3–5% da largura. Tudo pela semente da página.
  function rasgo(seed, i) {
    const W = 280, H = 809;
    let n = 0;
    const q = () => { const v = Math.sin((n++ + 1) * 12.9898 + (i + 1) * 4.1414 + seed * 37.719 + 1.618) * 43758.5453; return v - Math.floor(v); };
    const lados = ['t', 'r', 'b', 'l'], rasgados = new Set();
    const quantos = q() < 0.55 ? 2 : 3;
    while (rasgados.size < quantos) rasgados.add(lados[Math.floor(q() * 4)]);
    const amp = { t: 0, r: 0, b: 0, l: 0 }, faixa = {};
    lados.forEach((k) => { if (rasgados.has(k)) { amp[k] = W * (0.02 + q() * 0.02); faixa[k] = W * (0.03 + q() * 0.02); } });
    const incl = () => Math.tan(((q() * 2 - 1) * 5) * Math.PI / 180);
    const tt = incl(), tb = incl();
    const ct = Math.abs(tt) * W / 2 + 0.5, cb = H - Math.abs(tb) * W / 2 - 0.5;
    const yT = (x) => ct + tt * (x - W / 2), yB = (x) => cb + tb * (x - W / 2);
    const corte = [0, 1, 2, 3].map(() => (q() < 0.35 ? W * (0.025 + q() * 0.045) : 0)); // tl, tr, br, bl
    const dente = (k) => (amp[k] ? amp[k] * (0.15 + 0.85 * q()) : 0);
    const pts = [];
    const lado = (de, ate, f, k) => {
      const passo = W * 0.022 * (0.7 + q() * 0.6), m = Math.max(1, Math.round(Math.abs(ate - de) / passo));
      for (let j = 0; j <= m; j++) { const s = de + (ate - de) * j / m; pts.push(f(s, (j === 0 || j === m) ? (amp[k] ? amp[k] * 0.4 : 0) : dente(k))); }
    };
    // topo: x de 0 a W
    lado(corte[0], W - corte[1], (x, d) => [x, yT(x) + d], 't');
    lado(yT(W) + corte[1], yB(W) - corte[2], (y, d) => [W - d, y], 'r');
    lado(W - corte[2], corte[3], (x, d) => [x, yB(x) - d], 'b');
    lado(yB(0) - corte[3], yT(0) + corte[0], (y, d) => [d, y], 'l');
    const pc = (v, t) => (v / t * 100).toFixed(2) + '%';
    const poli = 'polygon(' + pts.map(([x, y]) => pc(x, W) + ' ' + pc(y, H)).join(',') + ')';
    // véus: gradiente perpendicular a cada lado rasgado, em coordenadas da imagem
    const veu = (k, x1, y1, nx, ny) => {
      const fim = amp[k] * 0.5 + faixa[k], id = `v${i}${k}`;
      return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x1 + nx * fim).toFixed(1)}" y2="${(y1 + ny * fim).toFixed(1)}"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
    };
    const nT = Math.hypot(1, tt), nB = Math.hypot(1, tb);
    let svg = '';
    if (amp.t) svg += veu('t', W / 2, ct, -tt / nT, 1 / nT);
    if (amp.b) svg += veu('b', W / 2, cb, tb / nB, -1 / nB);
    if (amp.l) svg += veu('l', 0, H / 2, 1, 0);
    if (amp.r) svg += veu('r', W, H / 2, -1, 0);
    const papel = Math.floor(q() * 4), pp = `${Math.floor(q() * 190)}px ${Math.floor(q() * 190)}px`;
    return { papel, clip: `-webkit-clip-path:${poli};clip-path:${poli};--pp:${pp}`, svg: `<svg class="ret-veu" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${svg}</svg>` };
  }
  const geraCena = (seed) => {
    const r = (i, s) => { const v = Math.sin((i + 1) * 12.9898 + s * 78.233 + seed * 37.719) * 43758.5453; return v - Math.floor(v); };
    const embaralha = (a, s) => { a = a.slice(); if (!seed) return a; for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(r(k, s) * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
    // as colunas seguem alternando esquerda/direita; a semente só gira e espelha a sequência
    const base = [6, 52, 28, 70, 14, 60, 38, 78], giro = seed ? Math.floor(r(0, 6) * 8) : 0, espelho = seed && r(1, 6) < 0.5;
    const cols = base.map((_, k) => { const c = base[(k + giro) % 8]; return espelho ? 84 - c : c; });
    const ordem = embaralha(Array.from({ length: 16 }, (_, i) => i), 7); // que fragmento ocupa cada lugar
    const pos = Array.from({ length: 16 }, (_, k) => {
      const rr = (s) => r(k, s), solto = seed ? 1 : 0; // fora da referência, mais solto
      // faixa horizontal: k é o lugar na fila; hh a altura (fração da faixa); yy onde fica na vertical; dx um desvio do passo
      return { k, hh: 0.56 + rr(3) * (0.24 + solto * 0.04), yy: 0.12 + rr(2) * 0.76, dx: (rr(1) - 0.5) * (0.5 + solto * 0.3), vel: 0.15 + rr(4) * 0.55, gx: (rr(8) - 0.5) * 0.5, gr: (rr(9) - 0.5) * 0.06 };
    });
    // quem está mais abaixo na cena fica por cima: assim nenhum retalho some inteiro sob o seguinte
    const cena = []; ordem.forEach((i, k) => (cena[i] = { ...pos[k], z: k + 1, rasgo: rasgo(seed, i) }));
    return cena;
  };

  V.ciberpoesia = () => {
    const pedida = sementePedida(), seed = pedida != null ? pedida : 1 + Math.floor(Math.random() * 999999);
    const CENA = geraCena(seed);
    return {
    rotulo: t('ciberCurto'), volta: '#/',
    html: `
    <article class="pagina ciber">
      <header class="cab ciber-cab">
        <p class="rotulo">01 · ${t('ciberCurto')}</p>
        <h1 class="titulo">${t('ciberpoesia')}</h1>
        <span class="traco"></span>
        <p class="cab-sub">${t('ciberLema')}</p>
        ${estrela('ciber-estrela')}
        <p class="nota-lateral">${t('ciberIntro')}</p>
        <details class="saiba">
          <summary>${t('saibaMais')}</summary>
          <p>${t('ciberSaiba')}</p>
          <a class="link-seta" href="#/exposicao/obras/3">${t('verObra')} ${seta}</a>
        </details>
        <p class="dica-baixo">${seta} ${t('escolha')}</p>
      </header>
      <section class="cena" aria-label="${t('ciberpoesia')}" data-seed="${seed}">
        <div class="cena-fundo" aria-hidden="true">${circulo('cena-circulo')}<span class="cena-eixo"></span></div>
        <div class="cena-rolo" tabindex="0" aria-label="${t('escolha')}">
          <div class="cena-trilho">
        ${EXERCICIOS.map((ex, i) => {
          const c = CENA[i];
          return `
          <div class="retalho" style="--k:${c.k};--dx:${c.dx.toFixed(3)};--hh:${c.hh.toFixed(3)};--yy:${c.yy.toFixed(3)};z-index:${c.k + 1}" data-vel="${c.vel}" data-gx="${c.gx.toFixed(3)}" data-gr="${c.gr.toFixed(4)}" data-i="${i}" data-k="${c.k}">
            <a class="ret-abre" href="#/ciberpoesia/${i + 1}" draggable="false" aria-label="${t('fragmento')} ${dois(i + 1)}: ${esc(L(ex.titulo))}">
              <span class="ret-bal${i % 2 ? ' bal-b' : ''}" style="animation-duration:${(5.2 + ((i * 37) % 29) / 10).toFixed(1)}s;animation-delay:-${((i * 53) % 70) / 10}s"><span class="ret-frente papel-${c.rasgo.papel}" style="${c.rasgo.clip}"><img src="${src(FRAGMENTOS[i])}" alt="" width="280" height="809" loading="lazy" decoding="async">${c.rasgo.svg}<i>${dois(i + 1)}</i></span></span>
            </a>
          </div>`;
        }).join('')}
          </div>
        </div>
        <button type="button" class="cena-seta ant" aria-label="${t('fragAnterior')}"><svg viewBox="0 0 12 24" aria-hidden="true"><path d="M10 2L2 12l8 10"/></svg></button>
        <button type="button" class="cena-seta prox" aria-label="${t('fragProximo')}"><svg viewBox="0 0 12 24" aria-hidden="true"><path d="M2 2l8 10-8 10"/></svg></button>
      </section>
      <div class="cena-paginas" role="group" aria-label="${t('escolha')}">${Array.from({ length: 8 }, (_, p) => `<button type="button" aria-label="${dois(p * 2 + 1)}–${dois(p * 2 + 2)}"></button>`).join('')}</div>
      <p class="cena-dica">${estrela('cena-dica-estrela')}<span>${t('toqueFragmento')}</span></p>
    </article>`,
    montar(raiz) {
      const cena = $('.cena', raiz), rolo = $('.cena-rolo', raiz), trilho = $('.cena-trilho', raiz);
      const rets = $$('.retalho', raiz).sort((a, b) => a.dataset.k - b.dataset.k); // na ordem da fila
      const quadrados = $$('.cena-paginas button', raiz), antB = $('.cena-seta.ant', raiz), proxB = $('.cena-seta.prox', raiz);
      // Movimento (física do Oráculo Serpentina), agora na rolagem horizontal da faixa: a cada passo, cada
      // retalho recebe impulsos de uma onda própria + um ruído e desacelera com atrito, parando onde estiver;
      // um parallax leve faz os papéis deslizarem uns sobre os outros. Nada sai da faixa na vertical.
      const est = rets.map((r) => ({
        r, x: 0, y: 0, g: 0, vx: 0, vy: 0, vg: 0,
        vel: +r.dataset.vel, fx: 0.009 + Math.abs(+r.dataset.gx) * 0.012, fy: 0.008 + Math.abs(+r.dataset.gr) * 0.25,
        px: +r.dataset.i * 1.7 + (+r.dataset.gx > 0 ? 0 : Math.PI), py: +r.dataset.i * 2.3, esq: 0, larg: 0, yMin: 0, yMax: 0,
      }));
      const andando = new Set();
      let ch = 0, rw = 0, sw = 0, ultimoX = 0, pedido = 0, atual = -1;
      // tudo o que é medida sai daqui, uma vez no início e a cada resize/orientação; durante a rolagem e o
      // balanço nada lê altura, largura ou posição do layout. Os limites verticais de cada papel são fixos
      // (a caixa dele dentro da faixa); ao inclinar e balançar, as pontas podem sobrevoar um pouco fora da faixa.
      const mede = () => {
        ch = trilho.clientHeight; rw = rolo.clientWidth; sw = rolo.scrollWidth; ultimoX = rolo.scrollLeft;
        est.forEach((s) => {
          const topo = s.r.offsetTop, alt = s.r.offsetHeight; s.esq = s.r.offsetLeft; s.larg = s.r.offsetWidth;
          s.yMin = Math.min(0, -topo); s.yMax = Math.max(0, ch - topo - alt);
        });
      };
      const pinta = (s) => {
        const r = s.r;
        const dist = s.esq + s.larg / 2 - ultimoX - rw / 2;
        if (Math.abs(dist) > rw * 1.5 && s.pintado) return; // longe da tela: não mexe (é repintado ao se aproximar)
        s.pintado = true;
        const d = dist * s.vel * -0.12;
        const dy = Math.max(s.yMin, Math.min(s.yMax, s.y));
        const escala = 1 - Math.min(0.08, Math.abs(dist) / Math.max(rw, 1) * 0.08);
        r.style.transform = `translate3d(${(d + s.x).toFixed(1)}px, ${dy.toFixed(1)}px, 0) rotate(${s.g.toFixed(2)}deg) scale(${escala.toFixed(3)})`;
      };
      const marca = () => {
        // o retalho mais perto do centro é o atual: moldura fina, como no mockup, e o quadrado da sua página
        const meio = ultimoX + rw / 2;
        let k = 0, m = Infinity; est.forEach((s, j) => { const d = Math.abs(s.esq + s.larg / 2 - meio); if (d < m) { m = d; k = j; } });
        if (k !== atual) { atual = k; rets.forEach((r, j) => r.classList.toggle('atual', j === k)); quadrados.forEach((q, p) => q.setAttribute('aria-current', p === Math.floor(k / 2) ? 'true' : 'false')); }
        // as pontas são o primeiro e o último retalho no centro (o encaixe não deixa ir além)
        const alvo = (s) => Math.max(0, Math.min(sw - rw, s.esq + s.larg / 2 - rw / 2));
        antB.disabled = ultimoX <= alvo(est[0]) + 2; proxB.disabled = ultimoX >= alvo(est[est.length - 1]) - 2;
      };
      const quadro = () => {
        pedido = 0;
        marca();
        if (reduz()) { rets.forEach((r) => (r.style.transform = '')); return; }
        andando.forEach((s) => {
          s.vx *= 0.86; s.vy *= 0.86; s.vg *= 0.86;
          if (s.x > 30) s.vx -= (s.x - 30) * 0.2; else if (s.x < -30) s.vx -= (s.x + 30) * 0.2;
          if (s.y > 30) s.vy -= (s.y - 30) * 0.2; else if (s.y < -30) s.vy -= (s.y + 30) * 0.2;
          if (s.g > 4) s.vg -= (s.g - 4) * 0.2; else if (s.g < -4) s.vg -= (s.g + 4) * 0.2;
          s.x = Math.max(-40, Math.min(40, s.x + s.vx));
          s.y = Math.max(-40, Math.min(40, s.y + s.vy));
          s.g = Math.max(-6, Math.min(6, s.g + s.vg));
          if (Math.abs(s.vx) < 0.015 && Math.abs(s.vy) < 0.015 && Math.abs(s.vg) < 0.004) andando.delete(s);
        });
        est.forEach(pinta);
        if (andando.size) pedido = requestAnimationFrame(quadro);
      };
      const pede = () => { if (!pedido) pedido = requestAnimationFrame(quadro); };
      // vai até o retalho j (no centro da faixa), suave
      const vai = (j) => {
        j = Math.max(0, Math.min(est.length - 1, j)); const s = est[j];
        rolo.scrollTo({ left: s.esq + s.larg / 2 - rw / 2, behavior: reduz() ? 'auto' : 'smooth' });
      };
      mede();
      // começa com a faixa cheia: o primeiro da fila encostado na borda esquerda
      const inicio = est.findIndex((s) => s.esq + s.larg / 2 - rw / 2 >= est[0].esq - 16);
      if (inicio > 0) { const s0 = est[inicio]; rolo.scrollLeft = s0.esq + s0.larg / 2 - rw / 2; }
      ultimoX = rolo.scrollLeft; quadro();
      // entrada da faixa quando ela aparece na tela: fundo primeiro, retalhos depois, da esquerda para a direita
      const entrada = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { cena.classList.add('entra'); entrada.disconnect(); } }, { rootMargin: '0px 0px -20% 0px' });
      entrada.observe(cena); limpezas.push(() => entrada.disconnect());
      // fora da tela, o balanço dos papéis pausa (menos trabalho para o celular)
      const longe = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('longe', !e.isIntersecting)), { root: rolo, rootMargin: '0px 25%' });
      rets.forEach((r) => longe.observe(r)); limpezas.push(() => longe.disconnect());
      ao(rolo, 'scroll', () => {
        const x = rolo.scrollLeft, passo = Math.min(Math.abs(x - ultimoX), 32); ultimoX = x;
        if (passo >= 0.5 && !reduz()) est.forEach((s) => {
          if (Math.abs(s.esq + s.larg / 2 - x - rw / 2) > rw * 1.2) return; // só os que estão perto da tela
          andando.add(s);
          s.px += passo * s.fx; s.py += passo * s.fy;
          s.vx += (Math.sin(s.px) + (Math.random() - 0.5) * 1.2) * passo * 0.05;
          s.vy += (Math.cos(s.py) + (Math.random() - 0.5) * 1.4) * passo * 0.05;
          s.vg += (Math.sin(s.px * 0.8 + s.py) + (Math.random() - 0.5) * 1.2) * passo * 0.01;
          if (passo > 16 && Math.random() < 0.05) { s.vx += (Math.random() - 0.5) * 4; s.vy += (Math.random() - 0.5) * 4; }
        });
        pede();
      }, { passive: true });
      ao(window, 'resize', () => { mede(); pede(); });
      limpezas.push(() => cancelAnimationFrame(pedido));
      // setas, quadrados e teclado
      ao(antB, 'click', () => vai(atual - 1));
      ao(proxB, 'click', () => vai(atual + 1));
      quadrados.forEach((q, p) => ao(q, 'click', () => vai(p * 2)));
      ao(window, 'keydown', (e) => {
        if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName || '')) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); vai(atual + (e.key === 'ArrowRight' ? 1 : -1)); }
      });
      // roda do mouse (vertical) no computador: passa um retalho por vez, com o cursor em qualquer ponto da página
      // desde que a faixa esteja inteira na tela (antes disso a roda só desce até ela); nas pontas, a página rola normalmente
      // a faixa anda com uma animação própria (posição guardada numa variável, sem ler o layout por quadro);
      // giros seguidos somam: o próximo passo parte do retalho de destino, não de onde a faixa está no meio do caminho
      let travaRoda = 0, rodaAlvo = -1, rodaX = 0, rodaFim = 0, rodaPedido = 0;
      const centro = (j) => Math.max(0, Math.min(sw - rw, est[j].esq + est[j].larg / 2 - rw / 2));
      const rodaAnda = () => {
        const d = rodaFim - rodaX;
        if (Math.abs(d) < 0.8) { rolo.scrollLeft = rodaFim; rolo.classList.remove('rodando'); rodaAlvo = -1; rodaPedido = 0; return; }
        rodaX += d * 0.16; rolo.scrollLeft = rodaX; rodaPedido = requestAnimationFrame(rodaAnda);
      };
      limpezas.push(() => cancelAnimationFrame(rodaPedido));
      ao(window, 'wheel', (e) => {
        if (e.ctrlKey || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return; // trackpad na horizontal: nativo
        if (document.body.classList.contains('menu-aberto')) return;
        if (!rolo.contains(e.target)) {
          const q = cena.getBoundingClientRect();
          if (q.top < -2 || q.bottom > innerHeight + 2) return;
        }
        const dir = Math.sign(e.deltaY), base = rodaAlvo >= 0 ? rodaAlvo : atual;
        const j = Math.max(0, Math.min(est.length - 1, base + dir));
        if (j === base || Math.abs(centro(j) - centro(base)) < 2) { if (rodaAlvo < 0) return; e.preventDefault(); return; } // na ponta: a página rola
        e.preventDefault();
        const agora = performance.now(); if (agora < travaRoda) return;
        travaRoda = agora + 140; rodaAlvo = j; rodaFim = centro(j);
        if (reduz()) { rolo.scrollLeft = rodaFim; rodaAlvo = -1; return; }
        if (!rodaPedido) { rodaX = rolo.scrollLeft; rolo.classList.add('rodando'); rodaPedido = requestAnimationFrame(rodaAnda); }
      }, { passive: false });
      // se a pessoa arrasta ou usa as setas no meio da animação, a roda solta a faixa
      const soltaRoda = () => { if (rodaPedido) { cancelAnimationFrame(rodaPedido); rodaPedido = 0; rodaAlvo = -1; rolo.classList.remove('rodando'); } };
      ao(rolo, 'pointerdown', soltaRoda); [antB, proxB, ...quadrados].forEach((q) => ao(q, 'click', soltaRoda, true));
      // arrastar com o mouse (no dedo o navegador já rola sozinho)
      let arrasto = null, arrastou = false;
      ao(rolo, 'pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        arrasto = { x: e.clientX, s: rolo.scrollLeft }; arrastou = false;
      });
      ao(window, 'pointermove', (e) => {
        if (!arrasto) return;
        const dx = e.clientX - arrasto.x;
        if (!arrastou && Math.abs(dx) > 5) { arrastou = true; rolo.classList.add('arrastando'); }
        if (arrastou) rolo.scrollLeft = arrasto.s - dx;
      });
      ao(window, 'pointerup', () => {
        if (!arrasto) return; arrasto = null;
        if (arrastou) { rolo.classList.remove('arrastando'); marca(); vai(atual); }
      });
      // tocar num fragmento abre o exercício direto (como no mockup); arrastar, com o dedo ou o mouse, só rola a faixa:
      // só vale como toque se o dedo andou menos de 8 px, durou menos de 300 ms e a faixa não rolou no meio
      let toque = null;
      ao(rolo, 'pointerdown', (e) => { toque = { x: e.clientX, y: e.clientY, t: performance.now(), s: rolo.scrollLeft, mouse: e.pointerType === 'mouse' }; });
      ao(rolo, 'pointercancel', () => (toque = null));
      ao(rolo, 'click', (e) => {
        const a = e.target.closest('.ret-abre'); if (!a) return;
        if (arrastou) { arrastou = false; e.preventDefault(); return; } // fim de um arrasto com o mouse
        const q = toque; toque = null;
        if (e.detail === 0 || !q) return; // teclado (Enter) abre sempre
        const andou = Math.hypot(e.clientX - q.x, e.clientY - q.y) >= 8 || Math.abs(rolo.scrollLeft - q.s) >= 8;
        if (andou || (!q.mouse && performance.now() - q.t > 300)) e.preventDefault();
      });
    },
    };
  };

  // faixa do título de cada exercício: uma imagem sorteada do baralho comum (fragmentos + páginas de
  // diário), com recorte e escala aleatórios, a borda de baixo rasgada (dentes em px, posições em %)
  const faixaTitulo = () => {
    const todas = [...FRAGMENTOS, ...DIARIOS.flatMap((d) => d.imgs)], r = Math.random;
    const img = todas[Math.floor(r() * todas.length)];
    const ox = Math.round(r() * 100), oy = Math.round(r() * 100), esc = (1.1 + r() * 0.9).toFixed(2);
    const n = 46, pts = ['0 0', '100% 0'];
    let d = 4 + r() * 6;
    for (let j = n; j >= 0; j--) {
      d = Math.max(1, Math.min(16, d + (r() - 0.5) * 7)); // dentes miúdos sobre uma onda larga
      pts.push(`${(j / n * 100).toFixed(2)}% calc(100% - ${(d + (j % 2 ? r() * 4 : 0)).toFixed(1)}px)`);
    }
    const poli = `polygon(${pts.join(',')})`;
    return { img, clip: `-webkit-clip-path:${poli};clip-path:${poli}`, recorte: `object-position:${ox}% ${oy}%;transform:scale(${esc});transform-origin:${ox}% ${oy}%` };
  };

  V.exercicio = (n) => {
    const i = Math.min(Math.max(1, n | 0), EXERCICIOS.length) - 1, ex = EXERCICIOS[i];
    const ant = ((i - 1 + 16) % 16) + 1, prox = ((i + 1) % 16) + 1, faixa = faixaTitulo();
    return {
      rotulo: `${t('exercicio')} ${dois(i + 1)} / 16`, volta: '#/ciberpoesia',
      html: `
      <article class="pagina exercicio" data-tipo="${ex.tipo}">
        <div class="ex-faixa">
          <div class="faixa-papel textura papel-${Math.floor(Math.random() * 4)}" aria-hidden="true" style="${faixa.clip};--pp:${Math.floor(Math.random() * 190)}px ${Math.floor(Math.random() * 190)}px"><img src="${src(faixa.img)}" alt="" style="${faixa.recorte}"><span class="faixa-veu"></span></div>
          <h1 class="titulo faixa-titulo">${esc(L(ex.titulo))}<span class="traco"></span></h1>
        </div>
        <header class="ex-cab">
          <p class="indice">${t('fragmento')} ${dois(i + 1)} · ${L(DIARIOS.find((d) => d.id === ORIGEM_FRAGMENTO(i)).nome)} · ${TEXTOS[lingua].familias[ex.familia]}</p>
          <p class="ex-instrucao">${esc(L(ex.instrucao))}</p>
        </header>
        <div class="ex-palco" aria-live="polite"></div>
        <div class="ex-acoes">
          <button type="button" class="botao ex-reinicia"><span aria-hidden="true">↺</span> ${t('reiniciar')}</button>
        </div>
        <p class="ex-feito" aria-live="polite"></p>
        <nav class="obra-nav ex-nav">
          <a href="#/ciberpoesia/${ant}"><span aria-hidden="true">←</span> ${t('exAnterior')}</a>
          <a href="#/ciberpoesia/${prox}">${t('exProximo')} <span aria-hidden="true">→</span></a>
        </nav>
        <p class="ex-volta"><a class="link-seta" href="#/ciberpoesia">${t('voltarArquivo')}</a></p>
      </article>`,
      montar(raiz) {
        const palco = $('.ex-palco', raiz), acoes = $('.ex-acoes', raiz), feitoEl = $('.ex-feito', raiz);
        let desmonta = null, extras = [];
        const inicia = () => {
          if (desmonta) try { desmonta(); } catch {}
          extras.forEach((b) => b.remove()); extras = [];
          palco.innerHTML = ''; palco.className = 'ex-palco'; feitoEl.textContent = ''; raiz.classList.remove('esquecido');
          desmonta = EXERCICIO_MONTA(ex.tipo, {
            palco, lingua, L, t, src, reduz: reduz(), ex,
            fragmento: FRAGMENTOS[i], diario: DIARIOS.find((d) => d.id === ORIGEM_FRAGMENTO(i)).imgs[i % 4],
            vizinhos: [FRAGMENTOS[i], FRAGMENTOS[(i + 5) % 16], FRAGMENTOS[(i + 11) % 16]],
            todas: [...FRAGMENTOS, ...DIARIOS.flatMap((d) => d.imgs)],
            botao(txt, fn) {
              const b = document.createElement('button'); b.type = 'button'; b.className = 'botao'; b.innerHTML = txt;
              b.addEventListener('click', fn); acoes.prepend(b); extras.push(b); return b;
            },
            feito() { if (raiz.classList.contains('esquecido')) return; raiz.classList.add('esquecido'); feitoEl.textContent = t('feito'); },
            privado() { const p = document.createElement('p'); p.className = 'ex-privado'; p.textContent = t('privacidade'); palco.appendChild(p); },
          });
        };
        inicia();
        ao($('.ex-reinicia', raiz), 'click', inicia);
        limpezas.push(() => { if (desmonta) desmonta(); });
      },
    };
  };

  // contorno de papel rasgado nos quatro lados (dentes miúdos sobre uma onda larga), em polygon() de clip-path
  const rasgoTodo = () => {
    const r = Math.random, pts = [], n = 22;
    const lado = (fn) => { let d = 2 + r() * 3; for (let j = 0; j < n; j++) { d = Math.max(0.6, Math.min(7, d + (r() - 0.5) * 3)); fn(j / n * 100, d + (j % 2 ? r() * 2 : 0)); } };
    lado((q, d) => pts.push(`${q.toFixed(2)}% ${d.toFixed(1)}px`));
    lado((q, d) => pts.push(`calc(100% - ${d.toFixed(1)}px) ${q.toFixed(2)}%`));
    lado((q, d) => pts.push(`${(100 - q).toFixed(2)}% calc(100% - ${d.toFixed(1)}px)`));
    lado((q, d) => pts.push(`${d.toFixed(1)}px ${(100 - q).toFixed(2)}%`));
    return `polygon(${pts.join(',')})`;
  };

  const fotoPapel = (nome, alt, w, h, credito) => { const c = rasgoTodo(); return `<figure class="sobre-foto" style="--gira:${(Math.random() * 3 - 1.5).toFixed(2)}deg"><div class="sobre-foto-papel" style="-webkit-clip-path:${c};clip-path:${c}"><img src="${src(nome)}" alt="${esc(L(alt))}" width="${w}" height="${h}" loading="lazy"></div>${credito ? `<figcaption>${{ pt: 'foto', es: 'foto', en: 'photo' }[lingua]}: ${esc(credito)}</figcaption>` : ''}</figure>`; };
  V.sobre = () => ({
    rotulo: t('sobre'), volta: '#/',
    html: `
    <article class="pagina sobre">
      <header class="cab">
        <p class="rotulo">${t('sobre')} / ${t('creditos')}</p>
        <h1 class="titulo">${t('titulo1')} ${t('titulo2')}</h1>
        <span class="traco"></span>
        <p class="cab-sub">${t('sub')}</p>
      </header>
      <section class="sobre-bloco" aria-labelledby="h-art">
        <p class="rotulo">${t('sobreArtista')}</p>
        <h2 id="h-art" class="titulo">${SOBRE.artista.nome}</h2>
        <p class="cab-sub">${L(SOBRE.artista.papel)}</p>
        ${fotoPapel('site/artista', SOBRE.artista.fotoAlt, 675, 900, SOBRE.artista.fotoCredito)}
        <div class="texto-longo">${L(SOBRE.artista.bio).map((p) => `<p>${esc(p)}</p>`).join('')}
          <p class="indice sobre-sub">${t('sobreObras')}</p>
          ${L(SOBRE.artista.texto).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        <a class="botao" href="${SOBRE.site}" target="_blank" rel="noopener">${t('siteArtista')} ↗</a>
      </section>
      <section class="sobre-bloco cv" aria-labelledby="h-cv">
        <p class="rotulo">${SOBRE.artista.nome}</p>
        <h2 id="h-cv" class="titulo">${t('curriculo')}</h2>
        <span class="traco"></span>
        <p class="cv-origem">${esc(L(CV.origem))}</p>
        ${CV.secoes.map((c) => `<h3 class="subtitulo">${L(c.t)}</h3>
        <dl class="ficha cv-lista">${c.itens.map(([a, x]) => `<div><dt>${esc(a.replace('atual', t('atual')))}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>`).join('')}
        <p class="cv-redes">${CV.redes.map(([n, u]) => `<a class="link-seta" href="${u}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join('')}</p>
      </section>
      <section class="sobre-bloco" aria-labelledby="h-cur2">
        <p class="rotulo">${t('sobreCurador')}</p>
        <h2 id="h-cur2" class="titulo">${SOBRE.curador.nome}</h2>
        <p class="cab-sub">${L(SOBRE.curador.papel)}</p>
        ${fotoPapel('site/curador', SOBRE.curador.fotoAlt, 637, 900)}
        <div class="texto-longo">${L(SOBRE.curador.bio).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        <p class="cv-redes"><a class="link-seta" href="${SOBRE.curador.instagram}" target="_blank" rel="noopener">Instagram /myycnn ↗</a></p>
        <a class="link-seta" href="#/exposicao">${t('curatorial')} ${seta}</a>
      </section>
      <section class="sobre-bloco" aria-labelledby="h-cred">
        <p class="rotulo" id="h-cred">${t('creditos')}</p>
        <dl class="ficha">${EXPOSICAO.ficha.map((f) => `<div><dt>${L(f.r)}</dt><dd>${esc(L(f.v))}</dd></div>`).join('')}</dl>
        <p class="rotulo cred-site">${t('creditosSite')}</p>
        <dl class="ficha">${CREDITOS_SITE.map((f) => `<div><dt>${L(f.r)}</dt><dd>${esc(L(f.v))}</dd></div>`).join('')}</dl>
      </section>
      <nav class="obra-nav"><a href="#/exposicao">${t('exposicao')} ${seta}</a><a href="#/diarios">${t('diarios')} ${seta}</a><a href="#/ciberpoesia">${t('ciberCurto')} ${seta}</a></nav>
    </article>`,
  });

  // ---------- rodapé expansível: apoio e colaboração ----------
  const rodape = document.createElement('footer');
  rodape.className = 'rodape';
  document.body.insertBefore(rodape, $('#menu'));
  function desenhaRodape(pe) {
    rodape.innerHTML = `
      <details class="rodape-gaveta">
        <summary><span class="rodape-linha" aria-hidden="true"></span><span>${t('rodape')}</span><span class="rodape-mais" aria-hidden="true">+</span></summary>
        <div class="rodape-dentro">
          ${SOBRE.logos.map((g) => `<figure class="logos"><figcaption class="indice">${t(g.rot)}</figcaption><img src="${src(g.img)}" alt="${esc(g.alt)}" loading="lazy"></figure>`).join('')}
          <p class="rodape-pe"><span>${t('titulo1')} ${t('titulo2')} · Lohanna Lonelas · 2026</span><a href="#/sobre">${t('sobre')} / ${t('creditos')}</a></p>
        </div>
      </details>
      ${pe ? `<img class="rodape-textura ${pe}" src="${src('textura/' + pe)}" alt="">` : ''}`;
  }

  // ---------- rotas ----------
  const vista = $('#vista');
  let ultimaRota = '';
  function rota() {
    const h = location.hash.replace(/^#\/?/, '').replace(/\?.*$/, '').replace(/\/$/, '');
    if (h === 'vista') return; // link "pular para o conteúdo"
    const p = h.split('/');
    let v;
    if (!h) v = V.inicio();
    else if (p[0] === 'exposicao' && p[1] === 'obras' && p[2]) v = V.obra(p[2]);
    else if (p[0] === 'exposicao' && p[1] === 'obras') v = V.obras();
    else if (p[0] === 'exposicao' && p[1] === 'construcao') v = V.construcao();
    else if (p[0] === 'exposicao') v = V.exposicao();
    else if (p[0] === 'diarios' && p[1]) v = V.diario(p[1]);
    else if (p[0] === 'diarios') v = V.diarios();
    else if (p[0] === 'ciberpoesia' && p[1]) v = V.exercicio(p[1]);
    else if (p[0] === 'ciberpoesia') v = V.ciberpoesia();
    else if (p[0] === 'sobre') v = V.sobre();
    else v = V.inicio();

    limpar();
    document.documentElement.lang = { pt: 'pt-BR', es: 'es', en: 'en' }[lingua];
    if (debugFrag) debugFrag.value = p[0] === 'ciberpoesia' && /^\d+$/.test(p[1] || '') ? p[1] : '';
    document.body.dataset.vista = p[0] === 'ciberpoesia' && p[1] ? 'exercicio' : p[0] === 'diarios' && p[1] ? 'diario' : p[0] === 'exposicao' && p[1] === 'obras' && p[2] ? 'obra' : p[0] === 'exposicao' && p[1] ? p[1] : p[0] || 'inicio';
    document.body.classList.toggle('tela-cheia', v.classe === 'tela-cheia');
    voltar.hidden = !v.volta; if (v.volta) { voltar.href = v.volta; voltar.setAttribute('aria-label', `${t('voltar')}: ${v.rotulo || ''}`); }
    rotulo.textContent = v.rotulo || '';
    casa.hidden = document.body.dataset.vista === 'inicio'; casa.setAttribute('aria-label', t('paginaInicial'));
    vista.innerHTML = v.html;
    const aberto = $('.rodape-gaveta')?.open; desenhaRodape(v.pe === undefined ? 'pe' : v.pe); if (aberto) $('.rodape-gaveta').open = true;
    rodape.hidden = v.classe === 'tela-cheia';
    if (h !== ultimaRota) { window.scrollTo(0, 0); if (ultimaRota !== '') vista.focus({ preventScroll: true }); }
    ultimaRota = h;
    v.montar?.(vista);
    $('.pular').textContent = { pt: 'pular para o conteúdo', es: 'saltar al contenido', en: 'skip to content' }[lingua];
    vista.classList.remove('entra'); void vista.offsetWidth; vista.classList.add('entra');
  }

  desenhaLinguas(); desenhaMenu();
  window.addEventListener('hashchange', rota);
  addEventListener('scroll', () => topo.classList.toggle('rolou', scrollY > 8), { passive: true });
  rota();
})();
