const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const AuthType = new GraphQLObjectType({
  name: "AuthType",
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
  }),
});

module.exports = { UserType, AuthType };
