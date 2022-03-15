import createError from 'http-errors';

import dynamoDb from './dynamodb-lib';

export async function update(event) {
  console.log('params>>>', event);

  // Set up some space to keep track of things we're updating
  const expNames = {};
  const expValues = {};
  const expSet = {};
  const expAdd = {};
  const expRemove = [];

  // Iterate through each argument, skipping keys
  Object.keys(event).forEach((key) => {
    if (key !== 'PK' && key !== 'SK') {
      if (isNull(event[key])) {
        console.log(`${key}>>>`, event[key]);
        // If the argument is set to "null", then remove that attribute from the item in DynamoDB
        expRemove.push(`#${key}`);
        expNames[`#${key}`] = `${key}`;
      } else {
        // Otherwise set (or update) the attribute on the item in DynamoDB
        expSet[`#${key}`] = `:${key}`;
        expNames[`#${key}`] = `${key}`;
        expValues[`:${key}`] = event[key];
      }
    }
  });

  // Start building the update expression, starting with attributes we're going to SET
  let expression = '';
  if (!isEmpty(expSet)) {
    expression = 'SET';
    Object.keys(expSet).forEach((key) => {
      console.log('key::', key);
      expression = `${expression} ${key} = ${expSet[key]},`;
      console.log('expression::', expression);
    });
  }

  // Continue building the update expression, adding attributes we're going to ADD
  if (!isEmpty(expAdd)) {
    expression = expression.replace(new RegExp(',$'), '');
    expression = `${expression} ADD`;
    Object.keys(expAdd).forEach((key) => {
      expression = `${expression} ${expAdd[key]},`;
    });
  }

  // Continue building the update expression, adding attributes we're going to REMOVE
  if (expRemove.length > 0) {
    expression = expression.replace(new RegExp(',$'), '');
    expression = `${expression} REMOVE`;
    Object.keys(expRemove).forEach((key) => {
      expression = `${expression} ${expRemove[key]},`;
    });
  }

  // Finally, write the update expression into the document, along with any expressionNames and expressionValues
  expression = expression.replace(new RegExp(',$'), '');

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: event.PK,
      SK: event.SK,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  params.UpdateExpression = expression;

  if (!isEmpty(expNames)) {
    params.ExpressionAttributeNames = expNames;
  }
  if (!isEmpty(expValues)) {
    params.ExpressionAttributeValues = expValues;
  }

  console.log('params before update>>>', JSON.stringify(params));
  let upd;
  try {
    const result = await dynamoDb.update(params);
    upd = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  console.log('update complete>>>', JSON.stringify(upd));
  return upd;
}

function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function isNull(value) {
  if (value === null || value === '') {
    return true;
  }
  return false;
}
