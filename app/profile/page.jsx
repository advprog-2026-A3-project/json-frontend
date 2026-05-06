'use client';

import { useState, useEffect, useCallback } from 'react';
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

    const fetchProfile = useCallback(async () => {
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
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchProfile();
        }
    }, [router, fetchProfile]);

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
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f4f7f9]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#2149d8]"></div>
                    <p className="font-bold text-[#17254a]">Memuat profil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#f4f7f9] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-100">
                
                {/* Header Banner */}
                <div className="relative bg-gradient-to-r from-[#2b44a8] to-[#1f3482] h-40">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    
                    {/* Avatar Floating */}
                    <div className="absolute -bottom-12 left-8 sm:left-10">
                        <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200 shadow-md flex items-center justify-center text-4xl font-black text-slate-400">
                            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase() || '👤'}
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="absolute bottom-6 right-8 sm:right-10 z-10">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#ffd457] hover:bg-[#ffcf43] text-[#17254a] font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-md hover:-translate-y-0.5"
                            >
                                Edit Profil
                            </button>
                        )}
                    </div>
                </div>

                <div className="pt-16 px-8 sm:px-10 pb-10">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                            {successMsg}
                        </div>
                    )}

                    {user && !isEditing && (
                        <div className="space-y-6">
                            {/* Header Info */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-6">
                                <div>
                                    <h1 className="text-2xl font-black text-[#17254a]">{user.displayName || '-'}</h1>
                                    <p className="text-slate-500 font-medium">@{user.username}</p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2149d8]">
                                        {user.role}
                                    </span>
                                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                                        user.kycStatus === 'APPROVED' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                                        user.kycStatus === 'PENDING' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                                        'border-slate-200 bg-slate-50 text-slate-700'
                                    }`}>
                                        KYC: {user.kycStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid sm:grid-cols-2 gap-8 pt-2">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Email Account</p>
                                    <p className="text-base font-medium text-slate-800">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Nomor HP</p>
                                    <p className="text-base font-medium text-slate-800">{user.phoneNumber || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Bio</p>
                                    <p className="text-base text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">{user.bio || <span className="text-slate-400 italic">Belum ada bio</span>}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FORM EDIT PROFIL */}
                    {isEditing && (
                        <form onSubmit={handleUpdateProfile} className="space-y-5 pt-2">
                            <h2 className="text-xl font-black text-[#17254a] mb-6">Edit Informasi Profil</h2>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={editForm.displayName}
                                        onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email <span className="normal-case tracking-normal text-slate-400 font-normal">(Tidak bisa diubah)</span></label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nomor HP</label>
                                    <input
                                        type="text"
                                        value={editForm.phoneNumber}
                                        onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Bio Singkat</label>
                                    <textarea
                                        value={editForm.bio}
                                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium resize-none"
                                        placeholder="Ceritakan sedikit tentang dirimu..."
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100 mt-6">
                                <button
                                    type="submit"
                                    className="bg-[#2149d8] hover:bg-[#1a38a6] text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    Simpan Perubahan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-8 rounded-full transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-12 flex justify-center sm:justify-end border-t border-slate-100 pt-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold transition-colors px-4 py-2 hover:bg-rose-50 rounded-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-1.048a.75.75 0 1 0-1.06-1.06l-2.25 2.25a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-1.048-1.048h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                            </svg>
                            Keluar dari Akun
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}