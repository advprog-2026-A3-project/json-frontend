// app/components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className="sticky top-0 z-40 border-b border-[#1f3482] bg-[#2b44a8] text-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between">
                    <div className="flex-shrink-0 text-xl font-extrabold tracking-tight sm:text-2xl">
                        <Link href="/">
                            <span className="text-white">JASTIP</span>
                            <span className="text-[#ffd54a]">JSON</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {isLoggedIn ? (
                            <>
                                <Link href="/profile" className="rounded-md px-3 py-2 text-sm font-semibold tracking-tight transition-colors hover:bg-white/10 hover:text-white sm:text-[15px]" style={{ color: "#e9efff" }}>
                                    Profil Saya
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-white/14 px-4 py-2 text-sm font-semibold tracking-tight transition-colors hover:bg-white/20 hover:text-white sm:text-[15px]"
                                    style={{ color: "#f8fbff" }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="rounded-md px-3 py-2 text-sm font-semibold tracking-tight transition-colors hover:bg-white/10 hover:text-white sm:text-[15px]" style={{ color: "#dbe6ff" }}>
                                    Masuk
                                </Link>
                                <Link href="/register" className="min-w-24 rounded-md border border-[#f0c13e] bg-[#ffd457] px-4 py-2 text-center text-sm font-bold tracking-tight shadow-[0_6px_16px_rgba(255,213,74,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#ffcf43] hover:text-[#17254a] sm:text-[15px]" style={{ color: "#21315f" }}>
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
