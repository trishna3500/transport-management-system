import {
  Navigate,
  Route, Routes
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminPanelPage from "./pages/AdminPanelPage";
import { default as BusRequisition } from "./pages/BusRequisitionPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ViewRequisitionPage from "./pages/ViewRequisitionPage";

function App() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/requisition" element={<BusRequisition />} />
    {currentUser ?
      (
        <>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/requisition" element={<BusRequisitionPage />} /> */}
          <Route path="/view-requisition" element={<ViewRequisitionPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
        </>
      ) :
      (
        <>
        <Route path="/" element={<HomePage />} />
        <Route path="/requisition" element={<BusRequisition />} />
          <Route path="/signin" element={<LoginPage />} />
        </>
      )}
    <Route path="*" element={<Navigate replace to={currentUser ? "/" : "/"} />} />
  </Routes>

  );
}

export default App;
