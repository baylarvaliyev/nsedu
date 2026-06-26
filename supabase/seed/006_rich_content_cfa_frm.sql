-- Rich content update: CFA + FRM

update courses set
  long_description_en = 'Preparation for CFA Level I, the entry point into one of the most respected credentials in investment management. This is an intensive program covering ethics, quantitative methods, economics, financial statement analysis, and the foundations of portfolio management. The CFA program is demanding by design — expect significant independent study alongside class time.',
  long_description_az = 'İnvestisiya idarəetməsində ən hörmətli sertifikatlardan birinə giriş nöqtəsi olan CFA Level I-ə hazırlıq. Bu, etika, kəmiyyət metodları, iqtisadiyyat, maliyyə hesabatlarının təhlili və portfel idarəetməsinin əsaslarını əhatə edən intensiv proqramdır. CFA proqramı dizayn etibarilə tələbkardır — dərs vaxtı ilə yanaşı ciddi müstəqil oxu gözlənilir.',
  long_description_ru = 'Подготовка к CFA Level I — точке входа в одну из самых уважаемых квалификаций в управлении инвестициями. Это интенсивная программа, охватывающая этику, количественные методы, экономику, анализ финансовой отчётности и основы управления портфелем. Программа CFA требовательна по своей природе — ожидается серьёзная самостоятельная подготовка наряду с занятиями.',
  syllabus_en = 'Months 1-2: Ethical and professional standards, quantitative methods.
Months 3-4: Economics and financial statement analysis.
Months 5-6: Corporate finance, equity, and fixed income foundations.
Final weeks: Full-length mock exams and targeted review of weak areas.',
  syllabus_az = 'Ay 1-2: Etik və peşəkar standartlar, kəmiyyət metodları.
Ay 3-4: İqtisadiyyat və maliyyə hesabatlarının təhlili.
Ay 5-6: Korporativ maliyyə, səhm və sabit gəlirli aktivlər əsasları.
Son həftələr: Tam həcmli sınaq imtahanları və zəif sahələrin məqsədli təkrarı.',
  syllabus_ru = 'Месяцы 1-2: Этические и профессиональные стандарты, количественные методы.
Месяцы 3-4: Экономика и анализ финансовой отчётности.
Месяцы 5-6: Корпоративные финансы, основы акций и облигаций.
Последние недели: Полноформатные пробные экзамены и целевой повтор слабых тем.'
where slug = 'cfa-level-1';

update courses set
  long_description_en = 'Preparation for CFA Level II, which shifts from broad foundations to applying valuation models and asset analysis in depth. This level is widely considered the most technically demanding of the three — the program is structured around item-set practice, the actual exam format.',
  long_description_az = 'Geniş əsaslardan dəyərləndirmə modellərinin və aktiv təhlilinin dərindən tətbiqinə keçən CFA Level II-yə hazırlıq. Bu səviyyə üç səviyyədən texniki cəhətdən ən tələbkar hesab olunur — proqram real imtahan formatı olan item-set məşqi ətrafında qurulub.',
  long_description_ru = 'Подготовка к CFA Level II, который переходит от широких основ к глубокому применению моделей оценки и анализу активов. Этот уровень считается технически самым сложным из трёх — программа построена вокруг практики item-set, реального формата экзамена.',
  syllabus_en = 'Months 1-2: Equity and fixed income valuation, deepened.
Months 3-4: Alternative investments and derivatives.
Months 5-6: Portfolio management applications.
Final weeks: Item-set practice exams under timed conditions.',
  syllabus_az = 'Ay 1-2: Səhm və sabit gəlirli aktivlərin dəyərləndirilməsi, dərinləşdirilmiş.
Ay 3-4: Alternativ investisiyalar və derivativlər.
Ay 5-6: Portfel idarəetməsi tətbiqləri.
Son həftələr: Vaxtlı şərtlər altında item-set sınaq imtahanları.',
  syllabus_ru = 'Месяцы 1-2: Углублённая оценка акций и облигаций.
Месяцы 3-4: Альтернативные инвестиции и деривативы.
Месяцы 5-6: Применение в управлении портфелем.
Последние недели: Практика item-set экзаменов с таймером.'
where slug = 'cfa-level-2';

update courses set
  long_description_en = 'Preparation for FRM Part 1, focused on the foundational tools of risk management: quantitative analysis, financial markets and products, valuation, and risk models. A strong technical grounding for anyone moving into risk management, trading, or compliance roles at banks and financial institutions.',
  long_description_az = 'Risk idarəetməsinin əsas alətlərinə fokuslanan FRM Part 1-ə hazırlıq: kəmiyyət təhlili, maliyyə bazarları və məhsulları, dəyərləndirmə və risk modelləri. Banklarda və maliyyə qurumlarında risk idarəetməsi, treyderlik və ya uyğunluq vəzifələrinə keçən hər kəs üçün möhkəm texniki təməl.',
  long_description_ru = 'Подготовка к FRM Part 1, ориентированная на базовые инструменты управления рисками: количественный анализ, финансовые рынки и продукты, оценка и модели рисков. Прочная техническая база для тех, кто переходит в риск-менеджмент, трейдинг или compliance в банках и финансовых организациях.',
  syllabus_en = 'Weeks 1-5: Foundations of risk management and quantitative analysis.
Weeks 6-10: Financial markets and products.
Weeks 11-16: Valuation and risk models.
Final weeks: Full practice exam and review.',
  syllabus_az = 'Həftə 1-5: Risk idarəetməsi əsasları və kəmiyyət təhlili.
Həftə 6-10: Maliyyə bazarları və məhsulları.
Həftə 11-16: Dəyərləndirmə və risk modelləri.
Son həftələr: Tam sınaq imtahanı və təkrar.',
  syllabus_ru = 'Недели 1-5: Основы управления рисками и количественный анализ.
Недели 6-10: Финансовые рынки и продукты.
Недели 11-16: Оценка и модели рисков.
Последние недели: Полный пробный экзамен и повторение.'
where slug = 'frm-part-1';
