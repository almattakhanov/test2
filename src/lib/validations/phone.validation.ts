import { z } from "zod";

export const phoneSchema = z.object({
    phone: z
        .string()
        .min(19, 'Введите полный номер')
        .regex(/^\+996 \(\d{3}\) \d{2}-\d{2}-\d{2}$/, 'Неверный формат номера'),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
