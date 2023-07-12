import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import LoginPage from "../pages/LoginPage";
import HomeContainer from "../container/HomeContainer";
import ViewRequisitionPage from "../pages/ViewRequisitionPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import { default as BusRequisition } from "../pages/BusRequisitionPage";
import DriverInfoPage from "../pages/DriverInfoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HomeContainer></HomeContainer>,
      },
      {
        path: "/signin",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/view-requisition",
        element: <ViewRequisitionPage></ViewRequisitionPage>,
      },
      {
        path: "/admin",
        element: <AdminPanelPage></AdminPanelPage>,
      },
      {
        path: "/requisition",
        element: <BusRequisition></BusRequisition>,
      },
      {
        path: "/driver",
        element: <DriverInfoPage></DriverInfoPage>,
      },
    ],
  },
]);
