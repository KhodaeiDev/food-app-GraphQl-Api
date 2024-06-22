const { GraphQLList } = require("graphql");
const { FoodType } = require("../types/food.types");
const foodModel = require("./../../models/Food");

const FoodResolver = {
  neme: "FoodResolver",
  type: new GraphQLList(FoodType),
  resolve: async () => {
    return await foodModel.find({}).populate("category");
  },
};

module.exports = { FoodResolver };
