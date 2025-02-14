import { z } from "zod";

const commonFieldsSchema = z.object({
  name: z.string().min(2, "Название должно содержать минимум 2 символа"),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов"),
  location: z.string().min(2, "Укажите местоположение"),
});

const realEstateSchema = commonFieldsSchema.extend({
  type: z.literal("Недвижимость"),
  propertyType: z.string().min(2, "Укажите тип недвижимости"),
  area: z
    .number({ invalid_type_error: "Площадь должна быть числом" })
    .min(1, "Площадь должна быть больше 0"),
  rooms: z
    .number({ invalid_type_error: "Количество комнат должно быть числом" })
    .min(1, "Количество комнат должно быть больше 0"),
  price: z
    .number({ invalid_type_error: "Цена должна быть числом" })
    .min(1, "Цена должна быть больше 0"),
});

const autoSchema = commonFieldsSchema.extend({
  type: z.literal("Авто"),
  brand: z.string().min(2, "Укажите марку автомобиля"),
  model: z.string().min(2, "Укажите модель автомобиля"),
  year: z
    .number({ invalid_type_error: "Год должен быть числом" })
    .min(1900, "Год должен быть корректным"),
  mileage: z
    .number({ invalid_type_error: "Пробег должен быть числом" })
    .min(0, "Пробег не может быть отрицательным"),
});

const servicesSchema = commonFieldsSchema.extend({
  type: z.literal("Услуги"),
  serviceType: z.string().min(2, "Укажите тип услуги"),
  experience: z
    .number({ invalid_type_error: "Опыт должен быть числом" })
    .min(0, "Опыт не может быть отрицательным"),
  cost: z
    .number({ invalid_type_error: "Стоимость должна быть числом" })
    .min(1, "Стоимость должна быть больше 0"),
});

export const listingSchema = z.discriminatedUnion("type", [
  realEstateSchema,
  autoSchema,
  servicesSchema,
]);

export type ListingFormData = z.infer<typeof listingSchema>;
