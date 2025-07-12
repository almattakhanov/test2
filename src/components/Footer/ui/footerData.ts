// export const contacts = [
//     {
//         href: 'tel:8585',
//         icon: '/footer/phone.svg',
//         alt: 'phone',
//         label: '85-85',
//     },
//     {
//         href: 'mailto:info@bakai.store',
//         icon: '/footer/mail.svg',
//         alt: 'mail',
//         label: 'info@bakai.store',
//     },
// ]
//
// export const socialLinks = [
//     { href: '#', icon: '/footer/facebook.svg', alt: 'Facebook' },
//     { href: '#', icon: '/footer/whatsapp.svg', alt: 'WhatsApp' },
//     { href: '#', icon: '/footer/instagram.svg', alt: 'Instagram' },
// ]
//
// export const footerColumns = [
//     {
//         title: 'Покупателям',
//         links: [
//             { href: '/place-order', label: 'Как сделать заказ?' },
//             { href: '/payment-delivery', label: 'Оплата и доставка' },
//             { href: '/return-policy', label: 'Политика возврата' },
//         ],
//     },
//     {
//         title: 'Партнёрам',
//         links: [
//             { href: '#', label: 'Правила сотрудничества' },
//             { href: '#', label: 'Стать продавцом' },
//         ],
//     },
//     {
//         title: 'О нас',
//         links: [
//             { href: '/about-us', label: 'О компании' },
//             // { href: '#', label: 'Документы Bakai.Store' },
//             { href: '#', label: 'Политика безопасности' },
//             { href: '/offer', label: 'Оферта' },
//             { href: '#', label: 'Контакты' },
//         ],
//     },
// ]

type ContactItem = {
    href: string;
    icon: string;
    alt: string;
    labelKey: TranslationKey;
};

export const contacts: ContactItem[] = [
    {
        href: 'tel:8585',
        icon: '/footer/phone.svg',
        alt: 'phone',
        labelKey: 'contacts.phone',
    },
    {
        href: 'mailto:info@bakai.store',
        icon: '/footer/mail.svg',
        alt: 'mail',
        labelKey: 'contacts.email',
    },
];


export const socialLinks = [
    { href: '#', icon: '/footer/facebook.svg', alt: 'Facebook' },
    { href: '#', icon: '/footer/whatsapp.svg', alt: 'WhatsApp' },
    { href: '#', icon: '/footer/instagram.svg', alt: 'Instagram' },
];

type FooterLink = {
    href: string;
    labelKey: TranslationKey;
};

type FooterColumn = {
    titleKey: TranslationKey;
    links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
    {
        titleKey: 'footer.buyers',
        links: [
            { href: '/place-order', labelKey: 'footer.order' },
            { href: '/payment-delivery', labelKey: 'footer.paymentDelivery' },
            { href: '/return-policy', labelKey: 'footer.returnPolicy' },
        ],
    },
    {
        titleKey: 'footer.partners',
        links: [
            { href: '/rules-of-cooperation', labelKey: 'footer.rules' },
            { href: '/go-into-sales', labelKey: 'footer.becomeSeller' },
        ],
    },
    {
        titleKey: 'footer.about',
        links: [
            { href: '/about-us', labelKey: 'footer.aboutCompany' },
            { href: '/security-policy', labelKey: 'footer.securityPolicy' },
            { href: '/offer', labelKey: 'footer.offer' },
            { href: '/contacts', labelKey: 'footer.contacts' },
        ],
    },
];

type TranslationKey =
    | 'footer.buyers'
    | 'footer.order'
    | 'footer.paymentDelivery'
    | 'footer.returnPolicy'
    | 'footer.partners'
    | 'footer.rules'
    | 'footer.becomeSeller'
    | 'footer.about'
    | 'footer.aboutCompany'
    | 'footer.securityPolicy'
    | 'footer.offer'
    | 'footer.contacts'
    | 'contacts.phone'
    | 'contacts.email';
