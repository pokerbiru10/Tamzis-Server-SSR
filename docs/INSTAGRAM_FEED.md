# Instagram Feed Component - TAMZIS

## Fitur yang Telah Diimplementasi

### 1. Layout Instagram Post Card
- **Desain 100% mirip Instagram asli** berdasarkan screenshot yang diberikan
- **Header**: Profile picture TAMZIS + username (tanpa timestamp)
- **Main Image**: Gambar post dengan overlay camera indicator
- **Interaction Bar**: Like button dengan data asli (hidden jika 0) + Share button
- **Caption**: Dengan format username + caption text

### 2. Layout 4 Kolom
- **Desktop**: 4 kolom (lg:grid-cols-4)
- **Tablet**: 2 kolom (sm:grid-cols-2) 
- **Mobile**: 1 kolom (grid-cols-1)
- **Responsive**: Menyesuaikan dengan ukuran layar

### 3. Semua Elemen Clickable
- **Profile area**: Klik untuk buka profil Instagram @tamzisbinautama
- **Gambar post**: Klik untuk buka post Instagram yang spesifik
- **Like button**: Langsung ke Instagram post (tanpa animasi warna merah)
- **Share button**: Native sharing atau fallback ke link Instagram
- **Caption area**: Klik untuk buka post Instagram
- **Camera button**: Klik untuk buka post Instagram

### 4. Logo TAMZIS
- **Path**: `/images/logo/image.png`
- **Format**: Circular logo dengan border
- **Fallback**: Jika gagal load, fallback ke logo lama
- **Object-fit**: `object-contain` untuk menjaga proporsi logo

### 5. Like Counter Real Data
- **Data Real**: Menggunakan `likes_count` dari Instagram API
- **Format Smart**: Otomatis format K/M untuk angka besar (contoh: 1.2K, 2.5M)
- **No Color Change**: Icon heart tetap abu-abu, tidak berubah merah saat klik
- **Direct Link**: Klik langsung mengarah ke post Instagram

## File yang Dimodifikasi

### 1. `/resources/js/components/marketing/instagram-post-card.tsx`
- Komponen baru untuk Instagram post card
- Layout mirip Instagram asli
- Like counter mengikuti data real dari Instagram
- Semua fungsi clickable sudah terintegrasi

### 2. `/resources/js/components/marketing/tamzis-highlights.tsx`
- Updated untuk menggunakan layout 4 kolom
- Import komponen Instagram post card baru
- Menggunakan logo TAMZIS yang benar

## Penggunaan

```tsx
<InstagramPostGallery 
    items={instagramFeed} 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
/>
```

## Fitur Like Button

1. **Real Data**: Menampilkan jumlah like sebenarnya dari Instagram
2. **Smart Format**: 
   - 0: tidak ditampilkan (hidden)
   - 1-999: angka biasa
   - 1,000-999,999: format K (contoh: 1.2K)
   - 1,000,000+: format M (contoh: 2.5M)
3. **No Animation**: Tidak ada perubahan warna saat diklik
4. **Direct Redirect**: Klik langsung buka post Instagram
5. **Clean Design**: Hanya tampil jika ada likes (> 0)

## Fitur Interaktif

1. **Direct Instagram**: Semua klik mengarah langsung ke Instagram
2. **Share Native**: Menggunakan Web Share API jika tersedia
3. **Fallback Sharing**: Link langsung ke Instagram jika Web Share tidak ada
4. **Profile Click**: Redirect ke halaman Instagram @tamzisbinautama
5. **Post Click**: Redirect ke post Instagram spesifik

## Data Structure

```typescript
type InstagramPostItem = {
    id: string;
    caption: string;
    excerpt: string;
    image: string;
    permalink: string;
    timestamp?: string;
    likes_count?: number; // Real data from Instagram
};
```

## Like Counter Examples

- `0` → tidak ditampilkan
- `523` → "523"
- `1,245` → "1.2K"
- `15,678` → "15.7K"
- `2,345,678` → "2.3M"

## Performance

- **Lazy Loading**: Gambar dimuat secara lazy
- **WebP Support**: Mendukung format WebP untuk optimasi
- **Error Handling**: Fallback jika gambar gagal dimuat
- **Responsive Images**: Menggunakan `<picture>` element
- **No State Management**: Tidak ada state untuk like (langsung redirect)

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Web Share API**: Fallback untuk browser yang tidak mendukung
- **CSS Grid**: Layout responsif dengan CSS Grid