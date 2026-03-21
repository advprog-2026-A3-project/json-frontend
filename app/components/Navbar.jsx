// app/components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mengecek apakah user sudah login (punya token) setiap kali pindah halaman
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Nama Aplikasi */}
                    <div className="flex-shrink-0 font-extrabold text-xl tracking-wider">
                        <Link href="/">
                            JASTIP<span className="text-yellow-400">JSON</span>
                        </Link>
                    </div>

                    {/* Menu Navigasi */}
                    <div className="flex space-x-4 items-center">
                        {isLoggedIn ? (
                            <>
                                <Link href="/profile" className="hover:text-yellow-300 font-medium px-3 py-2 rounded-md transition-colors">
                                    Profil Saya
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-4 rounded text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-yellow-300 font-medium px-3 py-2 rounded-md transition-colors">
                                    Masuk
                                </Link>
                                <Link href="/register" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-1.5 px-4 rounded text-sm transition-colors">
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