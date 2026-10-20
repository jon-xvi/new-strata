import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import TemplateGallery from '../components/newProject/TemplateGallery';
import { TEMPLATES } from '../components/newProject/templateData';
import { pairingById } from '../components/newProject/designSystemData';
import { brandAssetsFor } from '../data/brandAssets';

const FEATURED_IDS = TEMPLATES.slice(0, 6).map(t => t.id);

const inputStyle = {
  width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px',
  border: '1px solid var(--border)', background: 'var(--bg-secondary)',
  color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'inherit',
  outline: 'none',
};

// --- Illustrative SVGs for path cards ---

const TemplateIllustration = () => (
  <svg viewBox="0 0 120 64" fill="none" style={{ width: '100%', marginBottom: '0.6rem' }}>
    <rect x="4" y="4" width="50" height="36" rx="6" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="0.5"/>
    <rect x="10" y="10" width="38" height="8" rx="3" fill="var(--accent)" opacity="0.6"/>
    <rect x="10" y="22" width="24" height="4" rx="2" fill="var(--border)"/>
    <rect x="10" y="30" width="32" height="4" rx="2" fill="var(--border)"/>
    <rect x="66" y="4" width="50" height="36" rx="6" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="72" y="10" width="38" height="8" rx="3" fill="var(--text-tertiary)" opacity="0.4"/>
    <rect x="72" y="22" width="24" height="4" rx="2" fill="var(--border)"/>
    <rect x="72" y="30" width="32" height="4" rx="2" fill="var(--border)"/>
    <rect x="34" y="44" width="52" height="16" rx="6" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="40" y="49" width="14" height="6" rx="3" fill="var(--accent)" opacity="0.3"/>
    <rect x="58" y="49" width="14" height="6" rx="3" fill="var(--text-secondary)" opacity="0.2"/>
  </svg>
);

const ScratchIllustration = () => (
  <svg viewBox="0 0 120 64" fill="none" style={{ width: '100%', marginBottom: '0.6rem' }}>
    <line x1="60" y1="10" x2="60" y2="50" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="60" cy="10" r="3" fill="var(--accent)" opacity="0.6"/>
    <path d="M38 20 L40 16 L42 20 L40 24Z" fill="var(--accent)" opacity="0.3"/>
    <path d="M78 28 L80 24 L82 28 L80 32Z" fill="var(--accent)" opacity="0.25"/>
    <path d="M46 38 L47 36 L48 38 L47 40Z" fill="var(--accent)" opacity="0.2"/>
    <path d="M72 14 L73 12 L74 14 L73 16Z" fill="var(--accent)" opacity="0.2"/>
    <rect x="28" y="48" width="24" height="8" rx="4" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="56" y="48" width="16" height="8" rx="4" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="76" y="48" width="20" height="8" rx="4" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="31" y="50.5" width="18" height="3" rx="1.5" fill="var(--accent)" opacity="0.3"/>
    <rect x="59" y="50.5" width="10" height="3" rx="1.5" fill="var(--text-secondary)" opacity="0.3"/>
    <rect x="79" y="50.5" width="14" height="3" rx="1.5" fill="var(--text-tertiary)" opacity="0.3"/>
  </svg>
);

const ImportIllustration = () => (
  <svg viewBox="0 0 120 64" fill="none" style={{ width: '100%', marginBottom: '0.6rem' }}>
    <rect x="14" y="12" width="18" height="24" rx="4" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <circle cx="23" cy="20" r="4" fill="var(--accent)" opacity="0.3"/>
    <rect x="18" y="28" width="10" height="4" rx="2" fill="var(--text-tertiary)" opacity="0.3"/>
    <rect x="88" y="12" width="18" height="24" rx="4" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="92" y="16" width="10" height="2" rx="1" fill="var(--text-secondary)" opacity="0.3"/>
    <rect x="92" y="20" width="10" height="6" rx="2" fill="var(--text-tertiary)" opacity="0.2"/>
    <rect x="92" y="28" width="6" height="4" rx="2" fill="var(--accent)" opacity="0.2"/>
    <circle cx="60" cy="24" r="12" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6"/>
    <path d="M55 24 L58 21 L58 27Z" fill="var(--accent)" opacity="0.5"/>
    <path d="M65 24 L62 21 L62 27Z" fill="var(--accent)" opacity="0.5"/>
    <path d="M32 24 Q 42 24 48 24" stroke="var(--border)" strokeWidth="0.5"/>
    <path d="M88 24 Q 78 24 72 24" stroke="var(--border)" strokeWidth="0.5"/>
    <path d="M60 36 L60 48" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="44" y="48" width="32" height="10" rx="5" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5"/>
    <rect x="50" y="51" width="20" height="4" rx="2" fill="var(--accent)" opacity="0.25"/>
  </svg>
);

// --- Featured template mini-card ---

const FeaturedCard = ({ t, onClick }) => {
  const pair = pairingById(t.pairingId);
  const brand = brandAssetsFor(t.id);
  const p = t.palette;

  return (
    <button
      onClick={onClick}
      className="new-tpl-card"
      style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', padding: 0,
        textAlign: 'left', fontFamily: 'inherit', width: '100%',
      }}
    >
      <div style={{
        height: '72px', background: p.secondary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {brand ? (
          <span style={{
            width: '40px', height: '40px', borderRadius: '10px', background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={brand.logo} alt="" width="28" height="28" style={{ objectFit: 'contain' }} />
          </span>
        ) : (
          <span style={{
            fontFamily: pair ? `'${pair.heading}', sans-serif` : 'inherit',
            fontSize: '1.1rem', fontWeight: 600, color: p.primary,
          }}>
            {t.name}
          </span>
        )}
      </div>
      <div style={{ padding: '0.7rem 0.85rem' }}>
        <div style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          {t.name}
        </div>
        <div style={{ display: 'flex', gap: '3px', marginBottom: '0.25rem' }}>
          <span style={{ flex: 1, height: 6, borderRadius: 3, background: p.primary }} />
          <span style={{ flex: 1, height: 6, borderRadius: 3, background: p.secondary }} />
          <span style={{ flex: 1, height: 6, borderRadius: 3, background: p.accent }} />
        </div>
        {pair && (
          <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>
            {pair.heading} + {pair.body}
          </div>
        )}
      </div>
    </button>
  );
};

// --- Main page ---

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [projectName, setProjectName] = useState('');
  const [activePath, setActivePath] = useState('template');
  const [showFullGallery, setShowFullGallery] = useState(false);

  const named = projectName.trim().length > 0;

  const create = (setup) => {
    if (!named) return;
    const project = addProject({
      title: projectName.trim(),
      description: '',
      color: '#FC0694',
      brand: { toneKeywords: [] },
    });
    navigate('/projects/' + project.id, setup ? { state: { setup } } : undefined);
  };

  const handleTemplatePick = (template) => {
    if (!named) return;
    const project = addProject({
      title: projectName.trim(),
      description: '',
      color: template.palette.primary,
      brand: { toneKeywords: [] },
    });
    navigate('/projects/' + project.id, {
      state: { setup: 'scratch', template: {
        paletteId: template.paletteId,
        fontPairingId: template.pairingId,
        industry: template.industry,
        primaryVibe: template.vibe,
        scale: template.scale,
      }},
    });
  };

  const handlePathPick = (path) => {
    setActivePath(path);
    if (path === 'scratch') create('scratch');
    else if (path === 'import') create('engine');
  };

  const featured = TEMPLATES.filter(t => FEATURED_IDS.includes(t.id));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', height: '56px', flexShrink: 0,
        padding: '0 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)',
      }}>
        <Link to="/projects" style={{ textDecoration: 'none', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
          Strata<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <span style={{ color: 'var(--border)', margin: '0 0.3rem' }}>/</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New project</span>
      </header>

      <div style={{ width: '100%', maxWidth: showFullGallery ? '1100px' : '820px', margin: '0 auto', padding: '3rem 2.5rem 4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 500, margin: '0 0 0.25rem' }}>
          Create your design system
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 2rem', lineHeight: 1.6 }}>
          Name your project and pick how you want to start. You can change everything later.
        </p>

        {/* Project name */}
        <div style={{ marginBottom: '2.25rem' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.45rem' }}>
            Project name
          </label>
          <input
            style={inputStyle}
            placeholder="e.g. Acme Corp"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="new-proj-input"
            autoFocus
          />
        </div>

        {/* Path cards */}
        <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          Choose a starting point
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { key: 'template', label: 'Use a template', desc: 'Ready-made palette and type pairing to start from.', Illustration: TemplateIllustration },
            { key: 'scratch', label: 'Start fresh', desc: 'Answer a few questions, get suggestions.', Illustration: ScratchIllustration },
            { key: 'import', label: 'Import existing', desc: 'Figma, live site, or tokens.json.', Illustration: ImportIllustration },
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => handlePathPick(opt.key)}
              className="new-path-card"
              style={{
                background: activePath === opt.key ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                border: activePath === opt.key ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '12px', padding: '1.25rem', cursor: 'pointer',
                textAlign: 'left', fontFamily: 'inherit',
              }}
            >
              <opt.Illustration />
              <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {opt.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {opt.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Featured templates */}
        {!showFullGallery && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>Featured templates</span>
              <button
                onClick={() => setShowFullGallery(true)}
                style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Browse all {TEMPLATES.length} →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {featured.map(t => (
                <FeaturedCard
                  key={t.id}
                  t={t}
                  onClick={() => handleTemplatePick(t)}
                />
              ))}
            </div>
          </>
        )}

        {/* Full gallery (expanded) */}
        {showFullGallery && (
          <>
            <button
              onClick={() => setShowFullGallery(false)}
              style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              ‹ Back to overview
            </button>
            <TemplateGallery />
          </>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <Link to="/projects" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ‹ Back
          </Link>
          <button
            onClick={() => create(null)}
            disabled={!named}
            style={{
              background: 'none', border: 'none', fontSize: '0.82rem',
              color: named ? 'var(--text-tertiary)' : 'var(--text-tertiary)',
              opacity: named ? 1 : 0.5,
              cursor: named ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
            }}
          >
            Skip, create empty project
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .new-proj-input:hover { border-color: var(--border-bright) !important; }
        .new-proj-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 1px var(--accent-glow); }
        .new-proj-input::placeholder { color: var(--text-tertiary); }
        .new-path-card:hover { border-color: var(--border-bright) !important; }
        .new-tpl-card:hover { border-color: var(--border-bright) !important; transform: translateY(-2px); }
        .new-tpl-card { transition: border-color 0.15s, transform 0.15s; }
      `}} />
    </div>
  );
}
