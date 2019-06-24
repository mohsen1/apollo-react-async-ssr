import React from "react";
import styled from "styled-components";
import moment from "moment";

const Text = styled.p`
  color: #3e3aa5;
  background: #b8c8cc4d;
  padding: 1em;
`;

type State = { time?: string };

class Time extends React.Component<{}, State> {
  readonly state: State = {};

  render() {
    const { time } = this.state;
    return (
      <>
        <h2>This component is loaded lazily</h2>
        <p>This component depends on moment</p>
        <Text>Current date is {moment().format("MMMM Do YYYY")}</Text>
        {time && <Text>Current time is {time}</Text>}
      </>
    );
  }
}

export default Time;
