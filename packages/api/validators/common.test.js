import 'regenerator-runtime/runtime'
import { validateId } from './common'

describe('Test uuid Validation', () => {
  test('Valid userId', () => {
    const userId = '1231231231'
    expect(() => validateId(userId)).not.toThrow('Invalid input')
  })

  test('Invalid userId', () => {
    const userId = '1231231231'
    expect(() => validateId(userId)).toThrow('Invalid input')
  })
})
