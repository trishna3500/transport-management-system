import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminPanelPage from "./pages/AdminPanelPage";
import { default as BusRequisition } from "./pages/BusRequisitionPage";

import { router } from "./routes/Route";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
