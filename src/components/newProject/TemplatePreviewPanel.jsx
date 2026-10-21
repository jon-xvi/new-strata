import { useEffect } from 'react';
import DesignSystemView from '../DesignSystemView';
import { systemFromTemplate } from '../../data/templateSystem';
import { brandAssetsFor, capturedLabel } from '../../data/brandAssets';

const ProBadge = () => (
  <span style={{
    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', flexShrink: 0,
    padding: '0.15rem 0.5rem', borderRadius: '999px',
    background: 'var(--accent-glow)', border: '1px solid var(--accent)', color: 'var(--accent)',
  }}>PRO</span>
);

export default function TemplatePreviewPanel({ template, onClose, onUse }) {
  const open = Boolean(template);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!template) return null;

  const locked = template.tier === 'pro';
  const system = systemFromTemplate(template);
  const brand = brandAssetsFor(template.id);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2500,
          background: 'rgba(0, 0, 0, 0.5)',
          animation: 'tplPanelFadeIn 0.2s ease-out',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(72vw, 900px)', zIndex: 2501,
        background: 'var(--bg)', borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        animation: 'tplPanelSlideIn 0.25s ease-out',
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-secondary)', flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1,
              padding: '0.25rem', display: 'flex', alignItems: 'center',
            }}
            title="Close preview"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span style={{
            fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)',
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {template.name}
          </span>
          {locked && <ProBadge />}
          {onUse && !locked && (
            <button
              type="button"
              onClick={() => onUse(template)}
              style={{
                padding: '0.45rem 1rem', borderRadius: '8px', border: 'none',
                background: 'var(--accent)', color: '#fff', fontSize: '0.82rem',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
              }}
            >
              Use this template
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.5rem 4rem' }}>
          <DesignSystemView
            name={system.name}
            description={system.description}
            color={system.color}
            brand={system.brand}
            tokensMap={system.tokensMap}
            components={system.components}
            meta={system.meta}
            badge={locked ? <ProBadge /> : null}
            overviewLead={brand ? (
              <div style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '20px', padding: '2rem', display: 'flex',
                flexDirection: 'column', gap: '1rem',
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {template.name}&rsquo;s website
                  </h3>
                  <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    Where the palette and type below were read from.
                  </p>
                </div>
                <img
                  src={brand.shot}
                  alt={'Screenshot of ' + brand.site}
                  width="1440"
                  height="900"
                  loading="lazy"
                  style={{
                    width: '100%', height: 'auto', display: 'block', borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                />
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Screenshot of{' '}
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  >{brand.site} &#8599;</a>
                  , captured {capturedLabel()}.
                </p>
              </div>
            ) : null}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tplPanelSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes tplPanelFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}} />
    </>
  );
}
