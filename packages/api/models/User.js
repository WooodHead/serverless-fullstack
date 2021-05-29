import { Table, Entity } from 'dynamodb-toolbox'
import { dynamoDbDocumentClient } from '../utils/dynamodb'

const UserTable = new Table({
  name: process.env.USER_TABLE,
  partitionKey: 'userId',
  DocumentClient: dynamoDbDocumentClient,
})

const User = new Entity({
  name: 'User',
  attributes: {
    userId: { partitionKey: true },
    email: { type: 'string' },
    name: { type: 'string' },
  },
  table: UserTable,
})

export default User
