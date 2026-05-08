'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenCookie, clearTokenCookie } from '@/utils/axios';
import { getProfileMe } from '@/utils/auth-api';

/**
 * @param {{ requireAuth?: boolean, requireRole?: string }} options
 */
export function useAuth({ requireAuth = false, requireRole = null } = {}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(() => {
        clearTokenCookie();
        localStorage.removeItem('userRole');
        localStorage.removeItem('userKycStatus');
        router.push('/login');
    }, [router]);

    const refetch = useCallback(async () => {
        try {
            const res = await getProfileMe();
            setUser(res.data);
            localStorage.setItem('userRole', res.data.role ?? '');
            localStorage.setItem('userKycStatus', res.data.kycStatus ?? '');
            return res.data;
        } catch {
            return null;
        }
    }, []);

    useEffect(() => {
        if (!getTokenCookie()) {
            setLoading(false);
            if (requireAuth) router.push('/login');
            return;
        }

        getProfileMe()
            .then((res) => {
                setUser(res.data);
                localStorage.setItem('userRole', res.data.role ?? '');
                localStorage.setItem('userKycStatus', res.data.kycStatus ?? '');
                if (requireRole && res.data.role !== requireRole) {
                    router.push('/home');
                }
            })
            .catch(() => {
                if (requireAuth) router.push('/login');
            })
            .finally(() => setLoading(false));
    }, [requireAuth, requireRole, router]);

    return {
        user,
        loading,
        logout,
        refetch,
        isAuthenticated: !!getTokenCookie(),
    };
}
