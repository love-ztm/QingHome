import { FaIcon } from '../Icons.jsx';

export default function F({ label, value, onChange, type = 'text', placeholder, rows, fullWidth }) {
  const id = label.replace(/\s+/g, '-');
  return (
    <div className="admin-field" style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
      <label htmlFor={id}>{label}</label>
      {rows ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder || ''} />
      ) : type === 'color' ? (
        <input id={id} type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} style={{ width: 40, height: 36, padding: 2, cursor: 'pointer' }} />
      ) : type === 'color-text' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} style={{ width: 40, height: 36, padding: 2, cursor: 'pointer', flexShrink: 0 }} />
          <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder || ''} style={{ flex: 1 }} />
        </div>
      ) : type === 'select' ? (
        <select id={id} value={value || ''} onChange={e => onChange(e.target.value)}>
          {placeholder}
        </select>
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ''} />
      )}
    </div>
  );
}