# Admin Panel Kullanım Kılavuzu

## Giriş Yapma

Admin paneline erişmek için tarayıcınızda aşağıdaki URL'yi ziyaret edin:
```
http://localhost:5173/admin
```

Admin girişi Supabase Auth ile yapılır. Giriş için Supabase projesinde oluşturulan admin kullanıcısının e-posta adresi ve şifresi gerekir.

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

Veriler Supabase veritabanında saklanır. Admin paneli yalnızca Supabase ortam değişkenleri yapılandırılmışsa giriş kabul eder.

## Önemli Notlar

### Güvenlik
- Admin paneline erişim şifre ile korunmaktadır
- Admin işlemleri için Supabase Auth kullanılır
- Supabase Row Level Security politikalarının yazma/silme işlemlerini yalnızca yetkili kullanıcılara açtığından emin olun

### İçerik Formatı
- Blog içeriği HTML olarak saklanır
- Uzmanlık alanı içerikleri HTML olarak saklanır
- Tüm içerikler sayfalarda güvenli bir şekilde render edilir

### Yedekleme
Verileri yedeklemek için Supabase panelindeki tablo dışa aktarma araçlarını veya proje yedekleme seçeneklerini kullanın.

## Sorun Giderme

### Giriş yapamıyorum
- Supabase admin e-posta adresi ve şifresinin doğru olduğundan emin olun
- `.env.local` veya GitHub Pages secrets içinde `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` değerlerinin tanımlı olduğundan emin olun
- Tarayıcı önbelleğini temizlemeyi deneyin
- Farklı bir tarayıcı deneyin

### İçerik görünmüyor
- Tarayıcı geliştirici konsolunu (F12) açın ve hata mesajlarını kontrol edin
- Sayfayı yenilemeyi deneyin (Ctrl+R veya Cmd+R)

## Teknik Detaylar

### Kullanılan Teknolojiler
- **React**: UI framework
- **React Router**: Sayfa yönlendirme
- **React Quill**: WYSIWYG editör
- **Supabase**: Veri saklama ve admin kimlik doğrulama
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
