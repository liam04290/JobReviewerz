const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://Liam:pass123@jobreviewerz.cwjpd1l.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
})();
