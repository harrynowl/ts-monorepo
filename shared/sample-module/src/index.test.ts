import 'jest'
import 'jest-extended'

import {
  sampleFunction
} from './index'

describe('Test shared function', () => {
  it('Test sample function output', () => {
    expect(sampleFunction()).toEqual('Hello from the least useful function you\'ll ever meet!')
  })
})
