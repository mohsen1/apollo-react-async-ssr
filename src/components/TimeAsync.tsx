import React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import(/* webpackChunkName: "Help" */ "./Time"),
  loading: () => <p>Loading time...</p>
});
