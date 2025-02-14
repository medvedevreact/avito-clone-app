import React from "react";
import { FaVk, FaOdnoklassniki, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.description}>
        AvitoClone — ваша платформа для покупки и продажи товаров. Мы стремимся
        сделать процесс торговли простым и удобным для всех пользователей.
      </p>
      <div className={styles.socialLinks}>
        <a
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaVk className={styles.icon} />
        </a>
        <a
          href="https://ok.ru"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaOdnoklassniki className={styles.icon} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaYoutube className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};
