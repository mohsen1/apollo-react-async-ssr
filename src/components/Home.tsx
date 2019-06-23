import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

const Home: React.FC<RouteComponentProps> = () => (
  <>
    <h1>
      Server Side Rendering React App with Data Fetching and Async Components
    </h1>
    <ul>
      <li>
        <Link to="/async">Async component</Link>
      </li>
      <li>
        <Link to="/with-data">Component with data from API</Link>
      </li>
    </ul>
  </>
);

export default Home;
