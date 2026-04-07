import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useAuth from '../hooks/useAuth';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleRegister, loading, error } = useAuth();
    const router = useRouter();

    const onSubmit = async () => {
        if (!username || !nama || !email || !password || !konfirmasiPassword) {
            Alert.alert('Error', 'Semua kolom wajib diisi');
            return;
        }

        if (password !== konfirmasiPassword) {
            Alert.alert('Error', 'Password dan Konfirmasi Password tidak cocok');
            return;
        }

        const res = await handleRegister(username, email, nama, password);
        if (res.success) {
            Alert.alert('Sukses', res.message || 'Registrasi berhasil', [
                { text: 'OK', onPress: () => router.push('/') }
            ]);
        } else {
            Alert.alert('Gagal', res.message || 'Terjadi kesalahan saat registrasi');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#2563EB" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buat Akun Baru</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>USERNAME</Text>
                <View style={styles.inputContainer}>
                    <Feather name="user" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukan username"
                        placeholderTextColor="#9CA3AF"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                <Text style={styles.label}>NAMA LENGKAP</Text>
                <View style={styles.inputContainer}>
                    <Feather name="target" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukan nama lengkap"
                        placeholderTextColor="#9CA3AF"
                        value={nama}
                        onChangeText={setNama}
                    />
                </View>

                <Text style={styles.label}>EMAIL</Text>
                <View style={styles.inputContainer}>
                    <Feather name="mail" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukan email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.inputContainer}>
                    <Feather name="lock" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukan password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>KONFIRMASI PASSWORD</Text>
                <View style={styles.inputContainer}>
                    <Feather name="lock" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Konfirmasi password"
                        placeholderTextColor="#9CA3AF"
                        value={konfirmasiPassword}
                        onChangeText={setKonfirmasiPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'Daftar Sekarang'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Sudah punya akun? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.loginText}>Login Disini</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    eyeIcon: {
        padding: 4,
    },
    errorText: {
        color: '#EF4444',
        marginBottom: 16,
        textAlign: 'center',
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
        letterSpacing: 0.5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 14,
    },
    loginText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
