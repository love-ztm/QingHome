import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as api from '../api.js';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [checking, setChecking] = useState(true);

  // 登录表单
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // 注册表单
  const [regUser, setRegUser] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  useEffect(() => {
    if (user) { navigate('/admin', { replace: true }); return; }
    api.getAdminStatus().then(s => {
      setMode(s.setupNeeded ? 'register' : 'login');
      setChecking(false);
    }).catch(() => setChecking(false));
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(username, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (regPass !== regConfirm) { setError('两次密码不一致'); return; }
    if (regPass.length < 6) { setError('密码至少 6 位'); return; }
    setBusy(true);
    try {
      const result = await api.setup(regUser, regPass);
      // 注册成功自动登录
      localStorage.setItem('qinghome2_token', result.token);
      localStorage.setItem('qinghome2_username', result.username);
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (checking) return <div className="admin-loading">加载中…</div>;

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {mode === 'register' ? (
          <>
            <h1>🚀 创建管理员</h1>
            <p className="admin-login-sub">首次使用，请设置管理员账号和密码</p>
            {error && <div className="admin-msg error">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="admin-field">
                <label>用户名</label>
                <input type="text" value={regUser} onChange={e => setRegUser(e.target.value)} required autoFocus />
              </div>
              <div className="admin-field">
                <label>密码</label>
                <input type="password" value={regPass} onChange={e => setRegPass(e.target.value)} required placeholder="至少 6 位" />
              </div>
              <div className="admin-field">
                <label>确认密码</label>
                <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} required />
              </div>
              <button type="submit" className="admin-btn primary" disabled={busy}>
                {busy ? '创建中…' : '创建管理员并登录'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>🔐 管理后台</h1>
            <p className="admin-login-sub">请输入管理员账号密码登录</p>
            {error && <div className="admin-msg error">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="admin-field">
                <label>用户名</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
              </div>
              <div className="admin-field">
                <label>密码</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="admin-btn primary" disabled={busy}>
                {busy ? '登录中…' : '登录'}
              </button>
            </form>
          </>
        )}
        <p className="admin-login-footer">
          <Link to="/">← 返回首页</Link>
        </p>
      </div>
    </div>
  );
}