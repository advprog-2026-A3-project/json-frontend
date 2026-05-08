// app/register/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/utils/auth-api';
import { getTokenCookie } from '@/utils/axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useEffect } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (getTokenCookie()) {
            router.replace('/home');
        }
    }, [router]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await register({ name, email, password });

            setIsSuccess(true);
            toast.success('Berhasil membuat akun! Silakan Login.');

            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message
                || (err.code === 'ERR_NETWORK' ? 'Ada masalah saat menghubungi server.' : 'Gagal mendaftar. Periksa kembali data Anda.');
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-72px)] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <section className="rounded-lg border border-blue-100 bg-white p-8 shadow-[0_18px_45px_rgba(24,51,122,0.08)] sm:p-10">
                    <h2 className="text-center text-4xl font-black text-slate-950">Bergabung JSON</h2>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-500">Buat akun baru untuk mulai menggunakan aplikasi.</p>

                    {error && <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}
                    {isSuccess && <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Pendaftaran berhasil! Mengalihkan ke halaman Login...</div>}

                    <form onSubmit={handleRegister} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="johndoe"
                                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="john@mail.com"
                                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Min. 8 karakter"
                                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_24px_rgba(33,73,216,0.2)] transition-all hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>

                        <p className="mt-6 text-center text-sm font-medium text-slate-600">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline">
                                Masuk di sini
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
}
