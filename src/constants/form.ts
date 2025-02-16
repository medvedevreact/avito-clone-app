export const typeFields = {
  Недвижимость: [
    { label: "Тип недвижимости", type: "text", name: "propertyType" },
    { label: "Площадь", type: "number", name: "area" },
    { label: "Количество комнат", type: "number", name: "rooms" },
    { label: "Цена", type: "number", name: "price" },
  ],
  Авто: [
    { label: "Марка", type: "text", name: "brand" },
    { label: "Модель", type: "text", name: "model" },
    { label: "Год", type: "number", name: "year" },
    { label: "Пробег", type: "number", name: "mileage" },
  ],
  Услуги: [
    { label: "Тип услуги", type: "text", name: "serviceType" },
    { label: "Опыт", type: "number", name: "experience" },
    { label: "Стоимость", type: "number", name: "cost" },
  ],
};

export const types = [
  { label: "Недвижимость", value: "Недвижимость" },
  { label: "Авто", value: "Авто" },
  { label: "Услуги", value: "Услуги" },
];

export const commonFields = [
  { label: "Название", type: "text", name: "name" },
  { label: "Описание", type: "text", name: "description" },
  { label: "Местоположение", type: "text", name: "location" },
];

export const stepTitles = ["Выбор категории", "Заполнение информации"];

export const emptyItemState = {
  Недвижимость: {
    type: "Недвижимость",
    name: "",
    description: "",
    location: "",
    propertyType: "",
    area: "",
    rooms: "",
    price: "",
  },
  Авто: {
    type: "Авто",
    name: "",
    description: "",
    location: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
  },
  Услуги: {
    type: "Услуги",
    name: "",
    description: "",
    location: "",
    serviceType: "",
    experience: "",
    cost: "",
  },
};
