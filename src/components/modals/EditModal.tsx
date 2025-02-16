import React from "react";
import { Item } from "../../types/listings";

import styles from "./EditModal.module.scss";
import { ListForm } from "../ListForm/ListForm";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: Omit<Item, "id"> | null;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Item, "id"> | null>>;
  handleSave: () => void;
  errors: { [key: string]: string };
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  handleSave,
  errors,
}) => {
  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberFields = [
      "area",
      "rooms",
      "price",
      "year",
      "mileage",
      "experience",
      "cost",
    ];

    const newValue = numberFields.includes(name)
      ? value.trim() === ""
        ? value
        : isNaN(Number(value))
        ? value
        : Number(value)
      : value;

    setFormData((prevData) => ({
      ...prevData!,
      [name]: newValue,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <ListForm
          type={formData.type}
          isEdit={true}
          handleSave={handleSave}
          formData={formData}
          onChange={handleChange}
          onClose={onClose}
          errors={errors}
        />
      </div>
    </div>
  );
};
