import styles from "./App.module.css";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import { PlanetsContext, SpaceshipsContext } from "./context/galaxyContext";
import SpaceTravelRouter from "./routes/SpaceTravelRouter";
import { useEffect, useState } from "react";

function App() {
  // NOTE: normally, we use a separate provider file to not dirty the App.jsx, but I wanted to keep it here for learning purposes
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  useEffect(() => {
    console.log(
      "localStorage spacecrafts",
      JSON.parse(localStorage.getItem("MOCK_DB")).spacecrafts
    );
    // console.log("spacecrafts in context", spacecrafts);
    setSpacecrafts(JSON.parse(localStorage.getItem("MOCK_DB")).spacecrafts);
  }, []);

  return (
    <>
      <PlanetsContext.Provider value={planets}>
        <SpaceshipsContext.Provider value={{ spacecrafts, setSpacecrafts }}>
          <TopNavigation />
          <SpaceTravelRouter />
        </SpaceshipsContext.Provider>
      </PlanetsContext.Provider>
    </>
  );
}

export default App;
