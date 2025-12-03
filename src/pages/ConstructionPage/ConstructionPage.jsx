import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./ConstructionPage.module.css";
import Loading from "../../components/Loading/Loading";

export default function ConstructionPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // setting Loading to false by default, because we only want to show loading when building

  // "Controlled Components" Form State
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(""); // Capacity is a number, but Form inputs always produce *strings* - e.g. e.target.value is always a string, so when input is empty, it's a ""
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [errors, setErrors] = useState([]);

  function handleBack() {
    navigate(-1); // navigate to previous page
  }

  async function handleBuild() {
    /*  
    PSEUDO-CODE for myself   
      1. Check if any of the required fields are empty
      1a. If all of the required fields are defined
      1a-error. Successful case -> setErrors to empty.  Then -> go ahead with the build.
      1b. If any of the required fields are empty
      1b-error. new errors detected -> clear out any previous errors
      2. Figure out which fields are empty.
      3. add the missing strings to errors - e.g. "name is required!"
      4. do not build.
      5. render the errors 
    */
    try {
      /* new array = new reference.  
         I do this because React *only re-renders when the state's **reference** changes*, not when its contents change... */
      const newErrors = [];

      // 1. Check if any of the required fields are empty
      // 2. Figure out which fields are empty, and add missing field strings to errors if so.
      if (!name.trim()) newErrors.push("Name is required!");
      if (!capacity) newErrors.push("Capacity is required!");
      if (!description.trim()) newErrors.push("Description is required!");

      // If we found errors -> show them and stop - do NOT build
      if (newErrors.length > 0) {
        setErrors(newErrors); // the key to this is newErrors is a new array which is a new reference so this updates correctly!
        console.log(
          "You are missing required fields for building a spacecraft!  Please fill them out and try again.",
          newErrors
        );
        return; // STOP!  ERRORS DETECTED, so we do NOT build the spacecraft and abort!
      } else {
        /* NO ERRORS -> clear old errors if any 
          - e.g. didn't fill in all required fields the first time and tried building, 
            and still didn't fill out all required fields before hitting build again */
        setErrors([]);
        // NOTE TO SELF: I made this a new empty array for clarity and readability.  Remember, empty array = new reference, so this still updates correctly.
      }

      // SUCCESSFUL CASE: no errors detected, so we can build the spacecraft!

      // Show loading for building the spacecraft and resetting form
      setLoading(true);

      // Call API to build spacecraft - note: this adds it to the persistent localStorage
      await SpaceTravelApi.buildSpacecraft({
        name,
        capacity: Number(capacity),
        description,
        pictureUrl: pictureUrl || null,
      });

      // Reset the form fields back to empty
      setName("");
      setCapacity("");
      setDescription("");
      setPictureUrl("");

      setLoading(false);
      console.log(`successfully built spaceship ${name}!`);
    } catch (err) {
      console.log("error encountered during spacecraft construction!", err);
    }
  }

  return (
    <div className={styles.pageContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.topBar}>
            <button onClick={() => handleBack()}>Back</button>
          </div>
          <div className={styles.formBox}>
            {/* FORM */}
            <label>
              Name*:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Capacity*:
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </label>
            <label>
              Description*:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Picture URL:
              <input
                type="text"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.buildButtonRow}>
            <button
              className={styles.buildButton}
              onClick={() => handleBuild()}
            >
              Build
            </button>
          </div>
          {errors.length > 0 && (
            <div className={styles.error}>
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
