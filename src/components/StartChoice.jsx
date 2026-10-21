import { useState } from 'react';

const START_OPTIONS = [
  {
    key: 'engine',
    title: 'Import what you have',
    desc: 'Already have a logo, a website, a description or brand files? We will read them and set everything up for you.',
    recommended: true,
    icon: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  },
  {
    key: 'scratch',
    title: 'Start from scratch',
    desc: 'No brand yet? Answer a few simple questions and we will suggest colours and fonts.',
    icon: (<><path d="M12 2v20M2 12h20" /></>),
  },
  {
    key: 'template',
    title: 'Start from a template',
    desc: 'Browse ready-made looks and pick the one closest to what you want.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
];

export default function StartChoice({ onPick, selected, heading = 'How do you want to set up your brand?', sub = 'You can change everything afterwards, whichever you pick.', onClose }) {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {heading}
          </h3>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {sub}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            title="Close"
            style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem', marginTop: '1.5rem',
      }}>
        {START_OPTIONS.map(opt => {
          const active = selected === opt.key;
          const hover = hovered === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onPick(opt.key)}
              onMouseEnter={() => setHovered(opt.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textAlign: 'left', padding: '1.4rem', cursor: 'pointer', fontFamily: 'inherit',
                background: active ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                border: active ? '1.5px solid var(--accent)' : '1px solid ' + (hover ? 'var(--border-bright, var(--border))' : 'var(--border)'),
                borderRadius: '12px', position: 'relative',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              {/* Radio circle / checkmark */}
              <span style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '20px', height: '20px', borderRadius: '50%',
                border: active ? 'none' : '1.5px solid var(--border)',
                background: active ? 'var(--accent)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s, border-color 0.15s',
              }}>
                {active && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>

              <span style={{ display: 'flex', color: active ? 'var(--accent)' : 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {opt.icon}
                </svg>
              </span>
              <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {opt.title}
              </span>
              {opt.recommended && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em',
                  color: 'var(--accent)', marginBottom: '0.35rem',
                }}>
                  ★ RECOMMENDED
                </span>
              )}
              <span style={{ display: 'block', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
