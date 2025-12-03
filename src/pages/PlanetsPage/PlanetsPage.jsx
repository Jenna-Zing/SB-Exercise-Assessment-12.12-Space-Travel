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
    try {
      setLoading(true);

      const planetsRes = await SpaceTravelApi.getPlanets();
      const spacecraftRes = await SpaceTravelApi.getSpacecrafts();

      setSpacecrafts(spacecraftRes.data); // update the global context with fetched data
      setPlanets(planetsRes.data);

      console.log(
        "Initial Data Load for Planets Page\n",
        "planets\n",
        planetsRes.data,
        "\nspacecrafts",
        spacecraftRes.data
      );

      setLoading(false);
    } catch (err) {
      console.log(`error while loading initial data for planets page`, err);
    }
  }

  async function handlePlanetClick(planetId) {
    if (selectedPlanetId === planetId) {
      setSelectedPlanetId(null); // deselect planet if clicked again
      return;
    } else {
      setSelectedPlanetId(planetId); // select new planet
    }

    await trySendingSpacecraft(selectedSpacecraftId, planetId);
  }

  async function handleSpacecraftClick(spacecraftId) {
    if (selectedSpacecraftId === spacecraftId) {
      setSelectedSpacecraftId(null); // deselect spacecraft if the selected is clicked again
      return;
    } else {
      setSelectedSpacecraftId(spacecraftId); // select spacecraft
    }

    await trySendingSpacecraft(spacecraftId, selectedPlanetId);
  }

  async function trySendingSpacecraft(spacecraftId, planetId) {
    try {
      // abort if planetId is NOT 0, AND (spacecraftId is missing OR planetId is missing)
      if (planetId !== 0 && (!spacecraftId || !planetId)) return; // must select both a destination planet and spacecraft in order to move the spacecraft to new planet

      // if the selected spacecraft is already on the target planet, do not move it
      const selectedSpacecraft = spacecrafts.find((s) => s.id === spacecraftId);
      if (!selectedSpacecraft) return; // safety check

      if (selectedSpacecraft.currentLocation === planetId) {
        console.log(
          `The selected spacecraft with id: ${spacecraftId} is already at the planet id: ${planetId}.  Please select a different spaceship or planet!`
        );
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

      console.log(
        `successfully deployed spacecraftId: ${spacecraftId} to planetId: ${planetId}`
      );
    } catch (err) {
      console.log(
        `error while trying to deploy spacecraft: ${spacecraftId} to planetId: ${planetId}`
      );
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.pageContainer}>
      <h1>Planets Page</h1>
      <p>
        To deploy a spaceship to another planet, select the spaceship then the
        destination planet, or vice versa! The selected planet and/or spaceship
        is indicated by a red outline.
      </p>

      <p>
        Click the selected planet/spacecraft to unselect it. If the spacecraft
        is at the desired planet already, you can either: (1) unselect the
        current spacecraft and select a spacecraft located on another planet, or
        (2) unselect the current planet and select a new planet to move the
        currently selected spacecraft to.
      </p>

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
