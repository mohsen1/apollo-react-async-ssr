import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "../components/App";
import ClientAppContainer from "./ClientAppContainer";

const render = async () => {
  const root = document.getElementById("root");

  await Loadable.preloadAll();

  ReactDOM.hydrate(
    <ClientAppContainer>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
    </ClientAppContainer>,
    root
  );
};

render();
