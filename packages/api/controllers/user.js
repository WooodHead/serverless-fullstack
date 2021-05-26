import User from '../models/User'
import { generateId } from '../utils/id'
import { log } from '../utils/logger'
import { validateId } from '../validators/common'

export function createUser({
  userId = generateId(),
  cognitoUserId,
  email,
  name,
}) {
  log.debug('USER_CONTROLLER:createUser', { userId, name, email })
  validateId(userId)

  if (!name) throw new Error('name is required')

  return User.put({
    userId,
    cognitoUserId,
    email,
    name,
  })
}

export async function getUser({ userId }) {
  if (!userId) throw new Error('userId is required')

  return User.get({ userId })
}

export function getCurrentUser(req) {
  if (!req) throw new Error('req is required')

  return getUser({
    userId: req.cognitoUser.userId,
  })
}
