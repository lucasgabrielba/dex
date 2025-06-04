import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { SANCTUM_TOKEN_KEY } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Função auxiliar para buscar CSRF token
const getCsrfToken = async (): Promise<void> => {
  try {
    await axios.get('/api/sanctum/csrf-cookie', {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Erro ao buscar CSRF token:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    // Busca o CSRF token
    await getCsrfToken();

    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params, {
      withCredentials: true,
    });

    // Verifica se houve erro na resposta
    if (res.data.error) {
      throw new Error(res.data.error);
    }

    // Verifica se o email não foi verificado
    if (res.data.message === 'Email ainda não verificado.') {
      throw new Error('Email ainda não verificado.');
    }

    const { token } = res.data;

    if (!token) {
      throw new Error('Token de acesso não encontrado na resposta');
    }

    setSession(token);
  } catch (error: any) {
    console.error('Erro durante o login:', error);

    // Se for um erro do Axios, extrai a mensagem da resposta
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    // Busca o CSRF token
    await getCsrfToken();

    const res = await axios.post(endpoints.auth.signUp, params, {
      withCredentials: true,
    });

    const { token } = res.data;

    if (!token) {
      throw new Error('Token de acesso não encontrado na resposta');
    }

    sessionStorage.setItem(SANCTUM_TOKEN_KEY, token);
  } catch (error: any) {
    console.error('Erro durante o cadastro:', error);

    // Se for um erro do Axios, extrai a mensagem da resposta
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Erro durante o logout:', error);
    throw error;
  }
};