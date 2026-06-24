-- Seed data: categories + courses for North Star Academy
-- Pricing grounded in real Baku market research (June 2026):
--   Language courses: ~75-200 AZN/month group, 12-week levels
--   IELTS: ~125-200 AZN/month group, 250-450 AZN individual
--   Excel/Office: ~50-200 AZN total for short courses
--   Data analytics bundles (Python/SQL/PowerBI): ~150-300 AZN/month, 5 months
--   Accounting/1C: ~100-200 AZN/month
--   ACCA papers: ~200-300 AZN per paper
--   CFA Level I: ~260 AZN/month, ~1690 AZN total program (6 months)

-- ============================================
-- CATEGORIES
-- ============================================
insert into categories (slug, name_az, name_en, name_ru, display_order) values
  ('languages', 'Dillər', 'Languages', 'Языки', 0),
  ('computer-skills', 'Komputer Bilikləri', 'Computer Skills', 'Компьютерные навыки', 1),
  ('accounting-finance', 'Mühasibatlıq və Maliyyə', 'Accounting & Finance', 'Бухгалтерия и финансы', 2),
  ('data-analytics', 'Data Analitika', 'Data Analytics', 'Аналитика данных', 3);

-- ============================================
-- LANGUAGES COURSES
-- ============================================
insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'general-english-groups', 'General English - Qruplar (A1-A2, B1-B2, C1-C2)', 'General English - Groups (A1-A2, B1-B2, C1-C2)', 'General English - Группы (A1-A2, B1-B2, C1-C2)',
  'Bütün səviyyələr üzrə qrup dərsləri ilə ingilis dilini öyrənin.', 'Learn English through group classes at every level.', 'Изучайте английский язык в группах любого уровня.',
  150, 'AZN', 12, true
from categories where slug = 'languages';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'ielts', 'IELTS Hazırlığı', 'IELTS Preparation', 'Подготовка к IELTS',
  'IELTS imtahanına strukturlaşdırılmış hazırlıq proqramı.', 'A structured preparation program for the IELTS exam.', 'Структурированная программа подготовки к экзамену IELTS.',
  180, 'AZN', 8, true
from categories where slug = 'languages';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'conversation-clubs', 'Conversation Clubs', 'Conversation Clubs', 'Разговорные клубы',
  'Sərbəst danışıq bacarıqlarını inkişaf etdirmək üçün həftəlik klub.', 'A weekly club for building confident spoken fluency.', 'Еженедельный клуб для развития разговорной речи.',
  90, 'AZN', 4, true
from categories where slug = 'languages';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'russian-groups', 'Rus dili - Qruplar (A1-A2, B1-B2, C1-C2)', 'Russian - Groups (A1-A2, B1-B2, C1-C2)', 'Русский язык - Группы (A1-A2, B1-B2, C1-C2)',
  'Bütün səviyyələr üzrə qrup dərsləri ilə rus dilini öyrənin.', 'Learn Russian through group classes at every level.', 'Изучайте русский язык в группах любого уровня.',
  150, 'AZN', 12, true
from categories where slug = 'languages';

-- ============================================
-- COMPUTER SKILLS COURSES
-- ============================================
insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'excel-training', 'Microsoft Excel təlimi (Beginner, İntermediate, Advanced)', 'Microsoft Excel Training (Beginner, Intermediate, Advanced)', 'Обучение Microsoft Excel (начальный, средний, продвинутый)',
  'Sıfırdan qabaqcıl səviyyəyə qədər Excel bacarıqları.', 'Excel skills from the basics through advanced techniques.', 'Навыки Excel от основ до продвинутого уровня.',
  120, 'AZN', 8, true
from categories where slug = 'computer-skills';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'microsoft-office-training', 'Microsoft Office təlimi', 'Microsoft Office Training', 'Обучение Microsoft Office',
  'Word, Excel və PowerPoint daxil olmaqla tam ofis paketi.', 'The full office suite, including Word, Excel, and PowerPoint.', 'Полный офисный пакет: Word, Excel и PowerPoint.',
  140, 'AZN', 12, true
from categories where slug = 'computer-skills';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'powerpoint-training', 'Microsoft PowerPoint təlimi', 'Microsoft PowerPoint Training', 'Обучение Microsoft PowerPoint',
  'Effektiv təqdimatlar hazırlamağı öyrənin.', 'Learn to design effective, polished presentations.', 'Научитесь создавать эффективные презентации.',
  80, 'AZN', 4, true
from categories where slug = 'computer-skills';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'word-training', 'Microsoft Word təlimi', 'Microsoft Word Training', 'Обучение Microsoft Word',
  'Sənəd hazırlama və formatlaşdırma bacarıqları.', 'Document creation and formatting skills.', 'Навыки создания и оформления документов.',
  70, 'AZN', 4, true
from categories where slug = 'computer-skills';

-- ============================================
-- ACCOUNTING & FINANCE COURSES
-- ============================================
insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'muhasibat-ucotu-1c', 'Mühasibat uçotu və 1C', 'Accounting & 1C', 'Бухучёт и 1C',
  'Mühasibat uçotunun əsasları və 1C proqramında praktiki iş.', 'Accounting fundamentals plus hands-on practice in 1C.', 'Основы бухучёта и практическая работа в 1C.',
  150, 'AZN', 12, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'vergi-ucotu', 'Vergi uçotu təlimi', 'Tax Accounting Training', 'Обучение налоговому учёту',
  'Vergi qanunvericiliyi və praktiki vergi hesabatları.', 'Tax law fundamentals and practical tax reporting.', 'Основы налогового законодательства и практическая отчётность.',
  150, 'AZN', 8, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'cia', 'CIA - Certified Internal Auditor', 'CIA - Certified Internal Auditor', 'CIA - Certified Internal Auditor',
  'Beynəlxalq Daxili Auditor sertifikatına hazırlıq.', 'Preparation for the internationally recognized internal audit certification.', 'Подготовка к международной сертификации внутреннего аудитора.',
  280, 'AZN', 16, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-f3', 'ACCA Financial Accounting (F3)', 'ACCA Financial Accounting (F3)', 'ACCA Financial Accounting (F3)',
  'ACCA-nın maliyyə uçotu modulu üzrə hazırlıq.', 'Preparation for the ACCA Financial Accounting paper.', 'Подготовка к модулю ACCA Financial Accounting.',
  220, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-financial-management', 'ACCA Financial Management', 'ACCA Financial Management', 'ACCA Financial Management',
  'ACCA-nın maliyyə idarəetməsi modulu üzrə hazırlıq.', 'Preparation for the ACCA Financial Management paper.', 'Подготовка к модулю ACCA Financial Management.',
  220, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-management-accounting', 'ACCA Management Accounting', 'ACCA Management Accounting', 'ACCA Management Accounting',
  'ACCA-nın idarəetmə uçotu modulu üzrə hazırlıq.', 'Preparation for the ACCA Management Accounting paper.', 'Подготовка к модулю ACCA Management Accounting.',
  220, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-financial-reporting', 'ACCA Financial Reporting', 'ACCA Financial Reporting', 'ACCA Financial Reporting',
  'ACCA-nın maliyyə hesabatlılığı modulu üzrə hazırlıq.', 'Preparation for the ACCA Financial Reporting paper.', 'Подготовка к модулю ACCA Financial Reporting.',
  230, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-performance-management', 'ACCA Performance Management', 'ACCA Performance Management', 'ACCA Performance Management',
  'ACCA-nın fəaliyyət idarəetməsi modulu üzrə hazırlıq.', 'Preparation for the ACCA Performance Management paper.', 'Подготовка к модулю ACCA Performance Management.',
  230, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'acca-audit-assurance', 'ACCA Audit & Assurance', 'ACCA Audit & Assurance', 'ACCA Audit & Assurance',
  'ACCA-nın audit və əminlik modulu üzrə hazırlıq.', 'Preparation for the ACCA Audit and Assurance paper.', 'Подготовка к модулю ACCA Audit and Assurance.',
  230, 'AZN', 10, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'cfa-level-1', 'CFA Level I', 'CFA Level I', 'CFA Level I',
  'Chartered Financial Analyst proqramının birinci səviyyəsinə hazırlıq. 6 aylıq intensiv proqram.', 'Preparation for the first level of the Chartered Financial Analyst program. A 6-month intensive course.', 'Подготовка к первому уровню программы Chartered Financial Analyst. Интенсивный курс на 6 месяцев.',
  260, 'AZN', 24, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'cfa-level-2', 'CFA Level II', 'CFA Level II', 'CFA Level II',
  'Chartered Financial Analyst proqramının ikinci səviyyəsinə hazırlıq.', 'Preparation for the second level of the Chartered Financial Analyst program.', 'Подготовка ко второму уровню программы Chartered Financial Analyst.',
  280, 'AZN', 24, true
from categories where slug = 'accounting-finance';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'frm-part-1', 'Financial Risk Manager (FRM) 1', 'Financial Risk Manager (FRM) Part 1', 'Financial Risk Manager (FRM), часть 1',
  'Maliyyə riskinin idarə edilməsi sertifikatının birinci hissəsinə hazırlıq.', 'Preparation for the first part of the Financial Risk Manager certification.', 'Подготовка к первой части сертификации Financial Risk Manager.',
  260, 'AZN', 20, true
from categories where slug = 'accounting-finance';

-- ============================================
-- DATA ANALYTICS COURSES
-- ============================================
insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'data-analitika-telimi', 'Data Analitika təlimi', 'Data Analytics Training', 'Обучение аналитике данных',
  'Excel, SQL, Power BI və Python daxil olmaqla tam data analitika proqramı.', 'A complete data analytics program covering Excel, SQL, Power BI, and Python.', 'Полная программа по аналитике данных: Excel, SQL, Power BI и Python.',
  220, 'AZN', 20, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'pl-300-biznes-statistika', 'PL-300 Biznes Statistika təlimi', 'PL-300 Business Statistics Training', 'Обучение бизнес-статистике PL-300',
  'PL-300 sertifikatına hazırlıq və biznes statistikasının əsasları.', 'Preparation for the PL-300 certification with business statistics fundamentals.', 'Подготовка к сертификации PL-300 и основы бизнес-статистики.',
  200, 'AZN', 12, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'power-bi-telimi', 'Power BI təlimi', 'Power BI Training', 'Обучение Power BI',
  'Power BI ilə interaktiv hesabat və dashboard hazırlama.', 'Build interactive reports and dashboards with Power BI.', 'Создание интерактивных отчётов и дашбордов в Power BI.',
  180, 'AZN', 10, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'sql-telimi', 'SQL təlimi', 'SQL Training', 'Обучение SQL',
  'Verilənlər bazası sorğuları və SQL-in əsasları.', 'Database querying and the fundamentals of SQL.', 'Запросы к базам данных и основы SQL.',
  170, 'AZN', 8, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'python-telimi', 'Python təlimi', 'Python Training', 'Обучение Python',
  'Data analitikası üçün Python proqramlaşdırmasının əsasları.', 'Python programming fundamentals for data analysis.', 'Основы программирования на Python для анализа данных.',
  190, 'AZN', 10, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'data-reporting-telimi', 'Data Reporting təlimi', 'Data Reporting Training', 'Обучение отчётности по данным',
  'Effektiv data hesabatları və vizual təqdimat hazırlama.', 'Building effective data reports and visual presentations.', 'Создание эффективных отчётов и визуальных презентаций данных.',
  150, 'AZN', 6, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'tableau-telimi', 'Tableau təlimi', 'Tableau Training', 'Обучение Tableau',
  'Tableau ilə data vizuallaşdırma və interaktiv dashboardlar.', 'Data visualization and interactive dashboards with Tableau.', 'Визуализация данных и интерактивные дашборды в Tableau.',
  180, 'AZN', 8, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'spss-biznes-statistika', 'SPSS ilə Biznes Statistika təlimi', 'Business Statistics with SPSS', 'Бизнес-статистика в SPSS',
  'SPSS proqramı ilə statistik təhlil aparmağı öyrənin.', 'Learn statistical analysis using SPSS.', 'Изучите статистический анализ с помощью SPSS.',
  170, 'AZN', 8, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'r-data-analitika', 'R ilə Data Analitika təlimi', 'Data Analytics with R', 'Аналитика данных в R',
  'R dilində statistik təhlil və data analitikası.', 'Statistical analysis and data analytics using the R language.', 'Статистический анализ и аналитика данных на языке R.',
  190, 'AZN', 10, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'excel-data-analysis', 'Data Analitikası üçün Excel təlimi', 'Excel for Data Analysis', 'Excel для анализа данных',
  'Pivot Table, qabaqcıl formullar və data təhlili üçün Excel.', 'Pivot tables, advanced formulas, and Excel for analytical work.', 'Сводные таблицы, продвинутые формулы и Excel для аналитики.',
  150, 'AZN', 8, true
from categories where slug = 'data-analytics';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  price_amount, price_currency, duration_weeks, is_published
)
select id, 'intro-machine-learning', 'Maşın Öyrənməsinə Giriş', 'Intro to Machine Learning & AI', 'Введение в машинное обучение и ИИ',
  'Maşın öyrənməsi və süni intellektin əsas anlayışları və praktiki tətbiqi.', 'Core concepts and hands-on practice with machine learning and AI.', 'Основные концепции и практика машинного обучения и ИИ.',
  220, 'AZN', 12, true
from categories where slug = 'data-analytics';
