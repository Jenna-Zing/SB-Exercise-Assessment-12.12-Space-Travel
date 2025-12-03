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
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []); // empty dependency array means this will run only on mount (aka first page load)

  async function loadInitialData() {
    setLoading(true);

    const planetsRes = await SpaceTravelApi.getPlanets();
    const spacecraftRes = await SpaceTravelApi.getSpacecrafts();

    setSpacecrafts(spacecraftRes.data); // update the global context with fetched data
    setPlanets(planetsRes.data);

    console.log(planetsRes.data, spacecraftRes.data);

    setLoading(false);
  }

  async function handlePlanetClick(planetId) {
    if (selectedPlanetId === planetId) {
      setSelectedPlanetId(null); // deselect planet if clicked again
      console.log("1");
      return;
    } else {
      console.log("2", planetId, typeof planetId);
      setSelectedPlanetId(planetId); // select new planet
    }

    // console.log(`clicked planet ${planetId}, selected: ${selectedPlanetId}`);

    await trySendingSpacecraft(selectedSpacecraftId, planetId);
  }

  async function handleSpacecraftClick(spacecraftId) {
    console.log(`selected spacecraft ${spacecraftId}`);
    if (selectedSpacecraftId === spacecraftId) {
      setSelectedSpacecraftId(null); // deselect spacecraft if the selected is clicked again
      return;
    } else {
      setSelectedSpacecraftId(spacecraftId); // select spacecraft
    }

    await trySendingSpacecraft(spacecraftId, selectedPlanetId);
  }

  async function trySendingSpacecraft(spacecraftId, planetId) {
    console.log(`trying to send ${spacecraftId} to planet ${planetId}`);

    if (planetId !== 0 && (!spacecraftId || !planetId)) return; // must select both a destination planet and spacecraft in order to move the spacecraft to new planet

    // if the selected spacecraft is already on the target planet, do not move it
    const selectedSpacecraft = spacecrafts.find((s) => s.id === spacecraftId);
    if (!selectedSpacecraft) return; // safety check

    if (selectedSpacecraft.currentLocation === planetId) {
      return; // the selected spacecraft is already at the destination planet!  So do not proceed with calling API
    }

    // setLoading to true for API calls
    setLoading(true);

    await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId: planetId,
    });

    // Refresh planets and spacecrafts from API
    const planetsRes = await SpaceTravelApi.getPlanets();
    const spacecraftRes = await SpaceTravelApi.getSpacecrafts();
    setPlanets(planetsRes.data);
    setSpacecrafts(spacecraftRes.data);

    // Deselect both after successful transfer
    setSelectedPlanetId(null);
    setSelectedSpacecraftId(null);

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
              <div
                className={`${styles.planetInfoCard} ${
                  selectedPlanetId === planet.id ? styles.selected : ""
                }`}
                onClick={() => handlePlanetClick(planet.id)}
              >
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
                    className={`${styles.spacecraftInfoCard} ${
                      selectedSpacecraftId === spacecraft.id
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleSpacecraftClick(spacecraft.id)}
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
