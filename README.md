# Inventory App v1 📦

## Deskripsi Project
Aplikasi mobile untuk sistem manajemen inventaris barang. Dibangun menggunakan React Native dan Expo, aplikasi ini memungkinkan pengguna untuk melakukan autentikasi (login/register) dan mengelola data barang (CRUD) secara efisien dengan antarmuka yang sederhana.

## Tech Stack
- **Framework:** React Native & Expo
- **Language:** TypeScript

## Penjelasan `package.json` / Dependencies
Berikut adalah beberapa dependencies utama yang digunakan dalam project ini:
- `expo` & `react-native`: Core framework untuk membangun aplikasi mobile cross-platform.
- `expo-router`: Sistem routing modern berbasis file, memudahkan navigasi antar halaman layaknya Next.js di ekosistem web.
- `@expo/vector-icons`: Kumpulan ikon siap pakai (seperti Feather) untuk elemen UI.
- `@react-navigation/*`: Digunakan di balik layar oleh Expo Router untuk mengelola stack layar dan navigasi.
- `typescript` & `@types/react`: Memberikan dukungan pengetikan statis (type-safe) untuk pengembangan yang lebih baik dan meminimalisir bug.

## Instalasi / Setup Project

1. **Buka terminal** dan pastikan Anda berada di direktori project utama.
2. **Install dependencies** menggunakan npm:
   ```bash
   npm install
   ```

## Cara Menjalankan Project

Untuk menjalankan aplikasi di server development lokal, gunakan perintah berikut:
```bash
npm start
```
atau
```bash
npx expo start
```

Dari terminal yang berjalan, Anda dapat berinteraksi dengan menekan:
- `a` untuk membuka aplikasi di Android Emulator.
- `i` untuk membuka aplikasi di iOS Simulator.
- Scan QR code yang muncul menggunakan aplikasi **Expo Go** di perangkat fisik Android, atau menggunakan kamera di perangkat iOS.
