
import axios from 'src/lib/axios';

import { SANCTUM_TOKEN_KEY } from './constant';

// ----------------------------------------------------------------------

// Para tokens do Sanctum, não precisamos decodificar como JWT
export function sanctumTokenDecode(token: string) {
  try {
    if (!token) return null;

    // Tokens do Sanctum têm formato: id|hash
    const parts = token.split('|');
    if (parts.length !== 2) {
      throw new Error('Token inválido!');
    }

    return {
      id: parts[0],
      hash: parts[1],
      valid: true
    };
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    // Para tokens do Laravel Sanctum, verificamos o formato id|hash
    const tokenData = sanctumTokenDecode(accessToken);
    return tokenData !== null && tokenData.valid;
  } catch (error) {
    console.error('Erro durante validação do token:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      sessionStorage.setItem(SANCTUM_TOKEN_KEY, accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem(SANCTUM_TOKEN_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Erro durante definição da sessão:', error);
    throw error;
  }
}