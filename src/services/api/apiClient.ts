import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Inject JWT token into Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const tokens = useAuthStore.getState().tokens;
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized, Token Refresh & Auto Logout
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().tokens?.refreshToken;
        if (refreshToken) {
          // Attempt token refresh call
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const newTokens = res.data;
          useAuthStore.setState({ tokens: newTokens });
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshErr) {
        // Automatic logout when authentication expires
        useAuthStore.getState().logout();
        window.location.href = '/login?expired=true';
      }
    }

    return Promise.reject(error);
  }
);
