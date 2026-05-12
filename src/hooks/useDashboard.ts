import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import { DashboardStatistik } from '../types/dashboard';

export default function useDashboard() {
    const [statistik, setStatistik] = useState<DashboardStatistik | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await getDashboard();
            setStatistik(res);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return {
        statistik,
        loading,
        error,
        fetchDashboard,
    };
}