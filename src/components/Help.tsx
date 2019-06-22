import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: #444;
`;

const Item: React.FC = () => (
  <Text>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius animi tempore
    aliquid non placeat sapiente, velit quas sequi sint ipsum quam voluptate
    possimus, nulla ea asperiores eveniet deserunt odio libero!
  </Text>
);

export default Item;
