import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [projectName, setProjectName] = useState('');

  const named = projectName.trim().length > 0;

  const create = () => {
    if (!named) return;
    const project = addProject({
      title: projectName.trim(),
      description: '',
      color: '#FC0694',
      brand: { toneKeywords: [] },
    });
    navigate('/projects/' + project.id, { state: { created: true } });
  };

  const displayName = named ? projectName.trim() : 'Untitled';

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', height: '56px', flexShrink: 0,
        padding: '0 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)',
      }}>
        <Link to="/projects" style={{
          textDecoration: 'none', fontFamily: 'var(--font-heading)',
          fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)',
        }}>
          Strata<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <span style={{ color: 'var(--border)', margin: '0 0.3rem' }}>/</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New project</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => navigate('/projects')}
          style={{
            background: 'none', border: 'none', color: 'var(--text-tertiary)',
            cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1, padding: 0,
          }}
          title="Close"
        >×</button>
      </header>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4rem', maxWidth: '960px', width: '100%', alignItems: 'start',
        }}>
          {/* Left — name form */}
          <div style={{ paddingTop: '1rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.8rem',
              fontWeight: 600, margin: '0 0 0.5rem', color: 'var(--text-primary)',
            }}>
              Name your design system
            </h1>
            <p style={{
              fontSize: '0.9rem', color: 'var(--text-secondary)',
              margin: '0 0 2.5rem', lineHeight: 1.6,
            }}>
              Just a name to start. We will walk you through the rest, one simple step at a time.
            </p>

            <label style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
              color: 'var(--text-tertiary)', textTransform: 'uppercase',
              display: 'block', marginBottom: '0.5rem',
            }}>
              Project name
            </label>
            <input
              autoFocus
              className="new-proj-input"
              placeholder="e.g. Acme Corp"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') create(); }}
              style={{
                width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px',
                border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'inherit',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={create}
                disabled={!named}
                style={{
                  padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none',
                  background: named ? 'var(--accent)' : 'var(--bg-tertiary)',
                  color: named ? '#fff' : 'var(--text-tertiary)',
                  fontSize: '0.88rem', fontWeight: 600, fontFamily: 'inherit',
                  cursor: named ? 'pointer' : 'not-allowed',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                Create project
              </button>
              {!named && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Give it a name to continue.
                </span>
              )}
            </div>
          </div>

          {/* Right — preview card + steps */}
          <div>
            {/* Gradient preview card */}
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 40%, #ec4899 100%)',
              padding: '2rem', minHeight: '120px',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                marginBottom: '0.3rem',
              }}>
                Your design system
              </span>
              <span style={{
                fontSize: '1.4rem', fontWeight: 700, color: '#fff',
                fontFamily: 'var(--font-heading)',
              }}>
                {displayName}
              </span>
            </div>

            {/* Steps outline */}
            <div style={{ marginTop: '2rem' }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text-tertiary)',
              }}>
                Three quick steps after this
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
                {[
                  { n: 1, title: 'Set up your brand', desc: 'Colours, fonts and the feel of your brand. Import what you have, start fresh or pick a template.' },
                  { n: 2, title: 'Choose your components', desc: 'Buttons, inputs, cards and more, built from your brand and previewed before you save.' },
                  { n: 3, title: 'Add your brand assets', desc: 'Your logo, favicon and brand documents, all in one place.' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      background: 'var(--accent)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700,
                    }}>
                      {step.n}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .new-proj-input:hover { border-color: var(--border-bright, var(--border)) !important; }
        .new-proj-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 2px var(--accent-glow); }
        .new-proj-input::placeholder { color: var(--text-tertiary); }
      `}} />
    </div>
  );
}
