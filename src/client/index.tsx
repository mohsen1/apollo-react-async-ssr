import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

import App from "../components/App";
import ClientAppContainer from "./ClientAppContainer";

const render = async () => {
  const root = document.getElementById("root");

  await Loadable.preloadAll();

  ReactDOM.hydrate(
    <ClientAppContainer>
      <App />
    </ClientAppContainer>,
    root
  );
};

render();
