const { GraphQLList } = require("graphql");
const { CategoryType } = require("../types/food.types");
const categoryModel = require("./../../models/Category");

const CategoriesResolver = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    return await categoryModel.find({});
  },
};

module.exports = { CategoriesResolver };
