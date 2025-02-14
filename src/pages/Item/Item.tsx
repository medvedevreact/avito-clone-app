import React, { useEffect, useState } from "react";

import styles from "./Item.module.scss";
import { EditModal } from "../../components/modals/EditModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { listingSchema } from "../../components/ListingForm/ListingFormShema";
import { trimObjectValues } from "../../lib/utils";
import { z } from "zod";

const defaultFormState = {
  Недвижимость: {
    type: "Недвижимость",
    name: "",
    description: "",
    location: "",
    propertyType: "",
    area: 0,
    rooms: 0,
    price: 0,
  },
  Авто: {
    type: "Авто",
    name: "",
    description: "",
    location: "",
    brand: "",
    model: "",
    year: 0,
    mileage: -1,
  },
  Услуги: {
    type: "Услуги",
    name: "",
    description: "",
    location: "",
    serviceType: "",
    experience: -1,
    cost: 0,
  },
};

export const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  console.log(formData);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setItem(response.data);
      } catch (error) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const openModal = () => {
    if (item) {
      setFormData({ ...defaultFormState[item.type], ...item });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(null);
  };

  const handleSave = async () => {
    try {
      const trimmedFormData = trimObjectValues(formData);
      const validatedForm = listingSchema.parse(trimmedFormData);

      await axios.put(`http://localhost:3000/items/${id}`, validatedForm);
      setItem(validatedForm);
      closeModal();
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>Объявление не найдено.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.imageContainer}>
          <img
            src={
              item.imageUrl ||
              "https://avatars.mds.yandex.net/get-mpic/6780724/img_id5398870021742881284.jpeg/orig"
            }
            alt={item.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>
            <b>Местоположение:</b> {item.location}
          </p>
          <p>
            <b>Тип:</b> {item.type}
          </p>
          {item.type === "Недвижимость" && (
            <div className={styles.details}>
              <span>Площадь: {item.area} м²</span>
              <span>Комнаты: {item.rooms}</span>
              <span>Цена: {item.price} руб.</span>
            </div>
          )}
          {item.type === "Авто" && (
            <div className={styles.details}>
              <span>Марка: {item.brand}</span>
              <span>Модель: {item.model}</span>
              <span>Год: {item.year}</span>
              <span>Пробег: {item.mileage} км</span>
            </div>
          )}
          {item.type === "Услуги" && (
            <div className={styles.details}>
              <span>Тип услуги: {item.serviceType}</span>
              <span>Опыт: {item.experience} лет</span>
              <span>Стоимость: {item.cost} руб.</span>
            </div>
          )}
          <button className={styles.editButton} onClick={openModal}>
            Редактировать
          </button>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Редактировать объявление"
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        errors={errors}
      />
    </div>
  );
};
