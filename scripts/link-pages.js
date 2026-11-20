const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function updateFile(relPath, transform) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${relPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  content = transform(content);
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${relPath}`);
  } else {
    console.log(`No changes needed: ${relPath}`);
  }
}

// 1. welcome_page/code.html
updateFile('welcome_page/code.html', (html) => {
  return html.replace(
    /data-path="home"\s+href="#"/g,
    'data-path="home" href="../home_portofolio_utama/code.html"'
  );
});

// 2. home_portofolio_utama/code.html
updateFile('home_portofolio_utama/code.html', (html) => {
  // Remove fixed width/height/overflow lock on html tag
  html = html.replace(/<html lang="en"[^>]*>/i, '<html lang="en">');

  // Brand link
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );

  // Navigation bar
  html = html.replace(
    /data-path="home"\s+href="#"/g,
    'data-path="home" href="code.html"'
  );
  html = html.replace(
    /data-path="about"\s+href="#"/g,
    'data-path="about" href="../about_me_profil_perjalanan/code.html"'
  );
  html = html.replace(
    /data-path="kegiatan"\s+href="#"/g,
    'data-path="kegiatan" href="../kegiatan_portofolio_karya/code.html"'
  );
  html = html.replace(
    /data-path="artikel"\s+href="#"/g,
    'data-path="artikel" href="../jurnal_artikel_pemikiran/code.html"'
  );

  // "Lihat Semua Tulisan"
  html = html.replace(
    /(<a class="text-sm font-semibold text-primary hover:text-on-surface transition-colors flex items-center gap-1"\s+)href="#"(\s*>\s*<span>Lihat Semua Tulisan<\/span>)/g,
    '$1href="../jurnal_artikel_pemikiran/code.html"$2'
  );

  // "Baca Selengkapnya" on articles
  html = html.replace(
    /(<a class="text-xs font-semibold text-primary hover:text-on-surface transition-colors inline-flex items-center gap-1"\s+)href="#"(\s*>\s*<span>Baca Selengkapnya<\/span>)/g,
    '$1href="../detail_artikel_jurnal_sey_journal/code.html"$2'
  );

  // "Baca ringkasan" on event cards
  html = html.replace(
    /<span class="text-xs font-semibold text-primary mt-4 flex items-center gap-1">\s*Baca ringkasan\s*<span class="material-symbols-outlined text-sm">arrow_forward<\/span>\s*<\/span>/g,
    '<a href="../detail_cerita_kegiatan_sey_journal/code.html" class="text-xs font-semibold text-primary mt-4 flex items-center gap-1 hover:underline">Baca ringkasan <span class="material-symbols-outlined text-sm">arrow_forward</span></a>'
  );

  // Footer admin login link
  html = html.replace(
    /<div class="flex items-center gap-6 text-sm text-on-surface-variant"><\/div>/g,
    '<div class="flex items-center gap-6 text-sm text-on-surface-variant"><a href="../login_panel_admin_sey_journal/code.html" class="hover:text-primary transition-colors text-xs font-medium">Panel Pengelola</a></div>'
  );

  return html;
});

// 3. about_me_profil_perjalanan/code.html
updateFile('about_me_profil_perjalanan/code.html', (html) => {
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="../home_portofolio_utama/code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  html = html.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="code.html"');
  html = html.replace(/data-path="kegiatan"\s+href="#"/g, 'data-path="kegiatan" href="../kegiatan_portofolio_karya/code.html"');
  html = html.replace(/data-path="artikel"\s+href="#"/g, 'data-path="artikel" href="../jurnal_artikel_pemikiran/code.html"');

  html = html.replace(
    /<div class="flex items-center gap-6 text-sm text-on-surface-variant"><\/div>/g,
    '<div class="flex items-center gap-6 text-sm text-on-surface-variant"><a href="../login_panel_admin_sey_journal/code.html" class="hover:text-primary transition-colors text-xs font-medium">Panel Pengelola</a></div>'
  );
  return html;
});

// 4. kegiatan_portofolio_karya/code.html
updateFile('kegiatan_portofolio_karya/code.html', (html) => {
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="../home_portofolio_utama/code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  html = html.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="../about_me_profil_perjalanan/code.html"');
  html = html.replace(/data-path="kegiatan"\s+href="#"/g, 'data-path="kegiatan" href="code.html"');
  html = html.replace(/data-path="artikel"\s+href="#"/g, 'data-path="artikel" href="../jurnal_artikel_pemikiran/code.html"');

  // "Lihat Dokumentasi & Detail" buttons
  html = html.replace(
    /(<a class="inline-flex w-full items-center justify-between px-4 py-2\.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface text-sm font-semibold transition-colors duration-200"\s+)href="#"/g,
    '$1href="../detail_cerita_kegiatan_sey_journal/code.html"'
  );

  html = html.replace(
    /<div class="flex items-center gap-6 text-sm text-on-surface-variant"><\/div>/g,
    '<div class="flex items-center gap-6 text-sm text-on-surface-variant"><a href="../login_panel_admin_sey_journal/code.html" class="hover:text-primary transition-colors text-xs font-medium">Panel Pengelola</a></div>'
  );
  return html;
});

// 5. jurnal_artikel_pemikiran/code.html
updateFile('jurnal_artikel_pemikiran/code.html', (html) => {
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="../home_portofolio_utama/code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  html = html.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="../about_me_profil_perjalanan/code.html"');
  html = html.replace(/data-path="kegiatan"\s+href="#"/g, 'data-path="kegiatan" href="../kegiatan_portofolio_karya/code.html"');
  html = html.replace(/data-path="jurnal"\s+href="#"/g, 'data-path="jurnal" href="code.html"');

  // "Baca Selengkapnya" buttons
  html = html.replace(
    /(<a class="inline-flex items-center gap-1\.5 text-xs font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors"\s+)href="#"/g,
    '$1href="../detail_artikel_jurnal_sey_journal/code.html"'
  );

  html = html.replace(
    /<div class="flex items-center gap-6 text-sm text-on-surface-variant"><\/div>/g,
    '<div class="flex items-center gap-6 text-sm text-on-surface-variant"><a href="../login_panel_admin_sey_journal/code.html" class="hover:text-primary transition-colors text-xs font-medium">Panel Pengelola</a></div>'
  );
  return html;
});

// 6. detail_cerita_kegiatan_sey_journal/code.html
updateFile('detail_cerita_kegiatan_sey_journal/code.html', (html) => {
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="../home_portofolio_utama/code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  html = html.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="../about_me_profil_perjalanan/code.html"');
  html = html.replace(/data-path="kegiatan"\s+href="#"/g, 'data-path="kegiatan" href="../kegiatan_portofolio_karya/code.html"');
  html = html.replace(/data-path="artikel"\s+href="#"/g, 'data-path="artikel" href="../jurnal_artikel_pemikiran/code.html"');

  // Back button (arrow_back)
  html = html.replace(
    /(<a class="inline-flex items-center gap-2 text-primary font-medium text-sm hover:translate-x-\[-3px\] transition-transform duration-200"\s+)href="#"/g,
    '$1href="../kegiatan_portofolio_karya/code.html"'
  );
  return html;
});

// 7. detail_artikel_jurnal_sey_journal/code.html
updateFile('detail_artikel_jurnal_sey_journal/code.html', (html) => {
  html = html.replace(
    /<span class="font-headline font-semibold text-xl tracking-tight text-on-surface">sey-journal<\/span>/g,
    '<a href="../home_portofolio_utama/code.html" class="font-headline font-semibold text-xl tracking-tight text-on-surface hover:text-primary transition-colors">sey-journal</a>'
  );
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  html = html.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="../about_me_profil_perjalanan/code.html"');
  html = html.replace(/data-path="kegiatan"\s+href="#"/g, 'data-path="kegiatan" href="../kegiatan_portofolio_karya/code.html"');
  html = html.replace(/data-path="jurnal"\s+href="#"/g, 'data-path="jurnal" href="../jurnal_artikel_pemikiran/code.html"');

  // Back button (west icon)
  html = html.replace(
    /(<a class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors group"\s+)href="#"/g,
    '$1href="../jurnal_artikel_pemikiran/code.html"'
  );
  return html;
});

// 8. login_panel_admin_sey_journal/code.html
updateFile('login_panel_admin_sey_journal/code.html', (html) => {
  // Return to public site
  html = html.replace(
    /href="\/"/g,
    'href="../home_portofolio_utama/code.html"'
  );

  // Auto redirect on submit
  html = html.replace(
    /feedback\.innerHTML = `[\s\S]*?Otorisasi berhasil[\s\S]*?`;/g,
    `feedback.innerHTML = \`
          <span class="material-symbols-outlined text-primary text-base">check_circle</span>
          <span class="text-on-surface font-semibold">Otorisasi berhasil. Membuka studio kerja...</span>
        \`;
        setTimeout(() => {
          window.location.href = '../admin_dashboard_ikhtisar_statistik/code.html';
        }, 700);`
  );
  return html;
});

// 9. admin_dashboard_ikhtisar_statistik/code.html
updateFile('admin_dashboard_ikhtisar_statistik/code.html', (html) => {
  html = html.replace(/data-path="admin-dashboard"\s+href="#"/g, 'data-path="admin-dashboard" href="code.html"');
  html = html.replace(/data-path="admin-content-manager"\s+href="#"/g, 'data-path="admin-content-manager" href="../admin_content_manager_kelola_kegiatan/code.html"');
  html = html.replace(/data-path="admin-settings"\s+href="#"/g, 'data-path="admin-settings" href="../admin_kelola_tambah_kegiatan/code.html"');
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');

  // Edit / Preview dropdown items
  html = html.replace(
    /(<a class="flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container-low transition-colors"\s+)href="#">\s*(<span class="material-symbols-outlined text-\[16px\] text-primary">edit<\/span>\s*Edit)/g,
    '$1href="../admin_kelola_tambah_kegiatan/code.html">$2'
  );
  html = html.replace(
    /(<a class="flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container-low transition-colors"\s+)href="#">\s*(<span class="material-symbols-outlined text-\[16px\] text-secondary">visibility<\/span>\s*Preview)/g,
    '$1href="../detail_cerita_kegiatan_sey_journal/code.html">$2'
  );
  return html;
});

// 10. admin_content_manager_kelola_kegiatan/code.html
updateFile('admin_content_manager_kelola_kegiatan/code.html', (html) => {
  html = html.replace(/data-path="admin-dashboard"\s+href="#"/g, 'data-path="admin-dashboard" href="../admin_dashboard_ikhtisar_statistik/code.html"');
  html = html.replace(/data-path="admin-content-manager"\s+href="#"/g, 'data-path="admin-content-manager" href="code.html"');
  html = html.replace(/data-path="admin-settings"\s+href="#"/g, 'data-path="admin-settings" href="../admin_kelola_tambah_kegiatan/code.html"');
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  return html;
});

// 11. admin_kelola_tambah_kegiatan/code.html
updateFile('admin_kelola_tambah_kegiatan/code.html', (html) => {
  // Remove fixed width/height/overflow lock
  html = html.replace(/<html lang="en"[^>]*>/i, '<html lang="en">');

  html = html.replace(/data-path="admin-dashboard"\s+href="#"/g, 'data-path="admin-dashboard" href="../admin_dashboard_ikhtisar_statistik/code.html"');
  html = html.replace(/data-path="admin-content-manager"\s+href="#"/g, 'data-path="admin-content-manager" href="../admin_content_manager_kelola_kegiatan/code.html"');
  html = html.replace(/data-path="admin-settings"\s+href="#"/g, 'data-path="admin-settings" href="code.html"');
  html = html.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="../home_portofolio_utama/code.html"');
  return html;
});

console.log('Finished updating all links!');
