const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!  # Avoid password in queries
  }

  type Company {
    id: ID!
    name: String!
    description: String!
  }

  type Review {
    id: ID!
    content: String!
    userId: ID!
    companyId: ID!
  }

  type Query {
    getUsers: [User]
    getCompanies: [Company]
    getReviews: [Review]
  }

  # Mutations for createUser, createCompany...
`;

module.exports = typeDefs;
