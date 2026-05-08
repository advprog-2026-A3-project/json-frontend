'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminGetAllUsers, adminValidateKYC, adminUpdateUserStatus } from '@/utils/auth-api';
import toast from 'react-hot-toast';

const PAGE_SIZE = 20;

function kycBadgeClass(status) {
    if (status === 'APPROVED') return 'bg-emerald-100 text-emerald-700';
    if (status === 'PENDING') return 'bg-amber-100 text-amber-700';
    if (status === 'REJECTED') return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-600';
}

function statusBadgeClass(status) {
    if (status === 'ACTIVE') return 'bg-emerald-100 text-emerald-700';
    if (status === 'BANNED') return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-600';
}

export default function AdminUsersPage() {
    const { loading: authLoading } = useAuth({ requireAuth: true, requireRole: 'ADMIN' });

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null); // userId being actioned

    const fetchUsers = useCallback(async (pageNum) => {
        setFetchLoading(true);
        try {
            const res = await adminGetAllUsers({ page: pageNum, size: PAGE_SIZE });
            const body = res.data;
            // Support both paginated { content, totalPages } and plain array responses
            if (Array.isArray(body)) {
                setUsers(body);
                setTotalPages(1);
            } else {
                setUsers(body.content ?? body.data ?? []);
                setTotalPages(body.totalPages ?? 1);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memuat daftar pengguna.');
        } finally {
            setFetchLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading) fetchUsers(page);
    }, [authLoading, page, fetchUsers]);

    const handleKYC = async (userId, status) => {
        setActionLoading(`kyc-${userId}`);
        try {
            await adminValidateKYC(userId, status);
            toast.success(`KYC ${status === 'APPROVED' ? 'disetujui' : 'ditolak'}`);
            fetchUsers(page);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memvalidasi KYC.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        setActionLoading(`status-${userId}`);
        try {
            await adminUpdateUserStatus(userId, newStatus);
            toast.success(`Pengguna berhasil di${newStatus === 'BANNED' ? 'ban' : 'unban'}`);
            fetchUsers(page);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memperbarui status pengguna.');
        } finally {
            setActionLoading(null);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f4f7f9]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#2149d8]"></div>
                    <p className="font-bold text-[#17254a]">Memuat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#f4f7f9] to-[#eef4ff] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-[#17254a]">Manajemen Pengguna</h1>
                    <p className="text-slate-500 mt-1">Kelola semua pengguna, validasi KYC, dan status akun.</p>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    {fetchLoading ? (
                        <div className="py-20 flex justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-[#2149d8]"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 font-medium">Tidak ada pengguna ditemukan.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">Pengguna</th>
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">Email</th>
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">Role</th>
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">KYC</th>
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">Status</th>
                                        <th className="text-left px-6 py-4 font-bold text-xs uppercase tracking-widest text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {users.map((u) => (
                                        <tr key={u.userId ?? u.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#2b44a8] to-[#4f6fda] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {(u.displayName ?? u.username ?? '?').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#17254a]">{u.displayName || u.username}</p>
                                                        <p className="text-xs text-slate-400">@{u.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2149d8] border border-blue-200 uppercase tracking-wide">
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${kycBadgeClass(u.kycStatus)}`}>
                                                    {u.kycStatus ?? '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusBadgeClass(u.status ?? u.accountStatus)}`}>
                                                    {u.status ?? u.accountStatus ?? 'ACTIVE'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {/* KYC actions — only for PENDING */}
                                                    {u.kycStatus === 'PENDING' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleKYC(u.userId ?? u.id, 'APPROVED')}
                                                                disabled={actionLoading === `kyc-${u.userId ?? u.id}`}
                                                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs px-3 py-1.5 transition-colors disabled:opacity-50"
                                                            >
                                                                {actionLoading === `kyc-${u.userId ?? u.id}` ? (
                                                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                                                                ) : '✓'} Setujui
                                                            </button>
                                                            <button
                                                                onClick={() => handleKYC(u.userId ?? u.id, 'REJECTED')}
                                                                disabled={actionLoading === `kyc-${u.userId ?? u.id}`}
                                                                className="inline-flex items-center gap-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-semibold text-xs px-3 py-1.5 transition-colors disabled:opacity-50"
                                                            >
                                                                ✕ Tolak
                                                            </button>
                                                        </>
                                                    )}
                                                    {/* Ban / Unban — skip for admin accounts */}
                                                    {u.role !== 'ADMIN' && (
                                                        <button
                                                            onClick={() => handleStatusToggle(u.userId ?? u.id, u.status ?? u.accountStatus ?? 'ACTIVE')}
                                                            disabled={actionLoading === `status-${u.userId ?? u.id}`}
                                                            className={`inline-flex items-center gap-1 rounded-lg border font-semibold text-xs px-3 py-1.5 transition-colors disabled:opacity-50 ${
                                                                (u.status ?? u.accountStatus) === 'BANNED'
                                                                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                                                    : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700'
                                                            }`}
                                                        >
                                                            {actionLoading === `status-${u.userId ?? u.id}` ? (
                                                                <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                            ) : null}
                                                            {(u.status ?? u.accountStatus) === 'BANNED' ? 'Unban' : 'Ban'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                            <p className="text-sm text-slate-500">Halaman {page + 1} dari {totalPages}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0 || fetchLoading}
                                    className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                                >
                                    ← Sebelumnya
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1 || fetchLoading}
                                    className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                                >
                                    Berikutnya →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
