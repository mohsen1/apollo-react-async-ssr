import React from "react";

const Item: React.FC<{ item: number }> = ({ item }) => <p>Item {item + 1}</p>;

export default Item;
