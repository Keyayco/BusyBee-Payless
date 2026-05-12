/* ============================================================
   Busy Bee Payless Laundry — Vanilla JS Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const back = document.getElementById('backTop');
    if (window.scrollY > 600) back.classList.add('show');
    else back.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- Back to top ---------- */
  document.getElementById('backTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
    io.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const counterIO = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const dur = 1600;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.counter').forEach(c => counterIO.observe(c));

  /* ---------- Hero particles ---------- */
  const particles = document.getElementById('particles');
  const COUNT = window.innerWidth < 720 ? 14 : 28;
  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement('span');
    const size = 2 + Math.random() * 5;
    s.style.width = s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = 8 + Math.random() * 14 + 's';
    s.style.animationDelay = -Math.random() * 18 + 's';
    s.style.opacity = (0.2 + Math.random() * 0.5).toString();
    particles.appendChild(s);
  }

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => (btn.style.transform = ''));
  });

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const step = () => track.firstElementChild.getBoundingClientRect().width + 22;
  document
    .getElementById('tNext')
    .addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  document
    .getElementById('tPrev')
    .addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));

  let autoplay = setInterval(() => {
    if (
      track.scrollLeft + track.clientWidth >=
      track.scrollWidth - 10
    ) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    }
  }, 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoplay));

  /* ---------- Hero parallax ---------- */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight && heroBg) {
        heroBg.style.transform = `scale(1.1) translateY(${y * 0.25}px)`;
      }
    },
    { passive: true }
  );

  /* ---------- Smooth anchor scroll (offset for nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          const top = t.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Contact form ---------- */
  window.bbSubmit = function () {
    const f = document.getElementById('contactForm');
    const data = Object.fromEntries(new FormData(f).entries());
    const msg = encodeURIComponent(
      `Hi Busy Bee! I'd like to book ${data.service}.\nName: ${data.name}\nPhone: ${data.phone}\nMessage: ${data.message || '-'}`
    );
    window.open(`https://wa.me/27660000876?text=${msg}`, '_blank');
    document.getElementById('formNote').textContent =
      '✓ Opening WhatsApp — we will respond shortly.';
    f.reset();
  };
})();
