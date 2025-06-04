import { useEffect } from 'react';

import axios from 'src/lib/axios';

export function useCsrf() {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        // Busca o CSRF token do Laravel Sanctum
        await axios.get('/api/sanctum/csrf-cookie');
      } catch (error) {
        console.error('Erro ao buscar CSRF token:', error);
      }
    };

    getCsrfToken();
  }, []);
}