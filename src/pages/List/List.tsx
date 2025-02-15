import React from "react";
import { Listings } from "../../components/Listings/Listings";
import styles from "./List.module.scss";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container/Container";

export const List = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className={styles.listHeader}>
        <h1>Список объявлений:</h1>
        <button onClick={() => navigate("/form")}>
          <FaPlus style={{ marginRight: "8px" }} />
          Разместить объявление
        </button>
      </div>

      <Listings />
    </Container>
  );
};
