import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String,
    name: Name,
    tags: [String]
  }

  type Name {
    firstName: String,
    lastName: String 
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(title: String, number: Float): [Book],
    name: Name
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    tags: ['1', '2'],
    name: {
      firstName: 'hi',
      lastName: 'DDD'
    }
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];
const name = {
  firstName: 'will'
}
const resolvers = {
  Query: {
    books: (title) => books.filter(v => v.title.match(title)),
    name: () => name
  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);