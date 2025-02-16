import { useEffect, useState } from "react";
import { z } from "zod";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EditModal } from "../../components/modals/EditModal";
import { listingSchema } from "../../components/ListingForm/ListingFormShema";
import { trimObjectValues } from "../../lib/utils";
import { Container } from "../../components/Container/Container";
import { Item as ItemType } from "../../types/listings";
import { updateItem } from "../../store/itemsSlice";
import { useAppDispatch } from "../../store";
import { emptyItemState, typeFields } from "../../constants/form";
import styles from "./Item.module.scss";

export const Item = () => {
  const { id } = useParams();

  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ItemType, "id"> | null>(null);
  const [errors, setErrors] = useState({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setItem(response.data);
      } catch (error) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const openModal = () => {
    if (item) {
      setFormData({ ...emptyItemState[item.type], ...item });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(null);
  };

  const handleSave = async () => {
    try {
      const trimmedFormData = trimObjectValues(formData);
      const validatedForm = listingSchema.parse(trimmedFormData);

      const updatedItem = await dispatch(
        updateItem({ id: Number(id), updatedItem: validatedForm })
      ).unwrap();

      setItem(updatedItem);
      closeModal();
      setErrors({});
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

  if (loading)
    return (
      <Container>
        <div className={styles.item}>Загрузка...</div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className={styles.item}>{error}</div>
      </Container>
    );
  if (!item)
    return (
      <Container>
        <div className={styles.item}>Объявление не найдено.</div>
      </Container>
    );

  return (
    <Container>
      <div className={styles.item}>
        <div className={styles.imageContainer}>
          <img
            src={
              "https://avatars.mds.yandex.net/get-mpic/6780724/img_id5398870021742881284.jpeg/orig"
            }
            alt={item.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <h2>{item.name}</h2>
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
                {field.label}: {item[field.name as keyof ItemType]}
              </span>
            ))}
          </div>
          <button className={styles.editButton} onClick={openModal}>
            Редактировать
          </button>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Редактировать объявление"
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        errors={errors}
      />
    </Container>
  );
};
