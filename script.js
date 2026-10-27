/* =====================================================================
   SOLUTION TECH — script.js
   ---------------------------------------------------------------------
   Ce fichier gère le fonctionnement du site.
   >>> Pour publier ou modifier une actualité, ouvrez actualites-config.js
   ===================================================================== */

// La liste des actualités se trouve dans actualites-config.js
const NEWS = typeof ACTUALITES !== "undefined" ? ACTUALITES : [];

const WHATSAPP = "2250173312660";

/* ---------- Outils ---------- */
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const formatDate = d => {
  const date = new Date(d + "T00:00:00");
  return isNaN(date) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

// Si aucun lien de vente n'est renseigné, le bouton ouvre WhatsApp avec un message prêt.
const buyLink = item => {
  if (item.lien && item.lien.trim() && item.lien.trim() !== "#") return item.lien.trim();
  const msg = `Bonjour Solution Tech,\n\nJe suis intéressé(e) par : ${item.titre}.\nComment puis-je m'inscrire ?`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
};

const imgTag = (item, cls) =>
  `<img class="${cls}" src="${esc(item.image)}" alt="${esc(item.titre)}" loading="lazy" onerror="this.parentElement.classList.add('no-img');this.remove();">`;

const pointsList = pts =>
  pts && pts.length ? `<ul class="check-list">${pts.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : "";

const sorted = () => [...NEWS].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

/* ---------- Bandeau « À la une » (accueil) ---------- */
const featuredEl = document.getElementById("a-la-une");
if (featuredEl) {
  const item = sorted().find(a => a.aLaUne);
  if (!item) {
    featuredEl.remove();
  } else {
    featuredEl.innerHTML = `
      <div class="featured-card">
        <div class="featured-media">
          ${imgTag(item, "featured-img")}
          <span class="badge">Nouveau</span>
        </div>
        <div class="featured-body">
          <p class="eyebrow-tag"><span class="pulse"></span> À la une · ${esc(item.categorie)}</p>
          <h2>${esc(item.titre)}</h2>
          <p class="featured-text">${esc(item.resume)}</p>
          ${pointsList(item.points)}
          <div class="featured-buy">
            ${item.prix ? `<div class="price"><span>Prix</span><strong>${esc(item.prix)}</strong></div>` : ""}
            <a class="btn primary btn-lg" href="${esc(buyLink(item))}" target="_blank" rel="noopener noreferrer">${esc(item.bouton || "Acheter maintenant")} →</a>
          </div>
          <a class="text-link" href="actualites.html">Voir toutes les actualités</a>
        </div>
      </div>`;
  }
}

/* ---------- Page Actualités ---------- */
const newsGrid = document.getElementById("news-grid");
if (newsGrid) {
  const items = sorted();
  newsGrid.innerHTML = items.length
    ? items.map(item => `
      <article class="news-card reveal">
        <div class="news-media">
          ${imgTag(item, "news-img")}
          ${item.aLaUne ? `<span class="badge">À la une</span>` : ""}
        </div>
        <div class="news-body">
          <p class="news-meta"><span class="chip">${esc(item.categorie)}</span>${formatDate(item.date)}</p>
          <h2>${esc(item.titre)}</h2>
          <p class="news-text">${esc(item.resume)}</p>
          ${pointsList(item.points)}
          <div class="news-footer">
            ${item.prix ? `<strong class="news-price">${esc(item.prix)}</strong>` : "<span></span>"}
            <a class="btn primary" href="${esc(buyLink(item))}" target="_blank" rel="noopener noreferrer">${esc(item.bouton || "Acheter maintenant")}</a>
          </div>
        </div>
      </article>`).join("")
    : `<p class="empty-state">Aucune actualité pour le moment. Revenez bientôt !</p>`;
}

/* ---------- Animation du hero (réseau de particules) ---------- */
const canvas = document.querySelector(".hero-canvas");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let w, h, particles = [], raf;

  const init = () => {
    const box = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = box.width;
    h = canvas.height = box.height;
    const count = Math.min(60, Math.floor((w * h) / 14000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.2 + 1,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.2
    }));
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x = (p.x + p.vx + w) % w;
      p.y = (p.y + p.vy + h) % h;
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 120) * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37,99,235,${p.a * 0.6})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  init(); frame();
  window.addEventListener("resize", init);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf); else frame();
  });
}

/* ---------- En-tête : ombre au défilement ---------- */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Menu mobile ---------- */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
if (navToggle && mainNav) {
  const setOpen = open => {
    mainNav.classList.toggle("open", open);
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  navToggle.addEventListener("click", () => setOpen(!mainNav.classList.contains("open")));
  mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", e => {
    if (mainNav.classList.contains("open") && !mainNav.contains(e.target) && !navToggle.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- Apparition au défilement ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}

/* ---------- Année automatique dans le pied de page ---------- */
document.querySelectorAll(".year").forEach(el => (el.textContent = new Date().getFullYear()));
