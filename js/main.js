/* ==========================================================================
   Nile Business Solutions — Main JavaScript
   ========================================================================== */

// Language Management
const LANG_KEY = 'nilebs-lang';

function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations(lang);
  updateLangSwitchButton(lang);
}

function applyTranslations(lang) {
  if (typeof translations === 'undefined') return;
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

function updateLangSwitchButton(lang) {
  const btns = document.querySelectorAll('.lang-switch');
  btns.forEach(btn => {
    btn.textContent = lang === 'en' ? 'عربي' : 'EN';
  });
}

function toggleLanguage() {
  const current = getCurrentLang();
  const next = current === 'en' ? 'ar' : 'en';
  setLanguage(next);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.querySelector('.nav-menu');
  if (menu) menu.classList.toggle('active');
}

// Scroll Animation Observer
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Contact Form Handler
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(getCurrentLang() === 'ar'
        ? 'شكراً لتواصلك معنا! سنرد عليك قريباً.'
        : 'Thank you for reaching out! We will get back to you soon.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

// Smooth Nav Background on Scroll
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      nav.style.boxShadow = '0 4px 20px rgba(46, 42, 120, 0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  });
}

// Counter Animation for Stats
function animateCounter(el, target, duration = 2000) {
  const isPercent = el.dataset.suffix === '%';
  const isPlus = el.dataset.suffix === '+';
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + (isPercent ? '%' : isPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + (isPercent ? '%' : isPlus ? '+' : '');
  }

  requestAnimationFrame(update);
}

function initStatsAnimation() {
  const stats = document.querySelectorAll('.stat-num[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// Initialize Everything on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(getCurrentLang());
  initScrollAnimations();
  initContactForm();
  initNavScroll();
  initStatsAnimation();

  document.querySelectorAll('.lang-switch').forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
});
