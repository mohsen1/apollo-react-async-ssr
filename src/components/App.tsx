import React from "react";

import Help from "./HelpAsync";
import Hello from "./Hello";

const App: React.FC = () => (
  <>
    <h1>GraphQL query component</h1>
    <Hello />
    <h1>Async component</h1>
    <Help />
  </>
);

export default App;
