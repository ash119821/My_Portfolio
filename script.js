// Typing names to cycle (you can add more names / titles)
const names = ['Aishvary', 'a Front-end Enthusiast', 'a Student', 'a Problem Solver'];
const typedEl = document.querySelector('.typed-name');
const typingSpeed = 80;    // ms per char
const pauseAfter = 1200;   // pause after full word
let nameIndex = 0;
let charIndex = 0;
let deleting = false;
const projectCards = document.querySelectorAll('.project-card');

function animateProjects() {
  projectCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && rect.bottom > 50) {
      card.classList.add('pop');
    } else {
      card.classList.remove('pop');
    }
  });
}

window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);


function typeTick() {
    const current = names[nameIndex];
    if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeTick, pauseAfter);
    } else {
        setTimeout(typeTick, typingSpeed);
    }
    } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
        deleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeTick, 300);
    } else {
        setTimeout(typeTick, typingSpeed / 2);
    }
    }
}

// Start typing once DOM loaded
window.addEventListener('DOMContentLoaded', () => {
    // reduced motion respect
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) typeTick();
    else typedEl.textContent = names[0];

    // IntersectionObserver for scroll-in animations
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
    });

    // Simple parallax for hero background
    const parallaxEl = document.querySelector('[data-parallax]');
    window.addEventListener('scroll', () => {
    if (!parallaxEl || reduced) return;
    const scrolled = window.scrollY;
    // Move background layer slightly for depth
    const bg = parallaxEl.querySelector('.hero-bg-layer');
    if (bg) bg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }, { passive: true });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
    navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('open');
    });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    });
});

  // Scroll animation observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Optional: make all sections animate when scrolling
  document.querySelectorAll('.section, .hero-container, .project-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });