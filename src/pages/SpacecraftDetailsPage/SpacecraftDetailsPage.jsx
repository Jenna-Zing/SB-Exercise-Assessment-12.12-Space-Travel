import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./SpacecraftDetailsPage.module.css";
import Loading from "../../components/Loading/Loading";

const SpacecraftDetailsPage = () => {
  const { id: spacecraftId } = useParams(); // get spacecraftId from URL via navigate in spacecrafts page
  const [spacecraft, setSpacecraft] = useState(null); // 1. spacecraft is always initially null

  // dependency array -> includes ID so we refetch info when ID changes
  // 3. fetch the data
  useEffect(() => {
    loadSpacecraftDetails();
  }, [spacecraftId]);

  async function loadSpacecraftDetails() {
    try {
      // load data about the desired spacecraft by its spacecraftId
      let response = await SpaceTravelApi.getSpacecraftById({
        id: spacecraftId,
      });
      setSpacecraft(response.data);

      console.log(
        `successfully retrieved spacecraft details for spacecraftId: ${spacecraftId}`,
        response.data
      );
    } catch (err) {
      console.log(
        `error occurred while retrieving spacecraft details for spacecraftId: ${spacecraftId}`,
        err
      );
    }
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
