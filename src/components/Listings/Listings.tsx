import React, { useEffect } from "react";
import { Listing } from "../Listing/Listing";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchItems } from "../../store/itemsSlice";
import styles from "./Listings.module.scss";

export const Listings = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  if (status === "failed" || error) {
    return <div>{error || "Ошибка при загрузке данных."}</div>;
  }

  return (
    <div className={styles.listings}>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Listing item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных объявлений 😞</p>
      )}
    </div>
  );
};
