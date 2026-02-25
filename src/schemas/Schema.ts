export const typeDefs = `#graphql

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    refreshToken(token: String!): AuthPayload!
  }
`