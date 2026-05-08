'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateProfileMe, submitKYC } from '@/utils/auth-api';
import toast from 'react-hot-toast';

const KYC_INITIAL = { nik: '', fullName: '', dateOfBirth: '', address: '' };

const ROLE_LABEL = { ADMIN: 'Admin', JASTIPER: 'Jastiper', TITIPERS: 'Titipers' };

function kycBadge(status) {
    if (status === 'APPROVED') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'PENDING') return 'border-amber-200 bg-amber-50 text-amber-700';
    if (status === 'REJECTED') return 'border-red-200 bg-red-50 text-red-700';
    return 'border-slate-200 bg-slate-50 text-slate-600';
}

export default function ProfilePage() {
    const { user, loading, logout, refetch } = useAuth({ requireAuth: true });

    // Edit modal state
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({ username: '', displayName: '', phoneNumber: '', bio: '' });
    const [editLoading, setEditLoading] = useState(false);

    // KYC form state
    const [kycForm, setKycForm] = useState(KYC_INITIAL);
    const [kycLoading, setKycLoading] = useState(false);
    const [kycOpen, setKycOpen] = useState(false);

    const openEdit = () => {
        setEditForm({
            username: user?.username ?? '',
            displayName: user?.displayName ?? '',
            phoneNumber: user?.phoneNumber ?? '',
            bio: user?.bio ?? '',
        });
        setEditOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            await updateProfileMe(editForm);
            await refetch();
            setEditOpen(false);
            toast.success('Profil berhasil diperbarui!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memperbarui profil.');
        } finally {
            setEditLoading(false);
        }
    };

    const handleKycSubmit = async (e) => {
        e.preventDefault();
        setKycLoading(true);
        try {
            await submitKYC(kycForm);
            await refetch();
            setKycOpen(false);
            setKycForm(KYC_INITIAL);
            toast.success('Pengajuan KYC berhasil dikirim!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal mengirim KYC.');
        } finally {
            setKycLoading(false);
        }
    };

    const canSubmitKYC =
        user &&
        user.role !== 'ADMIN' &&
        user.role !== 'JASTIPER' &&
        user.kycStatus !== 'APPROVED' &&
        user.kycStatus !== 'PENDING';

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

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#f4f7f9] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Profile Card */}
                <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-100">
                    {/* Banner */}
                    <div className="relative bg-gradient-to-r from-[#2b44a8] to-[#1f3482] h-40">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <div className="absolute -bottom-12 left-8 sm:left-10">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200 shadow-md flex items-center justify-center text-4xl font-black text-slate-400">
                                {user?.displayName?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || '?'}
                            </div>
                        </div>
                        <div className="absolute bottom-6 right-8 sm:right-10 flex gap-2">
                            <button
                                onClick={openEdit}
                                className="bg-[#ffd457] hover:bg-[#ffcf43] text-[#17254a] font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-md hover:-translate-y-0.5"
                            >
                                Edit Profil
                            </button>
                        </div>
                    </div>

                    <div className="pt-16 px-8 sm:px-10 pb-10 space-y-6">
                        {/* Name & badges */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-6">
                            <div>
                                <h1 className="text-2xl font-black text-[#17254a]">{user?.displayName || '-'}</h1>
                                <p className="text-slate-500 font-medium">@{user?.username}</p>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2149d8]">
                                    {ROLE_LABEL[user?.role] ?? user?.role}
                                </span>
                                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${kycBadge(user?.kycStatus)}`}>
                                    KYC: {user?.kycStatus ?? 'BELUM'}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid sm:grid-cols-2 gap-8 pt-2">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Email</p>
                                <p className="text-base font-medium text-slate-800">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Nomor HP</p>
                                <p className="text-base font-medium text-slate-800">{user?.phoneNumber || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Bio</p>
                                <p className="text-base text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    {user?.bio || <span className="text-slate-400 italic">Belum ada bio</span>}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-6">
                            {canSubmitKYC && (
                                <button
                                    onClick={() => setKycOpen(true)}
                                    className="bg-[#2149d8] hover:bg-[#1a38a6] text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-md text-sm"
                                >
                                    Ajukan Verifikasi KYC
                                </button>
                            )}
                            {user?.kycStatus === 'PENDING' && (
                                <span className="text-sm text-amber-600 font-medium">KYC sedang diproses...</span>
                            )}
                            <button
                                onClick={logout}
                                className="ml-auto flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold transition-colors px-4 py-2 hover:bg-rose-50 rounded-lg text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-1.048a.75.75 0 1 0-1.06-1.06l-2.25 2.25a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-1.048-1.048h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                                </svg>
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Edit Profile Modal ── */}
            {editOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditOpen(false)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-slate-100">
                        <h2 className="text-xl font-black text-[#17254a] mb-6">Edit Informasi Profil</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={editForm.displayName}
                                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nomor HP</label>
                                <input
                                    type="text"
                                    value={editForm.phoneNumber}
                                    onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Bio</label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium resize-none"
                                    placeholder="Ceritakan sedikit tentang dirimu..."
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="flex-1 bg-[#2149d8] hover:bg-[#1a38a6] disabled:opacity-60 text-white font-bold py-2.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    {editLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                                    {editLoading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditOpen(false)}
                                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-full transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── KYC Submission Modal ── */}
            {kycOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setKycOpen(false)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-slate-100">
                        <h2 className="text-xl font-black text-[#17254a] mb-2">Verifikasi Identitas (KYC)</h2>
                        <p className="text-sm text-slate-500 mb-6">Lengkapi data identitas sesuai kartu tanda pengenal resmi Anda.</p>
                        <form onSubmit={handleKycSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">NIK <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={kycForm.nik}
                                    onChange={(e) => setKycForm({ ...kycForm, nik: e.target.value })}
                                    required
                                    maxLength={16}
                                    placeholder="16 digit NIK"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={kycForm.fullName}
                                    onChange={(e) => setKycForm({ ...kycForm, fullName: e.target.value })}
                                    required
                                    placeholder="Sesuai KTP"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Tanggal Lahir <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={kycForm.dateOfBirth}
                                    onChange={(e) => setKycForm({ ...kycForm, dateOfBirth: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Alamat <span className="text-red-500">*</span></label>
                                <textarea
                                    value={kycForm.address}
                                    onChange={(e) => setKycForm({ ...kycForm, address: e.target.value })}
                                    required
                                    rows={2}
                                    placeholder="Alamat sesuai KTP"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2149d8] focus:ring-4 focus:ring-[#2149d8]/10 outline-none text-slate-800 transition-all font-medium resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={kycLoading}
                                    className="flex-1 bg-[#2149d8] hover:bg-[#1a38a6] disabled:opacity-60 text-white font-bold py-2.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    {kycLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                                    {kycLoading ? 'Mengirim...' : 'Kirim KYC'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setKycOpen(false)}
                                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-full transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
