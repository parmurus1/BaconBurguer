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
      placa.dataset.state = s.aberto ? "aberto" : "fechado";
      placa.querySelector("[data-status-label]").textContent = s.aberto ? "Aberto" : "Fechado";
      placa.querySelector("[data-status-detail]").textContent = s.detalhe;
      placa.setAttribute("aria-label", `${s.frase} Ver horário e endereço`);
      if (!reduzMovimento) {
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

  const colaveis = document.querySelectorAll(".mural > .cartaz, .casa__grade > *, .onde__grade > *");

  if (!reduzMovimento && "IntersectionObserver" in window) {
    const alturaTela = window.innerHeight;
    const pendentes = [];

    colaveis.forEach((el) => {
      // só esconde o que ainda está abaixo da dobra: o que já está à vista fica à vista
      if (el.getBoundingClientRect().top > alturaTela * 0.92) {
        el.classList.add("vai-colar");
        pendentes.push(el);
      }
    });

    const obs = new IntersectionObserver((entradas) => {
      const visiveis = entradas.filter((e) => e.isIntersecting);
      visiveis.forEach((e, i) => {
        const el = e.target;
        el.style.setProperty("--i", i);
        el.classList.add("colou");
        el.classList.remove("vai-colar");
        obs.unobserve(el);
        setTimeout(() => {
          el.classList.remove("colou");
          el.style.removeProperty("--i");
        }, 1400 + i * 90);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    pendentes.forEach((el) => obs.observe(el));
  }

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
