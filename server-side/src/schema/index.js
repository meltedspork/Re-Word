/**
 * @desc Build and mock your GraphQL.js schema using the schema language.
 * @version 2.4.0
 * @external graphql-tools
 * @see {@link https://github.com/apollographql/graphql-tools graphql-tools}
 */
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// Define your types here.
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
  }
`

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers})
