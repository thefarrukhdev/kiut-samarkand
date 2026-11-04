import type { Locale } from "@/types";

export interface ProgramDetail {
  name: string;
  duration: string;
  degree: string;
  description?: string;
}

export interface FacultyData {
  id: string;
  name: string;
  category: "all" | "medicine" | "engineering" | "economy" | "education" | "philology";
  badge: string;
  badgeVariant: "default" | "accent" | "action" | "gold" | "success";
  image: string;
  count: string;
  duration: string;
  languages: string[];
  description: string;
  highlights: string[];
  popularPrograms: string[];
  allPrograms: ProgramDetail[];
}

export const getLocalizedFaculties = (locale: Locale): FacultyData[] => {
  if (locale === "ru") {
    return [
      {
        id: "medicine",
        name: "Факультет медицины",
        category: "medicine",
        badge: "Здравоохранение",
        badgeVariant: "accent",
        image: "/assets/photos/med.png",
        count: "5+ направлений",
        duration: "4 - 6 лет",
        languages: ["Русский", "Узбекский"],
        description:
          "Современные медицинские стандарты, международный симуляционный центр и клиническая практика в ведущих медицинских учреждениях.",
        highlights: [
          "Симуляционный медицинский центр",
          "Практика в многопрофильных клиниках",
          "Лекции приглашенных зарубежных профессоров",
        ],
        popularPrograms: [
          "Лечебное дело",
          "Стоматология",
          "Педиатрия",
          "Высшее сестринское дело",
          "Эстетическая косметология",
        ],
        allPrograms: [
          { name: "Лечебное дело", duration: "6 лет", degree: "Бакалавриат", description: "Подготовка врачей общей практики с глубокими знаниями клинической медицины." },
          { name: "Стоматология", duration: "5 лет", degree: "Бакалавриат", description: "Современные методы профилактики, диагностики и лечения заболеваний полости рта." },
          { name: "Педиатрия", duration: "6 лет", degree: "Бакалавриат", description: "Охрана здоровья детей, раннее выявление и терапия детских заболеваний." },
          { name: "Высшее сестринское дело", duration: "4 года", degree: "Бакалавриат", description: "Организация сестринского процесса, первичная медико-санитарная помощь." },
          { name: "Эстетическая косметология", duration: "4 года", degree: "Бакалавриат", description: "Неинвазивные и аппаратные косметологические процедуры, реабилитация кожи." },
        ],
      },
      {
        id: "engineering",
        name: "Факультет инженерии и IT",
        category: "engineering",
        badge: "IT & Инженерия",
        badgeVariant: "accent",
        image: "/assets/photos/engineering.png",
        count: "18+ направлений",
        duration: "4 года",
        languages: ["Русский", "Узбекский", "Английский"],
        description:
          "Подготовка кадров по искусственному интеллекту, разработке программного обеспечения, робототехнике, архитектуре и энерготехнологиям.",
        highlights: [
          "Партнерство и интеграция с IT Park",
          "Лаборатории IoT и промышленной робототехники",
          "Международная сертификация IT-специалистов",
        ],
        popularPrograms: [
          "Компьютерный инжиниринг",
          "Искусственный интеллект",
          "Программная инженерия",
          "Архитектура и градостроительство",
          "Электротехника и энергетика",
        ],
        allPrograms: [
          { name: "Компьютерный инжиниринг", duration: "4 года", degree: "Бакалавриат", description: "Проектирование аппаратного и системного программного обеспечения." },
          { name: "Инженерия информационных систем", duration: "4 года", degree: "Бакалавриат", description: "Проектирование корпоративных баз данных и защищенных информационных сетей." },
          { name: "Программная инженерия", duration: "4 года", degree: "Бакалавриат", description: "Промышленная разработка ПО, облачные технологии и архитектура систем." },
          { name: "Искусственный интеллект и анализ данных", duration: "4 года", degree: "Бакалавриат", description: "Машинное обучение, нейронные сети и обработка больших объемов данных." },
          { name: "Электротехника и энергетика", duration: "4 года", degree: "Бакалавриат", description: "Электроэнергетические комплексы, преобразователи и электроприводы." },
          { name: "Мехатроника и робототехника", duration: "4 года", degree: "Бакалавриат", description: "Автоматизированные промышленные манипуляторы и робототехнические комплексы." },
          { name: "Технология машиностроения", duration: "4 года", degree: "Бакалавриат", description: "Современное производственное машиностроение, станки с ЧПУ." },
          { name: "Архитектура и градостроительство", duration: "4 года", degree: "Бакалавриат", description: "Архитектурное проектирование, градостроительные ансамбли и урбанистика." },
          { name: "Строительство зданий и сооружений", duration: "4 года", degree: "Бакалавриат", description: "Расчет несущих строительных конструкций, BIM-проектирование." },
          { name: "Управление дорожным движением", duration: "4 года", degree: "Бакалавриат", description: "Интеллектуальные транспортные системы и организация дорожной безопасности." },
          { name: "Альтернативные источники энергии", duration: "4 года", degree: "Бакалавриат", description: "Солнечная, ветровая энергетика и энергоэффективные технологии." },
          { name: "Прикладная математика", duration: "4 года", degree: "Бакалавриат", description: "Математическое моделирование сложных процессов и алгоритмизация." },
          { name: "Космические технологии", duration: "4 года", degree: "Бакалавриат", description: "Дистанционное зондирование Земли и спутниковые геоинформационные системы." },
          { name: "Лифтовая инженерия", duration: "4 года", degree: "Бакалавриат", description: "Проектирование и эксплуатация вертикального транспорта и эскалаторов." },
          { name: "Инженерные коммуникации и монтаж", duration: "4 года", degree: "Бакалавриат", description: "Системы вентиляции, водоснабжения, отопления и кондиционирования." },
          { name: "Дизайн интерьера", duration: "4 года", degree: "Бакалавриат", description: "Эргономика жилых и общественных пространств, визуализация интерьеров." },
          { name: "Дизайн одежды", duration: "4 года", degree: "Бакалавриат", description: "Моделирование костюма, технологии текстиля и индустрия моды." },
          { name: "Живопись и графика", duration: "4 года", degree: "Бакалавриат", description: "Станковая живопись, академический рисунок и монументальное искусство." },
        ],
      },
      {
        id: "economy",
        name: "Факультет экономики и финансов",
        category: "economy",
        badge: "Бизнес & Финансы",
        badgeVariant: "gold",
        image: "/assets/photos/economy.png",
        count: "8+ направлений",
        duration: "4 года",
        languages: ["Русский", "Узбекский", "Английский"],
        description:
          "Глобальные финансовые рынки, корпоративное управление, международная коммерция и индустрия туризма.",
        highlights: [
          "Подготовка по программам ACCA и CFA",
          "Стажировка в ведущих коммерческих банках",
          "Бизнес-инкубатор и акселератор стартапов",
        ],
        popularPrograms: [
          "Управление бизнесом",
          "Финансы и финтех",
          "Банковское дело и аудит",
          "Международные экономические отношения",
          "Туризм и гостиничный бизнес",
        ],
        allPrograms: [
          { name: "Управление бизнесом (Business Management)", duration: "4 года", degree: "Бакалавриат", description: "Стратегический менеджмент, операционная деятельность и руководство командами." },
          { name: "Финансы и финансовые технологии", duration: "4 года", degree: "Бакалавриат", description: "Корпоративные финансы, инвестиционный анализ и цифровые финтех-решения." },
          { name: "Банковское дело и аудит", duration: "4 года", degree: "Бакалавриат", description: "Кредитные операции, оценка банковских рисков и регуляторный надзор." },
          { name: "Бухгалтерский учет", duration: "4 года", degree: "Бакалавриат", description: "Финансовая отчетность по МСФО, налогообложение и аудит компаний." },
          { name: "Международные экономические отношения", duration: "4 года", degree: "Бакалавриат", description: "Мировая торговля, международная логистика и экспортно-импортные операции." },
          { name: "Международные отношения", duration: "4 года", degree: "Бакалавриат", description: "Дипломатический протокол, геополитика и международное публичное право." },
          { name: "Международный маркетинг", duration: "4 года", degree: "Бакалавриат", description: "Digital-маркетинг, брендинг, потребительское поведение и анализ рынков." },
          { name: "Туризм и гостеприимство", duration: "4 года", degree: "Бакалавриат", description: "Менеджмент международных отелей, туроперейтинг и экскурсионный сервис." },
        ],
      },
      {
        id: "education",
        name: "Факультет образования",
        category: "education",
        badge: "Педагогика & Образование",
        badgeVariant: "default",
        image: "/assets/photos/education.png",
        count: "6+ направлений",
        duration: "4 года",
        languages: ["Русский", "Узбекский"],
        description:
          "Современные педагогические технологии, методика преподавания, прикладная психология и специальная дефектология.",
        highlights: [
          "Методики STEAM и передовые европейские программы",
          "Педагогическая практика в передовых школах",
          "Центр психологической коррекции и консультирования",
        ],
        popularPrograms: [
          "Начальное образование",
          "Дошкольное образование",
          "Педагогика и психология",
          "Специальная педагогика (Логопедия)",
          "История",
        ],
        allPrograms: [
          { name: "Методика начального образования", duration: "4 года", degree: "Бакалавриат", description: "Формирование базовых навыков обучения и воспитания у детей младшего школьного возраста." },
          { name: "Дошкольное образование", duration: "4 года", degree: "Бакалавриат", description: "Инновационные методики раннего развития, интерактивные формы обучения дошкольников." },
          { name: "Педагогика и психология", duration: "4 года", degree: "Бакалавриат", description: "Психологическая диагностика, возрастная психология и образовательное консультирование." },
          { name: "Специальная педагогика (Дефектология/Логопедия)", duration: "4 года", degree: "Бакалавриат", description: "Коррекционная работа с детьми с особенностями речевого и психофизического развития." },
          { name: "Физическая культура и спорт", duration: "4 года", degree: "Бакалавриат", description: "Теория спортивной тренировки, физическое воспитание и адаптивный спорт." },
          { name: "История", duration: "4 года", degree: "Бакалавриат", description: "Всемирная и отечественная история, археология, источниковедение и архивоведение." },
        ],
      },
      {
        id: "philology",
        name: "Факультет филологии",
        category: "philology",
        badge: "Языки & Перевод",
        badgeVariant: "accent",
        image: "/assets/photos/translation-studies.png",
        count: "7+ направлений",
        duration: "4 года",
        languages: ["Английский", "Корейский", "Русский", "Японский", "Китайский"],
        description:
          "Углубленное изучение иностранных языков с носителями языка, синхронный перевод и международные межкультурные коммуникации.",
        highlights: [
          "Зарубежные профессора — носители языка (Native Speakers)",
          "Программы академического обмена с Кореей и Великобританией",
          "Оборудованная лаборатория синхронного перевода",
        ],
        popularPrograms: [
          "Английский язык и литература",
          "Корейская филология",
          "Теория и практика перевода",
          "Японский язык",
          "Китайский язык и перевод",
        ],
        allPrograms: [
          { name: "Филология: Английский язык", duration: "4 года", degree: "Бакалавриат", description: "Практическая грамматика, академическое письмо, методика преподавания английского." },
          { name: "Корейская филология", duration: "4 года", degree: "Бакалавриат", description: "Корейский язык, литература, культура и деловая корреспонденция Кореи." },
          { name: "Русский язык и литература", duration: "4 года", degree: "Бакалавриат", description: "Современный русский литературный язык, литературоведение и стилистика." },
          { name: "Японский язык и литература", duration: "4 года", degree: "Бакалавриат", description: "Иероглифика, разговорный и академический японский язык, культура Японии." },
          { name: "Китайский язык и перевод", duration: "4 года", degree: "Бакалавриат", description: "Интенсивный китайский язык, методика письменного и устного перевода." },
          { name: "Турецкий язык и перевод", duration: "4 года", degree: "Бакалавриат", description: "Турецкий язык, востоковедение и специализированный дипломатический перевод." },
          { name: "Узбекский язык и литература", duration: "4 года", degree: "Бакалавриат", description: "История узбекского языка, фольклор, классическая и современная литература." },
        ],
      },
    ];
  }

  if (locale === "en") {
    return [
      {
        id: "medicine",
        name: "School of Medicine",
        category: "medicine",
        badge: "Healthcare & Life Sciences",
        badgeVariant: "accent",
        image: "/assets/photos/med.png",
        count: "5+ Programs",
        duration: "4 - 6 Years",
        languages: ["English", "Uzbek", "Russian"],
        description:
          "Contemporary medical training adhering to international standards, high-fidelity clinical simulation laboratories, and rotations at top hospitals.",
        highlights: [
          "State-of-the-art Medical Simulation Center",
          "Hands-on clinical practice in hospitals",
          "Lectures and workshops by visiting international faculty",
        ],
        popularPrograms: [
          "General Medicine",
          "Dentistry",
          "Pediatrics",
          "Higher Nursing",
          "Aesthetic Cosmetology",
        ],
        allPrograms: [
          { name: "General Medicine", duration: "6 Years", degree: "Undergraduate", description: "Comprehensive clinical training developing competent primary care physicians." },
          { name: "Dentistry", duration: "5 Years", degree: "Undergraduate", description: "Contemporary diagnostic and therapeutic stomatological techniques." },
          { name: "Pediatrics", duration: "6 Years", degree: "Undergraduate", description: "Pediatric health preservation, neonatal care, and disease prevention." },
          { name: "Higher Nursing", duration: "4 Years", degree: "Undergraduate", description: "Clinical nursing administration, patient care, and healthcare coordination." },
          { name: "Aesthetic Cosmetology", duration: "4 Years", degree: "Undergraduate", description: "Non-invasive cosmetic dermatology, dermal rejuvenation, and aesthetic care." },
        ],
      },
      {
        id: "engineering",
        name: "School of Engineering & IT",
        category: "engineering",
        badge: "IT & Engineering",
        badgeVariant: "accent",
        image: "/assets/photos/engineering.png",
        count: "18+ Programs",
        duration: "4 Years",
        languages: ["English", "Uzbek", "Russian"],
        description:
          "Educating innovative engineers in artificial intelligence, software architecture, robotics, renewable energy, and civil construction.",
        highlights: [
          "Direct integration with IT Park companies",
          "IoT and Industrial Robotics laboratories",
          "Support for global industry tech certifications",
        ],
        popularPrograms: [
          "Computer Engineering",
          "Artificial Intelligence & Data Science",
          "Software Engineering",
          "Architecture & Urban Planning",
          "Electrical & Power Engineering",
        ],
        allPrograms: [
          { name: "Computer Engineering", duration: "4 Years", degree: "Undergraduate", description: "Computer hardware architecture, embedded systems, and system programming." },
          { name: "Information Systems Engineering", duration: "4 Years", degree: "Undergraduate", description: "Enterprise databases, system administration, and network architecture." },
          { name: "Software Engineering", duration: "4 Years", degree: "Undergraduate", description: "Modern full-stack software development, cloud infrastructure, and DevOps." },
          { name: "Artificial Intelligence & Data Science", duration: "4 Years", degree: "Undergraduate", description: "Machine learning models, neural networks, and big data pipeline engineering." },
          { name: "Electrical & Power Engineering", duration: "4 Years", degree: "Undergraduate", description: "Power grid systems, electromagnetic conversion, and electronic drives." },
          { name: "Mechatronics & Robotics", duration: "4 Years", degree: "Undergraduate", description: "Automated robotics, sensor telemetry, and mechanical control systems." },
          { name: "Mechanical Engineering Technology", duration: "4 Years", degree: "Undergraduate", description: "Precision manufacturing, CNC machining, and production automation." },
          { name: "Architecture & Urban Planning", duration: "4 Years", degree: "Undergraduate", description: "Sustainable urban design, structural aesthetics, and architectural CAD." },
          { name: "Civil Engineering & Construction", duration: "4 Years", degree: "Undergraduate", description: "Structural load calculations, BIM workflows, and civil infrastructure." },
          { name: "Traffic Management & Safety", duration: "4 Years", degree: "Undergraduate", description: "Smart city transport solutions and traffic logistics optimization." },
          { name: "Renewable Energy Sources", duration: "4 Years", degree: "Undergraduate", description: "Photovoltaic systems, wind generation, and modern green energy grids." },
          { name: "Applied Mathematics", duration: "4 Years", degree: "Undergraduate", description: "Mathematical modeling of engineering systems and numerical algorithms." },
          { name: "Space Technologies", duration: "4 Years", degree: "Undergraduate", description: "Satellite communications, Earth remote sensing, and GIS data analytics." },
          { name: "Elevator & Lift Engineering", duration: "4 Years", degree: "Undergraduate", description: "Vertical transportation systems, safety mechanics, and control electronics." },
          { name: "Building Utility Engineering", duration: "4 Years", degree: "Undergraduate", description: "HVAC systems, water distribution, and smart building automation." },
          { name: "Interior Design", duration: "4 Years", degree: "Undergraduate", description: "Spatial ergonomics, material selection, and 3D architectural rendering." },
          { name: "Fashion Design", duration: "4 Years", degree: "Undergraduate", description: "Apparel styling, textile technology, and fashion brand production." },
          { name: "Fine Arts & Painting", duration: "4 Years", degree: "Undergraduate", description: "Classical studio drawing, painting techniques, and artistic composition." },
        ],
      },
      {
        id: "economy",
        name: "School of Business & Economy",
        category: "economy",
        badge: "Business & Finance",
        badgeVariant: "gold",
        image: "/assets/photos/economy.png",
        count: "8+ Programs",
        duration: "4 Years",
        languages: ["English", "Uzbek", "Russian"],
        description:
          "Global capital markets, corporate leadership, FinTech innovation, international commerce, and premium tourism management.",
        highlights: [
          "Curriculum aligned with ACCA and CFA standards",
          "Internships in premier commercial banks and auditing firms",
          "Startup incubation and entrepreneurial accelerator",
        ],
        popularPrograms: [
          "Business Management",
          "Finance & FinTech",
          "Banking & Auditing",
          "International Economic Relations",
          "Tourism & Hospitality",
        ],
        allPrograms: [
          { name: "Business Management", duration: "4 Years", degree: "Undergraduate", description: "Strategic enterprise leadership, operational analysis, and team management." },
          { name: "Finance & Financial Technology", duration: "4 Years", degree: "Undergraduate", description: "Capital allocation, quantitative valuation, and algorithmic FinTech solutions." },
          { name: "Banking & Audit", duration: "4 Years", degree: "Undergraduate", description: "Credit portfolio assessment, central banking compliance, and financial audits." },
          { name: "Accounting & Financial Reporting", duration: "4 Years", degree: "Undergraduate", description: "IFRS accounting, tax planning, and forensic financial inspection." },
          { name: "International Economic Relations", duration: "4 Years", degree: "Undergraduate", description: "Cross-border trade mechanics, global supply chain, and export development." },
          { name: "International Relations", duration: "4 Years", degree: "Undergraduate", description: "Diplomatic protocol, foreign policy analysis, and international law." },
          { name: "International Marketing", duration: "4 Years", degree: "Undergraduate", description: "Data-driven marketing, brand equity, consumer behavior, and SEO/SEM." },
          { name: "Tourism & Hospitality Management", duration: "4 Years", degree: "Undergraduate", description: "International hotel operations, destination branding, and luxury services." },
        ],
      },
      {
        id: "education",
        name: "School of Education",
        category: "education",
        badge: "Education & Pedagogy",
        badgeVariant: "default",
        image: "/assets/photos/education.png",
        count: "6+ Programs",
        duration: "4 Years",
        languages: ["English", "Uzbek", "Russian"],
        description:
          "Cultivating visionary educators, specialized pedagogical counselors, and educational psychologists equipped with modern teaching tools.",
        highlights: [
          "STEAM methodology and modern European pedagogical frameworks",
          "Teacher training in reputable private and state academies",
          "Psychological diagnostic and counseling laboratory",
        ],
        popularPrograms: [
          "Primary Education",
          "Preschool Education",
          "Pedagogy & Psychology",
          "Special Pedagogy (Speech Therapy)",
          "History",
        ],
        allPrograms: [
          { name: "Primary School Education", duration: "4 Years", degree: "Undergraduate", description: "Foundation literacy, numeracy pedagogical methods, and cognitive child development." },
          { name: "Preschool Education", duration: "4 Years", degree: "Undergraduate", description: "Early childhood cognitive, emotional, and social development models." },
          { name: "Pedagogy & Practical Psychology", duration: "4 Years", degree: "Undergraduate", description: "Behavioral assessment, developmental psychology, and student counseling." },
          { name: "Special Pedagogy & Speech Therapy", duration: "4 Years", degree: "Undergraduate", description: "Speech pathology correction, surdopedagogy, and inclusive education." },
          { name: "Physical Education & Sports", duration: "4 Years", degree: "Undergraduate", description: "Athletic coaching theory, biomechanics, and adaptive physical training." },
          { name: "History", duration: "4 Years", degree: "Undergraduate", description: "World civilization, Silk Road heritage, historiography, and archive methodology." },
        ],
      },
      {
        id: "philology",
        name: "School of Philology",
        category: "philology",
        badge: "Languages & Translation",
        badgeVariant: "accent",
        image: "/assets/photos/translation-studies.png",
        count: "7+ Programs",
        duration: "4 Years",
        languages: ["English", "Korean", "Russian", "Japanese", "Chinese"],
        description:
          "Advanced linguistic training with native speaker faculty, simultaneous conference interpreting, and international cultural diplomacy.",
        highlights: [
          "Native-speaker faculty from partner countries",
          "Direct academic exchange programs with South Korea and the UK",
          "Dedicated simultaneous interpreting laboratory",
        ],
        popularPrograms: [
          "English Language & Literature",
          "Korean Philology",
          "Translation Theory & Practice",
          "Japanese Language",
          "Chinese Translation Studies",
        ],
        allPrograms: [
          { name: "English Language & Philology", duration: "4 Years", degree: "Undergraduate", description: "Advanced academic writing, syntax, stylistics, and TESOL methodology." },
          { name: "Korean Philology", duration: "4 Years", degree: "Undergraduate", description: "Hangul linguistics, business Korean, literature, and East Asian culture." },
          { name: "Russian Language & Literature", duration: "4 Years", degree: "Undergraduate", description: "Comparative linguistics, Russian classical literature, and editorial stylistics." },
          { name: "Japanese Language & Culture", duration: "4 Years", degree: "Undergraduate", description: "Kanji mastery, oral fluency, JLPT preparation, and business etiquette." },
          { name: "Chinese Translation & Philology", duration: "4 Years", degree: "Undergraduate", description: "Mandarin Chinese phonetics, commercial translation, and HSK standards." },
          { name: "Turkish Language & Translation", duration: "4 Years", degree: "Undergraduate", description: "Modern Turkish linguistic structures, diplomatic translation, and Turkic culture." },
          { name: "Uzbek Language & Literature", duration: "4 Years", degree: "Undergraduate", description: "Classical Uzbek poetry, Chagatay language roots, and modern linguistics." },
        ],
      },
    ];
  }

  // Default: Uzbek
  return [
    {
      id: "medicine",
      name: "Tibbiyot fakulteti",
      category: "medicine",
      badge: "Sog'liqni Saqlash",
      badgeVariant: "accent",
      image: "/assets/photos/med.png",
      count: "5+ yo'nalish",
      duration: "4 - 6 yil",
      languages: ["O'zbek", "Rus"],
      description:
        "Zamonaviy tibbiyot standartlari, jahon andozalariga mos simulyatsion laboratoriyalar va shahar yetakchi klinikalarida amaliyot.",
      highlights: [
        "Simulyatsion tibbiyot o'quv markazi",
        "Kasalxona va klinikalarda bevosita amaliyot",
        "Xorijlik mutaxassislar ma'ruzalari",
      ],
      popularPrograms: [
        "Davolash ishi",
        "Stomatologiya",
        "Pediatriya ishi",
        "Oliy hamshiralik ishi",
        "Chiroy estetikasi (Kosmetologiya)",
      ],
      allPrograms: [
        { name: "Davolash ishi", duration: "6 yil", degree: "Bakalavriat", description: "Sog'liqni saqlash sohasidagi eng nufuzli yo'nalish. Zamonaviy kasalliklarni tashxislash va davolash." },
        { name: "Stomatologiya", duration: "5 yil", degree: "Bakalavriat", description: "Og'iz bo'shlig'i a'zolari kasalliklarini tashxislash, davolash va protezlash bo'yicha zamonaviy kadrlar." },
        { name: "Pediatriya ishi", duration: "6 yil", degree: "Bakalavriat", description: "Bolalar salomatligini saqlash, chaqaloqlikdan o'smirlik davrigacha bo'lgan kasalliklarni davolash." },
        { name: "Oliy hamshiralik ishi", duration: "4 yil", degree: "Bakalavriat", description: "Tibbiy yordam ko'rsatishni tashkil qilish, dispanser kuzatuvi va sog'lom turmush tarzini targ'ib qilish." },
        { name: "Chiroy estetikasi va kosmetologiya", duration: "4 yil", degree: "Bakalavriat", description: "Invaziv bo'lmagan va minimal invaziv zamonaviy kosmetologiya hamda teri parvarishi." },
      ],
    },
    {
      id: "engineering",
      name: "Muhandislik fakulteti",
      category: "engineering",
      badge: "IT & Muhandislik",
      badgeVariant: "accent",
      image: "/assets/photos/engineering.png",
      count: "18+ yo'nalish",
      duration: "4 yil",
      languages: ["O'zbek", "Rus", "Ingliz"],
      description:
        "Sun'iy intellekt, dasturiy ta'minot, robototexnika, avtomatika va arxitektura bo'yicha sanoat talablariga mos kadrlar tayyorlash.",
      highlights: [
        "IT Park va rezident kompaniyalar bilan integratsiya",
        "Robototexnika va IoT laboratoriyalari",
        "Xalqaro IT sertifikatlarga tayyorgarlik",
      ],
      popularPrograms: [
        "Kompyuter injiniringi",
        "Sun'iy intellekt va ma'lumotlar tahlili",
        "Dasturiy injiniring",
        "Arxitektura va shaharsozlik",
        "Elektrotexnika va avtomatika",
      ],
      allPrograms: [
        { name: "Kompyuter injiniringi", duration: "4 yil", degree: "Bakalavriat", description: "Kompyuter tizimlari apparat ta'minoti va tizimli dasturlash." },
        { name: "Axborot tizimlari muhandisligi", duration: "4 yil", degree: "Bakalavriat", description: "Matematika, biznes va axborot xavfsizligini birlashtirgan tarmoqlararo IT tizimlar." },
        { name: "Dasturiy injiniring", duration: "4 yil", degree: "Bakalavriat", description: "Yirik dasturiy mahsulotlar ishlab chiqish, bulutli texnologiyalar va arxitektura." },
        { name: "Sun'iy intellekt va ma'lumotlar tahlili", duration: "4 yil", degree: "Bakalavriat", description: "Mashinali o'rganish, neyron tarmoqlar va Big Data tahlili." },
        { name: "Elektrotexnika va energetika", duration: "4 yil", degree: "Bakalavriat", description: "Elektr tizimlari, o'lchov asboblari va sanoat avtomatizatsiyasi." },
        { name: "Mexatronika va robototexnika", duration: "4 yil", degree: "Bakalavriat", description: "Robototexnik tizimlar, datchiklar va mexanik avtomatlashtirish." },
        { name: "Mashinasozlik texnologiyasi", duration: "4 yil", degree: "Bakalavriat", description: "Sanoat mashinasozligi, detallarga ishlov berish va loyihalash." },
        { name: "Arxitektura va shaharsozlik", duration: "4 yil", degree: "Bakalavriat", description: "Zamonaviy binolar, landshaft va shahar infratuzilmasi dizayni." },
        { name: "Bino va inshootlar qurilishi", duration: "4 yil", degree: "Bakalavriat", description: "Qurilish konstruksiyalari mustahkamligi va BIM loyihalash." },
        { name: "Yo'l harakatini boshqarish va xavfsizlik", duration: "4 yil", degree: "Bakalavriat", description: "Aqlli transport tizimlari va harakat xavfsizligini tashkil qilish." },
        { name: "Muqobil energiya manbalari", duration: "4 yil", degree: "Bakalavriat", description: "Quyosh, shamol va ekologik energiya texnologiyalari." },
        { name: "Amaliy matematika", duration: "4 yil", degree: "Bakalavriat", description: "Murakkab jarayonlarning matematik modellari va hisoblash usullari." },
        { name: "Kosmik texnologiyalar", duration: "4 yil", degree: "Bakalavriat", description: "Yer masofadan zondlash, GIS texnologiyalari va sun'iy yo'ldosh tizimlari." },
        { name: "Lift muhandisligi", duration: "4 yil", degree: "Bakalavriat", description: "Vertikal transport tizimlari montaji, ekspluatatsiyasi va xavfsizligi." },
        { name: "Muhandislik kommunikatsiyalari", duration: "4 yil", degree: "Bakalavriat", description: "Ventilyatsiya, suv va issiqlik ta'minoti muhandislik tarmoqlari." },
        { name: "Dizayn (Interyer dizayni)", duration: "4 yil", degree: "Bakalavriat", description: "Ichki makon dizayni, 3D vizualizatsiya va zamonaviy materiallar." },
        { name: "Liboslar dizayni va moda", duration: "4 yil", degree: "Bakalavriat", description: "Moda industriyasi, kiyim konstruksiyasi va to'qimachilik texnologiyasi." },
        { name: "Rangtasvir va grafika", duration: "4 yil", degree: "Bakalavriat", description: "Akademik rasm, rangtasvir kompozitsiyasi va tasviriy san'at." },
      ],
    },
    {
      id: "economy",
      name: "Iqtisodiyot fakulteti",
      category: "economy",
      badge: "Biznes & Moliya",
      badgeVariant: "gold",
      image: "/assets/photos/economy.png",
      count: "8+ yo'nalish",
      duration: "4 yil",
      languages: ["O'zbek", "Rus", "Ingliz"],
      description:
        "Global moliya bozorlari, korporativ boshqaruv, investitsiyalar, xalqaro savdo va turizm sohalari uchun mutaxassislar.",
      highlights: [
        "Xalqaro ACCA va CFA dasturlariga tayyorgarlik",
        "Yetakchi tijorat banklarida amaliyot",
        "Startap akseleratori va biznes inkubator",
      ],
      popularPrograms: [
        "Biznes boshqaruvi",
        "Moliya va moliyaviy texnologiyalar",
        "Bank ishi va audit",
        "Xalqaro iqtisodiy munosabatlar",
        "Turizm va mehmondo'stlik",
      ],
      allPrograms: [
        { name: "Biznes boshqaruvi (Management)", duration: "4 yil", degree: "Bakalavriat", description: "Strategik boshqaruv, operatsion samaradorlik va jamoani yetaklash." },
        { name: "Moliya va moliyaviy texnologiyalar", duration: "4 yil", degree: "Bakalavriat", description: "Korporativ moliya, investitsiya tahlili va raqamli FinTech xizmatlar." },
        { name: "Bank ishi va audit", duration: "4 yil", degree: "Bakalavriat", description: "Kredit operatsiyalari, bank xatarlarini boshqarish va audit tekshiruvi." },
        { name: "Buxgalteriya hisobi", duration: "4 yil", degree: "Bakalavriat", description: "MHXS (IFRS) asosida moliyaviy hisobot va soliq auditini yuritish." },
        { name: "Xalqaro iqtisodiy munosabatlar", duration: "4 yil", degree: "Bakalavriat", description: "Tashqi savdo operatsiyalari, xalqaro logistika va bojxona tartiboti." },
        { name: "Xalqaro munosabatlar", duration: "4 yil", degree: "Bakalavriat", description: "Diplomatik protokol, xalqaro huquq va global geosiyosat asoslari." },
        { name: "Xalqaro marketing", duration: "4 yil", degree: "Bakalavriat", description: "Raqamli marketing, brend yaratish, bozor tahlili va reklama strategiyasi." },
        { name: "Turizm va mehmondo'stlik servisi", duration: "4 yil", degree: "Bakalavriat", description: "Xalqaro mehmonxona boshqaruvi, turoperatorlik va ekskursiya xizmatlari." },
      ],
    },
    {
      id: "education",
      name: "Ta'lim fakulteti",
      category: "education",
      badge: "Pedagogika & Psixologiya",
      badgeVariant: "default",
      image: "/assets/photos/education.png",
      count: "6+ yo'nalish",
      duration: "4 yil",
      languages: ["O'zbek", "Rus"],
      description:
        "Kelajak avlodni tarbiyalovchi zamonaviy pedagoglar, amaliy psixologlar hamda maxsus pedagogika mutaxassislari.",
      highlights: [
        "STEAM va ilg'or Yevropa ta'lim metodikasi",
        "Xususiy va davlat maktablarida pedagogik amaliyot",
        "Psixologik korreksiya va konsultatsiya markazi",
      ],
      popularPrograms: [
        "Boshlang'ich ta'lim",
        "Maktabgacha ta'lim",
        "Pedagogika va psixologiya",
        "Maxsus pedagogika (Logopediya)",
        "Tarix",
      ],
      allPrograms: [
        { name: "Boshlang'ich ta'lim metodikasi", duration: "4 yil", degree: "Bakalavriat", description: "Kichik yoshdagi o'quvchilarda savodxonlik va intellektual salohiyatni shakllantirish." },
        { name: "Maktabgacha ta'lim", duration: "4 yil", degree: "Bakalavriat", description: "Maktabgacha yoshdagi bolalar uchun interaktiv ta'lim va o'yin texnologiyalari." },
        { name: "Pedagogika va psixologiya", duration: "4 yil", degree: "Bakalavriat", description: "Shaxs rivojlanishi psixologiyasi, diagnostika va psixologik konsultatsiya." },
        { name: "Maxsus pedagogika (Surdopedagogika / Logopediya)", duration: "4 yil", degree: "Bakalavriat", description: "Nutqida va eshitishida nuqsoni bo'lgan bolalar bilan inklyuziv ta'lim mashg'ulotlari." },
        { name: "Jismoniy madaniyat va sport", duration: "4 yil", degree: "Bakalavriat", description: "Jismoniy tarbiya metodikasi, sog'lomlashtirish va sport murabbiyligi." },
        { name: "Tarix", duration: "4 yil", degree: "Bakalavriat", description: "O'zbekiston va jahon tarixi, arxeologiya, manbashunoslik va muzey ishi." },
      ],
    },
    {
      id: "philology",
      name: "Filologiya fakulteti",
      category: "philology",
      badge: "Tillar & Tarjima",
      badgeVariant: "accent",
      image: "/assets/photos/translation-studies.png",
      count: "7+ yo'nalish",
      duration: "4 yil",
      languages: ["Ingliz", "Koreys", "Rus", "Yapon", "Xitoy"],
      description:
        "Xorijiy tillarni ona tili sohiblari bilan chuqurlashtirilgan o'rganish, sinxron tarjima va xalqaro madaniy aloqalar.",
      highlights: [
        "Xorijlik 'Native Speaker' professorlar",
        "Koreya va Buyuk Britaniyaga talaba almashinuvi",
        "Sinxron tarjima laboratoriyasi",
      ],
      popularPrograms: [
        "Ingliz tili ta'limi va filologiyasi",
        "Koreys tili filologiyasi",
        "Tarjima nazariyasi va amaliyoti",
        "Yapon tili",
        "Xitoy tili va tarjima",
      ],
      allPrograms: [
        { name: "Filologiya: Ingliz tili", duration: "4 yil", degree: "Bakalavriat", description: "Ingliz tili grammatikasi, fonetikasi, adabiyoti va zamonaviy o'qitish metodikasi." },
        { name: "Koreys tili filologiyasi", duration: "4 yil", degree: "Bakalavriat", description: "Koreys tili, madaniyati, ish yuritish va Janubiy Koreya universitetlari bilan hamkorlik." },
        { name: "Rus tili va adabiyoti", duration: "4 yil", degree: "Bakalavriat", description: "Rus tili grammatikasi, qiyosiy tilshunoslik va jahon adabiyoti." },
        { name: "Yapon tili va adabiyoti", duration: "4 yil", degree: "Bakalavriat", description: "Ieroglifika, yapon tilida erkin muloqot va Yaponiya madaniyati." },
        { name: "Xitoy tili va tarjimashunoslik", duration: "4 yil", degree: "Bakalavriat", description: "Xitoy tili grammatikasi, iyerogliflar tahlili va amaliy tarjima." },
        { name: "Turk tili va tarjimashunoslik", duration: "4 yil", degree: "Bakalavriat", description: "Turk tili filologiyasi, diplomatik va iqtisodiy tarjima san'ati." },
        { name: "O'zbek tili va adabiyoti", duration: "4 yil", degree: "Bakalavriat", description: "O'zbek adabiy tili tarixi, folklorshunoslik va ilmiy tilshunoslik." },
      ],
    },
  ];
};

export function getFacultySummaries(locale: Locale): Array<{ id: string; name: string; count: string; href: string }> {
  return getLocalizedFaculties(locale).map((f) => ({
    id: f.id,
    name: f.name,
    count: f.count,
    href: "#schools",
  }));
}
