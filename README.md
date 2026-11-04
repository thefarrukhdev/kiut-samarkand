# KIUT Samarkand — Toshkent Kimyo Xalqaro Universiteti Samarqand Filiali

[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.4.2-FBF0DF?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![Tests](https://img.shields.io/badge/Tests-19%20Passing-success?style=for-the-badge)](https://bun.sh/)

Rasmiy xalqaro ta'lim portali — **Toshkent Kimyo Xalqaro Universiteti Samarqand filiali** (`sam.kiut.uz`) uchun ishlab chiqilgan zamonaviy, tezkor va xalqaro akademik standartlarga mos rasmiy veb-platforma.

---

## 🏛 Loyiha Haqida

Ushbu platforma Toshkent Kimyo xalqaro universitetining Samarqand filiali uchun noldan to'liq qayta loyihalashtirilgan. Sayt nufuzli jahon universitetlari (Oxford, Cambridge, ETH Zurich, Stanford) ning vizual ierarxiyasi va zamonaviy akademik arxitekturasi asosida qurilgan.

### Asosiy Xususiyatlar:
- **Split Academic Hero:** Yorug'lik va me'moriy split kompozitsiya. Tipografiya sof daylight fonda, tabiiy yoritilgan talabalar laboratoriyasi va kampus hayoti esa alohida ramkali galereyada.
- **5 Asosiy Fakultet va 48+ Yo'nalish:**
  - 🩺 Tibbiyot fakulteti (Davolash ishi, Stomatologiya, Pediatriya, Oliy hamshiralik)
  - 💻 Muhandislik va IT fakulteti (Axborot tizimlari, Sun'iy intellekt, Dasturiy injiniring, Arxitektura)
  - 📊 Iqtisodiyot va Biznes fakulteti (Xalqaro iqtisodiy munosabatlar, Moliya, Bank ishi)
  - 🎓 Pedagogika va Ta'lim fakulteti (Boshlang'ich ta'lim, Maktabgacha ta'lim, Maxsus pedagogika)
  - 🌐 Filologiya va Xorijiy tillar fakulteti (Ingliz tili, Koreys tili, Sinxron tarjima)
- **Ko'p Tillilik Dvigateli (Multi-Language):** O'zbekcha (`uz`), Ruscha (`ru`), Inglizcha (`en`) tillariga bir lahzada (client-side dynamic locale) moslashuvchi to'liq tarjima tizimi.
- **Interaktiv Qabul (Admissions) Tizimi:** O'zbekiston telefon raqamlari (`+998`) uchun avtomatik formatlash va real-time tekshirish (`src/lib/phone.ts`).
- **REST API (`/api/admission`):** Arizalarni qabul qilish, tekshirish va tasdiqlash identifikatori (`confirmationId`) generatsiya qilish.
- **HEMIS Integratsiyasi:** Talabalar va o'qituvchilar uchun davlat axborot tizimiga tezkor ulanish.
- **Data Scraper & Extractor:** Asl sayt (`sam.kiut.uz`) dan 300 dan ortiq sahifa va media resurslarni avtomatlashtirilgan tarzda arxivlash tizimi (`data/`).

---

## 🎨 Brend Palitrasi

KIUT ning rasmiy tasdiqlangan ranglar tizimi:
- **KIUT Cerulean Cyan:** `#0096DB` (Asosiy aksent va harakat tugmalari)
- **KIUT Deep Academic Navy:** `#172D50` (Matn, sarlavhalar va institut nufuzi)
- **KIUT Royal Blue:** `#2364AD` (Yordamchi akademik aksent)
- **Architectural Ice Blue Canvas:** `#F4F7FC` / `#E9F2FF` (Fon va yuzalar)
- **Pure White:** `#FFFFFF` (Kartalar va toza kontrast)

---

## 📂 Loyiha Tuzilmasi

```
kiut-samarkand/
├── web/                               # Next.js 16 asosiy dasturi
│   ├── src/
│   │   ├── app/                       # App Router (sahifalar, layout, API)
│   │   │   ├── api/admission/         # Qabul arizalari API marshruti
│   │   │   ├── globals.css            # Tailwind CSS v4 dizayn tokenlari
│   │   │   ├── layout.tsx             # Root layout va meta-ma'lumotlar
│   │   │   └── page.tsx               # Bosh sahifa agregatori
│   │   ├── components/
│   │   │   ├── home/                  # Asosiy sahifa seksiyalari (Hero, Stats, Schools, News, About, CTA)
│   │   │   ├── layout/                # Navigatsiya (TopBar, Navbar, Footer)
│   │   │   ├── shared/                # Umumiy komponentlar (AdmissionModal, SocialIcons)
│   │   │   └── ui/                    # Atomik UI komponentlar (Button, Badge, Container)
│   │   ├── lib/                       # Utilitalar (phone, translations, admissions)
│   │   ├── types/                     # TypeScript interfeyslari
│   │   └── __tests__/                 # Testlar (19 ta unit va integratsiya testlari)
│   ├── public/assets/                 # Rasmiy logotiplar, bannerlar va fakultet fotosuratlari
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── data/                              # Ma'lumotlarni yig'ish va tahlil qilish
│   ├── scrape.py                      # sam.kiut.uz sayt crawler skripti
│   ├── extract_content.py             # HTML tahlilchi va JSON generatori
│   ├── extracted_home.json            # Bosh sahifa ma'lumotlari
│   ├── media_map.json                 # Media xaritasi (284 ta fayl)
│   └── content/                       # Fakultetlar va yangiliklar JSON arxivlari
├── vercel.json                        # Vercel deployment konfiguratsiyasi
├── package.json                       # Monorepo proxy skriptlari
└── README.md
```

---

## 🚀 O'rnatish va Ishga Tushirish

### Talablar:
- [Bun](https://bun.sh/) (tavsiya etiladi) yoki Node.js 20+

### 1. Repozitoriyani klonlash:
```bash
git clone git@github.com:thefarrukhdev/kiut-samarkand.git
cd kiut-samarkand
```

### 2. Bog'liqliklarni o'rnatish:
```bash
cd web
bun install
```

### 3. Dasturni ishga tushirish (Dev server):
```bash
bun run dev
```
Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### 4. Testlarni yurgizish:
```bash
bun test
```
*Barcha 19 ta test (telefon tekshiruvi, tarjima yaxlitligi, API marshruti, fakultet rezolveri) avtomatik ishga tushadi.*

### 5. Production Build:
```bash
bun run build
```

---

## 🧪 Sinovlar va Sifat Kafolati

- **Unit & Integration Tests:** 19 ta to'liq avtomatlashtirilgan test.
- **Type Safety:** TypeScript `strict: true` rejimida 0 ta xato.
- **Code Quality:** ESLint xatosiz (0 errors, 0 warnings).
- **Fast compilation:** Next.js Turbopack yordamida <1 soniyada yig'iladi.

---

## 📄 Litsenziya

MIT License. Toshkent Kimyo Xalqaro Universiteti Samarqand filiali uchun tayyorlangan. Muallif: [@thefarrukhdev](https://github.com/thefarrukhdev).
