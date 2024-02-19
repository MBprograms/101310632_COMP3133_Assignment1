const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloClient, InMemoryCache } = require('@apollo/client');
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });const typeDefs = gql`

  type User {
    username: String!
    email: String!
    password: String!
  }
  

  type Employee {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    searchEmployeeById(eid: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): String
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployeeById(eid: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(eid: ID!): Employee
  }
`;
const signupVariables = {
    username: 'exampleUser',
    email: 'user@example.com',
    password: 'password123'
  };
module.exports = typeDefs;
