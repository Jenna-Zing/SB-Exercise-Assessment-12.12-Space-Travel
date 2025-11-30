import { Link } from "react-router-dom";
import styles from "./TopNavigation.module.css";

export default function TopNavigation() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        🌎 Home
      </Link>
      <Link to="/spacecrafts" className={styles.navLink}>
        🚀 Spacecrafts
      </Link>
      <Link to="/planets" className={styles.navLink}>
        🪐 Planets
      </Link>
    </nav>
  );
}
