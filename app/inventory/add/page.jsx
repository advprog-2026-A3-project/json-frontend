'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { createProduct } from '@/utils/inventory-api';
import axiosInstance from '@/utils/axios';

const INITIAL_FORM = {
    nama: '',
    deskripsi: '',
    harga: '',
    stok: '',
    negaraAsal: '',
    tanggalPembelian: '',
    tanggalKembali: '',
};

export default function AddProductPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [form, setForm] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        axiosInstance.get('/api/profile/me')
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            })
            .finally(() => setAuthLoading(false));
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSubmitting(true);

        const payload = {
            nama: form.nama,
            deskripsi: form.deskripsi,
            harga: Number(form.harga),
            stok: Number(form.stok),
            negaraAsal: form.negaraAsal,
            tanggalPembelian: form.tanggalPembelian,
            tanggalKembali: form.tanggalKembali,
        };

        try {
            await createProduct(payload);
            setSuccess('Produk berhasil ditambahkan!');
            setForm(INITIAL_FORM);
            setTimeout(() => router.push('/inventory'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menambahkan produk. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#2149d8]"></div>
                    <p className="font-bold text-[#17254a]">Memuat...</p>
                </div>
            </div>
        );
    }

    if (user?.role !== 'JASTIPER') {
        return (
            <div className="min-h-screen bg-[#f4f7f9]">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
                    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 max-w-md w-full text-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-[#17254a] mb-2">Akses Ditolak</h2>
                        <p className="text-slate-500 mb-6">Halaman ini hanya dapat diakses oleh Jastiper. Role kamu saat ini: <span className="font-bold text-[#2149d8]">{user?.role || '-'}</span></p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-[#2149d8] hover:bg-[#1a38a6] text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-md"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f4f7f9] to-[#eef4ff]">
            <Navbar />

            <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/inventory')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#2149d8] transition-colors mb-4"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Katalog
                    </button>
                    <h1 className="text-3xl font-black text-[#17254a]">Tambah Produk Baru</h1>
                    <p className="text-slate-500 mt-1">Lengkapi informasi produk yang akan kamu jastip</p>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                Nama Produk <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleChange}
                                required
                                placeholder="Contoh: Sepatu Nike Air Max"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                name="deskripsi"
                                value={form.deskripsi}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Jelaskan produk secara singkat..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium resize-none"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                    Harga (IDR) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="harga"
                                    value={form.harga}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                    Stok <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stok"
                                    value={form.stok}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                Negara Asal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="negaraAsal"
                                value={form.negaraAsal}
                                onChange={handleChange}
                                required
                                placeholder="Contoh: Jepang"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                    Tanggal Pembelian <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="tanggalPembelian"
                                    value={form.tanggalPembelian}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                    Tanggal Kembali <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="tanggalKembali"
                                    value={form.tanggalKembali}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#2149d8] hover:bg-[#1a38a6] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                {submitting && (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></div>
                                )}
                                {submitting ? 'Menyimpan...' : 'Tambah Produk'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/inventory')}
                                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-8 rounded-full transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
