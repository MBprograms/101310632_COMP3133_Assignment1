const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema');
const userResolvers = require('./src/resolvers/userResolvers');
const employeesResolvers = require('./src/resolvers/employeesResolvers');

const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  // MONGODB CONNECTION
  try {
    await mongoose.connect('mongodb://127.0.0.1/comp3133_assigment1', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection Successful! ');
  } catch (error) {
    console.error('MongoDB connection Unsuccessful. ', error);
    process.exit(1);
  }

  const server = new ApolloServer({ typeDefs, resolvers: [userResolvers, employeesResolvers] });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
