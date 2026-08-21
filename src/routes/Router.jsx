import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Database from "../pages/Database";
import Archetypes from "../pages/Archetypes";
import Sets from "../pages/Sets";
import ArchetypeDetail from "../pages/ArchetypeDetail";
import CardDetail from "../pages/CardDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "database",
        element: <Database />,
      },
      {
        path: "cards/:cardId",
        element: <CardDetail />,
      },
      {
        path: "archetypes",
        element: <Archetypes />,
      },
      {
        path: "sets",
        element: <Sets />,
      },
      {
        path: "archetypes/:archetypeName",
        element: <ArchetypeDetail />,
      },
    ],
  },
]);

export default router;
