"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Globe2,
  X,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { translations } from "@/lib/translations";
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

const getLocalizedFaculties = (locale: Locale): FacultyData[] => {
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
          { name: "История", duration: "4 года", degree: "Бакалавриat", description: "Всемирная и отечественная история, археология, источниковедение и архивоведение." },
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

interface SchoolsGridProps {
  currentLocale?: Locale;
  onSelectFacultyForAdmission?: (facultyName: string) => void;
}

export function SchoolsGrid({
  currentLocale = "uz",
  onSelectFacultyForAdmission,
}: SchoolsGridProps) {
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [modalFaculty, setModalFaculty] = React.useState<FacultyData | null>(null);
  const [expandedProgramIndex, setExpandedProgramIndex] = React.useState<number | null>(null);

  const t = translations[currentLocale].schools;
  const facultiesData = React.useMemo(() => getLocalizedFaculties(currentLocale), [currentLocale]);

  // Lock body scroll and add Escape key listener when modal is open
  React.useEffect(() => {
    if (modalFaculty) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalFaculty(null);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [modalFaculty]);

  const filteredFaculties =
    activeTab === "all"
      ? facultiesData
      : facultiesData.filter((f) => f.category === activeTab);

  const tabs = [
    { id: "all", label: t.tabs.all },
    { id: "medicine", label: t.tabs.medicine },
    { id: "engineering", label: t.tabs.engineering },
    { id: "economy", label: t.tabs.economy },
    { id: "education", label: t.tabs.education },
    { id: "philology", label: t.tabs.philology },
  ];

  const handleApplyToFaculty = (facultyName: string) => {
    if (onSelectFacultyForAdmission) {
      onSelectFacultyForAdmission(facultyName);
    } else {
      const el = document.getElementById("admission");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="schools"
      aria-label="Fakultetlar va Ta'lim Yo'nalishlari"
      className="py-16 sm:py-24 bg-[#F4F7FC] relative"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0096DB] mb-3">
            <span className="w-6 h-px bg-[#0096DB]" />
            <span>{t.badge}</span>
            <span className="w-6 h-px bg-[#0096DB]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172D50] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
            {t.description}
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#172D50] text-white shadow-sm"
                    : "bg-white text-[#334155] hover:text-[#172D50] border border-slate-200 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFaculties.map((faculty, idx) => (
              <motion.div
                key={`${faculty.id}-${currentLocale}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#0096DB]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image Banner */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#172D50]">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172D50]/90 via-[#172D50]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white bg-[#172D50] px-3 py-1 rounded-md border border-white/10 tracking-wide uppercase">
                      {faculty.badge}
                    </span>
                    <span className="text-xs font-semibold text-white bg-slate-900 px-2.5 py-1 rounded-md border border-white/10">
                      {faculty.count}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-200" />
                      <span>{faculty.duration}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Globe2 className="h-3.5 w-3.5 text-[#0096DB]" />
                      <span>{faculty.languages.join(", ")}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#172D50] group-hover:text-[#0096DB] transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] line-clamp-2 leading-relaxed">
                      {faculty.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {faculty.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#0096DB] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Popular programs pill chips */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t.mainProgramsLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {faculty.popularPrograms.slice(0, 3).map((prog) => (
                          <span
                            key={prog}
                            className="text-[11px] font-semibold text-[#334155] bg-[#F4F7FC] border border-slate-200/60 px-2.5 py-1 rounded-lg"
                          >
                            {prog}
                          </span>
                        ))}
                        {faculty.allPrograms.length > 3 && (
                          <button
                            type="button"
                            onClick={() => {
                              setModalFaculty(faculty);
                              setExpandedProgramIndex(null);
                            }}
                            className="text-[11px] font-bold text-[#0096DB] hover:text-[#007BB3] hover:underline px-1 py-1 cursor-pointer"
                          >
                            +{faculty.allPrograms.length - 3} {t.morePrograms}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Button
                      onClick={() => handleApplyToFaculty(faculty.name)}
                      variant="action"
                      size="sm"
                      className="flex-1 font-bold shadow-xs hover:shadow-sm"
                    >
                      <span>{t.applyButton}</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setModalFaculty(faculty);
                        setExpandedProgramIndex(null);
                      }}
                      variant="secondary"
                      size="sm"
                      className="font-semibold text-xs border-slate-200"
                    >
                      <span>{t.detailsButton}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Programs Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#172D50] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0096DB]">
              <span className="w-4 h-px bg-[#0096DB]" />
              <span>{t.bannerBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t.bannerTitle}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {t.bannerDescription}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+998557024040"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0096DB] hover:bg-[#007BB3] text-white font-bold text-sm transition-colors shadow-md"
            >
              <span>+998 (55) 702-40-40</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Program Details Modal */}
      <AnimatePresence>
        {modalFaculty && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="schools-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalFaculty(null)}
              className="fixed inset-0 bg-slate-950/75"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-[#F4F7FC]">
                <div className="flex items-center gap-3">
                  <Badge variant={modalFaculty.badgeVariant}>
                    {modalFaculty.badge}
                  </Badge>
                  <h3 id="schools-modal-title" className="text-xl font-bold text-[#172D50]">
                    {modalFaculty.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalFaculty(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label={t.modalClose}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.modalAbout}
                  </h4>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {modalFaculty.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F4F7FC] border border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">{t.durationLabel}</span>
                    <span className="font-bold text-[#172D50] text-sm mt-0.5 block">{modalFaculty.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">{t.languagesLabel}</span>
                    <span className="font-bold text-[#172D50] text-sm mt-0.5 block">{modalFaculty.languages.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {t.modalAllPrograms} ({modalFaculty.allPrograms.length})
                  </h4>
                  <ul className="space-y-2">
                    {modalFaculty.allPrograms.map((prog, index) => {
                      const isExpanded = expandedProgramIndex === index;
                      return (
                        <li
                          key={index}
                          className="rounded-xl bg-[#F4F7FC] border border-slate-200/80 overflow-hidden transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedProgramIndex(isExpanded ? null : index)}
                            className="w-full p-3 flex items-center justify-between text-left text-xs font-semibold text-[#172D50] hover:bg-white transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#0096DB] shrink-0" />
                              <span>{prog.name}</span>
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] text-slate-500 font-normal">
                                {prog.duration}
                              </span>
                              <ChevronDown
                                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                                  isExpanded ? "rotate-180 text-[#0096DB]" : ""
                                }`}
                              />
                            </div>
                          </button>

                          {isExpanded && prog.description && (
                            <div className="px-3 pb-3 pt-1 text-xs text-[#334155] bg-white border-t border-slate-200/80 leading-relaxed">
                              {prog.description}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3 bg-[#F4F7FC]">
                <Button
                  onClick={() => setModalFaculty(null)}
                  variant="secondary"
                  size="default"
                >
                  {t.modalClose}
                </Button>
                <Button
                  onClick={() => {
                    const name = modalFaculty.name;
                    setModalFaculty(null);
                    handleApplyToFaculty(name);
                  }}
                  variant="action"
                  size="default"
                  className="font-bold"
                >
                  <span>{t.modalApply}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
