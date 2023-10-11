const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

// Import typeDefs and resolvers 


mongoose.connect('mongodb+srv://Liam:<password>@jobreviewerz.cwjpd1l.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });

const app = express();
const PORT = process.env.PORT || 4000;

// Apollo Server setup

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
