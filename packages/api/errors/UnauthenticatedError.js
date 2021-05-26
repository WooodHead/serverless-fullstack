import BaseError from './BaseError'

export default class UnauthenticatedError extends BaseError {
  constructor(errors, rootCause, ...params) {
    super('UnauthenticatedError', 'Not authenticated', rootCause, ...params)
    this.errors = errors
  }
}
