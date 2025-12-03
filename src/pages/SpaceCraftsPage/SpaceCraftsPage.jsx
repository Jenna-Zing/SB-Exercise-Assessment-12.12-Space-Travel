import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./SpaceCraftsPage.module.css";
import SpacecraftDetailsPage from "../SpacecraftDetailsPage/SpacecraftDetailsPage";
import { SpacecraftsContext } from "../../context/galaxyContext";
import Loading from "../../components/Loading/Loading";

export default function SpaceCraftsPage() {
  const { spacecrafts, setSpacecrafts } = useContext(SpacecraftsContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // must put dependency array so it only runs once on mounting* / initial page load, so useEffect doesn't run after each render... runs infinitely if so
  useEffect(() => {
    // load spacecrafts only once when the page first loads
    loadSpacecrafts();
  }, []); // empty dependency array means this will run only on mount (aka first page load)

  async function loadSpacecrafts() {
    try {
      let response = await SpaceTravelApi.getSpacecrafts();
      setSpacecrafts(response.data); // update the global context with fetched data
      setLoading(false);
      console.log(
        "Successful Initial Data Load for Spacecrafts",
        response.data
      );
    } catch (err) {
      console.log(`Error while loading initial data for Spacecrafts Page`, err);
    }
  }

  function handleImgClick(spacecraftId) {
    // navigate to the details page for the individual spacecraft
    navigate(`/spacecrafts/${spacecraftId}`);
  }

  function handleBuildSpacecraftClick() {
    navigate(`/construction`);

    // After building a spacecraft, reload the spacecrafts list so the context is up-to-date with the mockDB
    loadSpacecrafts();
  }

  async function handleDestroySpaceshipClick(spacecraftId) {
    try {
      // show loading while waiting for API to delete spaceship
      setLoading(true);

      // destroy the spaceship
      await SpaceTravelApi.destroySpacecraftById({ id: spacecraftId });

      // After destroying a spacecraft, reload the spacecrafts list so the context is up-to-date with the mockDB
      loadSpacecrafts();

      console.log(`successfully destroyed spacecraft with id: ${spacecraftId}`);
    } catch (err) {
      console.log(
        `error while trying to destroy spacecraftId: ${spacecraftId}`,
        err
      );
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.pageContainer}>
          <h1>Spacecrafts Page</h1>
          <button onClick={() => handleBuildSpacecraftClick()}>
            Build a Spacecraft
          </button>
          <div className={styles.cardsContainer}>
            {spacecrafts.map((spacecraft) => {
              return (
                <div
                  key={`spacecraft-${spacecraft.id}`}
                  className={styles.spCard}
                >
                  <div
                    className={styles.spCardItem}
                    onClick={() => handleImgClick(spacecraft.id)}
                  >
                    {spacecraft.pictureUrl ? (
                      <img
                        src={spacecraft.pictureUrl}
                        alt={spacecraft.name}
                        className={styles.spacecraftImg}
                      />
                    ) : (
                      <div className={styles.placeholderImg}>🚀</div>
                    )}
                  </div>
                  <div className={styles.spCardDetails}>
                    <p>Name: {spacecraft.name}</p>
                    <p>Capacity: {spacecraft.capacity}</p>
                  </div>
                  <div className={styles.spCardItem}>
                    <button
                      onClick={() => handleDestroySpaceshipClick(spacecraft.id)}
                    >
                      Destroy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
