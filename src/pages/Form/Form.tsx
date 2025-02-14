import React from "react";
import styles from "./Form.module.scss";
import { ListingForm } from "../../components/ListingForm/ListingForm";

export const Form = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <ListingForm />
      </div>
    </div>
  );
};
