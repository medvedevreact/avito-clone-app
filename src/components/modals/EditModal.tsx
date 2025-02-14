import React from "react";
import styles from "./EditModal.module.scss";

import { commonFields, typeFields } from "../../constants/form";

export const EditModal = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  onSave,
  errors,
}) => {
  if (!isOpen || !formData) return null;

  const handleChange = (key, value) => {
    const isNumericField = [
      "area",
      "rooms",
      "price",
      "year",
      "mileage",
      "experience",
      "cost",
    ].includes(key);

    const parsedValue = isNumericField
      ? value === ""
        ? -1
        : Number(value)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [key]: parsedValue,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <div>
          {commonFields.map((field) => (
            <div key={field.name} className={styles.formField}>
              <label>
                <b>{field.label}:</b>
              </label>
              <input
                type={field.type}
                value={
                  formData[field.name] === 0 || formData[field.name] === -1
                    ? ""
                    : formData[field.name] || ""
                }
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
              {errors[field.name] && (
                <span className={styles.error}>{errors[field.name]}</span>
              )}
            </div>
          ))}

          {formData.type &&
            typeFields[formData.type]?.map((field) => (
              <div key={field.name} className={styles.formField}>
                <label>
                  <b>{field.label}:</b>
                </label>
                <input
                  type={field.type}
                  value={
                    formData[field.name] === 0 || formData[field.name] === -1
                      ? ""
                      : formData[field.name] || ""
                  }
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {errors[field.name] && (
                  <span className={styles.error}>{errors[field.name]}</span>
                )}
              </div>
            ))}
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={onClose}>
            Отмена
          </button>
          <button type="button" className={styles.button} onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
