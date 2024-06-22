const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { CategoriesResolver } = require("./queries/category.resolvers");
const { addCategory } = require("./mutation/category.resolvers");
const { addFood } = require("./mutation/food.resolvers");
const { userRegister, userLogin } = require("./mutation/user.resolvers");
const { FoodResolver } = require("./queries/food.resolvers");
const { UserResolver } = require("./queries/user.resolvers");

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
    userLogin,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
