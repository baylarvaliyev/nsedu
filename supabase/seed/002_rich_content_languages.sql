-- Rich content update: Languages category
-- Long descriptions, syllabi (week-by-week structure as readable text)

update courses set
  long_description_en = 'Our General English program is built around real communication, not just grammar drills. You''ll work through structured levels from A1 (beginner) to C2 (proficiency), with small group classes that focus on speaking confidence, practical vocabulary, and the grammar you actually need to use it correctly. Each level runs for 12 weeks, with continuous assessment so you always know where you stand.',
  long_description_az = 'General English proqramımız sadəcə qrammatika məşğələləri deyil, real ünsiyyət ətrafında qurulub. A1 (başlanğıc) səviyyəsindən C2 (sərbəst istifadə) səviyyəsinə qədər strukturlaşdırılmış səviyyələr üzrə işləyəcəksiniz. Kiçik qruplarda dərslər danışıq bacarığına, praktiki lüğətə və düzgün istifadə üçün lazım olan qrammatikaya fokuslanır. Hər səviyyə 12 həftə davam edir, davamlı qiymətləndirmə ilə harada olduğunuzu hər zaman bilirsiniz.',
  long_description_ru = 'Наша программа General English построена вокруг реального общения, а не только грамматических упражнений. Вы пройдёте через структурированные уровни от A1 (начальный) до C2 (свободное владение), в небольших группах с фокусом на уверенность в речи, практическую лексику и грамматику, которая действительно нужна для правильного использования. Каждый уровень длится 12 недель с постоянной оценкой прогресса.',
  syllabus_en = 'Weeks 1-3: Foundations — core grammar structures, everyday vocabulary, pronunciation basics.
Weeks 4-6: Speaking confidence — guided conversation practice, listening comprehension with real audio.
Weeks 7-9: Functional English — writing emails, describing experiences, expressing opinions.
Weeks 10-12: Consolidation and assessment — mock conversations, level-up exam, personalized feedback.',
  syllabus_az = 'Həftə 1-3: Əsaslar — əsas qrammatik strukturlar, gündəlik lüğət, tələffüz əsasları.
Həftə 4-6: Danışıq inamı — istiqamətli danışıq məşqi, real audio ilə dinləmə bacarığı.
Həftə 7-9: Funksional İngilis dili — e-poçt yazmaq, təcrübələri təsvir etmək, fikir bildirmək.
Həftə 10-12: Möhkəmləndirmə və qiymətləndirmə — sınaq danışıqları, səviyyə imtahanı, fərdi rəy.',
  syllabus_ru = 'Недели 1-3: Основы — базовые грамматические структуры, повседневная лексика, основы произношения.
Недели 4-6: Уверенность в речи — практика разговора, аудирование с реальными материалами.
Недели 7-9: Функциональный английский — написание писем, описание опыта, выражение мнения.
Недели 10-12: Закрепление и оценка — пробные разговоры, экзамен уровня, индивидуальная обратная связь.'
where slug = 'general-english-groups';

update courses set
  long_description_en = 'A focused, exam-specific program designed to get you the score you need. We cover all four IELTS components — Listening, Reading, Writing, and Speaking — with strategies specific to the exam format, not just general English improvement. You''ll do timed practice tests under real exam conditions and get detailed feedback on your Writing and Speaking, which are the two sections where most students lose easy points.',
  long_description_az = 'Lazım olan balı əldə etmək üçün hədəflənmiş, imtahana xüsusi proqram. IELTS-in bütün dörd komponentini — Dinləmə, Oxuma, Yazı və Danışıq — əhatə edirik, sadəcə ümumi İngilis dili təkmilləşdirməsi deyil, imtahan formatına xüsusi strategiyalarla. Real imtahan şərtləri altında vaxtlı sınaq testləri keçəcəksiniz və əksər tələbələrin asan bal itirdiyi iki bölmə olan Yazı və Danışıq üzrə ətraflı rəy alacaqsınız.',
  long_description_ru = 'Целенаправленная программа подготовки именно к экзамену, чтобы вы получили нужный балл. Мы охватываем все четыре компонента IELTS — Listening, Reading, Writing и Speaking — со стратегиями, специфичными для формата экзамена, а не просто общим улучшением английского. Вы будете проходить пробные тесты в реальных условиях экзамена и получать подробную обратную связь по Writing и Speaking — двум разделам, где большинство студентов теряют лёгкие баллы.',
  syllabus_en = 'Weeks 1-2: Exam format deep-dive — understanding band scores, common mistakes, time management.
Weeks 3-5: Listening & Reading strategies — skimming, scanning, question-type-specific techniques.
Weeks 6-7: Writing Task 1 & 2 — structure, common templates, and how to avoid them sounding robotic.
Week 8: Speaking practice and full mock exam — timed, scored, with individual feedback session.',
  syllabus_az = 'Həftə 1-2: İmtahan formatına dərin baxış — bal sistemi, ümumi səhvlər, vaxt idarəetməsi.
Həftə 3-5: Dinləmə və Oxuma strategiyaları — sürətli oxuma, axtarış texnikaları, sual növünə uyğun üsullar.
Həftə 6-7: Yazı Task 1 və 2 — struktur, ümumi şablonlar və onların robot kimi səslənməsinin qarşısını almaq.
Həftə 8: Danışıq məşqi və tam sınaq imtahanı — vaxtlı, qiymətləndirilmiş, fərdi rəy seansı ilə.',
  syllabus_ru = 'Недели 1-2: Глубокий разбор формата экзамена — система баллов, частые ошибки, управление временем.
Недели 3-5: Стратегии Listening и Reading — скимминг, сканирование, техники по типам вопросов.
Недели 6-7: Writing Task 1 и 2 — структура, шаблоны и как избежать «роботизированного» звучания.
Неделя 8: Практика Speaking и полный пробный экзамен — с таймером, оценкой и индивидуальной обратной связью.'
where slug = 'ielts';

update courses set
  long_description_en = 'A relaxed, low-pressure space to actually use the English you already know. No grammar lectures — just guided discussion on real topics (news, culture, work, everyday life) with a facilitator who keeps the conversation moving and corrects gently along the way. Great for people who understand English well but freeze up when they need to speak it.',
  long_description_az = 'Artıq bildiyiniz İngilis dilini həqiqətən istifadə etmək üçün rahat, təzyiqsiz məkan. Qrammatika dərsi yox — sadəcə real mövzular (xəbərlər, mədəniyyət, iş, gündəlik həyat) ətrafında istiqamətli müzakirə, söhbəti davam etdirən və yumşaq şəkildə düzəlişlər edən fasilitator ilə. İngiliscəni yaxşı başa düşən, amma danışmaq lazım olanda donub qalan insanlar üçün əla seçim.',
  long_description_ru = 'Спокойное, непринуждённое пространство, чтобы по-настоящему использовать тот английский, который вы уже знаете. Никаких лекций по грамматике — только направленное обсуждение реальных тем (новости, культура, работа, повседневная жизнь) с ведущим, который поддерживает разговор и мягко поправляет по ходу. Отлично подходит тем, кто хорошо понимает английский, но теряется, когда нужно заговорить.',
  syllabus_en = 'Each session focuses on a different real-world topic. Typical rotation: current events, travel & culture, work & career, technology & media, personal stories. Sessions are conversational, not lecture-based — expect to talk most of the time.',
  syllabus_az = 'Hər seans müxtəlif real mövzuya fokuslanır. Tipik dövriyyə: cari hadisələr, səyahət və mədəniyyət, iş və karyera, texnologiya və media, şəxsi hekayələr. Seanslar mühazirə əsaslı deyil, söhbət əsaslıdır — vaxtın əksər hissəsində danışacaqsınız.',
  syllabus_ru = 'Каждая встреча посвящена своей реальной теме. Типичная ротация: текущие события, путешествия и культура, работа и карьера, технологии и медиа, личные истории. Формат разговорный, а не лекционный — большую часть времени вы будете говорить сами.'
where slug = 'conversation-clubs';

update courses set
  long_description_en = 'Learn Russian through group classes structured the same way as our English program — from A1 basics to C2 fluency. Practical focus on speaking and listening, with grammar taught in context rather than as isolated rules. Useful for both everyday conversation and professional contexts in Baku''s Russian-speaking business environment.',
  long_description_az = 'Rus dilini İngilis dili proqramımızla eyni struktura malik qrup dərsləri vasitəsilə öyrənin — A1 əsaslarından C2 sərbəstliyinə qədər. Danışıq və dinləməyə praktiki fokus, qrammatika isə təcrid olunmuş qaydalar kimi deyil, kontekstdə öyrədilir. Bakının rusdilli biznes mühitində həm gündəlik söhbət, həm də peşəkar kontekstlər üçün faydalıdır.',
  long_description_ru = 'Изучайте русский язык в группах, построенных по той же структуре, что и наша программа английского — от основ A1 до свободного владения C2. Практический фокус на разговоре и аудировании, грамматика преподаётся в контексте, а не как изолированные правила. Полезно как для повседневного общения, так и для профессиональной среды в русскоязычном бизнес-окружении Баку.',
  syllabus_en = 'Weeks 1-3: Alphabet, pronunciation, and core grammar foundations.
Weeks 4-6: Everyday conversation — shopping, directions, introductions, small talk.
Weeks 7-9: Professional and social contexts — workplace vocabulary, expressing opinions.
Weeks 10-12: Fluency consolidation — extended conversation practice, level assessment.',
  syllabus_az = 'Həftə 1-3: Əlifba, tələffüz və əsas qrammatika təməlləri.
Həftə 4-6: Gündəlik söhbət — alış-veriş, istiqamətlər, tanışlıq, qısa söhbətlər.
Həftə 7-9: Peşəkar və sosial kontekstlər — işyeri lüğəti, fikir bildirmə.
Həftə 10-12: Sərbəstliyin möhkəmləndirilməsi — geniş danışıq məşqi, səviyyə qiymətləndirməsi.',
  syllabus_ru = 'Недели 1-3: Алфавит, произношение и основы грамматики.
Недели 4-6: Повседневное общение — покупки, направления, знакомства, светская беседа.
Недели 7-9: Профессиональный и социальный контекст — лексика для работы, выражение мнения.
Недели 10-12: Закрепление свободного владения — расширенная разговорная практика, оценка уровня.'
where slug = 'russian-groups';
