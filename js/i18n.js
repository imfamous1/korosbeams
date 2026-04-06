/**
 * Koros static site — RU/EN without build step
 */
(function () {
  "use strict";

  var STORAGE_KEY = "koros-lang";
  var LANG_SWITCH_ACTIVE = ["bg-primary-container", "text-on-primary-container"];
  var LANG_SWITCH_INACTIVE = ["bg-transparent", "text-zinc-600", "hover:bg-surface-container-high"];
  var DEFAULT_LANG = "ru";

  var STRINGS = {
    ru: {
      "meta.title.index": "КОРОС | БДК H20 для опалубки",
      "meta.title.catalog": "Продукция | ООО «КОРОС»",
      "meta.title.product.norm": "БДК H20 Norm | ООО «КОРОС»",
      "meta.title.product.pro": "БДК H20 Pro | ООО «КОРОС»",
      "meta.title.manufacturing": "О компании и производстве | ООО «КОРОС»",
      "meta.title.contact": "Контакты | ООО «КОРОС»",
      "meta.title.compare": "Каталог — применение | ООО «КОРОС»",
      "meta.title.certificates": "Сертификаты и испытания | ООО «КОРОС»",
      "meta.title.objects": "Наши объекты | ООО «КОРОС»",
      "meta.desc.index": "Производитель балок БДК H20 для монолитной опалубки. ГОСТ Р 71938-2025, EN 13377:2002. Ленинградская область, поставки в РФ и за рубеж.",
      "meta.desc.catalog": "БДК H20 Norm и БДК H20 Pro — две линейки деревянных балок для опалубки от ООО «КОРОС».",
      "meta.desc.product.norm": "БДК H20 Norm: фанера ФСФ 24 мм, торцы с защитным составом. Техданные и стандарты ГОСТ и EN.",
      "meta.desc.product.pro": "БДК H20 Pro: фанера ФСФ 24 или 27 мм, полимерные заглушки на торцах. Техданные КОРОС.",
      "meta.desc.manufacturing": "Опыт в деревопереработке, полный производственный цикл, контроль качества и испытания в аккредитованных лабораториях.",
      "meta.desc.contact": "Свяжитесь с ООО «КОРОС»: офис в Санкт-Петербурге, производство в п. Тихорецы, телефон, email и форма запроса.",
      "meta.desc.compare": "Страница перенаправляет в каталог продукции: применение балок БДК H20.",
      "meta.desc.certificates": "Стандарты ГОСТ и EN, протоколы испытаний и презентация продукции для скачивания.",
      "meta.desc.objects": "Примеры объектов с балками БДК КОРОС; раздел обновляется.",

      "a11y.mainNav": "Основная навигация",
      "a11y.breadcrumbs": "Хлебные крошки",
      "a11y.langSwitch": "Язык интерфейса",
      "a11y.messengerLinks": "Мессенджеры: чат по номеру",
      "a11y.openMax": "Написать в MAX",
      "a11y.openTelegram": "Написать в Telegram",
      "lang.ru.short": "RU",
      "lang.en.short": "EN",

      "nav.home": "Главная",
      "nav.about": "О компании",
      "nav.products": "Продукция",
      "nav.certificates": "Сертификация",
      "nav.objects": "Наши объекты",
      "nav.contact": "Контакты",
      "nav.cta": "Связаться",

      "header.phone.display": "8 800 333-22-33",
      "header.messenger.max": "MAX",
      "header.messenger.telegram": "Telegram",

      "contact.phone.label": "Телефон",
      "contact.email.label": "Почта",

      "footer.tagline": "Производство балок БДК для опалубки в соответствии с ГОСТ Р 71938-2025 и EN 13377:2002. Поставки по России и на экспорт.",
      "footer.products": "Продукция",
      "footer.links": "Разделы",
      "footer.office": "Контакты",
      "footer.link.h20.norm": "БДК H20 Norm",
      "footer.link.h20.pro": "БДК H20 Pro",
      "footer.link.catalog": "Каталог линеек",
      "footer.link.applications": "Применение",
      "footer.link.certificates": "Сертификаты",
      "footer.link.objects": "Наши объекты",
      "footer.link.manufacturing": "О компании",
      "footer.link.contact": "Связаться",
      "footer.privacy": "Политика конфиденциальности",
      "footer.terms": "Условия использования",
      "footer.copyright": "© 2026 ООО «КОРОС». Все права защищены.",
      "footer.addr.line1": "Россия, Ленинградская область,",
      "footer.addr.line2": "п. Тихорецы, ул. Набережная, д. 1Н",

      "index.hero.kicker": "Производитель БДК",
      "index.hero.title": "Балка БДК Beams H20 для опалубки",
      "index.hero.lead": "Более 10 лет в деревопереработке: полный цикл от пиломатериалов и фанеры до готовых балок БДК для опалубки в монолитном строительстве.",
      "index.hero.trust1": "Стандарты: ГОСТ Р 71938-2025 и EN 13377:2002",
      "index.hero.trust2": "Материалы: древесина, фанера, клей PUR и ЛКМ под контролем",
      "index.hero.trust3": "Испытания прочности в аккредитованных лабораториях по нормам",
      "index.hero.trustListAria": "Ключевые преимущества",
      "index.hero.cta.catalog": "Продукция",
      "index.hero.cta.quote": "Запросить расчёт",
      "index.hero.scroll": "Листайте",

      "index.features.kicker": "Цепочка ценности",
      "index.features.title": "От сырья до отгрузки — в одном скане",
      "index.features.lead": "Четыре опоры: производство под ключ, прочность по нормам, материалы и клей, экспортная логистика.",
      "index.features.aside.label": "Документы",
      "index.features.aside.text": "Паспорта, протоколы испытаний, данные по клеям и упаковке — по запросу к отгрузке.",

      "index.feat1.title": "Полный цикл",
      "index.feat1.text": "Распиловка, сушка, оптимизация, сращивание, шип, склейвание БДК, покраска и маркировка — под нашим контролем.",
      "index.feat2.title": "Прочность по нормам",
      "index.feat2.text": "Испытания в аккредитованных центрах. Показатели изгиба, разрушающей нагрузки и поперечной силы — не ниже требований EN 13377:2002.",
      "index.feat3.title": "Материалы и клей",
      "index.feat3.text": "Хвоя не ниже II сорта по ГОСТ 8486-86. Фанера ФСФ по ГОСТ 3916.1-2018 и EN 636-3. Соединение PUR-клеем по EN 301 / EN 204-205.",
      "index.feat4.title": "Экспорт и логистика",
      "index.feat4.text": "Опыт поставок и сотрудничества с партнёрами в Грузии, Турции, Египте, ОАЭ, Израиле, Китае и других странах.",

      "index.product.kicker": "Балка",
      "index.product.titleLine1": "Наша продукция:",
      "index.product.titleLine2": "БДК H20",
      "index.product.s1.title": "Norm и Pro",
      "index.product.s1.text": "Обе линейки — высота 200 мм, полка 40×80 мм, влажность древесины 12 ± 2 %, масса около 4,8 кг на погонный метр.",
      "index.product.s2.title": "Защита и покрытие",
      "index.product.s2.text": "Водостойкое покрытие с защитой от УФ, информативная маркировка. У Pro — полимерные заглушки на торцах; у Norm — обработка торца защитным составом.",
      "index.product.s3.title": "Стандарты",
      "index.product.s3.text": "Соответствие ГОСТ Р 71938-2025 и EN 13377:2002. Длины от 1,5 до 6,0 м и стандартный ряд по каталогу производителя.",
      "index.product.link": "Продукция",

      "index.partners.kicker": "География",
      "index.partners.title": "Поставки в РФ и за рубежом",

      "index.specs.kicker": "К проектированию",
      "index.specs.title": "Ключевые данные",
      "index.specs.sub": "Номинальные характеристики балки БДК H20 — для смет, подбора и сверки с нормами.",
      "index.specs.aside": "Фактические значения по партии — в паспорте изделия и приложениях к отгрузке.",
      "index.specs.std": "Стандарты",
      "index.specs.std.val": "ГОСТ Р 71938-2025, EN 13377:2002",
      "index.specs.dims": "Сечение / фанера",
      "index.specs.dims.val": "40×80 мм, h=200 мм; фанера 24/27 мм",
      "index.specs.moist": "Влажность древесины",
      "index.specs.moist.val": "12 ± 2 %",
      "index.specs.weight": "Масса",
      "index.specs.weight.val": "4,8 кг/м",
      "index.specs.lengths": "Длины (типовой ряд), м",
      "index.specs.lengths.val": "2,45; 2,65; 2,90; 3,30; 3,60; 3,90; 4,50; 4,90; 5,90",
      "index.specs.bend": "Изгибающий момент (к заявленным нормам)",
      "index.specs.bend.val": "> 28 kN·m (норма EN 23,9)",
      "index.specs.shear": "Поперечная сила",
      "index.specs.shear.val": "> 11 kN (норма EN 10,9)",

      "mfg.hero.kicker": "Производство",
      "mfg.hero.title": "От сырья до балки БДК",
      "mfg.hero.lead": "Собственная сырьевая база и контроль всех этапов: мы производим доска, шпон, балки БДК и сопутствующие изделия и ведём торговлю на российском и международном рынках.",

      "mfg.about.title": "О компании",
      "mfg.about.lead": "ООО «КОРОС» — производитель и поставщик, для которого важна надёжность партнёрства и прибыльность всей цепочки.",
      "mfg.about.li1": "Контроль качества на всех этапах; испытания продукции в аккредитованных лабораториях по ГОСТ и EN.",
      "mfg.about.li2": "Современное технологичное и экологически ответственное производство.",
      "mfg.about.li3": "Эффективная логистика, развитая инфраструктура и сопровождение ВЭД.",
      "mfg.about.stats.prod": "До 100 000 м балок в месяц",
      "mfg.about.stats.area": "10 000 м² производственных площадей",

      "mfg.cycle.title": "Цикл производства",
      "mfg.cycle.lead": "Полный цикл переработки древесины под опалубочные балки.",
      "mfg.cycle.01.t": "Сырьё и подготовка",
      "mfg.cycle.01.d": "Распиловка, сушка и оптимизация заготовок с контролем влажности.",
      "mfg.cycle.02.t": "Сращивание и шип",
      "mfg.cycle.02.d": "Технологии сращивания и формирование шипового соединения для устойчивого сердечника.",
      "mfg.cycle.03.t": "Склейка БДК",
      "mfg.cycle.03.d": "Сборка двутавра с фанерными полками PUR-клеем по EN 301 / EN 204-205.",
      "mfg.cycle.04.t": "Отделка и ОТК",
      "mfg.cycle.04.d": "Покраска, маркировка, выборочный контроль и отгрузка.",

      "mfg.quality.title": "Качество и стандарты",
      "mfg.quality.sub": "Соответствие ГОСТ Р 71938-2025 и EN 13377:2002; древесина хвойных пород не ниже II сорта по ГОСТ 8486-86.",
      "mfg.quality.th.std": "Стандарт",
      "mfg.quality.th.req": "Показатель",
      "mfg.quality.th.koros": "КОРОС",
      "mfg.quality.th.status": "Статус",
      "mfg.quality.r1.c1": "EN 13377:2002",
      "mfg.quality.r1.c2": "Изгибающий момент",
      "mfg.quality.r1.c3": "> 28 kN·m (норма 23,9)",
      "mfg.quality.r1.c4": "Подтверждено",
      "mfg.quality.r2.c1": "EN 13377:2002",
      "mfg.quality.r2.c2": "Разрушающая нагрузка",
      "mfg.quality.r2.c3": "> 52 kN (норма 47,8)",
      "mfg.quality.r2.c4": "Подтверждено",
      "mfg.quality.r3.c1": "EN 13377:2002",
      "mfg.quality.r3.c2": "Поперечная сила",
      "mfg.quality.r3.c3": "> 11 kN (норма 10,9)",
      "mfg.quality.r3.c4": "Подтверждено",

      "mfg.cta.title": "Нужны документы?",
      "mfg.cta.text": "Скачайте презентацию о компании и продукте или запросите протоколы испытаний.",
      "mfg.cta.btn": "Сертификаты и файлы",

      "cat.hero.kicker": "Продукция",
      "cat.hero.title": "Наша продукция: БДК H20",
      "cat.hero.lead": "Выберите исполнение под ваш проект: экономичное Norm или усиленное Pro с полимерными заглушками и фанерой до 27 мм.",
      "cat.card.norm.title": "БДК H20",
      "cat.card.norm.sub": "Norm",
      "cat.card.norm.text": "Фанера ФСФ 24 мм по ГОСТ 3916.1-2018 и EN 636-3. Торцы обработаны защитным составом. Для типовых опалубочных решений.",
      "cat.card.norm.img.alt": "Две жёлтые балки KOROS H20 с маркировкой KOROS BEAMS H20 на полке",
      "cat.card.pro.title": "БДК H20 Про",
      "cat.card.pro.sub": "Pro",
      "cat.card.pro.text": "Фанера ФСФ 24 или 27 мм. Торцы защищены полимерными заглушками. Повышенная устойчость к механическим воздействиям на торцах.",
      "cat.card.link": "Подробнее",
      "cat.card.compare": "Сравнить линейки",

      "cat.apps.kicker": "Применение",
      "cat.apps.title": "Где используют балки БДК H20",
      "cat.apps.lead": "Типовые направления монолитного строительства. Ниже — структура блока; фотографии объектов и узлов можно добавить вместо плейсхолдеров.",
      "cat.apps.ph.aria": "Место для фотографии: пример применения",
      "cat.apps.ph.caption": "Фото",
      "cat.apps.1.t": "Перекрытия",
      "cat.apps.1.p": "Опалубочные системы для монолитных плит жилых, офисных и общественных зданий.",
      "cat.apps.2.t": "Стены и жёсткие ядра",
      "cat.apps.2.p": "Вертикальная опалубка стен, лифтовых шахт и несущих ядер высотных корпусов.",
      "cat.apps.3.t": "Инфраструктура",
      "cat.apps.3.p": "Объекты транспортного строительства и инженерные сооружения, где требуются балки с подтверждением по ГОСТ и EN.",
      "cat.apps.4.t": "Промышленные пролёты",
      "cat.apps.4.p": "Склады, производственные корпуса и крупногабаритные залы: единая несущая сетка опалубки на длинных пролётах.",
      "cat.apps.note": "Окончательный подбор линейки Norm или Pro, шага и длины балок — по проекту и нагрузкам конкретной площадки.",

      "breadcrumb.norm": "БДК H20 Norm",
      "breadcrumb.pro": "БДК H20 Pro",

      "prod.card.kicker": "Решения для опалубки",
      "prod.norm.hero.h1.before": "Балка БДК H20",
      "prod.norm.hero.h1.accent": "Norm",
      "prod.pro.hero.h1.before": "Балка БДК H20",
      "prod.pro.hero.h1.accent": "Pro",
      "prod.hero.badge.series": "Серия КОРОС H20",
      "prod.hero.img.alt.main": "Балка БДК H20 в производственном освещении",
      "prod.hero.img.alt.t1": "Крупный план торца балки и полимерной защиты",
      "prod.hero.img.alt.t2": "Монолитная опалубка с балками H20 на объекте",
      "prod.hero.img.alt.t3": "Штабелированные балки на складе",

      "prod.cta.inquiry": "Запрос в отдел снабжения",
      "prod.cta.sheet": "Сертификаты и презентация",
      "prod.stat.bend": "Изгибающий момент",
      "prod.stat.shear": "Поперечная сила",
      "prod.stat.bend.val": "> 28 kN·m",
      "prod.stat.shear.val": "> 11 kN",

      "prod.table.th.prop": "Параметр",
      "prod.table.th.unit": "Ед.",
      "prod.table.th.val": "Значение",
      "prod.table.th.note": "Примечание",

      "prod.hub.hero.kicker": "Продукция",
      "prod.hub.hero.title": "Балки БДК H20",
      "prod.hub.hero.lead": "Две линейки с общей геометрией и требованиями к прочности; отличаются полкой и защитой торцов. Выберите страницу нужного исполнения в каталоге.",
      "prod.hub.compare.link": "Где применяются балки",

      "prod.norm.hero.kicker": "Линейка Norm",
      "prod.norm.hero.title": "БДК H20 Norm",
      "prod.norm.hero.lead": "Экономичное исполнение: фанера ФСФ 24 мм и обработка торцов защитным составом. Подходит для типовых опалубочных решений при тех же нормах ГОСТ и EN, что и для всей серии.",
      "prod.norm.badge": "H20 Norm",
      "prod.norm.img.alt": "Деревянная балка БДК H20 Norm для опалубки",
      "prod.norm.related.kicker": "Другая линейка",
      "prod.norm.related.title": "БДК H20 Pro",
      "prod.norm.related.text": "Фанера 24 или 27 мм и полимерные заглушки на торцах — усиленная защита при транспортировке и монтаже.",
      "prod.norm.related.link": "Открыть БДК H20 Pro",

      "prod.norm.feat.title": "Особенности Norm",
      "prod.norm.feat.1.t": "Фанера 24 мм",
      "prod.norm.feat.1.d": "Полка из влагостойкой фанеры ФСФ по ГОСТ 3916.1-2018 и EN 636-3.",
      "prod.norm.feat.2.t": "Торцы",
      "prod.norm.feat.2.d": "Обработка защитным составом — герметизация без полимерных заглушек.",
      "prod.norm.feat.3.t": "Стандарты",
      "prod.norm.feat.3.d": "ГОСТ Р 71938-2025 и EN 13377:2002; склеивание PUR-клеем по EN 301 / EN 204-205.",

      "prod.norm.table.title": "Технические данные",
      "prod.norm.table.sub": "Параметры линейки Norm; для проектирования уточняйте актуальные протоколы испытаний.",
      "prod.norm.table.tag1": "ГОСТ Р 71938-2025",
      "prod.norm.table.tag2": "EN 13377:2002",
      "prod.norm.table.r1.p": "Стандартные длины",
      "prod.norm.table.r1.u": "м",
      "prod.norm.table.r1.v": "2,45–5,90 (ряд по презентации)",
      "prod.norm.table.r1.n": "Диапазон 1,5–6,0 м",
      "prod.norm.table.r2.p": "Масса",
      "prod.norm.table.r2.u": "кг/м",
      "prod.norm.table.r2.v": "4,8",
      "prod.norm.table.r2.n": "номинал",
      "prod.norm.table.r3.p": "Высота / полка",
      "prod.norm.table.r3.u": "мм",
      "prod.norm.table.r3.v": "200 / 40×80",
      "prod.norm.table.r3.n": "сечение балки",
      "prod.norm.table.r4.p": "Толщина фанеры (полка)",
      "prod.norm.table.r4.u": "мм",
      "prod.norm.table.r4.v": "24",
      "prod.norm.table.r4.n": "ФСФ, линейка Norm",
      "prod.norm.table.r5.p": "Защита торцов",
      "prod.norm.table.r5.u": "—",
      "prod.norm.table.r5.v": "Защитный состав",
      "prod.norm.table.r5.n": "без заглушек",
      "prod.norm.table.r6.p": "Влажность древесины",
      "prod.norm.table.r6.u": "%",
      "prod.norm.table.r6.v": "12 ± 2",
      "prod.norm.table.r6.n": "контроль сушки",

      "prod.norm.gallery.overlay": "Опалубка перекрытий и стен",
      "prod.norm.aside.title": "Контроль качества",
      "prod.norm.aside.text": "Испытания в аккредитованных лабораториях по ГОСТ и EN; маркировка и прослеживаемость партии.",
      "prod.norm.aside.link": "Производство и ОТК",

      "prod.pro.hero.kicker": "Линейка Pro",
      "prod.pro.hero.title": "БДК H20 Pro",
      "prod.pro.hero.lead": "Усиленное исполнение: фанера ФСФ 24 или 27 мм и полимерные заглушки на торцах. Для объектов, где важна стойкость торцов к ударам при погрузочно-разгрузочных работах.",
      "prod.pro.badge": "H20 Pro",
      "prod.pro.img.alt": "Деревянная балка БДК H20 Pro для опалубки",
      "prod.pro.related.kicker": "Другая линейка",
      "prod.pro.related.title": "БДК H20 Norm",
      "prod.pro.related.text": "Фанера 24 мм и защита торцов составом — рациональный выбор для типовых схем опалубки.",
      "prod.pro.related.link": "Открыть БДК H20 Norm",

      "prod.pro.feat.title": "Особенности Pro",
      "prod.pro.feat.1.t": "Фанера 24 или 27 мм",
      "prod.pro.feat.1.d": "Можно заказать полку 27 мм там, где нужен запас по жёсткости полки при тех же высоте и ширине пояса.",
      "prod.pro.feat.2.t": "Полимерные заглушки",
      "prod.pro.feat.2.d": "Торцы закрыты заглушками — меньше сколов и влаги на торцевых зонах при эксплуатации.",
      "prod.pro.feat.3.t": "Стандарты",
      "prod.pro.feat.3.d": "Те же ГОСТ Р 71938-2025 и EN 13377:2002; клей PUR по EN 301 / EN 204-205.",

      "prod.pro.table.title": "Технические данные",
      "prod.pro.table.sub": "Параметры линейки Pro; для проектирования уточняйте актуальные протоколы испытаний.",
      "prod.pro.table.tag1": "ГОСТ Р 71938-2025",
      "prod.pro.table.tag2": "EN 13377:2002",
      "prod.pro.table.r1.p": "Стандартные длины",
      "prod.pro.table.r1.u": "м",
      "prod.pro.table.r1.v": "2,45–5,90 (ряд по презентации)",
      "prod.pro.table.r1.n": "Диапазон 1,5–6,0 м",
      "prod.pro.table.r2.p": "Масса",
      "prod.pro.table.r2.u": "кг/м",
      "prod.pro.table.r2.v": "4,8",
      "prod.pro.table.r2.n": "номинал; 27 мм — уточнять",
      "prod.pro.table.r3.p": "Высота / полка",
      "prod.pro.table.r3.u": "мм",
      "prod.pro.table.r3.v": "200 / 40×80",
      "prod.pro.table.r3.n": "сечение балки",
      "prod.pro.table.r4.p": "Толщина фанеры (полка)",
      "prod.pro.table.r4.u": "мм",
      "prod.pro.table.r4.v": "24 или 27",
      "prod.pro.table.r4.n": "ФСФ, линейка Pro",
      "prod.pro.table.r5.p": "Защита торцов",
      "prod.pro.table.r5.u": "—",
      "prod.pro.table.r5.v": "Полимерные заглушки",
      "prod.pro.table.r5.n": "повышенная устойчивость",
      "prod.pro.table.r6.p": "Влажность древесины",
      "prod.pro.table.r6.u": "%",
      "prod.pro.table.r6.v": "12 ± 2",
      "prod.pro.table.r6.n": "контроль сушки",

      "prod.pro.gallery.overlay": "Жёсткость полки и торцы Pro",
      "prod.pro.aside.title": "Контроль качества",
      "prod.pro.aside.text": "Испытания в аккредитованных лабораториях по ГОСТ и EN; маркировка и прослеживаемость партии.",
      "prod.pro.aside.link": "Производство и ОТК",

      "contact.hero.kicker": "Обратная связь",
      "contact.hero.title": "Свяжитесь с нами",
      "contact.hero.lead": "Запросите коммерческое предложение, образцы маркировки или техническую документацию по балкам БДК H20.",
      "contact.form.title": "Запрос по продукту",
      "contact.form.name": "ФИО",
      "contact.form.company": "Компания",
      "contact.form.email": "Email",
      "contact.form.phone": "Телефон",
      "contact.form.materials": "Параметры",
      "contact.form.beam": "Линейка",
      "contact.form.qty": "Объём, м (пог.)",
      "contact.form.details": "Комментарий",
      "contact.form.submit": "Отправить запрос",
      "contact.opt.norm": "БДК H20 Norm",
      "contact.opt.pro": "БДК H20 Pro",
      "contact.opt.both": "Обе линейки / уточнить",
      "contact.opt.custom": "Другой запрос",

      "contact.locations.title": "Адреса",
      "contact.addr.officeSpb.title": "Офис СПБ",
      "contact.addr.officeSpb.line": "Санкт-Петербург, ул. Якорная, 7АД",
      "contact.addr.plant.title": "Производство Тихорецы",
      "contact.addr.plant.line1": "Россия, Ленинградская область,",
      "contact.addr.plant.line2": "п. Тихорецы, ул. Набережная, д. 1Н",
      "contact.map.open": "Открыть в Яндекс.Картах",
      "contact.map.ariaOffice": "Карта: офис в Санкт-Петербурге",
      "contact.map.ariaPlant": "Карта: производство в п. Тихорецы",
      "contact.addr.title": "Адрес",
      "contact.direct.title": "Связь напрямую",
      "contact.direct.phone": "Телефон",
      "contact.direct.email": "Email",
      "contact.direct.messengers": "Мессенджеры",
      "contact.form.phoneHint": "8 800 333-22-33",

      "contact.bento.title": "Документы и поддержка",
      "contact.bento.doc.t": "Техническая документация",
      "contact.bento.doc.p": "Презентация, сертификаты и протоколы — в разделе для скачивания.",
      "contact.bento.doc.link": "Открыть раздел",
      "contact.bento.compare.t": "Примеры применения",
      "contact.bento.compare.p": "Ориентиры по зонам использования балок — на странице продукции.",
      "contact.bento.compare.link": "Открыть",
      "contact.bento.support.t": "Срочный вопрос",
      "contact.bento.support.p": "Позвоните или напишите на почту — ответим в рабочее время.",
      "contact.bento.support.link": "Позвонить",

      "cert.hero.kicker": "Документы",
      "cert.title": "Сертификаты и испытания",
      "cert.sub": "Подтверждение соответствия стандартам и готовность предоставить пакет документов для тендера.",
      "cert.card1.t": "Протоколы испытаний",
      "cert.card1.p": "Результаты механических испытаний в аккредитованных лабораториях. Выдаём по запросу для конкретной партии или типоразмера.",
      "cert.card1.link": "Запросить",
      "cert.card2.t": "Сертификаты и декларации",
      "cert.card2.p": "Комплект документов о соответствии требованиям ГОСТ и регламентов. Состав согласуем с вашим отделом снабжения.",
      "cert.card2.link": "Запросить",
      "cert.card3.t": "Презентация продукции",
      "cert.card3.p": "PDF с краткими техническими данными, отличиями линеек Norm/Pro и контактами компании.",
      "cert.card3.link": "Скачать PDF",
      "cert.std.title": "Применяемые стандарты",
      "cert.std.p": "ГОСТ Р 71938-2025; EN 13377:2002; ГОСТ 8486-86 (древесина); ГОСТ 3916.1-2018 и EN 636-3 (фанера); EN 301 / EN 204-205 (классификация клеевых систем).",

      "objects.hero.kicker": "Объекты",
      "objects.title": "Наши объекты",
      "objects.lead": "Раздел в подготовке: здесь появятся примеры объектов с нашими балками БДК.",
      "objects.placeholder": "Мы готовим материалы для этой страницы. По вопросам поставок и референсов свяжитесь с нами.",
      "objects.cta": "Связаться",
    },
    en: {
      "meta.title.index": "Koros | H20 timber formwork beams",
      "meta.title.catalog": "Product range | Koros LLC",
      "meta.title.product.norm": "H20 Norm beam | Koros LLC",
      "meta.title.product.pro": "H20 Pro beam | Koros LLC",
      "meta.title.manufacturing": "About & manufacturing | Koros LLC",
      "meta.title.contact": "Contact | Koros LLC",
      "meta.title.compare": "Product range — applications | Koros LLC",
      "meta.title.certificates": "Certificates & testing | Koros LLC",
      "meta.title.objects": "Our projects | Koros LLC",
      "meta.desc.index": "Manufacturer of H20 timber beams for formwork. GOST R 71938-2025, EN 13377:2002. Leningrad region; Russia and export.",
      "meta.desc.catalog": "H20 Norm and H20 Pro timber beam lines for formwork from Koros LLC.",
      "meta.desc.product.norm": "H20 Norm: 24 mm FSF plywood, compound end sealing. Specs and GOST/EN alignment.",
      "meta.desc.product.pro": "H20 Pro: 24 or 27 mm FSF, polymer end caps. Koros technical data.",
      "meta.desc.manufacturing": "Wood-processing experience, full in-house cycle, quality control and accredited lab testing.",
      "meta.desc.contact": "Contact Koros LLC: St. Petersburg office, Tikhoretsy plant, phone, email and inquiry form.",
      "meta.desc.compare": "Shortcut to the Koros catalogue: where H20 timber beams are used.",
      "meta.desc.certificates": "GOST & EN alignment, test reports and downloadable product presentation.",
      "meta.desc.objects": "Reference projects with Koros H20 beams; section coming soon.",

      "a11y.mainNav": "Main navigation",
      "a11y.breadcrumbs": "Breadcrumbs",
      "a11y.langSwitch": "Interface language",
      "a11y.messengerLinks": "Messaging apps",
      "a11y.openMax": "Message on MAX",
      "a11y.openTelegram": "Message on Telegram",
      "lang.ru.short": "RU",
      "lang.en.short": "EN",

      "nav.home": "Home",
      "nav.about": "About",
      "nav.products": "Products",
      "nav.certificates": "Certification",
      "nav.objects": "Our projects",
      "nav.contact": "Contact",
      "nav.cta": "Get in touch",

      "header.phone.display": "8 800 333-22-33",
      "header.messenger.max": "MAX",
      "header.messenger.telegram": "Telegram",

      "contact.phone.label": "Phone",
      "contact.email.label": "Email",

      "footer.tagline": "H20 timber beams for formwork to GOST R 71938-2025 and EN 13377:2002. Deliveries across Russia and for export.",
      "footer.products": "Products",
      "footer.links": "Sections",
      "footer.office": "Contact",
      "footer.link.h20.norm": "H20 Norm",
      "footer.link.h20.pro": "H20 Pro",
      "footer.link.catalog": "Product lines",
      "footer.link.applications": "Applications",
      "footer.link.certificates": "Certificates",
      "footer.link.objects": "Our projects",
      "footer.link.manufacturing": "About us",
      "footer.link.contact": "Contact",
      "footer.privacy": "Privacy policy",
      "footer.terms": "Terms of use",
      "footer.copyright": "© 2026 Koros LLC. All rights reserved.",
      "footer.addr.line1": "Russia, Leningrad Oblast,",
      "footer.addr.line2": "Tikhoretsy, Naberezhnaya St., 1N",

      "index.hero.kicker": "Beam manufacturer",
      "index.hero.title": "Beams H20 timber beam for formwork",
      "index.hero.lead": "Over 10 years in wood processing: full flow from sawn timber and plywood to finished H20 formwork beams for monolithic construction.",
      "index.hero.trust1": "Standards: GOST R 71938-2025 & EN 13377:2002",
      "index.hero.trust2": "Materials: timber, plywood, PUR adhesive and coatings under control",
      "index.hero.trust3": "Strength testing in accredited labs to applicable codes",
      "index.hero.trustListAria": "Key highlights",
      "index.hero.cta.catalog": "Products",
      "index.hero.cta.quote": "Request a quote",
      "index.hero.scroll": "Scroll",

      "index.features.kicker": "Value chain",
      "index.features.title": "From raw material to dispatch — one scan",
      "index.features.lead": "Four pillars: in-house production, code-aligned strength, materials and adhesive, export logistics.",
      "index.features.aside.label": "Documentation",
      "index.features.aside.text": "Data sheets, test reports, adhesive and packing details — available on request before shipment.",

      "index.feat1.title": "Full cycle",
      "index.feat1.text": "Sawing, drying, optimization, finger‑jointing, scarf jointing, beam gluing, coating and marking — all under our control.",
      "index.feat2.title": "Code-aligned strength",
      "index.feat2.text": "Testing in accredited labs. Bending, ultimate load and shear values meet or exceed EN 13377:2002 minima stated in our data sheets.",
      "index.feat3.title": "Materials & adhesive",
      "index.feat3.text": "Softwood not below II grade per GOST 8486-86. FSF plywood per GOST 3916.1-2018 and EN 636-3. PUR bonding per EN 301 / EN 204-205.",
      "index.feat4.title": "Export & logistics",
      "index.feat4.text": "Experience supplying partners in Georgia, Turkey, Egypt, UAE, Israel, China and other countries.",

      "index.product.kicker": "Beams",
      "index.product.titleLine1": "Our products:",
      "index.product.titleLine2": "BDK H20",
      "index.product.s1.title": "Norm & Pro",
      "index.product.s1.text": "Both lines share 200 mm height, 40×80 mm flange, approx. 12 ± 2 % moisture and ~4.8 kg/m mass.",
      "index.product.s2.title": "Protection & coating",
      "index.product.s2.text": "Water-resistant coating with UV protection and informative marking. Pro line: polymer end caps; Norm line: protective end treatment.",
      "index.product.s3.title": "Standards",
      "index.product.s3.text": "Aligned with GOST R 71938-2025 and EN 13377:2002. Lengths from 1.5 to 6.0 m and standard increments per our catalogue.",
      "index.product.link": "Products",

      "index.partners.kicker": "Footprint",
      "index.partners.title": "Russia & export deliveries",

      "index.specs.kicker": "Engineering",
      "index.specs.title": "Key data",
      "index.specs.sub": "Nominal BDK H20 beam specs — for estimates, selection and code checks.",
      "index.specs.aside": "Lot-specific figures appear on the product data sheet and shipping paperwork.",
      "index.specs.std": "Standards",
      "index.specs.std.val": "GOST R 71938-2025, EN 13377:2002",
      "index.specs.dims": "Section / plywood",
      "index.specs.dims.val": "40×80 mm, h=200 mm; plywood 24/27 mm",
      "index.specs.moist": "Wood moisture",
      "index.specs.moist.val": "12 ± 2 %",
      "index.specs.weight": "Mass",
      "index.specs.weight.val": "4.8 kg/m",
      "index.specs.lengths": "Typical lengths, m",
      "index.specs.lengths.val": "2.45; 2.65; 2.90; 3.30; 3.60; 3.90; 4.50; 4.90; 5.90",
      "index.specs.bend": "Bending moment (vs EN minima)",
      "index.specs.bend.val": "> 28 kN·m (EN min 23.9)",
      "index.specs.shear": "Shear capacity",
      "index.specs.shear.val": "> 11 kN (EN min 10.9)",

      "mfg.hero.kicker": "Manufacturing",
      "mfg.hero.title": "From fibre to H20 beam",
      "mfg.hero.lead": "In-feed stock and end-to-end control: boards, veneer, H20 beams and related timber goods, traded domestically and abroad.",

      "mfg.about.title": "About Koros",
      "mfg.about.lead": "Koros LLC is a manufacturer and supplier focused on reliable partnerships across the value chain.",
      "mfg.about.li1": "Quality control at every step; products tested in accredited laboratories to GOST and EN.",
      "mfg.about.li2": "Modern, environmentally responsible production.",
      "mfg.about.li3": "Efficient logistics, solid infrastructure and foreign-trade support.",

      "mfg.about.stats.prod": "Up to 100,000 m of beams per month",
      "mfg.about.stats.area": "10,000 m² of production space",

      "mfg.cycle.title": "Production flow",
      "mfg.cycle.lead": "Full timber processing chain dedicated to formwork beams.",
      "mfg.cycle.01.t": "Stock preparation",
      "mfg.cycle.01.d": "Sawing, drying and optimization with moisture control.",
      "mfg.cycle.02.t": "Jointing & profiling",
      "mfg.cycle.02.d": "Finger-jointing technologies and scarf preparation for a stable web.",
      "mfg.cycle.03.t": "Beam gluing",
      "mfg.cycle.03.d": "I‑beam assembly with FSF flanges and PUR adhesive per EN 301 / EN 204-205.",
      "mfg.cycle.04.t": "Finishing & QC",
      "mfg.cycle.04.d": "Coating, marking, batch checks and dispatch.",

      "mfg.quality.title": "Quality & codes",
      "mfg.quality.sub": "GOST R 71938-2025 and EN 13377:2002; softwood not below grade II per GOST 8486-86.",
      "mfg.quality.th.std": "Standard",
      "mfg.quality.th.req": "Indicator",
      "mfg.quality.th.koros": "Koros",
      "mfg.quality.th.status": "Status",
      "mfg.quality.r1.c1": "EN 13377:2002",
      "mfg.quality.r1.c2": "Bending moment",
      "mfg.quality.r1.c3": "> 28 kN·m (min 23.9)",
      "mfg.quality.r1.c4": "Verified",
      "mfg.quality.r2.c1": "EN 13377:2002",
      "mfg.quality.r2.c2": "Ultimate load",
      "mfg.quality.r2.c3": "> 52 kN (min 47.8)",
      "mfg.quality.r2.c4": "Verified",
      "mfg.quality.r3.c1": "EN 13377:2002",
      "mfg.quality.r3.c2": "Shear force",
      "mfg.quality.r3.c3": "> 11 kN (min 10.9)",
      "mfg.quality.r3.c4": "Verified",

      "mfg.cta.title": "Need documents?",
      "mfg.cta.text": "Download the company & product deck or request formal test reports.",
      "mfg.cta.btn": "Certificates & files",

      "cat.hero.kicker": "Products",
      "cat.hero.title": "Our products: BDK H20",
      "cat.hero.lead": "Pick the execution for your job: Norm for standard sites or Pro with polymer caps and up to 27 mm plywood.",

      "cat.card.norm.title": "H20",
      "cat.card.norm.sub": "Norm",
      "cat.card.norm.text": "FSF 24 mm plywood per GOST 3916.1-2018 and EN 636-3. End faces treated with a protective compound. For typical slab/wall formwork.",
      "cat.card.norm.img.alt": "Two yellow KOROS H20 beams with KOROS BEAMS H20 marking on the web",
      "cat.card.pro.title": "H20 Pro",
      "cat.card.pro.sub": "Pro",
      "cat.card.pro.text": "FSF 24 or 27 mm plywood. Polymer end caps. Higher mechanical protection at beam ends.",

      "cat.card.link": "Learn more",
      "cat.card.compare": "Compare lines",

      "cat.apps.kicker": "Applications",
      "cat.apps.title": "Where Koros H20 beams are used",
      "cat.apps.lead": "Typical directions in monolithic construction. This block is structured for imagery — drop in site photos when they are ready.",
      "cat.apps.ph.aria": "Image placeholder: application example",
      "cat.apps.ph.caption": "Photo",
      "cat.apps.1.t": "Floor slabs",
      "cat.apps.1.p": "Formwork systems for cast-in-place slabs in residential, office and public buildings.",
      "cat.apps.2.t": "Walls and cores",
      "cat.apps.2.p": "Vertical formwork for walls, lift shafts and structural cores in high-rise construction.",
      "cat.apps.3.t": "Infrastructure",
      "cat.apps.3.p": "Transport and engineered structures where GOST- and EN-aligned certified beams are required.",
      "cat.apps.4.t": "Industrial spans",
      "cat.apps.4.p": "Warehouses, manufacturing halls and wide spans with a uniform primary formwork grid.",
      "cat.apps.note": "Norm vs Pro, spacing and beam length are always confirmed against your project loads and site rules.",

      "breadcrumb.norm": "H20 Norm",
      "breadcrumb.pro": "H20 Pro",

      "prod.card.kicker": "Formwork solutions",
      "prod.norm.hero.h1.before": "H20 timber beam",
      "prod.norm.hero.h1.accent": "Norm",
      "prod.pro.hero.h1.before": "H20 timber beam",
      "prod.pro.hero.h1.accent": "Pro",
      "prod.hero.badge.series": "Koros H20 series",
      "prod.hero.img.alt.main": "H20 formwork beam in industrial lighting",
      "prod.hero.img.alt.t1": "Close-up of beam end and protection",
      "prod.hero.img.alt.t2": "Monolithic formwork with H20 beams on site",
      "prod.hero.img.alt.t3": "Stacked beams in storage",

      "prod.cta.inquiry": "Reach procurement",
      "prod.cta.sheet": "Certificates & deck",
      "prod.stat.bend": "Bending moment",
      "prod.stat.shear": "Shear capacity",
      "prod.stat.bend.val": "> 28 kN·m",
      "prod.stat.shear.val": "> 11 kN",

      "prod.table.th.prop": "Property",
      "prod.table.th.unit": "Unit",
      "prod.table.th.val": "Value",
      "prod.table.th.note": "Note",

      "prod.hub.hero.kicker": "Products",
      "prod.hub.hero.title": "Koros H20 timber beams",
      "prod.hub.hero.lead": "Two lines sharing the same geometry and strength requirements; they differ by flange build and end protection. Open the catalogue line you need.",
      "prod.hub.compare.link": "Where beams are used",

      "prod.norm.hero.kicker": "Norm line",
      "prod.norm.hero.title": "H20 Norm",
      "prod.norm.hero.lead": "Cost‑efficient build: 24 mm FSF plywood and compound end sealing. For typical formwork layouts with the same GOST/EN basis as the whole Koros H20 range.",
      "prod.norm.badge": "H20 Norm",
      "prod.norm.img.alt": "H20 Norm timber formwork beam",
      "prod.norm.related.kicker": "Other line",
      "prod.norm.related.title": "H20 Pro",
      "prod.norm.related.text": "24 or 27 mm flanges and polymer end caps — stronger end protection during handling.",
      "prod.norm.related.link": "Open H20 Pro",

      "prod.norm.feat.title": "Norm highlights",
      "prod.norm.feat.1.t": "24 mm plywood",
      "prod.norm.feat.1.d": "Flange in FSF plywood to GOST 3916.1-2018 and EN 636-3.",
      "prod.norm.feat.2.t": "Ends",
      "prod.norm.feat.2.d": "Protective compound sealing — no polymer caps.",
      "prod.norm.feat.3.t": "Codes",
      "prod.norm.feat.3.d": "GOST R 71938-2025 and EN 13377:2002; PUR bonding per EN 301 / EN 204-205.",

      "prod.norm.table.title": "Technical data",
      "prod.norm.table.sub": "Norm line parameters; confirm with the latest test reports for your project.",
      "prod.norm.table.tag1": "GOST R 71938-2025",
      "prod.norm.table.tag2": "EN 13377:2002",
      "prod.norm.table.r1.p": "Standard lengths",
      "prod.norm.table.r1.u": "m",
      "prod.norm.table.r1.v": "2.45–5.90 (series per deck)",
      "prod.norm.table.r1.n": "Span 1.5–6.0 m",
      "prod.norm.table.r2.p": "Mass",
      "prod.norm.table.r2.u": "kg/m",
      "prod.norm.table.r2.v": "4.8",
      "prod.norm.table.r2.n": "nominal",
      "prod.norm.table.r3.p": "Height / flange",
      "prod.norm.table.r3.u": "mm",
      "prod.norm.table.r3.v": "200 / 40×80",
      "prod.norm.table.r3.n": "beam section",
      "prod.norm.table.r4.p": "Plywood (flange)",
      "prod.norm.table.r4.u": "mm",
      "prod.norm.table.r4.v": "24",
      "prod.norm.table.r4.n": "FSF, Norm line",
      "prod.norm.table.r5.p": "End protection",
      "prod.norm.table.r5.u": "—",
      "prod.norm.table.r5.v": "Protective compound",
      "prod.norm.table.r5.n": "no end caps",
      "prod.norm.table.r6.p": "Wood moisture",
      "prod.norm.table.r6.u": "%",
      "prod.norm.table.r6.v": "12 ± 2",
      "prod.norm.table.r6.n": "kiln controlled",

      "prod.norm.gallery.overlay": "Slab & wall formwork",
      "prod.norm.aside.title": "Quality assurance",
      "prod.norm.aside.text": "Accredited lab testing to GOST and EN; batch marking and traceability.",
      "prod.norm.aside.link": "Manufacturing & QC",

      "prod.pro.hero.kicker": "Pro line",
      "prod.pro.hero.title": "H20 Pro",
      "prod.pro.hero.lead": "Heavy‑duty build: 24 or 27 mm FSF and polymer end caps. For sites where end faces take more impact during loading and handling.",
      "prod.pro.badge": "H20 Pro",
      "prod.pro.img.alt": "H20 Pro timber formwork beam",
      "prod.pro.related.kicker": "Other line",
      "prod.pro.related.title": "H20 Norm",
      "prod.pro.related.text": "24 mm flange and compound end sealing — efficient for standard formwork grids.",
      "prod.pro.related.link": "Open H20 Norm",

      "prod.pro.feat.title": "Pro highlights",
      "prod.pro.feat.1.t": "24 or 27 mm plywood",
      "prod.pro.feat.1.d": "Order 27 mm where extra flange stiffness helps within the same beam height and flange width.",
      "prod.pro.feat.2.t": "Polymer end caps",
      "prod.pro.feat.2.d": "Closed ends reduce chip‑out and moisture at end zones in service.",
      "prod.pro.feat.3.t": "Codes",
      "prod.pro.feat.3.d": "Same GOST R 71938-2025 and EN 13377:2002; PUR per EN 301 / EN 204-205.",

      "prod.pro.table.title": "Technical data",
      "prod.pro.table.sub": "Pro line parameters; confirm with the latest test reports for your project.",
      "prod.pro.table.tag1": "GOST R 71938-2025",
      "prod.pro.table.tag2": "EN 13377:2002",
      "prod.pro.table.r1.p": "Standard lengths",
      "prod.pro.table.r1.u": "m",
      "prod.pro.table.r1.v": "2.45–5.90 (series per deck)",
      "prod.pro.table.r1.n": "Span 1.5–6.0 m",
      "prod.pro.table.r2.p": "Mass",
      "prod.pro.table.r2.u": "kg/m",
      "prod.pro.table.r2.v": "4.8",
      "prod.pro.table.r2.n": "nominal; confirm for 27 mm",
      "prod.pro.table.r3.p": "Height / flange",
      "prod.pro.table.r3.u": "mm",
      "prod.pro.table.r3.v": "200 / 40×80",
      "prod.pro.table.r3.n": "beam section",
      "prod.pro.table.r4.p": "Plywood (flange)",
      "prod.pro.table.r4.u": "mm",
      "prod.pro.table.r4.v": "24 or 27",
      "prod.pro.table.r4.n": "FSF, Pro line",
      "prod.pro.table.r5.p": "End protection",
      "prod.pro.table.r5.u": "—",
      "prod.pro.table.r5.v": "Polymer end caps",
      "prod.pro.table.r5.n": "higher impact resistance",
      "prod.pro.table.r6.p": "Wood moisture",
      "prod.pro.table.r6.u": "%",
      "prod.pro.table.r6.v": "12 ± 2",
      "prod.pro.table.r6.n": "kiln controlled",

      "prod.pro.gallery.overlay": "Flange stiffness & Pro ends",
      "prod.pro.aside.title": "Quality assurance",
      "prod.pro.aside.text": "Accredited lab testing to GOST and EN; batch marking and traceability.",
      "prod.pro.aside.link": "Manufacturing & QC",

      "contact.hero.kicker": "Inquiry",
      "contact.hero.title": "Contact Koros",
      "contact.hero.lead": "Ask for a quotation, marking samples or technical documentation for H20 beams.",
      "contact.form.title": "Product inquiry",
      "contact.form.name": "Full name",
      "contact.form.company": "Company",
      "contact.form.email": "Email",
      "contact.form.phone": "Phone",
      "contact.form.materials": "Details",
      "contact.form.beam": "Line",
      "contact.form.qty": "Quantity, m (run)",
      "contact.form.details": "Message",
      "contact.form.submit": "Submit request",
      "contact.opt.norm": "H20 Norm",
      "contact.opt.pro": "H20 Pro",
      "contact.opt.both": "Both lines / TBD",
      "contact.opt.custom": "Other request",

      "contact.locations.title": "Locations",
      "contact.addr.officeSpb.title": "St. Petersburg office",
      "contact.addr.officeSpb.line": "Yakornaya St. 7AD, Saint Petersburg",
      "contact.addr.plant.title": "Tikhoretsy plant",
      "contact.addr.plant.line1": "Leningrad Oblast, Russia,",
      "contact.addr.plant.line2": "Tikhoretsy, Naberezhnaya St. 1N",
      "contact.map.open": "Open in Yandex Maps",
      "contact.map.ariaOffice": "Map: Saint Petersburg office",
      "contact.map.ariaPlant": "Map: Tikhoretsy production site",
      "contact.addr.title": "Address",
      "contact.direct.title": "Direct line",
      "contact.direct.phone": "Phone",
      "contact.direct.email": "Email",
      "contact.direct.messengers": "Messengers",
      "contact.form.phoneHint": "8 800 333-22-33",

      "contact.bento.title": "Docs & support",
      "contact.bento.doc.t": "Technical pack",
      "contact.bento.doc.p": "Presentation, certificates and lab reports — downloads section.",
      "contact.bento.doc.link": "Open section",
      "contact.bento.compare.t": "Application examples",
      "contact.bento.compare.p": "Where H20 beams fit in real jobs — see the product page.",
      "contact.bento.compare.link": "Open",
      "contact.bento.support.t": "Urgent matter",
      "contact.bento.support.p": "Call or email — we reply during business hours.",
      "contact.bento.support.link": "Call now",

      "cert.hero.kicker": "Documents",
      "cert.title": "Certificates & testing",
      "cert.sub": "Compliance evidence and tender-ready document bundles on request.",
      "cert.card1.t": "Test reports",
      "cert.card1.p": "Mechanical test results from accredited labs. Issued on demand for a batch or section.",
      "cert.card1.link": "Request",
      "cert.card2.t": "Certificates & declarations",
      "cert.card2.p": "Document sets for GOST and technical regulations — scoped together with your procurement team.",
      "cert.card2.link": "Request",
      "cert.card3.t": "Product presentation",
      "cert.card3.p": "PDF overview with key data, Norm/Pro differences and contacts.",
      "cert.card3.link": "Download PDF",
      "cert.std.title": "Referenced standards",
      "cert.std.p": "GOST R 71938-2025; EN 13377:2002; GOST 8486-86 (timber); GOST 3916.1-2018 & EN 636-3 (plywood); EN 301 / EN 204-205 (adhesive systems).",

      "objects.hero.kicker": "Projects",
      "objects.title": "Our projects",
      "objects.lead": "This section is in preparation: case studies with our H20 beams will appear here.",
      "objects.placeholder": "We are preparing content for this page. For deliveries and references, please contact us.",
      "objects.cta": "Get in touch",
    },
  };

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "ru") return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    var dict = STRINGS[lang] || STRINGS.ru;
    document.documentElement.lang = lang === "en" ? "en" : "ru";

    var titleKey = document.documentElement.getAttribute("data-i18n-document-title");
    if (titleKey && dict[titleKey]) {
      document.title = dict[titleKey];
    }

    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      var mk = meta.getAttribute("data-i18n-content");
      if (mk && dict[mk]) meta.setAttribute("content", dict[mk]);
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key && dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (key && dict[key] != null) el.setAttribute("title", dict[key]);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      if (key && dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (key && dict[key] != null) el.setAttribute("alt", dict[key]);
    });

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var target = btn.getAttribute("data-lang-set");
      var on = target === lang;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      LANG_SWITCH_ACTIVE.forEach(function (c) {
        btn.classList.toggle(c, on);
      });
      LANG_SWITCH_INACTIVE.forEach(function (c) {
        btn.classList.toggle(c, !on);
      });
    });

    if (window.KorosLayout && typeof window.KorosLayout.syncHeaderHeight === "function") {
      window.KorosLayout.syncHeaderHeight();
    }
  }

  function initI18nUi() {
    var lang = getLang();
    applyLang(lang);
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-set"));
      });
    });
  }

  window.KorosI18n = {
    getLang: getLang,
    setLang: setLang,
    applyLang: applyLang,
    STRINGS: STRINGS,
  };

  // Скрипты с defer после </body> дают readyState "interactive": DOMContentLoaded ещё не был,
  // но ветка else вызывала init до вставки шапки (layout.js на том же DOMContentLoaded).
  if (document.readyState === "complete") {
    initI18nUi();
  } else {
    document.addEventListener("DOMContentLoaded", initI18nUi);
  }
})();
