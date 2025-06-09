import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  // Cookies desabilitados, CSRF não é necessário
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Importante para Laravel identificar como AJAX
  },
});

// Sem interceptors de CSRF

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