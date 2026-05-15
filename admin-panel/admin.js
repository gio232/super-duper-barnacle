/**
 * Админ Панель JavaScript (без сервера - работает локально)
 * Управление статьями через JSON файл и localStorage
 */

let authToken = localStorage.getItem('authToken');
let currentUser = localStorage.getItem('currentUser');
let currentLang = localStorage.getItem('currentLang') || 'ru';
let allPosts = [];
let editingPostSlug = null;
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// API URL - автоматически определяется для локальной разработки и продакшена
const API_URL = '/api';

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
      currentUser = data.username;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', currentUser);
      loginError.style.display = 'none';
      button.textContent = originalText;
      button.disabled = false;
      showAdminPanel();
      loadPosts();
    } else {
      loginError.textContent = '❌ ' + (data.message || 'Ошибка логина');
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

function verifyToken() {
  if (authToken && currentUser) {
    showAdminPanel();
    loadPosts();
  } else {
    showLoginForm();
  }
}

function handleForgotPassword(e) {
  e.preventDefault();
  const resetError = document.getElementById('reset-error');
  const resetSuccess = document.getElementById('reset-success');

  resetError.style.display = 'none';
  resetSuccess.textContent = '✓ Пароль по умолчанию: admin123 (это демонстрационная панель)';
  resetSuccess.style.display = 'block';
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
      document.getElementById('image').value = data.data.original || data.data.url;
      showImagePreview(data.data.original || data.data.url);
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
    const endpoint = post.id ? `${API_URL}/posts/${post.id}` : `${API_URL}/posts`;
    const method = post.id ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method: method,
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
      editingPostSlug = null;
      loadPosts();
    } else {
      showAlert('❌ Ошибка: ' + data.error, 'error');
    }
  } catch (error) {
    showAlert('❌ Ошибка при сохранении: ' + error.message, 'error');
  }
}

// ===== LOAD POSTS =====
function loadPosts() {
  fetch(`${API_URL}/posts`)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.data) {
        allPosts = data.data;
        renderPostsList(allPosts);
      }
    })
    .catch(error => {
      console.error('Ошибка при загрузке постов:', error);
      allPosts = [];
      renderPostsList([]);
    });
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
  if (!slug || slug === 'new') {
    alert('⚠️ Сначала опубликуй статью');
    return;
  }

  const post = allPosts.find(p => p.slug === slug);
  if (!post) {
    alert('⚠️ Статья не найдена');
    return;
  }

  // Заполни форму данными статьи
  document.getElementById('title').value = post.title;
  document.getElementById('description').value = post.description || '';
  document.getElementById('content').value = post.content;
  document.getElementById('author').value = post.author || '';
  document.getElementById('language').value = post.lang;
  document.getElementById('published').checked = post.published;
  document.getElementById('image').value = post.image || '';

  if (post.image) {
    showImagePreview(post.image);
  }

  // Скролл к форме
  document.getElementById('post-form').scrollIntoView({ behavior: 'smooth' });
  showAlert(`✏️ Редактируешь: "${post.title}"`, 'info');
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

// ===== DOWNLOAD POSTS DATA =====
function downloadPostsJSON() {
  const data = {
    success: true,
    data: allPosts
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'posts-data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showAlert('✓ Файл posts-data.json скачан! Загрузи его на хостинг в корневую папку', 'success');
}

// Close modals on background click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  if (e.target === modal) closePreview();
});
