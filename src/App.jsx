import styles from "./App.module.css";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import SpaceTravelRouter from "./routes/SpaceTravelRouter";

function App() {
  return (
    <>
      <TopNavigation />
      <SpaceTravelRouter />
    </>
  );
}

export default App;
