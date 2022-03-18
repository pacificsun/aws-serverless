import createError from "http-errors";

import dynamoDb from "../../common/libs/dynamodb-lib";
export const main = async (event) => {
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: "APPSETTING",
      SK: "#HOBBIES",
      appSettingHobbies: event.hobbies,
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
