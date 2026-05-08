import axios from 'axios';

export function getTokenCookie() {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/(^|;\s*)token=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : null;
}

export function setTokenCookie(token) {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearTokenCookie() {
    document.cookie = 'token=; path=/; max-age=0';
}

const axiosInstance = axios.create({
    baseURL: 'http://32.195.110.26:8081',
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getTokenCookie();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            clearTokenCookie();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
