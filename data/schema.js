const { makeExecutableSchema } = require("graphql-tools");
const { resolvers } = require('./resolvers');
const fetch = require("node-fetch");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getFortuneCookie: String @cacheControl(maxAge: 5000)
  }
`;

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { schema };