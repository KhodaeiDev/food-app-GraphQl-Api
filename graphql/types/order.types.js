const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const { FoodType } = require("./food.types");
const { UserType } = require("./user.types");

const OrderType = new GraphQLObjectType({
  name: "OrderType",
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: UserType },
    food: { type: FoodType },
    count: { type: GraphQLInt },
    isDeliver: { type: GraphQLBoolean },
  }),
});

module.exports = {
  OrderType,
};
