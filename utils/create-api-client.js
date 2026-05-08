import axios from 'axios';
import { getTokenCookie } from './axios';

export default function createApiClient(baseURL, withAuth = false) {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (withAuth) {
        client.interceptors.request.use((config) => {
            const token = getTokenCookie();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    return client;
}
