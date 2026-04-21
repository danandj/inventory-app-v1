import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useBarang from '../hooks/useBarang';

export default function DaftarBarangScreen() {
    const router = useRouter();
    const { data, loading, error, fetchDataBarang, deleteDataBarang } = useBarang();
    const [search, setSearch] = useState('');

    useFocusEffect(
        useCallback(() => {
            fetchDataBarang();
        }, [])
    );

    const filtered = data.filter(item =>
        item.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
        item.kode_barang.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusStokBarang = (stok: number) => {
        if (stok === 0) return { text: 'Habis', color: '#EF4444' };
        if (stok < 10) return { text: 'Stok Menipis', color: '#F59E0B' };
        return { text: 'Tersedia', color: '#10B981' };
    };

    const renderItem = ({ item }: any) => {
        const status = getStatusStokBarang(item.stok);

        return (
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <Text style={styles.kode}>KODE BARANG</Text>
                    <Text style={[styles.status, { color: status.color }]}>
                        {status.text}
                    </Text>
                </View>

                <Text style={styles.kodeValue}>{item.kode_barang}</Text>
                <Text style={styles.nama}>{item.nama_barang}</Text>

                <View style={styles.rowBetween}>
                    <Text style={styles.stok}>Stok: {item.stok}</Text>
                    <Text style={styles.harga}>
                        Rp {parseInt(item.harga).toLocaleString()}
                    </Text>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEdit(item)}
                    >
                        <Feather name="edit" size={16} color="#fff" />
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item)}
                    >
                        <Feather name="trash" size={16} color="#fff" />
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleAdd = () => {
        router.push('/formbarang')
    };

    const handleEdit = (item: any) => {
        router.push({
            pathname: '/formbarang',
            params: { kode: item.kode_barang }
        });
    };

    const handleRefresh = async () => {
        setSearch('');
        await fetchDataBarang();
    };

    const handleDelete = (item: any) => {
        Alert.alert(
            'Hapus',
            `Yakin ingin menghapus ${item.nama_barang}?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        const res = await deleteDataBarang(item.kode_barang);
                        if (res.success) {
                            await fetchDataBarang();
                            Alert.alert('Sukses', res.message);
                        } else {
                            Alert.alert('Gagal', res.message);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Feather name="menu" size={24} color="#111" />
                <Text style={styles.headerTitle}>Daftar Barang</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                    <Feather name="refresh-cw" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
                <Feather name="search" size={18} color="#9CA3AF" />
                <TextInput
                    placeholder="Cari kode atau nama barang..."
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}

            {error && (
                <View style={styles.loadingContainer}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </View>
            )}

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshing={false}
                onRefresh={handleRefresh}
            />

            <TouchableOpacity style={styles.fab} onPress={handleAdd}>
                <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        gap: 10,
    },
    refreshButton: {
        backgroundColor: '#03bb40ff',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    editButton: {
        flexDirection: 'row',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },

    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#EF4444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: '#2563EB',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    kode: {
        fontSize: 12,
        color: '#6B7280',
    },
    kodeValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nama: {
        marginVertical: 5,
        color: '#374151',
    },
    stok: {
        color: '#6B7280',
    },
    harga: {
        fontWeight: 'bold',
        color: '#2563EB',
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});