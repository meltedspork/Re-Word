/**
 * This is entrypoint for Re-Word server-side.
 * @namespace Server
 * @requires express
 * @see {@link express}
 * @requires body-parser
 * @see {@link body-parser}
 * @requires apollo-server-express
 * @see {@link apollo-server-express}
 */
/**
 * @desc Fast, unopinionated, minimalist web framework for node. https://expressjs.com
 * @version 4.16.2
 * @external express
 * @see {@link https://github.com/expressjs/express ExpressJS}
 */
import express from 'express'

/**
 * @desc Node.js body parsing middleware.
 * @version 1.18.2
 * @external body-parser
 * @see {@link https://github.com/expressjs/body-parser body-parser}
 */
import bodyParser from 'body-parser'

/**
 * @desc This is the Express and Connect integration of GraphQL Server.
 * @version 1.1.6
 * @external apollo-server-express
 * @see {@link https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express apollo-server-express}
 */
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './schema'

import Connector from './connector'

const connector = new Connector()
const app = express()

app.get('/', (req, res) => {
  connector.query('SELECT * from wp_users', (err, data) => {
    if (err) {
      // error handling code goes here
      console.log(err[0])
      res.json(err[0])
    } else {
      // code to execute on data retrieval
      console.log(data[0], data[1])
      res.json(data[1])
    }
  })
})

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Hackernews GraphQL server running on port ${PORT}.`)
})
