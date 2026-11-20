// ============================================================
//  SEY JOURNAL — shared-data.js
//  Sinkronisasi data otomatis dari Supabase & localStorage ke semua halaman publik.
// ============================================================

(function () {
  const SUPABASE_URL      = 'https://etstrfgxksmwympjuhhb.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_8IndtVnPl1vP6AVAl1wecg_mF2g8HSv';
  const LS_KEY            = 'sey_journal_data';

  // ── Data Default / Fallback ───────────────────────────────
  const defaultData = {
    profile: {
      name:     'Syakilla Purwana',
      title:    'Multidisciplinary Designer & Writer',
      quote:    'when the stars appeared in February, we prayed.',
      bio:      'Halo, aku Syakilla. Ruang ini memang sederhana—hanya berisi potongan hal yang aku tulis, aku pikirkan, dan aku rasakan di sela-sela hari.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      photo_url:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      tiktok:   '@syakilla.purwana',
      github:   '@putrisyakillasi',
      substack: '@seykilla'
    },
    kegiatan: [
      { id: 'k1', title: 'UX Summit Nusantara: Merawat Empati di Era AI', category: 'Keynote', date: '12 Mei 2024', location: 'Jakarta', role: 'Keynote Speaker', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80', image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80', desc: 'Membahas pergeseran paradigma desainer.', description: 'Membahas pergeseran paradigma desainer.' },
      { id: 'k2', title: 'Workshop Fotografi Arsitektur Kayu', category: 'Workshop', date: '18 Okt 2024', location: 'Studio Alam Cibubur', role: 'Mentor & Fasilitator', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', desc: 'Teknik menangkap jiwa kayu.', description: 'Teknik menangkap jiwa kayu.' },
      { id: 'k3', title: 'Pameran Keramik Bumi Nusantara', category: 'Pameran', date: '24 Okt 2024', location: 'Galeri Utama Paviliun', role: 'Kurator Pameran', imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80', image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80', desc: 'Koleksi keramik tanah liat.', description: 'Koleksi keramik tanah liat.' }
    ],
    articles: [
      { id: 'a1', title: 'Menemukan Keheningan dalam Antarmuka Digital yang Tenang', category: 'Esai & Desain', date: '18 Februari 2025', readTime: '5 menit', read_time: '5 menit', excerpt: 'Bagaimana pemanfaatan ruang negatif, ritme visual yang lembut...' },
      { id: 'a2', title: 'Tentang Langkah Lambat dan Hal-Hal yang Luput', category: 'Catatan Harian', date: '10 Januari 2025', readTime: '4 menit', read_time: '4 menit', excerpt: 'Refleksi tentang mengapa kita selalu terburu-buru...' },
      { id: 'a3', title: 'Material Alami dan Ruang Ingatan Manusia', category: 'Arsitektur', date: '02 Desember 2024', readTime: '6 menit', read_time: '6 menit', excerpt: 'Sentuhan kayu, dinginnya batu, dan kehangatan tanah liat...' }
    ],
    activities: [
      { id: 'act1', title: 'Menambahkan artikel baru: Keheningan Digital', category: 'Artikel', date: '18 Feb 2025', status: 'Selesai' },
      { id: 'act2', title: 'Memperbarui foto profil', category: 'Profil', date: '15 Feb 2025', status: 'Selesai' }
    ]
  };

  // ── localStorage helpers ──────────────────────────────────
  function lsGet() {
    try {
      const item = localStorage.getItem(LS_KEY);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }

  function lsSet(data) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[SeyData] LocalStorage save warning:', e);
    }
  }

  // ── Normalizers ───────────────────────────────────────────
  function normalizeProfile(p) {
    if (!p) return defaultData.profile;
    const photo = p.photo_url || p.photoUrl || defaultData.profile.photoUrl;
    return {
      ...defaultData.profile,
      ...p,
      photoUrl: photo,
      photo_url: photo
    };
  }

  function normalizeKegiatan(arr) {
    if (!arr || !Array.isArray(arr) || !arr.length) return defaultData.kegiatan;
    return arr.map(k => ({
      ...k,
      imageUrl: k.image_url || k.imageUrl || defaultData.kegiatan[0].imageUrl,
      image_url: k.image_url || k.imageUrl || defaultData.kegiatan[0].imageUrl,
      desc: k.description || k.desc || '',
      description: k.description || k.desc || ''
    }));
  }

  function normalizeArticles(arr) {
    if (!arr || !Array.isArray(arr) || !arr.length) return defaultData.articles;
    return arr.map(a => ({
      ...a,
      readTime: a.read_time || a.readTime || '4 menit',
      read_time: a.read_time || a.readTime || '4 menit'
    }));
  }

  // ── window.SeyData API ────────────────────────────────────
  window.SeyData = {
    getData() {
      return lsGet() || defaultData;
    },
    saveData(data) {
      lsSet(data);
    },
    resetData() {
      lsSet(defaultData);
      return defaultData;
    }
  };

  // ── Inject content into DOM ───────────────────────────────
  function injectPublicContent(data) {
    if (!data) return;
    const p = normalizeProfile(data.profile);

    // 1. Profile image
    const photoSrc = p.photo_url || p.photoUrl;
    if (photoSrc) {
      document.querySelectorAll('.sey-profile-img').forEach(el => {
        el.src = photoSrc;
        el.onerror = null; // Mencegah loop atau fallback salah
      });
    }

    // 2. Bio text
    if (p.bio) {
      document.querySelectorAll('.sey-bio-text').forEach(el => {
        el.textContent = p.bio;
      });
    }

    // 3. Quote text
    if (p.quote) {
      document.querySelectorAll('.sey-quote-text').forEach(el => {
        el.textContent = p.quote;
      });
    }

    // 4. Name text (jika ada elemen khusus nama)
    document.querySelectorAll('.sey-name-text').forEach(el => {
      el.textContent = p.name;
    });

    // 5. Kegiatan di Beranda (Home)
    const homeKegiatanContainer = document.getElementById('home-kegiatan-container');
    if (homeKegiatanContainer && data.kegiatan && data.kegiatan.length) {
      const items = normalizeKegiatan(data.kegiatan);
      homeKegiatanContainer.innerHTML = items.slice(0, 3).map(k => `
        <div class="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <img src="${k.imageUrl}" alt="${k.title}" class="w-full h-48 object-cover">
          <div class="p-5">
            <span class="text-xs font-semibold text-primary uppercase tracking-wider">${k.category}</span>
            <h3 class="font-headline font-bold text-on-surface mt-1 mb-2 leading-snug">${k.title}</h3>
            <p class="text-xs text-secondary">${k.location || '-'} · ${k.date}</p>
          </div>
        </div>
      `).join('');
    }

    // 6. Kegiatan di Halaman Portofolio Lengkap
    const kegiatanAll = document.getElementById('kegiatan-all-container');
    if (kegiatanAll && data.kegiatan && data.kegiatan.length) {
      const items = normalizeKegiatan(data.kegiatan);
      kegiatanAll.innerHTML = items.map(k => `
        <div class="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <img src="${k.imageUrl}" alt="${k.title}" class="w-full h-48 object-cover">
          <div class="p-5">
            <span class="text-xs font-semibold text-primary uppercase tracking-wider">${k.category}</span>
            <h3 class="font-headline font-bold text-on-surface mt-1 mb-2 leading-snug">${k.title}</h3>
            <p class="text-xs text-secondary mb-3">${k.location || '-'} · ${k.date}</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">${k.desc || ''}</p>
          </div>
        </div>
      `).join('');
    }

    // 7. Artikel di Beranda (Home)
    const homeArticles = document.getElementById('home-articles-container');
    if (homeArticles && data.articles && data.articles.length) {
      const items = normalizeArticles(data.articles);
      homeArticles.innerHTML = items.slice(0, 3).map(a => `
        <div class="py-4 border-b border-outline-variant/20 last:border-0">
          <span class="text-xs font-semibold text-tertiary uppercase tracking-wider">${a.category}</span>
          <h4 class="font-headline font-semibold text-on-surface mt-1 leading-snug">${a.title}</h4>
          <p class="text-xs text-secondary mt-1">${a.readTime} · ${a.date}</p>
        </div>
      `).join('');
    }

    // 8. Artikel di Halaman Jurnal Lengkap
    const articleListEl = document.getElementById('article-list');
    if (articleListEl && data.articles && data.articles.length) {
      const items = normalizeArticles(data.articles);
      articleListEl.innerHTML = items.slice(0, 3).map(a => `
        <div class="py-5 border-b border-outline-variant/20 last:border-0">
          <span class="text-xs font-semibold text-tertiary uppercase tracking-wider">${a.category} · ${a.readTime}</span>
          <h3 class="font-headline font-semibold text-on-surface mt-1 mb-1 leading-snug">${a.title}</h3>
          <p class="text-sm text-secondary leading-relaxed">${a.excerpt || ''}</p>
          <span class="text-xs text-outline mt-2 inline-block">${a.date}</span>
        </div>
      `).join('');
    }
  }

  // ── REST Fetcher Langsung ke Supabase (No SDK Dependency) ─
  async function fetchFromSupabase() {
    const headers = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
    };

    try {
      const [pRes, kRes, aRes, actRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/admin_profile?select=*&limit=1`, { headers })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/kegiatan?select=*&order=created_at.desc`, { headers })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/articles?select=*&order=created_at.desc`, { headers })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/activities?select=*&order=created_at.desc`, { headers })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      ]);

      const profileRow = (pRes && pRes[0]) ? pRes[0] : null;

      const syncedData = {
        profile: normalizeProfile(profileRow),
        kegiatan: normalizeKegiatan(kRes),
        articles: normalizeArticles(aRes),
        activities: actRes || []
      };

      // Simpan ke localStorage agar offline / navigasi berikutnya instan
      lsSet(syncedData);

      // Render ulang DOM dengan data terbaru dari Supabase
      injectPublicContent(syncedData);
    } catch (err) {
      console.warn('[SeyData] Supabase REST fetch gagal:', err);
    }
  }

  // ── Inisialisasi ──────────────────────────────────────────
  function init() {
    // 1. Tampilkan data dari localStorage / default terlebih dahulu agar tidak ada jeda kosong
    const cached = lsGet() || defaultData;
    injectPublicContent(cached);

    // 2. Segera tarik data terbaru langsung dari database Supabase
    fetchFromSupabase();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
