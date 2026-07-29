// ========== 1. CANVAS ANIMATION (particules / réseau) ==========
const canvas = document.querySelector('.hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animationId;
  
  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // creation des particules
    const PARTICLE_COUNT = Math.min(70, Math.floor(width * height / 12000));
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - distance / 120) * 0.25;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }
  
  function drawParticles() {
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha * 0.6})`;
      ctx.fill();
    }
  }
  
  function updateParticles() {
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
  }
  
  function animateCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    updateParticles();
    drawConnections();
    drawParticles();
    animationId = requestAnimationFrame(animateCanvas);
  }
  
  function handleResize() {
    initCanvas();
  }
  
  initCanvas();
  animateCanvas();
  window.addEventListener('resize', handleResize);
  
  window.addEventListener('beforeunload', () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
  });
}

// ========== 2. HEADER SCROLL EFFECT (EFFET PREMIUM) ==========
const header = document.querySelector('.site-header');
let lastScrollY = 0;

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
  });
}

// ========== 3. MENU MOBILE AMÉLIORÉ (HAMBURGER) ==========
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' ? false : true;
    navToggle.setAttribute('aria-expanded', expanded);
    mainNav.classList.toggle('open');
    
    // animation du hamburger améliorée
    const spans = navToggle.querySelectorAll('span');
    if (expanded) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 7px)';
      spans[0].style.width = '24px';
      spans[1].style.opacity = '0';
      spans[1].style.transform = 'translateX(10px)';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
      spans[2].style.width = '24px';
    } else {
      spans[0].style.transform = 'none';
      spans[0].style.width = '22px';
      spans[1].style.opacity = '1';
      spans[1].style.transform = 'none';
      spans[2].style.transform = 'none';
      spans[2].style.width = '22px';
    }
  });
  
  // fermer le menu si clic sur un lien
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[0].style.width = '22px';
      spans[1].style.opacity = '1';
      spans[1].style.transform = 'none';
      spans[2].style.transform = 'none';
      spans[2].style.width = '22px';
    });
  });
  
  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('open') && 
        !mainNav.contains(e.target) && 
        !navToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[0].style.width = '22px';
      spans[1].style.opacity = '1';
      spans[1].style.transform = 'none';
      spans[2].style.transform = 'none';
      spans[2].style.width = '22px';
    }
  });
}

// ========== 4. REVEAL ON SCROLL OPTIMISÉ ==========
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => observer.observe(el));

// déclencher manuellement au cas où certains sont déjà visibles
setTimeout(() => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}, 200);

// ========== 5. AJOUT D'UN INDICATEUR DE SCROLL DOUX POUR LES LIENS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== "#" && href !== "") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});