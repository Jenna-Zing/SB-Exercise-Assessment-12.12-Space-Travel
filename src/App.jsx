import styles from "./App.module.css";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import { PlanetsContext, SpacecraftsContext } from "./context/galaxyContext";
import SpaceTravelRouter from "./routes/SpaceTravelRouter";
import { useEffect, useState } from "react";

function App() {
  // NOTE TO SELF: normally, we use a separate provider file to not dirty the App.jsx, but I wanted to keep it here for learning purposes
  // Initialize the global contexts with empty arrays.  I'm letting the spacecrafts page and planets page call the respective API's to initialize them
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  // NOTE:  passing setPlanets and setSpacecrafts to the context, so individual pages can update the values when calling the API's
  return (
    <>
      <PlanetsContext.Provider value={{ planets, setPlanets }}>
        <SpacecraftsContext.Provider value={{ spacecrafts, setSpacecrafts }}>
          <TopNavigation />
          <div className={styles.pageContainer}>
            <SpaceTravelRouter />
          </div>
        </SpacecraftsContext.Provider>
      </PlanetsContext.Provider>
    </>
  );
}

export default App;
