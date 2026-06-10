import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

export const isSupabaseAuthEnabled = isSupabaseConfigured;

export const login = async ({ email, password }) => {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Admin girişi yapılandırılmamış.',
    };
  }

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
};

export const logout = async () => {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
};

export const isAuthenticated = async () => {
  if (!isSupabaseConfigured) {
    return false;
  }

  const { data } = await supabase.auth.getSession();
  return Boolean(data.session);
};
