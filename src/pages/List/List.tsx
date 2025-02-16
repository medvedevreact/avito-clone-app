import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Listings } from "../../components/Listings/Listings";
import { Container } from "../../components/Container/Container";

import styles from "./List.module.scss";

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
