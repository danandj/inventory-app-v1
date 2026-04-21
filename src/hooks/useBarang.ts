import { useEffect, useState } from 'react';
import { createBarang, deleteBarang, getBarang, getBarangByKode, updateBarang } from '../services/barangService';
import { Barang } from '../types/barang';

export default function useBarang() {
    const [data, setData] = useState<Barang[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDataBarang = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getBarang();
            setData(res);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createDataBarang = async (payload: {
        kode_barang: string;
        nama_barang: string;
        stok: number;
        harga: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const res = await createBarang(payload);
            return { success: true, message: res.message };
        } catch (err: any) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteDataBarang = async (kode_barang: string) => {
        try {
            setLoading(true);
            setError(null);
            const res = await deleteBarang(kode_barang);
            return { success: true, message: res.message };
        } catch (err: any) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const getDetailBarang = async (kode_barang: string) => {
        try {
            setLoading(true);
            const res = await getBarangByKode(kode_barang);
            return { success: true, data: res };
        } catch (err: any) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateDataBarang = async (kode_barang: string, payload: any) => {
        try {
            setLoading(true);
            const res = await updateBarang(kode_barang, payload);
            return { success: true, message: res.message };
        } catch (err: any) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataBarang();
    }, []);


    return {
        data,
        loading,
        error,
        fetchDataBarang,
        createDataBarang,
        deleteDataBarang,
        getDetailBarang,
        updateDataBarang
    };
}
