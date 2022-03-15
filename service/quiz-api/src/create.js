import * as uuid from 'uuid';
import createError from 'http-errors';

import dynamoDb from '../../common/libs/dynamodb-lib';
export const main = async (event) => {
  console.log('event>>', JSON.stringify(event));
  const { args } = event;
  const { tenantId, courseId, quizTitle, description } = args;

  const id = uuid.v4();
  const timestamp = new Date().toISOString();

  let questions = args.questions;
  console.log('q>>', questions);
  const updatedQuestion = questions.map((element) => ({
    ...element,
    id: uuid.v4(),
  }));

  console.log('questions>>', JSON.stringify(updatedQuestion));

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: `ORG#${tenantId}`,
      SK: `#QUIZ#${courseId}#${id}`,
      id,
      courseId,
      tenantId,
      description,
      quizTitle,
      questions: updatedQuestion,
      createdAt: timestamp,
    },
  };

  try {
    await dynamoDb.put(params);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return params.Item;
};
