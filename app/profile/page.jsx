'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // State untuk mode Edit menyesuaikan ProfileUpdateRequest.java
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        username: '',
        displayName: '',
        phoneNumber: '',
        bio: ''
    });

    const router = useRouter();

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/api/profile/me');
            setUser(response.data);

            // Mapping data dari UserProfileResponse.java
            setEditForm({
                username: response.data.username || '',
                displayName: response.data.displayName || '',
                phoneNumber: response.data.phoneNumber || '',
                bio: response.data.bio || ''
            });
        } catch (err) {
            console.error("Error fetch profil:", err);
            setError('Gagal mengambil data profil. Sesi kamu mungkin sudah habis.');
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('token');
                router.push('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchProfile();
        }
    }, [router]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        try {
            // Mengirim payload yang sesuai dengan ProfileUpdateRequest
            const response = await axiosInstance.put('/api/profile/me', editForm);

            setUser(response.data);
            setIsEditing(false);
            setSuccessMsg('Profil berhasil diperbarui!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error("Error update profil:", err);
            setError(err.response?.data?.message || 'Gagal memperbarui profil.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-bold">Memuat profil...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                <div className="bg-blue-700 px-6 py-5 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Profil Pengguna</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-1.5 px-4 rounded text-sm transition-colors shadow-sm"
                        >
                            Edit Profil
                        </button>
                    )}
                </div>

                <div className="p-6">
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                    {successMsg && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm font-medium">{successMsg}</div>}

                    {user && !isEditing && (
                        <div className="space-y-5">
                            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Display Name</p>
                                    <p className="text-lg text-gray-800 font-medium">{user.displayName || '-'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wide mb-1">
                                        {user.role}
                                    </span>
                                    <br/>
                                    <span className={`inline-block text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wide ${
                                        user.kycStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border border-green-200' :
                                            user.kycStatus === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                                'bg-gray-50 text-gray-700 border border-gray-200'
                                    }`}>
                                        KYC: {user.kycStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Username</p>
                                <p className="text-lg text-gray-800 font-medium">@{user.username}</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Account</p>
                                <p className="text-lg text-gray-800 font-medium">{user.email}</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Nomor HP</p>
                                <p className="text-lg text-gray-800 font-medium">{user.phoneNumber || 'Belum diisi'}</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Bio</p>
                                <p className="text-gray-800">{user.bio || 'Belum ada bio'}</p>
                            </div>
                        </div>
                    )}

                    {/* FORM EDIT PROFIL */}
                    {isEditing && (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    value={editForm.displayName}
                                    onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Tidak bisa diubah)</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor HP</label>
                                <input
                                    type="text"
                                    value={editForm.phoneNumber}
                                    onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Bio Singkat</label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                />
                            </div>
                            <div className="flex space-x-3 pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded transition-colors"
                                >
                                    Simpan Perubahan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-10 flex justify-end border-t border-gray-100 pt-6">
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                            Keluar dari Akun
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}