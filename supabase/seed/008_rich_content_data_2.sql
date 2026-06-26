-- Rich content update: Data Analytics category (part 2)

update courses set
  long_description_en = 'Learn Python specifically for data analysis — not general programming theory, but the practical skills for cleaning, transforming, and analyzing real datasets using pandas, with enough core Python to write your own analysis scripts confidently.',
  long_description_az = 'Data təhlili üçün xüsusi olaraq Python öyrənin — ümumi proqramlaşdırma nəzəriyyəsi deyil, pandas istifadə edərək real data dəstlərini təmizləmək, transformasiya etmək və təhlil etmək üçün praktiki bacarıqlar, öz təhlil skriptlərinizi inamla yazmaq üçün kifayət qədər əsas Python bilikləri ilə.',
  long_description_ru = 'Изучите Python специально для анализа данных — не общую теорию программирования, а практические навыки очистки, преобразования и анализа реальных данных с помощью pandas, с достаточной базой Python для уверенного написания собственных скриптов анализа.',
  syllabus_en = 'Weeks 1-3: Python fundamentals — variables, loops, functions, data structures.
Weeks 4-6: pandas — loading, cleaning, and transforming data.
Weeks 7-8: Basic visualization with matplotlib.
Weeks 9-10: Capstone analysis project on a real-style dataset.',
  syllabus_az = 'Həftə 1-3: Python əsasları — dəyişənlər, dövrlər, funksiyalar, data strukturları.
Həftə 4-6: pandas — datanı yükləmək, təmizləmək və transformasiya etmək.
Həftə 7-8: matplotlib ilə əsas vizualizasiya.
Həftə 9-10: Real tipli data dəsti üzərində yekun təhlil layihəsi.',
  syllabus_ru = 'Недели 1-3: Основы Python — переменные, циклы, функции, структуры данных.
Недели 4-6: pandas — загрузка, очистка и преобразование данных.
Недели 7-8: Базовая визуализация с matplotlib.
Недели 9-10: Итоговый аналитический проект на данных в реальном стиле.'
where slug = 'python-telimi';

update courses set
  long_description_en = 'Move beyond just generating numbers — learn to build reports and presentations that communicate findings clearly to people who aren''t analysts. We cover structuring a data story, choosing the right chart for the right message, and presenting findings so they actually drive decisions.',
  long_description_az = 'Sadəcə rəqəm yaratmaqdan kənara çıxın — analitik olmayan insanlara tapıntıları aydın şəkildə çatdıran hesabat və təqdimatlar qurmağı öyrənin. Data hekayəsini strukturlaşdırmağı, düzgün mesaj üçün düzgün qrafiki seçməyi və tapıntıları həqiqətən qərarları yönləndirəcək şəkildə təqdim etməyi əhatə edirik.',
  long_description_ru = 'Идите дальше простого получения цифр — научитесь создавать отчёты и презентации, которые ясно доносят выводы людям, не являющимся аналитиками. Мы рассматриваем структурирование истории данных, выбор правильного графика для нужного сообщения и презентацию выводов так, чтобы они реально влияли на решения.',
  syllabus_en = 'Week 1: Structuring a data story — what to lead with, what to cut.
Week 2: Choosing the right chart type for the message.
Weeks 3-4: Building clear, decision-ready reports and presenting them.',
  syllabus_az = 'Həftə 1: Data hekayəsini strukturlaşdırmaq — nə ilə başlamaq, nəyi çıxarmaq.
Həftə 2: Mesaj üçün düzgün qrafik növünü seçmək.
Həftə 3-4: Aydın, qərara hazır hesabatlar qurmaq və onları təqdim etmək.',
  syllabus_ru = 'Неделя 1: Структурирование истории данных — с чего начать, что убрать.
Неделя 2: Выбор правильного типа графика для сообщения.
Недели 3-4: Создание понятных, готовых к принятию решений отчётов и их презентация.'
where slug = 'data-reporting-telimi';

update courses set
  long_description_en = 'Build interactive, visually polished dashboards in Tableau. We focus on telling clear stories with data — connecting to data sources, choosing effective visual types, and designing dashboards that guide the viewer''s eye to what matters.',
  long_description_az = 'Tableau-da interaktiv, vizual cəhətdən cilalanmış dashboard-lar qurun. Data ilə aydın hekayələr danışmağa fokuslanırıq — data mənbələrinə qoşulmaq, effektiv vizual növləri seçmək və izləyicinin diqqətini vacib olana yönəldən dashboard-lar dizayn etmək.',
  long_description_ru = 'Создавайте интерактивные, визуально отполированные дашборды в Tableau. Мы фокусируемся на ясном рассказе историй через данные — подключении к источникам данных, выборе эффективных визуальных типов и дизайне дашбордов, направляющих взгляд зрителя на главное.',
  syllabus_en = 'Weeks 1-2: Connecting data sources and basic chart building.
Weeks 3-5: Calculated fields and table calculations.
Weeks 6-7: Dashboard design — layout, filters, interactivity.
Week 8: Final dashboard project.',
  syllabus_az = 'Həftə 1-2: Data mənbələrinə qoşulma və əsas qrafik qurulması.
Həftə 3-5: Hesablanmış sahələr və cədvəl hesablamaları.
Həftə 6-7: Dashboard dizaynı — düzən, filtrlər, interaktivlik.
Həftə 8: Yekun dashboard layihəsi.',
  syllabus_ru = 'Недели 1-2: Подключение источников данных и базовое построение графиков.
Недели 3-5: Вычисляемые поля и табличные вычисления.
Недели 6-7: Дизайн дашборда — макет, фильтры, интерактивность.
Неделя 8: Финальный проект дашборда.'
where slug = 'tableau-telimi';
