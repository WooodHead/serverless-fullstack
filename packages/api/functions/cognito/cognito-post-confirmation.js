import { createUser } from '../../controllers/user'

export const handler = async (event) => {
  const {
    sub: userId,
    email,
    name,
  } = event.request.userAttributes
  console.info(`Creating User: Email: ${email}; Name: ${name}; User ID: ${userId}`)
  const user = {
    name,
    email,
  }
  try {
    await createUser({ userId, user })
  } catch (error) {
    console.error(error)
    return event
  }

  return event
}
