// MEVO — shared script (all guards included, safe on every page)
(function () {
  'use strict';

  // Mobile menu
  var burger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('active');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // FAQ accordion (single open)
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (it) {
        it.classList.remove('open');
        var a = it.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
        var q = it.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen && answer) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact form validation
  var form = document.getElementById('contactForm');
  if (form) {
    function validateField(group) {
      var input = group.querySelector('input, select, textarea');
      if (!input || !input.required) return true;
      var ok = input.value.trim().length > 0;
      if (ok && input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      group.classList.toggle('invalid', !ok);
      return ok;
    }
    form.querySelectorAll('.form-group').forEach(function (group) {
      var input = group.querySelector('input, select, textarea');
      if (!input) return;
      input.addEventListener('blur', function () { validateField(group); });
      input.addEventListener('input', function () {
        if (group.classList.contains('invalid')) validateField(group);
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      form.querySelectorAll('.form-group').forEach(function (group) {
        if (!validateField(group)) allOk = false;
      });
      if (!allOk) return;
      var btn = document.getElementById('submitBtn');
      if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
      setTimeout(function () {
        form.classList.add('hidden');
        var s = document.getElementById('formSuccess');
        if (s) s.classList.remove('hidden');
      }, 900);
    });
  }

  // Navbar shadow on scroll
  var nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 10px rgba(0,0,0,.08)'
        : '0 2px 10px rgba(0,0,0,.05)';
    }, { passive: true });
  }
})();
