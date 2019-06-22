import React from "react";

import List from "./List";
// import GhostscriptTiger from "./GhostscriptTiger";
import Help from "./HelpAsync";

const App: React.FC = () => (
  <>
    <Help />
    <h1>TODO List</h1>
    <List />
    {/* <h1>SVG</h1> */}
    {/* <GhostscriptTiger /> */}
  </>
);

export default App;
