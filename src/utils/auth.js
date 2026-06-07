import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || 'Sabrikeser.63';
const AUTH_KEY = 'adminAuthenticated';
const AUTH_EXPIRY_KEY = 'adminAuthExpiry';

export const isSupabaseAuthEnabled = isSupabaseConfigured;

export const login = async ({ email, password }) => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        ok: false,
        message: 'E-posta veya şifre hatalı.',
      };
    }

    return { ok: true };
  }

  if (password === LOCAL_ADMIN_PASSWORD) {
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
    return { ok: true };
  }

  return {
    ok: false,
    message: 'Hatalı şifre. Lütfen tekrar deneyin.',
  };
};

export const logout = async () => {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }

  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
};

export const isAuthenticated = async () => {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession();
    return Boolean(data.session);
  }

  const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
  
  if (!isAuth || !expiry) {
    return false;
  }
  
  const now = new Date().getTime();
  if (now > parseInt(expiry)) {
    await logout();
    return false;
  }
  
  return true;
};
