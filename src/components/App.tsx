import React from "react";
import { Helmet } from "react-helmet";

import Help from "./HelpAsync";
import Hello from "./Hello";

const App: React.FC = () => (
  <>
    <Helmet>
      <title>Async data fetching and code splitting demo</title>
    </Helmet>
    <h1>GraphQL query component</h1>
    <Hello />
    <h1>Async component</h1>
    <Help />
  </>
);

export default App;
