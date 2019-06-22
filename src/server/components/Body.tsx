import React from "react";

import App from "../../components/App";

const Body: React.FC = ({ children }) => (
  <body>
    <div id="root">
      <App />
    </div>
    {children}
  </body>
);

export default Body;
