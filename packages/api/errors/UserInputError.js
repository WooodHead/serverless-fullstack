import BaseError from './BaseError'

export default class UserInputError extends BaseError {
  constructor(errors, rootCause, ...params) {
    super('UserInputError', 'Invalid input', rootCause, ...params)
    this.errors = errors
  }
}
