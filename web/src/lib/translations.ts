import type { Locale } from "@/types";

export interface TranslationDictionary {
  topbar: {
    phoneTitle: string;
    address: string;
    addressTitle: string;
    hours: string;
    hemisTitle: string;
    hemisLabel: string;
  };
  nav: {
    home: string;
    faculties: string;
    facultiesCount: string;
    facultiesAll: string;
    university: string;
    stats: string;
    news: string;
    contact: string;
    cta: string;
    branchLabel: string;
    branchSub: string;
    mobileTitle: string;
    hotline: string;
  };
  hero: {
    officialLicense: string;
    slides: Array<{
      id: number;
      badge: string;
      badgeVariant: "default" | "accent" | "action" | "gold";
      title: string;
      highlight: string;
      description: string;
      primaryCtaText: string;
      secondaryCtaText: string;
      statsPill: string;
    }>;
  };
  stats: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      targetValue: number;
      suffix: string;
      label: string;
      sublabel: string;
    }>;
  };
  schools: {
    badge: string;
    title: string;
    description: string;
    tabs: {
      all: string;
      medicine: string;
      engineering: string;
      economy: string;
      education: string;
      philology: string;
    };
    durationLabel: string;
    languagesLabel: string;
    mainProgramsLabel: string;
    morePrograms: string;
    applyButton: string;
    detailsButton: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerDescription: string;
    modalAbout: string;
    modalAllPrograms: string;
    modalClose: string;
    modalApply: string;
  };
  about: {
    badge: string;
    imageBadge: string;
    imageCaption: string;
    employmentRate: string;
    employmentDesc: string;
    title: string;
    description: string;
    partnersLabel: string;
    viewAllCta: string;
    pillars: Array<{
      title: string;
      desc: string;
    }>;
  };
  news: {
    badge: string;
    title: string;
    description: string;
    tabs: {
      all: string;
      academic: string;
      partnership: string;
      studentLife: string;
      sport: string;
    };
    readMore: string;
    pressRelease: string;
    archiveButton: string;
    modalClose: string;
  };
  admission: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    hotlineLabel: string;
    hotlineHours: string;
    formBadge: string;
    formTitle: string;
    formSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    facultyLabel: string;
    degreeLabel: string;
    studyTypeLabel: string;
    languageLabel: string;
    submitButton: string;
    submittingButton: string;
    consentText: string;
    successBadge: string;
    successGreeting: string;
    successMessage: string;
    idLabel: string;
    phoneResultLabel: string;
    languageResultLabel: string;
    resetButton: string;
    benefits: Array<{
      title: string;
      desc: string;
    }>;
  };
  faq: {
    sectionLabel: string;
    badge: string;
    title: string;
    description: string;
    helpCardTitle: string;
    helpCardSubtitle: string;
    helpCardPhone: string;
    helpCardConsultation: string;
  };
  footer: {
    desc: string;
    accreditationTitle: string;
    accreditationText: string;
    socialLabel: string;
    facultiesTitle: string;
    portalTitle: string;
    contactTitle: string;
    address: string;
    days: string;
    sunday: string;
    copyright: string;
    privacy: string;
    terms: string;
    backToTop: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  uz: {
    topbar: {
      phoneTitle: "Qabul komissiyasi telefoni",
      address: "Samarqand sh., Spitamen shoh ko'chasi, 270",
      addressTitle: "Universitet manzili xaritada",
      hours: "Dush – Shanba: 09:00 – 18:00",
      hemisTitle: "HEMIS axborot tizimiga kirish",
      hemisLabel: "HEMIS Talaba portali",
    },
    nav: {
      home: "Bosh sahifa",
      faculties: "Fakultetlar",
      facultiesCount: "48+ yo'nalish",
      facultiesAll: "Barcha 48 yo'nalishni ko'rish",
      university: "Universitet",
      stats: "Ko'rsatkichlar",
      news: "Yangiliklar",
      contact: "Bog'lanish",
      cta: "Qabul 2026",
      branchLabel: "Samarqand filiali",
      branchSub: "Xalqaro ta'lim standarti",
      mobileTitle: "Bo'limlar",
      hotline: "+998 (55) 702-40-40 (Qabul komissiyasi)",
    },
    hero: {
      officialLicense: "Rasmiy Davlat Litsenziyasi",
      slides: [
        {
          id: 1,
          badge: "2026/2027 O'quv yili uchun qabul ochildi",
          badgeVariant: "gold",
          title: "Kelajak kasblarini nufuzli xalqaro",
          highlight: "universitetda egallang",
          description:
            "Toshkent Kimyo xalqaro universiteti Samarqand filialida jahon andozalariga mos amaliy ta'lim, zamonaviy laboratoriyalar va nufuzli xorijiy professor-o'qituvchilar.",
          primaryCtaText: "Ariza topshirish",
          secondaryCtaText: "Ta'lim yo'nalishlari",
          statsPill: "48 Bakalavriat & 36 Magistratura yo'nalishi",
        },
        {
          id: 2,
          badge: "2+2 va 3+1 Xalqaro Diplom Dasturlari",
          badgeVariant: "accent",
          title: "Xalqaro standartdagi diplom va",
          highlight: "global karyera imkoniyati",
          description:
            "Janubiy Koreya, Buyuk Britaniya va Yevropa yetakchi universitetlari bilan hamkorlikdagi qo'shma ta'lim va chet elda amaliyot dasturlari.",
          primaryCtaText: "Qabul shartlari",
          secondaryCtaText: "Fakultetlarni ko'rish",
          statsPill: "Xalqaro akkreditatsiyalangan ta'lim dasturlari",
        },
        {
          id: 3,
          badge: "Ilg'or Tibbiyot & Muhandislik Klasteri",
          badgeVariant: "action",
          title: "Eng so'nggi texnologiyalar bilan jihozlangan",
          highlight: "zamonaviy laboratoriyalar",
          description:
            "Tibbiy simulyatsiya markazi, robototexnika, AI va kompyuter injiniringi bo'yicha chuqurlashtirilgan amaliy tayyorgarlik.",
          primaryCtaText: "Ariza topshirish",
          secondaryCtaText: "Barcha dasturlar",
          statsPill: "150+ Fan doktorlari va xalqaro mutaxassislar",
        },
        {
          id: 4,
          badge: "Samarqand shahrida innovatsion kampus",
          badgeVariant: "default",
          title: "Talabalar hayoti va qulay",
          highlight: "o'quv infratuzilmasi",
          description:
            "Zamonaviy kovorking markazlari, elektron kutubxona, sport majmualari va faol talabalar parlamenti.",
          primaryCtaText: "Hujjat topshirish",
          secondaryCtaText: "Universitet hayoti",
          statsPill: "5,000+ Faol talabalar hamjamiyati",
        },
      ],
    },
    stats: {
      badge: "Raqamlarda KIUT Samarqand",
      title: "Raqamlar ortida — sifat va ishonch",
      description:
        "Samarqand filialida jahon standartlariga muvofiq shakllantirilgan zamonaviy o'quv jarayoni va intellektual salohiyat.",
      items: [
        {
          id: "faculties",
          targetValue: 5,
          suffix: "",
          label: "Asosiy Fakultet",
          sublabel: "Tibbiyot, Muhandislik, Iqtisodiyot, Ta'lim, Filologiya",
        },
        {
          id: "bachelor",
          targetValue: 48,
          suffix: "+",
          label: "Bakalavriat yo'nalishi",
          sublabel: "Kunduzgi, sirtqi va kechki ta'lim shakllari",
        },
        {
          id: "master",
          targetValue: 36,
          suffix: "+",
          label: "Magistratura",
          sublabel: "Chuqurlashtirilgan ilmiy va amaliy mutaxassisliklar",
        },
        {
          id: "professors",
          targetValue: 150,
          suffix: "+",
          label: "Professor-o'qituvchilar",
          sublabel: "PhD, fan doktorlari va xorijlik mutaxassislar",
        },
        {
          id: "students",
          targetValue: 5000,
          suffix: "+",
          label: "Talabalar jamoasi",
          sublabel: "Respublika va xorijdan qabul qilingan talabalar",
        },
      ],
    },
    schools: {
      badge: "Akademik Dasturlar",
      title: "5 Asosiy Fakultet va 48+ Nufuzli Ta'lim Yo'nalishi",
      description:
        "Zamonaviy mehnat bozorida yuqori talabga ega bo'lgan sohalar bo'yicha nazariy va amaliy jihatdan mukammal xalqaro standartdagi ta'lim.",
      tabs: {
        all: "Barcha Fakultetlar",
        medicine: "Tibbiyot",
        engineering: "Muhandislik & IT",
        economy: "Iqtisodiyot & Moliya",
        education: "Ta'lim & Pedagogika",
        philology: "Filologiya & Tillar",
      },
      durationLabel: "Ta'lim muddati:",
      languagesLabel: "Ta'lim tillari:",
      mainProgramsLabel: "Asosiy yo'nalishlar:",
      morePrograms: "ta yana",
      applyButton: "Ariza topshirish",
      detailsButton: "Batafsil",
      bannerBadge: "🎓 2026/2027 Qabul Jarayoni",
      bannerTitle: "Qaysi yo'nalish sizga mos kelishini aniqlamoqchimisiz?",
      bannerDescription:
        "Universitetimiz qabul maslahatchilari qobiliyatingiz va qiziqishlaringizga mos ta'lim dasturini tanlashda bepul konsultatsiya beradi.",
      modalAbout: "Fakultet haqida",
      modalAllPrograms: "Barcha ta'lim yo'nalishlari",
      modalClose: "Yopish",
      modalApply: "Ushbu fakultetga ariza topshirish",
    },
    about: {
      badge: "Universitet Haqida",
      imageBadge: "Xalqaro Hamkorlik",
      imageCaption: "Samarqandda yangi avlod yetakchilarini tarbiyalaymiz",
      employmentRate: "90%+",
      employmentDesc: "Bitiruvchilarning ish bilan ta'minlanish darajasi",
      title: "Zamonaviy Ta'lim va Kelajak Kasblari Makoni",
      description:
        "Toshkent Kimyo xalqaro universitetining Samarqand filiali hudud yoshlariga poytaxtga bormasdan, xalqaro darajadagi oliy ta'lim olish, jahon talablariga javob beradigan diplomga ega bo'lish va global mehnat bozorida raqobatbardosh kadr sifatida shakllanish imkoniyatini taqdim etadi.",
      partnersLabel: "Xalqaro Hamkorlar:",
      viewAllCta: "Barcha dasturlarni ko'rish",
      pillars: [
        {
          title: "Xalqaro Ta'lim Standartlari",
          desc: "Janubiy Koreya, Buyuk Britaniya va Yevropa yetakchi ta'lim metodikalariga asoslangan o'quv dasturlari.",
        },
        {
          title: "Davlat Namunasi & Rasmiy Litsenziya",
          desc: "O'zbekiston Respublikasi Oliy ta'lim vazirligi litsenziyasi asosida beriladigan qonuniy diplom.",
        },
        {
          title: "Kafolatlangan Amaliyot & Karyera",
          desc: "Tibbiyot klinikalari, IT Park korxonalari va xalqaro banklarda amaliy mashg'ulotlar.",
        },
        {
          title: "Katta Imkoniyatlar Kampusi",
          desc: "Samarqand shahrining qulay hududida joylashgan zamonaviy o'quv binolari, laboratoriyalar va kutubxona.",
        },
      ],
    },
    news: {
      badge: "Universitet Hayoti",
      title: "So'nggi Yangiliklar va Muhim Voqealar",
      description:
        "KIUT Samarqand kampusining akademik jarayoni, ilmiy yutuqlari, xalqaro hamkorlik memorandumlari va talabalar faoliyatidan xabardor bo'ling.",
      tabs: {
        all: "Barchasi",
        academic: "Akademik",
        partnership: "Hamkorlik",
        studentLife: "Talabalar Hayoti",
        sport: "Sport & Madaniyat",
      },
      readMore: "Batafsil o'qish",
      pressRelease: "Toshkent Kimyo xalqaro universiteti Samarqand filiali matbuot xizmati",
      archiveButton: "Barcha e'lonlar va matbuot relizlari",
      modalClose: "Yopish",
    },
    admission: {
      badge: "2026/2027 O'quv Yili Qabuli",
      title: "O'z kelajagingizni ",
      titleHighlight: "KIUT Samarqand",
      titleEnd: " bilan quring!",
      description:
        "Qabul jarayoni sodda va shaffof. Onlayn ariza qoldiring — bizning mutaxassislarimiz siz bilan tezda bog'lanib, ta'lim yo'nalishi bo'yicha to'liq ma'lumot berishadi.",
      hotlineLabel: "Qabul komissiyasi ishonch telefoni:",
      hotlineHours: "Dush – Shan: 09:00 – 18:00",
      formBadge: "Tezkor Ro'yxatdan O'tish",
      formTitle: "Ariza topshirish",
      formSubtitle: "Ma'lumotlaringizni to'ldiring va bepul konsultatsiyaga ega bo'ling.",
      fullNameLabel: "F.I.Sh. (To'liq ismingiz)",
      fullNamePlaceholder: "Masalan: Alisher Vohidov",
      phoneLabel: "Telefon raqamingiz",
      phonePlaceholder: "+998 (90) 123-45-67",
      facultyLabel: "Fakultetni tanlang",
      degreeLabel: "Ta'lim bosqichi",
      studyTypeLabel: "Ta'lim shakli",
      languageLabel: "Ta'lim tili",
      submitButton: "Arizani jo'natish",
      submittingButton: "Arizangiz qabul qilinmoqda...",
      consentText: "Tugmani bosish orqali siz shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz.",
      successBadge: "Arizangiz muvaffaqiyatli qabul qilindi!",
      successGreeting: "Hurmatli",
      successMessage:
        "yo'nalishi bo'yicha arizangiz qabul komissiyasiga yetkazildi. Tez orada siz bilan mutaxassislarimiz bog'lanadi.",
      idLabel: "Ariza ID:",
      phoneResultLabel: "Telefon:",
      languageResultLabel: "Tanlangan til:",
      resetButton: "Boshqa ariza qoldirish",
      benefits: [
        {
          title: "Davlat akkreditatsiyasi",
          desc: "O'zbekiston Respublikasi Oliy ta'lim vazirligi litsenziyasi asosidagi qonuniy diplom.",
        },
        {
          title: "Xalqaro 2 ta diplom",
          desc: "Koreya, Angliya va Yevropa yetakchi universitetlari bilan 2+2 va 3+1 dasturlari.",
        },
        {
          title: "Ilg'or kampus & laboratoriyalar",
          desc: "Tibbiy simulyatsiya markazi, robototexnika, AI va kompyuter injiniringi bazasi.",
        },
        {
          title: "Grantlar va stipendiyalar",
          desc: "Iqtidorli talabalar uchun ta'sischi granti va xalqaro stipendiya imkoniyatlari.",
        },
      ],
    },
    faq: {
      sectionLabel: "Ko'p beriladigan savollar",
      badge: "FAQ & Rasmiy Ma'lumotlar",
      title: "Abituriyentlar va ota-onalar eng ko'p so'raydigan savollar",
      description: "Litsenziya, diplomning qonuniy kuchi, kirish imtihonlari va kontrakt to'lovlari bo'yicha rasmiy javoblar.",
      helpCardTitle: "Savollaringiz bormi?",
      helpCardSubtitle: "Qabul komissiyasi bilan bog'laning",
      helpCardPhone: "+998 (55) 702-40-40",
      helpCardConsultation: "Onlayn konsultatsiya olish",
    },
    footer: {
      desc: "Toshkent Kimyo xalqaro universiteti Samarqand filiali zamonaviy ta'lim, amaliy malaka va global standartlar asosida yuqori salohiyatli mutaxassislarni tayyorlaydi.",
      accreditationTitle: "Davlat Litsenziyasi",
      accreditationText:
        "O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan berilgan rasmiy litsenziya asosida faoliyat yuritadi.",
      socialLabel: "Ijtimoiy tarmoqlardagi sahifalarimiz:",
      facultiesTitle: "Fakultetlar",
      portalTitle: "Portal",
      contactTitle: "Aloqa va Manzil",
      address: "Samarqand shahri, Spitamen shoh ko'chasi, 270-uy",
      days: "Dushanba – Shanba: 09:00 – 18:00",
      sunday: "Yakshanba: Dam olish kuni",
      copyright: "© 2026 Toshkent Kimyo Xalqaro Universiteti Samarqand filiali. Barcha huquqlar himoyalangan.",
      privacy: "Maxfiylik siyosati",
      terms: "Qabul nizomi",
      backToTop: "Yuqoriga",
    },
  },
  ru: {
    topbar: {
      phoneTitle: "Телефон приемной комиссии",
      address: "г. Самарканд, ул. Спитамена, 270",
      addressTitle: "Адрес университета на карте",
      hours: "Пн – Сб: 09:00 – 18:00",
      hemisTitle: "Вход в систему HEMIS",
      hemisLabel: "Студенческий портал HEMIS",
    },
    nav: {
      home: "Главная",
      faculties: "Факультеты",
      facultiesCount: "48+ направлений",
      facultiesAll: "Посмотреть все 48 направлений",
      university: "Университет",
      stats: "Показатели",
      news: "Новости",
      contact: "Контакты",
      cta: "Приём 2026",
      branchLabel: "Самаркандский филиал",
      branchSub: "Международный стандарт образования",
      mobileTitle: "Разделы",
      hotline: "+998 (55) 702-40-40 (Приемная комиссия)",
    },
    hero: {
      officialLicense: "Государственная лицензия",
      slides: [
        {
          id: 1,
          badge: "Открыт прием на 2026/2027 учебный год",
          badgeVariant: "gold",
          title: "Освойте профессии будущего в престижном",
          highlight: "международном университете",
          description:
            "В Самаркандском филиале ТМУК: практическое обучение по мировым стандартам, современные лаборатории и авторитетные зарубежные преподаватели.",
          primaryCtaText: "Подать заявку",
          secondaryCtaText: "Направления обучения",
          statsPill: "48 программ бакалавриата и 36 магистратуры",
        },
        {
          id: 2,
          badge: "Международные программы 2+2 и 3+1",
          badgeVariant: "accent",
          title: "Диплом международного образца и",
          highlight: "глобальные карьерные возможности",
          description:
            "Совместные образовательные программы и зарубежные стажировки с ведущими университетами Южной Кореи, Великобритании и Европы.",
          primaryCtaText: "Условия приема",
          secondaryCtaText: "Факультеты",
          statsPill: "Международно аккредитованные программы",
        },
        {
          id: 3,
          badge: "Передовой медицинский и инженерный кластер",
          badgeVariant: "action",
          title: "Передовые технологии и современно",
          highlight: "оснащенные лаборатории",
          description:
            "Медицинский симуляционный центр, робототехника, искусственный интеллект и углубленная подготовка в области IT.",
          primaryCtaText: "Подать заявку",
          secondaryCtaText: "Все программы",
          statsPill: "150+ докторов наук и зарубежных экспертов",
        },
        {
          id: 4,
          badge: "Инновационный кампус в Самарканде",
          badgeVariant: "default",
          title: "Студенческая жизнь и комфортная",
          highlight: "образовательная среда",
          description:
            "Современные коворкинг-центры, электронная библиотека, спортивные комплексы и активный Студенческий парламент.",
          primaryCtaText: "Подать документы",
          secondaryCtaText: "Жизнь университета",
          statsPill: "5,000+ активных студентов",
        },
      ],
    },
    stats: {
      badge: "ТМУК Самарканд в цифрах",
      title: "За цифрами — качество и доверие",
      description:
        "Современный учебный процесс и интеллектуальный потенциал Самаркандского филиала, сформированный в соответствии с мировыми стандартами.",
      items: [
        {
          id: "faculties",
          targetValue: 5,
          suffix: "",
          label: "Факультетов",
          sublabel: "Медицина, Инженерия, Экономика, Образование, Филология",
        },
        {
          id: "bachelor",
          targetValue: 48,
          suffix: "+",
          label: "Направлений бакалавриата",
          sublabel: "Дневная, заочная и вечерняя формы обучения",
        },
        {
          id: "master",
          targetValue: 36,
          suffix: "+",
          label: "Специальностей магистратуры",
          sublabel: "Углубленные научные и практические направления",
        },
        {
          id: "professors",
          targetValue: 150,
          suffix: "+",
          label: "Профессорско-преподавательский состав",
          sublabel: "PhD, доктора наук и зарубежные специалисты",
        },
        {
          id: "students",
          targetValue: 5000,
          suffix: "+",
          label: "Студенческое сообщество",
          sublabel: "Студенты со всей республики и из-за рубежа",
        },
      ],
    },
    schools: {
      badge: "Академические Программы",
      title: "5 Основных Факультетов и 48+ Востребованных Направлений",
      description:
        "Теоретическое и практическое международное образование по направлениям, пользующимся высоким спросом на современном рынке труда.",
      tabs: {
        all: "Все Факультеты",
        medicine: "Медицина",
        engineering: "Инженерия и IT",
        economy: "Экономика и Финансы",
        education: "Педагогика и Образование",
        philology: "Филология и Языки",
      },
      durationLabel: "Срок обучения:",
      languagesLabel: "Языки обучения:",
      mainProgramsLabel: "Основные направления:",
      morePrograms: "еще",
      applyButton: "Подать заявку",
      detailsButton: "Подробнее",
      bannerBadge: "🎓 Приемная кампания 2026/2027",
      bannerTitle: "Хотите узнать, какое направление подходит именно вам?",
      bannerDescription:
        "Консультанты приемной комиссии помогут подобрать оптимальную образовательную программу с учетом ваших способностей и интересов.",
      modalAbout: "О факультете",
      modalAllPrograms: "Все направления обучения",
      modalClose: "Закрыть",
      modalApply: "Подать заявку на этот факультет",
    },
    about: {
      badge: "Об Университете",
      imageBadge: "Международное Сотрудничество",
      imageCaption: "Воспитываем лидеров нового поколения в Самарканде",
      employmentRate: "90%+",
      employmentDesc: "Уровень трудоустройства выпускников",
      title: "Пространство Современного Образования и Профессий Будущего",
      description:
        "Самаркандский филиал Ташкентского международного университета Кимё предоставляет молодежи региона возможность получить высшее образование мирового уровня, диплом международного образца и стать конкурентоспособным специалистом.",
      partnersLabel: "Международные Партнеры:",
      viewAllCta: "Посмотреть все программы",
      pillars: [
        {
          title: "Международные стандарты обучения",
          desc: "Учебные программы, основанные на передовых методиках Южной Кореи, Великобритании и Европы.",
        },
        {
          title: "Государственный диплом и лицензия",
          desc: "Официальный диплом на основании государственной лицензии Министерства высшего образования.",
        },
        {
          title: "Гарантированная практика и карьера",
          desc: "Практические занятия в клиниках, IT Park и ведущих международных финансовых организациях.",
        },
        {
          title: "Кампус больших возможностей",
          desc: "Современные учебные корпуса, лаборатории и библиотека в удобном районе Самарканда.",
        },
      ],
    },
    news: {
      badge: "Жизнь Университета",
      title: "Последние Новости и Важные События",
      description:
        "Будьте в курсе академической жизни, научных достижений, международных соглашений и студенческих мероприятий Самаркандского филиала ТМУК.",
      tabs: {
        all: "Все",
        academic: "Академические",
        partnership: "Сотрудничество",
        studentLife: "Студенческая жизнь",
        sport: "Спорт и культура",
      },
      readMore: "Читать подробнее",
      pressRelease: "Пресс-служба Самаркандского филиала Международного университета Кимё",
      archiveButton: "Все объявления и пресс-релизы",
      modalClose: "Закрыть",
    },
    admission: {
      badge: "Прием 2026/2027",
      title: "Постройте свое будущее с ",
      titleHighlight: "ТМУК Самарканд",
      titleEnd: "!",
      description:
        "Процесс приема прост и прозрачен. Оставьте онлайн-заявку — наши консультанты свяжутся с вами в кратчайшие сроки и предоставят исчерпывающую информацию.",
      hotlineLabel: "Телефон горячей линии приемной комиссии:",
      hotlineHours: "Пн – Сб: 09:00 – 18:00",
      formBadge: "Быстрая регистрация",
      formTitle: "Подать заявку",
      formSubtitle: "Заполните данные для получения бесплатной консультации.",
      fullNameLabel: "Ф.И.О. (Ваше полное имя)",
      fullNamePlaceholder: "Например: Алишер Вохидов",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 (90) 123-45-67",
      facultyLabel: "Выберите факультет",
      degreeLabel: "Ступень обучения",
      studyTypeLabel: "Форма обучения",
      languageLabel: "Язык обучения",
      submitButton: "Отправить заявку",
      submittingButton: "Заявка обрабатывается...",
      consentText: "Нажимая кнопку, вы даете согласие на обработку персональных данных.",
      successBadge: "Заявка успешно принята!",
      successGreeting: "Уважаемый(-ая)",
      successMessage:
        "Ваша заявка направлена в приемную комиссию. Специалисты свяжутся с вами в ближайшее время.",
      idLabel: "ID Заявки:",
      phoneResultLabel: "Телефон:",
      languageResultLabel: "Выбранный язык:",
      resetButton: "Подать еще одну заявку",
      benefits: [
        {
          title: "Государственная аккредитация",
          desc: "Законный диплом на основании лицензии Министерства высшего образования РУз.",
        },
        {
          title: "2 Международных диплома",
          desc: "Программы 2+2 и 3+1 с ведущими университетами Кореи, Англии и Европы.",
        },
        {
          title: "Передовой кампус и лаборатории",
          desc: "Медицинский симуляционный центр, робототехника, AI и база компьютерного инжиниринга.",
        },
        {
          title: "Гранты и стипендии",
          desc: "Гранты учредителя и международные стипендии для одаренных студентов.",
        },
      ],
    },
    faq: {
      sectionLabel: "Часто задаваемые вопросы",
      badge: "FAQ и официальные данные",
      title: "Часто задаваемые вопросы абитуриентов",
      description: "Все юридические, организационные и финансовые вопросы об обучении в Самаркандском филиале ТМУК.",
      helpCardTitle: "Остались вопросы?",
      helpCardSubtitle: "Позвоните в приемную комиссию",
      helpCardPhone: "+998 (55) 702-40-40",
      helpCardConsultation: "Онлайн-консультация",
    },
    footer: {
      desc: "Самаркандский филиал Ташкентского международного университета Кимё готовит высококвалифицированных специалистов на основе современных технологий и мировых стандартов.",
      accreditationTitle: "Государственная Лицензия",
      accreditationText:
        "Действует на основании официальной лицензии Министерства высшего образования, науки и инноваций Республики Узбекистан.",
      socialLabel: "Мы в социальных сетях:",
      facultiesTitle: "Факультеты",
      portalTitle: "Портал",
      contactTitle: "Контакты и Адрес",
      address: "г. Самарканд, ул. Спитамена, дом 270",
      days: "Понедельник – Суббота: 09:00 – 18:00",
      sunday: "Воскресенье: Выходной",
      copyright: "© 2026 Самаркандский филиал ТМУК. Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Правила приема",
      backToTop: "Наверх",
    },
  },
  en: {
    topbar: {
      phoneTitle: "Admissions hotline",
      address: "Samarkand city, Spitamen ave., 270",
      addressTitle: "Campus location on Google Maps",
      hours: "Mon – Sat: 09:00 – 18:00",
      hemisTitle: "HEMIS academic portal",
      hemisLabel: "HEMIS Student Portal",
    },
    nav: {
      home: "Home",
      faculties: "Faculties",
      facultiesCount: "48+ programs",
      facultiesAll: "View all 48 programs",
      university: "University",
      stats: "Key Stats",
      news: "News",
      contact: "Contacts",
      cta: "Admission 2026",
      branchLabel: "Samarkand Branch",
      branchSub: "International Academic Excellence",
      mobileTitle: "Navigation",
      hotline: "+998 (55) 702-40-40 (Admissions Office)",
    },
    hero: {
      officialLicense: "Official State License",
      slides: [
        {
          id: 1,
          badge: "Admissions Open for 2026/2027 Academic Year",
          badgeVariant: "gold",
          title: "Master the careers of tomorrow at a prestigious",
          highlight: "international university",
          description:
            "KIUT Samarkand branch delivers world-standard practical education, cutting-edge laboratories, and lectures by renowned international faculty.",
          primaryCtaText: "Apply Online",
          secondaryCtaText: "Academic Programs",
          statsPill: "48 Undergraduate & 36 Master's programs",
        },
        {
          id: 2,
          badge: "2+2 & 3+1 Dual Degree Programs",
          badgeVariant: "accent",
          title: "Globally recognized degree and",
          highlight: "unlimited career horizons",
          description:
            "Dual-degree educational pathways and international exchange opportunities with leading universities in South Korea, the UK, and Europe.",
          primaryCtaText: "Admission Criteria",
          secondaryCtaText: "Explore Schools",
          statsPill: "Internationally accredited educational curricula",
        },
        {
          id: 3,
          badge: "Advanced Medical & Engineering Cluster",
          badgeVariant: "action",
          title: "State-of-the-art facilities and",
          highlight: "high-tech laboratories",
          description:
            "Medical simulation center, robotics, AI, and comprehensive computer engineering infrastructure for hands-on learning.",
          primaryCtaText: "Start Application",
          secondaryCtaText: "All Disciplines",
          statsPill: "150+ PhD holders and international scholars",
        },
        {
          id: 4,
          badge: "Innovative Campus in Samarkand",
          badgeVariant: "default",
          title: "Vibrant student life and premier",
          highlight: "academic facilities",
          description:
            "Collaborative co-working spaces, digital library, comprehensive athletics complex, and an active Student Parliament.",
          primaryCtaText: "Apply Now",
          secondaryCtaText: "Campus Life",
          statsPill: "5,000+ Active student community",
        },
      ],
    },
    stats: {
      badge: "KIUT Samarkand in Numbers",
      title: "Behind the Numbers — Quality and Trust",
      description:
        "Modern educational standards and intellectual prowess shaped in Samarkand in alignment with global benchmarks.",
      items: [
        {
          id: "faculties",
          targetValue: 5,
          suffix: "",
          label: "Core Faculties",
          sublabel: "Medicine, Engineering, Economy, Education, Philology",
        },
        {
          id: "bachelor",
          targetValue: 48,
          suffix: "+",
          label: "Bachelor Programs",
          sublabel: "Full-time, part-time and evening learning formats",
        },
        {
          id: "master",
          targetValue: 36,
          suffix: "+",
          label: "Master Programs",
          sublabel: "Specialized scientific and professional degrees",
        },
        {
          id: "professors",
          targetValue: 150,
          suffix: "+",
          label: "Faculty Members",
          sublabel: "PhDs, professors, and visiting international faculty",
        },
        {
          id: "students",
          targetValue: 5000,
          suffix: "+",
          label: "Active Students",
          sublabel: "Enrolled from across Uzbekistan and internationally",
        },
      ],
    },
    schools: {
      badge: "Academic Disciplines",
      title: "5 Core Schools & 48+ High-Demand Degrees",
      description:
        "Rigorous theoretical and hands-on international curriculum designed for competitive careers in the modern global economy.",
      tabs: {
        all: "All Schools",
        medicine: "Medicine",
        engineering: "Engineering & IT",
        economy: "Business & Economy",
        education: "Education & Pedagogy",
        philology: "Philology & Languages",
      },
      durationLabel: "Duration:",
      languagesLabel: "Instruction languages:",
      mainProgramsLabel: "Featured programs:",
      morePrograms: "more",
      applyButton: "Apply Now",
      detailsButton: "Details",
      bannerBadge: "🎓 2026/2027 Admissions",
      bannerTitle: "Need guidance on choosing the right academic pathway?",
      bannerDescription:
        "Our admissions advisors provide tailored counseling to align your strengths and ambitions with the perfect degree.",
      modalAbout: "About Faculty",
      modalAllPrograms: "All Educational Programs",
      modalClose: "Close",
      modalApply: "Apply to this Faculty",
    },
    about: {
      badge: "About KIUT",
      imageBadge: "Global Partnerships",
      imageCaption: "Cultivating the next generation of leaders in Samarkand",
      employmentRate: "90%+",
      employmentDesc: "Graduate employment placement rate",
      title: "The Hub of Modern Education & Future Careers",
      description:
        "Kimyo International University in Tashkent Samarkand branch provides youth with accessible, world-class tertiary education, internationally recognized credentials, and the skills needed to thrive in the global marketplace.",
      partnersLabel: "International Partners:",
      viewAllCta: "Explore all programs",
      pillars: [
        {
          title: "International Educational Standards",
          desc: "Curricula grounded in top methodologies from South Korea, the United Kingdom, and Europe.",
        },
        {
          title: "State License & Official Degree",
          desc: "Accredited qualification issued under official license from the Ministry of Higher Education.",
        },
        {
          title: "Guaranteed Internships & Careers",
          desc: "Clinical rotations in leading hospitals, IT Park tech firms, and international financial institutions.",
        },
        {
          title: "Campus of Grand Opportunities",
          desc: "Modern campus facilities, research laboratories, and expansive digital library in prime Samarkand.",
        },
      ],
    },
    news: {
      badge: "Campus Life",
      title: "Latest News & Landmark Events",
      description:
        "Stay informed on academic milestones, scientific achievements, international agreements, and student life at KIUT Samarkand.",
      tabs: {
        all: "All",
        academic: "Academic",
        partnership: "Partnerships",
        studentLife: "Student Life",
        sport: "Sports & Culture",
      },
      readMore: "Read Full Story",
      pressRelease: "Press Service of Kimyo International University in Tashkent — Samarkand branch",
      archiveButton: "All announcements & releases",
      modalClose: "Close",
    },
    admission: {
      badge: "2026/2027 Admissions",
      title: "Shape your future with ",
      titleHighlight: "KIUT Samarkand",
      titleEnd: "!",
      description:
        "Admission is streamlined and transparent. Submit an online application — our admissions officers will contact you to assist with your degree selection.",
      hotlineLabel: "Admissions Hotline:",
      hotlineHours: "Mon – Sat: 09:00 – 18:00",
      formBadge: "Express Registration",
      formTitle: "Submit Application",
      formSubtitle: "Fill in your details to receive free personalized admissions counseling.",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Alisher Vokhidov",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+998 (90) 123-45-67",
      facultyLabel: "Select School / Faculty",
      degreeLabel: "Degree Level",
      studyTypeLabel: "Study Format",
      languageLabel: "Language of Instruction",
      submitButton: "Submit Application",
      submittingButton: "Processing application...",
      consentText: "By submitting, you consent to the processing of your personal information.",
      successBadge: "Application Received Successfully!",
      successGreeting: "Dear",
      successMessage:
        "your application has been forwarded to the admissions committee. An advisor will reach out shortly.",
      idLabel: "Application ID:",
      phoneResultLabel: "Phone:",
      languageResultLabel: "Instruction Language:",
      resetButton: "Submit another application",
      benefits: [
        {
          title: "State Accreditation",
          desc: "Accredited degree authorized by the Ministry of Higher Education of Uzbekistan.",
        },
        {
          title: "Dual International Degrees",
          desc: "2+2 and 3+1 programs with partner institutions in South Korea, UK, and Europe.",
        },
        {
          title: "High-Tech Campus & Labs",
          desc: "Medical simulation center, robotics labs, AI research, and software development hubs.",
        },
        {
          title: "Merit Grants & Scholarships",
          desc: "Founder's academic grants and international excellence scholarships.",
        },
      ],
    },
    faq: {
      sectionLabel: "Frequently Asked Questions",
      badge: "FAQ & Official Accreditation",
      title: "Frequently Asked Questions",
      description: "Essential answers regarding accreditation, tuition installment schedules, and admissions.",
      helpCardTitle: "Need Personalized Help?",
      helpCardSubtitle: "Talk to an admissions officer",
      helpCardPhone: "+998 (55) 702-40-40",
      helpCardConsultation: "Online Consultation",
    },
    footer: {
      desc: "Kimyo International University in Tashkent Samarkand branch prepares high-caliber professionals through contemporary pedagogy, hands-on mastery, and international standards.",
      accreditationTitle: "State License",
      accreditationText:
        "Licensed and regulated by the Ministry of Higher Education, Science and Innovation of the Republic of Uzbekistan.",
      socialLabel: "Connect with us:",
      facultiesTitle: "Faculties",
      portalTitle: "Portals",
      contactTitle: "Campus & Contact",
      address: "270 Spitamen Avenue, Samarkand, Uzbekistan",
      days: "Monday – Saturday: 09:00 – 18:00",
      sunday: "Sunday: Closed",
      copyright: "© 2026 Kimyo International University in Tashkent — Samarkand branch. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Admission Regulations",
      backToTop: "Top",
    },
  },
};
