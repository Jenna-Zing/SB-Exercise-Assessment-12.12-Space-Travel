import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./SpaceCraftsPage.module.css";
import SpacecraftDetailsPage from "../SpacecraftDetailsPage/SpacecraftDetailsPage";
import { SpaceshipsContext } from "../../context/galaxyContext";

export default function SpaceCraftsPage() {
  // TODO: rename to spacecraftsContext not spaceshipsContext
  const {
    spacecrafts: spaceshipsFromContext,
    setSpacecrafts: setSpacecraftsFromContext,
  } = useContext(SpaceshipsContext);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const navigate = useNavigate();

  // must put dependency array so it only runs once on mounting* / initial page load, so useEffect doesn't run after each render... runs infinitely if so
  useEffect(() => {
    loadSpacecrafts();
  }, []);

  async function loadSpacecrafts() {
    let response = await SpaceTravelApi.getSpacecrafts();
    setSpacecrafts(response.data);
    console.log("res data for spacecrafts", response.data);
  }

  function handleImgClick(spacecraftId) {
    navigate(`/spacecrafts/${spacecraftId}`);
  }

  function handleBuildSpacecraftClick() {
    navigate(`/construction`);
  }

  return (
    <>
      <h1>Space Crafts Page</h1>
      <button onClick={() => handleBuildSpacecraftClick()}>
        Build a Spacecraft
      </button>
      {/* {JSON.stringify(spacecrafts)} */}
      {spaceshipsFromContext.map((spacecraft) => {
        return (
          <div key={`spacecraft-${spacecraft.id}`} className={styles.spCard}>
            <div
              className={styles.spCardItem}
              onClick={() => handleImgClick(spacecraft.id)}
            >
              {spacecraft.pictureUrl ? (
                <img src={spacecraft.pictureUrl} />
              ) : (
                "🚀"
              )}
            </div>
            <div className={styles.spCardDetails}>
              <p>Name: {spacecraft.name}</p>
              <p>Capacity: {spacecraft.capacity}</p>
            </div>
            <div className={styles.spCardItem}>
              <button>Destroy</button>
            </div>
            {/* <p>Name: {spacecraft.name}</p>
              <p>Capacity: {spacecraft.capacity}</p>
              <p>{spacecraft.id}</p>
              <p>{spacecraft.description}</p>
              <p>{spacecraft.currentLocation}</p>
              <p>{spacecraft.pictureUrl}</p> */}
          </div>
        );
      })}
      <div>
        {spacecrafts.map((spacecraft) => {
          return (
            <div key={`spacecraft-${spacecraft.id}`} className={styles.spCard}>
              <div
                className={styles.spCardItem}
                onClick={() => handleImgClick(spacecraft.id)}
              >
                {spacecraft.pictureUrl ? (
                  <img src={spacecraft.pictureUrl} />
                ) : (
                  "🚀"
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
              {/* <p>Name: {spacecraft.name}</p>
              <p>Capacity: {spacecraft.capacity}</p>
              <p>{spacecraft.id}</p>
              <p>{spacecraft.description}</p>
              <p>{spacecraft.currentLocation}</p>
              <p>{spacecraft.pictureUrl}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
