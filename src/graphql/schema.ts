import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';
// import mocks from './mocks';

const typeDefs = `type Query {
  testString: String
  user(id: String): User
}

type UpsertUserPayload {
  user: User!
}

type Mutation {
  upsertUser(
    id: String
    platform: String
    vendor: String
    product: String
  ): UpsertUserPayload
}

type User {
  # bson ObjectId hex string
  id: String
  platform: String
  vendor: String
  product: String
  # ip address of first visit
  ip: String
  # two digit alphabet code
  countryCode: String
  # name of the city of first visit
  city: String
}`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
