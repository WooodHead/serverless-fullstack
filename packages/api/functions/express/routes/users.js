import express from 'express'
import wrapAsync from '../wrap-async'
import { getUser } from '../../../controllers/user'

const userRouter = express.Router()

userRouter.get('/:userId', wrapAsync(async (req, res) => {
  const { userId } = req.params
  const user = await getUser({ userId })
  res.json(user)
}))

export default userRouter