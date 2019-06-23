import React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import(/* webpackChunkName: "Help" */ "./Help"),
  loading: () => <p>Loading help...</p>
});
