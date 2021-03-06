import * as uuid from "uuid";
import createError from "http-errors";

import dynamoDb from "../../common/libs/dynamodb-lib";
export const main = async (event) => {
  console.log("event>>", JSON.stringify(event));
  const { courseId, tenantId, description, quizTitle } = event;

  console.log(">>", courseId);
  const id = uuid.v4();
  const timestamp = new Date().toISOString();

  let questions = event.questions;
  console.log("q>>", questions);
  const updatedQuestion = questions.map((element) => ({
    ...element,
    id: uuid.v4(),
  }));

  console.log("questions>>", JSON.stringify(updatedQuestion));

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: "APPSETTING",
      SK: "#METADATA",
      questions: updatedQuestion,
      createdAt: timestamp,
      updatedAt: timestamp,
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
