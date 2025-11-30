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

  // // 2. conditionally render -> SHOW LOADING COMPONENT while data is not defined
  // if (!spacecraft) {
  //   return <Loading />;
  // }

  // // 4. SHOW SPACECRAFT DETAILS WHEN DATA IS DEFINED
  // return (
  //   <div className={styles.detailsContainer}>
  //     <div className={styles.imageContainer}>img - centered</div>

  //     {/* Details Section */}
  //     <div className={styles.infoContainer}>
  //       {/* LEFT SECTION */}
  //       <div className={styles.leftInfo}>
  //         <p>Name: {spacecraft.name}</p>
  //         <p>Capacity: {spacecraft.capacity}</p>
  //       </div>

  //       <div className={styles.rightInfo}>
  //         <p>Description: </p>
  //         <p className={styles.description}>{spacecraft.description}</p>
  //       </div>
  //       <div> left flex: name and capacity</div>
  //       <div> right flex: description </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className={styles.pageWrapper}>
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
