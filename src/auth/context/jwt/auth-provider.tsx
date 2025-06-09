import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { AuthContext } from '../auth-context';
import { SANCTUM_TOKEN_KEY } from './constant';
import { setSession, isValidToken } from './utils';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(SANCTUM_TOKEN_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // Busca os dados do usuário usando o token na rota get-me
        const res = await axios.get(endpoints.auth.me);

        // Alguns backends podem retornar os dados do usuário diretamente
        // enquanto outros utilizam a chave "user". Suportamos ambos.
        const userData = res.data.user ?? res.data;

        setState({ user: { ...userData, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);

      // Se o token for inválido, remove da sessão
      sessionStorage.removeItem(SANCTUM_TOKEN_KEY);
      delete axios.defaults.headers.common.Authorization;

      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? {
        ...state.user,
        role: state.user?.role ?? 'admin',
        displayName: `${state.user?.name} ${state.user?.last_name}`,
        id: state.user?.id,
        email: state.user?.email,
        phoneNumber: state.user?.phone,
      } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}