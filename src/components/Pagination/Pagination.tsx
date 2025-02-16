import React from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Назад
      </button>
      <span>Страница {currentPage}</span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages || totalItems === 0}
      >
        Вперед
      </button>
    </div>
  );
};
