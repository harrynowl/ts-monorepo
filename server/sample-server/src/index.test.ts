import 'jest'
import 'jest-extended'

import {
  SuperAgentTest,
  agent
} from 'supertest'

import {
  launchServer
} from './index'

describe('Test sample server', () => {
  // Test agent for HTTP service
  let service: SuperAgentTest

  beforeAll(() => {
    // Get express app with endpoints
    const app = launchServer()

    // Create service
    service = agent(app)
  })

  it('Test text response', async () => {
    // Request without JSON formatting requested in query
    const response = await service
      .get('/')
      .send()

    // Response as text
    expect(response.text).toEqual('Hello from the least useful function you\'ll ever meet!')
  })

  it('Test JSON response', async () => {
    // Request with JSON formatting requested in query
    const response = await service
      .get('/')
      .query({
        json: true
      })
      .send()

    // Response as text
    expect(response.body).toEqual({
      message: 'Hello from the least useful function you\'ll ever meet!'
    })
  })
})
