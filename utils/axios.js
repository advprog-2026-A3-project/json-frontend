// utils/axios.js
import axios from 'axios';

// Ini akan menembak langsung ke port Spring Boot-mu untuk testing lokal.
// Nanti jika Samuel sudah siap dengan API Gateway, kita tinggal ubah URL ini.
const API_URL = 'http://localhost:8081';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Otomatis menyelipkan Token JWT jika user sudah login
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;