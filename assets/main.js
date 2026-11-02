(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Theme toggle ----------
  var themeBtn = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelectorAll('meta[name="theme-color"]');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    themeMeta.forEach(function (m) { m.setAttribute('content', t === 'dark' ? '#121019' : '#f6f3ec'); });
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  applyTheme(root.getAttribute('data-theme') || 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---------- Mobile menu ----------
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // ---------- Header border on scroll ----------
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Email links (assembled here to keep the address away from simple scrapers) ----------
  var copyBtn = document.querySelector('.copy-email');
  var address = null;

  document.querySelectorAll('.js-email').forEach(function (el) {
    var u = el.getAttribute('data-u');
    var d = el.getAttribute('data-d');
    if (!u || !d) return;
    address = u + '@' + d;
    el.setAttribute('href', 'mailto:' + address);
    var label = el.querySelector('.js-email-text');
    if (label) label.textContent = address;
  });

  if (copyBtn && address && navigator.clipboard) {
    copyBtn.hidden = false;
    var copyLabel = copyBtn.querySelector('.copy-label');
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(address).then(function () {
        if (copyLabel) copyLabel.textContent = 'Copied';
        setTimeout(function () { if (copyLabel) copyLabel.textContent = 'Copy email'; }, 1800);
      }).catch(function () {
        window.location.href = 'mailto:' + address;
      });
    });
  }

  // ---------- Year ----------
  var year = document.querySelector('.js-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---------- Count-up for stats ----------
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target) || reduceMotion) return;
    var start = null;
    var duration = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger siblings that enter together.
        var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [el];
        var i = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
        el.classList.add('is-visible');
        var num = el.querySelector('.stat-num');
        if (num) countUp(num);
        revealObs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  // ---------- Active nav link ----------
  var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  var sections = [];
  links.forEach(function (a) {
    var s = document.querySelector(a.getAttribute('href'));
    if (s) sections.push({ link: a, el: s });
  });

  // The current section is the last one whose top has passed 40% of the viewport.
  var ticking = false;
  function updateActive() {
    ticking = false;
    var line = window.innerHeight * 0.4;
    var current = null;
    sections.forEach(function (s) {
      if (s.el.getBoundingClientRect().top <= line) current = s;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    sections.forEach(function (s) { s.link.classList.toggle('is-active', s === current); });
  }

  if (sections.length) {
    updateActive();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
    }, { passive: true });
    window.addEventListener('resize', updateActive);
  }
})();
