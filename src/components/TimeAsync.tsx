import React from "react";
import loadable from "@loadable/component";
import Loadable from "./Loadable";

export default Loadable({
  loader: () => import(/* webpackChunkName: "Time" */ "./Time"),
  loading: ({ error, isLoading, timedOut }) => (
    <div>
      <p>{JSON.stringify({ isLoading })}</p>
      <p>{JSON.stringify({ timedOut })}</p>
      <p>error: {error ? error.stack : ""}</p>
    </div>
  )
});

// loadable(() => import(/* webpackChunkName: "Time" */ "./Time"));
