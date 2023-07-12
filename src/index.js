import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./context/AuthContext";
import { DataProvider } from "./context/DatabaseContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext>
    <DataProvider>
      <React.Fragment>
        <App />
      </React.Fragment>
    </DataProvider>
  </UserContext>
);
