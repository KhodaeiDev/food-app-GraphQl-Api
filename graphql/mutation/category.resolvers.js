const { GraphQLString, GraphQLNonNull } = require("graphql");
const { CategoryType } = require("../types/food.types");
const categoryModel = require("./../../models/Category");

const addCategory = {
  type: CategoryType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args) => {
    const { title, icon } = args;
    const category = await categoryModel.create({ title, icon });
    return category;
  },
};

module.exports = { addCategory };
