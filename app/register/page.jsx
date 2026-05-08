// app/register/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/utils/auth-api';
import { getTokenCookie, parseApiError } from '@/utils/axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

const EMPTY_ERRORS = { name: '', email: '', password: '' };

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

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(EMPTY_ERRORS);
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (getTokenCookie()) router.replace('/home');
    }, [router]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(EMPTY_ERRORS);
        setGlobalError('');

        try {
            await register({ name, email, password });
            setIsSuccess(true);
            toast.success('Berhasil membuat akun! Silakan Login.');
            setTimeout(() => router.push('/login'), 1000);
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
                    <h2 className="text-center text-4xl font-black text-slate-950">Bergabung JSON</h2>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-500">Buat akun baru untuk mulai menggunakan aplikasi.</p>

                    {globalError && (
                        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                            {globalError}
                        </div>
                    )}
                    {isSuccess && (
                        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                            Pendaftaran berhasil! Mengalihkan ke halaman Login...
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="johndoe"
                                className={inputCls(!!errors.name)}
                            />
                            <FieldError msg={errors.name} />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="john@mail.com"
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
                                placeholder="Min. 8 karakter"
                                className={inputCls(!!errors.password)}
                            />
                            <FieldError msg={errors.password} />
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
