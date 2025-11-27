import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

export default function SpaceTravelRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* all other paths wll route to '/', aka Home Page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
