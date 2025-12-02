import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <header className={styles.header}>
        <h1>Welcome Space Traveler!</h1>
        <p>
          Explore the wonders of the universe, from spacecrafts to distant
          planets, and even build your own space station!
        </p>
      </header>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Spacecrafts</h3>
          <ul>
            <li>
              Browse our collection of spacecrafts designed for interstellar
              travel.
            </li>
            <li>Construct your own spacecraft!</li>
            <li>Destroy a spacecraft</li>
          </ul>
        </div>
        <div className={styles.feature}>
          <h3>Planets</h3>
          <ul>
            <li>
              Discover new and exciting planets waiting to be explored by
              intrepid space travelers.
            </li>
            <li>Click a planet then the desired spacecraft to move it!</li>
          </ul>
        </div>
      </div>
    </>
  );
}
