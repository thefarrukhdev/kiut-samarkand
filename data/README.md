# KIUT Samarkand (`sam.kiut.uz`) — Yuklab olingan barcha aktivlar va ma'lumotlar bazasi

Ushbu katalogda `https://sam.kiut.uz/` saytidan yuklab olingan barcha materiallar professional tarzda toifalanib saqlangan.

## Katalog tuzilishi

```
kiut-samarkand-data/
├── content/                     # Strukturalangan toza ma'lumotlar (JSON formatida)
│   ├── faculties.json           # 46+ ta yo'nalish va fakultetlar tavsifi (UZ, RU, EN)
│   ├── news.json                # Barcha universitet yangiliklari, maqolalari (UZ, RU, EN)
│   └── extracted_home.json      # Bosh sahifa slaydlari, statistika va maktablar
│
├── media/                       # Barcha vizual fayllar (Jami 284 ta fayl, ~68 MB)
│   ├── banners/                 # Katta o'lchamdagi (1920x1080) bosh sahifa slayderlari va fon rasmlari
│   ├── photos/                  # Yangiliklar, tadbirlar va kampus fotosuratlari
│   └── icons_and_logos/         # KIUT logolari, fakultet ikonkalari va faviconlar
│
├── documents/                   # Universitet nizomi, talabalar qo'llanmasi (PDF fayllar)
│
├── raw_pages/                   # Asl HTML nusxalari (666 ta sahifa — zaxira arxiv)
│
└── media_map.json               # Asl URL manzillari va yuklangan fayllar moslik xaritasi
```

Barcha ma'lumotlar yangi loyihani boshlash uchun 100% tayyor holatga keltirildi.
