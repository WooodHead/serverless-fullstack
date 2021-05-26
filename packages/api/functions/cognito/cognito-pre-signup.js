export const handler = async (event) => {
  event.response = {
    autoConfirmUser: true,
    autoVerifyEmail: true,
  }
  return event
}
