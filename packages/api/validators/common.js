import * as yup from 'yup'
import { validate } from './index'
import { ID_SIZE } from '../utils/id'

export const idSchema = yup.string()
  .test('len', `Must be exactly ${ID_SIZE} characters`, (val) => val.length === ID_SIZE)
  .required()

export const validateId = (uuid) => validate(uuid, idSchema)
