// ===== MAIN JAVASCRIPT — SWISS CENTER SERVICES AG =====

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initMobileMenu();
  initStickyNav();
  initScrollAnimations();
  initScrollTop();
  initParallax();
  initForms();
  initActiveNav();
  initBlogCarousel();
});

// ===== LANGUAGE SYSTEM =====
window.currentLang = localStorage.getItem('scosag_lang') || 'ru';

const LANG_META = {
  ru: { flag: '🇷🇺', name: 'Русский', code: 'RU' },
  de: { flag: '🇩🇪', name: 'Deutsch', code: 'DE' },
  en: { flag: '🇬🇧', name: 'English', code: 'EN' }
};

function initLanguage() {
  // Build dropdown HTML dynamically for each .lang-switcher
  document.querySelectorAll('.lang-switcher').forEach(switcher => {
    const meta = LANG_META[window.currentLang] || LANG_META.de;

    switcher.innerHTML = `
      <div class="lang-toggle" role="button" tabindex="0" aria-label="Select language">
        <svg class="globe-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
        <span class="lang-current-code">${meta.code}</span>
        <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
      </div>
      <div class="lang-dropdown">
        ${Object.entries(LANG_META).map(([code, m]) => `
          <button class="lang-option${code === window.currentLang ? ' active' : ''}" data-lang="${code}">
            <span class="lang-flag">${m.flag}</span>
            <span class="lang-name">${m.name}</span>
            <span class="lang-code">${m.code}</span>
            ${code === window.currentLang ? '<svg class="lang-check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>' : ''}
          </button>
        `).join('')}
      </div>
    `;

    // Toggle dropdown
    const toggle = switcher.querySelector('.lang-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other switchers
      document.querySelectorAll('.lang-switcher.open').forEach(s => {
        if (s !== switcher) s.classList.remove('open');
      });
      switcher.classList.toggle('open');
    });

    // Option clicks
    switcher.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = opt.dataset.lang;
        setLanguage(lang, true);
        switcher.classList.remove('open');
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
    }
  });

  // Set initial language
  setLanguage(window.currentLang, false);
}

function setLanguage(lang, save) {
  window.currentLang = lang;
  if (save) localStorage.setItem('scosag_lang', lang);

  const meta = LANG_META[lang] || LANG_META.de;

  // Update all switcher UIs
  document.querySelectorAll('.lang-switcher').forEach(switcher => {
    // Update toggle label
    const codeEl = switcher.querySelector('.lang-current-code');
    if (codeEl) codeEl.textContent = meta.code;

    // Update active states and checkmarks
    switcher.querySelectorAll('.lang-option').forEach(opt => {
      const isActive = opt.dataset.lang === lang;
      opt.classList.toggle('active', isActive);
      // Update check svg
      const existing = opt.querySelector('.lang-check');
      if (existing) existing.remove();
      if (isActive) {
        opt.insertAdjacentHTML('beforeend', '<svg class="lang-check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>');
      }
    });
  });

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = TRANSLATIONS[key][lang];
      } else if (el.tagName === 'OPTION') {
        el.textContent = TRANSLATIONS[key][lang];
      } else {
        el.innerHTML = TRANSLATIONS[key][lang];
      }
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'ua' ? 'uk' : lang;

  // Reload blog carousel with new language
  if (document.getElementById('carousel-track')) {
    initBlogCarousel();
  }

  // Reload blog posts on blog page with new language
  if (document.getElementById('blog-grid') && typeof loadBlogPosts === 'function') {
    loadBlogPosts();
  }

  // Reload blog post content on blog-post page
  if (document.getElementById('post-body') && typeof loadBlogPost === 'function') {
    loadBlogPost();
  }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');

  if (!hamburger || !navLinks) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });
}

// ===== STICKY NAV SHADOW =====
function initStickyNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so that re-entering triggers again (optional)
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== PARALLAX =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) {
        const offset = scrollY * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FORM HANDLING =====
function initForms() {
  document.querySelectorAll('.contact-form, .form-light').forEach(form => {
    const formEl = form.querySelector('form');
    if (!formEl) return;

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const required = formEl.querySelectorAll('[required]');
      let valid = true;
      required.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      // Simulate form submit
      const formContent = form.querySelector('.form-fields');
      const successMsg = form.querySelector('.form-success');

      if (formContent && successMsg) {
        formContent.style.opacity = '0';
        formContent.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          formContent.style.display = 'none';
          successMsg.classList.add('active');
          successMsg.style.opacity = '0';
          successMsg.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            successMsg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            successMsg.style.opacity = '1';
            successMsg.style.transform = 'translateY(0)';
          });
        }, 300);
      }
    });
  });
}

// ===== ACTIVE NAV HIGHLIGHTING =====
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = {
    'index.html': 'nav-home',
    'legal.html': 'nav-legal',
    'accounting.html': 'nav-accounting',
    'tax.html': 'nav-tax',
    'about.html': 'nav-about',
    'blog.html': 'nav-blog',
    'contact.html': 'nav-contacts'
  };

  const activeId = links[currentPage];
  if (activeId) {
    const el = document.getElementById(activeId);
    if (el) el.classList.add('active');
  }
}

// ===== BLOG CAROUSEL =====
async function initBlogCarousel() {
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carouselTrack) return;

  try {
    // Fetch blog posts
    const response = await fetch('/posts-data.json');
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      // Filter by language and published status, then get latest 6
      const posts = data.data
        .filter(p => p.lang === window.currentLang && p.published)
        .slice(0, 6);

      // Clear track
      carouselTrack.innerHTML = '';

      // Add posts to carousel
      posts.forEach(post => {
        const date = new Date(post.date).toLocaleDateString(window.currentLang === 'ru' ? 'ru-RU' : window.currentLang === 'de' ? 'de-DE' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const item = document.createElement('div');
        item.className = 'blog-carousel-item reveal-scale';
        item.innerHTML = `
          ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" class="carousel-item-image">` : '<div class="carousel-item-image" style="background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);"></div>'}
          <div class="carousel-item-body">
            <h3 class="carousel-item-title">${escapeHtml(post.title)}</h3>
            <div class="carousel-item-description">${escapeHtml(post.description || post.content.substring(0, 100))}</div>
            <div class="carousel-item-meta">${date}</div>
            <a href="/blog-post.html?slug=${post.slug}" class="carousel-item-link">
              <span data-i18n="blog_read_more">Читать статью</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </a>
          </div>
        `;
        carouselTrack.appendChild(item);
      });

      // Translate carousel items
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[key] && TRANSLATIONS[key][window.currentLang]) {
          el.innerHTML = TRANSLATIONS[key][window.currentLang];
        }
      });

      // Setup carousel navigation
      if (prevBtn && nextBtn) {
        const itemWidth = carouselTrack.querySelector('.blog-carousel-item')?.offsetWidth + 24 || 360;

        prevBtn.addEventListener('click', () => {
          carouselTrack.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
          carouselTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
      }

      // Re-trigger reveal animations
      initScrollAnimations();
    } else {
      // No posts found - show message
      carouselTrack.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);" data-i18n="blog_no_articles">Статьи не найдены</div>`;
    }
  } catch (error) {
    console.error('Error loading blog carousel:', error);
    carouselTrack.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">Ошибка загрузки статей</div>`;
  }
}

// Helper to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== SMOOTH SCROLL for anchors =====
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (id === '#' || id.length <= 1) return;

  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    const navH = document.querySelector('.main-nav')?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navH - 20;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});
