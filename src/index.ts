import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import schema from './graphql/schema';
import './models';
import { sequelize } from './models';

const GRAPHQL_PORT = process.env.PORT || 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

(async () => {
  try {
    await sequelize.sync();
    graphQLServer.listen(GRAPHQL_PORT, () =>
      console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
      )
    );
  } catch (err) {
    console.error(err);
  }
})();

