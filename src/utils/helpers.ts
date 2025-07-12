export function getMonthLabel(months: number): string {
    if (months === 1) return 'месяц';
    if (months >= 2 && months <= 4) return 'месяца';
    return 'месяцев';
}

export function calculateInstallmentPayments(total: number, months: number): number[] {
    const base = Math.floor(total / months);
    const remainder = total % months;

    const payments = Array(months).fill(base);
    for (let i = 0; i < remainder; i++) {
        payments[i] += 1; // добавляем по 1 сому к первым n месяцам
    }

    return payments;
}

export const formatPrice = (value: number | string): string => {
    const number = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(number)) return '0';

    return number.toLocaleString('ru-RU');
};

export const pluralizeGoods = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return `${count} товар`;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return `${count} товара`;
    } else {
        return `${count} товаров`;
    }
};

export function formatDate(dateStr?: string): string {
    if (!dateStr) return "-";

    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function formatToMask(digits: string) {
    const part1 = digits.slice(0, 3); // XXX
    const part2 = digits.slice(3, 5); // XX
    const part3 = digits.slice(5, 7); // XX
    const part4 = digits.slice(7, 9); // XX

    return `+996 (${part1}) ${part2}-${part3}-${part4}`.trim();
}