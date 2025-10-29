import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});
// Register interceptors only in the browser (avoid running browser-only code during SSR)
if (typeof window !== 'undefined') {
  // Request interceptor: attach token
  api.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // localStorage may not be available in some SSR contexts; ignore
    }
    return config;
  });

  // Response interceptor: handle 401 -> redirect to login
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } catch (e) {}
        // client-side redirect
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export default api;
