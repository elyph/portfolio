# Elif Yetim — Kişisel Portfolyo

Koyu temalı, canlı vurgulu, tamamen statik tek sayfalık portfolyo sitesi. Build adımı yok; doğrudan GitHub Pages'te yayınlanır.

## İçindekiler

- **Hero** — isim, unvan, kısa tanıtım ve iletişim bağlantıları
- **Profil** — kısa özgeçmiş
- **Uzmanlık Alanları** — yetenek grupları
- **Deneyim** — stajlar (zaman çizelgesi)
- **Eğitim** — yüksek lisans ve lisans
- **Projeler** — 7 proje kartı (görsel + açıklama + teknolojiler + bağlantılar)
- **Diller** — Türkçe ve İngilizce seviyeleri
- **İletişim** — e-posta, GitHub, telefon, konum

## Klasör Yapısı

```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── favicon.svg
│   └── screenshots/
│       ├── rota-ai.png          → sen ekleyeceksin
│       ├── age-estimation.png   → sen ekleyeceksin
│       ├── budgetbuddy.png      → sen ekleyeceksin
│       ├── titanic.png          → sen ekleyeceksin
│       ├── uptime-status.png    → hazır
│       ├── solar-system.png     → hazır
│       ├── dataxid.png          → hazır
│       ├── dataxid-columns.png  → hazır
│       ├── dataxid-correlations.png → hazır
│       ├── rota-ai.svg          → placeholder (yedek)
│       ├── age-estimation.svg   → placeholder (yedek)
│       ├── budgetbuddy.svg      → placeholder (yedek)
│       └── titanic.svg          → placeholder (yedek)
└── README.md
```

## Yerelde Çalıştırma

```bash
cd portfolio
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` adresini aç. (Statik bir sunucu gerekir; `file://` ile modül/font sorunları olabilir.)

## GitHub Pages'e Yayınlama

1. `portfolio/` klasörünün içeriğini yeni bir repoya taşı (örn. `elyph.github.io` veya `portfolio`).
2. Repoyu GitHub'a push et.
3. Repo ayarlarından **Settings → Pages → Branch** kısmında `main` (veya kullandığın dal) seçip kaydet.

Statik dosyalar olduğu için başka yapılandırma gerekmez.

## Kendi Ekran Görüntülerini Ekleme

Şu 4 projenin görseli placeholder olarak bırakıldı. Gerçek ekran görüntülerini aynı isimle `assets/screenshots/` içine at — site otomatik olarak gerçek görseli gösterir (kod değişikliği gerekmez):

| Proje | Dosya adı |
|-------|-----------|
| Rota AI | `rota-ai.png` (veya `.jpg`) |
| Yaş Tahmini | `age-estimation.png` (veya `.jpg`) |
| BudgetBuddy | `budgetbuddy.png` (veya `.jpg`) |
| Titanic Survivors | `titanic.png` (veya `.jpg`) |

> İpucu: 16:10 oranlı görseller en iyi görünür. `rota-ai.svg`, `budgetbuddy.svg` gibi dosyalar yedektir; gerçek görsel eklendiğinde otomatik devre dışı kalır.

## Proje Bağlantılarını Güncelleme

Proje kartlarındaki GitHub bağlantıları repo adlarına göre tahmin edilerek yazıldı (`github.com/elyph/<repo>`). Eğer repo adların farklıysa `index.html` içindeki ilgili `href` değerlerini güncelle.

## Not — 3D Güneş Sistemi (import map)

`solar-system.png` görselini üretirken şu hata fark edildi: `3D-Solar-System` projesinin `index.html` dosyasında `three` için bir **import map** tanımlı değil, bu yüzden `OrbitControls.js` içindeki `import ... from "three"` satırı çözümlenemiyor ve sahne açılmıyor. Düzeltmek için projenin `index.html` dosyasına, `<script type="module" src="./main.js">` satırından **önce** şunu eklemen yeterli:

```html
<script type="importmap">
  { "imports": { "three": "./libs/three.module.js" } }
</script>
```
