import React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import(/* webpackChunkName: "Time" */ "./Time"),
  loading: () => <p>Loading time...</p>
});
