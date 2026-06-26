-- Rich content update: Data Analytics category (part 1)

update courses set
  long_description_en = 'A complete data analytics program that takes you from raw spreadsheets to confident, end-to-end analysis: Excel for cleaning and exploring data, SQL for querying real databases, Power BI for visualization, and Python for the analysis that spreadsheets can''t handle. This is our most comprehensive course, designed for people who want a genuine career shift into analytics, not just a single tool.',
  long_description_az = 'Sizi xam cədvəllərdən inamlı, başdan-sona təhlilə aparan tam data analitikası proqramı: data təmizləmə və araştırma üçün Excel, real verilənlər bazalarına sorğu üçün SQL, vizualizasiya üçün Power BI və cədvəllərin öhdəsindən gəlmədiyi təhlil üçün Python. Bu, sadəcə bir alət deyil, analitikaya həqiqi karyera keçidi istəyən insanlar üçün dizayn edilmiş ən əhatəli kursumuzdur.',
  long_description_ru = 'Полная программа аналитики данных, которая ведёт вас от необработанных таблиц к уверенному сквозному анализу: Excel для очистки и исследования данных, SQL для запросов к реальным базам данных, Power BI для визуализации и Python для анализа, который таблицы не могут выполнить. Это наш самый полный курс, созданный для тех, кто хочет настоящего карьерного перехода в аналитику, а не просто изучения одного инструмента.',
  syllabus_en = 'Weeks 1-4: Excel for analysis — cleaning, pivot tables, exploratory analysis.
Weeks 5-9: SQL — querying, joins, aggregations on real datasets.
Weeks 10-14: Power BI — building interactive dashboards and reports.
Weeks 15-20: Python — data manipulation with pandas, basic visualization, capstone project.',
  syllabus_az = 'Həftə 1-4: Təhlil üçün Excel — təmizləmə, pivot cədvəllər, araştırıcı təhlil.
Həftə 5-9: SQL — sorğu, join, real data dəstlərində aqreqasiya.
Həftə 10-14: Power BI — interaktiv dashboard və hesabatlar yaratmaq.
Həftə 15-20: Python — pandas ilə data manipulyasiyası, əsas vizualizasiya, yekun layihə.',
  syllabus_ru = 'Недели 1-4: Excel для анализа — очистка, сводные таблицы, разведочный анализ.
Недели 5-9: SQL — запросы, джойны, агрегации на реальных данных.
Недели 10-14: Power BI — создание интерактивных дашбордов и отчётов.
Недели 15-20: Python — работа с данными в pandas, базовая визуализация, итоговый проект.'
where slug = 'data-analitika-telimi';

update courses set
  long_description_en = 'Targeted preparation for the PL-300 certification (Microsoft Power BI Data Analyst), paired with the business statistics foundation you need to actually interpret what your dashboards are showing. Useful both as a standalone certification path and as preparation before our broader Power BI course.',
  long_description_az = 'PL-300 sertifikatına (Microsoft Power BI Data Analyst) məqsədli hazırlıq, dashboard-larınızın həqiqətən nə göstərdiyini şərh etmək üçün lazım olan biznes statistikası təməli ilə birlikdə. Həm müstəqil sertifikat yolu, həm də daha geniş Power BI kursumuzdan əvvəl hazırlıq kimi faydalıdır.',
  long_description_ru = 'Целевая подготовка к сертификации PL-300 (Microsoft Power BI Data Analyst) в сочетании с основами бизнес-статистики, необходимыми для реальной интерпретации того, что показывают ваши дашборды. Полезен как самостоятельный путь к сертификации, так и как подготовка перед нашим более широким курсом Power BI.',
  syllabus_en = 'Weeks 1-3: Business statistics fundamentals — descriptive stats, distributions, correlation.
Weeks 4-8: Power BI for the PL-300 exam — data modeling, DAX basics, report design.
Weeks 9-10: Practice exams and exam-day strategy.
Weeks 11-12: Final review and mock certification exam.',
  syllabus_az = 'Həftə 1-3: Biznes statistikası əsasları — təsviri statistika, paylanmalar, korrelyasiya.
Həftə 4-8: PL-300 imtahanı üçün Power BI — data modelləşdirmə, DAX əsasları, hesabat dizaynı.
Həftə 9-10: Sınaq imtahanları və imtahan günü strategiyası.
Həftə 11-12: Son təkrar və sınaq sertifikat imtahanı.',
  syllabus_ru = 'Недели 1-3: Основы бизнес-статистики — описательная статистика, распределения, корреляция.
Недели 4-8: Power BI для экзамена PL-300 — моделирование данных, основы DAX, дизайн отчётов.
Недели 9-10: Пробные экзамены и стратегия дня экзамена.
Недели 11-12: Финальное повторение и пробный сертификационный экзамен.'
where slug = 'pl-300-biznes-statistika';

update courses set
  long_description_en = 'Learn to build genuinely useful Power BI dashboards — not just pretty charts, but reports that decision-makers actually use. We cover data modeling, DAX formulas for calculations, and report design principles so your dashboards communicate clearly at a glance.',
  long_description_az = 'Həqiqətən faydalı Power BI dashboard-ları qurmağı öyrənin — sadəcə gözəl qrafiklər deyil, qərar qəbul edənlərin həqiqətən istifadə etdiyi hesabatlar. Data modelləşdirmə, hesablamalar üçün DAX formulları və hesabatlarınızın bir baxışda aydın şəkildə ünsiyyət qurması üçün dizayn prinsiplərini əhatə edirik.',
  long_description_ru = 'Научитесь создавать действительно полезные дашборды Power BI — не просто красивые графики, а отчёты, которые реально используют руководители. Мы охватываем моделирование данных, формулы DAX для расчётов и принципы дизайна отчётов, чтобы ваши дашборды доносили информацию с первого взгляда.',
  syllabus_en = 'Weeks 1-3: Data modeling and relationships.
Weeks 4-6: DAX formulas — calculated columns, measures, time intelligence.
Weeks 7-9: Report design — layout, visuals, interactivity.
Week 10: Capstone dashboard project using a real-style dataset.',
  syllabus_az = 'Həftə 1-3: Data modelləşdirmə və əlaqələr.
Həftə 4-6: DAX formulları — hesablanmış sütunlar, ölçülər, zaman intellekti.
Həftə 7-9: Hesabat dizaynı — düzən, vizuallar, interaktivlik.
Həftə 10: Real tipli data dəsti istifadə edərək yekun dashboard layihəsi.',
  syllabus_ru = 'Недели 1-3: Моделирование данных и связи.
Недели 4-6: Формулы DAX — вычисляемые столбцы, меры, временная аналитика.
Недели 7-9: Дизайн отчётов — макет, визуалы, интерактивность.
Неделя 10: Итоговый проект дашборда на данных в реальном стиле.'
where slug = 'power-bi-telimi';

update courses set
  long_description_en = 'SQL is the single most useful skill for working with real company data — this course gets you from zero to confidently querying, joining, and aggregating data across multiple tables. Every analytics, reporting, or data role expects this, and it transfers directly to any database system you''ll encounter at work.',
  long_description_az = 'SQL real şirkət datası ilə işləmək üçün ən faydalı tək bacarıqdır — bu kurs sizi sıfırdan bir neçə cədvəl arasında inamla sorğu, join və aqreqasiya etməyə aparır. Hər analitika, hesabat və ya data vəzifəsi bunu gözləyir və bu, işdə rastlaşacağınız hər hansı verilənlər bazası sisteminə birbaşa keçir.',
  long_description_ru = 'SQL — самый полезный навык для работы с реальными корпоративными данными. Этот курс проведёт вас с нуля до уверенных запросов, джойнов и агрегаций по нескольким таблицам. Этого ожидают на любой позиции в аналитике, отчётности или данных, и навык напрямую переносится на любую систему баз данных, с которой вы столкнётесь на работе.',
  syllabus_en = 'Weeks 1-2: SELECT basics — filtering, sorting, simple queries.
Weeks 3-4: JOINs — combining data across multiple tables correctly.
Weeks 5-6: Aggregations and GROUP BY — summarizing data meaningfully.
Weeks 7-8: Subqueries, window functions, and a final project querying a realistic database.',
  syllabus_az = 'Həftə 1-2: SELECT əsasları — filtrasiya, sıralama, sadə sorğular.
Həftə 3-4: JOIN-lər — bir neçə cədvəl arasında datanı düzgün birləşdirmək.
Həftə 5-6: Aqreqasiyalar və GROUP BY — datanı mənalı şəkildə yekunlaşdırmaq.
Həftə 7-8: Alt-sorğular, pəncərə funksiyaları və real bir verilənlər bazasını sorğulayan yekun layihə.',
  syllabus_ru = 'Недели 1-2: Основы SELECT — фильтрация, сортировка, простые запросы.
Недели 3-4: JOIN — корректное объединение данных из нескольких таблиц.
Недели 5-6: Агрегации и GROUP BY — содержательное обобщение данных.
Недели 7-8: Подзапросы, оконные функции и финальный проект на реалистичной базе данных.'
where slug = 'sql-telimi';
