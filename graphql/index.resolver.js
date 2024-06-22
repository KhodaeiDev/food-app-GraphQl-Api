const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { CategoriesResolver } = require("./queries/category.resolver");
const { addCategory } = require("./mutation/category.resolver");
const { addFood } = require("./mutation/food.resolver");
const { userRegister } = require("./mutation/user.resolvers");
const { FoodResolver } = require("./queries/food.resolver");
const { UserResolver } = require("./queries/user.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    Categories: CategoriesResolver,
    foods: FoodResolver,
    users: UserResolver,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addCategory,
    addFood,
    userRegister,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
