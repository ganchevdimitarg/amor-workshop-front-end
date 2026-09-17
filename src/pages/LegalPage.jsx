import { SHOP_NAME, CURRENCY, ADMIN_EMAIL, TRANSPORT_COMPANIES } from "../config";
import { useLanguage } from "../context/LanguageContext";

const lastUpdated = "17.09.2026";
const companyName = SHOP_NAME;
const registrationNumber = "[Номер / Number]";
const registeredAddress = "[Адрес / Address]";
const contactEmail = ADMIN_EMAIL;
const couriersBg = TRANSPORT_COMPANIES.join(" / ");
const couriersEn = TRANSPORT_COMPANIES.join(" / ");

const legalContent = {
    bg: {
        privacy: {
            title: "Политика за поверителност и защита на личните данни",
            updatedLabel: "Последна промяна",
            intro: `Добре дошли в ${SHOP_NAME}. Ние уважаваме вашата поверителност и се ангажираме да защитаваме вашите лични данни в съответствие с Общия регламент за защита на данните (GDPR). Тази политика описва как събираме, използваме и съхраняваме информацията ви, когато посещавате нашия уебсайт или правите поръчка.`,
            sections: [
                {
                    title: "1. Администратор на лични данни",
                    paragraphs: ["Администратор на личните данни, събирани чрез този сайт, е:"],
                    list: [
                        `Фирма: ${companyName}`,
                        `ЕИК/Булстат: ${registrationNumber}`,
                        `Адрес: ${registeredAddress}`,
                        `Имейл за връзка: ${contactEmail}`,
                    ],
                },
                {
                    title: "2. Какви данни събираме и защо?",
                    paragraphs: ["Ние събираме само данни, които са абсолютно необходими за обработката и доставката на вашите поръчки:"],
                    list: [
                        "Име и фамилия: За идентифициране на получателя на пратката.",
                        "Телефонен номер: За връзка от наша страна или от страна на куриерската фирма при доставка.",
                        "Адрес за доставка: За физическо изпращане на поръчаните стоки до личен адрес или офис на куриер.",
                        "Имейл адрес: За изпращане на потвърждение за поръчката и статус на доставката.",
                    ],
                    note: "Ние НЕ събираме, НЕ изискваме и НЕ съхраняваме данни за банкови карти, тъй като сайтът не поддържа онлайн картови разплащания.",
                },
                {
                    title: "3. Правно основание за обработка",
                    paragraphs: [
                        "Ние обработваме вашите лични данни на основание изпълнение на договор — заявка за покупка на стока — и за спазване на законови финансови задължения, включително счетоводство.",
                    ],
                },
                {
                    title: "4. Споделяне на данни с трети страни",
                    paragraphs: [
                        `Вашите данни се предоставят изключително и само на партньорските куриерски фирми (${couriersBg}), с цел физическа доставка на поръчката ви. Тези компании нямат право да използват данните ви за други цели.`,
                    ],
                },
                {
                    title: "5. Срок на съхранение",
                    paragraphs: [
                        "Ние съхраняваме вашите лични данни само толкова дълго, колкото е необходимо за изпълнение на поръчката и съгласно изискванията на данъчното и счетоводното законодателство.",
                    ],
                },
                {
                    title: "6. Вашите права",
                    paragraphs: ["Съгласно GDPR вие имате право на:"],
                    list: [
                        "Достъп до вашите лични данни.",
                        "Коригиране на неточни данни.",
                        "Изтриване на вашите данни („правото да бъдеш забравен“), освен ако те са необходими за текуща поръчка или счетоводни цели.",
                        "Ограничаване на обработката.",
                    ],
                    note: "За да упражните някое от тези права, свържете се с нас на посочения имейл.",
                },
            ],
        },
        terms: {
            title: "Общи условия за ползване на онлайн магазин",
            updatedLabel: "Последна промяна",
            intro: `Тези Общи условия уреждат отношенията между ${SHOP_NAME}, наричан по-долу „Продавач“, и потребителите, наричани по-долу „Купувач“, които използват уебсайта и правят поръчки през него.`,
            sections: [
                {
                    title: "1. Общи положения",
                    paragraphs: [
                        `С извършването на поръчка в ${SHOP_NAME}, Купувачът заявява, че е запознат и приема настоящите Общи условия.`,
                        "Продавачът си запазва правото да променя Общите условия по всяко време, като промените влизат в сила от момента на публикуването им на сайта.",
                    ],
                },
                {
                    title: "2. Поръчки и сключване на договор",
                    paragraphs: [
                        "Поръчка може да бъде направена от всяко лице, което е попълнило коректно формата за поръчка — име, телефон, адрес и имейл.",
                        "Натискането на бутона за завършване на поръчката се счита за изпращане на оферта от Купувача към Продавача.",
                        "Договорът за покупко-продажба от разстояние се счита за сключен, след като Продавачът потвърди поръчката чрез имейл или телефонно обаждане.",
                    ],
                },
                {
                    title: "3. Цени и плащане",
                    paragraphs: [
                        `Всички цени на сайта са в ${CURRENCY} и са крайни за потребителя.`,
                        "Цените на продуктите не включват цената за доставка. Цената за доставка се начислява отделно.",
                        "Начини на плащане: Сайтът поддържа плащане чрез Наложен платеж — в брой или с карта на куриера при получаване на пратката — или чрез Банков превод преди изпращане на стоката.",
                    ],
                },
                {
                    title: "4. Отговорност",
                    paragraphs: [
                        "Продавачът не носи отговорност за грешки в наличността на продуктите, но се задължава да информира Купувача възможно най-бързо, ако даден продукт не е наличен в момента.",
                    ],
                },
            ],
        },
        shipping: {
            title: "Условия за доставка и връщане на стоки",
            updatedLabel: "Последна промяна",
            intro: "",
            sections: [
                {
                    title: "1. Срокове и цени за доставка",
                    paragraphs: [
                        `Ние изпращаме нашите продукти чрез куриерски фирми ${couriersBg}.`,
                        "Поръчките се обработват в рамките на 1-2 работни дни от момента на потвърждението им.",
                        "Стандартният срок за доставка е 24 до 48 часа след изпращане на пратката за работни дни.",
                        "Цената за доставка се изчислява автоматично по тарифите на куриера или се уточнява при потвърждение на поръчката.",
                    ],
                },
                {
                    title: "2. Получаване на пратката и плащане",
                    paragraphs: [
                        "Всички пратки се изпращат с опция „Преглед и тест“, ако е приложимо за продукта. Купувачът заплаща стойността на поръчката на куриера в момента на получаване — Наложен платеж — освен ако плащането не е извършено предварително по банков път.",
                    ],
                },
                {
                    title: "3. Право на отказ и връщане (Рекламации)",
                    paragraphs: [
                        "Съгласно Закона за защита на потребителите (ЗЗП), Купувачът има право да се откаже от закупената стока в срок от 14 дни от датата на получаването ѝ, без да посочва причина.",
                        "Условия за връщане на стока:",
                    ],
                    list: [
                        "Стоката трябва да бъде в оригиналния си вид, опаковка и без следи от употреба, повреди или замърсявания.",
                        "Всички придружаващи документи — касова бележка, фактура, гаранция — трябва да бъдат върнати заедно със стоката.",
                        "Разходите за транспорт при връщане на стоката са изцяло за сметка на Купувача, освен в случаите, когато стоката е дефектна или е изпратен грешен продукт по вина на Продавача.",
                    ],
                },
                {
                    title: "4. Възстановяване на суми",
                    paragraphs: [
                        "След като получим върнатата стока и се уверим в нейния търговски вид, ние ще възстановим платената сума на Купувача в срок до 14 дни. Тъй като сайтът няма вградена платежна система за карти, възстановяването на суми се извършва по банков път на предоставена от Купувача банкова сметка (IBAN).",
                    ],
                },
            ],
        },
    },
    en: {
        privacy: {
            title: "Privacy Policy and Data Protection",
            updatedLabel: "Last Updated",
            intro: `Welcome to ${SHOP_NAME}. We respect your privacy and are committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR). This policy outlines how we collect, use, and store your information when you visit our website or place an order.`,
            sections: [
                {
                    title: "1. Data Controller",
                    paragraphs: ["The controller of personal data collected through this website is:"],
                    list: [
                        `Company Name: ${companyName}`,
                        `Registration Number / VAT: ${registrationNumber}`,
                        `Registered Address: ${registeredAddress}`,
                        `Contact Email: ${contactEmail}`,
                    ],
                },
                {
                    title: "2. What Data We Collect and Why",
                    paragraphs: ["We only collect data that is strictly necessary to process and deliver your orders:"],
                    list: [
                        "First and Last Name: To identify the recipient of the shipment.",
                        "Phone Number: For updates regarding delivery by us or the courier company.",
                        "Shipping Address: To physically deliver the ordered goods to a personal address or a courier locker/office.",
                        "Email Address: To send order confirmations and tracking information.",
                    ],
                    note: "We DO NOT collect, request, or store bank card data, as this website does not support online credit/debit card payments.",
                },
                {
                    title: "3. Legal Basis for Processing",
                    paragraphs: [
                        "We process your personal data based on the performance of a contract — processing your purchase order — and to comply with statutory financial obligations, including accounting and invoicing laws.",
                    ],
                },
                {
                    title: "4. Sharing Data with Third Parties",
                    paragraphs: [
                        `Your data is shared exclusively with our partner courier and delivery companies (${couriersEn}) for the sole purpose of physically delivering your order. These companies are not authorized to use your data for any other purposes.`,
                    ],
                },
                {
                    title: "5. Data Retention Period",
                    paragraphs: [
                        "We retain your personal data only for as long as necessary to fulfill the order and to comply with mandatory tax and accounting preservation periods under applicable law.",
                    ],
                },
                {
                    title: "6. Your Rights",
                    paragraphs: ["Under the GDPR, you have the right to:"],
                    list: [
                        "Access your personal data.",
                        "Rectify inaccurate data.",
                        'Erase your data ("the right to be forgotten"), unless it is required for an active order or legal accounting compliance.',
                        "Restrict data processing.",
                    ],
                    note: "To exercise any of these rights, please contact us at the provided email address.",
                },
            ],
        },
        terms: {
            title: "Terms of Service",
            updatedLabel: "Last Updated",
            intro: `These Terms of Service govern the relationship between ${SHOP_NAME}, hereinafter referred to as the "Seller", and the users, hereinafter referred to as the "Buyer", who use this website and place orders through it.`,
            sections: [
                {
                    title: "1. General Provisions",
                    paragraphs: [
                        `By placing an order on ${SHOP_NAME}, the Buyer declares that they have read and accepted these Terms of Service.`,
                        "The Seller reserves the right to modify these terms at any time, and changes become effective immediately upon being posted to the website.",
                    ],
                },
                {
                    title: "2. Orders and Formation of Contract",
                    paragraphs: [
                        "Orders can be placed by any individual who accurately completes the checkout form, providing name, phone, address, and email.",
                        "Clicking the final order button constitutes a purchase offer made by the Buyer to the Seller.",
                        "The distance purchase contract is deemed concluded once the Seller confirms the order via email or phone call.",
                    ],
                },
                {
                    title: "3. Prices and Payment",
                    paragraphs: [
                        `All prices on the website are displayed in ${CURRENCY} and are final for the consumer.`,
                        "Product prices do not include delivery charges. Shipping costs are calculated and billed separately.",
                        "Payment Methods: This website supports Cash on Delivery (COD), payment in cash or by card directly to the courier upon receiving the package, or Bank Wire Transfer before shipping.",
                    ],
                },
                {
                    title: "4. Liability",
                    paragraphs: [
                        "The Seller is not responsible for unexpected stock discrepancies but agrees to inform the Buyer as quickly as possible if a selected product becomes unavailable.",
                    ],
                },
            ],
        },
        shipping: {
            title: "Shipping and Returns Policy",
            updatedLabel: "Last Updated",
            intro: "",
            sections: [
                {
                    title: "1. Shipping Timelines and Rates",
                    paragraphs: [
                        `We ship our products using courier companies such as ${couriersEn}.`,
                        "Orders are processed within 1-2 business days from the moment they are confirmed.",
                        "Standard delivery time is usually 2 to 3 business days following shipment.",
                        "Shipping costs are calculated dynamically based on courier rates at checkout or are confirmed separately before dispatch.",
                    ],
                },
                {
                    title: "2. Order Receipt and Payment",
                    paragraphs: [
                        "Packages are sent out allowing the Buyer to inspect the contents upon delivery, where service is supported by the courier. The Buyer pays the total amount of the order to the courier at the moment of delivery (Cash on Delivery), unless a prior payment via bank transfer was settled.",
                    ],
                },
                {
                    title: "3. Right of Withdrawal and Returns",
                    paragraphs: [
                        "In accordance with consumer protection laws, the Buyer has the right to withdraw from the purchase contract within 14 days from the date of receiving the goods, without stating any reason.",
                        "Conditions for a Valid Return:",
                    ],
                    list: [
                        "The item must be in its original condition, original packaging, and show no signs of use, damage, or wear.",
                        "All accompanying documents — receipts, invoices, warranty papers — must be sent back together with the product.",
                        "Return shipping costs are fully covered by the Buyer, except in cases where the item is defective or a wrong product was sent due to the Seller’s mistake.",
                    ],
                },
                {
                    title: "4. Refunds",
                    paragraphs: [
                        "Once we receive the returned product and verify its merchantable condition, we will refund the Buyer within 14 days. Since this website does not process credit cards online, refunds are executed exclusively via Bank Wire Transfer to an IBAN bank account provided by the Buyer.",
                    ],
                },
            ],
        },
    },
};

export default function LegalPage({ type }) {
    const { lang } = useLanguage();
    const page = legalContent[lang]?.[type] ?? legalContent.en[type];

    return (
        <article className="legal-page">
            <header className="legal-page__header">
                <p className="legal-page__eyebrow">{page.updatedLabel}: {lastUpdated}</p>
                <h1>{page.title}</h1>
                {page.intro ? <p className="legal-page__intro">{page.intro}</p> : null}
            </header>

            <div className="legal-page__content">
                {page.sections.map((section) => (
                    <section className="legal-page__section" key={section.title}>
                        <h2>{section.title}</h2>

                        {section.paragraphs?.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}

                        {section.list ? (
                            <ul>
                                {section.list.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        ) : null}

                        {section.note ? <p className="legal-page__note">{section.note}</p> : null}
                    </section>
                ))}
            </div>
        </article>
    );
}