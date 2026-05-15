/**
 * Админ Панель JavaScript
 * Управление статьями, загрузка медиа, мультиязычный контент
 */

const API_URL = window.location.origin + '/api';
let authToken = localStorage.getItem('authToken');
let currentUser = localStorage.getItem('currentUser');
let currentLang = localStorage.getItem('currentLang') || 'ru';
let allPosts = [];

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
  if (authToken) {
    verifyToken();
  } else {
    showLoginForm();
  }

  // Event listeners для логина
  document.getElementById('login').addEventListener('submit', handleLogin);
  document.getElementById('forgot-form').addEventListener('submit', handleForgotPassword);

  // Event listeners для админ панели
  document.getElementById('post-form').addEventListener('submit', handlePublish);
  document.getElementById('draft-btn').addEventListener('click', handleDraft);
  document.getElementById('preview-btn').addEventListener('click', handlePreview);
  document.getElementById('preview-translations-btn').addEventListener('click', handleTranslationPreview);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  document.getElementById('image-file').addEventListener('change', handleImageUpload);
});

// ===== AUTH FUNCTIONS =====
async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginError = document.getElementById('login-error');
  const button = e.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  if (!username || !password) {
    loginError.textContent = '❌ Заполни все поля';
    loginError.style.display = 'block';
    return;
  }

  button.textContent = '⏳ Проверяю...';
  button.disabled = true;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      authToken = data.token;
      currentUser = username;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', currentUser);
      loginError.style.display = 'none';
      showAdminPanel();
      loadPosts();
    } else {
      loginError.textContent = '❌ ' + (data.message || 'Ошибка входа');
      loginError.style.display = 'block';
      button.textContent = originalText;
      button.disabled = false;
    }
  } catch (error) {
    loginError.textContent = '❌ ' + error.message;
    loginError.style.display = 'block';
    button.textContent = originalText;
    button.disabled = false;
  }
}

async function verifyToken() {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();
    if (data.success) {
      showAdminPanel();
      loadPosts();
    } else {
      handleLogout();
    }
  } catch (error) {
    handleLogout();
  }
}

async function handleForgotPassword(e) {
  e.preventDefault();
  const username = document.getElementById('reset-username').value;
  const resetError = document.getElementById('reset-error');
  const resetSuccess = document.getElementById('reset-success');
  const button = e.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.textContent = '⏳ Отправляю...';
  button.disabled = true;

  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    const data = await response.json();

    if (data.success) {
      resetError.style.display = 'none';
      resetSuccess.textContent = '✓ ' + data.message;
      resetSuccess.style.display = 'block';
      button.textContent = originalText;
      button.disabled = false;
    } else {
      resetSuccess.style.display = 'none';
      resetError.textContent = '❌ ' + data.message;
      resetError.style.display = 'block';
      button.textContent = originalText;
      button.disabled = false;
    }
  } catch (error) {
    resetError.textContent = '❌ Ошибка: ' + error.message;
    resetError.style.display = 'block';
    button.textContent = originalText;
    button.disabled = false;
  }
}

function handleLogout() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  document.getElementById('post-form').reset();
  showLoginForm();
}

function showLoginForm() {
  document.getElementById('login-form').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
}

function showForgotPassword() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'flex';
}

function showAdminPanel() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
  document.getElementById('current-user').textContent = currentUser || 'admin';
}

// ===== IMAGE UPLOAD =====
async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById('image').value = data.data.original;
      showImagePreview(data.data.original);
      showAlert('✓ Изображение загружено', 'success');
    } else {
      showAlert('❌ Ошибка загрузки: ' + data.error, 'error');
    }
  } catch (error) {
    showAlert('❌ Ошибка: ' + error.message, 'error');
  }
}

function showImagePreview(url) {
  const preview = document.getElementById('image-preview');
  preview.innerHTML = `<img src="${url}" alt="Preview" style="max-width: 200px; border-radius: 4px;">`;
}

// ===== POST CREATION =====
async function handlePublish(e) {
  e.preventDefault();
  const post = getFormData();
  post.published = document.getElementById('published').checked;
  await savePost(post);
}

async function handleDraft(e) {
  e.preventDefault();
  const post = getFormData();
  post.published = false;
  await savePost(post);
}

function getFormData() {
  return {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    content: document.getElementById('content').value,
    lang: document.getElementById('language').value,
    image: document.getElementById('image').value || null,
    author: document.getElementById('author').value
  };
}

async function savePost(post) {
  if (!post.title || !post.content) {
    alert('⚠️ Заголовок и содержание обязательны!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(post)
    });

    const data = await response.json();

    if (data.success) {
      showAlert(`✓ Статья "${post.title}" ${post.published ? 'опубликована' : 'сохранена как черновик'}!`, 'success');
      document.getElementById('post-form').reset();
      document.getElementById('image-preview').innerHTML = '';
      loadPosts();
    } else {
      showAlert(`❌ Ошибка: ${data.error}`, 'error');
    }
  } catch (error) {
    showAlert('❌ Ошибка при сохранении', 'error');
    console.error(error);
  }
}

// ===== LOAD POSTS =====
async function loadPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();

    if (data.success) {
      allPosts = data.data;
      renderPostsList(allPosts);
    }
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
  }
}

function renderPostsList(posts) {
  const list = document.getElementById('posts-list');

  if (posts.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: #666;">Нет статей</p>';
    return;
  }

  const grouped = {};
  posts.forEach(post => {
    if (!grouped[post.slug]) {
      grouped[post.slug] = [];
    }
    grouped[post.slug].push(post);
  });

  let html = '';
  Object.entries(grouped).forEach(([slug, versions]) => {
    const main = versions[0];
    const langs = versions.map(v => v.lang).join(', ');

    html += `
      <div class="post-item">
        <div class="post-header">
          <h3 class="post-title">${escapeHtml(main.title)}</h3>
          <span class="post-status ${main.published ? '' : 'draft'}">
            ${main.published ? '📤 Опубликовано' : '📝 Черновик'}
          </span>
        </div>
        <div class="post-meta">
          <strong>Языки:</strong> ${langs} |
          <strong>Дата:</strong> ${new Date(main.date).toLocaleDateString('ru-RU')}
        </div>
        <div class="post-actions">
          <button class="btn btn-secondary" onclick="editPost('${slug}')">✏️ Редактировать</button>
          <button class="btn btn-outline" onclick="deletePost('${slug}')">🗑️ Удалить</button>
        </div>
      </div>
    `;
  });

  list.innerHTML = html;
}

async function deletePost(slug) {
  if (!confirm(`⚠️ Удалить статью "${slug}"? Это действие необратимо!`)) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/posts/${slug}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();

    if (data.success) {
      showAlert('✓ Статья удалена', 'success');
      loadPosts();
    } else {
      showAlert(`❌ Ошибка: ${data.error}`, 'error');
    }
  } catch (error) {
    showAlert('❌ Ошибка при удалении', 'error');
  }
}

function editPost(slug) {
  alert('📝 Редактирование будет добавлено в следующей версии');
}

// ===== PREVIEW =====
function handlePreview(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (!title || !content) {
    alert('⚠️ Заполни заголовок и содержание');
    return;
  }

  const modal = document.getElementById('preview-modal');
  const preview = document.getElementById('preview-content');

  preview.innerHTML = `
    <h1>${escapeHtml(title)}</h1>
    ${markdownToHtml(content)}
  `;

  modal.style.display = 'block';
}

function closePreview() {
  document.getElementById('preview-modal').style.display = 'none';
}

// ===== TRANSLATION PREVIEW =====
async function handleTranslationPreview(e) {
  e.preventDefault();

  const post = getFormData();

  if (!post.title || !post.content) {
    alert('⚠️ Заполни заголовок и содержание');
    return;
  }

  try {
    const translateUrl = 'https://api.mymemory.translated.net/get';

    // Переводим заголовок
    const enTitle = await translateText(post.title, 'ru|en');
    const deTitle = await translateText(post.title, 'ru|de');

    const modal = document.getElementById('translation-modal');
    const preview = document.getElementById('translation-preview');

    preview.innerHTML = `
      <div class="translation-tabs">
        <div class="translation-tab">
          <h2>🇷🇺 Русский (оригинал)</h2>
          <h3>${escapeHtml(post.title)}</h3>
          <div class="translation-content">${markdownToHtml(post.content)}</div>
        </div>

        <div class="translation-tab">
          <h2>🇬🇧 English (автоперевод)</h2>
          <h3>${escapeHtml(enTitle)}</h3>
          <p style="color: #999; font-size: 12px;">⚠️ Это автоматический перевод. Проверь и отредактируй если нужно!</p>
        </div>

        <div class="translation-tab">
          <h2>🇩🇪 Deutsch (автоперевод)</h2>
          <h3>${escapeHtml(deTitle)}</h3>
          <p style="color: #999; font-size: 12px;">⚠️ Это автоматический перевод. Проверь и отредактируй если нужно!</p>
        </div>
      </div>
    `;

    modal.style.display = 'block';
  } catch (error) {
    showAlert('❌ Ошибка при переводе: ' + error.message, 'error');
  }
}

function closeTranslationPreview() {
  document.getElementById('translation-modal').style.display = 'none';
}

async function translateText(text, langPair) {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`);
    const data = await response.json();
    return data.responseData?.translatedText || text;
  } catch (error) {
    console.error('Ошибка при переводе:', error);
    return text;
  }
}

// ===== MARKDOWN FUNCTIONS =====
function insertMarkdown(before, after) {
  const textarea = document.getElementById('content');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selected = text.substring(start, end);

  textarea.value = text.substring(0, start) + before + selected + after + text.substring(end);
  textarea.focus();
  textarea.selectionStart = start + before.length;
  textarea.selectionEnd = start + before.length + selected.length;
}

function markdownToHtml(markdown) {
  let html = escapeHtml(markdown);

  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

  html = '<p>' + html.replace(/\n\n/g, '</p><p>') + '</p>';
  html = html.replace(/<\/p><h/g, '</p>\n<h');
  html = html.replace(/<\/p><ul/g, '</p>\n<ul');

  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== ALERTS =====
function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  const form = document.querySelector('.post-form');
  if (form) {
    form.insertBefore(alert, form.firstChild);
    setTimeout(() => alert.remove(), 5000);
  }
}

// Close modals on background click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  const transModal = document.getElementById('translation-modal');
  if (e.target === modal) closePreview();
  if (e.target === transModal) closeTranslationPreview();
});
