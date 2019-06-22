import React from "react";
import styled from "styled-components";

const Row = styled.p`
  background-color: gray;
`;

const Item: React.FC<{ item: number }> = ({ item }) => (
  <Row>Item {item + 1}</Row>
);

export default Item;
