const {
  ApolloServer,
  ValidationError,
  UserInputError,
} = require('apollo-server');
const { typeDefs, resolvers } = require('./src/graphql');
const { dataSources, formatError, context } = require('./src/config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
  formatError,
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`🚀 Launched http://localhost:${port}/`));
