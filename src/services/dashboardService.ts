import { BASE_URL } from '../constants/api';

export const getDashboard = async () => {
    const res = await fetch(`${BASE_URL}/api/dashboard/statistik-barang`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json.statistik;
};