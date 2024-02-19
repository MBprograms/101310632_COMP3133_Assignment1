const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  try {
    await mongoose.connect('mongodb://localhost:27017/comp3133_assigment1', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }

  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
