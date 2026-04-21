import { BASE_URL } from '../constants/api';
import { Barang } from '../types/barang';

export const getBarang = async (): Promise<Barang[]> => {
    const res = await fetch(`${BASE_URL}/api/barang`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.data;
};

export const createBarang = async (payload: {
    kode_barang: string;
    nama_barang: string;
    stok: number;
    harga: string;
}) => {
    const res = await fetch(`${BASE_URL}/api/barang`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
};

export const deleteBarang = async (kode_barang: string) => {
    const res = await fetch(`${BASE_URL}/api/barang/${kode_barang}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
};

export const getBarangByKode = async (kode: string) => {
    const res = await fetch(`${BASE_URL}/api/barang/${kode}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.data;
};

export const updateBarang = async (kode: string, payload: any) => {
    const res = await fetch(`${BASE_URL}/api/barang/${kode}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
};