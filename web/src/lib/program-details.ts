import type { Locale, ProgramItem } from "@/types";

interface AccreditationHighlight {
  title: string;
  desc: string;
}

export function getCurriculum(
  slug: string,
  facultyId: string,
  locale: Locale
): string[] {
  const curricula: Record<string, Record<Locale, string[]>> = {
    "davolash-ishi": {
      uz: [
        "Normal va klinik anatomiya, gistologiya",
        "Klinik biokimyo va patologik fiziologiya",
        "Ichki kasalliklar propedevtikasi va terapiya",
        "Umumiy va operativ jarrohlik asoslari",
        "Klinik farmakologiya va farmakoterapiya",
        "Instrumental diagnostika (UZI, EKG, MRT, KT)",
      ],
      ru: [
        "Нормальная и клиническая анатомия, гистология",
        "Клиническая биохимия и патологическая физиология",
        "Пропедевтика внутренних болезней и терапия",
        "Основы общей и оперативной хирургии",
        "Клиническая фармакология и фармакотерапия",
        "Инструментальная диагностика (УЗИ, ЭКГ, МРТ, КТ)",
      ],
      en: [
        "Normal & Clinical Anatomy, Histology",
        "Clinical Biochemistry & Pathophysiology",
        "Propaedeutics of Internal Medicine & Therapy",
        "Principles of General & Operative Surgery",
        "Clinical Pharmacology & Pharmacotherapy",
        "Instrumental Diagnostics (Ultrasound, ECG, MRI, CT)",
      ],
    },
    stomatologiya: {
      uz: [
        "Tish va jag' anatomiyasi hamda fiziologiyasi",
        "Terapevtik stomatologiya va endodontiya",
        "Jarrohlik stomatologiyasi va implantologiya",
        "Ortopedik stomatologiya va protezlash",
        "Ortodontiya va bolalar stomatologiyasi",
        "Zamonaviy stomatologik materialshunoslik",
      ],
      ru: [
        "Анатомия и физиология зубочелюстной системы",
        "Терапевтическая стоматология и эндодонтия",
        "Хирургическая стоматология и имплантология",
        "Ортопедическая стоматология и протезирование",
        "Ортодонтия и детская стоматология",
        "Современное стоматологическое материаловедение",
      ],
      en: [
        "Dental & Maxillofacial Anatomy and Physiology",
        "Therapeutic Dentistry & Endodontics",
        "Surgical Dentistry & Implantology",
        "Prosthodontics & Dental Prosthetics",
        "Orthodontics & Pediatric Dentistry",
        "Modern Dental Materials Science",
      ],
    },
    "pediatriya-ishi": {
      uz: [
        "Bolalar anatomiyasi va rivojlanish fiziologiyasi",
        "Chaqaloqlar patologiyasi (Neonatologiya)",
        "Bolalar ichki kasalliklari va terapiyasi",
        "Bolalar jarrohligi va anesteziologiyasi",
        "Bolalar yuqumli kasalliklari va immunoprofilaktika",
        "Shoshilinch pediatrik yordam va reanimatsiya",
      ],
      ru: [
        "Анатомия и физиология детского возраста",
        "Патология новорожденных (Неонатология)",
        "Детские внутренние болезни и терапия",
        "Детская хирургия и анестезиология",
        "Детские инфекционные болезни и иммунопрофилактика",
        "Неотложная педиатрическая помощь и реанимация",
      ],
      en: [
        "Pediatric Anatomy & Developmental Physiology",
        "Neonatal Pathology (Neonatology)",
        "Pediatric Internal Medicine & Diagnostics",
        "Pediatric Surgery & Anesthesiology",
        "Pediatric Infectious Diseases & Immunoprophylaxis",
        "Emergency Pediatric Care & Critical Resuscitation",
      ],
    },
    "oliy-hamshiralik-ishi": {
      uz: [
        "Hamshiralik parvarishi nazariyasi va amaliyoti",
        "Klinik farmakologiya va tibbiy etika",
        "Reanimatsiya va anesteziologiyada hamshiralik",
        "Tibbiy muassasalarni boshqarish va menejment",
        "Profilaktik tibbiyot va infeksiya nazorati",
        "Shoshilinch birinchi tibbiy yordam ko'rsatish",
      ],
      ru: [
        "Теория и практика сестринского ухода",
        "Клиническая фармакология и медицинская этика",
        "Сестринское дело в реанимации и анестезиологии",
        "Менеджмент и управление медицинскими учреждениями",
        "Профилактическая медицина и инфекционный контроль",
        "Оказание неотложной доврачебной помощи",
      ],
      en: [
        "Nursing Care Theory & Evidence-based Practice",
        "Clinical Pharmacology & Medical Ethics",
        "Critical Care & Anesthesia Nursing",
        "Healthcare Facility Administration & Management",
        "Preventive Healthcare & Infection Control",
        "Advanced First Aid & Emergency Response",
      ],
    },
    "chiroy-estetikasi": {
      uz: [
        "Dermatologiya va teri anatomiyasi",
        "Klinik va estetik kosmetologiya asoslari",
        "Aparat kosmetologiyasi va lazer texnologiyalari",
        "Kimyoviy piling va mezoterapiya protokollari",
        "Estetik reabilitatsiya va kosmetsevtika",
        "Go'zallik sanoatida menejment va sanitariya",
      ],
      ru: [
        "Дерматология и анатомия кожного покрова",
        "Основы клинической и эстетической косметологии",
        "Аппаратная косметология и лазерные технологии",
        "Протоколы химических пилингов и мезотерапии",
        "Эстетическая реабилитация и космецевтика",
        "Менеджмент и санитария в индустрии красоты",
      ],
      en: [
        "Dermatology & Skin Anatomical Structure",
        "Fundamentals of Clinical & Aesthetic Cosmetology",
        "Hardware Aesthetics & Laser Dermatology Systems",
        "Chemical Peeling & Mesotherapy Protocols",
        "Aesthetic Rehabilitation & Cosmeceuticals",
        "Beauty Industry Management & Clinical Sanitation",
      ],
    },
    "dasturiy-injiniring": {
      uz: [
        "Algoritmlar va ma'lumotlar tuzilmasi (DSA)",
        "Ob'ektga yo'naltirilgan dasturlash va patternlar",
        "Taqsimlangan tizimlar va bulutli arxitektura",
        "Relyatsion va NoSQL ma'lumotlar bazalari",
        "DevOps, CI/CD va mikroxizmatlar infratuzilmasi",
        "Sun'iy intellekt va dasturiy ta'minot xavfsizligi",
      ],
      ru: [
        "Алгоритмы и структуры данных (DSA)",
        "Объектно-ориентированное программирование и паттерны",
        "Распределенные системы и облачная архитектура",
        "Реляционные и NoSQL базы данных",
        "DevOps, CI/CD и микросервисная инфраструктура",
        "Искусственный интеллект и безопасность ПО",
      ],
      en: [
        "Data Structures & Advanced Algorithms (DSA)",
        "Object-Oriented Programming & Software Design Patterns",
        "Distributed Systems & Cloud Architecture (AWS/GCP)",
        "Relational & Distributed NoSQL Database Systems",
        "DevOps Automation, CI/CD & Microservices Orchestration",
        "Machine Learning Integration & Application Security",
      ],
    },
    "kompyuter-injiniringi": {
      uz: [
        "Kompyuter arxitekturasi va mikroprotsessorlar",
        "Operatsion tizimlar va parallel hisoblash",
        "Kompyuter tarmoqlari va marshrutlash protokollari",
        "Sun'iy intellekt va kompyuter ko'rishi (CV)",
        "O'rnatilgan tizimlar (Embedded Systems & IoT)",
        "Kriptografiya va axborot xavfsizligi asoslari",
      ],
      ru: [
        "Архитектура компьютеров и микропроцессоры",
        "Операционные системы и параллельные вычисления",
        "Компьютерные сети и протоколы маршрутизации",
        "Искусственный интеллект и компьютерное зрение",
        "Встраиваемые системы (Embedded Systems & IoT)",
        "Основы криптографии и информационной безопасности",
      ],
      en: [
        "Computer Architecture & Microprocessor Design",
        "Operating Systems Kernels & High-Performance Computing",
        "Computer Networking & Enterprise Routing Protocols",
        "Artificial Intelligence & Computer Vision (CV)",
        "Embedded Systems Programming & IoT Edge Devices",
        "Cryptography & Information Assurance Systems",
      ],
    },
    "arxitektura-va-shaharsozlik": {
      uz: [
        "Arxitektura loyihalash va fazoviy kompozitsiya",
        "Shaharsozlik nazariyasi va bosh rejalar loyihasi",
        "BIM texnologiyalari (Revit, ArchiCAD, 3ds Max)",
        "Bino konstruksiyalari va seysmik xavfsizlik",
        "Tarixiy obidalarni restavratsiya qilish va landshaft",
        "Energiya tejamkor va yashil arxitektura",
      ],
      ru: [
        "Архитектурное проектирование и объемная композиция",
        "Теория градостроительства и генеральные планы",
        "BIM-технологии (Revit, ArchiCAD, 3ds Max)",
        "Строительные конструкции и сейсмостойкость",
        "Реставрация памятников и ландшафтная архитектура",
        "Энергоэффективная и зеленая архитектура",
      ],
      en: [
        "Architectural Design & Spatial Composition",
        "Urban Planning Theory & City Masterplanning",
        "BIM Methodologies (Revit, ArchiCAD, 3ds Max)",
        "Building Structures & Seismic Resilience Engineering",
        "Heritage Conservation & Sustainable Landscape Design",
        "Bioclimatic & High-Efficiency Green Architecture",
      ],
    },
    "axborot-tizimlari-muhandisligi": {
      uz: [
        "Korporativ axborot tizimlari arxitekturasi",
        "Kiberxavfsizlik va tarmoq mudofaasi",
        "Katta hajmdagi ma'lumotlar tahlili (Big Data)",
        "Axborot tizimlarini audit qilish va IT-menejment",
        "Bulutli platformalar va virtualizatsiya",
        "Raqamli kriminalistika va insidentlarni boshqarish",
      ],
      ru: [
        "Архитектура корпоративных информационных систем",
        "Кибербезопасность и сетевая защита",
        "Анализ больших объемов данных (Big Data)",
        "Аудит информационных систем и IT-менеджмент",
        "Облачные платформы и виртуализация",
        "Цифровая криминалистика и реагирование на инциденты",
      ],
      en: [
        "Enterprise Information Systems Architecture",
        "Cybersecurity Defense & Network Intrusion Prevention",
        "Big Data Analytics & Business Intelligence Pipelines",
        "IS Audit Standards & Strategic IT Management",
        "Cloud Infrastructure, Hypervisors & Containerization",
        "Digital Forensics & Security Incident Management",
      ],
    },
    biznesni_boshqarish: {
      uz: [
        "Strategik menejment va korporativ boshqaruv",
        "Korporativ moliya va investitsiya tahlili",
        "Raqamli marketing va iste'molchi xatti-harakati",
        "Loyihalarni boshqarish (Agile, Scrum, PMP)",
        "Xalqaro biznes va transmilliy savdo",
        "Biznes tahlil va ma'lumotlarga asoslangan qarorlar",
      ],
      ru: [
        "Стратегический менеджмент и корпоративное управление",
        "Корпоративные финансы и инвестиционный анализ",
        "Цифровой маркетинг и поведение потребителей",
        "Управление проектами (Agile, Scrum, PMP)",
        "Международный бизнес и трансграничная торговля",
        "Бизнес-аналитика и решения на основе данных",
      ],
      en: [
        "Strategic Leadership & Corporate Governance",
        "Corporate Financial Management & Valuation",
        "Digital Marketing & Consumer Behavioral Analytics",
        "Agile Project Management & Enterprise Operations",
        "International Business Strategy & Trade Relations",
        "Business Intelligence & Quantitative Decision Science",
      ],
    },
  };

  if (curricula[slug]?.[locale]) {
    return curricula[slug][locale];
  }

  // Fallbacks by facultyId
  const facultyCurricula: Record<string, Record<Locale, string[]>> = {
    medicine: {
      uz: [
        "Normal va patologik anatomiya hamda fiziologiya",
        "Klinik biokimyo, mikrobiologiya va immunologiya",
        "Ichki kasalliklar propedevtikasi va terapiya",
        "Umumiy va operativ jarrohlik asoslari",
        "Klinik farmakologiya va tibbiy diagnostika",
        "Shoshilinch tibbiy yordam va simulyatsiya amaliyoti",
      ],
      ru: [
        "Нормальная и патологическая анатомия и физиология",
        "Клиническая биохимия, микробиология и иммунология",
        "Пропедевтика внутренних болезней и терапия",
        "Основы общей и оперативной хирургии",
        "Клиническая фармакология и диагностика",
        "Неотложная помощь и симуляционная практика",
      ],
      en: [
        "Normal & Pathological Anatomy and Physiology",
        "Clinical Biochemistry, Microbiology & Immunology",
        "Propaedeutics of Internal Medicine & Diagnostics",
        "Foundations of Operative & Clinical Surgery",
        "Clinical Pharmacology & Evidence-based Medicine",
        "Emergency Life Support & High-Fidelity Simulation",
      ],
    },
    engineering: {
      uz: [
        "Oliy matematika va amaliy fizika",
        "Algoritmik tillar va muhandislik dasturlash",
        "Amaliy mexanika va kompyuter grafikasi (CAD)",
        "Elektronika, sxematexnika va sensorli tizimlar",
        "Tizimli tahlil va loyihalarni boshqarish",
        "Zamonaviy ishlab chiqarish va texnik xavfsizlik",
      ],
      ru: [
        "Высшая математика и прикладная физика",
        "Алгоритмические языки и инженерное программирование",
        "Прикладная механика и компьютерная графика (CAD)",
        "Электроника, схемотехника и сенсорные системы",
        "Системный анализ и управление проектами",
        "Современное производство и техническая безопасность",
      ],
      en: [
        "Advanced Mathematics & Applied Physics",
        "Computational Systems & Engineering Programming",
        "Applied Mechanics & Computer-Aided Design (CAD)",
        "Electronics, Circuitry & Microcontroller Systems",
        "Systems Analysis & Technological Project Management",
        "Modern Production Facilities & Industrial Safety",
      ],
    },
    economy: {
      uz: [
        "Mikro va makroiqtisodiyot tahlili",
        "Buxgalteriya hisobi va audit xalqaro standartlari",
        "Korporativ moliya va investitsiya faoliyati",
        "Xalqaro iqtisodiy munosabatlar va savdo",
        "Ekonometrika va moliyaviy modellashtirish",
        "FinTech innovatsiyalari va soliq konsaltingi",
      ],
      ru: [
        "Анализ микро- и макроэкономики",
        "Бухгалтерский учет и международные стандарты аудита",
        "Корпоративные финансы и инвестиции",
        "Международные экономические отношения и торговля",
        "Эконометрика и финансовое моделирование",
        "FinTech-инновации и налоговый консалтинг",
      ],
      en: [
        "Microeconomic & Macroeconomic Market Dynamics",
        "Financial Accounting & International Auditing (IFRS)",
        "Corporate Capital Structuring & Investment Analysis",
        "International Trade Regulations & Globalization",
        "Applied Econometrics & Quantitative Financial Modeling",
        "FinTech Innovation & Strategic Tax Advisory",
      ],
    },
    education: {
      uz: [
        "Pedagogika nazariyasi va tarixi",
        "Umumiy va yosh davrlari psixologiyasi",
        "Zamonaviy ta'lim metodikasi va STEAM texnologiyalar",
        "Inklyuziv ta'lim va maxsus pedagogika asoslari",
        "Ta'limda axborot-kommunikatsiya texnologiyalari",
        "Pedagogik mahorat va psixodiagnostika amaliyoti",
      ],
      ru: [
        "Теория и история педагогики",
        "Общая и возрастная психология",
        "Современные методики обучения и STEAM-технологии",
        "Основы инклюзивного образования и спецпедагогики",
        "Информационные технологии в образовании",
        "Педагогическое мастерство и психодиагностика",
      ],
      en: [
        "Educational Philosophy & Pedagogical History",
        "Developmental Cognitive & Educational Psychology",
        "Modern Instructional Design & STEAM Pedagogy",
        "Principles of Inclusive Learning & Special Needs",
        "Educational Technology & Digital Learning Environments",
        "Classroom Leadership & Psychodiagnostic Assessment",
      ],
    },
    philology: {
      uz: [
        "Umumiy va qiyosiy tilshunoslik asoslari",
        "Chet tili grammatikasi, fonetikasi va leksikologiyasi",
        "Sinxron va yozma tarjima nazariyasi hamda amaliyoti",
        "Jahon adabiyoti va madaniyatlararo muloqot",
        "Akademik yozuv va nutq madaniyati",
        "Chet tilini o'qitishning xalqaro metodikasi (TESOL)",
      ],
      ru: [
        "Основы общего и сравнительного языкознания",
        "Грамматика, фонетика и лексикология иностранного языка",
        "Теория и практика синхронного и письменного перевода",
        "Мировая литература и межкультурная коммуникация",
        "Академическое письмо и риторика",
        "Международная методика преподавания языков (TESOL)",
      ],
      en: [
        "General & Comparative Structural Linguistics",
        "Advanced Grammar, Phonetics & Lexicology",
        "Consecutive & Simultaneous Interpreting Practice",
        "World Literature & Intercultural Communication",
        "Academic Discourse & Rhetorical Argumentation",
        "International Language Pedagogy & Assessment (TESOL)",
      ],
    },
  };

  return facultyCurricula[facultyId]?.[locale] || facultyCurricula.engineering[locale];
}

export function getAccreditationHighlights(
  facultyId: string,
  locale: Locale
): AccreditationHighlight[] {
  const data: Record<Locale, AccreditationHighlight[]> = {
    uz: [
      {
        title: "Davlat litsenziyasi va akkreditatsiyasi",
        desc: "O'zbekiston Respublikasi Oliy ta'lim vazirligi tomonidan berilgan № 039281-sonli rasmiy davlat litsenziyasi. Universitet diplomi davlat OTMlari diplomlari bilan teng yuridik kuchga ega.",
      },
      {
        title: "Xalqaro 2+2 va 3+1 dual diplom dasturlari",
        desc: "Janubiy Koreya, Yevropa va Buyuk Britaniyaning nufuzli universitetlari bilan hamkorlikda 2+2 va 3+1 dasturlari bo'yicha tahsil olib, bir vaqtning o'zida ikkita diplomga ega bo'lish imkoniyati.",
      },
      {
        title: "ECTS kredit-modul tizimi",
        desc: "O'quv jarayoni Yevropa kredit tizimi (ECTS) asosida tashkil etilgan. Bu talabalarga xorijiy OTMlarga o'qishini ko'chirish yoki magistraturani chet elda davom ettirish imkonini beradi.",
      },
      {
        title: "Xalqaro ilmiy hamkorlik va laboratoriyalar",
        desc: "Xorijiy professor-o'qituvchilar ma'ruzalari, ilg'or simulyatsiya markazlari hamda xalqaro ilmiy-amaliy konferensiyalarda ishtirok etish kafolati.",
      },
    ],
    ru: [
      {
        title: "Государственная лицензия и аккредитация",
        desc: "Официальная государственная лицензия № 039281 Министерства высшего образования РУз. Диплом университета имеет полную юридическую силу на всей территории Узбекистана и за рубежом.",
      },
      {
        title: "Международные программы двойного диплома 2+2 и 3+1",
        desc: "Совместные академические программы с университетами Южной Кореи и Европы. Студенты могут получить сразу два диплома международного образца.",
      },
      {
        title: "Кредитно-модульная система ECTS",
        desc: "Учебный процесс организован по Европейской системе перезачета кредитов (ECTS), что обеспечивает академическую мобильность и признание кредитов в зарубежных вузах.",
      },
      {
        title: "Современные симуляционные лаборатории",
        desc: "Лекции приглашенных зарубежных профессоров, практическая работа в лабораториях и участие в международных научных проектах.",
      },
    ],
    en: [
      {
        title: "Official State License & Accreditation",
        desc: "Licensed under Official State License No. 039281 by the Ministry of Higher Education of the Republic of Uzbekistan. Degrees hold full legal status and equivalence domestically and globally.",
      },
      {
        title: "2+2 and 3+1 International Dual Degree Articulations",
        desc: "Dual-degree pathways with prestigious partner universities across South Korea and Europe, allowing students to graduate with two recognized international bachelor's degrees.",
      },
      {
        title: "ECTS Credit Transfer System",
        desc: "Curricula fully aligned with the European Credit Transfer and Accumulation System (ECTS), ensuring transparent credit transfer for international study abroad and graduate admissions.",
      },
      {
        title: "Global Faculty & Advanced Clinical/Engineering Labs",
        desc: "Lectures delivered by visiting international scholars, industry internships, and direct access to state-of-the-art diagnostic and fabrication laboratories.",
      },
    ],
  };

  return data[locale] || data.uz;
}

export function getCareerOutcomes(
  program: ProgramItem,
  locale: Locale
): string[] {
  const genericOutcomes: Record<Locale, string[]> = {
    uz: [
      "Yetakchi xususiy va davlat korxonalarida mas'ul mutaxassis va boshqaruvchi",
      "Xalqaro korporatsiyalar, transmilliy kompaniyalar va xorijiy vakolatxonalarda faoliyat",
      "Ilmiy-tadqiqot institutlari va innovatsion loyihalarda ekspert sifatida ishlash",
      "Mustaqil xususiy konsalting, amaliyot yoki startap loyihalarini muvaffaqiyatli ishga tushirish",
    ],
    ru: [
      "Ведущий специалист и руководитель в государственных и коммерческих организациях",
      "Работа в международных компаниях, филиалах транснациональных корпораций",
      "Экспертная деятельность в научно-исследовательских институтах и технологических центрах",
      "Запуск собственного стартапа, частной практики или консалтингового агентства",
    ],
    en: [
      "Senior practitioner and department lead in top public and private enterprises",
      "Career opportunities within multinational corporations and international institutions",
      "Specialist researcher in innovative R&D institutes and accredited testing centers",
      "Foundation to establish high-growth startups, private practice, or advisory consultancies",
    ],
  };

  // Prepend program-specific career summary
  const specific = program.career ? [program.career] : [];
  const list = genericOutcomes[locale] || genericOutcomes.uz;
  return [...specific, ...list];
}
