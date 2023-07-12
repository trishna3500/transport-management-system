import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import LoginPage from "../pages/LoginPage";
import HomeContainer from "../container/HomeContainer";

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
    ],
  },
]);
