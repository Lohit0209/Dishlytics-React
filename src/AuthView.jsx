import React, { useState } from 'react';
import { Sparkles, Lock, User, ArrowRight } from 'lucide-react';
import { auth } from './storage';

export default function AuthView({ onLogin, t }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const res = auth.login(username, password);
      if (res.success) onLogin(res.user);
      else setError(res.message);
    } else {
      const res = auth.signup(username, password);
      if (res.success) {
        setIsLogin(true);
        setError('Account created! Please login.');
      } else setError(res.message);
    }
  };

  return (
    <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', padding: '2rem' }}>
      <div className="gourmet-card animate-in fade-in zoom-in duration-500" style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', width: '64px', height: '64px', background: 'var(--primary)', color: 'white' }}>
            <Sparkles size={32} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{isLogin ? t('login_title') : t('signup_title')}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{isLogin ? 'Welcome back to Dishlytics' : 'Start your zero-waste journey'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">{t('username')}</label>
            <div className="search-wrapper" style={{ background: 'var(--bg-app)' }}>
              <User size={18} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="chef_123" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('password')}</label>
            <div className="search-wrapper" style={{ background: 'var(--bg-app)' }}>
              <Lock size={18} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="search-input" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div style={{ color: 'var(--funny-coral)', fontSize: '0.875rem', fontWeight: 700, textAlign: 'center' }}>{error}</div>}

          <button type="submit" className="action-btn" style={{ width: '100%' }}>
            {isLogin ? t('btn_login') : t('btn_signup')}
            <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}
          >
            {isLogin ? t('no_account') : t('has_account')}
          </button>
        </div>
      </div>
    </div>
  );
}
