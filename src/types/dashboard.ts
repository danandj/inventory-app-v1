import { Barang } from './barang';

export interface DashboardStatistik {
    total_jenis_barang: number;
    total_stok_keseluruhan: number;
    barang_paling_mahal: Barang;
    barang_paling_murah: Barang;
    total_barang_stok_habis: number;
    barang_stok_habis: Barang[];
    total_barang_hampir_habis: number;
    barang_hampir_habis: Barang[];
    barang_stok_terbanyak: Barang;
}