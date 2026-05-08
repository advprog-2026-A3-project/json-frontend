// app/login/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, getProfileMe } from '@/utils/auth-api';
import { getTokenCookie, setTokenCookie } from '@/utils/axios';
import toast from 'react-hot-toast';

const ROLE_REDIRECT = {
    ADMIN: '/admin/users',
    JASTIPER: '/dashboard',
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (getTokenCookie()) {
            router.replace('/home');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const loginRes = await login(email, password);
            const token = loginRes.data.token;

            setTokenCookie(token);

            let role = null;
            let kycStatus = null;
            try {
                const profileRes = await getProfileMe();
                role = profileRes.data.role;
                kycStatus = profileRes.data.kycStatus;
                localStorage.setItem('userRole', role ?? '');
                localStorage.setItem('userKycStatus', kycStatus ?? '');
            } catch {
                // profile fetch failed; redirect to home as fallback
            }

            toast.success('Login Berhasil!');
            router.push(ROLE_REDIRECT[role] ?? '/home');
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message ||
                (err.code === 'ERR_NETWORK'
                    ? 'Ada masalah saat menghubungi server.'
                    : 'Gagal login. Periksa email dan password.');
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
                    <h2 className="text-center text-3xl font-black text-slate-950">Login JSON</h2>
                    <p className="mt-2 text-center text-sm leading-6 text-slate-500">Masuk ke akun yang sudah terdaftar.</p>

                    {error && (
                        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="nama@email.com"
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
                                placeholder="Masukkan password"
                                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_24px_rgba(33,73,216,0.2)] transition-all hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? 'Memproses...' : 'Masuk'}
                        </button>

                        <p className="mt-6 text-center text-sm font-medium text-slate-600">
                            Belum punya akun?{' '}
                            <Link href="/register" className="font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline">
                                Daftar sekarang
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
}
