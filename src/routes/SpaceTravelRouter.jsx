import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SpaceCraftsPage from "../pages/SpaceCraftsPage/SpaceCraftsPage";
import ConstructionPage from "../pages/ConstructionPage/ConstructionPage";
import PlanetsPage from "../pages/PlanetsPage/PlanetsPage";
import SpacecraftDetailsPage from "../pages/SpacecraftDetailsPage/SpacecraftDetailsPage";

export default function SpaceTravelRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spacecrafts" element={<SpaceCraftsPage />} />
      <Route path="/construction" element={<ConstructionPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="/spacecrafts/:id" element={<SpacecraftDetailsPage />} />

      {/* all other paths wll route to '/', aka Home Page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
