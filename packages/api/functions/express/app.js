import express from 'express'
import cors from 'cors'
import { getCurrentInvoke } from '@vendia/serverless-express'
import { StatusCodes } from 'http-status-codes'
import meRouter from './routes/me'
import usersRouter from './routes/users'
import {
  NotFoundError,
  UnauthenticatedError,
  UserInputError,
  BadRequestError,
} from '../../errors'
import { IS_PRODUCTION } from '../../constants'
import { log } from '../../utils/logger'

const app = express()
const router = express.Router()
// router.use(cookieParser())
router.use(cors())
router.use(express.json())
// app.use(express.urlencoded({
//   extended: true
// }));

// Cognito middleware
router.use((req, res, next) => {
  const { event } = getCurrentInvoke()
  const { claims } = event.requestContext.authorizer

  if (!claims || !claims.sub) throw new UnauthenticatedError()

  const { sub: userId, email } = claims
  const groups = claims['cognito:groups']
  req.cognitoUser = {
    userId,
    email,
    groups,
  }
  next()
})

app.use('/', router)
app.use('/me', meRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  const response = {
    message: err.message,
  }

  if (!IS_PRODUCTION) {
    response.trace = err.stack
  }
  if (err instanceof UserInputError) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: err.errors })
  } else if (err instanceof UnauthenticatedError) {
    res.status(StatusCodes.UNAUTHORIZED).json()
  } else if (err instanceof BadRequestError) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message })
  } else if (err instanceof NotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message })
  } else {
    res
      .status(statusCode)
      .json(response)
  }
  log.error(`An error occurred while processing ${req.method}: ${req.originalUrl} API`)
  log.error(error)
})

export default app
