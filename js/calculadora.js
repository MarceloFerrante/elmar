// Calculadora do exercício "Dissolver". Uma calculadora comum, com uma fita
// em que as contas antigas vão desbotando. Nada é guardado.

const Calculadora = (() => {
  const TECLAS = [
    ["C", "limpar"], ["⌫", "apagar"], ["÷", "op"], ["×", "op"],
    ["7"], ["8"], ["9"], ["−", "op"],
    ["4"], ["5"], ["6"], ["+", "op"],
    ["1"], ["2"], ["3"], ["=", "igual"],
    ["0", "zero-larga"], [",", "virgula"]
  ];
  const MAX_DIGITOS = 12;
  const MAX_FITA = 6;
  let naoFechaTexto = "não fecha";

  function formatar(n) {
    if (!isFinite(n)) return naoFechaTexto;
    let s = String(Number(n.toPrecision(MAX_DIGITOS)));
    if (s.replace(/[-.]/g, "").length > MAX_DIGITOS) s = n.toExponential(6);
    return s.replace(".", ",");
  }

  function calcular(a, op, b) {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return a / b;
    }
    return b;
  }

  function montar(alvo, { aoZerar, aoLimpar, naoFecha, rotuloFita = "Contas anteriores" } = {}) {
    if (naoFecha) naoFechaTexto = naoFecha;
    alvo.innerHTML = `
      <div class="calc">
        <ol class="calc-fita" aria-label="${rotuloFita}"></ol>
        <output class="calc-visor" aria-live="polite">0</output>
        <div class="calc-teclas">
          ${TECLAS.map(([t, tipo]) =>
            `<button type="button" class="tecla ${tipo || "num"}" data-t="${t}">${t}</button>`).join("")}
        </div>
      </div>`;

    const calc = alvo.querySelector(".calc");
    const fita = alvo.querySelector(".calc-fita");
    const visor = alvo.querySelector(".calc-visor");

    let entrada = "0";      // o que está sendo digitado (com ponto decimal)
    let acumulado = null;   // valor guardado antes da operação
    let operacao = null;
    let novoNumero = false; // a próxima tecla começa um número novo
    let houveConta = false;
    let zerado = false;

    function atualizar() {
      visor.textContent = entrada.replace(".", ",");
    }

    function anotar(linha) {
      const li = document.createElement("li");
      li.textContent = linha;
      fita.appendChild(li);
      while (fita.children.length > MAX_FITA) fita.firstChild.remove();
      // as contas mais antigas desbotam
      [...fita.children].reverse().forEach((el, i) => {
        el.style.opacity = Math.max(0.08, 1 - i * 0.2);
      });
    }

    function resolver() {
      if (operacao === null || acumulado === null) return;
      const b = parseFloat(entrada);
      const r = calcular(acumulado, operacao, b);
      anotar(`${formatar(acumulado)} ${operacao} ${formatar(b)} = ${formatar(r)}`);
      entrada = isFinite(r) ? String(Number(r.toPrecision(MAX_DIGITOS))) : "0";
      acumulado = null;
      operacao = null;
      novoNumero = true;
      houveConta = true;
      atualizar();
      if (!isFinite(r)) visor.textContent = formatar(r);
      if (r === 0 && houveConta) chegarAoZero();
    }

    function chegarAoZero() {
      zerado = true;
      calc.classList.add("zerada");
      aoZerar && aoZerar();
    }

    function sairDoZero() {
      if (!zerado) return;
      zerado = false;
      calc.classList.remove("zerada");
    }

    function limpar() {
      const eraZero = zerado;
      sairDoZero();
      entrada = "0"; acumulado = null; operacao = null; novoNumero = false;
      if (eraZero) {
        calc.classList.add("dissolvendo");
        setTimeout(() => {
          fita.innerHTML = "";
          calc.classList.remove("dissolvendo");
          houveConta = false;
          atualizar();
        }, 2400);
        aoLimpar && aoLimpar();
      } else {
        atualizar();
      }
    }

    function tecla(t) {
      if (t === "C") return limpar();
      if (zerado) sairDoZero();

      if (/^\d$/.test(t)) {
        if (novoNumero || entrada === "0") entrada = t;
        else if (entrada.replace(/[-.]/g, "").length < MAX_DIGITOS) entrada += t;
        novoNumero = false;
      } else if (t === ",") {
        if (novoNumero) { entrada = "0."; novoNumero = false; }
        else if (!entrada.includes(".")) entrada += ".";
      } else if (t === "⌫") {
        if (novoNumero) return;
        entrada = entrada.length > 1 ? entrada.slice(0, -1) : "0";
        if (entrada === "-") entrada = "0";
      } else if (t === "=") {
        return resolver();
      } else {
        // operação: encadeia se já havia uma pendente
        if (operacao !== null && !novoNumero) resolver();
        acumulado = parseFloat(entrada);
        operacao = t;
        novoNumero = true;
        visor.textContent = `${formatar(acumulado)} ${t}`;
        return;
      }
      atualizar();
    }

    alvo.addEventListener("click", ev => {
      const b = ev.target.closest(".tecla");
      if (b) tecla(b.dataset.t);
    });

    // teclado físico
    const mapa = { "/": "÷", "*": "×", "x": "×", "-": "−", "+": "+", "Enter": "=", "=": "=",
      "Backspace": "⌫", "Escape": "C", "Delete": "C", ",": ",", ".": "," };
    function aoTeclar(ev) {
      if (!document.body.contains(alvo)) {
        document.removeEventListener("keydown", aoTeclar);
        return;
      }
      if (ev.target.closest && ev.target.closest("input, textarea")) return;
      if (ev.key === "Enter" && ev.target.closest && ev.target.closest("button, a")) return;
      const t = /^\d$/.test(ev.key) ? ev.key : mapa[ev.key];
      if (!t) return;
      ev.preventDefault();
      tecla(t);
    }
    document.addEventListener("keydown", aoTeclar);
  }

  return { montar };
})();
