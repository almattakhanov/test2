'use client'

import {Header} from "@/src/components/Header/page";
import {Footer} from "@/src/components/Footer/ui/Footer";
import React from "react";
import styles from './Offer.module.scss';
import {useI18n} from "@/locales/client";

const Page = () => {
    const t = useI18n();

    return (
        <>
            <div className='container'>
                <Header/>
                <main className={styles.main}>

                    <h1 className={styles.title}>{t('oferta.title')}</h1>

                    <h2 className={styles.sectionTitle}>{t('oferta.section1.title')}</h2>
                    <p className={styles.paragraph}>
                        {t('oferta.section1.paragraph')}
                    </p>

                    <h2 className={styles.sectionTitle}>{t('oferta.section2.title')}</h2>
                    <ul className={styles.list}>
                        <li>{t('oferta.section2.marketplace')}</li>
                        <li>{t('oferta.section2.seller')}</li>
                        <li>{t('oferta.section2.site')}</li>
                        <li>{t('oferta.section2.sellerPage')}</li>
                        <li>{t('oferta.section2.product')}</li>
                        <li>{t('oferta.section2.buyer')}</li>
                        <li>{t('oferta.section2.personalData')}</li>
                        <li>{t('oferta.section2.order')}</li>
                        <li>{t('oferta.section2.services')}</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>{t('oferta.section3.title')}</h2>
                    <ul className={styles.list}>
                        <li>{t('oferta.section3.intellectualProperty')}</li>
                        <li>{t('oferta.section3.catalog')}</li>
                        <li>{t('oferta.section3.marketplaceInfo')}</li>
                        <li>{t('oferta.section3.responsibility')}</li>
                        <li>{t('oferta.section3.saleMoment')}</li>
                        <li>{t('oferta.section3.order')}</li>
                        <li>{t('oferta.section3.itemRemoval')}</li>
                        <li>{t('oferta.section3.delivery')}</li>
                        <li>{t('oferta.section3.return')}</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>{t('oferta.section4.title')}</h2>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph1')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph2')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph3')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph4')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph5')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph6')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph7')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph8')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph9')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph10')}
                    </p>
                    <p className={styles.paragraph}>
                        {t('oferta.section4.paragraph11')}
                    </p>


                    <h2 className={styles.sectionTitle}>{t('oferta.section5.title')}</h2>
                    <p className={styles.paragraph}>
                        {t('oferta.section5.paragraph1')}
                    </p>


                    {/*<h2 className={styles.sectionTitle}>Статья 1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Информация, размещенная на торговой площадке «Бакай Маркет» (далее — Маркетплейс),*/}
                    {/*    содержит условия предложения покупки товара и представляет собой публичную оферту согласно п. 2*/}
                    {/*    ст. 398 Гражданского кодекса Кыргызской Республики (далее — ГК КР). Акцептом Покупателя*/}
                    {/*    является оформление заказа на предложенный товар (ст. 399 ГК КР). В своей деятельности*/}
                    {/*    Маркетплейс руководствуется положениями ГК КР, Закона Кыргызской Республики от 05.12.1997 №90 «О*/}
                    {/*    защите прав потребителей» (далее — Закон №90), Правил торговли отдельными видами*/}
                    {/*    товаров, утверждённых постановлением Правительства КР от 30.09.2014 №560 (далее — Правила*/}
                    {/*    №560) и иным действующим законодательством Кыргызской Республики (далее –*/}
                    {/*    закон/законодательство).*/}
                    {/*</p>*/}

                    {/*<h2 className={styles.sectionTitle}>Статья 2. ОПРЕДЕЛЕНИЕ УСЛОВИЙ</h2>*/}
                    {/*<ul className={styles.list}>*/}
                    {/*<li><strong>Маркетплейс</strong> — торговая площадка, где информация о товаре обеспечивается*/}
                    {/*    несколькими третьими лицами, в то время как операции обрабатываются единым оператором, то*/}
                    {/*    есть программно-аппаратный комплекс организационных, информационных и технических решений,*/}
                    {/*    обеспечивающих взаимодействие Продавца и покупателя через электронные каналы связи,*/}
                    {/*    предназначенные для предоставления покупателю посредством сети Интернет сведений,*/}
                    {/*    необходимых при совершении покупки, в том числе об ассортименте товаров, ценах, способах и*/}
                    {/*    условиях оплаты и доставки, для приема от покупателей посредством сети Интернет либо*/}
                    {/*    телефонных сообщений о намерении приобрести товары, а также для обеспечения возможности*/}
                    {/*    доставки товаров по указанному покупателем адресу либо до пункта самовывоза.*/}
                    {/*</li>*/}
                    {/*    <li><strong>Продавец</strong> — юридическое лицо либо индивидуальный предприниматель, который*/}
                    {/*        заключил договор с Маркетплейсом о партнерстве, чтобы продавать свой товар размещая его в*/}
                    {/*        мобильных ресурсах/веб-сайте Маркетплейса.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Сайт</strong> — <a href="https://bakai.store">https://bakai.store</a>– принадлежащий*/}
                    {/*        Маркетплейсу и администрируемая им совокупность логически связанных между собой*/}
                    {/*        веб-страницы/мобильного приложения, содержащих данные о товарах и условиях их покупки, по*/}
                    {/*        адресу <a href="https://bakai.store">https://bakai.store</a>.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Страница Продавца</strong> — страница, содержащая сведения об условиях продажи,*/}
                    {/*        доставки и возврата Товаров, реализуемых Продавцами, а также иную информацию, являющуюся*/}
                    {/*        существенной для заключения и исполнения договора купли-продажи Товара. Страница Продавца*/}
                    {/*        доступна по ссылке, размещенной на странице с описанием Товара над кнопкой «Купить в один*/}
                    {/*        клик».*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Товар</strong> — любая реальная вещь или электронный ресурс, представленный в*/}
                    {/*        каталоге на его сайте Маркетплейса.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Покупатель</strong> — лицо, как приобретающее/заказывающее товар, так и*/}
                    {/*        намеревающееся заказать или уже использующее товар для личных, семейных, домашних и иных*/}
                    {/*        нужд, не связанных с осуществлением предпринимательской деятельности.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Персональные данные</strong> — информация, предусмотренная Законом КР от 14.04.2008.*/}
                    {/*        №58 "Об информации персонального характера", добровольно и осознанно предоставляемая*/}
                    {/*        Покупателем при оформлении заказа в Маркетплейсе и необходимая для исполнения Маркетплейсом*/}
                    {/*        заказа Покупателя.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Заказ</strong> — электронная/устная телефонная заявка Покупателя на приобретение*/}
                    {/*        товара из каталога Маркетплейса, согласованная сторонами, принятая и оформленная оператором*/}
                    {/*        Маркетплейса.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>Услуги</strong> — комплекс мероприятий Маркетплейса в отношении Продавца или*/}
                    {/*        Покупателя, осуществляемый с целью исполнения условий продажи товара, включающий в себя, но*/}
                    {/*        не исчерпывающий, такие услуги, как доставка Заказа Покупателю, информирование Покупателя о*/}
                    {/*        процессе исполнения заказа и т.д.*/}
                    {/*    </li>*/}
                    {/*</ul>*/}

                    {/*<h2 className={styles.sectionTitle}>Статья 3. УСЛОВИЯ ПРИОБРЕТЕНИЯ ТОВАРА</h2>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Защита интеллектуальной собственности:</strong> Вся текстовая информация и графические*/}
                    {/*    изображения, размещённые на веб-сайте или мобильном приложении, являются собственностью*/}
                    {/*    Маркетплейса или Продавца.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Электронный каталог:</strong> Описание и цена товара. Наличие товаров, представленных в*/}
                    {/*    каталоге Маркетплейса, определяется индивидуальным статусом товара, отображаемым в жанровом*/}
                    {/*    каталоге и на карточке товара с подробным описанием характеристик. Вся информация о товаре носит*/}
                    {/*    информационный характер и не может полностью передать все свойства и характеристики. Фото,*/}
                    {/*    схемы, рисунки, видеоизображения образцов товара являются собственностью Маркетплейса или*/}
                    {/*    Продавца. Качество настройки и особенности экрана устройства покупателя могут искажать цветовую*/}
                    {/*    гамму товара. Покупатель может обратиться в службу поддержки за дополнительной информацией,*/}
                    {/*    которую консультант может предоставить по телефону или электронной почте.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Информация Маркетплейса о товаре:</strong> На сайте/приложении предоставлена информация*/}
                    {/*    об основных потребительских свойствах, цене, условиях приобретения, доставке, сроке службы,*/}
                    {/*    сроке годности, гарантийном сроке, порядке оплаты и о Продавце.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Ответственность сторон за достоверность информации:</strong> Каждая сторона несёт*/}
                    {/*    ответственность за достоверность предоставляемой информации. Маркетплейс не отвечает за точность*/}
                    {/*    данных, введённых Покупателем при регистрации и создании заказа. Для оформления заказа*/}
                    {/*    необходимо предоставить действительные данные. Продажа осуществляется в реальном времени с*/}
                    {/*    возможными изменениями цены и наличия без предварительного уведомления. Товар резервируется*/}
                    {/*    после обработки заказа.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Момент продажи:</strong> Обязательства Маркетплейса и Покупателя начинаются с момента*/}
                    {/*    получения сообщения о заказе или предоплаты, а продажа считается заключённой с выдачей*/}
                    {/*    кассового/товарного чека. Ответственность за качество товара несёт конкретный Продавец, а*/}
                    {/*    нарушение правил использования товара освобождает Продавца от ответственности.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Заказ товара:</strong> Заказ может быть оформлен через корзину, форму заказа или звонок*/}
                    {/*    оператору. Обязательства возникают после согласования состава заказа и корректности данных.*/}
                    {/*    Изменение состава заказа возможно только после согласования.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Случаи удаления товара из заказа:</strong> Маркетплейс информирует о недостатке товара,*/}
                    {/*    браке, ликвидации продавца, задержках производства, законодательных ограничениях и др.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Доставка и получение товара:</strong> Способ доставки согласовывается при заказе. За три*/}
                    {/*    часа до доставки возможна её смена. Маркетплейс может привлечь третьих лиц для доставки,*/}
                    {/*    ответственность за сохранность почтовых отправлений несёт почта. При получении курьером или в*/}
                    {/*    пункте выдачи покупатель может проверить товар и отказаться при нарушениях качества или*/}
                    {/*    комплектации. В случае отказа после оплаты повторная доставка возможна только после повторной*/}
                    {/*    оплаты.*/}
                    {/*</p>*/}

                    {/*<p className={styles.paragraph}>*/}
                    {/*    <strong>Отказ от товара и возврат:</strong> Покупатель вправе отказаться от товара до его*/}
                    {/*    передачи. Отказ невозможен для товаров надлежащего качества с индивидуально-определёнными*/}
                    {/*    свойствами и технически сложных товаров.*/}
                    {/*</p>*/}


                    {/*<h2 className={styles.sectionTitle}>Статья 4. «НЕКАЧЕСТВЕННЫЙ ТОВАР»</h2>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    В случае возникновения со стороны Покупателя претензий по качеству товара, он должен обратиться*/}
                    {/*    в партнерский сервисный центр Маркетплейса (далее – СЦ) при наличии не истекшего сроком*/}
                    {/*    гарантийного талона. Срок диагностики товара СЦ составляет десять рабочих дней. Для принятия*/}
                    {/*    товара на диагностику для проведения гарантийного ремонта Покупатель обязан предоставить СЦ*/}
                    {/*    следующее (ч. 5 ст. 17 Закона №90): товарный/кассовый чек или документ, подтверждающий уплату*/}
                    {/*    товара в безналичной форме;*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Технический паспорт или иной заменяющий его документ;*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Гарантийный талон;*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Упаковку на товар с сохранением на ней идентификационных данных товара;*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Комплектующие изделия (при наличии);*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Собственно приобретенный товар.*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Срок гарантийного ремонта товара СЦ составляет 30 календарных дней со дня предъявления*/}
                    {/*    требований Покупателем без учета времени на транспортировку, при отсутствии у СЦ необходимых*/}
                    {/*    запасных частей – срок гарантийного ремонта продлевается до 40 дней со дня предъявления*/}
                    {/*    требований Покупателем. Требования Покупателя на предоставление во временное пользование на*/}
                    {/*    период замены/ремонта товара – не распространяется на следующие товары в силу «Перечня товаров*/}
                    {/*    длительного пользования, в том числе комплектующих изделий (деталей узлов, агрегатов), которые*/}
                    {/*    по истечении определенного периода могут представлять опасность для жизни, здоровья потребителя,*/}
                    {/*    причинять вред его имуществу или окружающей среде и на которые изготовитель обязан устанавливать*/}
                    {/*    срок службы», утвержденного постановлением Правительства КР от 12.10.1998. №667:*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Товары для детей: игрушки, коляски и велосипеды детские, узлы и детали к ним; видеоигры;*/}
                    {/*    персональные бытовые компьютеры детские, предметы обихода из полимерных и синтетических*/}
                    {/*    материалов; Оборудование и приборы для отопления и горячего водоснабжения, сантехника: аппараты*/}
                    {/*    (печи) отопительные; котлы отопительные; водоподогреватели и колонки водогрейные; оборудование*/}
                    {/*    санитарно-техническое из металлов и полимеров, из фаянса, полуфарфора и фарфора; арматура и*/}
                    {/*    гарнитура санитарно-техническая;*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Предметы бытового назначения: диваны, кушетки, тахты, кресла-кровати, диваны-кровати, матрацы,*/}
                    {/*    шкафы, мебельные гарнитуры, наборы мебельных изделий, синтетические ковровые изделия, покрытия*/}
                    {/*    для пола. Электробытовые товары (кроме элементов и батарей первичных);*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Спортивные товары: изделия спортивного назначения; спортивная обувь и одежда; прогулочные суда и*/}
                    {/*    плавсредства бытового назначения, агрегаты, узлы и детали к этим судам и плавсредствам; ручное*/}
                    {/*    оружие невоенного назначения. Бытовая радиоэлектронная аппаратура; бытовая вычислительная и*/}
                    {/*    множительная техника; музыкальные инструменты.*/}
                    {/*</p>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Согласно межгосударственному стандарту ГОСТ 27418-87 «Аппаратура радиоэлектронная бытовая.*/}
                    {/*    Термины и определения», утвержденного решением Коллегии Евразийской экономической комиссии от*/}
                    {/*    25.12.2012. №292 "О внесении изменений в Решение Комиссии Таможенного союза от 16.08.2011.*/}
                    {/*    №768", в состав которой входит Кыргызской Республики, под «бытовым радиоэлектронным аппаратом»*/}
                    {/*    понимается радиоэлектронное устройство, применяющееся в быту потребителем для выполнения одной*/}
                    {/*    или нескольких функций: приема, обработки, синтеза, записи, усиления, воспроизведения,*/}
                    {/*    радиовещательных/телевизионных программ, программ проводного вещания, фонограмм/видеограмм, а*/}
                    {/*    также специальных сигналов. К таким устройствам относятся: мобильные телефоны, навигаторы,*/}
                    {/*    компьютеры, принтеры, факсы, телевизоры, радиоприемники, диктофоны, видеорегистраторы, планшеты*/}
                    {/*    и иная радиотехническая/вычислительная/множительная техника, применяемая пользователем в быту*/}
                    {/*    для личного/семейного использования не связанного с предпринимательской/иной экономической*/}
                    {/*    деятельностью.*/}
                    {/*</p>*/}


                    {/*<h2 className={styles.sectionTitle}>Статья 5. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</h2>*/}
                    {/*<p className={styles.paragraph}>*/}
                    {/*    Веб-сайт/мобильное приложение Маркетплейса и предоставляемые сервисы могут временно частично или*/}
                    {/*    полностью недоступны по причине проведения профилактических или иных работ, или по любым другим*/}
                    {/*    причинам технического характера. Техническая служба Маркетплейса имеет право периодически*/}
                    {/*    проводить необходимые профилактические или иные работы с предварительным уведомлением*/}
                    {/*    Покупателей или без такового.*/}
                    {/*</p>*/}
                </main>
            </div>
            <Footer/>
        </>
    );
};


export default Page;