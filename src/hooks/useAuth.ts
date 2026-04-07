import { useState } from 'react';
import { login, register } from '../services/authService';
import { User } from '../types/auth';

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await login(username, password);

            setUser(res.data.user);
            setToken(res.data.token);
            return { success: true, message: res.message };
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan');
            return { success: false, message: err.message || 'Terjadi kesalahan' };
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username: string, email: string, nama: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await register(username, email, nama, password);

            setUser({
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
                nama: res.data.nama,
            });
            setToken(res.data.token);

            return { success: true, message: res.message };
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan');
            return { success: false, message: err.message || 'Terjadi kesalahan' };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        user,
        token,
        error,
        handleLogin,
        handleRegister,
    };
}