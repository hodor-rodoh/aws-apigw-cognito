'use strict';
const AWS = require('aws-sdk');
const DB = new AWS.DynamoDB.DocumentClient();

exports.getUserAttributes = (tableName, username) => {
    let query = {
        TableName: tableName,
        Key: {
            username: username
        }
    };

    console.log(`Dynamo.js -- get -- username: ${username} - query: ${JSON.stringify(query)}`);

    return new Promise((resolve, reject) => {
        DB.get(query).promise()
          .then((result) => {
              if (result['Item'] == null){
                reject(new Error('User not found'))
              }
              console.log(`Dynamo.js -- get -- username: ${username} - result: ${JSON.stringify(result)}`)
              resolve(result['Item']);
          })
          .catch((err) => {
              console.log(`Dynamo.js -- get -- username: ${username} - error: ${err}`, err.stack);
              reject(err);
          });
    });
}
