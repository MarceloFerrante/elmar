// Os 16 exercícios de esquecimento, feitos dentro do site (7 famílias do briefing).
// Cada mecânica recebe ctx (palco, textos, imagens, botao(), feito(), privado())
// e devolve uma função que desliga tudo. Nada do que se escreve sai do aparelho:
// não há rede, armazenamento nem envio; ao recomeçar ou sair, some.
const EXERCICIO_MONTA = (() => {
  'use strict';
  const TINTA = '#1d1b19', PAPEL = '#fbfaf7', OCRE = '#c98d2e', OLIVA = '#7b7f52', MINERAL = '#8c8a84';

  // sorteia uma imagem do mesmo baralho do 15 (fragmentos + páginas de diário), sem repetir a última sorteada
  let ultimaSorteada = null;
  const sorteiaImagem = (ctx) => {
    const todas = ctx.todas && ctx.todas.length > 1 ? ctx.todas : [ctx.diario];
    let ultima = ultimaSorteada;
    try { ultima = sessionStorage.getItem('ex-ultima-imagem') || ultima; } catch {}
    const opcoes = todas.filter((s) => s !== ultima);
    const s = (opcoes.length ? opcoes : todas)[Math.floor(Math.random() * (opcoes.length || todas.length))];
    ultimaSorteada = s;
    try { sessionStorage.setItem('ex-ultima-imagem', s); } catch {}
    return s;
  };

  // textos de exemplo quando a pessoa não escreve nada
  const PADRAO = {
    frase: { pt: 'a casa onde a maré chegava à porta', es: 'la casa donde la marea llegaba a la puerta', en: 'the house where the tide came to the door' },
    nome: { pt: 'borborema', es: 'borborema', en: 'borborema' },
    palavra: { pt: 'saudade', es: 'nostalgia', en: 'longing' },
    escreva: { pt: 'escreva aqui', es: 'escribe aquí', en: 'write here' },
    data: { pt: 'a data', es: 'la fecha', en: 'the date' },
    ok: { pt: 'pronto', es: 'listo', en: 'done' },
    somar: { pt: 'somar', es: 'sumar', en: 'add' },
    dividir: { pt: 'dividir', es: 'dividir', en: 'divide' },
    multiplicar: { pt: 'multiplicar', es: 'multiplicar', en: 'multiply' },
    deixar: { pt: 'deixar ir', es: 'dejar ir', en: 'let it go' },
    somaDig: { pt: 'somar os algarismos', es: 'sumar las cifras', en: 'add the digits' },
    resposta: { pt: 'resposta', es: 'respuesta', en: 'answer' },
    porMim: { pt: 'desenhar por mim', es: 'dibujar por mí', en: 'draw for me' },
    soprar: { pt: 'soprar', es: 'soplar', en: 'blow' },
    desfazer: { pt: 'desfazer', es: 'deshacer', en: 'undo' },
    completar: { pt: 'completar', es: 'completar', en: 'complete' },
    alinhar: { pt: 'alinhar', es: 'alinear', en: 'align' },
    ponto: { pt: 'dar um ponto', es: 'dar una puntada', en: 'make a stitch' },
    fundo: { pt: 'mandar para o fundo', es: 'mandar al fondo', en: 'send to the back' },
    cobrir: { pt: 'cobrir a próxima palavra', es: 'cubrir la palabra siguiente', en: 'cover the next word' },
    apertar: { pt: 'segure aqui', es: 'mantén aquí', en: 'hold here' },
    partida: { pt: 'praia', es: 'playa', en: 'beach' },
    chegada: { pt: 'brejo', es: 'brejo', en: 'brejo' },
    dataInvalida: { pt: 'use dia / mês / ano', es: 'usa día / mes / año', en: 'use day / month / year' },
  };

  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const carrega = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = s; });
  // texturas de papel (as mesmas dos fragmentos, papel-0…3): em peças do DOM, a classe .textura papel-N põe o relevo por cima;
  // num <img>, um véu .textura-veu; em canvas, texturiza() devolve a imagem já com o relevo multiplicado
  const sorteiaPapel = () => Math.floor(Math.random() * 4);
  const papel = (alvo, n = sorteiaPapel()) => {
    alvo.classList.add('textura', 'papel-' + n);
    alvo.style.setProperty('--pp', `${Math.floor(Math.random() * 190)}px ${Math.floor(Math.random() * 190)}px`);
    return n;
  };
  const veu = (img) => { const v = el('div', 'textura-veu'); papel(v); img.after(v); return v; };
  const texturas = {}, urls = {};
  // endereço da imagem da textura n (lida do CSS, onde ela já está embutida)
  const urlPapel = (n) => {
    if (n in urls) return urls[n];
    const d = el('div', 'textura papel-' + n); d.style.cssText = 'position:absolute;width:1px;height:1px;visibility:hidden'; document.body.appendChild(d);
    const bg = getComputedStyle(d, '::after').backgroundImage; d.remove();
    const m = /url\(["']?(.*?)["']?\)/.exec(bg || ''); return (urls[n] = m ? m[1] : null);
  };
  const textura = (n) => texturas[n] || (texturas[n] = new Promise((ok) => { const u = urlPapel(n); if (u) carrega(u).then(ok); else ok(null); }));
  // esc: quantos px de tela cada px da imagem ocupa (o relevo fica do mesmo tamanho que nos fragmentos)
  const texturiza = async (im, n, esc = 1) => {
    const t = await textura(n); if (!im || !t) return im;
    const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const g = c.getContext('2d');
    g.drawImage(im, 0, 0); const pt = g.createPattern(t, 'repeat'); if (pt.setTransform) pt.setTransform(new DOMMatrix().scale(1 / esc));
    g.globalCompositeOperation = 'multiply'; g.fillStyle = pt; g.fillRect(0, 0, c.width, c.height); return c;
  };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const limita = (v, a, b) => Math.max(a, Math.min(b, v));
  // —— papel rasgado e amassado (13, 14, 15) ——
  // perfil de um rasgo: m+1 valores entre 0 e 1, uma ondulação lenta com dentes miúdos por cima
  const perfil = (m) => {
    const q = Math.random, v = []; let lento = q(), alvo = q(), passo = 0;
    for (let j = 0; j <= m; j++) {
      if (passo-- <= 0) { alvo = q(); passo = 5 + Math.floor(q() * 12); }
      lento += (alvo - lento) * 0.2;
      v.push(limita(0.7 * lento + 0.3 * q(), 0, 1));
    }
    return v;
  };
  // quais lados da folha são rasgados: 2 ou 3 dos 4, sorteados (os outros ficam retos, cortados)
  const ladosRasgados = () => { const s = new Set(), n = Math.random() < 0.5 ? 2 : 3; while (s.size < n) s.add('trbl'[Math.floor(Math.random() * 4)]); return s; };
  // contorno de uma folha W×H px, com os lados indicados rasgados até amp px para dentro
  const contorno = (W, H, amp, rasgados, passo = 4) => {
    const pts = [];
    const lado = (de, ate, f, r) => {
      const m = Math.max(1, Math.round(Math.abs(ate - de) / passo)), v = r ? perfil(m) : null;
      for (let j = 0; j < m; j++) pts.push(f(de + ((ate - de) * j) / m, r ? amp * (0.12 + 0.88 * v[j]) : 0));
    };
    lado(0, W, (x, d) => [x, d], rasgados.has('t'));
    lado(0, H, (y, d) => [W - d, y], rasgados.has('r'));
    lado(W, 0, (x, d) => [x, H - d], rasgados.has('b'));
    lado(H, 0, (y, d) => [d, y], rasgados.has('l'));
    return pts;
  };
  const poligono = (pts, W, H) => 'polygon(' + pts.map(([x, y]) => `${((x / W) * 100).toFixed(2)}% ${((y / H) * 100).toFixed(2)}%`).join(',') + ')';
  const recorte = (alvo, forma) => { alvo.style.clipPath = forma; alvo.style.webkitClipPath = forma; };
  // amassado leve: cinza neutro com vincos (uma aresta de luz e sombra ao longo de uma reta) e ondulações largas,
  // aplicado por cima da imagem com soft-light (cinza médio não muda nada); feito em baixa resolução, é liso de todo jeito
  const amassado = (W, H, forca = 1) => {
    const s = 1 / 3, c = document.createElement('canvas'); c.width = Math.max(8, Math.round(W * s)); c.height = Math.max(8, Math.round(H * s));
    const g = c.getContext('2d'); g.scale(s, s); g.fillStyle = '#808080'; g.fillRect(0, 0, W, H);
    const q = Math.random, D = Math.hypot(W, H);
    for (let i = 0; i < 5; i++) {
      const x = q() * W, y = q() * H, r = D * (0.15 + q() * 0.3), cor = i % 2 ? '255,255,255' : '0,0,0';
      const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${cor},${(0.16 * forca).toFixed(3)})`); gr.addColorStop(1, `rgba(${cor},0)`);
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
    }
    const n = 5 + Math.floor(q() * 4);
    for (let i = 0; i < n; i++) {
      const x = q() * W, y = q() * H, a = q() * Math.PI, nx = -Math.sin(a), ny = Math.cos(a), w = D * (0.025 + q() * 0.05), f = Math.min(0.6, (0.16 + q() * 0.16) * forca);
      const gr = g.createLinearGradient(x - nx * w, y - ny * w, x + nx * w, y + ny * w);
      gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.46, `rgba(255,255,255,${f})`); gr.addColorStop(0.5, `rgba(0,0,0,${f * 1.3})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.save();
      // metade dos vincos morre no meio da folha, como uma dobra que não atravessa
      if (q() < 0.5) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * D + nx * D, y + Math.sin(a) * D + ny * D); g.lineTo(x + Math.cos(a) * D - nx * D, y + Math.sin(a) * D - ny * D); g.closePath(); g.clip(); }
      g.fillStyle = gr; g.fillRect(0, 0, W, H); g.restore();
    }
    return c;
  };
  const amassa = (alvo, W, H, forca) => { const c = amassado(W, H, forca); alvo.style.setProperty('--am', `url(${c.toDataURL('image/jpeg', 0.85)})`); return c; };
  // folha de papel rasgado (2 ou 3 lados), com textura n, amassado e sombra, sobre a mesa do palco (5, 6);
  // devolve o papel, onde vai o conteúdo, centralizado; o recorte acompanha o tamanho da folha
  const folhaRasgada = (ctx, k, n, onde = ctx.palco) => {
    if (onde === ctx.palco) ctx.palco.classList.add('com-folha');
    const sombra = el('div', 'folha-rasgada'), f = el('div', 'folha-papel amassa'); sombra.appendChild(f);
    const priv = [...onde.children].find((c) => c.classList.contains('ex-privado'));
    onde.insertBefore(sombra, priv || null);
    papel(f, n);
    const lados = ladosRasgados(); let pw = 0, ph = 0;
    const recorta = () => {
      const W = f.offsetWidth, H = f.offsetHeight; if (!W || !H || (Math.abs(W - pw) < 1 && Math.abs(H - ph) < 1)) return;
      pw = W; ph = H; recorte(f, poligono(contorno(W, H, limita(Math.min(W, H) * 0.045, 6, 14), lados), W, H)); amassa(f, W, H);
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(recorta); ro.observe(f); k.desl.push(() => ro.disconnect()); }
    else { k.ao(window, 'resize', recorta); k.depois(0, recorta); }
    return f;
  };
  const local = (e, alvo) => { const r = alvo.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  function montador(ctx) {
    const desl = [];
    const T = (k) => ctx.L(PADRAO[k]);
    const ao = (alvo, ev, fn, op) => { alvo.addEventListener(ev, fn, op); desl.push(() => alvo.removeEventListener(ev, fn, op)); };
    const laco = (fn) => {
      let id = 0, vivo = true;
      const passo = (ts) => { if (!vivo) return; if (fn(ts) !== false) id = requestAnimationFrame(passo); };
      id = requestAnimationFrame(passo);
      const para = () => { vivo = false; cancelAnimationFrame(id); };
      desl.push(para); return para;
    };
    const depois = (ms, fn) => { const id = setTimeout(fn, ms); desl.push(() => clearTimeout(id)); };
    // tela de desenho do tamanho do palco
    const tela = (altura) => {
      // no computador o palco tem altura mínima maior que a tela padrão: a tela cobre o palco inteiro, sem faixa branca embaixo
      const minimo = parseFloat(getComputedStyle(ctx.palco).minHeight) || 0;
      const w = Math.max(240, ctx.palco.clientWidth), h = Math.round(altura || Math.max(minimo, Math.min(420, Math.max(260, w * 0.72))));
      const cv = el('canvas', 'ex-tela'); const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
      const cx = cv.getContext('2d'); cx.scale(dpr, dpr);
      ctx.palco.appendChild(cv);
      return { cv, cx, w, h };
    };
    const envia = (f) => { if (f.isConnected) (f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { cancelable: true }))); };
    // entrada de texto local (nunca enviada)
    const pergunta = ({ tipo = 'text', rotulo, padrao, ok, max = 120, data = false }) => {
      if (data) max = 10;
      const f = el('form', 'ex-form');
      const id = 'ex-in-' + Math.random().toString(36).slice(2, 7);
      f.innerHTML = `<label for="${id}">${rotulo}</label><div class="ex-linha"><input id="${id}" type="${tipo}" maxlength="${max}" autocomplete="off" spellcheck="false" placeholder="${padrao}"><button class="botao" type="submit">${T('ok')}</button></div>`;
      ctx.palco.appendChild(f);
      ctx.privado();
      if (data) {
        // data: teclado numérico, só algarismos (até 8), e a barra entra sozinha depois do dia e do mês (DD/MM/AAAA);
        // apagando, a barra sai junto; colar 08112026 ou 08/11/2026 dá no mesmo
        const inp = f.querySelector('input'); inp.setAttribute('inputmode', 'numeric'); inp.setAttribute('pattern', '[0-9/]*');
        ao(inp, 'input', (e) => {
          const d = inp.value.replace(/\D/g, '').slice(0, 8), apaga = /^delete/.test(e.inputType || '');
          let v = d.slice(0, 2);
          if (d.length > 2 || (d.length === 2 && !apaga)) v += '/' + d.slice(2, 4);
          if (d.length > 4 || (d.length === 4 && !apaga)) v += '/' + d.slice(4);
          inp.value = v;
          // com os 8 algarismos, confirma sozinho (o teclado numérico do iPhone não tem Enter); síncrono, dentro do
          // gesto, para o iOS deixar o foco passar ao próximo campo sem fechar o teclado
          if (d.length === 8 && !apaga) envia(f);
        });
      }
      ao(f, 'submit', (e) => { e.preventDefault(); const v = f.querySelector('input').value.trim(); ok(v || padrao, f); });
      return f;
    };
    const lerData = (s) => {
      const m = String(s).match(/(\d{1,4})\D+(\d{1,2})\D+(\d{1,4})/);
      if (!m) return null;
      let [a, b, c] = [m[1], m[2], m[3]];
      if (a.length === 4) [a, c] = [c, a]; // aaaa-mm-dd
      return [a.padStart(2, '0'), b.padStart(2, '0'), c];
    };
    const hoje = () => { const d = new Date(); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`; };
    return { desl, T, ao, laco, depois, tela, pergunta, envia, lerData, hoje };
  }

  // traço manual de um rosto simples (alternativa ao gesto)
  const rostoAuto = (w, h) => {
    const cxm = w / 2, cym = h / 2, r = Math.min(w, h) * 0.3, s = [];
    const oval = []; for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.12) oval.push({ x: cxm + Math.cos(a) * r * 0.8, y: cym + Math.sin(a) * r });
    s.push(oval);
    s.push([{ x: cxm - r * 0.35, y: cym - r * 0.2 }, { x: cxm - r * 0.15, y: cym - r * 0.2 }]);
    s.push([{ x: cxm + r * 0.15, y: cym - r * 0.2 }, { x: cxm + r * 0.35, y: cym - r * 0.2 }]);
    s.push([{ x: cxm, y: cym - r * 0.05 }, { x: cxm - r * 0.08, y: cym + r * 0.25 }, { x: cxm + r * 0.05, y: cym + r * 0.25 }]);
    s.push([{ x: cxm - r * 0.3, y: cym + r * 0.5 }, { x: cxm, y: cym + r * 0.58 }, { x: cxm + r * 0.3, y: cym + r * 0.5 }]);
    return s;
  };

  const M = {};

  // 1 · Desenhar na névoa — o dedo abre a névoa; ela volta e cobre o traço
  M.nevoa = (ctx, k) => {
    // a imagem é sorteada do baralho comum (fragmentos + páginas de diário), sem repetir a última,
    // e fica numa folha rasgada (2 ou 3 lados, franja clara, sombra leve) sobre a mesa; a névoa cobre só a folha
    const fundo = el('img', 'ex-fundo'); fundo.src = ctx.src(sorteiaImagem(ctx)); fundo.alt = '';
    const caixa = el('div', 'f1-caixa'), sombra = el('div', 'f1-sombra'), franja = el('div', 'f1-franja'); sombra.appendChild(franja);
    ctx.palco.classList.add('empilha', 'mesa-1'); ctx.palco.append(sombra, caixa); caixa.appendChild(fundo); const v1 = veu(fundo);
    const { cv, cx, w, h } = k.tela(); cv.classList.add('sobre-fundo');
    caixa.style.height = sombra.style.height = h + 'px';
    // recorte e escala sorteados, sempre cobrindo a folha (cover + ampliação de pelo menos 8%, que tira a margem em branco das páginas escaneadas)
    fundo.style.objectPosition = `${rnd(0, 100).toFixed(0)}% ${rnd(0, 100).toFixed(0)}%`;
    fundo.style.transformOrigin = `${rnd(0, 100).toFixed(0)}% ${rnd(0, 100).toFixed(0)}%`; fundo.style.transform = `scale(${rnd(1.08, 1.45).toFixed(2)})`;
    const mg = Math.round(limita(Math.min(w, h) * 0.07, 12, 30)), sw = w - 2 * mg, sh = h - 2 * mg;
    const pts = contorno(sw, sh, limita(Math.min(sw, sh) * 0.045, 6, 14), ladosRasgados()).map(([x, y]) => [x + mg, y + mg]);
    const encolhe = (d) => pts.map(([x, y]) => [w / 2 + (x - w / 2) * (1 - (2 * d) / w), h / 2 + (y - h / 2) * (1 - (2 * d) / h)]);
    recorte(franja, poligono(pts, w, h));
    const dentro = poligono(encolhe(2.5), w, h); recorte(caixa, dentro); recorte(cv, dentro);
    // pó: a névoa que o dedo tira vira grão fino que se solta e deriva para a direita, rareando até sumir
    const pc = el('canvas', 'f1-po'); const dpr = Math.min(2, window.devicePixelRatio || 1);
    pc.width = w * dpr; pc.height = h * dpr; pc.style.height = h + 'px'; const px = pc.getContext('2d'); px.scale(dpr, dpr);
    ctx.palco.appendChild(pc);
    const po = [], MAXPO = 700, calmo = ctx.reduz;
    const solta = (a, b) => {
      const n = Math.min(14, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / (calmo ? 6 : 2)));
      for (let i = 0; i < n; i++) {
        const t = Math.random(), ang = Math.random() * 7, r = Math.random() * 8;
        po.push({ x: a.x + (b.x - a.x) * t + Math.cos(ang) * r, y: a.y + (b.y - a.y) * t + Math.sin(ang) * r,
          vx: calmo ? 0 : rnd(0.2, 1.3), vy: calmo ? 0 : rnd(-0.45, 0.35), v: 0, fim: rnd(calmo ? 30 : 60, calmo ? 60 : 150),
          r: rnd(0.45, 1.35), tom: Math.random() < 0.35 ? '74,71,66' : '246,245,241', a: rnd(0.5, 0.95), f: Math.random() * 7 });
      }
      if (po.length > MAXPO) po.splice(0, po.length - MAXPO);
    };
    let tempo = 0, sujo = false;
    const sopra = () => {
      tempo++;
      if (!po.length) { if (sujo) { px.clearRect(0, 0, w, h); sujo = false; } return; }
      px.clearRect(0, 0, w, h); sujo = true;
      for (let i = po.length - 1; i >= 0; i--) {
        const q = po[i]; q.v++;
        if (q.v >= q.fim) { po.splice(i, 1); continue; }
        if (!calmo) {
          // vento para a direita com turbulência; o grão desacelera e sobe/desce um pouco
          q.vx += 0.012 + Math.sin(tempo * 0.07 + q.f + q.y * 0.04) * 0.025; q.vy += Math.cos(tempo * 0.05 + q.f + q.x * 0.03) * 0.03;
          q.vx *= 0.985; q.vy *= 0.97; q.x += q.vx; q.y += q.vy;
        }
        const al = q.a * (1 - q.v / q.fim) ** 1.4;
        px.fillStyle = `rgba(${q.tom},${al.toFixed(3)})`; px.fillRect(q.x, q.y, q.r * 2, q.r * 2);
      }
    };
    cx.fillStyle = 'rgba(246,245,241,1)'; cx.fillRect(0, 0, w, h);
    let ult = null, total = 0, quieto = 0, desenhou = false;
    const risca = (a, b) => {
      cx.globalCompositeOperation = 'destination-out'; cx.lineCap = 'round'; cx.lineJoin = 'round';
      cx.strokeStyle = 'rgba(0,0,0,.9)'; cx.lineWidth = 16; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      cx.globalCompositeOperation = 'source-over';
      total += Math.hypot(b.x - a.x, b.y - a.y); quieto = 0; desenhou = true; solta(a, b);
    };
    k.ao(cv, 'pointerdown', (e) => { cv.setPointerCapture(e.pointerId); ult = local(e, cv); });
    k.ao(cv, 'pointermove', (e) => { if (!ult) return; const p = local(e, cv); risca(ult, p); ult = p; });
    k.ao(cv, 'pointerup', () => (ult = null)); k.ao(cv, 'pointercancel', () => (ult = null));
    k.laco(() => {
      // a névoa volta: camadas leitosas, com grão
      cx.fillStyle = 'rgba(246,245,241,0.035)'; cx.fillRect(0, 0, w, h);
      for (let i = 0; i < 6; i++) { cx.fillStyle = `rgba(255,255,255,${rnd(0.02, 0.06)})`; cx.beginPath(); cx.arc(rnd(0, w), rnd(0, h), rnd(10, 40), 0, 7); cx.fill(); }
      // e se recompõe com grão: pontinhos de névoa caindo aqui e ali
      for (let i = 0; i < 26; i++) { cx.fillStyle = `rgba(${Math.random() < 0.2 ? '200,198,192' : '246,245,241'},${rnd(0.35, 0.8).toFixed(2)})`; const r = rnd(0.5, 1.4); cx.fillRect(rnd(0, w), rnd(0, h), r, r); }
      sopra();
      quieto++;
      if (desenhou && total > 250 && quieto > 200) ctx.feito();
    });
    ctx.botao(k.T('porMim'), () => {
      const traços = rostoAuto(w, h); let i = 0, j = 1;
      k.laco(() => { const s = traços[i]; if (!s) return false; risca(s[j - 1], s[j]); j++; if (j >= s.length) { i++; j = 1; } });
    });
  };

  // 2 · Lembrança líquida — as linhas escorrem até a borda
  M.liquida = (ctx, k) => {
    const { cv, cx, w, h } = k.tela();
    // fundo fixo do papel de linhas finas (papel-3, o dos diários); o traço e o escorrido acontecem por cima, na tela transparente
    const u = urlPapel(3); if (u) { cv.style.backgroundImage = `url("${u}")`; cv.style.backgroundPosition = `${Math.floor(rnd(0, 256))}px ${Math.floor(rnd(0, 256))}px`; }
    const rastro = el('canvas'); rastro.width = cv.width; rastro.height = cv.height; const rx = rastro.getContext('2d'); rx.scale(cv.width / w, cv.height / h);
    const tracos = []; let atual = null, comecou = false;
    const solta = (s) => s.forEach((p) => { p.solto = true; p.atraso = rnd(10, 90); p.vy = 0; p.g = rnd(0.02, 0.09); });
    // ao levantar o dedo, o traço espera 0,3 s: se vier outro toque nesse tempo, nada derrete ainda
    // e os traços seguintes se juntam à espera; só depois de 0,3 s sem toque tudo o que esperava escorre
    let espera = [], relogio = null;
    const derrete = () => { relogio = null; espera.forEach(solta); espera = []; };
    k.ao(cv, 'pointerdown', (e) => { cv.setPointerCapture(e.pointerId); clearTimeout(relogio); relogio = null; atual = [local(e, cv)]; tracos.push(atual); comecou = true; });
    k.ao(cv, 'pointermove', (e) => { if (atual) atual.push(local(e, cv)); });
    const fim = () => { if (atual) { espera.push(atual); clearTimeout(relogio); relogio = setTimeout(derrete, 300); } atual = null; };
    k.ao(cv, 'pointerup', fim); k.ao(cv, 'pointercancel', fim);
    k.laco(() => {
      cx.clearRect(0, 0, w, h);
      cx.drawImage(rastro, 0, 0, w, h);
      let vivos = 0;
      tracos.forEach((s) => {
        s.forEach((p) => {
          if (!p.solto) { vivos++; return; }
          if (p.atraso > 0) { p.atraso--; vivos++; return; }
          const y0 = p.y; p.vy += p.g; p.y += p.vy; p.x += rnd(-0.3, 0.3);
          rx.strokeStyle = 'rgba(123,127,82,0.10)'; rx.lineWidth = 1.2; rx.beginPath(); rx.moveTo(p.x, y0); rx.lineTo(p.x, p.y); rx.stroke();
          if (p.y < h + 30) vivos++;
        });
        cx.strokeStyle = TINTA; cx.lineWidth = 2.2; cx.lineCap = 'round'; cx.lineJoin = 'round';
        cx.beginPath(); s.forEach((p, i) => (i ? cx.lineTo(p.x, p.y) : cx.moveTo(p.x, p.y))); cx.stroke();
      });
      if (comecou && !atual && vivos === 0) { ctx.feito(); rx.globalCompositeOperation = 'destination-out'; rx.fillStyle = 'rgba(0,0,0,0.02)'; rx.fillRect(0, 0, w, h); rx.globalCompositeOperation = 'source-over'; }
    });
    ctx.botao(k.T('porMim'), () => { rostoAuto(w, h).forEach((s) => { const c = s.map((p) => ({ ...p })); tracos.push(c); solta(c); }); comecou = true; });
  };

  // 3 · Data dividida — operações sobre a data até ela deixar de ser data
  M.dataDividida = (ctx, k) => {
    k.pergunta({ rotulo: k.T('data'), padrao: k.hoje(), data: true, ok(v, f) {
      const d = k.lerData(v); if (!d) { f.querySelector('label').textContent = k.T('dataInvalida'); return; }
      f.remove();
      let nums = d.map(Number);
      const visor = el('div', 'calc-visor'), fita = el('ol', 'calc-fita'), teclas = el('div', 'calc-teclas');
      const fmt = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(4).replace(/0+$/, '').replace(/\.$/, ''));
      const mostra = () => { visor.innerHTML = nums.map((x) => `<span>${fmt(x)}</span>`).join('<i>/</i>'); };
      // a divisão fica só com a parte inteira: com decimais, a data não chegava a ser esquecida
      const ops = [['+', 'somar', (a, b) => a + b], ['÷', 'dividir', (a, b) => (b ? Math.trunc(a / b) : a)], ['×', 'multiplicar', (a, b) => a * b]];
      ops.forEach(([s, nome, fn]) => {
        const b = el('button', 'calc-tecla', `<b>${s}</b><small>${k.T(nome)}</small>`); b.type = 'button';
        b.addEventListener('click', () => {
          if (nums.length < 2) return;
          const [a, c, ...resto] = nums, r = fn(a, c);
          fita.insertAdjacentHTML('beforeend', `<li>${fmt(a)} ${s} ${fmt(c)} = <b>${fmt(r)}</b></li>`);
          nums = [r, ...resto]; mostra();
          if (nums.length === 1) { teclas.querySelectorAll('button').forEach((x) => (x.disabled = true)); visor.classList.add('so-numero'); ctx.feito(); }
        });
        teclas.appendChild(b);
      });
      ctx.palco.append(visor, teclas, fita); mostra();
    } });
  };

  // 4 · Tabuada do retorno — cada acerto apaga os dois algarismos usados na conta
  M.tabuada = (ctx, k) => {
    k.pergunta({ rotulo: k.T('data'), padrao: k.hoje(), data: true, ok(v, f) {
      const d = k.lerData(v); if (!d) { f.querySelector('label').textContent = k.T('dataInvalida'); return; }
      f.remove();
      const dig = d.join('/').split('');
      const visor = el('div', 'calc-visor digitos', dig.map((c) => (c === '/' ? '<i>/</i>' : `<span>${c}</span>`)).join(''));
      const conta = el('form', 'ex-form tabuada');
      // cada conta usa dois algarismos que ainda restam da data (marcados no visor), somados ou subtraídos
      // (na subtração, o maior menos o menor); quando sobra um só, ele entra duas vezes
      let certo = 0, pares = [];
      const nova = () => {
        visor.querySelectorAll('.usa').forEach((x) => x.classList.remove('usa'));
        const resta = [...visor.querySelectorAll('span:not(.foi)')], i = Math.floor(Math.random() * resta.length);
        let j = i; if (resta.length > 1) while (j === i) j = Math.floor(Math.random() * resta.length);
        pares = [resta[i], resta[j]]; pares.forEach((x) => x.classList.add('usa'));
        let a = +pares[0].textContent, b = +pares[1].textContent; const menos = Math.random() < 0.5;
        if (menos && b > a) [a, b] = [b, a];
        certo = menos ? a - b : a + b;
        conta.querySelector('.conta').textContent = `${a} ${menos ? '−' : '+'} ${b} =`; conta.querySelector('input').value = '';
      };
      conta.innerHTML = `<label class="conta"></label><div class="ex-linha"><input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-label="${k.T('resposta')}" autocomplete="off"><button class="botao" type="submit">=</button></div>`;
      // confere sozinho assim que tiver tantos algarismos quanto a resposta (o "=" e o Enter seguem valendo);
      // o campo é o mesmo entre as contas, então o foco e o teclado ficam
      k.ao(conta.querySelector('input'), 'input', (e) => {
        const inp = e.target; inp.value = inp.value.replace(/\D/g, '').slice(0, 2);
        if (inp.value.length >= String(certo).length) k.envia(conta);
      });
      k.ao(conta, 'submit', (e) => {
        e.preventDefault();
        const inp = conta.querySelector('input');
        if (inp.value.trim() !== '' && +inp.value === certo) {
          // os dois algarismos usados na conta somem juntos; o último, usado com ele mesmo, some sozinho
          pares.forEach((x) => { x.classList.add('foi'); x.classList.remove('usa'); });
          if (!visor.querySelector('span:not(.foi)')) { conta.remove(); visor.querySelectorAll('i').forEach((x) => x.classList.add('foi')); ctx.feito(); return; }
          nova();
        } else { conta.classList.remove('erra'); void conta.offsetWidth; conta.classList.add('erra'); inp.value = ''; }
        inp.focus();
      });
      ctx.palco.append(visor, conta); nova(); conta.querySelector('input').focus();
    } });
  };

  // palavras como botões (base dos exercícios de apagamento)
  const palavras = (ctx, texto, cls, onde = ctx.palco) => {
    const caixa = el('p', 'ex-texto ' + (cls || ''));
    texto.split(/\s+/).filter(Boolean).forEach((w) => { const b = el('button', 'palavra'); b.type = 'button'; b.textContent = w; caixa.append(b, ' '); });
    onde.appendChild(caixa); return caixa;
  };
  // 5 · frases curtas dos textos do projeto (texto curatorial e textos da artista), já traduzidas no site
  const FRASES5 = [
    { pt: 'imaginar um antigo oceano', es: 'imaginar un antiguo océano', en: 'imagine an ancient ocean' },
    { pt: 'entre pedras, vegetação e escadarias naturais', es: 'entre piedras, vegetación y escalinatas naturales', en: 'among stones, vegetation and natural stairways' },
    { pt: 'outras paisagens e memórias', es: 'otros paisajes y memorias', en: 'other landscapes and memories' },
    { pt: 'lembranças de um tempo que nunca conhecemos', es: 'recuerdos de un tiempo que nunca conocimos', en: 'memories of a time we never knew' },
    { pt: 'o que escolhemos lembrar e o que gostaríamos de esquecer?', es: '¿qué elegimos recordar y qué nos gustaría olvidar?', en: 'what do we choose to remember, and what would we like to forget?' },
    { pt: 'as plantas viram algas, as pedras viram recifes', es: 'las plantas se convierten en algas, las rocas en arrecifes', en: 'plants become seaweed, rocks become reefs' },
    { pt: 'navegar pelo fóssil de um oceano', es: 'navegar por el fósil de un océano', en: 'sailing through the fossil of an ocean' },
    { pt: 'memórias que já não existem, ou que talvez nunca tenham existido', es: 'memorias que ya no existen, o que quizás nunca existieron', en: 'memories that no longer exist, or perhaps never did' },
    { pt: 'restos de um passado que tentamos reconstruir', es: 'restos de un pasado que intentamos reconstruir', en: 'remains of a past we try to rebuild' },
    { pt: 'imaginar aquilo que não pôde presenciar', es: 'imaginar aquello que no pudo presenciar', en: 'imagine what it could not witness' },
    { pt: 'hoje esqueci o nome do caminho mas o corpo lembra do relevo', es: 'hoy olvidé el nombre del camino pero el cuerpo recuerda el relieve', en: 'today I forgot the name of the path but the body remembers the relief' },
  ];

  // 5 · Pressão do silêncio — segurar sobre a palavra até que se cale
  M.pressao = (ctx, k) => {
    k.pergunta({ rotulo: k.T('escreva'), padrao: ctx.L(FRASES5[Math.floor(Math.random() * FRASES5.length)]), max: 200, ok(v, f) {
      f.remove();
      const caixa = palavras(ctx, v, 'grande', folhaRasgada(ctx, k, 0));
      const ws = [...caixa.querySelectorAll('.palavra')].map((b) => ({ b, n: 0, segura: false }));
      ws.forEach((w) => {
        const on = (e) => { e.preventDefault(); w.segura = true; }, off = () => (w.segura = false);
        k.ao(w.b, 'pointerdown', on); k.ao(w.b, 'pointerup', off); k.ao(w.b, 'pointerleave', off); k.ao(w.b, 'pointercancel', off);
        k.ao(w.b, 'keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); w.n = Math.min(1, w.n + 0.08); } });
        k.ao(w.b, 'contextmenu', (e) => e.preventDefault());
      });
      k.laco(() => {
        let resta = 0;
        ws.forEach((w) => {
          if (w.segura) w.n = Math.min(1, w.n + 0.012);
          w.b.style.setProperty('--s', w.n.toFixed(3));
          if (w.n >= 1) { if (!w.b.classList.contains('calou')) { w.b.classList.add('calou'); w.b.setAttribute('aria-hidden', 'true'); w.b.tabIndex = -1; } } else resta++;
        });
        if (!resta) { ctx.feito(); return false; }
      });
    } });
  };

  // 6 · Letra por letra — tocar cada letra para apagá-la
  M.letra = (ctx, k) => {
    k.pergunta({ rotulo: k.T('escreva'), padrao: k.T('nome'), max: 40, ok(v, f) {
      f.remove();
      const caixa = el('p', 'ex-texto letras');
      [...v].forEach((c) => {
        if (c === ' ') { caixa.append(el('span', 'espaco', ' ')); return; }
        const b = el('button', 'letra'); b.type = 'button'; b.textContent = c; caixa.appendChild(b);
      });
      folhaRasgada(ctx, k, 1).appendChild(caixa); // papel mais grosso (Canson)
      k.ao(caixa, 'click', (e) => {
        const b = e.target.closest('.letra:not(.foi)'); if (!b) return;
        b.classList.add('foi'); b.setAttribute('aria-hidden', 'true'); b.tabIndex = -1;
        const prox = caixa.querySelector('.letra:not(.foi)'); if (prox && document.activeElement === b) prox.focus();
        if (!prox) ctx.feito();
      });
    } });
  };

  // retalhos arrastáveis
  // contorno de papel rasgado para uma peça W×H px (o mesmo desenho dos fragmentos, em escala pequena):
  // 2 ou 3 lados rasgados com dentes miúdos, às vezes um canto cortado
  const rasga = (W, H) => {
    const q = Math.random, lados = ['t', 'r', 'b', 'l'], rasgados = new Set();
    const quantos = q() < 0.55 ? 2 : 3; while (rasgados.size < quantos) rasgados.add(lados[Math.floor(q() * 4)]);
    const A = {}; lados.forEach((k) => (A[k] = rasgados.has(k) ? 1.6 + q() * 2.2 : 0));
    const corte = [0, 1, 2, 3].map(() => (q() < 0.35 ? 3 + q() * 6 : 0));
    const pts = [];
    const lado = (de, ate, f, k) => {
      const m = Math.max(1, Math.round(Math.abs(ate - de) / (3 + q() * 1.5)));
      for (let j = 0; j <= m; j++) pts.push(f(de + (ate - de) * j / m, j === 0 || j === m ? A[k] * 0.4 : A[k] * (0.15 + 0.85 * q())));
    };
    lado(corte[0], W - corte[1], (x, d) => [x, d], 't');
    lado(corte[1], H - corte[2], (y, d) => [W - d, y], 'r');
    lado(W - corte[2], corte[3], (x, d) => [x, H - d], 'b');
    lado(H - corte[3], corte[0], (y, d) => [d, y], 'l');
    return 'polygon(' + pts.map(([x, y]) => `${(x / W * 100).toFixed(2)}% ${(y / H * 100).toFixed(2)}%`).join(',') + ')';
  };
  const arrastavel = (k, alvo, caixa, aoSoltar) => {
    let ini = null;
    k.ao(alvo, 'pointerdown', (e) => { e.preventDefault(); alvo.setPointerCapture(e.pointerId); ini = { x: e.clientX, y: e.clientY, l: alvo.offsetLeft, t: alvo.offsetTop }; alvo.classList.add('pega'); });
    k.ao(alvo, 'pointermove', (e) => {
      if (!ini) return;
      const l = Math.max(-alvo.offsetWidth / 2, Math.min(caixa.clientWidth - alvo.offsetWidth / 2, ini.l + e.clientX - ini.x));
      const t = Math.max(-alvo.offsetHeight / 2, Math.min(caixa.clientHeight - alvo.offsetHeight / 2, ini.t + e.clientY - ini.y));
      alvo.style.left = l + 'px'; alvo.style.top = t + 'px';
    });
    const fim = () => { if (!ini) return; ini = null; alvo.classList.remove('pega'); aoSoltar && aoSoltar(); };
    k.ao(alvo, 'pointerup', fim); k.ao(alvo, 'pointercancel', fim);
  };

  // 7 · Velar a frase — retalhos da paisagem cobrem palavra por palavra
  // a frase fica numa folha rasgada (Canson) sobre a mesa; há um retalho para cada palavra, do tamanho dela
  // (largura da palavra + 10–30 %, altura da linha + margem, mínimo 44×28) e mais 1 ou 2 de sobra com tamanhos tirados das palavras
  // a pessoa escreve a frase (ou fica a do fragmento); os retalhos são medidos pelas palavras dela
  M.velar = (ctx, k) => {
    k.pergunta({ rotulo: k.T('escreva'), padrao: ctx.L(ctx.ex.frase), max: 160, ok(v, f) { f.remove(); velar(ctx, k, v); } });
  };
  const velar = (ctx, k, frase) => {
    const mesa = el('div', 'mesa');
    const priv = [...ctx.palco.children].find((c) => c.classList.contains('ex-privado')); ctx.palco.insertBefore(mesa, priv || null);
    const folha = folhaRasgada(ctx, k, 1, mesa);
    const caixa = el('p', 'ex-texto mesa-frase');
    frase.split(/\s+/).filter(Boolean).forEach((w) => caixa.append(el('span', 'palavra', w), ' '));
    folha.appendChild(caixa);
    const ws = [...caixa.querySelectorAll('.palavra')];
    const rets = [];
    const confere = () => {
      const rr = rets.map((r) => r.getBoundingClientRect());
      let cobertas = 0;
      ws.forEach((w) => {
        const b = w.getBoundingClientRect(), cxw = b.left + b.width / 2, cyw = b.top + b.height / 2;
        const c = rr.some((r) => cxw > r.left && cxw < r.right && cyw > r.top && cyw < r.bottom);
        w.classList.toggle('coberta', c); if (c) cobertas++;
      });
      if (cobertas === ws.length) ctx.feito();
    };
    // texturas dos retalhos: qualquer uma menos a da folha (1)
    const outras = [0, 2, 3];
    const extras = 1 + (Math.random() < 0.5 ? 1 : 0);
    for (let i = 0; i < ws.length + extras; i++) {
      const r = el('div', 'retalho-solto'); r.setAttribute('aria-hidden', 'true');
      const pp = el('div', 'retalho-papel'); r.appendChild(pp);
      // cada retalho é um recorte de uma imagem sorteada do baralho comum (fragmentos + páginas de diário), em escala e posição sorteadas
      pp.style.backgroundImage = `url("${ctx.src(sorteiaImagem(ctx))}")`; pp.style.backgroundPosition = `${rnd(0, 100)}% ${rnd(0, 100)}%`; pp.style.backgroundSize = `${rnd(200, 380).toFixed(0)}% auto`;
      // cada palavra tem um retalho medido por ela (sempre a cobre); os tamanhos variam bastante, e os 1 ou 2 a mais
      // copiam a medida de uma palavra sorteada, às vezes largos o bastante para duas
      const extra = i >= ws.length;
      r.fw = extra ? rnd(1.1, 2.1) : Math.random() < 0.3 ? rnd(1.45, 1.9) : rnd(1.08, 1.4); r.fh = rnd(0, 1); r.base = extra ? Math.floor(Math.random() * ws.length) : i;
      r.style.rotate = `${rnd(-4, 4)}deg`;
      papel(pp, outras[Math.floor(Math.random() * 3)]); mesa.appendChild(r); rets.push(r); arrastavel(k, r, mesa, confere);
    }
    // tamanhos a partir das palavras medidas; na primeira vez espalha os retalhos na parte livre da mesa, embaixo da folha
    let mw = 0;
    const mede = () => {
      const MW = mesa.clientWidth, MH = mesa.clientHeight; if (!MW || Math.abs(MW - mw) < 1) return;
      const primeira = !mw, ant = mw; mw = MW;
      rets.forEach((r) => {
        const b = ws[r.base].getBoundingClientRect(), lh = parseFloat(getComputedStyle(caixa).lineHeight) || b.height;
        const W = Math.round(Math.max(48, b.width * r.fw)), H = Math.round(Math.max(30, Math.min(lh, b.height) * (1 + r.fh * 0.6) + 8));
        const cx = r.offsetLeft + r.offsetWidth / 2, cy = r.offsetTop + r.offsetHeight / 2;
        r.style.width = W + 'px'; r.style.height = H + 'px';
        const poli = rasga(W, H); r.firstChild.style.clipPath = poli; r.firstChild.style.webkitClipPath = poli;
        if (!primeira) { r.style.left = `${(cx * MW) / ant - W / 2}px`; r.style.top = `${cy - H / 2}px`; }
      });
      if (primeira) {
        const fb = folha.parentNode, y0 = fb.offsetTop + fb.offsetHeight + 12, ordem = [...rets].sort(() => Math.random() - 0.5);
        let x = 8, y = y0, alto = 0;
        ordem.forEach((r) => {
          const W = r.offsetWidth, H = r.offsetHeight;
          if (x + W > MW - 8) { x = 8 + rnd(0, 14); y += alto * 0.9; alto = 0; }
          r.style.left = `${x}px`; r.style.top = `${Math.min(MH - H - 4, y + rnd(-4, 6))}px`;
          x += W * rnd(0.82, 1.02); alto = Math.max(alto, H);
        });
      }
      confere();
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(mede); ro.observe(mesa); k.desl.push(() => ro.disconnect()); } else { k.ao(window, 'resize', mede); k.depois(0, mede); }
    ctx.botao(k.T('cobrir'), () => {
      const livre = ws.find((w) => !w.classList.contains('coberta')); if (!livre) return;
      const mb = mesa.getBoundingClientRect(), b = livre.getBoundingClientRect();
      const sobre = (q) => ws.some((w) => { const wb = w.getBoundingClientRect(); return wb.left + wb.width / 2 > q.left && wb.left + wb.width / 2 < q.right && wb.top + wb.height / 2 > q.top && wb.top + wb.height / 2 < q.bottom; });
      // de preferência o retalho feito para essa palavra, se estiver solto
      const proprio = rets[ws.indexOf(livre)];
      const r = (!sobre(proprio.getBoundingClientRect()) && proprio) || rets.find((x) => !sobre(x.getBoundingClientRect())) || rets[Math.floor(Math.random() * rets.length)];
      r.style.left = `${b.left - mb.left + b.width / 2 - r.offsetWidth / 2}px`; r.style.top = `${b.top - mb.top + b.height / 2 - r.offsetHeight / 2}px`;
      confere();
    });
  };

  // 8 · Janela móvel — só se vê através da janela; por onde ela passa fica um rastro suave que se esvai até sumir
  // a imagem está numa folha de papel fotográfico fosco rasgada em 2 ou 3 lados; ao longo do rasgo a emulsão (a camada com a imagem)
  // descolou: uma faixa irregular de 11–19 px mostra o miolo esbranquiçado e fibroso, com a passagem desfiada entre imagem e miolo
  M.janela = (ctx, k) => {
    const mesa = el('div', 'mesa janela-mesa'); ctx.palco.appendChild(mesa);
    const fundo = el('canvas', 'janela-tela'); mesa.appendChild(fundo);
    const tela = el('canvas', 'janela-tela'); mesa.appendChild(tela);
    const moldura = el('div', 'janela-moldura'); moldura.tabIndex = 0; moldura.setAttribute('role', 'slider'); moldura.setAttribute('aria-label', ctx.L(ctx.ex.titulo));
    const NS = 'http://www.w3.org/2000/svg', traco = document.createElementNS(NS, 'svg'); traco.setAttribute('aria-hidden', 'true'); moldura.appendChild(traco);
    mesa.appendChild(moldura);
    const vistos = new Set(); const G = 8;
    let x = 0.5, y = 0.5, img = null, orig = null, cx = null, W = 0, H = 0, dpr = 1, cover = null, emulsao = null;
    // rastro: grade de células (C px) com a força de cada uma; cai em linha reta até zero (some de verdade, sem resto)
    const C = 6, FORCA = 0.6, CAI = 1 / (60 * 1.6); let gw = 0, gh = 0, m = null, mc = null, mx = null, md = null;
    // 2 ou 3 lados rasgados, todos do mesmo jeito: a faixa branca sem emulsão tem de 2 a 10 px,
    // quase sempre fina (2 a 4 px), com poucos danos grandes que crescem e somem devagar
    const tipos = (() => { const t = {}; ladosRasgados().forEach((l) => (t[l] = 'rasgo')); return t; })();
    const suave = (v, r) => v.map((_, j) => { let t = 0, n = 0; for (let d = -r; d <= r; d++) { const q = v[j + d]; if (q !== undefined) { t += q; n++; } } return t / n; });
    const prepara = () => {
      W = mesa.clientWidth; H = mesa.clientHeight; dpr = Math.min(2, window.devicePixelRatio || 1);
      tela.width = W * dpr; tela.height = H * dpr; cx = tela.getContext('2d'); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gw = Math.ceil(W / C); gh = Math.ceil(H / C); m = new Float32Array(gw * gh);
      mc = document.createElement('canvas'); mc.width = gw; mc.height = gh; mx = mc.getContext('2d'); md = mx.createImageData(gw, gh);
    };
    const nova = (w, h) => { const c = document.createElement('canvas'); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); const g = c.getContext('2d'); g.scale(dpr, dpr); return [c, g]; };
    // a folha: contorno de fora (rasgado nos lados sorteados) e, em cada lado rasgado, a borda de dentro da faixa sem emulsão
    const folha = async () => {
      const mg = Math.max(10, Math.min(W, H) * 0.05), SW = W - 2 * mg, SH = H - 2 * mg, mn = Math.min(SW, SH);
      const fora = [], faixas = [];
      const lado = (de, ate, f, tipo) => {
        const n = Math.max(1, Math.round(Math.abs(ate - de) / 2)), dentro = [];
        let borda = null, faixa = null;
        if (tipo) {
          // ondulação leve com dentes miúdos por cima
          const amp = limita(mn * 0.028, 4, 11), largo = suave(perfil(n), 12), dente = perfil(n);
          borda = largo.map((v, j) => amp * limita(0.15 + 0.6 * v + 0.25 * (0.5 * dente[j] + 0.5 * Math.random()), 0.05, 1));
          // faixa: base fina de 2 a 4 px, e 0 a 2 danos (sobe até 8–10 px num trecho curto, com transição suave)
          const base = suave(perfil(n), 10), extra = new Float32Array(n + 1), nd = Math.random() < 0.3 ? 0 : Math.random() < 0.7 ? 1 : 2;
          for (let q = 0; q < nd; q++) {
            const c = rnd(0.1, 0.9) * n, r = n * rnd(0.05, 0.13), alto = rnd(4.5, 7);
            for (let j = Math.max(0, Math.floor(c - r)); j <= Math.min(n, Math.ceil(c + r)); j++) extra[j] = Math.max(extra[j], alto * 0.5 * (1 + Math.cos((Math.PI * (j - c)) / r)));
          }
          faixa = base.map((v, j) => limita(2 + 2 * v + extra[j] + rnd(-0.35, 0.35), 2, 10.5));
        }
        for (let j = 0; j <= n; j++) {
          const t = de + ((ate - de) * j) / n, d = borda ? borda[j] : 0;
          if (j < n) fora.push(f(t, d));
          if (borda) dentro.push([t, d, d + faixa[j]]);
        }
        if (borda) faixas.push({ f, dentro, tipo });
      };
      lado(0, SW, (t, d) => [mg + t, mg + d], tipos.t);
      lado(0, SH, (t, d) => [mg + SW - d, mg + t], tipos.r);
      lado(SW, 0, (t, d) => [mg + t, mg + SH - d], tipos.b);
      lado(SH, 0, (t, d) => [mg + d, mg + t], tipos.l);
      const contornoFora = new Path2D(); fora.forEach(([a, b], i) => (i ? contornoFora.lineTo(a, b) : contornoFora.moveTo(a, b))); contornoFora.closePath();
      // máscara da emulsão que ficou: a folha menos as faixas, com a passagem desfiada (fiapos que entram e que sobram)
      const [mk, mg2] = nova(W, H); mg2.fillStyle = '#000'; mg2.fill(contornoFora);
      mg2.globalCompositeOperation = 'destination-out';
      faixas.forEach(({ f, dentro }) => {
        mg2.beginPath(); dentro.forEach(([t], i) => { const [a, b] = f(t, -6); i ? mg2.lineTo(a, b) : mg2.moveTo(a, b); });
        for (let i = dentro.length - 1; i >= 0; i--) { const [a, b] = f(dentro[i][0], dentro[i][2]); mg2.lineTo(a, b); }
        mg2.closePath(); mg2.fill();
      });
      const fiapos = (sinal) => faixas.forEach(({ f, dentro }) => dentro.forEach(([t, , e]) => {
        if (Math.random() > 0.12) return;
        const [a, b] = f(t, e), [c, d] = f(t + rnd(-1.5, 1.5), e + sinal * rnd(0.4, 1.4));
        mg2.lineWidth = rnd(0.3, 0.6); mg2.beginPath(); mg2.moveTo(a, b); mg2.lineTo(c, d); mg2.stroke();
      }));
      mg2.strokeStyle = '#000'; mg2.lineCap = 'round'; fiapos(1); // mordidas na imagem
      mg2.globalCompositeOperation = 'source-over'; mg2.save(); mg2.clip(contornoFora); fiapos(-1); mg2.restore(); // restos de emulsão na faixa
      emulsao = mk;
      const [t2, t4] = await Promise.all([textura(2), textura(4)]);
      const [fc, g] = nova(W, H);
      // miolo: a folha inteira em branco quente com fibras, sobre a mesa, com sombra leve
      g.save(); g.shadowColor = 'rgba(29,27,25,.32)'; g.shadowBlur = 7; g.shadowOffsetY = 3; g.fillStyle = '#f4f1ea'; g.fill(contornoFora); g.restore();
      g.save(); g.clip(contornoFora);
      if (t2) { g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.3; g.fillStyle = g.createPattern(t2, 'repeat'); g.fillRect(0, 0, W, H); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; }
      // a espessura da emulsão faz um degrau: uma sombra fina e irregular sobre o miolo, ao longo da borda descolada
      const [sc, sg] = nova(W, H); sg.setTransform(1, 0, 0, 1, 0, 0); sg.drawImage(mk, 0, 0); sg.globalCompositeOperation = 'source-in'; sg.fillStyle = 'rgb(70,58,44)'; sg.fillRect(0, 0, sc.width, sc.height);
      g.globalAlpha = 0.22; g.drawImage(sc, 0.7, 1.1, W, H); g.globalAlpha = 1;
      // superfície fotográfica fosca intacta: branco liso, grão fino e um brilho difuso largo
      const [pc, pg] = nova(W, H); pg.setTransform(1, 0, 0, 1, 0, 0); pg.drawImage(mk, 0, 0); pg.scale(dpr, dpr);
      pg.globalCompositeOperation = 'source-in'; pg.fillStyle = '#fbfaf8'; pg.fillRect(0, 0, W, H);
      if (t4) { pg.globalCompositeOperation = 'multiply'; pg.fillStyle = pg.createPattern(t4, 'repeat'); pg.fillRect(0, 0, W, H); }
      pg.globalCompositeOperation = 'source-atop';
      const bx = rnd(0.2, 0.8) * W, by = rnd(0.15, 0.6) * H, br = Math.hypot(W, H) * 0.55, gr = pg.createRadialGradient(bx, by, 0, bx, by, br);
      gr.addColorStop(0, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); pg.fillStyle = gr; pg.fillRect(0, 0, W, H);
      pg.globalCompositeOperation = 'destination-in'; pg.setTransform(1, 0, 0, 1, 0, 0); pg.drawImage(mk, 0, 0);
      g.drawImage(pc, 0, 0, W, H);
      g.restore();
      // fiapos do papel grosso saindo da borda rasgada de fora
      g.strokeStyle = '#f4f1ea'; g.lineCap = 'round';
      faixas.forEach(({ f, dentro }) => dentro.forEach(([t, d]) => {
        if (Math.random() > 0.06) return;
        const [a, b] = f(t, d + 0.5), [c, e] = f(t + rnd(-1.5, 1.5), d - rnd(0.6, 1.8));
        g.lineWidth = rnd(0.3, 0.6); g.beginPath(); g.moveTo(a, b); g.lineTo(c, e); g.stroke();
      }));
      fundo.width = fc.width; fundo.height = fc.height; fundo.getContext('2d').drawImage(fc, 0, 0);
    };
    // contorno da janela traçado à mão: linha que oscila, muda de espessura e tem pequenas falhas
    const riscaMoldura = () => {
      const jw = moldura.offsetWidth, jh = moldura.offsetHeight; if (!jw) return;
      traco.setAttribute('viewBox', `-6 -6 ${jw + 12} ${jh + 12}`); traco.setAttribute('width', jw + 12); traco.setAttribute('height', jh + 12);
      const partes = [], halo = [];
      const linha = (x0, y0, x1, y1) => {
        const e0 = rnd(-1.2, 1.4), e1 = rnd(-1.2, 1.4), L0 = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L0, uy = (y1 - y0) / L0, nx = -uy, ny = ux;
        const L = L0 + e0 + e1, ox = x0 - ux * e0, oy = y0 - uy * e0;
        let s = 0, desvio = rnd(-0.4, 0.4), w = rnd(0.35, 0.7); const deriva = rnd(-0.03, 0.03), h = [];
        while (s < L) {
          const seg = Math.min(L - s, rnd(7, 30)), cima = [], baixo = [];
          for (let a = 0; ; a = Math.min(seg, a + 3)) {
            desvio = limita(desvio + rnd(-0.26, 0.26) + deriva, -1.7, 1.7); w = limita(w + rnd(-0.12, 0.12), 0.25, 0.85);
            const px = ox + ux * (s + a) + nx * desvio, py = oy + uy * (s + a) + ny * desvio;
            cima.push(`${(px + nx * w).toFixed(2)},${(py + ny * w).toFixed(2)}`); baixo.unshift(`${(px - nx * w).toFixed(2)},${(py - ny * w).toFixed(2)}`); h.push(`${px.toFixed(1)},${py.toFixed(1)}`);
            if (a >= seg) break;
          }
          partes.push(`<polygon points="${cima.concat(baixo).join(' ')}"/>`);
          s += seg; if (Math.random() < 0.38) s += rnd(1.5, 5); // falha no traço
        }
        halo.push(`<polyline points="${h.join(' ')}"/>`);
      };
      linha(0, 0, jw, 0); linha(jw, 0, jw, jh); linha(jw, jh, 0, jh); linha(0, jh, 0, 0); linha(jw / 2, 0, jw / 2, jh);
      traco.innerHTML = `<g class="halo">${halo.slice(0, 4).join('')}</g><g class="tinta">${partes.join('')}</g>`;
    };
    // imagem sorteada do baralho comum, com escala e recorte sorteados (sempre cobrindo a mesa); o sorteio vale até recomeçar
    const ze = rnd(1, 1.4), zx = Math.random(), zy = Math.random();
    const cobre = () => { if (!orig) return; const e = Math.max(W / orig.width, H / orig.height) * ze, sw = W / e, sh = H / e; cover = [(orig.width - sw) * zx, (orig.height - sh) * zy, sw, sh]; return e; };
    carrega(ctx.src(sorteiaImagem(ctx))).then((im) => {
      if (!im) return; prepara(); orig = im; const e = cobre(); folha();
      return texturiza(im, 4, e).then((t) => { img = t; });
    });
    let mw = 0;
    const refaz = () => { const w = mesa.clientWidth; if (!w || Math.abs(w - mw) < 1) return; const pri = !mw; mw = w; riscaMoldura(); if (!pri && orig) { prepara(); cobre(); folha(); } if (jan) pos(); };
    if (window.ResizeObserver) { const ro = new ResizeObserver(refaz); ro.observe(mesa); k.desl.push(() => ro.disconnect()); } else { k.ao(window, 'resize', refaz); k.depois(0, refaz); }
    let jan = null;
    const pos = () => {
      const MW = mesa.clientWidth, MH = mesa.clientHeight, jw = moldura.offsetWidth, jh = moldura.offsetHeight;
      const l = x * MW - jw / 2, t = y * MH - jh / 2;
      moldura.style.left = l + 'px'; moldura.style.top = t + 'px'; jan = [l, t, jw, jh];
      vistos.add(Math.floor(Math.min(0.999, Math.max(0, x)) * G) + ',' + Math.floor(Math.min(0.999, Math.max(0, y)) * G));
      if (vistos.size >= G * G * 0.55) ctx.feito();
    };
    k.laco(() => {
      if (!img || !jan) return;
      const [l, t, jw, jh] = jan;
      const c0 = Math.max(0, Math.floor(l / C)), c1 = Math.min(gw - 1, Math.floor((l + jw) / C)), r0 = Math.max(0, Math.floor(t / C)), r1 = Math.min(gh - 1, Math.floor((t + jh) / C));
      for (let i = 0; i < m.length; i++) { const v = m[i] - CAI; m[i] = v > 0 ? v : 0; }
      for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) m[r * gw + c] = FORCA;
      const d = md.data; for (let i = 0; i < m.length; i++) d[i * 4 + 3] = Math.round(m[i] * 255);
      mx.putImageData(md, 0, 0);
      cx.globalCompositeOperation = 'source-over'; cx.clearRect(0, 0, W, H);
      cx.drawImage(img, ...cover, 0, 0, W, H);
      cx.globalCompositeOperation = 'destination-in'; cx.imageSmoothingEnabled = true; cx.drawImage(mc, 0, 0, W, H);
      cx.globalCompositeOperation = 'source-over';
      // dentro da janela, a imagem inteira, sem transparência
      cx.save(); cx.beginPath(); cx.rect(l, t, jw, jh); cx.clip(); cx.drawImage(img, ...cover, 0, 0, W, H); cx.restore();
      // só onde a emulsão ficou: na faixa descolada do rasgo e fora da folha não há imagem
      if (emulsao) { cx.globalCompositeOperation = 'destination-in'; cx.setTransform(1, 0, 0, 1, 0, 0); cx.drawImage(emulsao, 0, 0); cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.globalCompositeOperation = 'source-over'; }
    });
    let arr = false;
    k.ao(mesa, 'pointerdown', (e) => { arr = true; mesa.setPointerCapture(e.pointerId); const p = local(e, mesa); x = p.x / mesa.clientWidth; y = p.y / mesa.clientHeight; pos(); });
    k.ao(mesa, 'pointermove', (e) => { if (!arr && e.pointerType !== 'mouse') return; const p = local(e, mesa); x = p.x / mesa.clientWidth; y = p.y / mesa.clientHeight; pos(); });
    k.ao(mesa, 'pointerup', () => (arr = false));
    k.ao(moldura, 'keydown', (e) => {
      const d = { ArrowLeft: [-0.06, 0], ArrowRight: [0.06, 0], ArrowUp: [0, -0.06], ArrowDown: [0, 0.06] }[e.key];
      if (d) { e.preventDefault(); x = Math.max(0, Math.min(1, x + d[0])); y = Math.max(0, Math.min(1, y + d[1])); pos(); }
    });
    k.depois(30, pos);
  };

  // 9 · Trajeto interrompido — tirar os pontos do mapa até restar partida e chegada
  // o trajeto é uma curva suave (Catmull-Rom convertida em Bézier) que passa por todos os pontos, sorteados a cada vez,
  // e pode se cruzar; ao tirar um ponto, a curva se refaz pelos que restam numa transição curta.
  // Fica numa folha rasgada com textura e sombra, sobre um mapa antigo apagado (costa, rios, curvas de nível,
  // rosa dos ventos, meridianos), também sorteado a cada vez e sempre mais fraco que a linha
  const curvaCR = (P) => {
    const f = (v) => v.toFixed(1); if (!P.length) return '';
    let d = `M${f(P[0][0])},${f(P[0][1])}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };
  // a mesma curva em n pontos igualmente espaçados ao longo do comprimento (para a transição entre duas curvas)
  const amostraCR = (P, n = 140) => {
    const den = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      for (let j = i ? 1 : 0; j <= 24; j++) {
        const t = j / 24, u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
        den.push([a * p1[0] + b * c1[0] + c * c2[0] + e * p2[0], a * p1[1] + b * c1[1] + c * c2[1] + e * p2[1]]);
      }
    }
    const L = [0]; for (let i = 1; i < den.length; i++) L.push(L[i - 1] + Math.hypot(den[i][0] - den[i - 1][0], den[i][1] - den[i - 1][1]));
    const tot = L[L.length - 1] || 1, out = []; let j = 0;
    for (let i = 0; i < n; i++) {
      const s = (tot * i) / (n - 1); while (j < den.length - 2 && L[j + 1] < s) j++;
      const q = (s - L[j]) / (L[j + 1] - L[j] || 1);
      out.push([den[j][0] + (den[j + 1][0] - den[j][0]) * q, den[j][1] + (den[j + 1][1] - den[j][1]) * q]);
    }
    return out;
  };
  // mapa antigo procedural no viewBox W×H, devolvido como SVG (só traços finos; a opacidade fica no CSS)
  const mapaAntigo = (W, H, evita) => {
    const f = (v) => v.toFixed(1), q = Math.random, linha = (pts) => pts.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');
    const ondas = (n) => Array.from({ length: n }, (_, i) => ({ fr: (i + 1) * rnd(0.6, 1.5), am: rnd(0.4, 1) / (i + 1), fa: rnd(0, 7) }));
    const soma = (os, x) => os.reduce((s, o) => s + o.am * Math.sin(x * o.fr + o.fa), 0);
    const out = [];
    // grade de meridianos e paralelos, levemente girada
    const gir = rnd(-7, 7), passo = rnd(42, 62), g = [];
    for (let x = -H + rnd(0, passo); x < W + H; x += passo) g.push(`<line x1="${f(x)}" y1="${-H}" x2="${f(x)}" y2="${2 * H}"/>`);
    for (let y = -W / 2 + rnd(0, passo); y < H + W / 2; y += passo) g.push(`<line x1="${-W}" y1="${f(y)}" x2="${2 * W}" y2="${f(y)}"/>`);
    out.push(`<g class="grade" transform="rotate(${f(gir)} ${W / 2} ${H / 2})">${g.join('')}</g>`);
    // linha da costa atravessando a folha (horizontal ou vertical), com duas linhas d'água acompanhando do lado do mar
    const vert = q() < 0.45, comp = vert ? H : W, larg = vert ? W : H, base = larg * rnd(0.25, 0.75), mar = q() < 0.5 ? -1 : 1;
    const os = ondas(5), amp = larg * rnd(0.12, 0.22), costa = [];
    for (let s = -4; s <= comp + 4; s += 3) { const v = base + amp * soma(os, s / comp * 6) + rnd(-1.2, 1.2); costa.push(vert ? [v, s] : [s, v]); }
    const desloca = (pts, d) => pts.map(([x, y]) => (vert ? [x + d * mar, y] : [x, y + d * mar]));
    out.push(`<polyline class="costa" points="${linha(costa)}"/>`);
    out.push(`<polyline class="agua" points="${linha(desloca(costa, 3.2))}"/><polyline class="agua agua-2" points="${linha(desloca(costa, 6.6))}"/>`);
    // curvas de nível em terra: 3 ou 4 anéis irregulares em volta de um morro
    const lado = (v) => (v - base) * -mar > 0; // true se está em terra
    let cx = 0, cy = 0;
    for (let t = 0; t < 30; t++) { cx = rnd(W * 0.15, W * 0.85); cy = rnd(H * 0.15, H * 0.85); if (lado(vert ? cx : cy)) break; }
    const on = ondas(4), r0 = rnd(12, 22), aneis = 3 + Math.floor(q() * 2), achata = rnd(0.55, 0.9), ang = rnd(0, Math.PI);
    for (let a = 0; a < aneis; a++) {
      const r = r0 + a * rnd(9, 14), pts = [];
      for (let i = 0; i < 64; i++) {
        const th = (i / 64) * Math.PI * 2, rr = r * (1 + 0.22 * soma(on, th + a * 0.3)), x = Math.cos(th) * rr, y = Math.sin(th) * rr * achata;
        pts.push([cx + x * Math.cos(ang) - y * Math.sin(ang), cy + x * Math.sin(ang) + y * Math.cos(ang)]);
      }
      out.push(`<polygon class="nivel" points="${linha(pts)}"/>`);
    }
    // rios: saem da costa para dentro da terra, serpenteando; um deles às vezes com afluente
    const rio = (x, y, dir, n) => {
      const pts = [[x, y]]; let a = dir;
      for (let i = 0; i < n; i++) { a += rnd(-0.45, 0.45); a += (dir - a) * 0.15; x += Math.cos(a) * 3.4; y += Math.sin(a) * 3.4; if (x < -4 || x > W + 4 || y < -4 || y > H + 4) break; pts.push([x, y]); }
      return pts;
    };
    const dentro = vert ? (mar > 0 ? Math.PI : 0) : (mar > 0 ? -Math.PI / 2 : Math.PI / 2);
    const nr = 1 + Math.floor(q() * 2);
    for (let i = 0; i < nr; i++) {
      const p = costa[Math.floor(rnd(0.15, 0.85) * costa.length)], r = rio(p[0], p[1], dentro + rnd(-0.5, 0.5), 22 + Math.floor(q() * 22));
      out.push(`<polyline class="rio" points="${linha(r)}"/>`);
      if (r.length > 12 && q() < 0.6) { const b = r[Math.floor(r.length * rnd(0.35, 0.7))]; out.push(`<polyline class="rio afluente" points="${linha(rio(b[0], b[1], dentro + (q() < 0.5 ? -1 : 1) * rnd(0.6, 1.1), 10 + Math.floor(q() * 10)))}"/>`); }
    }
    // rosa dos ventos discreta, num canto longe da partida e da chegada
    const cantos = [[34, 34], [W - 34, H - 34], [W / 2 + rnd(-40, 40), H - 30], [W / 2 + rnd(-40, 40), 30]]
      .filter((c) => evita.every((e) => Math.hypot(e[0] - c[0], e[1] - c[1]) > 52));
    const rc = cantos[Math.floor(q() * cantos.length)] || [W - 34, H - 34], rs = rnd(11, 15), rot = rnd(-18, 18);
    const ponta = (a, l, w) => { const c = Math.cos(a), s = Math.sin(a), n = [-s, c]; return `<path d="M0,0 L${f(n[0] * w)},${f(n[1] * w)} L${f(c * l)},${f(s * l)} L${f(-n[0] * w)},${f(-n[1] * w)}Z"/>`; };
    let rosa = `<circle r="${f(rs * 0.72)}"/><circle r="${f(rs * 0.78)}" class="fino"/>`;
    for (let i = 0; i < 4; i++) rosa += ponta((i * Math.PI) / 2 - Math.PI / 2, rs * 1.25, rs * 0.17);
    for (let i = 0; i < 4; i++) rosa += ponta((i * Math.PI) / 2 - Math.PI / 4, rs * 0.7, rs * 0.12);
    rosa += `<text x="0" y="${f(-rs * 1.25 - 2.5)}" text-anchor="middle">N</text>`;
    out.push(`<g class="rosa" transform="translate(${f(rc[0])} ${f(rc[1])}) rotate(${f(rot)})">${rosa}</g>`);
    return `<g class="mapa" aria-hidden="true">${out.join('')}</g>`;
  };
  M.trajeto = (ctx, k) => {
    const NS = 'http://www.w3.org/2000/svg', W = 300, H = 200;
    const folha = folhaRasgada(ctx, k, sorteiaPapel()); folha.classList.add('trajeto-folha');
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.classList.add('ex-svg', 'trajeto');
    // partida embaixo à esquerda, chegada em cima à direita; no meio, 12 pontos que vagam para os lados da reta
    // (às vezes voltam um pouco), longe uns dos outros o bastante para o dedo
    const A = [rnd(22, 40), rnd(160, 176)], B = [rnd(260, 278), rnd(24, 40)], N = 12;
    const dx = B[0] - A[0], dy = B[1] - A[1], dl = Math.hypot(dx, dy), nx = -dy / dl, ny = dx / dl;
    const pts = [A]; let o = 0;
    for (let i = 1; i <= N; i++) {
      let p = null;
      for (let t = 0; t < 60; t++) {
        const ao = limita(o * 0.35 + rnd(-1, 1) * 62, -78, 78), s = i / (N + 1) + rnd(-0.09, 0.09);
        const c = [limita(A[0] + dx * s + nx * ao, 16, W - 16), limita(A[1] + dy * s + ny * ao, 14, H - 14)];
        if ([...pts, B].every((q) => Math.hypot(q[0] - c[0], q[1] - c[1]) >= 24 - t * 0.2)) { p = c; o = ao; break; }
      }
      if (p) pts.push(p);
    }
    pts.push(B);
    const vivos = pts.map((p, i) => ({ x: p[0], y: p[1], i, vivo: true }));
    svg.innerHTML = mapaAntigo(W, H, [A, B]) + '<path class="rota"/>';
    const linha = svg.querySelector('.rota');
    const restam = () => vivos.filter((p) => p.vivo).map((p) => [p.x, p.y]);
    let mostra = amostraCR(restam()), anim = null;
    const desenha = () => linha.setAttribute('d', curvaCR(restam()));
    const refaz = () => {
      const para = amostraCR(restam());
      if (ctx.reduz) { mostra = para; desenha(); return; }
      const de = mostra, t0 = performance.now(), dur = 560, ia = !anim; anim = { de, para, t0 };
      if (!ia) return;
      k.laco((ts) => {
        const { de, para, t0 } = anim, t = limita(((ts || performance.now()) - t0) / dur, 0, 1), e = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
        mostra = de.map((p, i) => [p[0] + (para[i][0] - p[0]) * e, p[1] + (para[i][1] - p[1]) * e]);
        if (t >= 1) { anim = null; mostra = para; desenha(); return false; }
        linha.setAttribute('d', 'M' + mostra.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L'));
      });
    };
    vivos.forEach((p, i) => {
      const g = document.createElementNS(NS, 'g');
      const ponta = i === 0 || i === vivos.length - 1;
      g.innerHTML = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${ponta ? 6 : 4.5}" class="${ponta ? 'ponta' : 'no'}"/>${ponta ? `<text x="${(p.x + (i ? -8 : 8)).toFixed(1)}" y="${(p.y + (i ? 18 : -12)).toFixed(1)}" text-anchor="${i ? 'end' : 'start'}">${i ? k.T('chegada') : k.T('partida')}</text>` : `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="13" class="toque"/>`}`;
      if (!ponta) {
        g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', `${i}`);
        const tira = () => { if (!p.vivo) return; p.vivo = false; g.classList.add('foi'); g.removeAttribute('tabindex'); refaz(); if (vivos.filter((q) => q.vivo).length === 2) { svg.classList.add('reta'); ctx.feito(); } };
        g.addEventListener('click', tira); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tira(); } });
      }
      svg.appendChild(g);
    });
    desenha(); folha.appendChild(svg);
  };

  // 10 · Constelação provisória — marcar pontos, ligar, depois desfazer
  M.constelacao = (ctx, k) => {
    const { cv, cx, w, h } = k.tela();
    ctx.palco.classList.add('noite'); cv.classList.add('noite');
    const pts = []; let desfazendo = false, alfa = 1;
    const marca = (x, y) => { if (desfazendo || pts.length >= 20) return false; pts.push({ x, y, vx: 0, vy: 0, t: 0, fase: rnd(0, 7), ritmo: rnd(0.03, 0.07) }); btn.disabled = pts.length < 3; return true; };
    // toque marca um ponto; arrastando, o desenho segue o gesto: um ponto novo a cada ~400 ms,
    // desde que o dedo tenha andado ao menos 10% da largura desde o último (se não andou, espera até andar)
    let arrasto = null; cv.style.touchAction = 'none';
    k.ao(cv, 'pointerdown', (e) => {
      try { cv.setPointerCapture(e.pointerId); } catch {}
      const p = local(e, cv); marca(p.x, p.y); arrasto = { id: e.pointerId, x: p.x, y: p.y, ux: p.x, uy: p.y, t: performance.now() };
    });
    k.ao(cv, 'pointermove', (e) => { if (!arrasto || e.pointerId !== arrasto.id) return; const p = local(e, cv); arrasto.x = p.x; arrasto.y = p.y; });
    const larga = (e) => { if (arrasto && e.pointerId === arrasto.id) arrasto = null; };
    k.ao(cv, 'pointerup', larga); k.ao(cv, 'pointercancel', larga);
    k.laco(() => {
      if (arrasto) {
        const a = arrasto, agora = performance.now();
        if (agora - a.t >= 400 && Math.hypot(a.x - a.ux, a.y - a.uy) >= w * 0.1 && marca(a.x, a.y)) { a.ux = a.x; a.uy = a.y; a.t = agora; }
      }
      cx.fillStyle = '#0a1426'; cx.fillRect(0, 0, w, h);
      cx.strokeStyle = 'rgba(143,179,232,.16)'; cx.lineWidth = 1; cx.beginPath(); cx.arc(w / 2, h / 2, Math.min(w, h) * 0.42, 0, 7); cx.stroke();
      cx.beginPath(); cx.arc(w / 2, h / 2, Math.min(w, h) * 0.2, 0, 7); cx.stroke();
      cx.globalAlpha = alfa * 0.75;
      cx.setLineDash([3, 5]); cx.lineCap = 'round';
      cx.strokeStyle = 'rgb(150,200,160)'; cx.lineWidth = 1; cx.beginPath(); pts.forEach((p, i) => (i ? cx.lineTo(p.x, p.y) : cx.moveTo(p.x, p.y))); cx.stroke();
      cx.setLineDash([]); cx.globalAlpha = 1;
      pts.forEach((p) => {
        p.t++; if (desfazendo) { p.x += p.vx; p.y += p.vy; p.vx *= 1.02; p.vy *= 1.02; }
        // cintilar leve: o brilho oscila entre ~70% e 100%, cada estrela no seu ritmo
        const brilho = 0.85 + 0.15 * Math.sin(p.t * p.ritmo + p.fase), cresce = Math.min(1, p.t / 15);
        const r = (1.6 + cresce * 1.2) * (0.9 + 0.1 * brilho);
        const halo = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        // estrelas em azul claro: miolo #a9c4f0 e halo suave #8fb3e8
        halo.addColorStop(0, `rgba(143,179,232,${0.45 * brilho})`); halo.addColorStop(1, 'rgba(143,179,232,0)');
        cx.fillStyle = halo; cx.beginPath(); cx.arc(p.x, p.y, r * 4, 0, 7); cx.fill();
        cx.fillStyle = `rgba(169,196,240,${brilho})`; cx.beginPath(); cx.arc(p.x, p.y, r, 0, 7); cx.fill();
        const raio = 5 + 3 * brilho;
        cx.strokeStyle = `rgba(169,196,240,${0.5 * brilho})`; cx.lineWidth = 0.6; cx.beginPath(); cx.moveTo(p.x - raio, p.y); cx.lineTo(p.x + raio, p.y); cx.moveTo(p.x, p.y - raio); cx.lineTo(p.x, p.y + raio); cx.stroke();
      });
      if (desfazendo) { alfa = Math.max(0, alfa - 0.012); if (pts.every((p) => p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20)) { ctx.feito(); return false; } }
    });
    // completar: põe em sequência mais 5 ou 6 estrelas (a 10% da largura umas das outras) e desfaz
    let completando = false;
    const livre = () => {
      for (let t = 0; t < 200; t++) { const x = rnd(w * 0.1, w * 0.9), y = rnd(h * 0.12, h * 0.88); if (pts.every((p) => Math.hypot(p.x - x, p.y - y) >= w * 0.1)) return { x, y }; }
      return null;
    };
    const comp = ctx.botao(k.T('completar'), () => {
      if (completando || desfazendo) return; completando = true; comp.disabled = true; arrasto = null;
      // põe mais 5 ou 6 estrelas (no mínimo as que faltam para 3, no máximo até 20), só onde couberem a 10% da largura das outras
      const faltam = Math.min(20 - pts.length, Math.max(3 - pts.length, 5 + Math.floor(Math.random() * 2)));
      for (let i = 0; i < faltam; i++) k.depois(260 * i, () => { const q = livre(); if (q) marca(q.x, q.y); });
      k.depois(260 * faltam + 700, desfaz);
    });
    const desfaz = () => {
      if (pts.length < 3 || desfazendo) return; desfazendo = true; btn.disabled = true; comp.disabled = true;
      pts.forEach((p) => { const a = Math.atan2(p.y - h / 2, p.x - w / 2) + rnd(-0.4, 0.4); p.vx = Math.cos(a) * rnd(0.3, 0.8); p.vy = Math.sin(a) * rnd(0.3, 0.8); });
    };
    const btn = ctx.botao(k.T('desfazer'), desfaz);
    btn.disabled = true;
  };

  // 11 · Poeira do lugar — a imagem (sorteada do baralho do 15) vira poeira e o vento leva
  M.poeira = (ctx, k) => {
    const { cv, cx, w, h } = k.tela(); const P = 7; let img = null, parts = [], soprou = false;
    // o fragmento é uma folha com 2 ou 3 lados rasgados (franja clara sutil e sombra leve), sobre a mesa;
    // a imagem cobre a folha inteira (sem faixas nem repetição): escala e recorte sorteados, sempre cobrindo 100%
    const dpr = cv.width / w, m = Math.round(Math.min(w, h) * 0.07), fw = w - 2 * m, fh = h - 2 * m;
    const poli = contorno(fw, fh, limita(fw * 0.025, 5, 11), ladosRasgados()).map(([x, y]) => [x + m, y + m]);
    const camada = () => { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; const g = c.getContext('2d'); g.scale(dpr, dpr); return [c, g]; };
    // base: a folha inteira, nunca mexida (de onde sai a poeira); folha: o que ainda está no lugar
    const [base, gb] = camada(), [folha, gf] = camada();
    let esc = 1;
    carrega(ctx.src(sorteiaImagem(ctx))).then((im) => { if (!im) return null; esc = Math.max(fw / im.width, fh / im.height) * rnd(1, 1.4); return texturiza(im, sorteiaPapel(), esc); }).then((im) => {
      if (!im) return; img = im;
      const iw = im.width * esc, ih = im.height * esc, ox = m - rnd(0, Math.max(0, iw - fw)), oy = m - rnd(0, Math.max(0, ih - fh));
      const caminho = (g) => { g.beginPath(); poli.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); };
      gb.save(); caminho(gb); gb.clip(); gb.drawImage(im, ox, oy, iw, ih);
      // franja clara do papel arrancado, bem sutil, por dentro da borda
      gb.strokeStyle = 'rgba(248,244,236,.75)'; gb.lineWidth = 3; caminho(gb); gb.stroke(); gb.restore();
      gf.drawImage(base, 0, 0, w, h);
      for (let y = m; y < h - m; y += P) for (let x = m; x < w - m; x += P) parts.push({ x, y, x0: x, y0: y, vx: 0, vy: 0, a: 1, solto: false, limpo: false });
    });
    let ult = null;
    const empurra = (p0, p1) => {
      const dx = p1.x - p0.x, dy = p1.y - p0.y, v = Math.hypot(dx, dy) || 1;
      parts.forEach((q) => { const d = Math.hypot(q.x - p1.x, q.y - p1.y); if (d < 34) { q.solto = true; q.vx += (dx / v) * rnd(1, 3) + rnd(1, 2); q.vy += (dy / v) * rnd(1, 3) - rnd(0.3, 1); } });
    };
    k.ao(cv, 'pointerdown', (e) => { cv.setPointerCapture(e.pointerId); ult = local(e, cv); });
    k.ao(cv, 'pointermove', (e) => { const p = local(e, cv); if (ult || e.pointerType === 'mouse') { empurra(ult || p, p); ult = ult ? p : null; } });
    k.ao(cv, 'pointerup', () => (ult = null));
    k.laco(() => {
      if (!img) return;
      cx.fillStyle = '#f2f0ea'; cx.fillRect(0, 0, w, h); // a mesa, no tom de papel do palco dos outros fragmentos de folha
      let soltos = 0;
      parts.forEach((q) => { if (q.solto && !q.limpo) { q.limpo = true; gf.clearRect(q.x0, q.y0, P, P); } });
      // o que resta da folha, com a sombra leve seguindo o recorte
      cx.save(); cx.shadowColor = 'rgba(29,27,25,.32)'; cx.shadowBlur = 6; cx.shadowOffsetY = 3; cx.drawImage(folha, 0, 0, w, h); cx.restore();
      const S = P * dpr;
      parts.forEach((q) => {
        if (!q.solto) return;
        q.vx += 0.04; q.vy += rnd(-0.05, 0.03); q.x += q.vx; q.y += q.vy; q.vx *= 0.99; q.a -= 0.008; soltos++;
        if (q.a <= 0) return;
        cx.globalAlpha = Math.max(0, q.a);
        const tam = P * Math.max(0.25, q.a);
        cx.drawImage(base, q.x0 * dpr, q.y0 * dpr, S, S, q.x, q.y, tam, tam);
      });
      cx.globalAlpha = 1;
      if (parts.length && soltos > parts.length * 0.8 && !soprou) { soprou = true; parts.forEach((q) => { q.solto = true; q.vx += rnd(0.5, 2); }); }
      if (soprou && parts.every((q) => q.a <= 0)) { ctx.feito(); return false; }
    });
    ctx.botao(k.T('soprar'), () => { parts.forEach((q, i) => { q.solto = true; q.vx += rnd(1, 4) + (q.x / w) * 2; q.vy += rnd(-1, 0.5); }); soprou = true; });
  };

  // 12 · Vento contrário — as letras se espalham com o gesto
  M.vento = (ctx, k) => {
    k.pergunta({ rotulo: k.T('escreva'), padrao: k.T('palavra'), max: 24, ok(v, f) {
      f.remove();
      const mesa = el('div', 'mesa vento-mesa'); ctx.palco.appendChild(mesa);
      // a palavra fica sobre uma folha de papel com 2 ou 3 lados rasgados e sombra leve seguindo o recorte
      const sombra = el('div', 'vento-sombra'), folha = el('div', 'vento-folha'); sombra.appendChild(folha); mesa.appendChild(sombra); papel(folha);
      const W = mesa.clientWidth, H = mesa.clientHeight;
      const fw = folha.clientWidth, fh = folha.clientHeight;
      if (fw) { recorte(folha, poligono(contorno(fw, fh, limita(fw * 0.025, 5, 11), ladosRasgados()), fw, fh)); amassa(folha, fw, fh); folha.classList.add('amassa'); folha.style.setProperty('--am-tam', `${fw}px ${fh}px`); }
      const letras = [...v].map((c, i, a) => {
        const s = el('span', 'vento-letra', c === ' ' ? '&nbsp;' : c); s.setAttribute('aria-hidden', 'true'); mesa.appendChild(s);
        const lw = Math.min(34, (W * 0.8) / a.length);
        return { s, x0: W / 2 + (i - (a.length - 1) / 2) * lw, y0: H / 2, x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0 };
      });
      mesa.setAttribute('aria-label', v); mesa.setAttribute('role', 'img');
      let ult = null;
      const sopra = (p, dx, dy) => letras.forEach((l) => {
        const d = Math.hypot(l.x0 + l.x - p.x, l.y0 + l.y - p.y);
        if (d < 70) { const f = (70 - d) / 70; l.vx += dx * f * 0.35; l.vy += dy * f * 0.35 - f; l.vr += rnd(-8, 8) * f; }
      });
      k.ao(mesa, 'pointerdown', (e) => { mesa.setPointerCapture(e.pointerId); ult = local(e, mesa); });
      k.ao(mesa, 'pointermove', (e) => { const p = local(e, mesa); if (ult) sopra(p, p.x - ult.x, p.y - ult.y); ult = ult ? p : null; });
      k.ao(mesa, 'pointerup', () => (ult = null));
      k.laco(() => {
        let longe = 0;
        letras.forEach((l) => {
          l.x += l.vx; l.y += l.vy; l.r += l.vr; l.vx *= 0.96; l.vy *= 0.96; l.vr *= 0.95;
          l.s.style.transform = `translate(${(l.x0 + l.x).toFixed(1)}px, ${(l.y0 + l.y).toFixed(1)}px) translate(-50%,-50%) rotate(${l.r.toFixed(1)}deg)`;
          const fora = Math.hypot(l.x, l.y) > Math.min(W, H) * 0.45;
          l.s.style.opacity = fora ? Math.max(0.15, 1 - Math.hypot(l.x, l.y) / W) : 1;
          if (fora) longe++;
        });
        if (longe === letras.length) ctx.feito();
      });
      ctx.botao(k.T('soprar'), () => letras.forEach((l) => { l.vx += rnd(6, 16); l.vy += rnd(-8, 6); l.vr += rnd(-20, 20); }));
    } });
  };

  // 13 · Costura da ausência — alinhar as faixas; quando a imagem se completa, uma delas vira poeira e o vento leva (como no 11)
  M.costura = (ctx, k) => {
    const mesa = el('div', 'mesa costura-mesa'); ctx.palco.appendChild(mesa);
    // a folha fica recolhida dentro da mesa, com 2 ou 3 lados rasgados e uma sombra leve por baixo (fixa, sob o contorno)
    const sombra = el('div', 'costura-folha folha-sombra', '<i></i>'), quadro = el('div', 'costura-folha costura-quadro');
    mesa.append(sombra, quadro);
    // as fitas têm o dobro da altura do quadro (meia altura sobrando acima e abaixo): correm sem mostrar a borda,
    // e a imagem se monta quando estão alinhadas entre si, em qualquer altura, não presa às bordas do quadro
    const N = 6, ENCAIXE = 7, falta = Math.floor(Math.random() * N); const faixas = []; let desfeita = false;
    const src = ctx.src(sorteiaImagem(ctx)); let img = null, nFalta = 0, geo = null;
    const MAX = () => quadro.clientHeight / 2 - 12;
    // deslocamentos iniciais bem separados entre vizinhas, para nenhuma começar já encaixada
    const offs = []; for (let i = 0; i < N; i++) { let o; do { o = (Math.random() < 0.5 ? -1 : 1) * rnd(30, 90); } while (i && Math.abs(o - offs[i - 1]) < 16); offs.push(o); }
    for (let i = 0; i < N; i++) {
      const f = el('div', 'faixa');
      f.style.left = `${(i * 100) / N}%`; f.style.width = `${100 / N}%`; f.style.top = f.style.bottom = '-50%'; f.classList.add('amassa');
      // a imagem fica numa camada de dentro; por baixo, a própria faixa é o miolo claro do papel, que aparece na borda rasgada
      const im = el('div', 'faixa-img'); f.appendChild(im);
      im.style.backgroundImage = `url("${src}")`; im.style.backgroundSize = `${N * 100}% 100%`; im.style.backgroundPosition = `${(i / (N - 1)) * 100}% 0`;
      f.tabIndex = 0; f.setAttribute('role', 'slider'); f.setAttribute('aria-label', `${i + 1}`);
      const n = papel(f); if (i === falta) nFalta = n;
      quadro.appendChild(f);
      faixas.push({ f, im, i, off: offs[i] });
    }
    // rasgos: cada costura entre vizinhas tem UM caminho de rasgo ao longo da fita inteira (2× a altura do quadro),
    // usado como borda direita de uma e borda esquerda da outra; encaixam só quando as duas estão na mesma altura.
    // As fitas ficam A px mais largas de cada lado, para o rasgo ter onde morder
    let A = 6, MS = 0, costuras = null, franjas = null, contornoN = null, amC = null;
    const recorta = () => {
      const W = quadro.clientWidth, H = quadro.clientHeight; if (!W) return false;
      A = limita(W * 0.035, 6, 13);
      if (!costuras) {
        // o rasgo: uma ondulação larga e lenta (o caminho da mão) com dentes miúdos por cima
        MS = Math.max(40, Math.round((2 * H) / 3));
        const suave = (v, r) => v.map((_, j) => { let t = 0, n = 0; for (let d = -r; d <= r; d++) { const q = v[j + d]; if (q !== undefined) { t += q; n++; } } return t / n; });
        costuras = Array.from({ length: N - 1 }, () => { const largo = suave(perfil(MS), 6), fino = perfil(MS); return largo.map((v, j) => limita((v - 0.5) * 2.6 + (fino[j] - 0.5) * 0.45, -1, 1)); });
        // a franja clara de cada lado do rasgo: 1 a 3,5 px, desfiada
        franjas = Array.from({ length: N - 1 }, () => [0, 1].map(() => perfil(MS).map((v) => 1 + v * 2.5)));
        contornoN = contorno(W, H, limita(W * 0.025, 5, 11), ladosRasgados()).map(([x, y]) => [x / W, y / H]);
        amC = amassa(quadro, W, 2 * H);
      }
      const forma = poligono(contornoN, 1, 1); recorte(quadro, forma); recorte(sombra.firstChild, forma);
      const fw = W / N, sh = 2 * H;
      faixas.forEach((x) => {
        const d = costuras[x.i], e = costuras[x.i - 1], pts = [];
        for (let j = 0; j <= MS; j++) pts.push([d ? A + fw + d[j] * A : fw + 2 * A, (j / MS) * sh]);
        for (let j = MS; j >= 0; j--) pts.push([e ? A + e[j] * A - 0.7 : 0, (j / MS) * sh]); // 0,7 px de sobra: sem fio claro do antisserrilhado na costura
        x.pts = pts; x.f.style.left = `${x.i * fw - A}px`; x.f.style.width = `${fw + 2 * A}px`;
        recorte(x.f, 'polygon(' + pts.map(([a, b]) => `${a.toFixed(1)}px ${b.toFixed(1)}px`).join(',') + ')');
        // a imagem recolhida da franja em cada lado rasgado (quando a costura está desencontrada)
        const dentro = (comD, comE) => { const q = [];
          for (let j = 0; j <= MS; j++) q.push([d ? A + fw + d[j] * A - (comD ? franjas[x.i][0][j] : 0) : fw + 2 * A, (j / MS) * sh]);
          for (let j = MS; j >= 0; j--) q.push([e ? A + e[j] * A - 0.7 + (comE ? franjas[x.i - 1][1][j] : 0) : 0, (j / MS) * sh]);
          return 'polygon(' + q.map(([a, b]) => `${a.toFixed(1)}px ${b.toFixed(1)}px`).join(',') + ')'; };
        x.formas = [dentro(false, false), dentro(true, false), dentro(false, true), dentro(true, true)]; x.franja = -1;
        x.f.style.setProperty('--am-tam', `${W}px ${sh}px`); x.f.style.setProperty('--am-pos', `${-(x.i * fw - A)}px 0`);
      });
      franjas_();
      return true;
    };
    // franja à direita/esquerda só onde a vizinha não está na mesma altura (encaixadas, o rasgo fecha sem fresta)
    function franjas_() {
      faixas.forEach((x) => { if (!x.formas || !x.im.parentNode) return; const d = faixas[x.i + 1], e = faixas[x.i - 1];
        const q = (d && d.off !== x.off ? 1 : 0) + (e && e.off !== x.off ? 2 : 0);
        if (q !== x.franja) { x.franja = q; recorte(x.im, x.formas[q]); } });
    }
    if (!recorta()) k.depois(30, recorta);
    // a imagem cobre as fitas inteiras sem deformar (como cover), centrada; cada fita mostra a sua fatia
    const ajusta = () => {
      if (!img) return; const W = quadro.clientWidth, H = quadro.clientHeight, e = Math.max(W / img.width, (2 * H) / img.height);
      geo = { W, H, e, dx: (img.width * e - W) / 2, dy: (img.height * e - 2 * H) / 2 };
      faixas.forEach((x) => { x.im.style.backgroundSize = `${img.width * e}px ${img.height * e}px`; x.im.style.backgroundPosition = `${-(geo.dx + (x.i * W) / N - A)}px ${-geo.dy}px`; });
    };
    carrega(src).then((im) => { img = im; ajusta(); });
    k.ao(window, 'resize', () => { recorta(); ajusta(); });
    // a faixa sorteada se desfaz em grãos que o vento leva para a direita
    const desfaz = async () => {
      const x = faixas[falta]; recorta(); ajusta();
      const W = quadro.clientWidth, H = quadro.clientHeight, g = geo || { e: 1, dx: 0, dy: 0 }, fw = W / N, bx = falta * fw - A, sw = fw + 2 * A, sh = 2 * H;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      // a fita como está na tela (imagem, relevo do papel, amassado), já recortada no rasgo: os grãos saem dela
      const fc = document.createElement('canvas'); fc.width = Math.ceil(sw * dpr); fc.height = Math.ceil(sh * dpr);
      const f2 = fc.getContext('2d'); f2.scale(dpr, dpr);
      const caminho = new Path2D(); x.pts.forEach(([a, b], j) => (j ? caminho.lineTo(a, b) : caminho.moveTo(a, b))); caminho.closePath();
      f2.save(); f2.clip(caminho);
      if (img) f2.drawImage(img, -(g.dx + bx), -g.dy, img.width * g.e, img.height * g.e);
      const t = await textura(nFalta);
      if (t) { f2.globalCompositeOperation = 'multiply'; f2.fillStyle = f2.createPattern(t, 'repeat'); f2.fillRect(0, 0, sw, sh); }
      if (amC) { f2.globalCompositeOperation = 'soft-light'; f2.drawImage(amC, -bx, 0, W, sh); }
      f2.restore();
      const borda = new Path2D(); contornoN.forEach(([a, b], j) => (j ? borda.lineTo(a * W, b * H) : borda.moveTo(a * W, b * H))); borda.closePath();
      const teste = document.createElement('canvas').getContext('2d');
      const cv = el('canvas', 'costura-poeira'); const MW = mesa.clientWidth, MH = mesa.clientHeight, ox = quadro.offsetLeft, oy = quadro.offsetTop;
      cv.width = MW * dpr; cv.height = MH * dpr; mesa.appendChild(cv); const cx = cv.getContext('2d'); cx.scale(dpr, dpr);
      const P = 7, parts = [];
      for (let y = 0; y < H; y += P) for (let lx = 0; lx < sw; lx += P) {
        const ly = y + H / 2 - x.off;
        if (!teste.isPointInPath(caminho, lx + P / 2, ly + P / 2) || !teste.isPointInPath(borda, bx + lx + P / 2, y + P / 2)) continue;
        parts.push({ x: ox + bx + lx, y: oy + y, sx: lx * dpr, sy: ly * dpr, vx: 0, vy: 0, a: 1, atraso: Math.floor(rnd(0, 40) + (1 - y / H) * 20) });
      }
      x.im.remove(); x.f.classList.remove('textura', 'papel-' + nFalta, 'amassa'); x.f.classList.add('ausente'); x.f.removeAttribute('role'); x.f.removeAttribute('aria-valuenow'); x.f.tabIndex = -1;
      k.laco(() => {
        cx.clearRect(0, 0, MW, MH); let vivos = 0;
        parts.forEach((q) => {
          if (q.a <= 0) return; vivos++;
          if (q.atraso > 0) { q.atraso--; if (q.atraso === 0) { q.vx += rnd(1, 4); q.vy += rnd(-1, 0.5); } }
          else { q.vx += 0.04; q.vy += rnd(-0.05, 0.03); q.x += q.vx; q.y += q.vy; q.vx *= 0.99; q.a -= 0.008; }
          cx.globalAlpha = Math.max(0, q.a);
          const tam = q.atraso > 0 ? P + 0.5 : P * Math.max(0.25, q.a);
          cx.drawImage(fc, q.sx, q.sy, P * dpr, P * dpr, q.x, q.y, tam, tam);
        });
        cx.globalAlpha = 1;
        if (!vivos) { cv.remove(); ctx.feito(); return false; }
      });
    };
    // o "clique" do encaixe: um pequeno salto visual e, onde houver, uma vibração curta
    const clique = (f) => { try { navigator.vibrate && navigator.vibrate(10); } catch {} f.classList.remove('clique'); void f.offsetWidth; f.classList.add('clique'); };
    const vizinhas = (x) => [faixas[x.i - 1], faixas[x.i + 1]].filter(Boolean);
    // alturas já ocupadas pelas outras faixas, com quantas faixas cada uma tem
    const grupos = (fora) => { const m = new Map(); faixas.forEach((q) => { if (q !== fora) m.set(q.off, (m.get(q.off) || 0) + 1); }); return [...m]; };
    // altura para onde o Alinhar e a montagem final levam as faixas: a referência (sem grupo ainda, a mais perto do centro)
    const principal = () => { const r = referencia(null); return r !== null ? r : grupos(null).sort((a, b) => Math.abs(a[0]) - Math.abs(b[0]))[0][0]; };
    // altura de referência: a do primeiro grupo formado, enquanto ele for o maior; uma faixa só encaixa nela,
    // nunca numa faixa solta ou num grupo menor. Antes de existir grupo, a primeira junção define a referência
    let ref = null;
    const referencia = (fora) => {
      const gs = grupos(fora).filter(([, n]) => n >= 2); if (!gs.length) return null;
      const maior = Math.max(...gs.map(([, n]) => n)), atual = gs.find(([o]) => o === ref);
      return atual && atual[1] === maior ? ref : gs.find(([, n]) => n === maior)[0];
    };
    const encaixa = (x) => {
      const r = referencia(x);
      const alvo = r !== null ? r : (grupos(x).filter(([o]) => Math.abs(o - x.off) <= ENCAIXE).sort((a, b) => Math.abs(a[0] - x.off) - Math.abs(b[0] - x.off))[0] || [null])[0];
      if (alvo !== null && alvo !== x.off && Math.abs(alvo - x.off) <= ENCAIXE) { x.off = alvo; ref = alvo; clique(x.f); }
    };
    const aplica = () => {
      franjas_();
      faixas.forEach((x) => {
        x.f.style.transform = `translateY(${x.off}px)`; x.f.setAttribute('aria-valuenow', Math.round(x.off));
        x.f.classList.toggle('alinhada', vizinhas(x).some((v) => v.off === x.off));

      });
    };
    // só se desfaz com tudo parado: depois de soltar a faixa (e do deslize, se houver), a imagem completa fica
    // 700 ms quieta; se alguém tocar numa faixa nesse meio tempo, a espera é cancelada
    // "Solta" de verdade: além do pointerup da faixa, nenhum dedo pode estar na tela (no iPhone o navegador às vezes
    // cancela o ponteiro com o dedo ainda arrastando) e nenhum botão do mouse apertado. Depois, a imagem completa
    // fica 700 ms parada antes de começar a se desfazer
    let vez = 0, arrastando = false, dedos = 0, botao = false, pendente = false;
    const ocupado = () => arrastando || dedos > 0 || botao;
    const montada = () => faixas.every((x) => x.off === faixas[0].off);
    const agenda = (atraso) => {
      if (desfeita || !montada()) return; const v = ++vez;
      if (ocupado()) { pendente = true; return; }
      k.depois(atraso, () => {
        if (v !== vez || ocupado() || desfeita || !montada()) return;
        mesa.classList.add('costurada');
        k.depois(700, () => { if (v !== vez || ocupado() || desfeita || !montada()) { mesa.classList.remove('costurada'); return; } desfeita = true; desfaz(); });
      });
    };
    const toques = (e) => { dedos = e.touches.length; if (dedos) cancela(); else if (pendente) { pendente = false; solta(); } };
    ['touchstart', 'touchend', 'touchcancel'].forEach((n) => k.ao(document, n, toques, { passive: true }));
    k.ao(window, 'pointerdown', (e) => { if (e.pointerType === 'mouse') { botao = true; cancela(); } }, true);
    k.ao(window, 'pointerup', (e) => { if (e.pointerType === 'mouse') { botao = false; if (pendente) { pendente = false; k.depois(0, solta); } } }, true);
    const cancela = () => { vez++; mesa.classList.remove('costurada'); };
    // leva as faixas indicadas até a altura de referência, com um deslize curto e o clique em cada uma
    const junta = (lista) => { const alvo = principal(); let moveu = false; lista.forEach((q) => { if (q.off !== alvo) { moveu = true; q.off = alvo; q.f.classList.add('desliza'); clique(q.f); k.depois(320, () => q.f.classList.remove('desliza')); } }); aplica(); return moveu; };
    // ao soltar: se todas estão a até ENCAIXE px da referência (diferença que o olho não separa), terminam de encaixar
    const quase = () => { const r = principal(); return faixas.every((q) => Math.abs(q.off - r) <= ENCAIXE); };
    const solta = () => { if (desfeita) return; const moveu = quase() && junta(faixas); agenda(moveu ? 330 : 0); };
    const pronta = () => desfeita;
    faixas.forEach((x) => {
      let ini = null;
      k.ao(x.f, 'pointerdown', (e) => { if (pronta()) return; e.preventDefault(); try { x.f.setPointerCapture(e.pointerId); } catch {} ini = { y: e.clientY, o: x.off }; arrastando = true; cancela(); });
      k.ao(x.f, 'pointermove', (e) => {
        if (!ini) return; const antes = x.off;
        x.off = Math.max(-MAX(), Math.min(MAX(), ini.o + e.clientY - ini.y));
        // já encaixada, só se solta depois de passar do ponto de encaixe (como um imã fraco)
        if (faixas.some((v) => v !== x && v.off === antes) && Math.abs(x.off - antes) <= ENCAIXE) x.off = antes; else encaixa(x);
        aplica();
      });
      k.ao(x.f, 'pointerup', () => { arrastando = false; if (ini) { ini = null; solta(); } });
      k.ao(x.f, 'pointercancel', () => { arrastando = false; if (ini) { ini = null; solta(); } });
      k.ao(x.f, 'keydown', (e) => { if (pronta()) return; const d = { ArrowUp: -8, ArrowDown: 8 }[e.key]; if (d) { e.preventDefault(); cancela(); x.off = Math.max(-MAX(), Math.min(MAX(), x.off + d)); encaixa(x); aplica(); solta(); } });
    });
    aplica();
    // ajuda: todas as faixas deslizam juntas até a altura do maior grupo
    ctx.botao(k.T('alinhar'), () => { if (desfeita) return; cancela(); agenda(junta(faixas) ? 330 : 0); });
  };

  // 14 · Pontos de sutura — cada ponto aproxima as duas metades
  M.sutura = (ctx, k) => {
    const mesa = el('div', 'mesa sutura-mesa'); ctx.palco.appendChild(mesa);
    // a figura é uma folha sobre a mesa: contorno com 2 ou 3 lados rasgados, sombra leve seguindo o recorte (no invólucro),
    // e a divisão central é um rasgo só, com as bordas das duas metades complementares
    const sombra = el('div', 'sutura-sombra'), folha = el('div', 'sutura-folha'); sombra.appendChild(folha); mesa.appendChild(sombra);
    const esq = el('div', 'metade esq amassa'), dir = el('div', 'metade dir amassa');
    const fig = ctx.src(sorteiaImagem(ctx));
    // cada metade é papel (cor da folha) com a imagem num filho recolhido do rasgo: a franja clara desfiada aparece na divisão
    const ims = [esq, dir].map((m) => { const im = el('div', 'metade-img'); im.style.backgroundImage = `url("${fig}")`; m.appendChild(im); papel(m); folha.appendChild(m); return im; });
    let franja = null;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg'); svg.classList.add('pontos'); mesa.appendChild(svg);
    const PONTOS = 6; let feitos = [], gap = 0.36;
    let A = 6, MS = 0, rasgo = null, perda = null;
    // deslocamento do rasgo central na altura yN (0…1 da folha)
    const dx = (yN) => (rasgo ? rasgo[Math.round(limita(yN, 0, 1) * MS)] * A : 0);
    const recorta = () => {
      const W = folha.clientWidth, H = folha.clientHeight; if (!W) return false;
      A = limita(W * 0.02, 4, 9);
      if (!rasgo) {
        MS = Math.max(30, Math.round(H / 4)); rasgo = perfil(MS).map((v) => v * 2 - 1);
        // franja de cada lado do rasgo: 1,5 a 6 px, larga e estreita ao longo da borda, com fiapos miúdos
        franja = [0, 1].map(() => { const f = perfil(MS); return f.map((v, j) => 1.5 + v * 4.5 + (Math.random() < 0.18 ? Math.random() * 1.5 : 0)); });
        // cicatrizes: em 2 a 4 trechos (20 a 30% do rasgo) cada metade perdeu papel e emulsão por conta própria,
        // então as bordas deixam de encaixar e, fechada a sutura, sobra ali uma fresta clara e irregular
        perda = [new Float32Array(MS + 1), new Float32Array(MS + 1)];
        const nt = 2 + Math.floor(Math.random() * 3), cotas = Array.from({ length: nt }, () => rnd(0.5, 1.5)), soma = cotas.reduce((a, b) => a + b, 0), total = rnd(0.2, 0.3) * MS;
        const ocupado = new Uint8Array(MS + 1);
        cotas.forEach((q) => {
          const L = Math.max(4, Math.round((total * q) / soma)); let c0 = 0, tenta = 0;
          do { c0 = Math.floor(rnd(0.03, 0.97) * (MS - L)); tenta++; } while (tenta < 30 && ocupado.slice(Math.max(0, c0 - 3), c0 + L + 3).some((v) => v));
          ocupado.fill(1, c0, c0 + L + 1);
          perda.forEach((pd, lado) => {
            const pv = perfil(L + 1), alto = rnd(1.5, 4.5);
            for (let j = 0; j <= L; j++) {
              const jan = Math.pow(Math.sin((Math.PI * j) / L), 0.6); // entra e sai devagar
              pd[c0 + j] = Math.max(pd[c0 + j], jan * alto * (0.25 + 0.75 * pv[j]));
              // emulsão arrancada: a franja clara alarga até 8–10 px no meio do trecho
              franja[lado][c0 + j] = Math.max(franja[lado][c0 + j], 2 + jan * rnd(3, 8) * (0.4 + 0.6 * pv[j]));
            }
          });
        });
        // bordas externas: 2 ou 3 lados rasgados bem visíveis; amassado um pouco mais marcado
        recorte(folha, poligono(contorno(W, H, limita(W * 0.04, 8, 16), ladosRasgados(), 3), W, H));
        amassa(folha, W, H, 1.7);
      }
      // as bordas ficam a A px da borda da caixa (a caixa avança A px além do meio, para o rasgo ter onde morder)
      const ys = rasgo.map((_, j) => ((j / MS) * 100).toFixed(2));
      recorte(esq, 'polygon(0 0,' + rasgo.map((v, j) => `calc(100% - ${(A - v * A + perda[0][j]).toFixed(1)}px) ${ys[j]}%`).join(',') + ',0 100%)');
      recorte(dir, 'polygon(100% 0,100% 100%,' + rasgo.map((v, j) => `${(A + v * A - 0.7 + perda[1][j]).toFixed(1)}px ${ys[j]}%`).reverse().join(',') + ')');
      recorte(ims[0], 'polygon(0 0,' + rasgo.map((v, j) => `calc(100% - ${(A - v * A + perda[0][j] + franja[0][j]).toFixed(1)}px) ${ys[j]}%`).join(',') + ',0 100%)');
      recorte(ims[1], 'polygon(100% 0,100% 100%,' + rasgo.map((v, j) => `${(A + v * A - 0.7 + perda[1][j] + franja[1][j]).toFixed(1)}px ${ys[j]}%`).reverse().join(',') + ')');
      [esq, dir].forEach((m) => m.style.setProperty('--am-tam', `${W}px ${H}px`));
      return true;
    };
    const desenha = () => {
      if (!rasgo) recorta();
      const W = folha.clientWidth, H = folha.clientHeight, g = gap * W, meio = W / 2, ox = sombra.offsetLeft, oy = sombra.offsetTop;
      esq.style.right = `${meio + g / 2 - A}px`; dir.style.left = `${meio + g / 2 - A}px`;
      svg.setAttribute('viewBox', `0 0 ${mesa.clientWidth} ${mesa.clientHeight}`);
      // cada ponto é um X de cordinha fina (4 px): corpo cinza-bege pouco saturado com as marcas inclinadas da trança num tom mais escuro
      const corda = (x1, y1, x2, y2) => {
        const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        let marcas = '';
        for (let x = 0.5; x + 1.8 <= L + 0.5; x += 2.4) marcas += `M${x.toFixed(1)} 1.7L${(x + 1.8).toFixed(1)} -1.7`;
        // sem url(#…): só formas diretas, para não depender de referência a <pattern> (que falha em alguns navegadores)
        return `<g transform="translate(${x1} ${y1}) rotate(${a})"><rect x="-2" y="-2" width="${L + 4}" height="4" rx="2" fill="#d3cdc2" stroke="#7a756c" stroke-opacity=".55" stroke-width=".6"/><path d="${marcas}" stroke="#9a9286" stroke-width="1" fill="none"/><rect x="0" y="-1.5" width="${L}" height=".8" rx=".4" fill="#ece4d4" opacity=".3"/></g>`;
      };
      // as pontas de cada ponto ficam 8 px para dentro do rasgo, acompanhando o contorno de cada lado
      const e = (y) => ox + meio - g / 2 + dx(y) - 8, d = (y) => ox + meio + g / 2 + dx(y) + 8, Y = (y) => oy + y * H;
      svg.innerHTML = feitos.map((y) => { const a = y - 6 / H, b = y + 6 / H; return corda(e(a), Y(a), d(b), Y(b)) + corda(e(b), Y(b), d(a), Y(a)); }).join('');
    };
    const ponto = (y) => {
      if (feitos.length >= PONTOS) return;
      feitos.push(y); gap = 0.36 * (1 - feitos.length / PONTOS); desenha();
      if (feitos.length >= PONTOS) { mesa.classList.add('fechada'); ctx.feito(); }
    };
    let ini = null;
    k.ao(mesa, 'pointerdown', (e) => { mesa.setPointerCapture(e.pointerId); ini = local(e, mesa); });
    k.ao(mesa, 'pointerup', (e) => {
      if (!ini) return; const p = local(e, mesa), W = mesa.clientWidth, meio = W / 2;
      if ((ini.x - meio) * (p.x - meio) < 0 && Math.abs(p.x - ini.x) > gap * folha.clientWidth * 0.6) ponto(limita(((ini.y + p.y) / 2 - sombra.offsetTop) / folha.clientHeight, 0.05, 0.95));
      ini = null;
    });
    ctx.botao(k.T('ponto'), () => ponto(0.12 + (feitos.length / PONTOS) * 0.8));
    k.depois(20, desenha);
    k.ao(window, 'resize', () => { recorta(); desenha(); });
  };

  // 15 · Memória em camadas — mandar o de cima para o fundo até perder a ordem
  M.camadas = (ctx, k) => {
    const mesa = el('div', 'mesa camadas-mesa'); ctx.palco.appendChild(mesa);
    // recorte livre (não há um recorte definido pela artista): um trecho sorteado de cada imagem, com um pouco de zoom,
    // e uma das quatro texturas de papel dos fragmentos
    const veste = (c, s) => {
      const px = Math.round(Math.random() * 100), py = Math.round(Math.random() * 100), z = (1 + Math.random() * 0.6).toFixed(2);
      // cada folha com o seu rasgo (2 ou 3 lados, sorteados de novo quando volta com outra imagem), relevo e amassado próprios
      const f = c.querySelector('.folha'); f.className = 'folha amassa'; papel(f);
      const W = c.offsetWidth || 200, H = c.offsetHeight || 150;
      // rasgo diferente em cada folha: profundidade, passo dos dentes e largura da franja clara sorteados;
      // a imagem fica recolhida da borda rasgada, deixando a franja de papel (os lados retos vão até a borda)
      const amp = limita(W * rnd(0.025, 0.065), 5, 20), passo = rnd(2.5, 6), fr = rnd(2, 6), lados = ladosRasgados();
      const fora = [], dentro = [];
      const lado = (de, ate, pf, r) => {
        const m = Math.max(1, Math.round(Math.abs(ate - de) / passo)), v = r ? perfil(m) : null, g = r ? perfil(m) : null;
        for (let j = 0; j < m; j++) { const t = de + ((ate - de) * j) / m, d = r ? amp * (0.12 + 0.88 * v[j]) : 0; fora.push(pf(t, d)); dentro.push(pf(t, r ? d + fr * (0.35 + 0.65 * g[j]) : 0)); }
      };
      lado(0, W, (x, d) => [x, d], lados.has('t')); lado(0, H, (y, d) => [W - d, y], lados.has('r'));
      lado(W, 0, (x, d) => [x, H - d], lados.has('b')); lado(H, 0, (y, d) => [d, y], lados.has('l'));
      recorte(f, poligono(fora, W, H)); recorte(c.querySelector('.folha-img'), poligono(dentro, W, H)); amassa(f, W, H);
      const im = c.querySelector('img'); im.src = ctx.src(s);
      im.style.cssText = `object-position:${px}% ${py}%;transform:scale(${z});transform-origin:${px}% ${py}%`;
    };
    // as imagens não se repetem: cada camada que desce ao fundo volta com uma imagem nova, tirada de um baralho com
    // todos os fragmentos e páginas de diário; só quando o baralho acaba ele é embaralhado de novo
    const todas = ctx.todas && ctx.todas.length > 3 ? ctx.todas : ctx.vizinhos;
    let baralho = [];
    const proxima = (fora) => {
      if (!baralho.length) baralho = todas.filter((s) => !fora.includes(s)).sort(() => Math.random() - 0.5);
      return baralho.pop();
    };
    // as três primeiras também são sorteadas do baralho (antes eram fixas por fragmento)
    const atuais = todas.length > 3 ? [...todas].sort(() => Math.random() - 0.5).slice(0, 3) : [...ctx.vizinhos];
    const cs = atuais.map((s, i) => {
      const c = el('button', 'camada'); c.type = 'button'; c.innerHTML = `<span class="folha"><span class="folha-img"><img alt=""></span><i>${i + 1}</i></span>`;
      mesa.appendChild(c); veste(c, s); return c;
    });
    baralho = todas.filter((s) => !atuais.includes(s)).sort(() => Math.random() - 0.5);
    let ordem = [0, 1, 2], voltas = 0; const LIMITE = 9;
    const arruma = () => {
      const p = Math.min(1, voltas / LIMITE);
      ordem.forEach((ci, pos) => {
        const c = cs[ci];
        c.style.zIndex = 3 - pos;
        c.style.transform = `translate(${(pos - 1) * 34 * (1 - p)}px, ${pos * 14 * (1 - p)}px) rotate(${(pos - 1) * 5 * (1 - p)}deg)`;
        c.style.opacity = pos === 0 ? 1 : 0.55 + 0.45 * p;
        c.querySelector('i').style.opacity = 1 - p;
        c.setAttribute('aria-label', `${k.T('fundo')}`); c.disabled = pos !== 0;
      });
      mesa.classList.toggle('misturada', p >= 1);
      if (p >= 1) ctx.feito();
    };
    const fundo = () => {
      if (voltas >= LIMITE) return;
      const desce = ordem.shift(); ordem.push(desce); voltas++;
      const nova = proxima(atuais); atuais[desce] = nova; veste(cs[desce], nova);
      arruma(); const topo = cs[ordem[0]]; if (document.activeElement && document.activeElement.classList.contains('camada')) topo.focus(); };
    k.ao(mesa, 'click', (e) => { if (e.target.closest('.camada')) fundo(); });
    arruma();
  };

  // 16 · Calendário desfeito — somar os algarismos até restar um, e soltá-lo
  M.calendario = (ctx, k) => {
    k.pergunta({ rotulo: k.T('data'), padrao: k.hoje(), data: true, ok(v, f) {
      const d = k.lerData(v); if (!d) { f.querySelector('label').textContent = k.T('dataInvalida'); return; }
      f.remove();
      let atual = d.join('');
      const visor = el('div', 'calc-visor digitos', d.join('/').split('').map((c) => (c === '/' ? '<i>/</i>' : `<span>${c}</span>`)).join(''));
      const fita = el('ol', 'calc-fita');
      const bSoma = el('button', 'botao', k.T('somaDig')); bSoma.type = 'button';
      const bVai = el('button', 'botao', k.T('deixar')); bVai.type = 'button'; bVai.hidden = true;
      bSoma.addEventListener('click', () => {
        const ds = atual.split('').map(Number), s = ds.reduce((a, b) => a + b, 0);
        fita.insertAdjacentHTML('beforeend', `<li>${ds.join(' + ')} = <b>${s}</b></li>`);
        atual = String(s); visor.innerHTML = atual.split('').map((c) => `<span>${c}</span>`).join('');
        if (atual.length === 1) { bSoma.hidden = true; bVai.hidden = false; bVai.focus(); }
      });
      bVai.addEventListener('click', () => { visor.classList.add('solta'); bVai.disabled = true; k.depois(ctx.reduz ? 0 : 1600, () => ctx.feito()); });
      const linha = el('div', 'ex-linha centro'); linha.append(bSoma, bVai);
      ctx.palco.append(visor, linha, fita);
    } });
  };

  return (tipo, ctx) => {
    const k = montador(ctx);
    ctx.palco.classList.add('tipo-' + tipo);
    (M[tipo] || M.nevoa)(ctx, k);
    return () => k.desl.forEach((f) => { try { f(); } catch {} });
  };
})();
