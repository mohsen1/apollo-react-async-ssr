import React from "react";
import { RouteComponentProps } from "react-router";

const NotFound: React.FC<RouteComponentProps> = ({ staticContext }) => {
  if (staticContext) {
    staticContext.statusCode = 404;
  }
  return <h1>404 Page not found </h1>;
};

export default NotFound;
