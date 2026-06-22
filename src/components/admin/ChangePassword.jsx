import { useState } from 'react';
import * as api from '../../api.js';
import { FaIcon } from '../Icons.jsx';
import F from './FormField.jsx';

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    if (newPass !== confirm) { setError('两次新密码不一致'); return; }
    if (newPass.length < 6) { setError('新密码至少 6 位'); return; }
    setBusy(true);
    try {
      const res = await api.changePassword(oldPass, newPass);
      setMsg(res.message || '密码修改成功');
      setOldPass(''); setNewPass(''); setConfirm('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header"><h3><span className="admin-hicon-gap"><FaIcon icon="fa-solid fa-key" size={15} /> 修改密码</span></h3></div>
      {error && <div className="admin-msg error"><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-circle-exclamation" size={14} />{error}</span></div>}
      {msg && <div className="admin-msg success"><span className="admin-icon-gap"><FaIcon icon="fa-solid fa-check-circle" size={14} />{msg}</span></div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <F label="当前密码" value={oldPass} onChange={setOldPass} type="password" />
        <F label="新密码" value={newPass} onChange={setNewPass} type="password" placeholder="至少 6 位" />
        <F label="确认新密码" value={confirm} onChange={setConfirm} type="password" />
        <button type="submit" className="admin-btn primary" disabled={busy}>
          {busy ? <span className="admin-icon-gap"><FaIcon icon="fa-solid fa-spinner fa-spin" size={14} />修改中…</span> : <span className="admin-icon-gap"><FaIcon icon="fa-solid fa-key" size={14} />修改密码</span>}
        </button>
      </form>
    </div>
  );
}