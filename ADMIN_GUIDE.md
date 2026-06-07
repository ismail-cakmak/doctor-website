# Admin Panel Kullanım Kılavuzu

## Giriş Yapma

Admin paneline erişmek için tarayıcınızda aşağıdaki URL'yi ziyaret edin:
```
http://localhost:5173/admin
```

**Varsayılan Şifre:** `admin123`

> ⚠️ **ÖNEMLİ:** Güvenlik için bu şifreyi değiştirmeniz önerilir. Şifreyi değiştirmek için `src/utils/auth.js` dosyasındaki `ADMIN_PASSWORD` değişkenini düzenleyin.

## Admin Panel Özellikleri

### 1. Genel Bakış (Dashboard)
- Toplam blog yazısı sayısı
- Uzmanlık alanı sayısı
- Son eklenen blog yazıları
- Hızlı erişim butonları

### 2. Blog Yazıları Yönetimi

#### Yeni Blog Yazısı Ekleme
1. Sol menüden **"Blog Yazıları"** sekmesine tıklayın
2. Sağ üstteki **"Yeni Yazı Ekle"** butonuna tıklayın
3. Formu doldurun:
   - **Başlık** (zorunlu): Blog yazısının başlığı
   - **URL Slug**: URL'de görünecek kısım (boş bırakılırsa otomatik oluşturulur)
   - **Kategori** (zorunlu): Kardiyoloji, Beslenme, vb.
   - **Yazar**: Yazarın adı (varsayılan: Dr. Sabri Keser)
   - **Tarih**: Yayınlanma tarihi
   - **Okuma Süresi**: Örn: "5 dakika"
   - **Görsel URL**: Blog görseli için URL
   - **Özet** (zorunlu): Kısa açıklama
   - **İçerik** (zorunlu): Ana içerik (WYSIWYG editör ile)

#### WYSIWYG Editör Kullanımı
Editör, Microsoft Word benzeri bir arayüze sahiptir:
- **Başlıklar**: H1, H2, H3 formatlarında başlık ekleyin
- **Metin Biçimlendirme**: Kalın, italik, altı çizili
- **Listeler**: Numaralı veya madde işaretli listeler
- **Hizalama**: Sola, ortaya, sağa hizalama
- **Bağlantılar**: Hyperlink ekleme
- **Görseller**: Resim ekleme
- **Alıntı**: Blok alıntı ekleme
- **Renkler**: Metin ve arka plan rengi

#### Blog Yazısı Düzenleme
1. Blog listesinden düzenlemek istediğiniz yazının **"Düzenle"** butonuna tıklayın
2. Değişiklikleri yapın
3. **"Değişiklikleri Kaydet"** butonuna tıklayın

#### Blog Yazısı Silme
1. Blog listesinden silmek istediğiniz yazının **"Sil"** butonuna tıklayın
2. Onay penceresinde **"Tamam"** seçeneğini tıklayın

### 3. Uzmanlık Alanları Yönetimi

#### Uzmanlık Alanı İçeriği Düzenleme
1. Sol menüden **"Uzmanlık Alanları"** sekmesine tıklayın
2. Düzenlemek istediğiniz uzmanlık alanının **"İçeriği Düzenle"** butonuna tıklayın
3. Üç bölüm için içerik ekleyin:
   - **Nedir?**: Uzmanlık alanının tanımı
   - **Tedavi Yöntemleri**: Kullanılan tedavi yöntemleri
   - **Kimler İçin Uygundur?**: Hedef hasta grubu
4. Her bölüm için WYSIWYG editörü kullanarak zengin içerik oluşturun
5. **"Değişiklikleri Kaydet"** butonuna tıklayın

## Veri Saklama

Tüm veriler tarayıcınızın **localStorage**'ında saklanır. Bu şu anlama gelir:
- Veriler tarayıcınızda yerel olarak saklanır
- Tarayıcı önbelleğini temizlerseniz veriler silinebilir
- Farklı tarayıcılar veya cihazlar arasında senkronize olmaz

> 💡 **Gelecek Geliştirme:** Verileri kalıcı olarak saklamak için bir backend sistemi entegre edilebilir.

## Önemli Notlar

### Güvenlik
- Admin paneline erişim şifre ile korunmaktadır
- Oturum 24 saat süreyle geçerlidir
- Güvenlik için şifreyi düzenli olarak değiştirin
- Üretim ortamında daha güçlü bir kimlik doğrulama sistemi kullanın

### İçerik Formatı
- Blog içeriği HTML olarak saklanır
- Uzmanlık alanı içerikleri HTML olarak saklanır
- Tüm içerikler sayfalarda güvenli bir şekilde render edilir

### Yedekleme
LocalStorage verilerini yedeklemek için:
1. Tarayıcı geliştirici araçlarını açın (F12)
2. "Application" veya "Storage" sekmesine gidin
3. "Local Storage" altında sitenizi bulun
4. İçeriği kopyalayıp bir dosyaya kaydedin

## Sorun Giderme

### Giriş yapamıyorum
- Şifrenin doğru olduğundan emin olun (varsayılan: `admin123`)
- Tarayıcı önbelleğini temizlemeyi deneyin
- Farklı bir tarayıcı deneyin

### Değişiklikler kayboldu
- LocalStorage tarayıcı tarafından temizlenmiş olabilir
- Tarayıcı gizli modunda değilsiniz emin olun
- Tarayıcı önbelleği otomatik temizleme ayarlarını kontrol edin

### İçerik görünmüyor
- Tarayıcı geliştirici konsolunu (F12) açın ve hata mesajlarını kontrol edin
- Sayfayı yenilemeyi deneyin (Ctrl+R veya Cmd+R)

## Teknik Detaylar

### Kullanılan Teknolojiler
- **React**: UI framework
- **React Router**: Sayfa yönlendirme
- **React Quill**: WYSIWYG editör
- **LocalStorage API**: Veri saklama
- **Lucide React**: İkonlar

### Dosya Yapısı
```
src/
├── components/
│   ├── ProtectedRoute.jsx      # Admin route koruması
│   └── RichTextEditor.jsx      # WYSIWYG editör bileşeni
├── pages/
│   ├── AdminLogin.jsx          # Giriş sayfası
│   ├── AdminDashboard.jsx      # Ana panel layout
│   ├── AdminOverview.jsx       # Genel bakış sayfası
│   ├── AdminBlogList.jsx       # Blog listesi
│   ├── AdminBlogEditor.jsx     # Blog editörü
│   ├── AdminSpecialtiesList.jsx # Uzmanlık listesi
│   └── AdminSpecialtyEditor.jsx # Uzmanlık editörü
└── utils/
    ├── auth.js                 # Kimlik doğrulama
    └── dataManager.js          # Veri yönetimi
```

## Destek

Herhangi bir sorun yaşarsanız veya öneriniz varsa lütfen iletişime geçin.
