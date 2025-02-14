const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Импортируем пакет CORS

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();

// Включаем CORS для всех источников
app.use(cors()); // Это позволяет принимать запросы с других доменов

app.use(bodyParser.json());

const makeCounter = () => {
  let count = 0;
  return () => count++; // Функция для генерации уникальных идентификаторов
};

const itemsIdCounter = makeCounter();

// Временное хранилище для объявлений
let items = [
  {
    id: itemsIdCounter(),
    name: "Квартира на Пушкинской",
    description: "Просторная квартира в центре города",
    location: "Москва, Пушкинская",
    type: ItemTypes.REAL_ESTATE,
    propertyType: "Квартира",
    area: 80,
    rooms: 3,
    price: 15000000,
  },
  {
    id: itemsIdCounter(),
    name: "Toyota Camry",
    description: "Автомобиль в отличном состоянии",
    location: "Санкт-Петербург",
    type: ItemTypes.AUTO,
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 30000,
  },
  {
    id: itemsIdCounter(),
    name: "Ремонт квартир",
    description: "Качественный ремонт квартир и домов",
    location: "Новосибирск",
    type: ItemTypes.SERVICES,
    serviceType: "Строительные работы",
    experience: 5,
    cost: 5000,
  },
];

// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Проверяем обязательные общие поля
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для недвижимости" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для авто" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для услуг" });
      }
      break;
    default:
      return res.status(400).json({ error: "Некорректный тип" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item); // Возвращаем новое объявление
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  res.json(items); // Отправляем все объявления
});

// Получение объявления по id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item); // Отправляем найденное объявление
  } else {
    res.status(404).send("Объявление не найдено"); // Если не нашли — 404
  }
});

// Обновление объявления по id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body); // Обновляем данные объявления
    res.json(item); // Отправляем обновлённое объявление
  } else {
    res.status(404).send("Объявление не найдено"); // Если не нашли — 404
  }
});

// Удаление объявления по id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1); // Удаляем объявление из массива
    res.status(204).send(); // Возвращаем статус 204 (успешно удалено)
  } else {
    res.status(404).send("Объявление не найдено"); // Если не нашли — 404
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
