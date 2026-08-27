# 🎬 NEONFLIX — Cyberpunk Gamification Cinema App

**NEONFLIX** adalah platform pemesanan tiket bioskop online modern bertema **Cyberpunk Gamification** dengan nuansa neon gelap (Dominan Red/Magenta & Cyan) yang terinspirasi dari game interface masa depan.

---

## 🌟 Fitur Utama

1. **🏠 Homepage & Film Catalog**
   - Hero Section cinematic dengan glitch text & dynamic HUD stats.
   - Now Showing grid dengan efek 3D hover tilt & badge status neon.
   - Coming Soon carousel dilengkapi real-time countdown timer.

2. **📅 Detail Film & Jadwal (Showtime Selector)**
   - Khusus cabang **Jakarta** (Central Park, PIK Avenue, Kemang Village).
   - Pemilihan tanggal interaktif (7 hari ke depan).
   - Filter studio: **Regular**, **IMAX**, **4DX**, dan **Premiere** dengan indikator kursi tersisa.

3. **💺 Pemilihan Kursi Interaktif (Seat Selection Map)**
   - Peta kursi beranimasi warna status:
     - 🟢 **Available**
     - 🔴 **Occupied**
     - 🔵 **Selected** (Pulsing Neon Glow)
     - 🟡 **VIP Seats** (Gold Glow)
   - Indikator layar bioskop ber-neon.
   - Maksimal 6 kursi per transaksi dengan ringkasan harga langsung.

4. **🍿 Food & Drinks Ordering (Cyber Concession)**
   - 4 Kategori: Popcorn, Drinks, Snacks, Combos.
   - Badge Best Seller, New, Popular, & Limited.
   - Kontrol kuantiti & keranjang pemesanan real-time.

5. **💳 Checkout & Payment Simulation**
   - Ringkasan total tiket + makanan + biaya layanan.
   - Pilihan metode bayar: Credit Card, GoPay, OVO, Dana.
   - Dukungan input promo code.

6. **🎫 E-Ticket & Reward XP (Gamification)**
   - E-Ticket futuristik dengan barcode ID transaksi & QR pattern.
   - Notifikasi perolehan XP (+100 XP per tiket, +25 XP per makanan).
   - Efek perayaan konfeti/partikel.

7. **🎮 Profil & Sistem Gamifikasi (Dashboard)**
   - **Level & XP Progress Bar**: 10 Tier Level (ROOKIE ➔ NEON GOD).
   - **8 Achievements/Badges**: Unlockable milestones (First Blood, Night Owl, Snack Lord, Front Row Warrior, VIP Access, dll).
   - **Riwayat Transaksi**: Status Upcoming & Completed dengan perolehan XP.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Custom CSS Animations & Glitch Keyframes
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Orbitron, JetBrains Mono, Inter

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# Masuk ke folder aplikasi
cd neonflix-app

# Install dependencies jika belum
npm install

# Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Deploy ke Vercel

### Opsi 1: Menggunakan Vercel CLI
```bash
cd neonflix-app
npx vercel
```

### Opsi 2: Menggunakan Dashboard Vercel (Git Push)
1. Push folder proyek ke repository GitHub / GitLab.
2. Buka [vercel.com](https://vercel.com) dan import repository Anda.
3. Set **Root Directory** ke `neonflix-app` (jika repo berisi subfolder).
4. Klik **Deploy**!
