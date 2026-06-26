-- Rich content update: Data Analytics category (part 3, final)

update courses set
  long_description_en = 'Learn statistical analysis using SPSS, widely used in research, social sciences, and market research. We cover descriptive statistics, hypothesis testing, and common analyses like t-tests, ANOVA, and regression — with an emphasis on knowing which test to use and why, not just clicking buttons.',
  long_description_az = 'Tədqiqat, sosial elmlər və bazar araştırmalarında geniş istifadə olunan SPSS vasitəsilə statistik təhlili öyrənin. Təsviri statistikanı, hipotez testini və t-test, ANOVA və reqresiya kimi ümumi təhlilləri əhatə edirik — hansı testdən nə üçün istifadə edəcəyini bilməyə vurğu ilə, sadəcə düymələrə basmaqla deyil.',
  long_description_ru = 'Изучите статистический анализ с помощью SPSS, широко используемого в исследованиях, социальных науках и маркетинговых исследованиях. Мы охватываем описательную статистику, проверку гипотез и распространённые анализы, такие как t-тесты, ANOVA и регрессия — с акцентом на понимание, какой тест использовать и почему, а не просто нажатие кнопок.',
  syllabus_en = 'Weeks 1-2: SPSS interface and descriptive statistics.
Weeks 3-5: Hypothesis testing — t-tests, chi-square, ANOVA.
Weeks 6-7: Correlation and regression analysis.
Week 8: Applied project using a real-style survey dataset.',
  syllabus_az = 'Həftə 1-2: SPSS interfeysi və təsviri statistika.
Həftə 3-5: Hipotez testi — t-test, ki-kvadrat, ANOVA.
Həftə 6-7: Korrelyasiya və reqresiya təhlili.
Həftə 8: Real tipli sorğu data dəsti istifadə edərək tətbiqi layihə.',
  syllabus_ru = 'Недели 1-2: Интерфейс SPSS и описательная статистика.
Недели 3-5: Проверка гипотез — t-тесты, хи-квадрат, ANOVA.
Недели 6-7: Корреляционный и регрессионный анализ.
Неделя 8: Прикладной проект на данных опроса в реальном стиле.'
where slug = 'spss-biznes-statistika';

update courses set
  long_description_en = 'Statistical analysis and data analytics using R, the language of choice for statisticians and researchers. We cover data manipulation, visualization with ggplot2, and the statistical methods most commonly needed in applied analytics work.',
  long_description_az = 'Statistiklər və tədqiqatçılar üçün seçim dili olan R vasitəsilə statistik təhlil və data analitikası. Data manipulyasiyasını, ggplot2 ilə vizualizasiyanı və tətbiqi analitika işində ən çox lazım olan statistik metodları əhatə edirik.',
  long_description_ru = 'Статистический анализ и аналитика данных на языке R — предпочитаемом языке статистиков и исследователей. Мы охватываем работу с данными, визуализацию с ggplot2 и статистические методы, наиболее часто нужные в прикладной аналитике.',
  syllabus_en = 'Weeks 1-3: R fundamentals — data structures, data manipulation with dplyr.
Weeks 4-6: Visualization with ggplot2.
Weeks 7-9: Statistical methods — correlation, regression, hypothesis testing.
Week 10: Final applied analysis project.',
  syllabus_az = 'Həftə 1-3: R əsasları — data strukturları, dplyr ilə data manipulyasiyası.
Həftə 4-6: ggplot2 ilə vizualizasiya.
Həftə 7-9: Statistik metodlar — korrelyasiya, reqresiya, hipotez testi.
Həftə 10: Yekun tətbiqi təhlil layihəsi.',
  syllabus_ru = 'Недели 1-3: Основы R — структуры данных, работа с данными в dplyr.
Недели 4-6: Визуализация с ggplot2.
Недели 7-9: Статистические методы — корреляция, регрессия, проверка гипотез.
Неделя 10: Финальный прикладной аналитический проект.'
where slug = 'r-data-analitika';

update courses set
  long_description_en = 'A focused Excel course for people who already know the basics and want to use Excel as a real analytical tool: pivot tables, advanced lookup and array formulas, and structuring spreadsheets so they hold up under real analytical work instead of breaking when the dataset grows.',
  long_description_az = 'Artıq əsasları bilən və Excel-i real analitik alət kimi istifadə etmək istəyən insanlar üçün məqsədli Excel kursu: pivot cədvəllər, qabaqcıl axtarış və array formullar, data dəsti böyüdükdə dağılmayan, real analitik iş altında dözən cədvəllər strukturlaşdırmaq.',
  long_description_ru = 'Целевой курс Excel для тех, кто уже знает основы и хочет использовать Excel как настоящий аналитический инструмент: сводные таблицы, продвинутые функции поиска и массивов, а также структурирование таблиц так, чтобы они выдерживали реальную аналитическую работу, а не разваливались при росте данных.',
  syllabus_en = 'Week 1: Pivot tables for analysis, not just summaries.
Week 2: Advanced lookups — INDEX/MATCH, XLOOKUP, array formulas.
Weeks 3-4: Structuring analytical spreadsheets that scale, plus a final analysis project.',
  syllabus_az = 'Həftə 1: Sadəcə xülasə üçün deyil, təhlil üçün pivot cədvəllər.
Həftə 2: Qabaqcıl axtarışlar — INDEX/MATCH, XLOOKUP, array formullar.
Həftə 3-4: Böyüyə bilən analitik cədvəllərin strukturlaşdırılması, eləcə də yekun təhlil layihəsi.',
  syllabus_ru = 'Неделя 1: Сводные таблицы для анализа, а не просто сводок.
Неделя 2: Продвинутый поиск — INDEX/MATCH, XLOOKUP, формулы массивов.
Недели 3-4: Структурирование масштабируемых аналитических таблиц, финальный аналитический проект.'
where slug = 'excel-data-analysis';

update courses set
  long_description_en = 'A practical introduction to machine learning and AI concepts — no PhD-level math required. We focus on understanding how common ML models actually work, when to use them, and hands-on practice training simple models, so you can speak confidently about AI and apply basic techniques in your own analysis work.',
  long_description_az = 'Maşın öyrənməsi və süni intellekt konsepsiyalarına praktiki giriş — PhD səviyyəli riyaziyyat tələb olunmur. Ümumi ML modellərinin həqiqətən necə işlədiyini, onları nə vaxt istifadə edəcəyini başa düşməyə və sadə modelləri öyrətmək üçün praktiki məşqə fokuslanırıq ki, süni intellekt haqqında inamla danışa və öz təhlil işinizdə əsas texnikaları tətbiq edə biləsiniz.',
  long_description_ru = 'Практическое введение в концепции машинного обучения и ИИ — без необходимости в математике уровня PhD. Мы фокусируемся на понимании того, как реально работают распространённые модели ML, когда их использовать, и практике обучения простых моделей, чтобы вы могли уверенно говорить об ИИ и применять базовые техники в своей работе с данными.',
  syllabus_en = 'Weeks 1-2: Core concepts — what ML actually is, types of problems it solves.
Weeks 3-5: Supervised learning — regression and classification basics, hands-on with simple models.
Weeks 6-8: Model evaluation, common pitfalls, and intro to AI tools in practice.
Weeks 9-10: Wrap-up: ethics, where the field is heading, and where to keep learning.
Weeks 11-12: Final applied project.',
  syllabus_az = 'Həftə 1-2: Əsas konsepsiyalar — ML həqiqətən nədir, həll etdiyi məsələ növləri.
Həftə 3-5: Nəzarətli öyrənmə — reqresiya və təsnifat əsasları, sadə modellərlə praktiki iş.
Həftə 6-8: Model qiymətləndirməsi, ümumi səhvlər və praktikada süni intellekt alətlərinə giriş.
Həftə 9-10: Yekunlaşdırma: etika, sahənin gələcəyi və harada öyrənməyə davam etmək.
Həftə 11-12: Yekun tətbiqi layihə.',
  syllabus_ru = 'Недели 1-2: Основные концепции — что такое ML на самом деле, какие задачи решает.
Недели 3-5: Обучение с учителем — основы регрессии и классификации, практика с простыми моделями.
Недели 6-8: Оценка моделей, частые ошибки и введение в инструменты ИИ на практике.
Недели 9-10: Итоги: этика, куда движется отрасль, что изучать дальше.
Недели 11-12: Финальный прикладной проект.'
where slug = 'intro-machine-learning';
