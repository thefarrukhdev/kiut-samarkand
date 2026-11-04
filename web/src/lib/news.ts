import rawNewsData from "@/data/news.json";
import type { Locale } from "@/types";

export type NewsCategory =
  | "all"
  | "academic"
  | "partnership"
  | "student-life"
  | "sport";

export type CategoryBadgeVariant =
  | "default"
  | "accent"
  | "action"
  | "royal"
  | "gold";

export interface ArticlePullQuote {
  quote: string;
  author: string;
  role: string;
}

export interface EnrichedArticle {
  id: number;
  index: number;
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  category: "academic" | "partnership" | "student-life" | "sport";
  categoryLabel: string;
  categoryBadgeVariant: CategoryBadgeVariant;
  date: string;
  readTime: string;
  image: string;
  imageCaption: string;
  highlights: string[];
  paragraphs: string[];
  pullQuote: ArticlePullQuote;
}

interface LocalizedArticleMeta {
  label: string;
  date: string;
  readTime: string;
  caption: string;
  highlights: string[];
  pullQuote: ArticlePullQuote;
}

interface ArticleStaticConfig {
  category: "academic" | "partnership" | "student-life" | "sport";
  image: string;
  badgeVariant: CategoryBadgeVariant;
  uz: LocalizedArticleMeta;
  ru: LocalizedArticleMeta;
  en: LocalizedArticleMeta;
}

const articlesConfig: ArticleStaticConfig[] = [
  // 0: Student Parliament Selection
  {
    category: "student-life",
    image: "/assets/banners/photo_2026-10-22_12-49-10.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Talabalar Hayoti",
      date: "28-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "KIUT Samarqand filiali Talabalar Parlamenti saralash jarayoni",
      highlights: [
        "Talabalar Parlamenti vitse-prezidentligi uchun nomzodlar saralash bosqichi",
        "Liderlik salohiyati, tashabbuskorlik va loyihalar taqdimoti",
        "Yoshlar ittifoqi boshlang'ich tashkiloti yetakchilarini aniqlash",
      ],
      pullQuote: {
        quote: "Faol, tashabbuskor va mas’uliyatli yoshlar — universitet taraqqiyoti hamda kelajak bunyodkorlaridir.",
        author: "Aylin Raxmatova",
        role: "Talabalar Parlamenti Prezidenti",
      },
    },
    ru: {
      label: "Студенческая жизнь",
      date: "28 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Отборочный этап Студенческого парламента Самаркандского филиала ТМУК",
      highlights: [
        "Отборочный тур на должность вице-президента Студенческого парламента",
        "Презентация студенческих проектов и инициатив развития филиала",
        "Оценка лидерского потенциала и умения работать в команде",
      ],
      pullQuote: {
        quote: "Активная, инициативная и ответственная молодёжь — движущая сила развития университета и созидатель будущего.",
        author: "Айлин Рахматова",
        role: "Президент Студенческого парламента",
      },
    },
    en: {
      label: "Student Life",
      date: "Oct 28, 2026",
      readTime: "3 min read",
      caption: "Student Parliament Vice Presidency selection proceedings at KIUT Samarkand",
      highlights: [
        "Competitive selection round for Student Parliament leadership positions",
        "Assessment of executive initiatives and campus enhancement projects",
        "Empowerment of active youth governance within the university ecosystem",
      ],
      pullQuote: {
        quote: "Active, initiative-driven, and responsible young leaders are the driving force behind the university's development.",
        author: "Aylin Rakhmatova",
        role: "President of the Student Parliament",
      },
    },
  },

  // 1: Transport Department Memorandum
  {
    category: "partnership",
    image: "/assets/banners/photo_2026-10-22_17-11-57.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "royal",
    uz: {
      label: "Hamkorlik",
      date: "25-Oktabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "KIUT Samarqand filiali va Viloyat Transport boshqarmasi o'rtasida memorandum imzolanishi",
      highlights: [
        "Samarqand viloyat Transport boshqarmasi bilan rasmiy sheriklik",
        "Yo'l harakati boshqaruvi talabalari uchun amaliyot dasturlari",
        "Ikki tomonlama seminar-treninglar va sohaviy mahorat darslari",
      ],
      pullQuote: {
        quote: "Ushbu memorandum talabalarimizga nazariy bilimlarni bevosita viloyat transport infratuzilmasida amaliyot bilan mustahkamlash imkonini beradi.",
        author: "Prof. Nizamjon Ishonkulov",
        role: "Filial direktori",
      },
    },
    ru: {
      label: "Сотрудничество",
      date: "25 октября, 2026",
      readTime: "2 мин. чтения",
      caption: "Подписание меморандума между филиалом ТМУК и Управлением транспорта области",
      highlights: [
        "Официальное партнерство с Управлением транспорта Самаркандской области",
        "Производственная практика для студентов специальности организации дорожного движения",
        "Организация совместных семинаров и практических мастер-классов",
      ],
      pullQuote: {
        quote: "Меморандум открывает студентам прямую дорогу к реальной производственной практике в транспортной системе региона.",
        author: "Проф. Низамжон Ишонкулов",
        role: "Директор филиала",
      },
    },
    en: {
      label: "Partnership",
      date: "Oct 25, 2026",
      readTime: "2 min read",
      caption: "Signing of the bilateral cooperation memorandum with the Regional Transport Department",
      highlights: [
        "Strategic partnership with Samarkand Regional Transport Administration",
        "Structured clinical internships for Traffic Management engineering students",
        "Joint research seminars and technical workshops with industry experts",
      ],
      pullQuote: {
        quote: "This strategic agreement empowers our students to bridge academic theory with direct municipal infrastructure practice.",
        author: "Prof. Nizamjon Ishonkulov",
        role: "Branch Director",
      },
    },
  },

  // 2: Founder's Cup / Sports Tournament
  {
    category: "sport",
    image: "/assets/banners/5be7a7df-2dc1-4914-b55b-ef42f837c41f_copy.png__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Sport & Madaniyat",
      date: "23-Oktabr, 2026",
      readTime: "4 daqiqa o'qish",
      caption: "Ta'sischi kubogi uchun uch kampus talabalari o'rtasidagi futbol musobaqasi",
      highlights: [
        "Toshkent, Namangan va Samarqand kampuslarining 8 ta jamoasi bellashuvi",
        "Samarqand filiali mezbonligida do'stona va murosasiz kurash",
        "Sport orqali sog'lom turmush tarzi va kampuslararo birdamlikni mustahkamlash",
      ],
      pullQuote: {
        quote: "Turnir nafaqat 3 ta kampus talabalari o'rtasidagi bellashuv, balki o'zaro tanishuv va do'stlik rishtalarini o'rnatishi bilan ham ahamiyatlidir.",
        author: "Universitet sport kengashi",
        role: "Tashkiliy qo'mita",
      },
    },
    ru: {
      label: "Спорт и культура",
      date: "23 октября, 2026",
      readTime: "4 мин. чтения",
      caption: "Футбольный турнир «Кубок учредителя» между студентами трех кампусов",
      highlights: [
        "8 команд из Ташкента, Намангана и Самарканда боролись за почетный кубок",
        "Самаркандский кампус выступил гостеприимной площадкой соревнований",
        "Укрепление здорового образа жизни и межкампусной дружбы",
      ],
      pullQuote: {
        quote: "Турнир стал не только спортивным состязанием, но и важным праздником дружбы между студентами всех филиалов.",
        author: "Спортивный совет университета",
        role: "Оргкомитет",
      },
    },
    en: {
      label: "Sports & Culture",
      date: "Oct 23, 2026",
      readTime: "4 min read",
      caption: "Founder's Cup football tournament uniting athletes across three KIUT campuses",
      highlights: [
        "8 premier collegiate teams from Tashkent, Namangan, and Samarkand",
        "Samarkand campus proudly hosted the inter-campus championship",
        "Fostering athletic excellence, wellness, and collegiate brotherhood",
      ],
      pullQuote: {
        quote: "Athletics builds more than physical agility; it bridges friendship and unified spirit across our campuses.",
        author: "University Athletics Council",
        role: "Organizing Committee",
      },
    },
  },

  // 3: Behbudiy Museum Visit
  {
    category: "academic",
    image: "/assets/photos/registan.jpg__1520x535_q85_subsampling-2.jpg",
    badgeVariant: "gold",
    uz: {
      label: "Ma'naviyat & Meros",
      date: "22-Oktabr, 2026",
      readTime: "5 daqiqa o'qish",
      caption: "Boshlang'ich ta'lim yo'nalishi talabalari Mahmudxo'ja Behbudiy uy-muzeyida",
      highlights: [
        "Jadidchilik harakati yetakchisi Mahmudxo'ja Behbudiy merosini o'rganish",
        "Talabalarning uy-muzey eksponatlari va nodir arxivlar bilan tanishuvi",
        "Pedagogika dotsenti A. Usmonov va muzey direktori G. Axmedov ma'ruzalari",
      ],
      pullQuote: {
        quote: "Bo'lajak pedagoglar bugungi kunda ta'lim uchun yaratilgan imkoniyatlar ortida o'z moli va jonini ayamagan buyuk ajdodlari ruhiga ehtirom bildirishdi.",
        author: "A. Usmonov",
        role: "Pedagogika va psixologiya kafedrasi dotsenti",
      },
    },
    ru: {
      label: "Культурное наследие",
      date: "22 октября, 2026",
      readTime: "5 мин. чтения",
      caption: "Студенты начального образования посетили дом-музей Махмудходжи Бехбуди",
      highlights: [
        "Изучение наследия лидера просветительского движения джадидизма",
        "Ознакомление с архивными документами первой новометодной школы",
        "Лекции доцента А. Усмонова и директора музея Г. Ахмедова",
      ],
      pullQuote: {
        quote: "Будущие педагоги прикоснулись к великому наследию предков, посвятивших жизнь просвещению и прогрессу народа.",
        author: "А. Усмонов",
        role: "Доцент кафедры педагогики и психологии",
      },
    },
    en: {
      label: "Heritage & Culture",
      date: "Oct 22, 2026",
      readTime: "5 min read",
      caption: "Primary Education scholars explore the historic Mahmudkhoja Behbudiy House-Museum",
      highlights: [
        "Scholarly immersion in the Jadid reformist educational movement",
        "Direct engagement with century-old pedagogical manuscripts and artifacts",
        "Keynote talks by Assoc. Prof. A. Usmonov and Museum Director G. Akhmedov",
      ],
      pullQuote: {
        quote: "Future educators honored the courageous pioneers whose sacrifices paved the way for modern academic freedom.",
        author: "A. Usmonov",
        role: "Associate Professor of Pedagogy",
      },
    },
  },

  // 4: Science Olympiad & AI Course
  {
    category: "academic",
    image: "/assets/banners/8y8a7608.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Akademik Yutuq",
      date: "20-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Fan olimpiadasi sovrindorlari va Sun'iy intellekt kursi bitiruvchilarini taqdirlash",
      highlights: [
        "Kampuslararo fan olimpiadasi g'oliblariga diplom va sovg'alar topshirildi",
        "IT Park va Fidelety AI Health bilan hamkorlikdagi AI savodxonligi kursi yakunlandi",
        "Tibbiyot fakulteti iqtidorli talabalari va professorlari sertifikat oldi",
      ],
      pullQuote: {
        quote: "Universitet rahbariyati o'zining bilimi, iqtidori va salohiyati bilan tengdoshlariga o'rnak bo'layotgan talabalarni har doim qo'llab-quvvatlaydi.",
        author: "Prof. Nizamjon Ishonkulov",
        role: "KIUT Samarqand filiali direktori",
      },
    },
    ru: {
      label: "Академические успехи",
      date: "20 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Церемония награждения победителей олимпиады и выпускников курса по ИИ",
      highlights: [
        "Вручение дипломов призерам межкампусной предметной олимпиады",
        "Завершение сертификационного курса по грамотности в сфере ИИ с IT Park",
        "Поддержка одаренных студентов и инновационных преподавателей медицины",
      ],
      pullQuote: {
        quote: "Руководство университета всегда готово всесторонне поддерживать студентов, стремящихся к передовым знаниям и технологиям.",
        author: "Проф. Низамжон Ишонкулов",
        role: "Директор филиала",
      },
    },
    en: {
      label: "Academic Milestone",
      date: "Oct 20, 2026",
      readTime: "3 min read",
      caption: "Honoring academic Olympiad laureates and AI Literacy certificate recipients",
      highlights: [
        "Recognition of inter-campus science Olympiad winners with honors",
        "Successful conclusion of AI in Healthcare training with IT Park & Fidelety",
        "Presentation of research awards to outstanding scholars and faculty",
      ],
      pullQuote: {
        quote: "University leadership remains committed to championing ambitious scholars who set benchmarks in science and innovation.",
        author: "Prof. Nizamjon Ishonkulov",
        role: "Director of Samarkand Branch",
      },
    },
  },

  // 5: State Language Status Day
  {
    category: "student-life",
    image: "/assets/banners/275e01d7-6c85-45ed-99f8-4cd81592bd8f.png__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "default",
    uz: {
      label: "Bayram & Ma'naviyat",
      date: "21-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "O'zbek tiliga davlat tili maqomi berilgan kun munosabati bilan adabiy-badiiy kecha",
      highlights: [
        "O'zbek tiliga davlat tili maqomi berilganligining 37 yilligi tantanasi",
        "Professor-o'qituvchilarning ona tili tarixi va taraqqiyoti haqidagi ma'ruzalari",
        "Talabalar tomonidan tayyorlangan adabiy-musiqiy chiqishlar va badiiy o'qish",
      ],
      pullQuote: {
        quote: "Ona tilimiz — millatimiz ruhi, o‘zligimiz timsoli va kelajagimiz poydevoridir! Uni asrash va ravnaq toptirish har birimizning sharafli burchimizdir.",
        author: "Filial rahbariyati",
        role: "Matbuot xizmati",
      },
    },
    ru: {
      label: "Праздники и культура",
      date: "21 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Литературно-просветительское мероприятие ко Дню государственного языка",
      highlights: [
        "37-летие со дня придания узбекскому языку статуса государственного",
        "Научные доклады преподавателей о культуре речи и языковом наследии",
        "Поэтические и творческие выступления талантливых студентов",
      ],
      pullQuote: {
        quote: "Родной язык — душа народа, основа нашей идентичности и залог процветания грядущих поколений.",
        author: "Пресс-служба",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "Campus Event",
      date: "Oct 21, 2026",
      readTime: "3 min read",
      caption: "Celebratory assembly observing State Language Day at KIUT Samarkand",
      highlights: [
        "Marking the 37th milestone anniversary of Uzbek State Language recognition",
        "Scholarly discourse by linguistics faculty on linguistic heritage and preservation",
        "Poetry recitations and performing arts showcases curated by students",
      ],
      pullQuote: {
        quote: "Our language is our national soul and cultural bedrock; safeguarding its integrity is our shared academic calling.",
        author: "Campus Leadership",
        role: "Press Office",
      },
    },
  },

  // 6: Road Show Presentation
  {
    category: "partnership",
    image: "/assets/banners/photo_2026-10-14_17-24-27.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "royal",
    uz: {
      label: "Hamkorlik",
      date: "18-Oktabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "Turizm yo'nalishi talabalari Davlat aktivlarini boshqarish agentligi Road Show taqdimotida",
      highlights: [
        "Turizm yo'nalishi talabalarining investitsion taqdimotdagi ishtiroki",
        "E-auksion.uz savdo platformasi va xususiylashtirish tartiblari bilan tanishuv",
        "Davlat aktivlari va bo'sh turgan inshootlarni iqtisodiy tahlil qilish",
      ],
      pullQuote: {
        quote: "Bunday amaliy tadbirlar talabalarimizga ko'chmas mulk va investitsiya bozoridagi real jarayonlarni o'rganish imkonini beradi.",
        author: "Iqtisodiyot kafedrasi",
        role: "Amaliyot bo'limi",
      },
    },
    ru: {
      label: "Сотрудничество",
      date: "18 октября, 2026",
      readTime: "2 мин. чтения",
      caption: "Студенты направления туризма приняли участие в презентации Road Show",
      highlights: [
        "Участие в презентации Агентства по управлению госактивами",
        "Изучение механизмов торгов на электронной платформе e-auksion.uz",
        "Практический анализ инвестиционных объектов Самаркандской области",
      ],
      pullQuote: {
        quote: "Участие в Road Show дает будущим специалистам реальное понимание инвестиционных процедур и рынка недвижимости.",
        author: "Кафедра экономики",
        role: "Отдел практики",
      },
    },
    en: {
      label: "Partnership",
      date: "Oct 18, 2026",
      readTime: "2 min read",
      caption: "Tourism and business students attending State Assets Management Road Show",
      highlights: [
        "Engagement with regional State Assets Management Agency delegates",
        "Hands-on demonstration of e-auksion.uz transparent public bidding platforms",
        "Commercial analysis of regional infrastructure and real estate assets",
      ],
      pullQuote: {
        quote: "Real-world market exposure provides our students with invaluable commercial acumen in regional investment.",
        author: "Department of Economics",
        role: "Industry Placement Division",
      },
    },
  },

  // 7: Social-Psychological Training
  {
    category: "student-life",
    image: "/assets/banners/photo_2026-10-28_15-00-17.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Talabalar Hayoti",
      date: "17-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Psixologiya yo'nalishi talabalari SOS Bolalar mahallalarida trening o'tkazmoqda",
      highlights: [
        "“Men jamiyatning bir bo‘lagiman” shiori ostidagi volontyorlik treningi",
        "Bolalarda o'ziga ishonch va ijtimoiy moslashuv ko'nikmalarini rivojlantirish",
        "Psixologiya 3-kurs talabalarining amaliy kasbiy ko'nikmalarini oshirish",
      ],
      pullQuote: {
        quote: "Mazkur tashabbus talabalarda ijtimoiy mas’uliyat, hamdardlik va insonparvarlik fazilatlarini rivojlantirishga xizmat qiladi.",
        author: "Psixologiya kafedrasi",
        role: "Trening kuratori",
      },
    },
    ru: {
      label: "Студенческая жизнь",
      date: "17 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Студенты-психологи провели тренинг в Ассоциации SOS Детские деревни",
      highlights: [
        "Волонтерский тренинг под девизом «Я — часть общества»",
        "Развитие у детей уверенности в себе и чувства социальной сопричастности",
        "Практическая отработка профессиональных методов арт-терапии",
      ],
      pullQuote: {
        quote: "Эта инициатива формирует у будущих психологов глубокую эмпатию, социальную ответственность и гуманизм.",
        author: "Кафедра психологии",
        role: "Куратор проекта",
      },
    },
    en: {
      label: "Student Life",
      date: "Oct 17, 2026",
      readTime: "3 min read",
      caption: "Applied Psychology scholars leading developmental workshops at SOS Children's Village",
      highlights: [
        "Interactive developmental workshop titled 'I Am Part of Society'",
        "Strengthening emotional resilience and belonging among local children",
        "Direct clinical field experience for senior psychology undergraduates",
      ],
      pullQuote: {
        quote: "Community engagement nurtures true empathy, civic responsibility, and therapeutic excellence in our scholars.",
        author: "Department of Psychology",
        role: "Project Advisor",
      },
    },
  },

  // 8: Hungarian Professor Guest Lecture
  {
    category: "academic",
    image: "/assets/banners/daniel_prof.png__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "royal",
    uz: {
      label: "Xalqaro Dars",
      date: "16-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Debrecen universiteti professori Daniel Haitas KIUT Samarqand talabalari uchun ma'ruzada",
      highlights: [
        "Vengriyaning Debrecen universiteti huquq fakulteti dekani ma'ruzasi",
        "Yevropa va O'zbekiston o'rtasidagi tarixiy va diplomatik aloqalar tahlili",
        "Erasmus+ dasturi doirasidagi xalqaro akademik almashinuv",
      ],
      pullQuote: {
        quote: "Mr. Haitasning o'zbek xalqi madaniyati bilan chuqur tanishligi va samimiy muloqoti talabalarda katta taassurot qoldirdi.",
        author: "Xalqaro aloqalar bo'limi",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Международная лекция",
      date: "16 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Профессор Дебреценского университета Даниэль Хаитас проводит лекцию",
      highlights: [
        "Лекция декана юридического факультета Университета Дебрецена (Венгрия)",
        "Анализ многовековых связей между Европой и Узбекистаном",
        "Сотрудничество в рамках европейской программы академической мобильности Erasmus+",
      ],
      pullQuote: {
        quote: "Глубокое уважение профессора к узбекской культуре и открытый диалог вызвали огромный интерес среди студентов.",
        author: "Отдел международных связей",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "International Lecture",
      date: "Oct 16, 2026",
      readTime: "3 min read",
      caption: "Prof. Daniel Haitas of Debrecen University delivering visiting keynote at KIUT Samarkand",
      highlights: [
        "Guest keynote by Dean of Law at the University of Debrecen, Hungary",
        "Historical and diplomatic trajectory of European-Uzbek bilateral relations",
        "Full academic sponsorship through the European Union Erasmus+ framework",
      ],
      pullQuote: {
        quote: "Professor Haitas's profound appreciation of Uzbek jurisprudence and culture created an electric learning atmosphere.",
        author: "International Relations Office",
        role: "KIUT Samarkand",
      },
    },
  },

  // 9: Mass Dictation Results
  {
    category: "academic",
    image: "/assets/banners/photo_2026-10-14_17-24-26.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Natijalar",
      date: "15-Oktabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "Ommaviy diktant tanlovi g'oliblari va eng chiroyli husnixat sohibalari",
      highlights: [
        "Talabalar va professor-o'qituvchilar o'rtasidagi diktant natijalari e'lon qilindi",
        "O'zbek tili va adabiyoti talabalari yuqori 90+ ballik natijalarni qayd etdi",
        "G'oliblar va chiroyli husnixat egalari maxsus diplomlar bilan taqdirlanadi",
      ],
      pullQuote: {
        quote: "Savodxonlik va adabiy til me’yorlariga rioya qilish har bir ziyoli insonning kundalik fazilatidir.",
        author: "Hakamlar hay'ati",
        role: "Ommaviy diktant tashkiliy kengashi",
      },
    },
    ru: {
      label: "Итоги конкурса",
      date: "15 октября, 2026",
      readTime: "2 мин. чтения",
      caption: "Объявление победителей общеуниверситетского диктанта по узбекскому языку",
      highlights: [
        "Публикация итоговых баллов среди студентов и преподавательского состава",
        "Студенты филологических дисциплин показали результаты выше 90 баллов",
        "Специальные номинации за безупречную каллиграфию и грамотность",
      ],
      pullQuote: {
        quote: "Высокая грамотность и безупречное владение языковыми нормами — признак современного интеллектуала.",
        author: "Жюри конкурса",
        role: "Оргкомитет",
      },
    },
    en: {
      label: "Contest Results",
      date: "Oct 15, 2026",
      readTime: "2 min read",
      caption: "Celebrating highest scores and calligraphy honors in the Campus Dictation Contest",
      highlights: [
        "Final scores published across student bodies and teaching faculties",
        "Language & Philology majors recorded exemplary 90+ percentile marks",
        "Commendations awarded for outstanding orthographic accuracy and calligraphy",
      ],
      pullQuote: {
        quote: "Orthographic precision and linguistic elegance embody the core virtues of academic scholarship.",
        author: "Examination Jury",
        role: "Linguistic Committee",
      },
    },
  },

  // 10: Guest Lecture Announcement
  {
    category: "academic",
    image: "/assets/banners/daniel_prof.png__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "gold",
    uz: {
      label: "E'lon & Tadbir",
      date: "14-Oktabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "Debrecen universiteti professori Daniel Haitas mehmondorchilik ma'ruzasi afishasi",
      highlights: [
        "Vengriyalik taniqli huquqshunos professor Daniel Haitas tashrifi",
        "20-22-oktabr kunlari soat 10:00 da D binosi 113-xonada ochiq ma'ruza",
        "Yevropa Ittifoqi Erasmus+ fondi tomonidan to'liq moliyalashtirilgan loyiha",
      ],
      pullQuote: {
        quote: "Yevropa huquq tizimi va xalqaro diplomatiya mavzusidagi ochiq darsga barcha qiziquvchilarni taklif etamiz.",
        author: "Akademik taqvim xizmati",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Объявление",
      date: "14 октября, 2026",
      readTime: "2 мин. чтения",
      caption: "Анонс гостевой лекции профессора Даниэля Хаитаса из Университета Дебрецена",
      highlights: [
        "Визит ведущего европейского профессора права Даниэля Хаитаса",
        "Открытые лекции 20-22 октября в аудитории D-113 с 10:00",
        "Финансирование визита в рамках престижной программы Erasmus+",
      ],
      pullQuote: {
        quote: "Приглашаем студентов всех факультетов принять участие в открытом диалоге о международном праве и дипломатии.",
        author: "Учебная часть",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "Announcement",
      date: "Oct 14, 2026",
      readTime: "2 min read",
      caption: "Public lecture announcement featuring Prof. Daniel Haitas of Debrecen",
      highlights: [
        "Academic visit by European legal scholar Prof. Daniel Haitas",
        "Interactive open symposium October 20-22 in Auditorium D-113",
        "Full support funded via the European Union Erasmus+ educational fund",
      ],
      pullQuote: {
        quote: "All students and faculty are warmly invited to attend this rare masterclass in comparative jurisprudence.",
        author: "Academic Affairs Division",
        role: "KIUT Samarkand",
      },
    },
  },

  // 11: Mass Dictation Held
  {
    category: "academic",
    image: "/assets/banners/photo_2026-10-14_17-24-26.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Til & Madaniyat",
      date: "12-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "KIUT Samarqand filialida Ommaviy diktant tanlovi jarayoni",
      highlights: [
        "Professor-o'qituvchilar va talabalar uchun imloviy savodxonlik sinovi",
        "Ona tilining nufuzini yuksaltirish va adabiy me'yorlarni mustahkamlash",
        "Yuzlab talabalar ishtirokida shaffof va qiziqarli imtihon muhiti",
      ],
      pullQuote: {
        quote: "O‘zbek tili — milliy o‘zligimiz va madaniyatimizning muhim timsolidir. Uni asrab-avaylash har birimizning burchimizdir.",
        author: "Tashkiliy qo'mita",
        role: "Filologiya kafedrasi",
      },
    },
    ru: {
      label: "Язык и культура",
      date: "12 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Проведение масштабного диктанта среди студентов и преподавателей",
      highlights: [
        "Массовая проверка грамотности и знания правил правописания",
        "Повышение статуса родного языка в академической среде",
        "Сотни участников в дружественной интеллектуальной атмосфере",
      ],
      pullQuote: {
        quote: "Бережное отношение к языку — основа сохранения духовности и культурного суверенитета.",
        author: "Кафедра языков",
        role: "Оргкомитет",
      },
    },
    en: {
      label: "Language & Culture",
      date: "Oct 12, 2026",
      readTime: "3 min read",
      caption: "University-wide dictation tournament in progress at KIUT Samarkand",
      highlights: [
        "Institution-wide literacy and grammatical competency assessment",
        "Celebrating native linguistic preservation and standardized writing",
        "Broad cross-departmental turnout among students and faculty members",
      ],
      pullQuote: {
        quote: "Preserving linguistic elegance is central to celebrating our collective identity and scholarly integrity.",
        author: "Linguistics Faculty",
        role: "Event Organizers",
      },
    },
  },

  // 12: Five Initiatives Sports Olympiad
  {
    category: "sport",
    image: "/assets/banners/5be7a7df-2dc1-4914-b55b-ef42f837c41f_copy.png__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Sport & Tashabbus",
      date: "10-Oktabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "Besh tashabbus olimpiadasi sport o'yinlari start oldi",
      highlights: [
        "Talaba-yoshlar o'rtasida 'Besh tashabbus' sport musobaqalariga start berildi",
        "Futbol, voleybol, shaxmat va stol tennisi bo'yicha saralash bellashuvlari",
        "Talabalarning jismoniy faolligi va jamoaviy ruhini yuksaltirish",
      ],
      pullQuote: {
        quote: "Besh tashabbus doirasidagi musobaqalar talabalarda sog'lom turmush tarzi va sportga mehr tuyg'usini uyg'otadi.",
        author: "Yoshlar bilan ishlash bo'limi",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Спорт и инициативы",
      date: "10 октября, 2026",
      readTime: "2 мин. чтения",
      caption: "Старт спортивных игр в рамках молодежной спартакиады «Besh tashabbus»",
      highlights: [
        "Открытие спортивной спартакиады «Пять инициатив» для студентов",
        "Соревнования по мини-футболу, волейболу, шахматам и настольному теннису",
        "Массовое вовлечение молодежи в регулярные занятия спортом",
      ],
      pullQuote: {
        quote: "Спортивные турниры воспитывают в молодежи выносливость, целеустремленность и лидерство.",
        author: "Отдел по работе с молодежью",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "Sports & Wellness",
      date: "Oct 10, 2026",
      readTime: "2 min read",
      caption: "Opening ceremonies of the collegiate Five Initiatives athletic tournament",
      highlights: [
        "Official launch of the Five Initiatives collegiate athletic festival",
        "Competitive tournaments spanning football, volleyball, chess, and table tennis",
        "Elevating student wellness, teamwork, and healthy campus competition",
      ],
      pullQuote: {
        quote: "Campus athletics builds endurance, strategic resilience, and enduring peer friendships.",
        author: "Youth Affairs Directorate",
        role: "KIUT Samarkand",
      },
    },
  },

  // 13: Intellectual Property Seminar
  {
    category: "academic",
    image: "/assets/banners/20261022125829.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "royal",
    uz: {
      label: "Ilmiy Seminar",
      date: "8-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Intellektual mulk markazi vakillari bilan o'tkazilgan ilmiy-amaliy seminar",
      highlights: [
        "Adliya vazirligi huzuridagi Intellektual mulk markazi bosh maslahatchisi ma'ruzasi",
        "Mualliflik huquqi, patentlar va dasturiy ta'minotni ro'yxatdan o'tkazish tartibi",
        "Professor-o'qituvchilarning ilmiy ishlanmalarini tijoratlashtirish yo'llari",
      ],
      pullQuote: {
        quote: "Ilmiy kashfiyotlar va innovatsion loyihalarni huquqiy himoya qilish universitetimizning ustuvor vazifalaridan biridir.",
        author: "I. Ubaydullayev",
        role: "Intellektual mulk markazi bosh maslahatchisi",
      },
    },
    ru: {
      label: "Научный семинар",
      date: "8 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Научно-практический семинар по правовой охране интеллектуальной собственности",
      highlights: [
        "Выступление главного консультанта Центра интеллектуальной собственности Минюста",
        "Процедуры регистрации патентов, авторских прав и программных разработок",
        "Коммерциализация научно-исследовательских трудов ученых филиала",
      ],
      pullQuote: {
        quote: "Правовая защита инноваций и результатов умственного труда — фундамент современной исследовательской науки.",
        author: "И. Убайдуллаев",
        role: "Главный консультант Центра интеллектуальной собственности",
      },
    },
    en: {
      label: "Scientific Seminar",
      date: "Oct 8, 2026",
      readTime: "3 min read",
      caption: "Intellectual property and patent registration workshop with Ministry experts",
      highlights: [
        "Keynote by Principal Advisor of the State Intellectual Property Center",
        "Patent filing procedures, software copyright protections, and trademark laws",
        "Strategic avenues for commercializing university faculty research innovations",
      ],
      pullQuote: {
        quote: "Safeguarding academic inventions and intellectual property is pivotal for global research commercialization.",
        author: "I. Ubaydullayev",
        role: "Principal IP Advisory Specialist",
      },
    },
  },

  // 14: Repression Victims Contest
  {
    category: "academic",
    image: "/assets/photos/history.png",
    badgeVariant: "gold",
    uz: {
      label: "Tarix & Xotira",
      date: "5-Oktabr, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Qatag'on qurbonlari xotirasiga bag'ishlangan ilmiy maqolalar tanlovi e'loni",
      highlights: [
        "Jadidchilik harakati va ma'rifatparvarlar hayotini tadqiq etish tanlovi",
        "Talabalarning mustaqil ilmiy maqolalari va yozma mulohazalari qabuli",
        "Eng yaxshi tadqiqotlar universitet ilmiy to'plamida chop etiladi",
      ],
      pullQuote: {
        quote: "Tarixiy xotirani e'zozlash va fidoyi ma'rifatparvarlar nomini abadiylashtirish — yosh avlodning ma'naviy burchidir.",
        author: "Ijtimoiy-gumanitar fanlar kafedrasi",
        role: "Ilmiy kengash",
      },
    },
    ru: {
      label: "История и память",
      date: "5 октября, 2026",
      readTime: "3 мин. чтения",
      caption: "Конкурс научных статей, посвященный памяти жертв репрессий и джадидов",
      highlights: [
        "Исследование жизни просветителей движения джадидизма и жертв репрессий",
        "Прием студенческих научных статей и исторических эссе",
        "Публикация лучших исследований в сборнике научных трудов филиала",
      ],
      pullQuote: {
        quote: "Почитание исторической памяти и наследия просветителей — священный долг каждого молодого исследователя.",
        author: "Кафедра гуманитарных наук",
        role: "Научный совет",
      },
    },
    en: {
      label: "History & Memory",
      date: "Oct 5, 2026",
      readTime: "3 min read",
      caption: "Call for academic papers commemorating victims of political repression",
      highlights: [
        "Scholarly research contest examining the Central Asian Jadid enlightenment",
        "Call for peer submissions across historical essays and critical commentary",
        "Top authored monographs published in the University Scientific Anthology",
      ],
      pullQuote: {
        quote: "Honoring historical memory and intellectual martyrs anchors our ethical and academic foundations.",
        author: "Department of Humanities",
        role: "Research Council",
      },
    },
  },

  // 15: Classes Begin September 7
  {
    category: "student-life",
    image: "/assets/banners/8y8a8213.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "O'quv Jarayoni",
      date: "1-Sentabr, 2026",
      readTime: "2 daqiqa o'qish",
      caption: "KIUT Samarqand kampusida 2026/2027 o'quv yili boshlanishiga tayyorgarlik",
      highlights: [
        "1-kurslar uchun dars mashg'ulotlari 7-sentabrdan boshlanadi",
        "Yuqori kurslar uchun akademik jadval va yo'riqnomalar tasdiqlandi",
        "Barcha ma'ruza zallari va laboratoriyalar to'liq shay holatga keltirildi",
      ],
      pullQuote: {
        quote: "Barcha talabalarimizni yangi o'quv yili bilan tabriklaymiz va yangi ilmiy marralarni zabt etishlarida muvaffaqiyatlar tilaymiz!",
        author: "O'quv-uslubiy boshqarma",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Учебный процесс",
      date: "1 сентября, 2026",
      readTime: "2 мин. чтения",
      caption: "Подготовка аудиторий и лабораторий Самаркандского кампуса к 7 сентября",
      highlights: [
        "Для студентов 1 курса занятия стартуют 7 сентября",
        "Утверждено академическое расписание для старших курсов всех факультетов",
        "Лаборатории и мультимедийные аудитории полностью готовы к учебному году",
      ],
      pullQuote: {
        quote: "Поздравляем всех студентов с началом нового учебного года и желаем ярких академических свершений!",
        author: "Учебно-методическое управление",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "Academic Calendar",
      date: "Sep 1, 2026",
      readTime: "2 min read",
      caption: "Campus readiness and lecture hall preparations ahead of the academic term",
      highlights: [
        "Orientation and fall semester classes commence September 7 for freshmen",
        "Finalized curriculum timetables released across all five faculties",
        "Advanced simulation laboratories ready for hands-on clinical and engineering coursework",
      ],
      pullQuote: {
        quote: "We extend a heartfelt welcome to all incoming scholars as they embark on an extraordinary academic journey.",
        author: "Academic Registrar",
        role: "KIUT Samarkand",
      },
    },
  },

  // 16: Top 3 Reasons to Study Architecture
  {
    category: "academic",
    image: "/assets/photos/architecture-and-urban-design.png",
    badgeVariant: "gold",
    uz: {
      label: "Kasbiy Yo'nalish",
      date: "25-Avgust, 2026",
      readTime: "4 daqiqa o'qish",
      caption: "Arxitektura va shaharsozlik dizayni yo'nalishi laboratoriyasi va studiyalari",
      highlights: [
        "Ijodkorlik, muhandislik hisob-kitoblari va san'at uyg'unligi",
        "Xalqaro andozalarga mos litsenziyali diplom va dual dasturlar",
        "Global miqyosda yuqori talabga ega arxitektor va shaharsoz kasbi",
      ],
      pullQuote: {
        quote: "Arxitektura — bu shunchaki bino chizish emas, balki jamiyatning kelajak makonlarini yaratish va qulay muhit barpo etish san’atidir.",
        author: "Arxitektura kafedrasi",
        role: "Bosh o'qituvchi",
      },
    },
    ru: {
      label: "Специальность",
      date: "25 августа, 2026",
      readTime: "4 мин. чтения",
      caption: "Архитектурные проектные мастерские и макетные студии филиала",
      highlights: [
        "Синтез творческого видения, инженерных расчетов и передовых технологий",
        "Международные стандарты обучения и программы двойного диплома",
        "Высокая востребованность архитекторов и урбанистов в Узбекистане и за рубежом",
      ],
      pullQuote: {
        quote: "Архитектура — это искусство проектирования пространств будущего, меняющих качество жизни людей.",
        author: "Кафедра архитектуры",
        role: "Ведущий преподаватель",
      },
    },
    en: {
      label: "Career Insights",
      date: "Aug 25, 2026",
      readTime: "4 min read",
      caption: "Architecture & Urban Design studio drafting facilities at KIUT Samarkand",
      highlights: [
        "Harmonious fusion of spatial artistry, structural engineering, and digital modeling",
        "International dual-degree tracks with European and South Korean partner institutions",
        "High global employability in smart urban planning and sustainable architecture",
      ],
      pullQuote: {
        quote: "Architecture is not merely building walls; it is the fine art of shaping human environments for generations to come.",
        author: "School of Architecture",
        role: "Lead Faculty",
      },
    },
  },

  // 17: Professor Visiting US University
  {
    category: "partnership",
    image: "/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "royal",
    uz: {
      label: "Xalqaro Tajriba",
      date: "18-Avgust, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "Dotsent O. Nuraliyeva AQShning Rowan universitetida ilmiy stajirovkada",
      highlights: [
        "Dotsent Ozoda Nuraliyeva AQShning Rowan universitetida ilmiy malaka oshirmoqda",
        "Ta'limda Sun'iy intellekt va zamonaviy o'qitish metodologiyalari bo'yicha tadqiqot",
        "Olingan xalqaro tajribani KIUT o'quv dasturlariga joriy etish",
      ],
      pullQuote: {
        quote: "Amerikalik professorlar bilan hamkorlikda yangi pedagogik metodlar va AI vositalarini dars jarayoniga tatbiq etish ustida ishlamoqdamiz.",
        author: "Ozoda Nuraliyeva",
        role: "Dotsent v.b., PhD",
      },
    },
    ru: {
      label: "Международный опыт",
      date: "18 августа, 2026",
      readTime: "3 мин. чтения",
      caption: "Доцент О. Нуралиева проходит научную стажировку в Университете Роуэн (США)",
      highlights: [
        "Научная стажировка и повышение квалификации в Университете Роуэн (США)",
        "Исследование внедрения искусственного интеллекта в университетское образование",
        "Интеграция американских методик в программы подготовки Самаркандского филиала",
      ],
      pullQuote: {
        quote: "Мы внедряем передовые инструменты искусственного интеллекта и практико-ориентированные методики обучения ведущих вузов США.",
        author: "Озода Нуралиева",
        role: "И.о. доцента, PhD",
      },
    },
    en: {
      label: "Global Exchange",
      date: "Aug 18, 2026",
      readTime: "3 min read",
      caption: "Assoc. Prof. Ozoda Nuraliyeva during her research fellowship at Rowan University (USA)",
      highlights: [
        "Advanced post-doctoral research fellowship at Rowan University, United States",
        "Investigating cutting-edge AI pedagogical frameworks in higher education",
        "Direct incorporation of US academic curricula into KIUT degree specializations",
      ],
      pullQuote: {
        quote: "Collaborating with American faculty allows us to inject world-class AI learning methodologies directly into our lecture halls.",
        author: "Ozoda Nuraliyeva",
        role: "Associate Professor, PhD",
      },
    },
  },

  // 18: New Programs Opened
  {
    category: "academic",
    image: "/assets/banners/photo_2026-10-22_11-06-32.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Yangi Dasturlar",
      date: "10-Avgust, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "KIUT Samarqand kampusida yangi ochilgan zamonaviy ta'lim yo'nalishlari taqdimoti",
      highlights: [
        "Bakalavriat va magistraturada zamonaviy bozor talabiga mos yangi yo'nalishlar",
        "Axborot texnologiyalari, biotibbiyot va xalqaro moliya dasturlari kengaytirildi",
        "Davlat litsenziyasi va xalqaro akkreditatsiyalangan o'quv rejalari",
      ],
      pullQuote: {
        quote: "Yangi yo'nalishlar mehnat bozorining real talablaridan kelib chiqqan holda, yetakchi ish beruvchilar bilan hamkorlikda ishlab chiqildi.",
        author: "O'quv ishlari prorektori",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Новые программы",
      date: "10 августа, 2026",
      readTime: "3 мин. чтения",
      caption: "Презентация новых образовательных программ бакалавриата и магистратуры",
      highlights: [
        "Открытие новых актуальных направлений бакалавриата и магистратуры",
        "Расширение программ в сфере IT, биомедицины и международных финансов",
        "Обучение по государственным лицензированным стандартам и двойным дипломам",
      ],
      pullQuote: {
        quote: "Каждая новая специальность разработана в тесном партнерстве с индустрией и ведущими работодателями региона.",
        author: "Проректор по учебной работе",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "New Degrees",
      date: "Aug 10, 2026",
      readTime: "3 min read",
      caption: "Curricular showcase of newly launched undergraduate and graduate degree tracks",
      highlights: [
        "Expansion of accredited degree tracks aligned with global workforce demands",
        "State-of-the-art specializations in Artificial Intelligence, Health Science, and Fintech",
        "Accredited state diplomas with dual-degree pathways with South Korean universities",
      ],
      pullQuote: {
        quote: "Our new degree programs are engineered in direct consultation with top enterprise employers and research institutions.",
        author: "Vice-Rector of Academic Affairs",
        role: "KIUT Samarkand",
      },
    },
  },

  // 19: Kelajakka Qadam Youth Program
  {
    category: "student-life",
    image: "/assets/banners/photo_2026-09-18_16-47-03.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    badgeVariant: "accent",
    uz: {
      label: "Imkoniyatlar",
      date: "2-Avgust, 2026",
      readTime: "3 daqiqa o'qish",
      caption: "“Kelajakka qadam” forumi doirasida talabalar va yosh mutaxassislar uchrashuvi",
      highlights: [
        "Yoshlar va iqtidorli talabalar uchun grant va moliyaviy qo'llab-quvvatlash dasturi",
        "Startap loyihalar va innovatsion g'oyalarni moliyalashtirish imkoniyati",
        "Karyera markazi orqali nufuzli kompaniyalarda kafolatlangan amaliyot",
      ],
      pullQuote: {
        quote: "Har bir talabaning iqtidori va intilishi e'tibor markazimizda. 'Kelajakka qadam' orqali yoshlar o'z loyihalarini ro'yobga chiqarmoqda.",
        author: "Karyera va amaliyot markazi",
        role: "KIUT Samarqand",
      },
    },
    ru: {
      label: "Возможности",
      date: "2 августа, 2026",
      readTime: "3 мин. чтения",
      caption: "Встреча участников программы «Kelajakka qadam» с представителями бизнеса",
      highlights: [
        "Грантовая поддержка и стипендиальные возможности для активных студентов",
        "Инкубация молодежных стартапов и практических инноваций",
        "Прямой доступ к стажировкам в партнерских компаниях через Центр карьеры",
      ],
      pullQuote: {
        quote: "Программа «Kelajakka qadam» открывает перед одаренной молодежью реальные двери в мир профессионального успеха.",
        author: "Центр карьеры и практики",
        role: "Самаркандский филиал ТМУК",
      },
    },
    en: {
      label: "Youth Horizons",
      date: "Aug 2, 2026",
      readTime: "3 min read",
      caption: "Youth Career Forum 'Step into the Future' connecting undergraduates with industry leaders",
      highlights: [
        "Comprehensive merit-based grant and tuition assistance schemes for scholars",
        "Seed incubation and venture support for student-founded innovative startups",
        "Priority placement in top domestic and multinational enterprise internships",
      ],
      pullQuote: {
        quote: "Through the 'Step into the Future' initiative, ambitious students transform bold ideas into impactful careers.",
        author: "Career Placement Center",
        role: "KIUT Samarkand",
      },
    },
  },
];

/**
 * Splits raw text into readable, well-spaced editorial paragraphs.
 */
function splitIntoParagraphs(rawText: string): string[] {
  if (!rawText) return [];

  // Normalize period-capital letter boundaries (e.g. "o'tdi.Saralash" -> "o'tdi. Saralash")
  const cleaned = rawText
    .replace(/([.!?])([A-ZА-ЯЁOʻGʻ])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

  // Split by sentences
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  const matches = cleaned.match(sentenceRegex);

  if (!matches || matches.length <= 2) {
    // If short, return cleaned text or split in half
    if (cleaned.length > 300) {
      const mid = Math.floor(cleaned.length / 2);
      const spaceIdx = cleaned.indexOf(". ", mid);
      if (spaceIdx !== -1) {
        return [
          cleaned.slice(0, spaceIdx + 1).trim(),
          cleaned.slice(spaceIdx + 2).trim(),
        ];
      }
    }
    return [cleaned];
  }

  // Group sentences into 2-3 sentence paragraphs
  const paragraphs: string[] = [];
  let current: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    current.push(matches[i].trim());
    if (current.length === 2 && i < matches.length - 2) {
      paragraphs.push(current.join(" "));
      current = [];
    }
  }

  if (current.length > 0) {
    paragraphs.push(current.join(" "));
  }

  return paragraphs;
}

/**
 * Generates an enriched article representation for a given locale and index.
 */
function enrichArticle(index: number, locale: Locale): EnrichedArticle {
  const localeKey: "uz" | "ru" | "en" =
    locale === "ru" ? "ru" : locale === "en" ? "en" : "uz";

  const rawList = rawNewsData[localeKey] || rawNewsData.uz;
  const rawItem = rawList[index] || rawNewsData.uz[index] || rawNewsData.uz[0];
  const cfg = articlesConfig[index] || articlesConfig[0];
  const meta = cfg[localeKey] || cfg.uz;

  const paragraphs = splitIntoParagraphs(rawItem.summary);

  return {
    id: index + 1,
    index,
    slug: rawItem.slug,
    locale: localeKey,
    title: rawItem.title,
    summary: rawItem.summary,
    category: cfg.category,
    categoryLabel: meta.label,
    categoryBadgeVariant: cfg.badgeVariant,
    date: rawItem.date && rawItem.date.trim() !== "" ? rawItem.date : meta.date,
    readTime: meta.readTime,
    image: cfg.image,
    imageCaption: meta.caption,
    highlights: meta.highlights,
    paragraphs: paragraphs.length > 0 ? paragraphs : [rawItem.summary],
    pullQuote: meta.pullQuote,
  };
}

/**
 * Retrieves all 20 enriched news articles for the specified locale.
 */
export function getAllNews(locale: Locale = "uz"): EnrichedArticle[] {
  const list: EnrichedArticle[] = [];
  const total = rawNewsData.uz.length;
  for (let i = 0; i < total; i++) {
    list.push(enrichArticle(i, locale));
  }
  return list;
}

/**
 * Retrieves all unique slugs across all locales for static route pre-rendering.
 */
export function getAllNewsSlugs(): string[] {
  const slugs: string[] = [];
  rawNewsData.uz.forEach((item) => slugs.push(item.slug));
  rawNewsData.ru.forEach((item) => slugs.push(item.slug));
  rawNewsData.en.forEach((item) => slugs.push(item.slug));
  return Array.from(new Set(slugs));
}

/**
 * Finds an article matching a slug across any locale.
 * Returns the article, 3 related articles from the same locale, and its index.
 */
export function getNewsBySlug(
  slug: string,
  preferredLocale?: Locale
): {
  article: EnrichedArticle;
  related: EnrichedArticle[];
  index: number;
  detectedLocale: Locale;
} | null {
  if (!slug) return null;

  // Search in uz
  let index = rawNewsData.uz.findIndex((a) => a.slug === slug);
  let detectedLocale: Locale = "uz";

  // Search in ru
  if (index === -1) {
    index = rawNewsData.ru.findIndex((a) => a.slug === slug);
    if (index !== -1) detectedLocale = "ru";
  }

  // Search in en
  if (index === -1) {
    index = rawNewsData.en.findIndex((a) => a.slug === slug);
    if (index !== -1) detectedLocale = "en";
  }

  if (index === -1) return null;

  const targetLocale = preferredLocale || detectedLocale;
  const article = enrichArticle(index, targetLocale);

  // Pick 3 related articles (latest others)
  const total = rawNewsData.uz.length;
  const relatedIndices = [
    (index + 1) % total,
    (index + 2) % total,
    (index + 3) % total,
  ];

  const related = relatedIndices.map((i) => enrichArticle(i, targetLocale));

  return {
    article,
    related,
    index,
    detectedLocale,
  };
}

/**
 * Counts articles per category for a given locale.
 */
export function getNewsCategoryCounts(
  locale: Locale = "uz"
): Record<NewsCategory, number> {
  const articles = getAllNews(locale);
  const counts: Record<NewsCategory, number> = {
    all: articles.length,
    academic: 0,
    partnership: 0,
    "student-life": 0,
    sport: 0,
  };

  articles.forEach((a) => {
    if (counts[a.category] !== undefined) {
      counts[a.category]++;
    }
  });

  return counts;
}

/**
 * Filters articles by category tab and optional search query.
 */
export function filterNews(
  articles: EnrichedArticle[],
  category: NewsCategory = "all",
  query?: string
): EnrichedArticle[] {
  let list = articles;

  if (category !== "all") {
    list = list.filter((a) => a.category === category);
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q)
    );
  }

  return list;
}
