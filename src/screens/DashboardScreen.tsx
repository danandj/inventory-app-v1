import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDashboard from '../hooks/useDashboard';
import DaftarBarangScreen from './DaftarBarangScreen';

const Tab = createBottomTabNavigator();

function DashboardContent() {
    const { statistik, loading, error, fetchDashboard } = useDashboard();
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetchDashboard();
        }, [])
    );

    const formatRupiah = (number: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(number));
    };

    if (loading && !statistik) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Feather name="box" size={24} color="#2563EB" />
                </View>

                <Text style={styles.headerTitle}>Inventory App</Text>

                <TouchableOpacity style={styles.notificationButton}>
                    <Feather name="bell" size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchDashboard} />
                }
            >
                {/* SEARCH */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>
                        Hallo Selamat Datang
                    </Text>
                </View>

                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                {/* CARD TOTAL */}
                <View style={styles.totalCard}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.totalLabel}>Total Stok Keseluruhan</Text>

                        <Feather name="bar-chart-2" size={20} color="#BFDBFE" />
                    </View>

                    <Text style={styles.totalValue}>
                        {statistik?.total_stok_keseluruhan || 0}
                    </Text>

                    <Text style={styles.totalDesc}>
                        {statistik?.total_jenis_barang || 0} jenis barang tersedia
                    </Text>
                </View>

                {/* ALERT CARD */}
                <View style={styles.alertRow}>
                    <View style={styles.alertCard}>
                        <Feather
                            name="alert-triangle"
                            size={20}
                            color="#F59E0B"
                        />

                        <Text style={styles.alertTitle}>Hampir Habis</Text>

                        <Text style={styles.alertValue}>
                            {statistik?.total_barang_hampir_habis || 0}
                        </Text>
                    </View>

                    <View style={styles.criticalCard}>
                        <Feather name="x-circle" size={20} color="#EF4444" />

                        <Text style={styles.alertTitle}>Stok Habis</Text>

                        <Text style={styles.alertValue}>
                            {statistik?.total_barang_stok_habis || 0}
                        </Text>
                    </View>
                </View>

                {/* INSIGHTS */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ringkasan Barang</Text>
                </View>

                <View style={styles.insightCard}>
                    <View style={styles.insightLeft}>
                        <View style={[styles.insightIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Feather name="trending-up" size={20} color="#2563EB" />
                        </View>
                        <View style={styles.insightTextContainer}>
                            <Text style={styles.insightTitle}>Paling Mahal</Text>
                            <Text style={styles.insightSubtitle} numberOfLines={1}>{statistik?.barang_paling_mahal?.nama_barang || '-'}</Text>
                        </View>
                    </View>
                    <Text style={styles.insightValue}>
                        {statistik?.barang_paling_mahal ? formatRupiah(statistik.barang_paling_mahal.harga) : '-'}
                    </Text>
                </View>

                <View style={styles.insightCard}>
                    <View style={styles.insightLeft}>
                        <View style={[styles.insightIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Feather name="trending-down" size={20} color="#F59E0B" />
                        </View>
                        <View style={styles.insightTextContainer}>
                            <Text style={styles.insightTitle}>Paling Murah</Text>
                            <Text style={styles.insightSubtitle} numberOfLines={1}>{statistik?.barang_paling_murah?.nama_barang || '-'}</Text>
                        </View>
                    </View>
                    <Text style={styles.insightValue}>
                        {statistik?.barang_paling_murah ? formatRupiah(statistik.barang_paling_murah.harga) : '-'}
                    </Text>
                </View>

                <View style={styles.insightCard}>
                    <View style={styles.insightLeft}>
                        <View style={[styles.insightIcon, { backgroundColor: '#D1FAE5' }]}>
                            <Feather name="archive" size={20} color="#10B981" />
                        </View>
                        <View style={styles.insightTextContainer}>
                            <Text style={styles.insightTitle}>Stok Terbanyak</Text>
                            <Text style={styles.insightSubtitle} numberOfLines={1}>{statistik?.barang_stok_terbanyak?.nama_barang || '-'}</Text>
                        </View>
                    </View>
                    <Text style={styles.insightValue}>
                        {statistik?.barang_stok_terbanyak?.stok || 0} pcs
                    </Text>
                </View>

                {/* HAMPIR HABIS LIST */}
                {(statistik?.barang_hampir_habis?.length ?? 0) > 0 && (
                    <>
                        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
                            <Text style={styles.sectionTitle}>Barang Hampir Habis</Text>
                        </View>
                        {statistik?.barang_hampir_habis.map((item) => (
                            <View key={`hampir-${item.id}`} style={styles.listItem}>
                                <View style={styles.listLeft}>
                                    <View style={[styles.listIcon, { backgroundColor: '#FEF3C7' }]}>
                                        <Feather name="alert-circle" size={18} color="#F59E0B" />
                                    </View>
                                    <View style={styles.listTextContainer}>
                                        <Text style={styles.listTitle} numberOfLines={1}>{item.nama_barang}</Text>
                                        <Text style={styles.listSubtitle}>{item.kode_barang}</Text>
                                    </View>
                                </View>
                                <View style={[styles.listBadge, { backgroundColor: '#FEF3C7' }]}>
                                    <Text style={[styles.listBadgeText, { color: '#D97706' }]}>{item.stok} sisa</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}

                {/* STOK HABIS LIST */}
                {(statistik?.barang_stok_habis?.length ?? 0) > 0 && (
                    <>
                        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
                            <Text style={styles.sectionTitle}>Barang Stok Habis</Text>
                        </View>
                        {statistik?.barang_stok_habis.map((item) => (
                            <View key={`habis-${item.id}`} style={styles.listItem}>
                                <View style={styles.listLeft}>
                                    <View style={[styles.listIcon, { backgroundColor: '#FEE2E2' }]}>
                                        <Feather name="x-octagon" size={18} color="#EF4444" />
                                    </View>
                                    <View style={styles.listTextContainer}>
                                        <Text style={styles.listTitle} numberOfLines={1}>{item.nama_barang}</Text>
                                        <Text style={styles.listSubtitle}>{item.kode_barang}</Text>
                                    </View>
                                </View>
                                <View style={[styles.listBadge, { backgroundColor: '#FEE2E2' }]}>
                                    <Text style={[styles.listBadgeText, { color: '#EF4444' }]}>Habis</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}

                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default function DashboardScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: React.ComponentProps<typeof Feather>['name'] = 'home';

                    if (route.name === 'Dashboard') {
                        iconName = 'home';
                    } else if (route.name === 'Barang') {
                        iconName = 'box';
                    } else if (route.name === 'Profil') {
                        iconName = 'user';
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardContent} />
            <Tab.Screen name="Barang" component={DaftarBarangScreen} />
            <Tab.Screen name="Profil" component={() => null} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 20,
        paddingBottom: 0,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#E0E7FF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginLeft: 14,
    },

    notificationButton: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 15,
        height: 56,
        marginBottom: 20,
    },

    welcomeText: {
        flex: 1,
        marginLeft: 10,
        color: '#9CA3AF',
        fontSize: 16,
    },

    totalCard: {
        backgroundColor: '#2563EB',
        borderRadius: 24,
        padding: 24,
        marginBottom: 18,
        elevation: 5,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    totalLabel: {
        color: '#DBEAFE',
        fontSize: 15,
        fontWeight: '600',
    },

    totalValue: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
        marginTop: 10,
    },

    totalDesc: {
        color: '#DBEAFE',
        marginTop: 8,
        fontSize: 14,
    },

    alertRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },

    alertCard: {
        width: '48%',
        backgroundColor: '#FEF3C7',
        borderRadius: 20,
        padding: 18,
    },

    criticalCard: {
        width: '48%',
        backgroundColor: '#FEE2E2',
        borderRadius: 20,
        padding: 18,
    },

    alertTitle: {
        marginTop: 10,
        color: '#6B7280',
        fontWeight: '600',
    },

    alertValue: {
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#111827',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },

    insightCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    insightLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    insightIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    insightTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    insightTitle: {
        fontSize: 13,
        color: '#6B7280',
    },

    insightSubtitle: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
    },

    insightValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2563EB',
    },

    listItem: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    listLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    listIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    listTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    listTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
    },

    listSubtitle: {
        marginTop: 2,
        fontSize: 13,
        color: '#6B7280',
    },

    listBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },

    listBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    errorText: {
        color: '#EF4444',
        textAlign: 'center',
        marginBottom: 20,
    },
});