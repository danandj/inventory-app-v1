import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useAuth from '../hooks/useAuth';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { handleLogin, loading, error } = useAuth();
    const router = useRouter();

    const onSubmit = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Semua kolom wajib diisi');
            return;
        }

        const res = await handleLogin(username, password);
        if (res.success) {
            Alert.alert('Sukses', res.message || 'Login berhasil', [
                { text: 'OK', onPress: () => router.push('/') }
            ]);
        } else {
            Alert.alert('Gagal', res.message || 'Terjadi kesalahan saat login');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../../assets/images/react-logo.png')}
                    style={{ width: 100, height: 100, alignSelf: 'center' }}
                />
                <Text style={styles.title}>Inventory APP</Text>
                <Text style={styles.subtitle}>Aplikasi manajemen kelola data barang</Text>

                <Text style={styles.welcome}>Selamat Datang</Text>
                <Text style={styles.desc}>Silahkan login menggunakan akun anda</Text>

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

                </View>

                {/* Error */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footer}>Belum punya akun? </Text>
                    <TouchableOpacity onPress={() => router.push('/register')}>
                        <Text style={[styles.footer, { color: '#2563EB', fontWeight: 'bold' }]}>Daftar Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 20,
    },
    welcome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    desc: {
        color: '#6B7280',
        marginBottom: 15,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
    },
    formContainer: {
        width: '100%',
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
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    eyeIcon: {
        padding: 4,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    footer: {
        color: '#6B7280',
    },
});