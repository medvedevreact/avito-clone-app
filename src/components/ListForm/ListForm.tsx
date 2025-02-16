import React from "react";
import styles from "./ListForm.module.scss";
import { Item } from "../../types/listings";
import { commonFields, typeFields } from "../../constants/form";

interface ListFormProps {
  type: string;
  isEdit: boolean;
  handleSave: () => void;
  formData: Omit<Item, "id">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  errors: { [key: string]: string };
  nextStep?: () => void;
  prevStep?: () => void;
}

export const ListForm: React.FC<ListFormProps> = ({
  type,
  isEdit,
  formData,
  onChange,
  handleSave,
  onClose,
  errors,
  nextStep,
  prevStep,
}) => {
  const fields = typeFields[type as keyof typeof typeFields] || [];

  return (
    <form className={styles.form}>
      {commonFields.map((field) => (
        <div className={styles.formField} key={field.name}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}:
          </label>
          <input
            className={styles.input}
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={onChange}
          />
          {errors[field.name] && (
            <span className={styles.error}>{errors[field.name]}</span>
          )}
        </div>
      ))}

      {fields.map((field) => (
        <div className={styles.formField} key={field.name}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}:
          </label>
          <input
            className={styles.input}
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={onChange}
          />
          {errors[field.name] && (
            <span className={styles.error}>{errors[field.name]}</span>
          )}
        </div>
      ))}

      {isEdit ? (
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={onClose}>
            Отмена
          </button>
          <button type="button" className={styles.button} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          {prevStep && (
            <button className={styles.button} type="button" onClick={prevStep}>
              Предыдущий шаг
            </button>
          )}
          {nextStep && (
            <button
              className={styles.button}
              type="button"
              onClick={handleSave}
            >
              Создать
            </button>
          )}
        </div>
      )}
    </form>
  );
};
