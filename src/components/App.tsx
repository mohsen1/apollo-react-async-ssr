import React from "react";

import List from "./List";
import Help from "./HelpAsync";
import Hello from "./Hello";

const App: React.FC = () => (
  <>
    <h1>GraphQL query component</h1>
    <Hello />
    <h1>Async component</h1>
    <Help />
    <List />
  </>
);

export default App;
