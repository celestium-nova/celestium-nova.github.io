console.log("Hey fellow developer & visitor! Welcome to our official website.");
console.log("Source code (licensed under GNU AGPL v3.0) : https://github.com/celestium-nova/celestium-nova.github.io | Feel free to explore! Don't forget to star our repo & give us a follow :)");

/* ── LOADER ── */
const loader = document.getElementById('loader');
const pct = document.getElementById('loaderPct');
let p = 0;
const inc = setInterval(() => {
  p = Math.min(p + Math.random() * 12, 100);
  pct.textContent = Math.floor(p) + '%';
  if (p >= 100) {
    clearInterval(inc);
    pct.textContent = '100%';
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => loader.style.display = 'none', 700);
    }, 300);
  }
}, 80);

/* ── CURSOR ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('hover'); });
});
(function animCur() {
  cur.style.left  = mx + 'px'; cur.style.top  = my + 'px';
  rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCur);
})();

/* ── SCROLL PROGRESS BAR ── */
const progBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const tot = document.body.scrollHeight - window.innerHeight;
  progBar.style.width = (window.scrollY / tot * 100) + '%';
}, { passive: true });

/* ── STARFIELD ── */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let W, H, stars = [], scrollY = 0;
function initStars() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  stars = Array.from({ length: 380 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.6 + 0.2,
    a: Math.random(), da: (Math.random() - 0.5) * 0.006,
    dx: (Math.random() - 0.5) * 0.05,
    blue: Math.random() > 0.7,
  }));
}
window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
(function draw() {
  ctx.clearRect(0, 0, W, H);
  const par = scrollY * 0.07;
  stars.forEach(s => {
    s.a += s.da;
    if (s.a <= 0.05 || s.a >= 1) s.da = -s.da;
    s.x += s.dx;
    if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
    const y = ((s.y - par % H) + H) % H;
    ctx.beginPath();
    ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
    const col = s.blue ? `180,210,255` : `210,220,240`;
    ctx.fillStyle = `rgba(${col},${s.a.toFixed(2)})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
})();
window.addEventListener('resize', initStars);
initStars();

/* ── SHOOTING STARS ── */
function shootingStar() {
  const sx = Math.random() * W * 0.8, sy = Math.random() * H * 0.4;
  const len = 100 + Math.random() * 160;
  const ang = Math.PI / 6 + (Math.random() - 0.5) * 0.4;
  let t = 0;
  (function draw() {
    if (t > 1) return;
    const x1 = sx + Math.cos(ang) * t * len;
    const y1 = sy + Math.sin(ang) * t * len;
    const x2 = x1 + Math.cos(ang) * len * 0.18;
    const y2 = y1 + Math.sin(ang) * len * 0.18;
    ctx.save();
    ctx.globalAlpha = (1 - t) * 0.75;
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, 'rgba(200,240,255,0)');
    g.addColorStop(1, 'rgba(200,240,255,0.9)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke(); ctx.restore();
    t += 0.035;
    requestAnimationFrame(draw);
  })();
}
setInterval(() => { if (Math.random() > 0.2) shootingStar(); }, 1200);

/* ── WORD CYCLE ── */
const words = ['Cosmic', 'Frontier', 'Orbital', 'Stellar', 'Boundless'];
let wi = 0;
const wc = document.getElementById('wordCycle');
setInterval(() => {
  wi = (wi + 1) % words.length;
  wc.style.opacity = '0';
  wc.style.transform = 'translateY(-12px)';
  setTimeout(() => {
    wc.textContent = words[wi];
    wc.style.transition = 'opacity 0.5s, transform 0.5s';
    wc.style.opacity = '1';
    wc.style.transform = 'translateY(0)';
  }, 400);
}, 2600);
wc.style.transition = 'opacity 0.5s, transform 0.5s';

/* ── 3D TILT PROGRAM CARDS ── */
document.querySelectorAll('.program-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2)  / (r.width  / 2);
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.35s, box-shadow 0.35s';
    setTimeout(() => card.style.transition = '', 500);
  });
});

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('menu-overlay').classList.toggle('open', menuOpen);
  document.getElementById('hamburger').classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  // keep nav on top
  document.getElementById('main-nav').style.zIndex = menuOpen ? '200' : '200';
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.counter').forEach(animCounter);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item, .tl-item').forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animCounter(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseInt(el.dataset.target);
  const start  = parseInt(el.textContent) || 0;
  const t0 = performance.now();
  const dur = 1800;
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(start + (target - start) * e);
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}

/* ── NAV SCROLL CLASSES ── */
const nav = document.getElementById('main-nav');
const navAnchors = document.querySelectorAll('.nav-links a');
const allSects = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  // back-to-top
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);
  // active nav
  let cur = '';
  allSects.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ── TOAST ── */
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4500);
}

/* ── MOBILE MENU ── */
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('menu-overlay').classList.toggle('open', menuOpen);
  document.getElementById('hamburger').classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}
function closeMenu(el) {
  toggleMenu();
  setTimeout(() => document.querySelector(el.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }), 350);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(); });

/* ── SMOOTH SCROLL ALL ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});