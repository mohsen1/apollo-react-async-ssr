import React from "react";
import { Helmet } from "react-helmet";
import { Route, Router, Switch } from "react-router-dom";

import Help from "./HelpAsync";
import Hello from "./Hello";
import NotFound from "./NotFound";
import Home from "./Home";

const App: React.FC = () => (
  <>
    <Helmet>
      <title>Async data fetching and code splitting demo</title>
    </Helmet>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/async" exact component={Help} />
      <Route path="/with-data" exact component={Hello} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default App;
