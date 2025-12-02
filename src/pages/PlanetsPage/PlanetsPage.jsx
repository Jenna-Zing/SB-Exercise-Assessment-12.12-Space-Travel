import { useState, useEffect, useContext } from "react";
import {
  PlanetsContext,
  SpacecraftsContext,
} from "../../context/galaxyContext";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./PlanetsPage.module.css";
import Loading from "../../components/Loading/Loading";

export default function PlanetsPage() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const { spacecrafts, setSpacecrafts } = useContext(SpacecraftsContext);

  const [loading, setLoading] = useState(true);
  // const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  // const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null);

  useEffect(() => {
    loadData();
  }, []); // empty dependency array means this will run only on mount (aka first page load)

  async function loadData() {
    setLoading(true);

    const planetsRes = await SpaceTravelApi.getPlanets();
    const spacecraftRes = await SpaceTravelApi.getSpacecrafts();

    setSpacecrafts(spacecraftRes.data); // update the global context with fetched data
    setPlanets(planetsRes.data);

    console.log(planetsRes.data, spacecraftRes.data);

    setLoading(false);
  }

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.pageContainer}>
      <h1>Planets Page</h1>
      <p>Click the destination planet, then the spacecraft you want to move!</p>

      <div className={styles.planetsList}>
        {planets.map((planet) => {
          const stationedSpacecrafts = spacecrafts.filter(
            (spacecraft) => spacecraft.currentLocation === planet.id
          );

          return (
            <div key={planet.id} className={styles.planetCard}>
              <div className={styles.planetInfoCard}>
                {planet.pictureUrl ? (
                  <img
                    src={planet.pictureUrl}
                    alt={planet.name}
                    className={styles.planetImg}
                  />
                ) : (
                  <div className={styles.placeholderImg}>🪐</div>
                )}
                <p>{planet.name}</p>
                <p>{planet.currentPopulation}</p>
              </div>

              <div className={styles.spacecraftsContainer}>
                {stationedSpacecrafts.map((spacecraft) => (
                  <div
                    key={spacecraft.id}
                    className={styles.spacecraftInfoCard}
                  >
                    {spacecraft.pictureUrl ? (
                      <img
                        src={spacecraft.pictureUrl}
                        alt={spacecraft.name}
                        className={styles.spacecraftImg}
                      />
                    ) : (
                      <div className={styles.placeholderSpacecraftImg}>🚀</div>
                    )}
                    <div>{spacecraft.name}</div>
                    <div>{spacecraft.capacity}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
