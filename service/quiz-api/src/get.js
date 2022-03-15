import CreateError from 'http-errors';
import dynamoDb from '../../common/libs/dynamodb-lib';

export const main = async (event) => {
  console.log('event>>', event);
  const { args } = event;
  const { id, tenantId, courseId } = args;
  let quizData;
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: `ORG#${tenantId}`,
      SK: `#QUIZ#${courseId}#${id}`,
    },
  };

  try {
    const result = await dynamoDb.get(params);
    quizData = result.Item;
  } catch (error) {
    CreateError.InternalServerError(error);
  }
  return quizData;
};
