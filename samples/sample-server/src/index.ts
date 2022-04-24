import express from 'express'
import process from 'process'

import {
  sampleFunction
} from 'sample-module'

export function launchServer () {
  // Create app
  const app = express()

  // Add a route that responds with our shared library message
  app.get('/', (request: express.Request, response: express.Response) => {
    if (request.query.json === 'true') {
      response.send({
        message: sampleFunction()
      })
    } else {
      response.send(sampleFunction())
    }
  })

  // Completed app
  return app
}

if (process.env.RUN_AS_TEST !== 'true') {
  // Run server apart from in test mode, which
  // will run the server itself
  launchServer().listen(8080)
}
