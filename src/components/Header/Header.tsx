import React from "react";
import Logo from "/img/AvitoCloneLogo.png";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/list">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navItem}>Объявления</button>
        <button className={styles.navItem}>Добавить объявление</button>
      </nav>
    </header>
  );
};
