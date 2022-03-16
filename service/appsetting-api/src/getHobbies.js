import CreateError from "http-errors";
import dynamoDb from "../../common/libs/dynamodb-lib";

export const main = async (event) => {
  let quizData;
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      PK: "APPSETTING",
      SK: "#METADATA",
    },
  };

  try {
    const result = await dynamoDb.get(params);
    quizData = result.Item;
    console.log(quizData);
  } catch (error) {
    CreateError.InternalServerError(error);
  }
  return quizData;
};
