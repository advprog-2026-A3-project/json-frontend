import axios from 'axios';

export default function createApiClient(baseURL, withAuth = false) {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (withAuth) {
        client.interceptors.request.use((config) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            return config;
        });
    }

    return client;
}
