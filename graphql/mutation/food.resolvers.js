const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const { FoodType } = require("../types/food.types");
const foodModel = require("./../../models/Food");

const addFood = {
  type: FoodType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLID) },
    inventory: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (obj, args, context) => {
    const { role } = await verifyUser(context.req);
    if (role !== "ADMIN") {
      throw new Error("No Access This Route");
    }
    const { name, category, inventory, price } = args;
    const newFood = await foodModel.create({
      name,
      category,
      inventory,
      image: "no-pic.png",
      price,
    });
    return newFood;
  },
};

module.exports = { addFood };
