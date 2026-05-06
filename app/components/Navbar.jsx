// app/components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import toast from 'react-hot-toast';

function subscribe(callback) {
    window.addEventListener('storage', callback);
    window.addEventListener('focus', callback);

    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('focus', callback);
    };
}

function getSnapshot() {
    if (typeof window === 'undefined') {
        return false;
    }

    return !!localStorage.getItem('token');
}

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, () => false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const navLinks = [
        { name: 'Beranda', path: '/home' },
        { name: 'Katalog', path: '/katalog' },
        { name: 'Promo', path: '/voucher' },
        { name: 'Pesanan', path: '/pesanan' },
    ];

    return (
        <nav className="sticky top-0 z-40 border-b border-[#1f3482] bg-[#2b44a8] text-white shadow-sm">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6 lg:gap-10">
                        <div className="flex-shrink-0 text-xl font-extrabold tracking-tight sm:text-2xl">
                            <Link href={isLoggedIn ? "/home" : "/"}>
                                <span className="text-white">JASTIP</span>
                                <span className="text-[#ffd54a]">JSON</span>
                            </Link>
                        </div>

                        {/* Navigation Links (Desktop) */}
                        <div className="hidden md:flex items-center gap-5 lg:gap-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={isLoggedIn ? link.path : "/login"}
                                    onClick={(e) => {
                                        if (!isLoggedIn) {
                                            e.preventDefault();
                                            toast.error("Silakan login terlebih dahulu untuk mengakses menu ini.");
                                            router.push('/login');
                                        }
                                    }}
                                    className={`text-sm font-semibold transition-colors hover:text-[#ffd54a] ${pathname === link.path ? 'text-[#ffd54a]' : 'text-blue-100'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-2 sm:gap-4 animate-[fadeIn_0.5s_ease-out]">
                                <Link 
                                    href="/profile" 
                                    className="group flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-1.5 transition-all duration-300 hover:bg-white/10 hover:border-[#ffd54a]/50"
                                >
                                    <svg className="w-4 h-4 text-blue-100 transition-colors group-hover:text-[#ffd54a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span className="text-sm font-semibold text-white transition-colors group-hover:text-[#ffd54a]">Profil Saya</span>
                                </Link>
                                
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg border border-white/20 bg-transparent px-4 py-1.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-500"
                                >
                                    Logout
                                </button>
                            </div>
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
