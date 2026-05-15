// ===== MULTI-LANGUAGE TRANSLATION SYSTEM =====
// Languages: DE (German), FR (French), EN (English), RU (Russian), UA (Ukrainian)

const TRANSLATIONS = {
  // ===== NAVIGATION =====
  nav_home: {
    de: 'Startseite', fr: 'Accueil', en: 'Home', ru: 'Главная', ua: 'Головна'
  },
  nav_legal: {
    de: 'Rechtsberatung', fr: 'Services juridiques', en: 'Legal Services', ru: 'Юридические услуги', ua: 'Юридичні послуги'
  },
  nav_accounting: {
    de: 'Buchhaltung', fr: 'Comptabilité', en: 'Accounting', ru: 'Бухгалтерия', ua: 'Бухгалтерія'
  },
  nav_tax: {
    de: 'Steuerfragen', fr: 'Questions fiscales', en: 'Tax Advisory', ru: 'Налоговые вопросы', ua: 'Податкові питання'
  },
  nav_about: {
    de: 'Über uns', fr: 'À propos', en: 'About Us', ru: 'О компании', ua: 'Про компанію'
  },
  nav_contacts: {
    de: 'Kontakt', fr: 'Contact', en: 'Contact', ru: 'Контакты', ua: 'Контакти'
  },
  nav_blog: {
    de: 'Blog', fr: 'Blog', en: 'Blog', ru: 'Блог', ua: 'Блог'
  },
  nav_cta: {
    de: 'Anfrage', fr: 'Demande', en: 'Request', ru: 'Заявка', ua: 'Заявка'
  },

  // ===== HERO (HOME) =====
  hero_title: {
    de: 'Rechts- und Buchhaltungs&shy;dienste in der Schweiz',
    fr: 'Services juridiques et comptables en Suisse',
    en: 'Legal & Accounting Services in Switzerland',
    ru: 'Юридические и бухгалтерские услуги в Швейцарии',
    ua: 'Юридичні та бухгалтерські послуги у Швейцарії'
  },
  hero_text: {
    de: 'Wir begleiten Ihr Unternehmen und unterstützen Sie bei der Firmengründung, Buchhaltung, Steuerplanung und Unternehmensführung. Auf dem Markt seit Anfang 2010.',
    en: 'We support your business with company formation, accounting, tax planning and corporate governance. On the market since early 2010.',
    ru: 'Мы сопровождаем ваш бизнес и помогаем в вопросах регистрации компании, бухгалтерии, налогового планирования и корпоративного управления. На рынке с начала 2010 года.',
    ua: 'Ми супроводжуємо ваш бізнес і допомагаємо з реєстрацією компанії, бухгалтерією, податковим плануванням та корпоративним управлінням. На ринку з початку 2010 року.'
  },
  hero_cta: {
    de: 'Beratung anfordern', fr: 'Demander un conseil', en: 'Get Consultation', ru: 'Получить консультацию', ua: 'Отримати консультацію'
  },

  // ===== STATS =====
  stat_since: {
    de: 'Auf dem Markt seit Anfang 2010',
    en: 'On the market since early 2010',
    ru: 'На рынке с начала 2010 года',
    ua: 'На ринку з початку 2010 року'
  },

  // ===== SERVICES SECTION =====
  services_label: {
    de: 'Unsere Dienstleistungen', fr: 'Nos services', en: 'Our Services', ru: 'Наши услуги', ua: 'Наші послуги'
  },
  services_title: {
    de: 'Umfassende Lösungen für Ihr Unternehmen',
    fr: 'Solutions complètes pour votre entreprise',
    en: 'Comprehensive Solutions for Your Business',
    ru: 'Комплексные решения для вашего бизнеса',
    ua: 'Комплексні рішення для вашого бізнесу'
  },
  services_subtitle: {
    de: 'Professionelle Beratung und Unterstützung auf höchstem Schweizer Niveau',
    fr: 'Conseil et soutien professionnels au plus haut niveau suisse',
    en: 'Professional consulting and support at the highest Swiss standards',
    ru: 'Профессиональный консалтинг и поддержка на высшем швейцарском уровне',
    ua: 'Професійний консалтинг та підтримка на найвищому швейцарському рівні'
  },
  // Legal card
  card_legal_title: {
    de: 'Rechtsberatung', fr: 'Services juridiques', en: 'Legal Services', ru: 'Юридические услуги', ua: 'Юридичні послуги'
  },
  card_legal_1: {
    de: 'Firmengründung', fr: 'Création de société', en: 'Company Registration', ru: 'Регистрация компании', ua: 'Реєстрація компанії'
  },
  card_legal_2: {
    de: 'Strukturänderungen', fr: 'Restructurations', en: 'Business Restructuring', ru: 'Изменение в структуре бизнеса', ua: 'Зміна структури бізнесу'
  },
  card_legal_3: {
    de: 'Juristischer Sitz', fr: 'Siège juridique', en: 'Registered Office', ru: 'Юридический адрес', ua: 'Юридична адреса'
  },
  card_legal_4: {
    de: 'Direktor-Mandate', fr: 'Mandats de directeur', en: 'Director Mandates', ru: 'Мандаты директора', ua: 'Мандати директора'
  },
  card_legal_5: {
    de: 'Transaktionsbegleitung', fr: 'Accompagnement de transactions', en: 'Transaction Support', ru: 'Сопровождение сделок', ua: 'Супровід угод'
  },
  // Accounting card
  card_acc_title: {
    de: 'Buchhaltung', fr: 'Comptabilité', en: 'Accounting Services', ru: 'Бухгалтерские услуги', ua: 'Бухгалтерські послуги'
  },
  card_acc_1: {
    de: 'Laufende Buchführung', fr: 'Tenue de comptabilité', en: 'Bookkeeping', ru: 'Ведение бухгалтерского учёта', ua: 'Ведення бухгалтерського обліку'
  },
  card_acc_2: {
    de: 'Jahresabschluss', fr: 'Rapport annuel', en: 'Annual Reporting', ru: 'Годовая отчётность', ua: 'Річна звітність'
  },
  card_acc_3: {
    de: 'Lohnbuchhaltung', fr: 'Gestion des salaires', en: 'Payroll Services', ru: 'Payroll / Расчёт заработной платы', ua: 'Payroll / Розрахунок заробітної плати'
  },
  card_acc_4: {
    de: 'Debitoren- / Kreditoren', fr: 'Débiteurs / Créanciers', en: 'Accounts Receivable / Payable', ru: 'Учёт дебиторов и кредиторов', ua: 'Облік дебіторів та кредиторів'
  },
  card_acc_5: {
    de: 'Konsolidierung', fr: 'Consolidation', en: 'Consolidation', ru: 'Консолидация', ua: 'Консолідація'
  },
  // Tax card
  card_tax_title: {
    de: 'Steuerfragen', fr: 'Questions fiscales', en: 'Tax Advisory', ru: 'Налоговые вопросы', ua: 'Податкові питання'
  },
  card_tax_1: {
    de: 'Steuererklärungen', fr: 'Déclarations fiscales', en: 'Tax Returns', ru: 'Налоговые декларации', ua: 'Податкові декларації'
  },
  card_tax_2: {
    de: 'Steuerplanung', fr: 'Planification fiscale', en: 'Tax Planning', ru: 'Налоговое планирование', ua: 'Податкове планування'
  },
  card_tax_3: {
    de: 'Beratung für Ansässige und Nichtansässige', fr: 'Conseil résidents / non-résidents', en: 'Resident & Non-Resident Advisory', ru: 'Консультации для резидентов и нерезидентов', ua: 'Консультації для резидентів та нерезидентів'
  },
  card_tax_4: {
    de: 'MWST-Beratung', fr: 'Aide TVA', en: 'VAT Assistance', ru: 'Помощь с VAT / НДС', ua: 'Допомога з VAT / ПДВ'
  },
  btn_more: {
    de: 'Mehr erfahren', fr: 'En savoir plus', en: 'Learn More', ru: 'Подробнее', ua: 'Детальніше'
  },

  // ===== WHY US =====
  why_label: {
    de: 'Warum wir', fr: 'Pourquoi nous', en: 'Why Choose Us', ru: 'Почему мы', ua: 'Чому ми'
  },
  why_title: {
    de: 'Ihr verlässlicher Partner in der Schweiz',
    fr: 'Votre partenaire fiable en Suisse',
    en: 'Your Reliable Partner in Switzerland',
    ru: 'Ваш надёжный партнёр в Швейцарии',
    ua: 'Ваш надійний партнер у Швейцарії'
  },
  why_1_title: {
    de: 'Schweizer Qualität', fr: 'Qualité suisse', en: 'Swiss Quality', ru: 'Швейцарское качество', ua: 'Швейцарська якість'
  },
  why_1_text: {
    de: 'Höchste Standards der Geschäftsabwicklung, die der Schweizer Tradition und den regulatorischen Anforderungen entsprechen.',
    fr: 'Les plus hauts standards de pratique commerciale, conformes à la tradition et aux exigences réglementaires suisses.',
    en: 'Highest standards of business practice matching Swiss tradition and regulatory requirements.',
    ru: 'Высочайшие стандарты ведения дел, соответствующие швейцарской традиции и регуляторным требованиям.',
    ua: 'Найвищі стандарти ведення справ, що відповідають швейцарській традиції та регуляторним вимогам.'
  },
  why_2_title: {
    de: 'Individueller Ansatz', fr: 'Approche individuelle', en: 'Individual Approach', ru: 'Индивидуальный подход', ua: 'Індивідуальний підхід'
  },
  why_2_text: {
    de: 'Jeder Kunde erhält einen persönlichen Berater und eine massgeschneiderte Strategie, die auf seine Geschäftsziele zugeschnitten ist.',
    fr: 'Chaque client bénéficie d\'un conseiller personnel et d\'une stratégie sur mesure adaptée à ses objectifs.',
    en: 'Each client gets a personal advisor and a tailored strategy aligned with their business goals.',
    ru: 'Каждый клиент получает персонального консультанта и индивидуальную стратегию, адаптированную под его бизнес-цели.',
    ua: 'Кожен клієнт отримує персонального консультанта та індивідуальну стратегію, адаптовану під його бізнес-цілі.'
  },
  why_3_title: {
    de: 'Vertraulichkeit', fr: 'Confidentialité', en: 'Confidentiality', ru: 'Конфиденциальность', ua: 'Конфіденційність'
  },
  why_3_text: {
    de: 'Vollständiger Schutz Ihrer Daten gemäss Schweizer Datenschutzgesetz und internationalen Standards.',
    fr: 'Protection complète de vos données selon la loi suisse sur la protection des données et les normes internationales.',
    en: 'Full data protection in compliance with Swiss data privacy law and international standards.',
    ru: 'Полная защита ваших данных в соответствии со швейцарским законом о защите данных и международными стандартами.',
    ua: 'Повний захист ваших даних відповідно до швейцарського закону про захист даних та міжнародних стандартів.'
  },
  why_4_title: {
    de: 'Auf dem Markt seit 2010', en: 'On the market since 2010', ru: 'На рынке с 2010 года', ua: 'На ринку з 2010 року'
  },
  why_4_text: {
    de: 'Seit Anfang 2010 erfolgreiche Begleitung von Unternehmen jeder Grösse — von Startups bis zu internationalen Konzernen.',
    en: 'Since early 2010, successfully supporting businesses of all sizes — from startups to international corporations.',
    ru: 'С начала 2010 года успешное сопровождение бизнеса любого масштаба — от стартапов до международных корпораций.',
    ua: 'З початку 2010 року успішний супровід бізнесу будь-якого масштабу — від стартапів до міжнародних корпорацій.'
  },
  why_5_title: {
    de: 'Mehrsprachigkeit', en: 'Multilingual', ru: 'Мультиязычность', ua: 'Багатомовність'
  },
  why_5_text: {
    de: 'Wir kommunizieren in Deutsch, Englisch, Russisch und Ukrainisch — Sie werden immer verstanden.',
    en: 'We communicate in German, English, Russian and Ukrainian — you will always be understood.',
    ru: 'Мы общаемся на немецком, английском и русском — вас всегда поймут.',
    ua: 'Ми спілкуємося німецькою, англійською, російською та українською — вас завжди зрозуміють.'
  },
  why_6_title: {
    de: 'Schlüsselfertige Lösung', fr: 'Solution clé en main', en: 'Turnkey Solution', ru: 'Решение «под ключ»', ua: 'Рішення «під ключ»'
  },
  why_6_text: {
    de: 'Von der Firmengründung bis zur täglichen Verwaltung — wir übernehmen alle Aufgaben, damit Sie sich auf Ihr Geschäft konzentrieren können.',
    fr: 'De la création à la gestion quotidienne — nous prenons en charge toutes les tâches pour que vous vous concentriez sur votre activité.',
    en: 'From company formation to daily management — we handle all tasks so you can focus on growing your business.',
    ru: 'От регистрации до ежедневного управления — мы берём на себя все задачи, чтобы вы сосредоточились на развитии бизнеса.',
    ua: 'Від реєстрації до щоденного управління — ми беремо на себе всі завдання, щоб ви зосередились на розвитку бізнесу.'
  },

  // ===== ABOUT SECTION (HOME) =====
  about_label: {
    de: 'Über uns', fr: 'À propos', en: 'About Us', ru: 'О компании', ua: 'Про компанію'
  },
  about_title: {
    de: 'Swiss Center Services AG',
    fr: 'Swiss Center Services AG',
    en: 'Swiss Center Services AG',
    ru: 'Swiss Center Services AG',
    ua: 'Swiss Center Services AG'
  },
  about_p1: {
    de: 'Swiss Center Services AG ist ein privates Beratungsunternehmen mit Sitz in Cham/Zug — dem wirtschaftlichen Herzen der Schweiz.',
    en: 'Swiss Center Services AG is a private consulting firm based in Cham/Zug — the economic heart of Switzerland.',
    ru: 'Swiss Center Services AG — частная консалтинговая компания с офисом в Хам/Цуг — экономическом сердце Швейцарии и налоговом парадизе.',
    ua: 'Swiss Center Services AG — приватна консалтингова компанія з офісом у Хам/Цуг — економічному серці Швейцарії.'
  },
  about_p2: {
    de: 'Seit Anfang 2010 begleiten wir Unternehmer und Privatpersonen bei allen Fragen der Buchhaltung, des Steuerrechts und der Unternehmensführung. Unsere Kunden schätzen Zuverlässigkeit, Diskretion und persönliche Betreuung.',
    en: 'Since early 2010, we have been supporting entrepreneurs and individuals in all matters of accounting, tax law and corporate governance. Our clients value reliability, discretion and personal service.',
    ru: 'С начала 2010 года мы сопровождаем предпринимателей и частных лиц по всем вопросам бухгалтерии, налогового права и корпоративного управления. Наши клиенты ценят надёжность, конфиденциальность и персональное обслуживание.',
    ua: 'З початку 2010 року ми супроводжуємо підприємців та приватних осіб з усіх питань бухгалтерії, податкового права та корпоративного управління. Наші клієнти цінують надійність, конфіденційність та персональне обслуговування.'
  },
  about_btn: {
    de: 'Mehr über uns', fr: 'En savoir plus', en: 'Learn More', ru: 'Узнать больше', ua: 'Дізнатися більше'
  },

  // ===== CTA SECTION =====
  cta_title: {
    de: 'Bereit, Ihr Unternehmen in der Schweiz zu gründen?',
    fr: 'Prêt à créer votre entreprise en Suisse ?',
    en: 'Ready to establish your business in Switzerland?',
    ru: 'Готовы создать бизнес в Швейцарии?',
    ua: 'Готові створити бізнес у Швейцарії?'
  },
  cta_text: {
    de: 'Kontaktieren Sie uns für ein unverbindliches Erstgespräch. Wir analysieren Ihre Situation und schlagen die beste Lösung vor.',
    fr: 'Contactez-nous pour un premier entretien sans engagement. Nous analyserons votre situation et proposerons la meilleure solution.',
    en: 'Contact us for a free initial consultation. We will analyze your situation and propose the best solution.',
    ru: 'Свяжитесь с нами для бесплатной первой консультации. Мы проанализируем вашу ситуацию и предложим оптимальное решение.',
    ua: 'Зв\'яжіться з нами для безкоштовної першої консультації. Ми проаналізуємо вашу ситуацію та запропонуємо оптимальне рішення.'
  },
  form_title: {
    de: 'Anfrage senden', fr: 'Envoyer une demande', en: 'Send Request', ru: 'Отправить заявку', ua: 'Надіслати заявку'
  },
  form_name: {
    de: 'Ihr Name', fr: 'Votre nom', en: 'Your Name', ru: 'Ваше имя', ua: 'Ваше ім\'я'
  },
  form_email: {
    de: 'E-Mail', fr: 'E-mail', en: 'E-mail', ru: 'E-mail', ua: 'E-mail'
  },
  form_phone: {
    de: 'Telefon', fr: 'Téléphone', en: 'Phone', ru: 'Телефон', ua: 'Телефон'
  },
  form_service: {
    de: 'Gewünschte Dienstleistung', fr: 'Service souhaité', en: 'Desired Service', ru: 'Интересующая услуга', ua: 'Послуга, що цікавить'
  },
  form_service_opt1: {
    de: 'Bitte wählen...', fr: 'Veuillez choisir...', en: 'Please select...', ru: 'Выберите услугу...', ua: 'Оберіть послугу...'
  },
  form_message: {
    de: 'Ihre Nachricht', fr: 'Votre message', en: 'Your Message', ru: 'Ваше сообщение', ua: 'Ваше повідомлення'
  },
  form_submit: {
    de: 'Absenden', fr: 'Envoyer', en: 'Submit', ru: 'Отправить', ua: 'Надіслати'
  },
  form_success_title: {
    de: 'Vielen Dank!', fr: 'Merci !', en: 'Thank You!', ru: 'Спасибо!', ua: 'Дякуємо!'
  },
  form_success_text: {
    de: 'Ihre Anfrage wurde gesendet. Wir melden uns innerhalb von 24 Stunden.',
    fr: 'Votre demande a été envoyée. Nous vous contacterons dans les 24 heures.',
    en: 'Your request has been sent. We will contact you within 24 hours.',
    ru: 'Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.',
    ua: 'Вашу заявку надіслано. Ми зв\'яжемося з вами протягом 24 годин.'
  },

  // ===== FOOTER =====
  footer_desc: {
    de: 'Rechts- und Buchhaltungsdienste in der Schweiz. Ihr zuverlässiger Partner seit 2010.',
    en: 'Legal and accounting services in Switzerland. Your reliable partner since 2010.',
    ru: 'Юридические и бухгалтерские услуги в Швейцарии. Надёжный партнёр с 2010 года.',
    ua: 'Юридичні та бухгалтерські послуги у Швейцарії. Надійний партнер з 2010 року.'
  },
  footer_services: {
    de: 'Dienstleistungen', fr: 'Services', en: 'Services', ru: 'Услуги', ua: 'Послуги'
  },
  footer_company: {
    de: 'Unternehmen', fr: 'Entreprise', en: 'Company', ru: 'Компания', ua: 'Компанія'
  },
  footer_contact_title: {
    de: 'Kontakt', fr: 'Contact', en: 'Contact', ru: 'Контакты', ua: 'Контакти'
  },
  footer_rights: {
    de: '© 2026 Swiss Center Services AG. Alle Rechte vorbehalten.',
    fr: '© 2026 Swiss Center Services AG. Tous droits réservés.',
    en: '© 2026 Swiss Center Services AG. All rights reserved.',
    ru: '© 2026 Swiss Center Services AG. Все права защищены.',
    ua: '© 2026 Swiss Center Services AG. Усі права захищені.'
  },
  footer_privacy: {
    de: 'Datenschutz', fr: 'Confidentialité', en: 'Privacy Policy', ru: 'Конфиденциальность', ua: 'Конфіденційність'
  },
  footer_imprint: {
    de: 'Impressum', fr: 'Mentions légales', en: 'Imprint', ru: 'Импрессум', ua: 'Імпресум'
  },

  // ===== BREADCRUMBS =====
  bread_home: {
    de: 'Startseite', fr: 'Accueil', en: 'Home', ru: 'Главная', ua: 'Головна'
  },

  // ===== LEGAL PAGE =====
  legal_hero_title: {
    de: 'Rechtsberatung', fr: 'Services juridiques', en: 'Legal Services', ru: 'Юридические услуги', ua: 'Юридичні послуги'
  },
  legal_hero_text: {
    de: 'Umfassende juristische Unterstützung für Ihr Unternehmen in der Schweiz — von der Gründung bis zum internationalen Geschäft.',
    fr: 'Un soutien juridique complet pour votre entreprise en Suisse — de la création aux affaires internationales.',
    en: 'Comprehensive legal support for your business in Switzerland — from formation to international operations.',
    ru: 'Полное юридическое сопровождение вашего бизнеса в Швейцарии — от регистрации до международных операций.',
    ua: 'Повне юридичне супроводження вашого бізнесу у Швейцарії — від реєстрації до міжнародних операцій.'
  },
  legal_section1_title: {
    de: 'Firmengründung in der Schweiz', fr: 'Création de société en Suisse', en: 'Company Registration in Switzerland', ru: 'Регистрация компании в Швейцарии', ua: 'Реєстрація компанії у Швейцарії'
  },
  legal_section1_text: {
    de: 'Die Schweiz bietet eines der günstigsten Geschäftsumfelder in Europa. Wir begleiten Sie durch den gesamten Gründungsprozess — Auswahl der Rechtsform (AG, GmbH, Einzelunternehmen), Erstellung der Statuten, Eintragung ins Handelsregister und Eröffnung von Bankkonten.',
    fr: 'La Suisse offre l\'un des environnements commerciaux les plus favorables d\'Europe. Nous vous accompagnons tout au long du processus de création — choix de la forme juridique (SA, Sàrl), rédaction des statuts, inscription au registre du commerce et ouverture de comptes bancaires.',
    en: 'Switzerland offers one of the most favorable business environments in Europe. We guide you through the entire formation process — choosing the legal form (AG, GmbH), drafting articles of association, commercial registry and bank account opening.',
    ru: 'Швейцария предлагает одну из наиболее благоприятных бизнес-сред в Европе. Мы проведём вас через весь процесс регистрации — выбор правовой формы (AG, GmbH, Einzelfirma), подготовка устава, регистрация в торговом реестре и открытие банковских счетов.',
    ua: 'Швейцарія пропонує одне з найсприятливіших бізнес-середовищ в Європі. Ми проведемо вас через весь процес реєстрації — вибір правової форми (AG, GmbH), підготовка статуту, реєстрація в торговому реєстрі та відкриття банківських рахунків.'
  },
  legal_section2_title: {
    de: 'Umstrukturierung und Veränderungen', fr: 'Restructuration et changements', en: 'Restructuring & Changes', ru: 'Реструктуризация и изменения', ua: 'Реструктуризація та зміни'
  },
  legal_section2_text: {
    de: 'Fusionen, Übernahmen, Kapitalerhöhungen, Änderungen in der Geschäftsleitung — wir übernehmen die komplette Dokumentation und Beratung bei allen Unternehmensumstrukturierungen.',
    fr: 'Fusions, acquisitions, augmentations de capital, changements de direction — nous prenons en charge toute la documentation et le conseil lors de toute restructuration d\'entreprise.',
    en: 'Mergers, acquisitions, capital increases, management changes — we handle all documentation and advisory for any corporate restructuring.',
    ru: 'Слияния, поглощения, увеличение капитала, смена руководства — мы берём на себя полное документальное сопровождение и консультирование при любых корпоративных реструктуризациях.',
    ua: 'Злиття, поглинання, збільшення капіталу, зміна керівництва — ми беремо на себе повне документальне супроводження та консультування при будь-яких корпоративних реструктуризаціях.'
  },
  legal_features_title: {
    de: 'Was umfasst unser Service', fr: 'Nos services incluent', en: 'Our Services Include', ru: 'Что включает наш сервис', ua: 'Що включає наш сервіс'
  },
  legal_f1: {
    de: 'Wahl der optimalen Rechtsform für Ihr Unternehmen', fr: 'Choix de la forme juridique optimale', en: 'Choosing the optimal legal form', ru: 'Выбор оптимальной правовой формы для вашего бизнеса', ua: 'Вибір оптимальної правової форми для вашого бізнесу'
  },
  legal_f2: {
    de: 'Erstellung aller Gründungsdokumente', fr: 'Préparation de tous les documents de création', en: 'Preparation of all founding documents', ru: 'Подготовка всех учредительных документов', ua: 'Підготовка всіх установчих документів'
  },
  legal_f3: {
    de: 'Eintragung in das Schweizer Handelsregister', fr: 'Inscription au registre du commerce suisse', en: 'Registration with the Swiss Commercial Registry', ru: 'Регистрация в швейцарском торговом реестре', ua: 'Реєстрація у швейцарському торговому реєстрі'
  },
  legal_f4: {
    de: 'Bereitstellung eines juristischen Sitzes', fr: 'Mise à disposition d\'un siège juridique', en: 'Provision of registered office', ru: 'Предоставление юридического адреса', ua: 'Надання юридичної адреси'
  },
  legal_f5: {
    de: 'Begleitung bei der Kontoeröffnung', fr: 'Accompagnement pour l\'ouverture de compte', en: 'Bank account opening assistance', ru: 'Помощь в открытии банковского счёта', ua: 'Допомога у відкритті банківського рахунку'
  },
  legal_f6: {
    de: 'Übernahme von Direktorenmandaten', fr: 'Prise en charge de mandats de directeur', en: 'Director mandate services', ru: 'Предоставление мандатов директора', ua: 'Надання мандатів директора'
  },
  legal_f7: {
    de: 'Vertragsrecht und Due Diligence', fr: 'Droit des contrats et diligence raisonnable', en: 'Contract law and due diligence', ru: 'Договорное право и due diligence', ua: 'Договірне право та due diligence'
  },

  // ===== ACCOUNTING PAGE =====
  acc_hero_title: {
    de: 'Buchhaltung', fr: 'Comptabilité', en: 'Accounting Services', ru: 'Бухгалтерские услуги', ua: 'Бухгалтерські послуги'
  },
  acc_hero_text: {
    de: 'Professionelle Buchführung nach Schweizer Standards — damit Sie sich auf Ihr Kerngeschäft konzentrieren können.',
    fr: 'Comptabilité professionnelle aux normes suisses — pour que vous puissiez vous concentrer sur votre cœur de métier.',
    en: 'Professional bookkeeping to Swiss standards — so you can focus on your core business.',
    ru: 'Профессиональное ведение бухгалтерии по швейцарским стандартам — чтобы вы могли сосредоточиться на развитии бизнеса.',
    ua: 'Професійне ведення бухгалтерії за швейцарськими стандартами — щоб ви могли зосередитися на розвитку бізнесу.'
  },
  acc_section1_title: {
    de: 'Laufende Buchführung', fr: 'Tenue de comptabilité', en: 'Ongoing Bookkeeping', ru: 'Ведение бухгалтерского учёта', ua: 'Ведення бухгалтерського обліку'
  },
  acc_section1_text: {
    de: 'Wir übernehmen die gesamte laufende Buchführung Ihres Unternehmens — von der Verarbeitung von Belegen über Bankabstimmungen bis hin zu Monatsabschlüssen. Alles in Übereinstimmung mit Swiss GAAP FER und IFRS.',
    fr: 'Nous prenons en charge l\'intégralité de votre comptabilité courante — du traitement des justificatifs aux rapprochements bancaires et clôtures mensuelles. Le tout conforme aux Swiss GAAP RPC et IFRS.',
    en: 'We handle your entire ongoing bookkeeping — from document processing and bank reconciliations to monthly closings. Everything in compliance with Swiss GAAP FER and IFRS.',
    ru: 'Мы берём на себя полное текущее ведение бухгалтерии вашей компании — от обработки документов и банковских сверок до ежемесячных закрытий. Всё в соответствии с Swiss GAAP FER и IFRS.',
    ua: 'Ми беремо на себе повне поточне ведення бухгалтерії вашої компанії — від обробки документів та банківських звірок до щомісячних закриттів. Все відповідно до Swiss GAAP FER та IFRS.'
  },
  acc_section2_title: {
    de: 'Jahresabschluss und Berichterstattung', fr: 'Clôture annuelle et rapports', en: 'Annual Closing & Reporting', ru: 'Годовая отчётность', ua: 'Річна звітність'
  },
  acc_section2_text: {
    de: 'Erstellung des Jahresabschlusses, Gewinn- und Verlustrechnung, Bilanz — alles termingerecht und in perfekter Qualität für Ihre Generalversammlung und die Behörden.',
    fr: 'Établissement des comptes annuels, compte de résultat, bilan — tout dans les délais et en qualité parfaite pour votre assemblée générale et les autorités.',
    en: 'Preparation of annual accounts, profit & loss statements, balance sheets — everything on time and in perfect quality for your general assembly and authorities.',
    ru: 'Сдаём в срок и надлежащего качества для акционерного собрания и контролирующих органов. Обработка всех бухгалтерских и юридических документов.',
    ua: 'Підготовка річної звітності, звіт про прибутки та збитки, баланс — все вчасно та бездоганної якості для вашого загального зібрання та контролюючих органів.'
  },
  acc_f1: {
    de: 'Verarbeitung aller Geschäftsbelege', fr: 'Traitement de tous les justificatifs', en: 'Processing all business documents', ru: 'Обработка всех бухгалтерских и юридических документов', ua: 'Обробка всіх господарських документів'
  },
  acc_f2: {
    de: 'Bankabstimmungen und Kassenführung', fr: 'Rapprochements bancaires et gestion de caisse', en: 'Bank reconciliations and cash management', ru: 'Банковские сверки и кассовое обслуживание', ua: 'Банківські звірки та касове обслуговування'
  },
  acc_f3: {
    de: 'Lohnbuchhaltung und Sozialversicherungen', fr: 'Comptabilité salariale et assurances sociales', en: 'Payroll and social insurance', ru: 'Расчёт заработной платы и социальное страхование', ua: 'Розрахунок заробітної плати та соціальне страхування'
  },
  acc_f4: {
    de: 'MWST-Abrechnung', fr: 'Décompte TVA', en: 'VAT settlements', ru: 'Расчёт НДС', ua: 'Розрахунок ПДВ'
  },
  acc_f5: {
    de: 'Monats- und Quartalsberichte', fr: 'Rapports mensuels et trimestriels', en: 'Monthly and quarterly reports', ru: 'Ежемесячные и квартальные отчёты', ua: 'Щомісячні та квартальні звіти'
  },
  acc_f6: {
    de: 'Konsolidierung von Tochtergesellschaften', fr: 'Consolidation de filiales', en: 'Subsidiary consolidation', ru: 'Консолидация дочерних компаний', ua: 'Консолідація дочірніх компаній'
  },

  // ===== TAX PAGE =====
  tax_hero_title: {
    de: 'Steuerfragen', fr: 'Questions fiscales', en: 'Tax Advisory', ru: 'Налоговые вопросы', ua: 'Податкові питання'
  },
  tax_hero_text: {
    de: 'Steuerberatung und -optimierung für Unternehmen und Privatpersonen in der Schweiz und international.',
    fr: 'Conseil et optimisation fiscale pour entreprises et particuliers en Suisse et à l\'international.',
    en: 'Tax advisory and optimization for companies and individuals in Switzerland and internationally.',
    ru: 'Налоговое консультирование и оптимизация для компаний и частных лиц в Швейцарии и за рубежом.',
    ua: 'Податкове консультування та оптимізація для компаній та приватних осіб у Швейцарії та за кордоном.'
  },
  tax_section1_title: {
    de: 'Steuererklärungen', fr: 'Déclarations fiscales', en: 'Tax Returns', ru: 'Налоговые декларации', ua: 'Податкові декларації'
  },
  tax_section1_text: {
    de: 'Wir bereiten Steuererklärungen für Unternehmen und Privatpersonen vor, optimieren die Steuerlast und sorgen für termingerechte Einreichung bei allen zuständigen Behörden.',
    fr: 'Nous préparons les déclarations fiscales pour entreprises et particuliers, optimisons la charge fiscale et assurons le dépôt en temps voulu auprès de toutes les autorités compétentes.',
    en: 'We prepare tax returns for companies and individuals, optimize the tax burden and ensure timely filing with all relevant authorities.',
    ru: 'Мы готовим налоговые декларации для компаний и физических лиц, оптимизируем налоговую нагрузку и обеспечиваем своевременную подачу во все уполномоченные органы.',
    ua: 'Ми готуємо податкові декларації для компаній та фізичних осіб, оптимізуємо податкове навантаження та забезпечуємо своєчасну подачу до всіх уповноважених органів.'
  },
  tax_section2_title: {
    de: 'Steuerplanung und -optimierung', fr: 'Planification et optimisation fiscale', en: 'Tax Planning & Optimization', ru: 'Налоговое планирование и оптимизация', ua: 'Податкове планування та оптимізація'
  },
  tax_section2_text: {
    de: 'Die Schweiz bietet ein attraktives Steuersystem mit kantonalen Unterschieden. Wir helfen Ihnen, den besten Standort und die optimale Struktur für Ihr Geschäft zu finden, um Steuern legal zu minimieren.',
    fr: 'La Suisse dispose d\'un système fiscal attractif avec des différences cantonales. Nous vous aidons à trouver le meilleur emplacement et la structure optimale pour minimiser légalement vos impôts.',
    en: 'Switzerland offers an attractive tax system with cantonal differences. We help you find the best location and optimal structure to legally minimize taxes.',
    ru: 'Швейцария предлагает привлекательную налоговую систему с кантональными различиями. Мы поможем выбрать лучший кантон и оптимальную структуру для легальной минимизации налогов.',
    ua: 'Швейцарія пропонує привабливу податкову систему з кантональними відмінностями. Ми допоможемо обрати найкращий кантон та оптимальну структуру для легальної мінімізації податків.'
  },
  tax_f1: {
    de: 'Steuererklärungen für Unternehmen und Privatpersonen', fr: 'Déclarations fiscales pour entreprises et particuliers', en: 'Tax returns for companies and individuals', ru: 'Налоговые декларации для компаний и физических лиц', ua: 'Податкові декларації для компаній та фізичних осіб'
  },
  tax_f2: {
    de: 'Internationale Steuerplanung', fr: 'Planification fiscale internationale', en: 'International tax planning', ru: 'Международное налоговое планирование', ua: 'Міжнародне податкове планування'
  },
  tax_f3: {
    de: 'Doppelbesteuerungsabkommen', fr: 'Conventions de double imposition', en: 'Double taxation agreements', ru: 'Соглашения об избежании двойного налогообложения', ua: 'Угоди про уникнення подвійного оподаткування'
  },
  tax_f4: {
    de: 'MWST-Registrierung und -Abrechnung', fr: 'Enregistrement et décompte TVA', en: 'VAT registration and reporting', ru: 'Регистрация и отчётность по НДС (VAT)', ua: 'Реєстрація та звітність з ПДВ (VAT)'
  },
  tax_f5: {
    de: 'Steuerrulings und Verhandlungen', fr: 'Rulings fiscaux et négociations', en: 'Tax rulings and negotiations', ru: 'Налоговые решения и переговоры', ua: 'Податкові рішення та переговори'
  },


  // ===== ABOUT PAGE =====
  about_hero_title: {
    de: 'Über uns', fr: 'À propos de nous', en: 'About Us', ru: 'О компании', ua: 'Про компанію'
  },
  about_hero_text: {
    de: 'Erfahren Sie mehr über Swiss Center Services AG — Ihren verlässlichen Partner in der Schweiz.',
    fr: 'Découvrez Swiss Center Services AG — votre partenaire fiable en Suisse.',
    en: 'Learn more about Swiss Center Services AG — your reliable partner in Switzerland.',
    ru: 'Узнайте больше о Swiss Center Services AG — вашем надёжном партнёре в Швейцарии.',
    ua: 'Дізнайтеся більше про Swiss Center Services AG — вашого надійного партнера у Швейцарії.'
  },
  about_mission_label: {
    de: 'Unsere Mission', fr: 'Notre mission', en: 'Our Mission', ru: 'Наша миссия', ua: 'Наша місія'
  },
  about_mission_text: {
    de: 'Wir machen die Schweizer Geschäftswelt für internationale Unternehmer zugänglich. Unser Ziel ist es, jeden Schritt Ihres Weges zu begleiten — von der ersten Idee bis zum erfolgreichen operativen Geschäft.',
    fr: 'Nous rendons le monde des affaires suisse accessible aux entrepreneurs internationaux. Notre objectif est de vous accompagner à chaque étape — de la première idée à l\'exploitation réussie.',
    en: 'We make Swiss business accessible to international entrepreneurs. Our goal is to guide you every step of the way — from the first idea to successful operations.',
    ru: 'Мы делаем швейцарский бизнес доступным для международных предпринимателей. Наша цель — сопровождать каждый шаг вашего пути от первой идеи до успешного операционного бизнеса.',
    ua: 'Ми робимо швейцарський бізнес доступним для міжнародних підприємців. Наша мета — супроводжувати кожен крок вашого шляху від першої ідеї до успішного операційного бізнесу.'
  },
  about_values_title: {
    de: 'Unsere Werte', fr: 'Nos valeurs', en: 'Our Values', ru: 'Наши ценности', ua: 'Наші цінності'
  },

  // ===== BLOG SECTION =====
  blog_label: {
    de: 'Aktuelles', fr: 'Actualités', en: 'Latest News', ru: 'Блог', ua: 'Блог'
  },
  blog_title: {
    de: 'Wertvolle Tipps und Insights', fr: 'Conseils et idées précieux', en: 'Valuable Tips and Insights', ru: 'Полезные советы и инсайты', ua: 'Корисні поради та інсайти'
  },
  blog_subtitle: {
    de: 'Erfahren Sie mehr über Firmengründung, Steuerfragen und Geschäftsführung in der Schweiz',
    fr: 'Découvrez comment créer une entreprise, gérer les impôts et diriger votre entreprise en Suisse',
    en: 'Learn about company formation, tax strategy, and business management in Switzerland',
    ru: 'Узнайте о регистрации компании, налоговой стратегии и управлении бизнесом в Швейцарии',
    ua: 'Дізнайтеся про реєстрацію компанії, податкову стратегію та управління бізнесом у Швейцарії'
  },
  blog_read_more: {
    de: 'Artikel lesen', fr: 'Lire l\'article', en: 'Read Article', ru: 'Читать статью', ua: 'Читати статтю'
  },
  blog_view_all: {
    de: 'Alle Artikel anzeigen', fr: 'Voir tous les articles', en: 'View All Articles', ru: 'Смотреть все статьи', ua: 'Переглянути всі статті'
  },
  blog_no_articles: {
    de: 'Keine Artikel gefunden', fr: 'Aucun article trouvé', en: 'No articles found', ru: 'Статьи не найдены', ua: 'Статті не знайдені'
  },

  // ===== BLOG PAGE =====
  blog_hero_title: {
    de: 'Unser Blog', fr: 'Notre blog', en: 'Our Blog', ru: 'Наш блог', ua: 'Наш блог'
  },
  blog_hero_text: {
    de: 'Informationen und praktische Tipps für Ihr Geschäft in der Schweiz',
    fr: 'Informations et conseils pratiques pour votre entreprise en Suisse',
    en: 'Information and practical tips for your business in Switzerland',
    ru: 'Информация и практические советы для вашего бизнеса в Швейцарии',
    ua: 'Інформація та практичні поради для вашого бізнесу у Швейцарії'
  },

  // ===== FOOTER ADDITIONS =====
  footer_blog: {
    de: 'Blog', fr: 'Blog', en: 'Blog', ru: 'Блог', ua: 'Блог'
  },

  // ===== CONTACT PAGE =====
  contact_hero_title: {
    de: 'Kontakt', fr: 'Contact', en: 'Contact Us', ru: 'Контакты', ua: 'Контакти'
  },
  contact_hero_text: {
    de: 'Wir freuen uns auf Ihre Anfrage. Kontaktieren Sie uns für ein unverbindliches Erstgespräch.',
    fr: 'Nous nous réjouissons de votre demande. Contactez-nous pour un premier entretien sans engagement.',
    en: 'We look forward to your inquiry. Contact us for a free initial consultation.',
    ru: 'Мы всегда готовы Вам помочь и будем рады вашему обращению. Свяжитесь с нами для бесплатной первичной консультации.',
    ua: 'Ми будемо раді вашому зверненню. Зв\'яжіться з нами для безкоштовної первинної консультації.'
  },
  contact_phone_label: {
    de: 'Telefon', fr: 'Téléphone', en: 'Phone', ru: 'Телефон', ua: 'Телефон'
  },
  contact_email_label: {
    de: 'E-Mail', fr: 'E-mail', en: 'E-mail', ru: 'E-mail', ua: 'E-mail'
  },
  contact_address_label: {
    de: 'Adresse', fr: 'Adresse', en: 'Address', ru: 'Адрес', ua: 'Адреса'
  },
  contact_hours_label: {
    de: 'Öffnungszeiten', fr: 'Horaires', en: 'Working Hours', ru: 'Часы работы', ua: 'Години роботи'
  },
  contact_hours_value: {
    de: 'Mo–Fr: 09:00–17:00', en: 'Mon–Fri: 09:00–17:00', ru: 'Пн–Пт: 09:00–17:00', ua: 'Пн–Пт: 09:00–17:00'
  },
  sidebar_title: {
    de: 'Beratung anfordern', fr: 'Demander un conseil', en: 'Request Consultation', ru: 'Заказать консультацию', ua: 'Замовити консультацію'
  },
  sidebar_text: {
    de: 'Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.',
    fr: 'Remplissez le formulaire et nous vous contacterons dans les 24 heures.',
    en: 'Fill in the form and we will contact you within 24 hours.',
    ru: 'Заполните форму и мы свяжемся с вами в течение 24 часов.',
    ua: 'Заповніть форму і ми зв\'яжемося з вами протягом 24 годин.'
  }
};
