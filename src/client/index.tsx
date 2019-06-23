import React from "react";
import ReactDOM from "react-dom";

import App from "../components/App";
import ClientAppContainer from "./ClientAppContainer";

const root = document.getElementById("root");

ReactDOM.hydrate(
  <ClientAppContainer>
    <App />
  </ClientAppContainer>,
  root
);
