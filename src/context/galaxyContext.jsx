import { createContext } from "react";

// contains the planets and spaceships context - see the App.jsx for the ContextProviders, which makes the data accessible to components within it
export const PlanetsContext = createContext(null);
export const SpaceshipsContext = createContext(null);
