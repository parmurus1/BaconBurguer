(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Horário: está aberto agora? (hora de São Paulo) ---------- */

  // minutos desde 00:00; segunda (1) fechado
  const HORARIO = {
    0: [16 * 60, 23 * 60 + 45],
    2: [16 * 60, 22 * 60 + 45],
    3: [16 * 60, 22 * 60 + 45],
    4: [16 * 60, 22 * 60 + 45],
    5: [16 * 60, 23 * 60 + 45],
    6: [16 * 60, 23 * 60 + 45],
  };
  const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const DIA_IDX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const hora = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
  };

  function agoraEmSP() {
    const partes = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => partes.find((p) => p.type === t)?.value;
    return { dia: DIA_IDX[get("weekday")], min: Number(get("hour")) * 60 + Number(get("minute")) };
  }

  function status() {
    const { dia, min } = agoraEmSP();
    const hoje = HORARIO[dia];
    if (hoje && min >= hoje[0] && min < hoje[1]) {
      if (hoje[1] - min <= 30) {
        return { aberto: true, ultimos: true, dia, detalhe: `fecha ${hora(hoje[1])}`, frase: `Últimos pedidos! Fecha às ${hora(hoje[1])}.` };
      }
      return { aberto: true, dia, detalhe: `até ${hora(hoje[1])}`, frase: `Aberto agora, até ${hora(hoje[1])}.` };
    }
    if (hoje && min < hoje[0]) {
      return { aberto: false, dia, detalhe: `abre ${hora(hoje[0])}`, frase: `Fechado agora. Hoje abre às ${hora(hoje[0])}.` };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7;
      if (HORARIO[d]) {
        const quando = i === 1 ? "amanhã" : DIAS[d];
        return { aberto: false, dia, detalhe: `abre ${quando} ${hora(HORARIO[d][0])}`, frase: `Fechado agora. Abre ${quando} às ${hora(HORARIO[d][0])}.` };
      }
    }
    return null;
  }

  function aplicaStatus() {
    let s;
    try { s = status(); } catch { s = null; }
    if (!s) return;

    const placa = document.querySelector("[data-status]");
    if (placa) {
      const estadoAntes = placa.dataset.state;
      placa.dataset.state = s.ultimos ? "ultimos" : s.aberto ? "aberto" : "fechado";
      placa.querySelector("[data-status-label]").textContent = s.ultimos ? "Últimos pedidos" : s.aberto ? "Aberto" : "Fechado";
      placa.querySelector("[data-status-detail]").textContent = s.detalhe;
      placa.setAttribute("aria-label", `${s.frase} Ver horário e endereço`);
      if (!reduzMovimento && estadoAntes !== placa.dataset.state) {
        placa.classList.remove("is-balancando");
        void placa.offsetWidth;
        placa.classList.add("is-balancando");
      }
    }

    document.querySelectorAll("[data-dias]").forEach((linha) => {
      const dias = linha.dataset.dias.split(" ").map(Number);
      linha.toggleAttribute("data-hoje", dias.includes(s.dia));
    });

    const hojeTexto = document.querySelector("[data-today]");
    if (hojeTexto) {
      hojeTexto.textContent = s.frase;
      hojeTexto.hidden = false;
    }
  }

  aplicaStatus();
  setInterval(aplicaStatus, 60 * 1000);

  /* ---------- Cartazes sendo colados na parede ---------- */

  const temObserver = "IntersectionObserver" in window;

  function terminaColagem(el, i) {
    setTimeout(() => {
      el.classList.remove("colou");
      el.style.removeProperty("--i");
    }, 1400 + i * 90);
  }

  function cola(el, i) {
    el.style.setProperty("--i", i);
    el.classList.add("colou");
    el.classList.remove("vai-colar");
    terminaColagem(el, i);
  }

  const obsColagem = temObserver
    ? new IntersectionObserver((entradas) => {
        entradas.filter((e) => e.isIntersecting).forEach((e, i) => {
          obsColagem.unobserve(e.target);
          cola(e.target, i);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 })
    : null;

  // cola de novo um grupo de cartazes (ao trocar de aba)
  function recola(cartazes) {
    if (!temObserver) return;
    cartazes.forEach((el) => {
      el.classList.remove("colou");
      el.classList.add("vai-colar");
    });
    void document.body.offsetWidth;
    cartazes.forEach((el) => obsColagem.observe(el));
  }

  /* ---------- Abas do cardápio ---------- */

  const abas = [...document.querySelectorAll("[data-aba]")];
  const paineis = [...document.querySelectorAll("[data-painel]")];

  function mostraAba(nome, { foco = false, colar = true } = {}) {
    abas.forEach((aba) => {
      const ativa = aba.dataset.aba === nome;
      aba.setAttribute("aria-selected", String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
      if (ativa && foco) aba.focus();
    });
    paineis.forEach((painel) => {
      const ativo = painel.dataset.painel === nome;
      painel.hidden = !ativo;
      if (ativo) {
        const mural = painel.querySelector(".mural");
        if (mural) mural.scrollLeft = 0;
        if (colar) recola([...painel.querySelectorAll(".mural > .cartaz")]);
      }
    });
  }

  if (abas.length && paineis.length) {
    mostraAba("lanches", { colar: false });
    abas.forEach((aba, i) => {
      aba.addEventListener("click", () => mostraAba(aba.dataset.aba));
      aba.addEventListener("keydown", (e) => {
        const passo = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (e.key === "Home" || e.key === "End" || passo) {
          e.preventDefault();
          const destino = e.key === "Home" ? 0 : e.key === "End" ? abas.length - 1 : (i + passo + abas.length) % abas.length;
          mostraAba(abas[destino].dataset.aba, { foco: true });
        }
      });
    });
  }

  /* cartazes abaixo da dobra esperam a pessoa chegar neles; os de uma fileira
     de arrastar (celular) colam conforme vão entrando na tela */
  if (temObserver) {
    const alturaTela = window.innerHeight;
    const larguraTela = window.innerWidth;
    document.querySelectorAll(".mural > .cartaz, .casa__grade > *, .onde__grade > *").forEach((el) => {
      if (el.closest("[hidden]")) return;
      const r = el.getBoundingClientRect();
      if (r.top > alturaTela * 0.92 || r.left > larguraTela) {
        el.classList.add("vai-colar");
        obsColagem.observe(el);
      }
    });
  }

  /* ---------- Deixa o porco escolher ---------- */

  const botaoSorteio = document.querySelector("[data-sorteio]");
  const msgSorteio = document.querySelector("[data-sorteio-msg]");
  let ultimoEscolhido = null;

  if (botaoSorteio) {
    botaoSorteio.addEventListener("click", () => {
      if (botaoSorteio.classList.contains("is-sorteando")) return;
      const opcoes = [...document.querySelectorAll(".mural > .oferta:not(.oferta--salao)")].filter((el) => el !== ultimoEscolhido);
      const escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];
      if (!escolhido) return;

      document.querySelectorAll(".oferta.is-escolhido").forEach((el) => el.classList.remove("is-escolhido"));
      botaoSorteio.classList.add("is-sorteando");
      botaoSorteio.setAttribute("aria-busy", "true");

      setTimeout(() => {
        botaoSorteio.classList.remove("is-sorteando");
        botaoSorteio.removeAttribute("aria-busy");
        const painel = escolhido.closest("[data-painel]");
        if (painel && painel.hidden) mostraAba(painel.dataset.painel, { colar: false });
        escolhido.classList.remove("vai-colar");
        escolhido.scrollIntoView({ behavior: reduzMovimento ? "auto" : "smooth", block: "center", inline: "center" });
        escolhido.classList.add("is-escolhido");
        ultimoEscolhido = escolhido;
        if (msgSorteio) msgSorteio.textContent = `O porco escolheu: ${escolhido.dataset.nome}.`;
      }, reduzMovimento ? 0 : 750);
    });
  }

  /* ---------- Easter egg: 5 cliques no porco ---------- */

  const porcos = document.querySelectorAll("[data-porco]");
  let cliquesPorco = 0;
  let timerPorco = null;
  let chovendo = false;

  function oinc(origem) {
    const r = origem.getBoundingClientRect();
    const balao = document.createElement("div");
    balao.className = "oinc";
    balao.textContent = "OINC!";
    balao.setAttribute("aria-hidden", "true");
    balao.style.left = `${Math.min(window.innerWidth - 150, Math.max(12, r.left + r.width * 0.55))}px`;
    balao.style.top = `${Math.max(12, r.top - 64)}px`;
    document.body.appendChild(balao);
    setTimeout(() => balao.remove(), 2200);
  }

  function chuvaDeBacon() {
    if (chovendo || reduzMovimento || !Element.prototype.animate) return;
    chovendo = true;
    const ceu = document.createElement("div");
    ceu.className = "chuva-bacon";
    ceu.setAttribute("aria-hidden", "true");
    document.body.appendChild(ceu);
    const total = window.innerWidth < 640 ? 22 : 38;
    let restantes = total;
    for (let i = 0; i < total; i++) {
      const tira = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tira.setAttribute("viewBox", "0 0 120 34");
      tira.innerHTML = '<use href="#bacon"/>';
      const largura = 70 + Math.random() * 70;
      tira.style.width = `${largura}px`;
      tira.style.left = `${Math.random() * 100}%`;
      ceu.appendChild(tira);
      const giro = (Math.random() * 2 - 1) * 540;
      const deriva = (Math.random() * 2 - 1) * 120;
      const anim = tira.animate([
        { transform: `translate(-50%, -60px) rotate(${Math.random() * 90 - 45}deg)` },
        { transform: `translate(calc(-50% + ${deriva}px), ${window.innerHeight + 80}px) rotate(${giro}deg)` },
      ], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 700, easing: "cubic-bezier(.3,.1,.7,1)", fill: "both" });
      anim.onfinish = () => {
        tira.remove();
        if (--restantes === 0) { ceu.remove(); chovendo = false; }
      };
    }
  }

  porcos.forEach((porco) => {
    porco.addEventListener("click", () => {
      cliquesPorco += 1;
      porco.classList.remove("is-cutucado");
      void porco.getBoundingClientRect();
      porco.classList.add("is-cutucado");
      clearTimeout(timerPorco);
      timerPorco = setTimeout(() => { cliquesPorco = 0; }, 1800);
      if (cliquesPorco >= 5) {
        cliquesPorco = 0;
        oinc(porco);
        chuvaDeBacon();
      }
    });
  });

  /* ---------- Barra de pedido no celular ---------- */

  const barra = document.querySelector("[data-order-bar]");
  const acoesAbertura = document.querySelector("[data-hero-actions]");
  const fome = document.querySelector(".fome__acoes");

  if (barra && acoesAbertura && "IntersectionObserver" in window) {
    const vis = new Map();
    const atualiza = () => {
      const algumVisivel = [...vis.values()].some(Boolean);
      barra.classList.toggle("is-visivel", !algumVisivel && window.scrollY > 200);
    };
    const obsBarra = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => vis.set(e.target, e.isIntersecting));
      atualiza();
    });
    obsBarra.observe(acoesAbertura);
    if (fome) obsBarra.observe(fome);
    window.addEventListener("scroll", atualiza, { passive: true });
  }

  /* ---------- Ano no rodapé ---------- */

  const ano = document.querySelector("[data-year]");
  if (ano) ano.textContent = new Date().getFullYear();
})();
