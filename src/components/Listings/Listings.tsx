import { useEffect, useState } from "react";
import { Listing } from "../Listing/Listing";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchItems } from "../../store/itemsSlice";

import styles from "./Listings.module.scss";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import { Pagination } from "../Pagination/Pagination";

export const Listings = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const itemsPerPage = 5;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const allCategories = new Set(items.map((item) => item.type));
    setSelectedCategories(allCategories);
  }, [items]);

  const filteredItems =
    selectedCategories.size > 0
      ? items.filter((item) => selectedCategories.has(item.type))
      : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const categories = Array.from(new Set(items.map((item) => item.type)));

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setCurrentPage(1);
  };

  if (status === "loading") {
    return <div className={styles.listings}>Загрузка...</div>;
  }

  if (status === "failed" || error) {
    return <div>{error || "Ошибка при загрузке данных."}</div>;
  }

  return (
    <div className={styles.listings}>
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      {currentItems.length > 0 ? (
        <ul>
          {currentItems.map((item) => (
            <li key={item.id}>
              <Listing item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных объявлений 😞</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
