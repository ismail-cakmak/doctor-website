import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isSupabaseAuthEnabled } from '../utils/auth';
import { supabase } from '../lib/supabaseClient';

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({
    checking: true,
    authenticated: false,
  });

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const authenticated = await isAuthenticated();

      if (isMounted) {
        setAuthState({
          checking: false,
          authenticated,
        });
      }
    };

    checkAuth();

    if (!isSupabaseAuthEnabled || !supabase) {
      return () => {
        isMounted = false;
      };
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setAuthState({
          checking: false,
          authenticated: Boolean(session),
        });
      }
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (authState.checking) {
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        Yükleniyor...
      </div>
    );
  }

  if (!authState.authenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
}
