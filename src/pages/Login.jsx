import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authVisual from '../assets/auth-visual.webp';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Where to land after signing in. A page that sent you here to log in can say where it
  // wants you back — the public design-system page does, so that Remix finishes the job
  // you asked for instead of stranding you on the project list with nothing copied.
  //
  // Only same-site paths are honoured: anything that is not a bare `/...` path could be an
  // absolute URL to somewhere else, which would make this an open redirect.
  const from = location.state && location.state.from;
  const backTo = typeof from === 'string' && /^\/[^/]/.test(from) ? from : '/projects';

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Visual Side */}
      <div style={{
        flex: '1',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 20% 80%, rgba(120, 0, 180, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120, 0, 180, 0.1) 0%, transparent 50%), #0a0a12',
      }} className="auth-visual-side">
        <img
          src={authVisual}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>

      {/* Form Side */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem',
        maxWidth: '650px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome back</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Log in to manage your design system propagation.
          </p>
        </div>

        <form 
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          onSubmit={(e) => {
            e.preventDefault();
            login({ name: 'Abdul-Qayyum', email: 'user@example.com', initials: 'AQ' });
            navigate(backTo, { replace: true });
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              required
              style={{ 
                background: 'transparent', 
                borderBottom: '1px solid var(--border)', 
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                padding: '1rem 0', 
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '1.1rem'
              }} 
              className="auth-input"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none' }}>Forgot password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                required
                style={{
                  background: 'transparent',
                  borderBottom: '1px solid var(--border)',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  padding: '1rem 0',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '1.1rem',
                  width: '100%',
                }}
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '0.5rem' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </>
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }}
            />
            Remember me
          </label>

          <button type="submit" className="btn btn-primary" style={{ padding: '1.25rem', width: '100%', marginTop: '0.5rem', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>Log in</button>
        </form>

        <div style={{ margin: '2.5rem 0', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.1rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Sign in with Charisol
        </button>

        <p style={{ marginTop: '3rem', fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          New to Strata? <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
        </p>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .auth-visual-side { display: none !important; }
        }
        .auth-input:focus {
          border-bottom-color: var(--accent) !important;
        }
      `}} />
    </div>
  );
};

export default Login;
