import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import LoginPage from "../pages/LoginPage";
import HomeContainer from "../container/HomeContainer";
import ViewRequisitionPage from "../pages/ViewRequisitionPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import { default as BusRequisition } from "../pages/BusRequisitionPage";
import DriverInfoPage from "../pages/DriverInfoPage";
import SignUp from "../components/UI/SignUp";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddBusSchedule from "../container/AdminContainer/BusSchedule";
import TeacherSignUp from "../components/UI/TeacherSignUp";
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
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/teacher-signup",
        element: <TeacherSignUp></TeacherSignUp>,
      },
      {
        path: "/view-requisition",
        element: <ViewRequisitionPage></ViewRequisitionPage>,
      },
      {
        path: "/add-schedule",
        element: <AddBusSchedule></AddBusSchedule>,
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
