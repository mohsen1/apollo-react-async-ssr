import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { RouteChildrenProps } from "react-router";

const hello = gql`
  query Hello {
    hello
  }
`;

const Hello: React.FC<RouteChildrenProps> = () => (
  <>
    <h2>This component is loading data from API</h2>
    <Query query={hello}>
      {({ data, loading, error }) => {
        if (error) return <div>error loading hello {String(error)}</div>;
        if (loading) return <div>loading hello...</div>;
        return <div>Hello {data.hello}</div>;
      }}
    </Query>
  </>
);

export default Hello;
