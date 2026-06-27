-- Data Science / Data Analytics catalog rebuild: bootcamp bundles +
-- individual standalone courses. Syllabi kept intentionally general
-- (no detailed curriculum breakdown) to avoid handing competitors our
-- actual teaching structure.

-- ============================================
-- BOOTCAMP BUNDLES
-- ============================================

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'data-analitika-bootcamp',
  'Data Analitika Bootcamp',
  'Data Analytics Bootcamp',
  'Бутлагерь по аналитике данных',
  'Excel, SQL, Power BI və Python-u əhatə edən tam analitik proqram. Sıfırdan tətbiqə hazır mütəxəssis səviyyəsinə.',
  'A complete analytics program spanning Excel, SQL, Power BI, and Python — from first principles to job-ready proficiency.',
  'Полная программа по аналитике, объединяющая Excel, SQL, Power BI и Python — от основ до уровня готового специалиста.',
  'Data Analitika Bootcamp ayrı-ayrı kurslar toplusu deyil, vahid məntiqlə qurulmuş bir proqramdır. Hər alət əvvəlki üzərində inşa olunur: Excel ilə məlumatı təşkil etməyi, SQL ilə böyük verilənlər bazalarından düzgün sual qoymağı, Power BI ilə bu nəticələri rəhbərliyin başa düşəcəyi formaya salmağı, Python ilə isə bunların heç birinin tək başına edə bilmədiyi dərinlikdə təhlili öyrənirsiniz. Proqram boyu real biznes ssenariləri üzərində işləyirsiniz ki, məzun olduğunuzda portfolionuzda nümayiş edə biləcəyiniz konkret işiniz olsun, sadəcə sertifikat deyil.',
  'The Data Analytics Bootcamp is not a loose collection of separate courses — it is a single program with a deliberate progression. Each tool builds on the one before it: Excel teaches you to organize and sanity-check data, SQL teaches you to ask the right questions of large databases, Power BI teaches you to turn those answers into something leadership will actually act on, and Python takes you into analysis depth none of the others can reach alone. Throughout the program you work on realistic business scenarios, so graduation leaves you with a portfolio you can show, not just a certificate.',
  'Bootcamp по аналитике данных — это не набор отдельных курсов, а единая программа с осмысленной последовательностью. Каждый инструмент строится на предыдущем: Excel учит организовывать и проверять данные, SQL — задавать правильные вопросы крупным базам данных, Power BI — превращать эти ответы в то, на основании чего руководство реально примет решение, а Python открывает глубину анализа, недостижимую остальными инструментами по отдельности. На протяжении программы вы работаете с реалистичными бизнес-кейсами, поэтому к выпуску у вас будет портфолио, которое можно показать, а не просто сертификат.',
  'Excel-də əsas işləmə bacarığı olan, lakin data analitikasına keçid etmək istəyən hər kəs üçün uyğundur — əvvəlcədən proqramlaşdırma təcrübəsi tələb olunmur.',
  'Suited to anyone comfortable with basic spreadsheet work who wants to move into data analytics as a career — no prior programming experience required.',
  'Подходит всем, кто уверенно работает с таблицами и хочет перейти в аналитику данных как профессию — предварительный опыт программирования не требуется.',
  'Excel: data hazırlığı və analitik əsaslar.
SQL: verilənlər bazası sorğuları və aqreqasiya.
Power BI: hesabat və dashboard qurulması.
Python: irəliləmiş təhlil və yekun layihə.',
  'Excel: data preparation and analytical foundations.
SQL: database querying and aggregation.
Power BI: report and dashboard construction.
Python: advanced analysis and a final capstone project.',
  'Excel: подготовка данных и аналитические основы.
SQL: запросы к базам данных и агрегация.
Power BI: построение отчётов и дашбордов.
Python: углублённый анализ и финальный проект.',
  450, 800, 'AZN', 20, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'data-elmi-bootcamp',
  'Data Elmi Bootcamp',
  'Data Science Bootcamp',
  'Бутлагерь по Data Science',
  'SQL, data vizualizasiyası, Python, Machine Learning, Deep Learning və Generativ AI-ni əhatə edən qabaqcıl proqram.',
  'An advanced program spanning SQL, data visualization, Python, Machine Learning, Deep Learning, and Generative AI.',
  'Продвинутая программа, объединяющая SQL, визуализацию данных, Python, Machine Learning, Deep Learning и генеративный ИИ.',
  'Data Elmi Bootcamp Data Analitika Bootcamp-in məntiqi davamıdır, lakin daha dərin və daha texnikidir. Burada artıq mövcud verilənləri başa düşməkdən kifayətlənmir, gələcəyi proqnozlaşdıran və qərarları avtomatlaşdıran modellər qurmağı öyrənirsiniz. SQL və vizualizasiya ilə möhkəm təməl qoyduqdan sonra, Python-da maşın öyrənməsi alqoritmlərinə, daha sonra neyron şəbəkələrə əsaslanan dərin öyrənməyə keçirsiniz və proqramı bugünün ən aktual sahəsi olan generativ süni intellekt ilə tamamlayırsınız. Bu, nəzəri kurs deyil — hər mərhələdə real data üzərində model qurur, sınaqdan keçirir və nəticələrini şərh edirsiniz.',
  'The Data Science Bootcamp is the logical continuation of the Data Analytics Bootcamp, but deeper and more technical. Here you move beyond understanding existing data into building models that predict outcomes and automate decisions. After establishing a solid foundation in SQL and visualization, you progress through machine learning algorithms in Python, then into deep learning built on neural networks, and complete the program with generative AI — one of the most active areas in the field right now. This is not a theory course: at every stage you build models on real data, test them, and learn to interpret what they actually tell you.',
  'Bootcamp по Data Science — логическое продолжение Bootcamp по аналитике данных, но глубже и более техническое. Здесь вы переходите от понимания существующих данных к построению моделей, которые прогнозируют результаты и автоматизируют решения. После прочной базы в SQL и визуализации вы переходите к алгоритмам машинного обучения на Python, затем к глубокому обучению на основе нейронных сетей и завершаете программу генеративным ИИ — одной из самых актуальных областей сегодня. Это не теоретический курс: на каждом этапе вы строите модели на реальных данных, тестируете их и учитесь интерпретировать результаты.',
  'Data analitikasında əsas bilikləri olan və karyerasını maşın öyrənməsi və süni intellekt istiqamətində qurmaq istəyən namizədlər üçündür.',
  'Designed for candidates with foundational data analytics knowledge who want to build a career in machine learning and artificial intelligence.',
  'Предназначен для кандидатов с базовыми знаниями в аналитике данных, которые хотят строить карьеру в машинном обучении и искусственном интеллекте.',
  'SQL və vizualizasiya: təkrar və möhkəmləndirmə.
Python: maşın öyrənməsi alqoritmləri.
Deep Learning: neyron şəbəkələrinin əsasları.
Generativ AI: müasir modellər və tətbiqləri.',
  'SQL and visualization: review and reinforcement.
Python: machine learning algorithms.
Deep Learning: neural network foundations.
Generative AI: modern models and applications.',
  'SQL и визуализация: повторение и закрепление.
Python: алгоритмы машинного обучения.
Deep Learning: основы нейронных сетей.
Генеративный ИИ: современные модели и их применение.',
  750, 1400, 'AZN', 26, null, true
from categories where slug = 'data-science';

-- ============================================
-- STANDALONE COURSES
-- ============================================

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'sql-telimi',
  'SQL təlimi',
  'SQL Training',
  'Обучение SQL',
  'Verilənlər bazalarından düzgün sual qoymağı və böyük data dəstlərini etibarlı şəkildə işləməyi öyrədən praktiki kurs.',
  'A practical course in asking the right questions of databases and working reliably with large datasets.',
  'Практический курс, который учит правильно «спрашивать» базы данных и надёжно работать с большими объёмами данных.',
  'SQL, demək olar ki, hər data vəzifəsinin arxasında dayanan dildir — analitik, mühasib, marketinq mütəxəssisi və ya menecer olmağınızdan asılı olmayaraq. Bu kursda nəzəriyyəyə deyil, real iş ssenarilərinə fokuslanırıq: bir neçə cədvəl arasında düzgün əlaqə qurmaq, lazımsız sətirləri süzgəcdən keçirmək, böyük data dəstlərini yekunlaşdırmaq. Kursun sonunda istənilən verilənlər bazası qarşısında özünüzü sərbəst hiss edəcəksiniz.',
  'SQL is, in practice, the language behind almost every data role — whether you are an analyst, accountant, marketer, or manager. This course is built around real working scenarios rather than abstract theory: joining tables correctly, filtering out the noise, summarizing large datasets into something useful. By the end, you will feel comfortable sitting down in front of any unfamiliar database.',
  'SQL — это, по сути, язык, стоящий за почти любой работой с данными, будь вы аналитиком, бухгалтером, маркетологом или руководителем. Курс построен вокруг реальных рабочих сценариев, а не абстрактной теории: правильное соединение таблиц, отсеивание ненужного, сведение больших массивов данных в нечто полезное. К концу курса вы будете уверенно чувствовать себя перед любой незнакомой базой данных.',
  'Data ilə işləyən, lakin hələ verilənlər bazasına birbaşa sorğu yazmağı bilməyən analitik, mühasib və ya menecerlər üçün uyğundur.',
  'Suited to analysts, accountants, or managers who work with data but don''t yet know how to query a database directly.',
  'Подходит аналитикам, бухгалтерам и руководителям, которые работают с данными, но пока не умеют напрямую обращаться к базе данных.',
  'Sorğu yazma əsasları və filtrasiya.
Cədvəllər arası əlaqələr.
Aqreqasiya və qruplaşdırma.
Praktiki layihə üzərində tətbiq.',
  'Query writing fundamentals and filtering.
Relationships across tables.
Aggregation and grouping.
Applied practice on a real-style project.',
  'Основы написания запросов и фильтрация.
Связи между таблицами.
Агрегация и группировка.
Практика на реалистичном проекте.',
  170, 280, 'AZN', 8, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'power-bi-telimi',
  'Power BI təlimi',
  'Power BI Training',
  'Обучение Power BI',
  'Rəqəmləri rəhbərliyin bir baxışda anlayacağı dashboard və hesabatlara çevirməyi öyrədən kurs.',
  'A course in turning raw numbers into dashboards and reports that leadership can understand at a glance.',
  'Курс о том, как превращать сырые цифры в дашборды и отчёты, понятные руководству с первого взгляда.',
  'Yaxşı bir dashboard sadəcə gözəl qrafiklər deyil — düzgün sualı düzgün şəkildə cavablandıran vizual hekayədir. Bu kursda Power BI-ın texniki tərəflərini (data modelləşdirmə, hesablamalar, əlaqələr) öyrədirik, amma əsl diqqəti nəyin nə vaxt göstərilməli olduğuna, hansı qrafikin hansı mesajı daha yaxşı çatdırdığına veririk. Nəticədə yaratdığınız hesabatlar rəflərdə tozlanmayacaq, real qərarlarda istifadə olunacaq.',
  'A good dashboard is not just attractive charts — it is a visual story that answers the right question in the right way. This course covers the technical side of Power BI (data modeling, calculations, relationships), but the real focus is on what to show and when, and which chart actually communicates which message. The reports you build will not sit unused — they will get used in real decisions.',
  'Хороший дашборд — это не просто красивые графики, а визуальная история, которая отвечает на правильный вопрос правильным образом. Курс охватывает техническую сторону Power BI (моделирование данных, вычисления, связи), но основной акцент — на том, что и когда показывать, какой график доносит какое сообщение. Созданные вами отчёты не будут лежать без дела — ими будут реально пользоваться при принятии решений.',
  'Excel-də rahat işləyən, lakin hesabatlarını daha peşəkar və interaktiv formaya salmaq istəyən analitik və menecerlər üçündür.',
  'Suited to analysts and managers comfortable in Excel who want to present their reporting in a more professional, interactive way.',
  'Подходит аналитикам и руководителям, уверенно работающим в Excel, которые хотят представлять отчётность более профессионально и интерактивно.',
  'Data modelləşdirmə və əlaqələr.
Hesablamalar və ölçülər.
Hesabat dizaynı və interaktivlik.
Yekun dashboard layihəsi.',
  'Data modeling and relationships.
Calculations and measures.
Report design and interactivity.
Final dashboard project.',
  'Моделирование данных и связи.
Вычисления и меры.
Дизайн отчётов и интерактивность.
Финальный проект дашборда.',
  180, 300, 'AZN', 10, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'data-vizualizasiyasi-tableau',
  'Tableau ilə Data Vizualizasiyası',
  'Data Visualization with Tableau',
  'Визуализация данных в Tableau',
  'Tableau vasitəsilə mürəkkəb data dəstlərini hər kəsin başa düşəcəyi vizual hekayələrə çevirməyi öyrədən kurs.',
  'A course in turning complex datasets into visual stories that anyone in the room can follow, using Tableau.',
  'Курс о превращении сложных массивов данных в визуальные истории, понятные любому слушателю, с помощью Tableau.',
  'Data vizualizasiyası sadəcə proqram bacarığı deyil, ünsiyyət bacarığıdır. Bu kursda Tableau-nun texniki imkanlarını öyrənməklə yanaşı, hansı vizual formatın hansı növ məlumatı ən yaxşı izah etdiyini, izləyicinin diqqətini necə düzgün istiqamətə yönəltməyi də mənimsəyirsiniz. Real data dəstləri üzərində işləyərək, son nəticədə təqdimat otağında inamla dura biləcəyiniz dashboard-lar yaradırsınız.',
  'Data visualization is not just a software skill — it is a communication skill. Alongside Tableau''s technical capabilities, this course teaches you which visual format best explains which type of information, and how to direct a viewer''s attention where it actually needs to go. Working with realistic datasets throughout, you finish with dashboards you can stand behind confidently in a presentation room.',
  'Визуализация данных — это не только техническое умение, но и навык коммуникации. Помимо технических возможностей Tableau, курс учит, какой визуальный формат лучше объясняет тот или иной тип данных, и как направлять внимание зрителя именно туда, куда нужно. Работая с реалистичными данными, вы выходите с дашбордами, с которыми уверенно можно выступить перед аудиторией.',
  'Data ilə işləyən, lakin nəticələrini inandırıcı və vizual formada təqdim etməkdə çətinlik çəkən hər kəs üçündür.',
  'Suited to anyone who works with data but struggles to present findings in a compelling, visual way.',
  'Подходит всем, кто работает с данными, но испытывает трудности с убедительной визуальной презентацией результатов.',
  'Data bağlantısı və əsas qrafiklər.
Hesablanmış sahələr.
Dashboard dizaynı və filtrlər.
Yekun təqdimat layihəsi.',
  'Connecting data sources and basic chart types.
Calculated fields.
Dashboard design and filters.
Final presentation project.',
  'Подключение источников данных и базовые графики.
Вычисляемые поля.
Дизайн дашборда и фильтры.
Финальный проект презентации.',
  180, 300, 'AZN', 8, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'r-ile-data-analitikasi',
  'R ilə Data Analitikası',
  'Data Analytics with R',
  'Аналитика данных на R',
  'Statistik təhlilin akademik və tədqiqat dünyasında ən çox güvənilən dili olan R-i praktiki şəkildə öyrədən kurs.',
  'A practical course in R, the language statisticians and researchers trust most for rigorous analysis.',
  'Практический курс по R — языку, которому больше всего доверяют статистики и исследователи для строгого анализа.',
  'R, xüsusilə statistik dəqiqliyin önəmli olduğu sahələrdə (tədqiqat, səhiyyə, sosial elmlər, maliyyə təhlili) seçilən dildir. Bu kursda R-in sintaksisini əzbərləməkdən çox, real data üzərində düzgün statistik sual qoymağı və nəticələri düzgün şərh etməyi öyrədirik. ggplot2 ilə vizual təqdimat bacarığı da proqramın ayrılmaz hissəsidir.',
  'R is the language of choice wherever statistical rigor genuinely matters — research, healthcare, social science, financial analysis. Rather than memorizing syntax, this course focuses on asking the right statistical question of real data and correctly interpreting what comes back. Visual presentation skill with ggplot2 is a core part of the program, not an afterthought.',
  'R — язык, который выбирают там, где статистическая строгость действительно важна: исследования, здравоохранение, социальные науки, финансовый анализ. Вместо механического изучения синтаксиса курс учит задавать правильный статистический вопрос реальным данным и корректно интерпретировать результат. Визуализация с помощью ggplot2 — неотъемлемая часть программы, а не дополнение.',
  'Tədqiqat, səhiyyə və ya sosial elmlər sahəsində çalışan və statistik təhlil bacarığını möhkəmləndirmək istəyənlər üçündür.',
  'Suited to those working in research, healthcare, or social sciences who want to strengthen their statistical analysis skills.',
  'Подходит тем, кто работает в исследованиях, здравоохранении или социальных науках и хочет укрепить навыки статистического анализа.',
  'R-in əsasları və data strukturları.
ggplot2 ilə vizualizasiya.
Statistik test üsulları.
Tətbiqi yekun layihə.',
  'R fundamentals and data structures.
Visualization with ggplot2.
Statistical testing methods.
Applied final project.',
  'Основы R и структуры данных.
Визуализация с ggplot2.
Методы статистического тестирования.
Прикладной финальный проект.',
  190, 320, 'AZN', 10, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'machine-learning-telimi',
  'Machine Learning təlimi',
  'Machine Learning Training',
  'Обучение Machine Learning',
  'Verilənlərdən öyrənən və proqnoz verən modellər qurmağı öyrədən, riyazi nəzəriyyə ilə praktiki tətbiqi birləşdirən kurs.',
  'A course in building models that learn from data and make predictions, balancing the underlying theory with hands-on application.',
  'Курс по созданию моделей, которые обучаются на данных и делают прогнозы, сочетая теорию с практическим применением.',
  'Machine Learning-i öyrənmək riyazi formullar əzbərləməkdən ibarət deyil — hansı modelin hansı problemə uyğun olduğunu, nəyin işləyib nəyin işləmədiyini başa düşməkdir. Bu kursda Python üzərində əsas alqoritmləri praktiki şəkildə qururuq, modellərin nəticələrini necə qiymətləndirməyi və real layihələrdə tez-tez rast gəlinən səhvlərdən necə yayınmağı öyrədirik.',
  'Learning machine learning is not about memorizing formulas — it is about understanding which model fits which problem, and recognizing when something actually works versus when it just looks like it does. This course builds core algorithms hands-on in Python, teaches you to properly evaluate model performance, and covers the mistakes that most commonly derail real-world projects.',
  'Изучение Machine Learning — это не запоминание формул, а понимание того, какая модель подходит для какой задачи, и умение отличить реально работающее решение от того, что лишь выглядит таковым. Курс строит базовые алгоритмы на практике на Python, учит корректно оценивать качество моделей и разбирает ошибки, чаще всего губящие реальные проекты.',
  'Python və əsas statistika bilikləri olan, analitik bacarıqlarını proqnozlaşdırıcı modelləşdirməyə doğru genişləndirmək istəyənlər üçündür.',
  'Suited to those with Python and basic statistics knowledge who want to extend their analytical skills into predictive modeling.',
  'Подходит тем, кто владеет Python и базовой статистикой и хочет развить аналитические навыки в сторону прогнозного моделирования.',
  'Nəzarətli öyrənmə əsasları.
Model qiymətləndirməsi.
Praktiki alqoritmlər və tətbiq.
Yekun proqnozlaşdırma layihəsi.',
  'Supervised learning foundations.
Model evaluation.
Practical algorithms and application.
Final predictive modeling project.',
  'Основы обучения с учителем.
Оценка моделей.
Практические алгоритмы и применение.
Финальный проект прогнозного моделирования.',
  220, 380, 'AZN', 12, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'deep-learning-telimi',
  'Deep Learning təlimi',
  'Deep Learning Training',
  'Обучение Deep Learning',
  'Neyron şəbəkələrinin necə işlədiyini və hansı növ problemlərdə klassik Machine Learning-dən üstün olduğunu öyrədən kurs.',
  'A course in how neural networks actually work, and where they genuinely outperform classical machine learning.',
  'Курс о том, как реально работают нейронные сети и в каких задачах они действительно превосходят классический Machine Learning.',
  'Deep Learning, klassik Machine Learning-in sadəcə daha mürəkkəb versiyası deyil — şəkil, mətn və səs kimi strukturlaşdırılmamış data ilə işləmək üçün fərqli bir yanaşmadır. Bu kursda neyron şəbəkələrinin daxili məntiqini başa düşməyə fokuslanırıq: nə üçün işləyir, nə vaxt uğursuz olur və real layihədə hansı arxitektura seçimi düzgündür. Praktiki tapşırıqlar TensorFlow və ya PyTorch əsasında qurulur.',
  'Deep learning is not simply a more complicated version of classical machine learning — it is a different approach suited to unstructured data like images, text, and audio. This course focuses on genuinely understanding what is happening inside a neural network: why it works, when it fails, and how to choose the right architecture for a real project. Practical work is built on TensorFlow or PyTorch.',
  'Deep Learning — не просто более сложная версия классического Machine Learning, а иной подход, рассчитанный на неструктурированные данные: изображения, текст, звук. Курс сосредоточен на реальном понимании того, что происходит внутри нейронной сети: почему она работает, когда даёт сбой и как выбрать правильную архитектуру для реального проекта. Практика строится на TensorFlow или PyTorch.',
  'Machine Learning əsaslarını bilən və şəkil, mətn kimi mürəkkəb data növləri ilə işləməyə keçid etmək istəyənlər üçündür.',
  'Suited to those with machine learning fundamentals who want to move into working with complex data types like images and text.',
  'Подходит тем, кто владеет основами Machine Learning и хочет перейти к работе со сложными типами данных — изображениями, текстом.',
  'Neyron şəbəkələrinin əsasları.
Arxitektura seçimi prinsipləri.
Praktiki model qurulması.
Yekun tətbiqi layihə.',
  'Neural network fundamentals.
Principles of architecture selection.
Practical model building.
Final applied project.',
  'Основы нейронных сетей.
Принципы выбора архитектуры.
Практическое построение моделей.
Финальный прикладной проект.',
  260, 450, 'AZN', 14, null, true
from categories where slug = 'data-science';

insert into courses (
  category_id, slug, title_az, title_en, title_ru,
  description_az, description_en, description_ru,
  long_description_az, long_description_en, long_description_ru,
  who_for_az, who_for_en, who_for_ru,
  syllabus_az, syllabus_en, syllabus_ru,
  price_amount, original_price_amount, price_currency, duration_weeks, level, is_published
)
select id,
  'generativ-ai-telimi',
  'Generativ AI təlimi',
  'Generative AI Training',
  'Обучение генеративному ИИ',
  'Müasir generativ modellərin necə işlədiyini və bunları real biznes problemlərinə tətbiq etməyi öyrədən aktual kurs.',
  'A current course in how modern generative models work, and how to apply them to genuine business problems.',
  'Актуальный курс о том, как работают современные генеративные модели и как применять их к реальным бизнес-задачам.',
  'Generativ AI sahəsi sürətlə dəyişir, ona görə də bu kurs tək bir modelin texniki təfərrüatlarından çox, davamlı dəyişən bu sahədə özünüzü necə oriyentasiya etməyi öyrətməyə fokuslanır. Böyük dil modellərinin necə işlədiyini, onlardan biznes problemlərinin həllində necə düzgün istifadə etməyi və məhdudiyyətlərini realist şəkildə qiymətləndirməyi öyrənirsiniz. Kurs nəzəri deyil — real tapşırıqlar üzərində bu alətləri tətbiq edirsiniz.',
  'The field of generative AI moves quickly, so this course focuses less on the fine technical details of any one model and more on building the judgment to navigate a fast-changing space. You learn how large language models actually work, how to apply them properly to business problems, and how to realistically assess their limitations. The course is hands-on, not theoretical — you apply these tools to real tasks throughout.',
  'Область генеративного ИИ быстро меняется, поэтому курс сосредоточен не столько на технических деталях конкретной модели, сколько на умении ориентироваться в постоянно меняющейся области. Вы узнаёте, как реально работают большие языковые модели, как правильно применять их к бизнес-задачам и как реалистично оценивать их ограничения. Курс практический, а не теоретический — вы применяете эти инструменты к реальным задачам на протяжении всего обучения.',
  'Machine Learning və ya Deep Learning əsaslarına yiyələnmiş, sahənin ən aktual istiqamətinə keçid etmək istəyənlər üçündür.',
  'Suited to those with machine learning or deep learning fundamentals who want to move into the field''s most current direction.',
  'Подходит тем, кто владеет основами Machine Learning или Deep Learning и хочет перейти к самому актуальному направлению отрасли.',
  'Böyük dil modellərinin əsasları.
Tətbiq strategiyaları.
Məhdudiyyətlərin qiymətləndirilməsi.
Praktiki yekun layihə.',
  'Large language model fundamentals.
Application strategies.
Assessing limitations.
Practical final project.',
  'Основы больших языковых моделей.
Стратегии применения.
Оценка ограничений.
Практический финальный проект.',
  280, 480, 'AZN', 10, null, true
from categories where slug = 'data-science';

-- Enrich the existing Data Analytics with Python course with the same
-- depth as the new additions (it only had a short description before).
update courses set
  long_description_az = 'Python, data analitikasında ən geniş istifadə olunan proqramlaşdırma dilidir, çünki sürətli, oxunaqlı və böyük data dəstləri üçün xüsusi qurulmuş kitabxanalara malikdir. Bu kursda Python-u ümumi proqramlaşdırma dili kimi deyil, analitik alət kimi öyrədirik: data təmizləmə, transformasiya, vizual təqdimat və real ssenarilər üzərində tətbiqi təhlil. Kodlaşdırma təcrübəniz olmasa belə, kurs sizi addım-addım inamlı səviyyəyə çatdırır.',
  long_description_en = 'Python is the most widely used language in data analytics because it is fast to learn, easy to read, and backed by libraries built specifically for large datasets. This course teaches Python as an analytical tool, not as general-purpose programming: data cleaning, transformation, visual presentation, and applied analysis on realistic scenarios. No prior coding experience is assumed — the course builds your confidence step by step.',
  long_description_ru = 'Python — самый распространённый язык в аналитике данных, поскольку он быстро осваивается, легко читается и опирается на библиотеки, созданные специально для больших объёмов данных. Курс рассматривает Python как аналитический инструмент, а не как язык программирования общего назначения: очистка данных, преобразование, визуальное представление и прикладной анализ на реалистичных сценариях. Опыт программирования не требуется — курс выстраивает уверенность постепенно.',
  who_for_az = 'Excel-dən kənara çıxıb data analitikasını daha güclü alətlərlə aparmaq istəyən, lakin proqramlaşdırma təcrübəsi olmayan namizədlər üçündür.',
  who_for_en = 'Suited to candidates who want to move beyond Excel into more powerful analytical tools, with no programming background required.',
  who_for_ru = 'Подходит тем, кто хочет выйти за пределы Excel и перейти к более мощным аналитическим инструментам, без опыта программирования.',
  syllabus_az = 'Python əsasları və data strukturları.
pandas ilə data təmizləmə və transformasiya.
Vizual təqdimat.
Tətbiqi yekun layihə.',
  syllabus_en = 'Python fundamentals and data structures.
Data cleaning and transformation with pandas.
Visual presentation.
Applied final project.',
  syllabus_ru = 'Основы Python и структуры данных.
Очистка и преобразование данных с помощью pandas.
Визуальное представление.
Прикладной финальный проект.',
  level = null
where slug = 'data-analytics-with-python';
