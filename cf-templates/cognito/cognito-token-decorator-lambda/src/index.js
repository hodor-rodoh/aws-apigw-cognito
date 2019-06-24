'use strict';

const DynamodDB = require('./common/dynamodb')
const attributesDynamoDBTableName = process.env.AttributesDynamoDBTableName

exports.handler = async (event) => {
  event.response = {
      "claimsOverrideDetails": {
          "claimsToAddOrOverride": {
          },
      }
  };
  try {
    let results = await DynamodDB.getUserAttributes(attributesDynamoDBTableName, event.userName)
    console.log(results)
    for (var key in results) {
      if (results.hasOwnProperty(key) && key !== 'username') {
        event.response.claimsOverrideDetails.claimsToAddOrOverride[key] = results[key]
      }
    }
  } catch (e) {
    console.log(`Failed to get attributes for user: ${event.userName}`, e.stack)
  }

  return event
};
