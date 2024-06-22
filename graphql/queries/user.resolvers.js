const { GraphQLList } = require("graphql");
const { UserType } = require("../types/user.types");
const userModel = require("./../../models/User");

const UserResolver = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    const users = await userModel.find({});
    return users;
  },
};

module.exports = { UserResolver };
