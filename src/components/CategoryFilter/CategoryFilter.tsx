import React from "react";
import styles from "./CategoryFilter.module.scss";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: Set<string>;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className={styles.categoryFilter}>
      <label>Фильтр по категории:</label>
      {categories.map((category) => (
        <div key={category} className={styles.categoryCheckbox}>
          <input
            type="checkbox"
            id={`category-${category}`}
            checked={selectedCategories.has(category)}
            onChange={() => onCategoryChange(category)}
          />
          <label htmlFor={`category-${category}`}>{category}</label>
        </div>
      ))}
    </div>
  );
};
