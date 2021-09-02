const {
  ApolloServer,
  ValidationError,
  UserInputError,
} = require('apollo-server');
const { typeDefs, resolvers } = require('./src/graphql');
const ContactService = require('./src/service/ContactService');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    contactService: ContactService,
  }),
  formatError: (err) => {
    if (err.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
      return new ValidationError(err.message);
    }
    if (err.originalError instanceof UserInputError) {
      return new UserInputError(err.message);
    }
    return err;

    // if (err.message.startsWith('Email ja')) {
    //   throw new Error();
    // }
    // if (err.originalError instanceof ValidationError) {
    //   throw new Error();
    // }
  },
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`🚀 Launched http://localhost:${port}/`));
