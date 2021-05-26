import { Table, Entity } from 'dynamodb-toolbox'
import { dynamoDbDocumentClient } from '../dynamodb-init'

const UserTable = new Table({
  name: process.env.USER_TABLE,
  partitionKey: 'userId',
  DocumentClient: dynamoDbDocumentClient,
})

const User = new Entity({
  name: 'User',
  attributes: {
    userId: { partitionKey: true },
    cognitoUserId: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
  },
  table: UserTable,
})

export default User
