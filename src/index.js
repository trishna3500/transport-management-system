import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./context/AuthContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext>
    <React.Fragment>
      <App />
    </React.Fragment>
  </UserContext>
);
