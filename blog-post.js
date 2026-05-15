// ===== BLOG POST PAGE SCRIPT =====

document.addEventListener('DOMContentLoaded', async () => {
  await loadBlogPost();
});

async function loadBlogPost() {
  // Get slug from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    window.location.href = '/blog.html';
    return;
  }

  try {
    // Get current language from the page (set by script.js)
    const lang = window.currentLang || localStorage.getItem('scosag_lang') || 'ru';

    // Fetch ALL posts from static JSON file
    const response = await fetch('/posts-data.json');
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      // Find post with matching slug and language
      let post = data.data.find(p => p.slug === slug && p.lang === lang);

      // If not found in current language, take any version of this post
      if (!post) {
        post = data.data[0];
      }

      if (post) {
        // Update page title
        document.title = `${post.title} — Swiss Center Services AG`;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = post.description || post.content.substring(0, 150);

        // Display post
        document.getElementById('post-title').textContent = post.title;

        const date = new Date(post.date).toLocaleDateString(
          lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : 'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );
        document.getElementById('post-date').textContent = date;
        document.getElementById('post-author').textContent = `by ${post.author || 'Swiss Center Services AG'}`;

        // Display image if available
        const imgEl = document.getElementById('post-image');
        if (post.image) {
          imgEl.src = post.image;
          imgEl.alt = post.title;
        } else {
          imgEl.style.display = 'none';
        }

        // Convert markdown to HTML and display
        document.getElementById('post-body').innerHTML = markdownToHtml(post.content);

        // Update language in navigation
        document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
      } else {
        document.getElementById('post-body').innerHTML = '<p>Article not found</p>';
      }
    } else {
      document.getElementById('post-body').innerHTML = '<p>Article not found</p>';
    }
  } catch (error) {
    console.error('Error loading blog post:', error);
    document.getElementById('post-body').innerHTML = '<p>Error loading article</p>';
  }
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  let html = escapeHtml(markdown);

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Lists
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

  // Paragraphs
  html = '<p>' + html.replace(/\n\n/g, '</p><p>') + '</p>';
  html = html.replace(/<\/p><h/g, '</p>\n<h');
  html = html.replace(/<\/p><ul/g, '</p>\n<ul');
  html = html.replace(/<\/p><li/g, '</p>\n<li');
  html = html.replace(/<li>/g, '<li>');
  html = html.replace(/<\/ul><p>/g, '</ul>\n<p>');

  return html;
}

// Helper to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
