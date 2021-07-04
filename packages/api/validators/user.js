import * as yup from 'yup'
import { idSchema } from './common'
import { validate } from './index'

export const userSchema = yup.object({
  id: idSchema,
  name: yup.string().min(1).max(128).required(),
})

export const validateUser = (user) => validate(user, userSchema)
