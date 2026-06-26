-- Rich content update: Computer Skills category

update courses set
  long_description_en = 'A hands-on Excel course that takes you from basic formulas to real analytical workflows. We focus on what people actually use at work: data cleaning, pivot tables, lookup functions, and building dashboards that don''t fall apart when someone adds a row. By the end, you''ll be the person colleagues ask for help with spreadsheets, not the other way around.',
  long_description_az = 'Sizi əsas formullardan real analitik iş axınlarına aparan praktiki Excel kursu. İnsanların işdə həqiqətən istifadə etdiyi şeylərə fokuslanırıq: data təmizləmə, pivot cədvəllər, axtarış funksiyaları və kim sətir əlavə etsə dağılmayan dashboard-lar yaratmaq. Kursun sonunda həmkarlarınızın cədvəllər üçün kömək istədiyi insan olacaqsınız, əksinə yox.',
  long_description_ru = 'Практический курс Excel, который проведёт вас от базовых формул до реальных аналитических рабочих процессов. Мы фокусируемся на том, что люди действительно используют на работе: очистка данных, сводные таблицы, функции поиска и создание дашбордов, которые не разваливаются при добавлении новой строки. К концу курса коллеги будут обращаться за помощью к вам, а не наоборот.',
  syllabus_en = 'Beginner: Navigation, formulas, basic formatting, simple charts.
Intermediate: Lookup functions (VLOOKUP, INDEX/MATCH), conditional formatting, pivot tables.
Advanced: Dynamic dashboards, data validation, intro to macros and automation basics.',
  syllabus_az = 'Beginner: Naviqasiya, formullar, əsas formatlaşdırma, sadə qrafiklər.
İntermediate: Axtarış funksiyaları (VLOOKUP, INDEX/MATCH), şərti formatlaşdırma, pivot cədvəllər.
Advanced: Dinamik dashboard-lar, data validasiyası, makrolara giriş və avtomatlaşdırma əsasları.',
  syllabus_ru = 'Beginner: Навигация, формулы, базовое форматирование, простые графики.
Intermediate: Функции поиска (VLOOKUP, INDEX/MATCH), условное форматирование, сводные таблицы.
Advanced: Динамические дашборды, проверка данных, введение в макросы и основы автоматизации.'
where slug = 'excel-training';

update courses set
  long_description_en = 'A complete office productivity course covering Word, Excel, and PowerPoint together — the way you actually use them in a real job, moving between documents, spreadsheets, and presentations on the same project. Ideal if you''re starting a new role or want a genuinely solid foundation across all three tools instead of learning them separately and disconnected.',
  long_description_az = 'Word, Excel və PowerPoint-i birlikdə əhatə edən tam ofis məhsuldarlığı kursu — eyni layihə üzərində sənədlər, cədvəllər və təqdimatlar arasında həqiqətən necə istifadə etdiyiniz şəkildə. Yeni vəzifəyə başlayırsınızsa və ya bu üç aləti ayrı-ayrılıqda öyrənmək əvəzinə həqiqətən möhkəm təməl istəyirsinizsə, idealdır.',
  long_description_ru = 'Полный курс офисной продуктивности, охватывающий Word, Excel и PowerPoint вместе — именно так, как вы их используете в реальной работе, переключаясь между документами, таблицами и презентациями в рамках одного проекта. Идеально, если вы начинаете новую должность или хотите по-настоящему прочную базу по всем трём инструментам, а не отдельные несвязанные знания.',
  syllabus_en = 'Weeks 1-4: Word — document structure, styles, templates, mail merge.
Weeks 5-8: Excel — formulas, tables, basic charts and data organization.
Weeks 9-12: PowerPoint — slide design, transitions, combining content from Word and Excel into presentations.',
  syllabus_az = 'Həftə 1-4: Word — sənəd strukturu, üslublar, şablonlar, mail merge.
Həftə 5-8: Excel — formullar, cədvəllər, əsas qrafiklər və data təşkili.
Həftə 9-12: PowerPoint — slayd dizaynı, keçidlər, Word və Excel-dən məzmunu təqdimatlara birləştirmək.',
  syllabus_ru = 'Недели 1-4: Word — структура документа, стили, шаблоны, слияние почты.
Недели 5-8: Excel — формулы, таблицы, базовые графики и организация данных.
Недели 9-12: PowerPoint — дизайн слайдов, переходы, объединение контента из Word и Excel в презентации.'
where slug = 'microsoft-office-training';

update courses set
  long_description_en = 'Move beyond default templates and learn to design presentations that actually hold attention. We cover visual hierarchy, slide pacing, working with images and data visually, and how to present without reading your slides word for word. By the end you''ll have a personal template you can reuse for any future presentation.',
  long_description_az = 'Standart şablonlardan kənara çıxın və həqiqətən diqqəti cəlb edən təqdimatlar dizayn etməyi öyrənin. Vizual iyerarxiya, slayd tempini, şəkillər və data ilə vizual işləməyi və slaydları sözbəsöz oxumadan təqdim etməyi əhatə edirik. Kursun sonunda gələcək hər hansı təqdimat üçün təkrar istifadə edə biləcəyiniz şəxsi şablonunuz olacaq.',
  long_description_ru = 'Выйдите за рамки стандартных шаблонов и научитесь создавать презентации, которые действительно удерживают внимание. Мы рассматриваем визуальную иерархию, темп слайдов, визуальную работу с изображениями и данными, а также как презентовать без чтения слайдов слово в слово. К концу курса у вас будет личный шаблон для любой будущей презентации.',
  syllabus_en = 'Week 1: Visual hierarchy and slide structure basics.
Week 2: Working with images, icons, and data visualization.
Week 3: Presenting techniques — pacing, transitions, audience engagement.
Week 4: Building and finalizing your personal template.',
  syllabus_az = 'Həftə 1: Vizual iyerarxiya və slayd strukturu əsasları.
Həftə 2: Şəkillər, ikonlar və data vizualizasiyası ilə iş.
Həftə 3: Təqdimat texnikaları — temp, keçidlər, auditoriya ilə əlaqə.
Həftə 4: Şəxsi şablonunuzun yaradılması və yekunlaşdırılması.',
  syllabus_ru = 'Неделя 1: Визуальная иерархия и основы структуры слайдов.
Неделя 2: Работа с изображениями, иконками и визуализацией данных.
Неделя 3: Техники презентации — темп, переходы, вовлечение аудитории.
Неделя 4: Создание и финализация личного шаблона.'
where slug = 'powerpoint-training';

update courses set
  long_description_en = 'Practical Word skills focused on documents people actually need to produce: reports, CVs, formal letters, and structured long documents with tables of contents and consistent formatting. You''ll leave knowing how to make a document look professional without fighting the formatting the whole time.',
  long_description_az = 'İnsanların həqiqətən hazırlamalı olduğu sənədlərə fokuslanan praktiki Word bacarıqları: hesabatlar, CV-lər, rəsmi məktublar və məzmun cədvəli ilə strukturlaşdırılmış uzun sənədlər. Kursdan formatlaşdırma ilə daim mübarizə aparmadan sənədi peşəkar göstərməyi bilərək çıxacaqsınız.',
  long_description_ru = 'Практические навыки Word, ориентированные на документы, которые людям действительно нужно создавать: отчёты, резюме, официальные письма и структурированные длинные документы с содержанием и единообразным форматированием. Вы научитесь делать документ профессиональным без постоянной борьбы с форматированием.',
  syllabus_en = 'Week 1: Document structure, styles, and consistent formatting.
Week 2: Tables, tables of contents, headers and footers.
Week 3: Templates for CVs, letters, and reports.
Week 4: Long-document management — sections, page breaks, final polish.',
  syllabus_az = 'Həftə 1: Sənəd strukturu, üslublar və ardıcıl formatlaşdırma.
Həftə 2: Cədvəllər, məzmun cədvəli, yuxarı və aşağı sərlövhələr.
Həftə 3: CV, məktub və hesabatlar üçün şablonlar.
Həftə 4: Uzun sənəd idarəetməsi — bölmələr, səhifə kəsmələri, son cilalama.',
  syllabus_ru = 'Неделя 1: Структура документа, стили и единообразное форматирование.
Неделя 2: Таблицы, содержание, верхние и нижние колонтитулы.
Неделя 3: Шаблоны для резюме, писем и отчётов.
Неделя 4: Управление длинными документами — разделы, разрывы страниц, финальная отшлифовка.'
where slug = 'word-training';
