// app/register/page.jsx
'use client'; // Wajib untuk interaksi user

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios'; // Import axios instance yang hardcode port 8081
import Link from 'next/link'; // Untuk navigasi balik ke login tanpa reload

export default function RegisterPage() {
    const [name, setName] = useState(''); // Tambahan field Nama
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // State baru untuk tanda sukses

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Tembak ke endpoint /api/auth/register di Spring Boot (port 8081)
            // PASTIKAN nama field (name, email, password) di bawah ini
            // persis sama dengan RegisterRequest DTO di Spring Boot-mu!
            await axiosInstance.post('/api/auth/register', {
                name: name,
                email: email,
                password: password
            });

            // Jika sukses, ubah state
            setIsSuccess(true);
            alert('Pendaftaran Berhasil! Silakan Login.');

            // Redirect user ke halaman login setelah 1 detik
            setTimeout(() => {
                router.push('/login');
            }, 1000);

        } catch (err) {
            console.error(err);
            // Menangkap pesan error dari backend (misal: Email sudah terdaftar)
            setError(err.response?.data?.message || 'Gagal mendaftar. Periksa kembali data Anda.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-900">Bergabung JSON</h2>
                <p className="text-gray-500 text-center mb-8 text-sm">Lengkapi data untuk mulai jastip.</p>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-5 text-sm font-medium">{error}</div>}

                {isSuccess && <div className="bg-green-100 text-green-700 p-3 rounded mb-5 text-sm font-medium">Pendaftaran berhasil! Mengalihkan ke halaman Login...</div>}

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Field Nama Lengkap */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Contoh: Marvel Aris"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-300"
                        />
                    </div>

                    {/* Field Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Jastip</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="marvel@ui.ac.id"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-300"
                        />
                    </div>

                    {/* Field Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Min. 8 karakter"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || isSuccess}
                        className="w-full bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow"
                    >
                        {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600 border-t pt-5">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                        Masuk di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}