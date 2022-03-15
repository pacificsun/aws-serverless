import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();

export default {
  adminCreateUser: (params) =>
    cognitoidentityserviceprovider.adminCreateUser(params),
  adminAddUserToGroup: (params) =>
    cognitoidentityserviceprovider.adminAddUserToGroup(params).promise(),
  adminRemoveUserFromGroup: (params) =>
    cognitoidentityserviceprovider.adminRemoveUserFromGroup(params).promise(),
  adminUpdateUserAttributes: (params) =>
    cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise(),
  listUsers: (params) =>
    cognitoidentityserviceprovider.listUsers(params).promise(),
  adminDeleteUser: (params) =>
    cognitoidentityserviceprovider.adminDeleteUser(params).promise()
};
