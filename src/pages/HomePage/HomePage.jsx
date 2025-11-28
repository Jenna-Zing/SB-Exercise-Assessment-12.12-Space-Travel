import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      {/* TODO: add details about the app functionality */}
      <div className={styles.container}>
        <h1>Welcome Space Traveler!</h1>
        <p>
          <br />
          Explore the wonders of the universe, from spacecrafts to distant
          planets, and even build your own space station!
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Spacecrafts</h3>
            <p>
              Browse our collection of spacecrafts designed for interstellar
              travel.
            </p>
            <ul>
              <li>Construct your own spacecraft!</li>
              <li>Destroy a spacecraft</li>
            </ul>
          </div>
          <div className={styles.feature}>
            <h3>Planets</h3>
            <p>
              Discover new and exciting planets waiting to be explored by
              intrepid space travelers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
