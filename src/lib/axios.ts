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
  },
});

// Interceptor para requisições
axiosInstance.interceptors.request.use(
  (config) => {
    // Adiciona o token CSRF se disponível
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respostas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 419 (CSRF token mismatch), tenta renovar o token
    if (error.response?.status === 419) {
      console.warn('CSRF token expirado, renovando...');
      // Você pode implementar uma lógica para renovar o token aqui
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
    signUp: '/api/auth/sign-up'
  },
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