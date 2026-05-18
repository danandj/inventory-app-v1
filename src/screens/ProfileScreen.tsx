import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../types/auth';
import { clearSession, getUser } from '../utils/session';

export default function ProfileScreen() {
    const router = useRouter();
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const user = await getUser();
        setProfile(user);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Yakin ingin keluar?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        // proses logout
                        await clearSession();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={24} color="#111827" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Profile</Text>

                <TouchableOpacity>
                    <Feather name="settings" size={24} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* PROFILE */}
                <View style={styles.profileContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{
                                uri: 'https://i.pravatar.cc/300',
                            }}
                            style={styles.avatar}
                        />

                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Feather name="edit-2" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>
                        {profile?.nama || 'Guest User'}
                    </Text>

                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>
                            {profile?.email || 'Guest User'}
                        </Text>
                    </View>

                    <Text style={styles.employeeId}>
                        Username: @{profile?.username || 'Guest User'}
                    </Text>
                </View>

                {/* ACCOUNT ACTION */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        ACCOUNT ACTIONS
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <View style={styles.logoutLeft}>
                        <View style={styles.logoutIconBox}>
                            <Feather
                                name="log-out"
                                size={22}
                                color="#EF4444"
                            />
                        </View>

                        <Text style={styles.logoutText}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },

    profileContainer: {
        alignItems: 'center',
        paddingVertical: 35,
    },

    avatarWrapper: {
        position: 'relative',
        marginBottom: 20,
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#2563EB',
    },

    editAvatarButton: {
        position: 'absolute',
        bottom: 8,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },

    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 10,
    },

    roleBadge: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 14,
    },

    roleText: {
        color: '#2563EB',
        fontSize: 16,
        fontWeight: '700',
    },

    employeeId: {
        fontSize: 16,
        color: '#9CA3AF',
        fontWeight: '600',
    },

    menuContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },

    menuItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    menuIconBox: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    menuText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },

    sectionHeader: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6B7280',
        letterSpacing: 1,
    },

    logoutButton: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 18,
        padding: 18,
    },

    logoutLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoutIconBox: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#FEF2F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    logoutText: {
        color: '#EF4444',
        fontSize: 20,
        fontWeight: '700',
    },
});