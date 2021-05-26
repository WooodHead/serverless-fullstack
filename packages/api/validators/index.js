import { ValidationError } from 'yup'
import UserInputError from '../errors/UserInputError'

export function validate(input, schema) {
  try {
    schema.validateSync(input, { abortEarly: false })
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.inner.map(({ path, message, value }) => ({ path, message, value }))
      throw new UserInputError(errors)
    }
    throw err
  }
}
