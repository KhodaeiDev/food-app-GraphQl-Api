const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const foodModel = require("./../../models/Food");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    icon: { type: GraphQLString },
    foods: {
      type: new GraphQLList(FoodType),
      resolve: async (sourse) => {
        return await foodModel.find({ category: sourse._id });
      },
    },
  }),
});

const FoodType = new GraphQLObjectType({
  name: "FoodType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: CategoryType },
    inventory: { type: GraphQLInt },
    price: { type: GraphQLInt },
  }),
});

module.exports = { FoodType, CategoryType };
