import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./SpacecraftDetailsPage.module.css";
import Loading from "../../components/Loading/Loading";

const SpacecraftDetailsPage = () => {
  const { id } = useParams(); // get ID from URL via navigate in spacecrafts page
  const [spacecraft, setSpacecraft] = useState(null); // 1. spacecraft is always initially null

  // dependency array -> includes ID so we refetch info when ID changes
  // 3. fetch the data
  useEffect(() => {
    loadSpacecraftDetails();
  }, [id]);

  async function loadSpacecraftDetails() {
    let response = await SpaceTravelApi.getSpacecraftById({ id });
    console.log(`spacecraft id ${id}`);
    console.log("spacecraft details", response.data);
    setSpacecraft(response.data);
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 2. Conditionally render loading component when data is not defined.
          4.  Show the data when it is defined */}
      {!spacecraft ? (
        <Loading />
      ) : (
        <div className={styles.detailsContainer}>
          <div className={styles.imageContainer}>
            {spacecraft.pictureUrl ? <img src={spacecraft.pictureUrl} /> : "🚀"}
          </div>

          {/* Details Section */}
          <div className={styles.infoContainer}>
            {/* LEFT SECTION */}
            <div className={styles.leftInfo}>
              <p>Name: {spacecraft.name}</p>
              <p>Capacity: {spacecraft.capacity}</p>
            </div>

            <div className={styles.rightInfo}>
              <p>Description: </p>
              <p className={styles.description}>{spacecraft.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacecraftDetailsPage;
