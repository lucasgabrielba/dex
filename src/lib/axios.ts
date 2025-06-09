import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  withCredentials: true, // Necessário para CSRF cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Importante para Laravel identificar como AJAX
  },
});

// Interceptor para requisições
axiosInstance.interceptors.request.use(
  async (config) => {
    // Para requisições POST, PUT, PATCH, DELETE, adiciona headers CSRF
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      // Tenta pegar o token CSRF do cookie XSRF-TOKEN (padrão do Laravel)
      let csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

      // Se não existir token, tenta buscar um novo
      if (!csrfToken) {
        try {
          await axiosInstance.get('/sanctum/csrf-cookie');
          csrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        } catch (error) {
          console.error('Falha ao buscar CSRF token:', error);
        }
      }

      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

async function refreshCsrfToken() {
  try {
    await axiosInstance.get('/sanctum/csrf-cookie');
  } catch (refreshError) {
    console.error('Falha ao renovar CSRF token:', refreshError);
  }
}

// Interceptor para respostas
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Se receber 419 (CSRF token mismatch), tenta renovar o token e refazer a requisição uma vez
    if (error.response?.status === 419 && !error.config.__isRetryRequest) {
      console.warn('CSRF token expirado, tentando renovar...');
      await refreshCsrfToken();
      error.config.__isRetryRequest = true;
      return axiosInstance(error.config);
    }

    return Promise.reject((error.response && error.response.data) || 'Algo deu errado!');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Falha ao buscar:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/get-me', // Sua rota para buscar dados do usuário
    signIn: '/api/auth/login', // Endpoint do Laravel
    signUp: '/api/auth/register'
  },
  onboarding: '/api/onboarding',
  mail: { list: '/api/mail/list', details: '/api/mail/details', labels: '/api/mail/labels' },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  client: {
    list: '/api/client/list',
    details: '/api/client/details',
    search: '/api/client/search',
  },
  property: {
    list: '/api/property/list',
    details: '/api/property/details',
    search: '/api/property/search',
    stats: '/api/property/stats',
    filters: '/api/property/filters',
  }
};