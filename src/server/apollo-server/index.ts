import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world"
  }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema
});

export default server;
