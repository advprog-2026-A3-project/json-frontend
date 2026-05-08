// app/login/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, getProfileMe } from '@/utils/auth-api';
import { getTokenCookie, setTokenCookie, parseApiError } from '@/utils/axios';
import toast from 'react-hot-toast';

const ROLE_REDIRECT = { ADMIN: '/admin/users', JASTIPER: '/dashboard' };

const EMPTY_ERRORS = { email: '', password: '' };

function FieldError({ msg }) {
    if (!msg) return null;
    return <p className="mt-1.5 text-xs font-medium text-rose-600">{msg}</p>;
}

function inputCls(hasErr) {
    return `w-full rounded-md border px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:ring-4 ${
        hasErr
            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-100'
            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
    }`;
}

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(EMPTY_ERRORS);
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (getTokenCookie()) router.replace('/home');
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(EMPTY_ERRORS);
        setGlobalError('');

        try {
            const loginRes = await login(email, password);
            const token = loginRes.data.token;
            setTokenCookie(token);

            let role = null;
            try {
                const profileRes = await getProfileMe();
                role = profileRes.data.role;
                localStorage.setItem('userRole', role ?? '');
                localStorage.setItem('userKycStatus', profileRes.data.kycStatus ?? '');
            } catch {
                // profile fetch failed — fall through to /home
            }

            toast.success('Login Berhasil!');
            router.push(ROLE_REDIRECT[role] ?? '/home');
        } catch (err) {
            const { fieldErrors, globalMessage } = parseApiError(err);
            setErrors({ ...EMPTY_ERRORS, ...fieldErrors });
            if (globalMessage) {
                setGlobalError(globalMessage);
                toast.error(globalMessage);
            }
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

                    {globalError && (
                        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {globalError}
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
                                className={inputCls(!!errors.email)}
                            />
                            <FieldError msg={errors.email} />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Masukkan password"
                                className={inputCls(!!errors.password)}
                            />
                            <FieldError msg={errors.password} />
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
