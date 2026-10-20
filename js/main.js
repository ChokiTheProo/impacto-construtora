/* =========================================================
   Impacto Construtora — interações do site
   ========================================================= */

/* ---------- DADOS DA EMPRESA: edite aqui ---------- */
const CONFIG = {
  whatsapp: '5514998580746',          // DDI 55 + DDD + número, só números
  telefone: '(14) 99858-0746',        // como o número aparece escrito no site
  instagram: 'https://www.instagram.com/grupoimpact0/',
  facebook: 'https://www.facebook.com/share/1F5WLjmFJS/?mibextid=wwXIfr',
  mensagemPadrao: 'Olá! Vim pelo site da Impacto Construtora.',
};

const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.mensagemPadrao)}`;

const openExternal = (a, url) => {
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
};

/* ---------- Links e dados ---------- */
document.querySelectorAll('[data-wa]').forEach((a) => openExternal(a, waLink(a.dataset.wa)));
document.querySelectorAll('[data-instagram]').forEach((a) => openExternal(a, CONFIG.instagram));
document.querySelectorAll('[data-facebook]').forEach((a) => openExternal(a, CONFIG.facebook));
document.querySelectorAll('[data-phone-text]').forEach((el) => { el.textContent = CONFIG.telefone; });
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ---------- Cabeçalho ---------- */
const header = document.querySelector('[data-header]');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Menu no celular ---------- */
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  header.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuToggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  document.body.style.overflow = open ? 'hidden' : '';
};

menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

/* ---------- Vídeo do topo ---------- */
const video = document.querySelector('[data-hero-video]');
const videoToggle = document.querySelector('[data-video-toggle]');

if (video && videoToggle) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || {};
  const slowConnection = connection.saveData || /(^|-)2g$/.test(connection.effectiveType || '');
  let pausedByUser = reduceMotion;
  let inView = true;

  const syncButton = () => {
    const paused = video.paused;
    videoToggle.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
    videoToggle.querySelector('use').setAttribute('href', paused ? '#i-play' : '#i-pause');
  };

  const tryPlay = () => {
    if (!pausedByUser && inView) video.play().catch(() => {});
  };

  // O vídeo só é baixado depois que a página terminou de carregar,
  // para não atrasar a foto do topo e os textos.
  const loadVideo = () => {
    video.muted = true;
    video.preload = reduceMotion ? 'metadata' : 'auto';
    video.src = video.dataset.src;
    tryPlay();
  };

  // O botão e o vídeo só aparecem quando existe um arquivo de verdade em assets/video/hero.mp4
  video.addEventListener('loadeddata', () => { videoToggle.hidden = false; syncButton(); });
  video.addEventListener('playing', () => video.classList.add('is-playing'));
  video.addEventListener('play', syncButton);
  video.addEventListener('pause', syncButton);

  videoToggle.addEventListener('click', () => {
    pausedByUser = !video.paused;
    if (pausedByUser) video.pause();
    else tryPlay();
  });

  // Pausa o vídeo quando ele sai da tela (economiza bateria e dados)
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) video.pause();
    else if (video.src) tryPlay();
  }).observe(video);

  if (!slowConnection && video.dataset.src) {
    if (document.readyState === 'complete') loadVideo();
    else window.addEventListener('load', loadVideo, { once: true });
  }
}

/* ---------- Depoimentos ---------- */
const slider = document.querySelector('[data-slider]');

if (slider) {
  const slides = [...slider.querySelectorAll('[data-slide]')];
  const count = slider.querySelector('[data-count]');
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    count.textContent = `${current + 1} / ${slides.length}`;
  };

  slider.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
  slider.querySelector('[data-next]').addEventListener('click', () => show(current + 1));

  let touchX = null;
  slider.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  show(0);
}

/* ---------- Animação ao rolar ---------- */
const reveals = document.querySelectorAll('.reveal');

reveals.forEach((el) => {
  const index = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = `${(index % 4) * 80}ms`;
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Formulário de simulação ---------- */
const form = document.querySelector('[data-form]');

if (form) {
  const phoneInput = form.querySelector('[data-phone]');

  const formatPhone = (value) => {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  phoneInput.addEventListener('input', () => { phoneInput.value = formatPhone(phoneInput.value); });

  const rules = {
    nome: (v) => (v.trim().length >= 3 ? '' : 'Digite seu nome.'),
    whatsapp: (v) => ([10, 11].includes(v.replace(/\D/g, '').length) ? '' : 'Digite um WhatsApp com DDD. Ex.: (11) 98765-4321'),
    cidade: (v) => (v.trim().length >= 2 ? '' : 'Digite sua cidade.'),
    renda: (v) => (v ? '' : 'Selecione a renda da família.'),
  };

  const setError = (input, message) => {
    const field = input.closest('.field');
    const error = field.querySelector('.field__error');
    field.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
  };

  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    const event = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(event, () => {
      if (input.closest('.field').classList.contains('has-error')) setError(input, rules[name](input.value));
    });
    input.addEventListener('blur', () => { if (input.value) setError(input, rules[name](input.value)); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.entries(rules).forEach(([name, check]) => {
      const input = form.elements[name];
      const message = check(input.value);
      setError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const message = [
      'Olá! Quero fazer uma simulação do Minha Casa Minha Vida.',
      '',
      `*Nome:* ${data.get('nome').trim()}`,
      `*WhatsApp:* ${data.get('whatsapp')}`,
      `*Cidade:* ${data.get('cidade').trim()}`,
      `*Renda familiar:* ${data.get('renda')}`,
      `*Já tem terreno:* ${data.get('terreno')}`,
      `*3 anos ou mais de FGTS:* ${data.get('fgts')}`,
    ].join('\n');

    const url = waLink(message);
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;

    form.querySelector('.form__hint').textContent = 'Pronto! Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar.';
  });
}
