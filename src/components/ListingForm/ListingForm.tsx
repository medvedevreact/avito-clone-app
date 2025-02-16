import React, { useState, ChangeEvent } from "react";
import Stepper from "react-stepper-horizontal";
import { z } from "zod";
import toast from "react-hot-toast";
import { emptyItemState, stepTitles, types } from "../../constants/form";
import { useNavigate } from "react-router-dom";
import { listingSchema } from "./ListingFormShema";
import { trimObjectValues } from "../../lib/utils";
import { useAppDispatch } from "../../store";
import { addItem } from "../../store/itemsSlice";
import { ListForm } from "../ListForm/ListForm";
import { Item } from "../../types/listings";

import styles from "./ListingForm.module.scss";

export const ListingForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<Item>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    // @ts-ignore
    setFormData(emptyItemState[type] || {});
  };

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

  const nextStep = () => {
    if (formData.type) {
      setStep(1);
    } else {
      toast.error("Выберите тип объявления.");
    }
  };

  const prevStep = () => {
    setStep(0);
    setErrors({});
  };

  const handleSubmit = () => {
    try {
      const trimmedFormData = trimObjectValues(formData);
      const validatedForm = listingSchema.parse(trimmedFormData);

      dispatch(addItem(validatedForm));
      setErrors({});
      navigate("/list");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce(
          (acc: { [key: string]: string }, error) => {
            acc[error.path[0]] = error.message;
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <div className={styles.stepper}>
        <Stepper
          steps={stepTitles.map((title) => ({ title }))}
          activeStep={step}
          className={styles.stepper}
        />
      </div>
      <div className={styles.form}>
        <h1 className={styles.title}>{stepTitles[step]}</h1>

        {step === 0 && (
          <div className={styles.typeSelect}>
            <div className={styles.radioGroup}>
              {types.map((t) => (
                <label key={t.value}>
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    onChange={handleTypeChange}
                    checked={formData.type === t.value}
                  />
                  {t.label}
                </label>
              ))}
            </div>
            <button type="button" className={styles.button} onClick={nextStep}>
              Следующий шаг
            </button>
          </div>
        )}

        {step === 1 && (
          <ListForm
            type={formData.type || ""}
            isEdit={false}
            formData={formData as Omit<Item, "id">}
            onChange={handleChange}
            handleSave={handleSubmit}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      </div>
    </>
  );
};
