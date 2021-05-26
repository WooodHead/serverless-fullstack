import { createUser } from '../../controllers/user'

export const handler = async (event) => {
  const {
    sub: cognitoUserId,
    email,
    name,
  } = event.request.userAttributes
  console.info(`Creating User: Email: ${email}; Name: ${name}; User ID: ${cognitoUserId}`)
  try {
    await createUser({ cognitoUserId, name, email })
  } catch (error) {
    console.error(error)
    return event
  }

  return event
}
