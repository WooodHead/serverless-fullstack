import 'regenerator-runtime/runtime'
import * as faker from 'faker'
import { validateId } from './common'

describe('Test uuid Validation', () => {
  test('Valid userId', () => {
    const userId = faker.random.uuid()
    expect(() => validateId(userId)).not.toThrow('Invalid input')
  })

  test('Invalid userId', () => {
    const userId = faker.lorem.text()
    expect(() => validateId(userId)).toThrow('Invalid input')
  })
})
