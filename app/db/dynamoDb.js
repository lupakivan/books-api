const AWS = require('aws-sdk');

let dynamoDb;

if (process.env.IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: process.env.CONFIG_DYNAMODB_ENDPOINT,
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDb;
