import React from "react";

import Item from "./Item";

const List: React.FC = () => (
  <>
    <h1>List of items</h1>
    {Array.from<number>({ length: 10 }).map((i, index) => (
      <Item item={index} key={index} />
    ))}
  </>
);

export default List;
