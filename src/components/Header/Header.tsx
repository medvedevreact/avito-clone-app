import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/AvitoCloneLogo.png";
import styles from "./Header.module.scss";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <Link to="/list">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/list">
          <button className={styles.navItem}>Объявления</button>
        </Link>
        <Link to="/form">
          <button className={styles.navItem}>Добавить объявление</button>
        </Link>
      </nav>
    </header>
  );
};
