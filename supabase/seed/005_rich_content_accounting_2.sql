-- Rich content update: remaining ACCA papers + CFA + FRM

update courses set
  long_description_en = 'Preparation for ACCA Financial Management (F9/FM) — covers investment appraisal, working capital management, and financing decisions. This is where accounting knowledge turns into financial decision-making: how companies decide what to invest in, how to fund it, and how to manage cash day to day.',
  long_description_az = 'ACCA Financial Management (F9/FM) modulu üzrə hazırlıq — investisiya qiymətləndirilməsi, dövriyyə kapitalı idarəetməsi və maliyyələşdirmə qərarlarını əhatə edir. Bu, mühasibat bilgisinin maliyyə qərar qəbuluna çevrildiyi yerdir: şirkətlər nəyə investisiya edəcəklərinə, onu necə maliyyələşdirəcəklərinə və nəğd pulu gündəlik necə idarə edəcəklərinə necə qərar verirlər.',
  long_description_ru = 'Подготовка к модулю ACCA Financial Management (F9/FM) — охватывает оценку инвестиций, управление оборотным капиталом и решения о финансировании. Здесь бухгалтерские знания превращаются в финансовые решения: как компании выбирают, во что инвестировать, как это финансировать и как управлять денежными потоками.',
  syllabus_en = 'Part A: Financial management function and objectives.
Part B: Working capital management.
Part C: Investment appraisal techniques (NPV, IRR, payback).
Part D: Business finance — sources and cost of capital.
Part E: Business valuations and risk management.',
  syllabus_az = 'Hissə A: Maliyyə idarəetmə funksiyası və məqsədləri.
Hissə B: Dövriyyə kapitalı idarəetməsi.
Hissə C: İnvestisiya qiymətləndirmə texnikaları (NPV, IRR, geri qaytarma müddəti).
Hissə D: Biznes maliyyəsi — kapital mənbələri və dəyəri.
Hissə E: Biznes dəyərləndirmələri və risk idarəetməsi.',
  syllabus_ru = 'Часть A: Функция и цели финансового управления.
Часть B: Управление оборотным капиталом.
Часть C: Методы оценки инвестиций (NPV, IRR, срок окупаемости).
Часть D: Корпоративные финансы — источники и стоимость капитала.
Часть E: Оценка бизнеса и управление рисками.'
where slug = 'acca-financial-management';

update courses set
  long_description_en = 'Preparation for ACCA Management Accounting (F2/MA) — the internal side of accounting, focused on costing, budgeting, and performance measurement that managers use to make day-to-day business decisions, as opposed to external financial reporting.',
  long_description_az = 'ACCA Management Accounting (F2/MA) modulu üzrə hazırlıq — mühasibatlığın daxili tərəfi, menecerlərin gündəlik biznes qərarları üçün istifadə etdiyi xərc hesablama, büdcələşdirmə və performans ölçməsinə fokuslanır, xarici maliyyə hesabatlığından fərqli olaraq.',
  long_description_ru = 'Подготовка к модулю ACCA Management Accounting (F2/MA) — внутренняя сторона учёта, ориентированная на калькуляцию затрат, бюджетирование и оценку эффективности, которые менеджеры используют для повседневных бизнес-решений, в отличие от внешней финансовой отчётности.',
  syllabus_en = 'Part A: The nature and purpose of cost and management accounting.
Part B: Cost classification and behavior.
Part C: Budgeting techniques.
Part D: Standard costing and variance analysis.
Part E: Performance measurement.',
  syllabus_az = 'Hissə A: Xərc və idarəetmə mühasibatlığının təbiəti və məqsədi.
Hissə B: Xərc təsnifatı və davranışı.
Hissə C: Büdcələşdirmə texnikaları.
Hissə D: Standart xərc hesablama və fərq təhlili.
Hissə E: Performans ölçməsi.',
  syllabus_ru = 'Часть A: Природа и цель учёта затрат и управленческого учёта.
Часть B: Классификация и поведение затрат.
Часть C: Техники бюджетирования.
Часть D: Нормативный учёт затрат и анализ отклонений.
Часть E: Оценка эффективности.'
where slug = 'acca-management-accounting';

update courses set
  long_description_en = 'Preparation for ACCA Financial Reporting (F7/FR) — building on F3 fundamentals to handle more complex financial reporting scenarios: consolidated financial statements, group accounts, and applying accounting standards to real-world transactions.',
  long_description_az = 'ACCA Financial Reporting (F7/FR) modulu üzrə hazırlıq — F3 əsaslarının üzərində daha mürəkkəb maliyyə hesabatlığı ssenariləri ilə işləmək: konsolidasiya edilmiş maliyyə hesabatları, qrup hesabları və mühasibat standartlarının real əməliyyatlara tətbiqi.',
  long_description_ru = 'Подготовка к модулю ACCA Financial Reporting (F7/FR) — на базе основ F3 работа с более сложными сценариями финансовой отчётности: консолидированная отчётность, групповые счета и применение стандартов учёта к реальным операциям.',
  syllabus_en = 'Part A: The conceptual and regulatory framework.
Part B: Accounting for transactions in financial statements.
Part C: Analyzing and interpreting financial statements.
Part D: Preparation of consolidated financial statements.',
  syllabus_az = 'Hissə A: Konseptual və tənzimləyici çərçivə.
Hissə B: Maliyyə hesabatlarında əməliyyatların uçotu.
Hissə C: Maliyyə hesabatlarının təhlili və şərhi.
Hissə D: Konsolidasiya edilmiş maliyyə hesabatlarının hazırlanması.',
  syllabus_ru = 'Часть A: Концептуальная и нормативная база.
Часть B: Учёт операций в финансовой отчётности.
Часть C: Анализ и интерпретация финансовой отчётности.
Часть D: Подготовка консолидированной финансовой отчётности.'
where slug = 'acca-financial-reporting';

update courses set
  long_description_en = 'Preparation for ACCA Performance Management (F5/PM) — advanced management accounting techniques for decision-making, including pricing, performance measurement across divisions, and risk in budgeting. Builds directly on F2/MA knowledge.',
  long_description_az = 'ACCA Performance Management (F5/PM) modulu üzrə hazırlıq — qiymət təyini, bölmələr arasında performans ölçməsi və büdcələşdirmədə risk daxil olmaqla, qərar qəbulu üçün qabaqcıl idarəetmə mühasibatlığı texnikaları. F2/MA biliklərinin üzərində qurulur.',
  long_description_ru = 'Подготовка к модулю ACCA Performance Management (F5/PM) — продвинутые техники управленческого учёта для принятия решений, включая ценообразование, оценку эффективности по подразделениям и риск в бюджетировании. Строится непосредственно на знаниях F2/MA.',
  syllabus_en = 'Part A: Specialist cost and management accounting techniques.
Part B: Decision-making techniques.
Part C: Budgeting and budgetary control.
Part D: Performance measurement and control across divisions.',
  syllabus_az = 'Hissə A: Mütəxəssis xərc və idarəetmə mühasibatlığı texnikaları.
Hissə B: Qərar qəbulu texnikaları.
Hissə C: Büdcələşdirmə və büdcə nəzarəti.
Hissə D: Bölmələr üzrə performans ölçməsi və nəzarəti.',
  syllabus_ru = 'Часть A: Специализированные техники учёта затрат и управленческого учёта.
Часть B: Техники принятия решений.
Часть C: Бюджетирование и бюджетный контроль.
Часть D: Оценка и контроль эффективности по подразделениям.'
where slug = 'acca-performance-management';

update courses set
  long_description_en = 'Preparation for ACCA Audit and Assurance (F8/AA) — covers the audit process from planning to reporting, including risk assessment, internal controls evaluation, and gathering audit evidence. Essential for anyone heading toward an audit career.',
  long_description_az = 'ACCA Audit and Assurance (F8/AA) modulu üzrə hazırlıq — planlaşdırmadan hesabata qədər audit prosesini, risk qiymətləndirilməsini, daxili nəzarət qiymətləndirilməsini və audit sübutlarının toplanmasını əhatə edir. Audit karyerasına yönəlmiş hər kəs üçün vacibdir.',
  long_description_ru = 'Подготовка к модулю ACCA Audit and Assurance (F8/AA) — охватывает процесс аудита от планирования до отчётности, включая оценку рисков, оценку внутреннего контроля и сбор аудиторских доказательств. Необходим для тех, кто строит карьеру в аудите.',
  syllabus_en = 'Part A: Audit framework and regulation.
Part B: Planning and risk assessment.
Part C: Internal control.
Part D: Audit evidence.
Part E: Review and reporting.',
  syllabus_az = 'Hissə A: Audit çərçivəsi və tənzimləməsi.
Hissə B: Planlaşdırma və risk qiymətləndirilməsi.
Hissə C: Daxili nəzarət.
Hissə D: Audit sübutları.
Hissə E: Baxış və hesabat.',
  syllabus_ru = 'Часть A: Рамки и регулирование аудита.
Часть B: Планирование и оценка рисков.
Часть C: Внутренний контроль.
Часть D: Аудиторские доказательства.
Часть E: Обзор и отчётность.'
where slug = 'acca-audit-assurance';
