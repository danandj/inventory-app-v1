import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import useBarang from '../hooks/useBarang';

export default function FormBarangScreen() {
    const router = useRouter();
    const { kode: kodeParam } = useLocalSearchParams();
    const { createDataBarang, updateDataBarang, getDetailBarang, loading } = useBarang();

    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');

    useEffect(() => {
        if (kodeParam) {
            loadDetail();
        }
    }, [kodeParam]);

    const loadDetail = async () => {
        const res = await getDetailBarang(kodeParam as string);
        if (res.success) {
            setKode(res.data.kode_barang);
            setNama(res.data.nama_barang);
            setStok(String(res.data.stok));
            setHarga(res.data.harga);
        } else {
            Alert.alert('Error', res.message);
        }
    };

    const handleSubmit = async () => {
        if (!kode || !nama || !stok || !harga) {
            Alert.alert('Gagal', 'Semua field wajib diisi');
            return;
        }

        let res;

        if (kodeParam) {
            // UPDATE
            res = await updateDataBarang(kodeParam as string, {
                kode_barang: kode,
                nama_barang: nama,
                stok: Number(stok),
                harga: harga,
            });
        } else {
            // CREATE
            res = await createDataBarang({
                kode_barang: kode,
                nama_barang: nama,
                stok: Number(stok),
                harga: harga,
            });
        }

        if (res.success) {
            Alert.alert('Sukses', res.message, [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } else {
            Alert.alert('Gagal', res.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="#2563EB" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {kodeParam ? 'Tambah / Edit Barang' : 'Tambah Barang'}
                    </Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.formContainer}>

                    {/* KODE BARANG */}
                    <Text style={styles.label}>KODE BARANG</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="hash" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="B001"
                            placeholderTextColor="#9CA3AF"
                            value={kode}
                            onChangeText={setKode}
                        />
                    </View>

                    {/* NAMA BARANG */}
                    <Text style={styles.label}>NAMA BARANG</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="box" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nama barang"
                            placeholderTextColor="#9CA3AF"
                            value={nama}
                            onChangeText={setNama}
                        />
                    </View>

                    {/* STOK */}
                    <Text style={styles.label}>STOK</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="layers" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={stok}
                            onChangeText={setStok}
                        />
                    </View>

                    {/* HARGA */}
                    <Text style={styles.label}>HARGA</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="dollar-sign" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="10000"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={harga}
                            onChangeText={setHarga}
                        />
                    </View>

                    {/* BUTTON SAVE */}
                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Loading...' : 'Simpan Barang'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6B7280',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 12,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#111827',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#2563EB',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});