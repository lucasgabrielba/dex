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

// ----------------------------------------------------------------------

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    // Primeiro busca o CSRF token usando axios direto para evitar interceptor
    await axios.get(`${axios.defaults.baseURL}/api/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

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
    // Primeiro busca o CSRF token usando axios direto
    await axios.get(`${axios.defaults.baseURL}/api/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    const res = await axios.post(endpoints.auth.signUp, params);

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