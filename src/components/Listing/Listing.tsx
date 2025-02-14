import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/listings";
import styles from "./Listing.module.scss";

interface ListingProps {
  item: Item;
}

const defaultImageUrl =
  "https://avatars.mds.yandex.net/get-mpic/6780724/img_id5398870021742881284.jpeg/orig";

export const Listing = ({ item }: ListingProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div className={styles.listing} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img
          src={item.imageUrl || defaultImageUrl}
          alt={item.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3>{item.name}</h3>
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
      </div>
    </div>
  );
};
