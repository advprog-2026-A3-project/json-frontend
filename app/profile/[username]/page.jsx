'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getPublicProfile } from '@/utils/auth-api';

const ROLE_LABEL = { ADMIN: 'Admin', JASTIPER: 'Jastiper', TITIPERS: 'Titipers' };

function kycBadgeClass(status) {
    if (status === 'APPROVED') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'PENDING') return 'border-amber-200 bg-amber-50 text-amber-700';
    return 'border-slate-200 bg-slate-50 text-slate-600';
}

export default function PublicProfilePage({ params }) {
    const { username } = use(params);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!username) return;
        setLoading(true);
        getPublicProfile(username)
            .then((res) => setProfile(res.data))
            .catch((err) => {
                if (err.response?.status === 404) setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f4f7f9]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#2149d8]"></div>
                    <p className="font-bold text-[#17254a]">Memuat profil...</p>
                </div>
            </div>
        );
    }

    if (notFound || !profile) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f4f7f9] px-4">
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-[#17254a] mb-2">Pengguna Tidak Ditemukan</h2>
                    <p className="text-slate-500 mb-6">Profil <span className="font-bold">@{username}</span> tidak tersedia.</p>
                    <Link href="/" className="inline-block bg-[#2149d8] hover:bg-[#1a38a6] text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-md">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    const isJastiper = profile.role === 'JASTIPER';

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#f4f7f9] to-[#eef4ff] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-100">
                    {/* Banner */}
                    <div className="relative bg-gradient-to-r from-[#2b44a8] to-[#1f3482] h-36">
                        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute -bottom-12 left-8">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200 shadow-md flex items-center justify-center text-4xl font-black text-slate-400">
                                {(profile.displayName ?? profile.username ?? '?').charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 px-8 pb-10">
                        {/* Name & badges */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-slate-100">
                            <div>
                                <h1 className="text-2xl font-black text-[#17254a]">{profile.displayName || profile.username}</h1>
                                <p className="text-slate-500 font-medium">@{profile.username}</p>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2149d8]">
                                    {ROLE_LABEL[profile.role] ?? profile.role}
                                </span>
                                {profile.kycStatus === 'APPROVED' && (
                                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${kycBadgeClass(profile.kycStatus)}`}>
                                        ✓ Terverifikasi
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                            <div className="mt-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Bio</p>
                                <p className="text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    {profile.bio}
                                </p>
                            </div>
                        )}

                        {/* Jastiper stats */}
                        {isJastiper && (
                            <div className="mt-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Statistik Jastiper</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {profile.totalProducts != null && (
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                                            <p className="text-2xl font-black text-[#2149d8]">{profile.totalProducts}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Total Produk</p>
                                        </div>
                                    )}
                                    {profile.totalOrders != null && (
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                                            <p className="text-2xl font-black text-[#2149d8]">{profile.totalOrders}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Total Pesanan</p>
                                        </div>
                                    )}
                                    {profile.rating != null && (
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                                            <p className="text-2xl font-black text-[#ffd457]">★ {Number(profile.rating).toFixed(1)}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Rating</p>
                                        </div>
                                    )}
                                    {profile.successRate != null && (
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                                            <p className="text-2xl font-black text-emerald-600">{profile.successRate}%</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Tingkat Sukses</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <Link
                                href="/inventory"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2149d8] hover:underline"
                            >
                                ← Kembali ke Katalog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
