const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, options = {}) {
  const token = localStorage.getItem('qinghome2_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) throw new Error(data?.error || '请求失败');
  return data;
}

// 工厂函数：生成 add/update/delete 三个函数
function crud(path) {
  return {
    add: (data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`${path}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`${path}/${id}`, { method: 'DELETE' }),
  };
}

export const getPublicConfig = () => request('/api/public/config');

export const login = (username, password) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
export const logout = () => request('/api/auth/logout', { method: 'POST' });

export const getAdminStatus = () => request('/api/admin/status');
export const setup = (username, password) =>
  request('/api/admin/setup', { method: 'POST', body: JSON.stringify({ username, password }) });
export const changePassword = (oldPassword, newPassword) =>
  request('/api/admin/change-password', { method: 'POST', body: JSON.stringify({ oldPassword, newPassword }) });

export const getAdminConfig = () => request('/api/admin/config');
export const updateProfile = (data) =>
  request('/api/admin/config/profile', { method: 'PUT', body: JSON.stringify(data) });

export const statsApi = crud('/api/admin/config/stats');
export const navApi = crud('/api/admin/config/nav');
export const blogApi = crud('/api/admin/config/blog');
export const projectsApi = crud('/api/admin/config/projects');
export const resourcesApi = crud('/api/admin/config/resources');
export const socialsApi = crud('/api/admin/config/socials');

export const fetchGitHubStars = (repos) => request(`/api/github-stars?repos=${repos.join(',')}`);