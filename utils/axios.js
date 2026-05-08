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

/**
 * Normalizes any Axios error into { fieldErrors, globalMessage }.
 *
 * Backend shapes handled:
 *   { errors: { field: "msg" } }           — object map
 *   { errors: [{ field, message }] }        — array (Spring / Bean Validation)
 *   { errors: [{ field, defaultMessage }] } — array (Spring BindingResult)
 *   { message: "..." }                      — global message only
 *   { error: "..." }                        — fallback key
 */
export function parseApiError(error) {
    if (!error.response) {
        return {
            fieldErrors: {},
            globalMessage:
                error.code === 'ERR_NETWORK'
                    ? 'Ada masalah saat menghubungi server.'
                    : 'Internal Server Error',
        };
    }

    const { data } = error.response;
    const fieldErrors = {};

    if (data?.errors) {
        if (Array.isArray(data.errors)) {
            for (const e of data.errors) {
                const field = e.field ?? e.param;
                const msg = e.message ?? e.defaultMessage ?? e.msg;
                if (field && msg) fieldErrors[field] = msg;
            }
        } else if (typeof data.errors === 'object') {
            Object.assign(fieldErrors, data.errors);
        }
    }

    const globalMessage =
        data?.message ||
        data?.error ||
        (Object.keys(fieldErrors).length === 0 ? 'Internal Server Error' : '');

    return { fieldErrors, globalMessage };
}

export default axiosInstance;
