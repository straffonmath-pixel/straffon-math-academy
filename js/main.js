/* ============================================
   STRAFFON MATH ACADEMY — Main JS
   ============================================ */

(function () {
  'use strict';

  // --- Scroll-aware nav ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check

  // --- Mobile menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
  }

  // Close menu on link click (mobile)
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // --- Scroll reveal animations ---
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!reveals.length) return;

    // Immediately reveal hero elements with staggered delay
    var heroEls = document.querySelectorAll('.hero .reveal, .hero .reveal-stagger, .page-hero .reveal, .page-hero .reveal-stagger');
    heroEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, 150 + i * 120);
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    reveals.forEach(function (el) {
      // Skip hero elements already revealed
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  // --- FAQ Accordion ---
  function initAccordion() {
    var items = document.querySelectorAll('.accordion__item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close all other items
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            var otherPanel = other.querySelector('.accordion__panel');
            var otherTrigger = other.querySelector('.accordion__trigger');
            if (otherPanel) otherPanel.style.maxHeight = '0';
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('active');
          panel.style.maxHeight = '0';
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }

  // Tally popup is handled via data-tally-open attributes on buttons.
  // No custom JS needed — the Tally embed script reads the attributes automatically.
})();
