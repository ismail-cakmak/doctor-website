// Data management utilities for blog posts and specialties

const BLOG_POSTS_KEY = 'blogPosts';
const SPECIALTIES_KEY = 'specialties';
const VIDEOS_KEY = 'videos';

// Initial blog posts data
const initialBlogPosts = [
  {
    id: 1,
    slug: 'kalp-sagligini-korumak-icin-10-ipucu',
    image: "/medical-research-lab.png",
    title: "Kalp Sağlığını Korumak İçin 10 İpucu",
    excerpt: "Kalbinizi sağlıklı tutmak ve kardiyovasküler risk faktörlerini azaltmak için temel stratejileri öğrenin.",
    content: "<p>Kalp sağlığı, genel sağlığınızın en önemli parçalarından biridir. Düzenli egzersiz, dengeli beslenme ve stres yönetimi kalp sağlığınızı korumanın temel taşlarıdır.</p><p>Günde en az 30 dakika orta tempolu egzersiz yapın, tuzu azaltın, sebze ve meyve tüketimini artırın.</p>",
    date: "15 Mart 2024",
    author: "Dr. Sabri Keser",
    category: "Kardiyoloji",
    readTime: "5 dakika",
  },
  {
    id: 2,
    slug: 'yillik-kontrollerin-onemi',
    image: "/doctor-medical-office.png",
    title: "Yıllık Kontrollerin Önemi",
    excerpt: "Düzenli sağlık taramalarının erken teşhis ve önleme için neden çok önemli olduğunu keşfedin.",
    content: "<p>Yıllık sağlık kontrolleri, hastalıkların erken teşhisinde hayati öneme sahiptir.</p><p>Kan testleri, tansiyon ölçümü, kolesterol kontrolü ve diğer tarama testleri sayesinde birçok hastalık erken dönemde yakalanabilir. Erken teşhis, tedavi başarısını önemli ölçüde artırır.</p>",
    date: "10 Mart 2024",
    author: "Dr. Sabri Keser",
    category: "Koruyucu Hekimlik",
    readTime: "4 dakika",
  },
  {
    id: 3,
    slug: 'kronik-hastaliklari-yonetmek',
    image: "/medical-consultation.png",
    title: "Kronik Hastalıkları Etkili Bir Şekilde Yönetmek",
    excerpt: "Doğru yönetim ve yaşam tarzı değişiklikleri ile kronik hastalıklarla iyi yaşamaya dair uzman tavsiyeleri.",
    content: "<p>Kronik hastalıklar doğru yönetim stratejileri ile kontrol altında tutulabilir.</p><p>İlaç tedavisine uyum, düzenli doktor takibi ve yaşam tarzı değişiklikleri başarılı yönetimin anahtarıdır. Diyabet, hipertansiyon gibi kronik hastalıklar ile kaliteli bir yaşam sürmek mümkündür.</p>",
    date: "5 Mart 2024",
    author: "Dr. Sabri Keser",
    category: "Kronik Hastalık",
    readTime: "6 dakika",
  },
];

// Initial specialties data - All 12 specialties with complete information
const initialSpecialties = [
  {
    slug: "androloji",
    title: "Androloji",
    description: "Erkek sağlığı ve cinsel işlev",
    icon: "Stethoscope",
    content: {
      whatIs: "<h3>Androloji Nedir?</h3><p>Androloji, erkek üreme sistemi ve cinsel sağlık sorunlarının tanı ve tedavisi ile ilgilenen tıp dalıdır.</p><p>Erkek infertilitesi, hormonal dengesizlikler, cinsel işlev bozuklukları ve diğer erkek sağlığı sorunlarını kapsar.</p><p>Androlojik sorunların tedavisinde ilaç tedavisi, hormonal tedaviler, cerrahi müdahaleler ve modern rejeneratif tıp yöntemleri kullanılmaktadır. Her hasta için kişiselleştirilmiş tedavi planları oluşturulmaktadır.</p>"
    }
  },
  {
    slug: "erkek-infertilitesi",
    title: "Erkek İnfertilitesi",
    description: "Kısırlık tanı ve tedavisi",
    icon: "Users",
    content: {
      whatIs: "<h3>Erkek İnfertilitesi Nedir?</h3><p>Erkek infertilitesi, çiftlerin çocuk sahibi olamamasında erkek faktörlerin rol oynadığı durumdur. Sperm analizi, hormonal değerlendirme ve modern üreme teknikleri ile tedavi edilir.</p><p>Çocuk sahibi olmakta zorluk çeken çiftler için detaylı değerlendirme ve kişiselleştirilmiş tedavi seçenekleri sunulmaktadır.</p>"
    }
  },
  {
    slug: "erektil-disfonksiyon",
    title: "Erektil Disfonksiyon",
    description: "Sertleşme sorunu için çözümler",
    icon: "Activity",
    content: {
      whatIs: "<h3>Erektil Disfonksiyon Nedir?</h3><p>Cinsel ilişki için yeterli ereksiyonu sağlayamama veya sürdürememe durumudur. İlaç tedavisi, şok dalga tedavisi, PRP ve cerrahi seçenekler gibi çeşitli tedavi yöntemleri mevcuttur.</p><p>Sertleşme problemi yaşayan erkekler için kapsamlı değerlendirme ve modern tedavi seçenekleri sunulmaktadır.</p>"
    }
  },
  {
    slug: "prematur-ejekulasyon",
    title: "Prematür Ejekülasyon",
    description: "Erken boşalma yönetimi",
    icon: "Activity",
    content: {
      whatIs: "<h3>Prematür Ejekülasyon Nedir?</h3><p>İstenenden daha erken boşalma durumudur. Cinsel yaşam kalitesini etkileyen yaygın bir durumdur.</p><p>Davranışsal teknikler, topikal anestezikler, ilaç tedavisi ve psikolojik destek gibi çeşitli tedavi seçenekleri kullanılır. Erken boşalma sorunu yaşayan ve cinsel performans kaygısı olan erkekler için etkili çözümler sunulmaktadır.</p>"
    }
  },
  {
    slug: "peyronie-penis-egriligi",
    title: "Peyronie (Penis Eğriliği)",
    description: "Değerlendirme ve tedavi",
    icon: "Droplets",
    content: {
      whatIs: "<h3>Peyronie Hastalığı Nedir?</h3><p>Penis dokusunda plak oluşumu sonucu penisin eğrilmesi durumudur. Ağrı ve cinsel fonksiyon bozukluğuna neden olabilir.</p><p>İlaç tedavisi, enjeksiyonlar, şok dalga tedavisi ve gerekirse cerrahi düzeltme gibi çeşitli tedavi seçenekleri uygulanır. Penis eğriliği ve buna bağlı ağrı veya fonksiyon kaybı yaşayan erkekler için etkili tedavi yöntemleri mevcuttur.</p>"
    }
  },
  {
    slug: "penil-protez-genital-estetik",
    title: "Penil Protez & Genital Estetik",
    description: "Mutluluk çubuğu ve estetik cerrahiler",
    icon: "Slice",
    content: {
      whatIs: "<h3>Penil Protez ve Genital Estetik Nedir?</h3><p>İlaç tedavisine yanıt vermeyen erektil disfonksiyon için protez implantasyonu ve genital bölge estetik uygulamalarıdır.</p><p>Penil protez cerrahisi, genital estetik müdahaleler ve rekonstrüktif operasyonlar gibi modern cerrahi seçenekler sunulmaktadır. İlaç tedavisine yanıt vermeyen ED hastaları ve genital estetik isteyenler için güvenli ve etkili çözümler mevcuttur.</p>"
    }
  },
  {
    slug: "eswt-sok-dalga",
    title: "ESWT Şok Dalga",
    description: "İlaçsız fonksiyon destek tedavisi",
    icon: "Waves",
    content: {
      whatIs: "<h3>ESWT Şok Dalga Tedavisi Nedir?</h3><p>Düşük yoğunluklu şok dalgaları kullanarak doku rejenerasyonunu ve kan akışını artıran non-invaziv tedavi yöntemidir. Haftada 1-2 seans şeklinde toplam 6-12 seans uygulanır. Ağrısız ve yan etkisiz bir tedavidir.</p><p>Erektil disfonksiyon, Peyronie hastalığı ve kronik pelvik ağrı sendromu olan hastalar için etkili bir tedavi seçeneğidir.</p>"
    }
  },
  {
    slug: "prp-eksozom-kok-hucre",
    title: "PRP / Eksozom / Kök Hücre",
    description: "Rejeneratif uygulamalar",
    icon: "Syringe",
    content: {
      whatIs: "<h3>Rejeneratif Tıp Uygulamaları Nedir?</h3><p>Vücudun kendi iyileşme mekanizmalarını kullanarak doku onarımı ve yenilenmesini sağlayan modern tedavi yöntemleridir. PRP (Platelet Rich Plasma), eksozom tedavisi ve kök hücre uygulamaları gibi yenilikçi tedaviler sunulmaktadır.</p><p>Erektil disfonksiyon, Peyronie hastalığı ve doku rejenerasyonu isteyen hastalar için etkili ve güvenli tedavi seçenekleridir.</p>"
    }
  },
  {
    slug: "kronik-prostatit",
    title: "Kronik Prostatit",
    description: "Neden odaklı tanı ve tedavi",
    icon: "Microscope",
    content: {
      whatIs: "<h3>Kronik Prostatit Nedir?</h3><p>Prostat bezinin uzun süreli iltihaplanması veya ağrı sendromu olarak kendini gösteren durumdur. Antibiyotik tedavisi, alfa blokerler, ağrı kesiciler, fizyoterapi ve yaşam tarzı değişiklikleri gibi çeşitli tedavi seçenekleri uygulanır.</p><p>Kronik pelvik ağrı, sık idrara çıkma ve rahatsızlık hissi yaşayan erkekler için kapsamlı değerlendirme ve tedavi sunulmaktadır.</p>"
    }
  },
  {
    slug: "bph-iyi-huylu-prostat",
    title: "BPH (İyi Huylu Prostat)",
    description: "İlaç ve girişimsel seçenekler",
    icon: "Shield",
    content: {
      whatIs: "<h3>BPH (İyi Huylu Prostat Büyümesi) Nedir?</h3><p>Prostat bezinin yaşla birlikte büyümesi ve idrar yolu semptomlarına neden olması durumudur. İlaç tedavisi, minimal invaziv girişimler (Rezüm, UroLift) ve cerrahi seçenekler gibi çeşitli tedavi yöntemleri mevcuttur.</p><p>İdrar yapmada zorluk, sık idrara çıkma ve zayıf idrar akışı yaşayan erkekler için modern ve etkili tedavi seçenekleri sunulmaktadır.</p>"
    }
  },
  {
    slug: "tas-cerrahisi",
    title: "Taş Cerrahisi",
    description: "Böbrek ve üreter taşı endoürolojisi",
    icon: "TestTube",
    content: {
      whatIs: "<h3>Taş Cerrahisi Nedir?</h3><p>Böbrek, üreter ve mesane taşlarının minimal invaziv yöntemlerle tedavisidir. ESWL (Şok dalga), URS (Üreteroskopi), RIRS (Retrograd İntrarenal Cerrahi) ve PCNL gibi modern teknikler kullanılır.</p><p>Böbrek veya üreter taşı olan, ağrı ve idrar yolu enfeksiyonu yaşayan hastalar için etkili ve minimal invaziv tedavi seçenekleri sunulmaktadır.</p>"
    }
  },
  {
    slug: "pelvik-organ-sarkmasi",
    title: "Pelvik Organ Sarkması",
    description: "Cerrahi ve cerrahi dışı çözümler",
    icon: "Pill",
    content: {
      whatIs: "<h3>Pelvik Organ Sarkması Nedir?</h3><p>Pelvik bölge organlarının normal pozisyonlarından aşağı kayması durumudur. Pelvik taban egzersizleri, pessary kullanımı ve gerekirse cerrahi rekonstrüksiyon gibi tedavi seçenekleri uygulanır.</p><p>Pelvik organ sarkması semptomları yaşayan, ağırlık hissi ve fonksiyon kaybı olan hastalar için etkili tedavi yöntemleri mevcuttur.</p>"
    }
  },
];

const initialVideos = [];

const extractYouTubeId = (url) => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

// Blog Posts Management
export const getBlogPosts = () => {
  const stored = localStorage.getItem(BLOG_POSTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default data
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(initialBlogPosts));
  return initialBlogPosts;
};

export const saveBlogPost = (post) => {
  const posts = getBlogPosts();
  
  if (post.id) {
    // Update existing post
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = post;
    }
  } else {
    // Create new post
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    post.id = maxId + 1;
    
    // Generate slug from title if not provided
    if (!post.slug) {
      post.slug = post.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    posts.unshift(post);
  }
  
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
  return post;
};

export const deleteBlogPost = (id) => {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(filtered));
};

export const getBlogPostBySlug = (slug) => {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug);
};

// Specialties Management
export const getSpecialties = () => {
  const stored = localStorage.getItem(SPECIALTIES_KEY);
  if (stored) {
    const specialties = JSON.parse(stored);
    // Ensure all initial specialties exist
    const allSlugs = initialSpecialties.map(s => s.slug);
    const storedSlugs = specialties.map(s => s.slug);
    const missingSlugs = allSlugs.filter(slug => !storedSlugs.includes(slug));
    
    if (missingSlugs.length > 0) {
      // Add missing specialties
      const missingSpecialties = initialSpecialties.filter(s => missingSlugs.includes(s.slug));
      const updated = [...specialties, ...missingSpecialties];
      localStorage.setItem(SPECIALTIES_KEY, JSON.stringify(updated));
      return updated;
    }
    return specialties;
  }
  // Initialize with default data
  localStorage.setItem(SPECIALTIES_KEY, JSON.stringify(initialSpecialties));
  return initialSpecialties;
};

export const saveSpecialty = (specialty) => {
  const specialties = getSpecialties();
  const index = specialties.findIndex(s => s.slug === specialty.slug);
  
  if (index !== -1) {
    specialties[index] = specialty;
  } else {
    specialties.push(specialty);
  }
  
  localStorage.setItem(SPECIALTIES_KEY, JSON.stringify(specialties));
  return specialty;
};

export const getSpecialtyBySlug = (slug) => {
  const specialties = getSpecialties();
  return specialties.find(s => s.slug === slug);
};

export const deleteSpecialty = (slug) => {
  const specialties = getSpecialties();
  const filtered = specialties.filter(s => s.slug !== slug);
  localStorage.setItem(SPECIALTIES_KEY, JSON.stringify(filtered));
};

// Videos Management
export const getAllVideos = () => {
  const stored = localStorage.getItem(VIDEOS_KEY);
  if (stored) {
    return JSON.parse(stored).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  localStorage.setItem(VIDEOS_KEY, JSON.stringify(initialVideos));
  return initialVideos;
};

export const getVideoById = (id) => {
  const videos = getAllVideos();
  return videos.find(video => video.id === id);
};

export const saveVideo = (video) => {
  const youtubeId = extractYouTubeId(video.youtubeUrl || video.youtube_url);

  if (!youtubeId) {
    throw new Error('Geçerli bir YouTube URL\'si giriniz');
  }

  const videos = getAllVideos();
  const normalizedVideo = {
    id: video.id,
    title: video.title,
    youtubeUrl: video.youtubeUrl || video.youtube_url,
    youtubeId,
    displayOrder: video.displayOrder ?? video.display_order ?? 0,
    createdAt: video.createdAt || new Date().toISOString(),
  };

  if (normalizedVideo.id) {
    const index = videos.findIndex(item => item.id === normalizedVideo.id);
    if (index !== -1) {
      videos[index] = normalizedVideo;
    } else {
      videos.push(normalizedVideo);
    }
  } else {
    const maxId = videos.length > 0 ? Math.max(...videos.map(item => item.id)) : 0;
    normalizedVideo.id = maxId + 1;
    videos.push(normalizedVideo);
  }

  const sortedVideos = videos.sort((a, b) => a.displayOrder - b.displayOrder);
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(sortedVideos));
  return normalizedVideo;
};

export const deleteVideo = (id) => {
  const videos = getAllVideos();
  const filtered = videos.filter(video => video.id !== id);
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(filtered));
};
