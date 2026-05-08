import axiosInstance from './axios';

export const login = (email, password) =>
    axiosInstance.post('/api/auth/login', { email, password });

export const register = (data) =>
    axiosInstance.post('/api/auth/register', data);

export const getProfileMe = () =>
    axiosInstance.get('/api/profile/me');

export const getProfileById = (userId) =>
    axiosInstance.get(`/api/profile/${userId}`);

export const getPublicProfile = (username) =>
    axiosInstance.get(`/api/profile/public/${username}`);

export const updateProfileMe = (data) =>
    axiosInstance.put('/api/profile/me', data);

export const submitKYC = (data) =>
    axiosInstance.post('/api/profile/kyc', data);

export const adminGetAllUsers = (params) =>
    axiosInstance.get('/api/admin/users', { params });

export const adminValidateKYC = (userId, status) =>
    axiosInstance.post(`/api/admin/kyc/${userId}/validate`, { status });

export const adminUpdateUserStatus = (userId, status) =>
    axiosInstance.patch(`/api/admin/users/${userId}/status`, { status });

export default axiosInstance;
