// ===== BLOG PAGE SCRIPT =====

document.addEventListener('DOMContentLoaded', async () => {
  await loadBlogPosts();
});

async function loadBlogPosts() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  try {
    // Get current language from window.currentLang (set by script.js) or localStorage
    const lang = window.currentLang || localStorage.getItem('scosag_lang') || 'ru';
    console.log('Loading blog posts for language:', lang);

    // Fetch posts from static JSON file
    const response = await fetch('/posts-data.json');
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      // Filter by language and published status
      const filteredPosts = data.data.filter(p => p.lang === lang && p.published);

      // Clear grid
      blogGrid.innerHTML = '';

      // Add posts
      filteredPosts.forEach(post => {
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
          <div style="font-size: 16px;" data-i18n="blog_no_articles">No articles found</div>
        </div>
      `;

      // Translate the message
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
          el.innerHTML = TRANSLATIONS[key][lang];
        }
      });
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    blogGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 16px;">Error loading articles</div>
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
