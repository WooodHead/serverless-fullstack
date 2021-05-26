import express from 'express'
import wrapAsync from '../wrap-async'
import { getCurrentUser } from '../../../controllers/user'

const meRouter = express.Router()

meRouter.get('/', wrapAsync(async (req, res) => {
  const user = await getCurrentUser(req)
  res.json(user)
}))

export default meRouter
