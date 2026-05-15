// ===== BLOG PAGE SCRIPT =====

document.addEventListener('DOMContentLoaded', async () => {
  await loadBlogPosts();
});

async function loadBlogPosts() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  try {
    // Get current language from localStorage or default to 'ru'
    const lang = localStorage.getItem('scosag_lang') || 'ru';

    // Fetch posts for current language, published only
    const response = await fetch(`${window.location.origin}/api/posts?lang=${lang}&published=true`);
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      // Clear grid
      blogGrid.innerHTML = '';

      // Add posts
      data.data.forEach(post => {
        const date = new Date(post.date).toLocaleDateString(
          lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : 'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );

        const card = document.createElement('article');
        card.className = 'blog-card reveal';
        card.innerHTML = `
          ${post.image ? `
            <div class="blog-card-image">
              <img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy">
            </div>
          ` : ''}
          <div class="blog-card-body">
            <div class="blog-meta">${date}</div>
            <h3><a href="/blog-post.html?slug=${post.slug}">${escapeHtml(post.title)}</a></h3>
            <p class="blog-excerpt">${escapeHtml(post.description || post.content.substring(0, 150))}</p>
            <a href="/blog-post.html?slug=${post.slug}" class="blog-read-more" data-i18n="blog_read_more">Читать статью</a>
          </div>
        `;

        blogGrid.appendChild(card);
      });

      // Translate all elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
          el.innerHTML = TRANSLATIONS[key][lang];
        }
      });

      // Re-trigger animations
      if (window.initScrollAnimations) {
        initScrollAnimations();
      }
    } else {
      // No posts
      blogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 16px;" data-i18n="blog_no_articles">Статьи не найдены</div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    blogGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 16px;">Ошибка загрузки статей</div>
      </div>
    `;
  }
}

// Helper to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
