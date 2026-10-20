import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupIllustration = () => (
  <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '260px', marginBottom: '1.5rem' }}>
    {/* Color swatch card */}
    <rect x="20" y="30" width="72" height="50" rx="8" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="28" y="38" width="56" height="12" rx="4" fill="var(--accent)"/>
    <rect x="28" y="54" width="28" height="6" rx="3" fill="var(--border)"/>
    <rect x="60" y="54" width="24" height="6" rx="3" fill="var(--border)"/>
    <circle cx="32" cy="72" r="3" fill="var(--accent)" opacity="0.4"/>
    <circle cx="42" cy="72" r="3" fill="var(--text-secondary)" opacity="0.3"/>
    <circle cx="52" cy="72" r="3" fill="var(--text-tertiary)" opacity="0.3"/>

    {/* Typography card */}
    <rect x="108" y="15" width="80" height="65" rx="8" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.8"/>
    <text x="120" y="38" fill="var(--text-primary)" fontFamily="var(--font-heading)" fontSize="16" fontWeight="500">Aa</text>
    <rect x="120" y="46" width="56" height="5" rx="2.5" fill="var(--border)"/>
    <rect x="120" y="55" width="40" height="5" rx="2.5" fill="var(--border)"/>
    <rect x="120" y="64" width="48" height="5" rx="2.5" fill="var(--border)"/>

    {/* Spacing grid */}
    <rect x="200" y="40" width="60" height="45" rx="8" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <line x1="210" y1="48" x2="250" y2="48" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5"/>
    <line x1="210" y1="56" x2="250" y2="56" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3"/>
    <line x1="210" y1="64" x2="250" y2="64" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5"/>
    <line x1="210" y1="72" x2="250" y2="72" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3"/>
    <rect x="218" y="50" width="12" height="12" rx="2" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5"/>
    <rect x="234" y="50" width="12" height="12" rx="2" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5"/>

    {/* Component card */}
    <rect x="40" y="100" width="90" height="60" rx="8" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <rect x="50" y="110" width="70" height="10" rx="5" fill="var(--accent)" opacity="0.8"/>
    <rect x="50" y="126" width="70" height="10" rx="5" fill="var(--border)"/>
    <rect x="50" y="142" width="40" height="10" rx="5" fill="var(--border)"/>

    {/* Token flow lines */}
    <path d="M92 80 Q 100 95 90 100" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" fill="none"/>
    <path d="M148 80 Q 140 90 135 100" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" fill="none"/>

    {/* Palette circles */}
    <circle cx="170" cy="120" r="20" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="0.5"/>
    <circle cx="170" cy="120" r="12" fill="var(--accent)" opacity="0.2"/>
    <circle cx="170" cy="120" r="5" fill="var(--accent)"/>

    {/* Code snippet */}
    <rect x="145" y="150" width="115" height="55" rx="8" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="0.5"/>
    <text x="155" y="168" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="9" opacity="0.8">--primary:</text>
    <text x="205" y="168" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="9">#FC0694</text>
    <text x="155" y="180" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="9" opacity="0.8">--heading:</text>
    <text x="205" y="180" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="9">Outfit</text>
    <text x="155" y="192" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="9" opacity="0.8">--radius:</text>
    <text x="205" y="192" fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="9">8px</text>

    {/* Floating dots */}
    <circle cx="30" cy="180" r="2" fill="var(--accent)" opacity="0.3"/>
    <circle cx="50" cy="200" r="1.5" fill="var(--accent)" opacity="0.2"/>
    <circle cx="250" cy="25" r="2" fill="var(--accent)" opacity="0.25"/>
    <circle cx="270" cy="100" r="1.5" fill="var(--accent)" opacity="0.15"/>
    <circle cx="100" cy="220" r="2" fill="var(--accent)" opacity="0.2"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const emailName = formData.email.split('@')[0];
    signup({
      name: emailName,
      email: formData.email,
      initials: emailName.slice(0, 2).toUpperCase(),
    });
    navigate('/projects');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Illustration panel */}
      <div className="auth-visual-side" style={{
        flex: 1, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '3rem',
      }}>
        <SignupIllustration />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.6, maxWidth: '260px' }}>
          Your brand's design tokens, typography, and palette — organized and ready to export.
        </p>
      </div>

      {/* Form panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '3rem', maxWidth: '480px', margin: '0 auto',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            Strata<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 500, marginBottom: '0.4rem' }}>
          Create your account
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          Start building your design system in minutes.
        </p>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={() => {
            signup({ name: 'Google User', email: 'user@google.com', initials: 'GU' });
            navigate('/projects');
          }}
          className="signup-google-btn"
          style={{
            width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
            border: '1px solid var(--border)', background: 'var(--bg-secondary)',
            color: 'var(--text-primary)', fontSize: '0.88rem', cursor: 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '0.5rem',
          }}
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="signup-input"
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-primary)', fontSize: '0.88rem', fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="signup-input"
              style={{
                width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-primary)', fontSize: '0.88rem', fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
              border: 'none', background: 'var(--accent)', color: '#fff',
              fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', marginTop: '0.25rem',
            }}
          >
            Create account
          </button>
        </form>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '1.25rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
          By continuing, you agree to Strata's{' '}
          <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Terms</span> and{' '}
          <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Privacy Policy</span>.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .auth-visual-side { display: none !important; }
        }
        .signup-input:hover { border-color: var(--border-bright) !important; }
        .signup-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 1px var(--accent-glow); }
        .signup-input::placeholder { color: var(--text-tertiary); }
        .signup-google-btn:hover { border-color: var(--border-bright) !important; }
      `}} />
    </div>
  );
};

export default Signup;
