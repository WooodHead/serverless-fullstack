module.exports = {
  tables: [
    {
      TableName: process.env.USER_TABLE,
      KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      data: [
        {
          userId: 'existing-user',
          name: 'Existing user',
        },
      ],
    },
  ],
  basePort: 8000,
}
