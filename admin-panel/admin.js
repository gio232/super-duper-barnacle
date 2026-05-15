/**
 * Admin Panel JavaScript
 * Управление статьями блога
 */

const API_URL = window.location.origin + '/api';
let authToken = localStorage.getItem('authToken');
let currentLang = localStorage.getItem('currentLang') || 'ru';

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
  if (authToken) {
    showAdminPanel();
    loadPosts();
  } else {
    showLoginForm();
  }

  // Event listeners
  document.getElementById('login').addEventListener('submit', handleLogin);
  document.getElementById('post-form').addEventListener('submit', handlePublish);
  document.getElementById('draft-btn').addEventListener('click', handleDraft);
  document.getElementById('preview-btn').addEventListener('click', handlePreview);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
});

// ===== LOGIN =====
async function handleLogin(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const loginError = document.getElementById('login-error');

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (data.success) {
      authToken = data.token;
      localStorage.setItem('authToken', authToken);
      loginError.style.display = 'none';
      showAdminPanel();
      loadPosts();
    } else {
      loginError.textContent = '❌ ' + data.message;
      loginError.style.display = 'block';
    }
  } catch (error) {
    loginError.textContent = '❌ Ошибка подключения';
    loginError.style.display = 'block';
    console.error(error);
  }
}

// ===== LOGOUT =====
function handleLogout() {
  authToken = null;
  localStorage.removeItem('authToken');
  document.getElementById('post-form').reset();
  showLoginForm();
}

// ===== SHOW/HIDE PANELS =====
function showLoginForm() {
  document.getElementById('login-form').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
}

function showAdminPanel() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
}

// ===== POST CREATION =====
async function handlePublish(e) {
  e.preventDefault();
  const post = getFormData();
  post.published = document.getElementById('published').checked;
  await savePost(post);
  document.getElementById('post-form').reset();
}

async function handleDraft(e) {
  e.preventDefault();
  const post = getFormData();
  post.published = false;
  await savePost(post);
  document.getElementById('post-form').reset();
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
      renderPostsList(data.data);
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

  // Группируем посты по slug-у
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
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
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
    console.error(error);
  }
}

function editPost(slug) {
  alert('📝 Функция редактирования будет добавлена позже. Пока удали и создай заново.');
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

// ===== MARKDOWN EDITOR =====
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

// ===== MARKDOWN TO HTML =====
function markdownToHtml(markdown) {
  let html = escapeHtml(markdown);

  // Заголовки
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Жирный текст
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Курсив
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Ссылки
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Списки
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

  // Параграфы
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
  form.insertBefore(alert, form.firstChild);

  setTimeout(() => alert.remove(), 5000);
}

// Закрытие модального окна при клике снаружи
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  if (e.target === modal) {
    closePreview();
  }
});
