import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import { z } from "zod";

import styles from "./ListingForm.module.scss";

import {
  commonFields,
  stepTitles,
  typeFields,
  types,
} from "../../constants/form";
import { useAppDispatch } from "../../store";
import { addItem } from "../../store/itemsSlice";
import { useNavigate } from "react-router-dom";
import { ListingFormData, listingSchema } from "./ListingFormShema";
import { trimObjectValues } from "../../lib/utils";

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

export const ListingForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState<Partial<ListingFormData>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setFormData(defaultFormState[type]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const isNumericField = [
      "area",
      "rooms",
      "price",
      "year",
      "mileage",
      "experience",
      "cost",
    ].includes(name);

    const parsedValue = isNumericField
      ? value === ""
        ? -1
        : Number(value)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
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
        const newErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
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
            <button
              type="button"
              className={styles.button}
              onClick={nextStep}
              disabled={!formData.type}
            >
              Следующий шаг
            </button>
          </div>
        )}

        {step === 1 && formData.type && (
          <div className={styles.fields}>
            <ul className={styles.inputs}>
              {commonFields.map((field) => (
                <div key={field.name} className={styles.field}>
                  <label className={styles.label}>
                    {field.label}:
                    <input
                      className={styles.input}
                      type={field.type}
                      name={field.name}
                      value={
                        formData[field.name as keyof ListingFormData] === 0 ||
                        formData[field.name as keyof ListingFormData] === -1
                          ? ""
                          : formData[field.name as keyof ListingFormData] || ""
                      }
                      onChange={handleInputChange}
                    />
                  </label>
                  {errors[field.name] && (
                    <span className={styles.error}>{errors[field.name]}</span>
                  )}
                </div>
              ))}

              {typeFields[formData.type]?.map((field) => (
                <div key={field.name} className={styles.field}>
                  <label className={styles.label}>
                    {field.label}:
                    <input
                      className={styles.input}
                      type={field.type}
                      name={field.name}
                      value={
                        formData[field.name as keyof ListingFormData] === 0 ||
                        formData[field.name as keyof ListingFormData] === -1
                          ? ""
                          : formData[field.name as keyof ListingFormData] || ""
                      }
                      onChange={handleInputChange}
                    />
                  </label>
                  {errors[field.name] && (
                    <span className={styles.error}>{errors[field.name]}</span>
                  )}
                </div>
              ))}
            </ul>

            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                type="button"
                onClick={prevStep}
              >
                Предыдущий шаг
              </button>
              <button onClick={handleSubmit} className={styles.button}>
                Отправить
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
