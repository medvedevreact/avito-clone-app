import { useNavigate } from "react-router-dom";
import { Item } from "../../types/listings";
import { typeFields } from "../../constants/form";

import styles from "./Listing.module.scss";

interface ListingProps {
  item: Item;
}

const defaultImageUrl =
  "https://avatars.mds.yandex.net/get-mpic/6780724/img_id5398870021742881284.jpeg/orig";

export const Listing = ({ item }: ListingProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div className={styles.listing}>
      <div className={styles.imageContainer}>
        <img src={defaultImageUrl} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>
          <b>Местоположение:</b> {item.location}
        </p>
        <p>
          <b>Тип:</b> {item.type}
        </p>
        <div className={styles.details}>
          {typeFields[item.type]?.map((field) => (
            <span key={field.name}>
              {field.label}: {item[field.name as keyof Item]}
            </span>
          ))}
        </div>
        <button onClick={handleClick} className={styles.openButton}>
          Открыть
        </button>
      </div>
    </div>
  );
};
