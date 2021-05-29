import User from '../models/User'
import { log } from '../utils/logger'
import { dynamoCreateItem } from '../utils/dynamodb'

export async function createUser({
  userId,
  user,
}) {
  if (!userId) throw new Error('userId is required')
  if (!user) throw new Error('user is required')
  log.debug('USER_CONTROLLER:createUser', { userId, user })

  const newItemAttributes = {
    ...user,
    userId,
  }
  const userItem = await dynamoCreateItem({ Entity: User, attributes: newItemAttributes })

  log.info('USER_CONTROLLER:USER_CREATED', { userItem })

  return userItem
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
