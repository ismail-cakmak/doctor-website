import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseAuthEnabled, login } from '../utils/auth';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login({
      email,
      password,
    });
    
    if (result.ok) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Admin Paneli</h1>
          <p className="admin-login-subtitle">Devam etmek için giriş yapın</p>
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            {isSupabaseAuthEnabled && (
              <div className="admin-login-field">
                <label htmlFor="email" className="admin-login-label">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="admin-login-input"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            )}

            <div className="admin-login-field">
              <label htmlFor="password" className="admin-login-label">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="admin-login-input"
                placeholder="Şifrenizi girin"
                autoComplete={isSupabaseAuthEnabled ? 'current-password' : 'off'}
                required
              />
            </div>
            
            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}
            
            <button type="submit" className="admin-login-button" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
