const { GraphQLString, GraphQLNonNull } = require("graphql");
const { CategoryType } = require("../types/food.types");
const categoryModel = require("./../../models/Category");
const { verifyUser } = require("../../utils/auth");

const addCategory = {
  type: CategoryType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context) => {
    const { role } = await verifyUser(context.req);
    if (role !== "ADMIN") {
      throw new Error("No Access This Route");
    }
    const { title, icon } = args;
    const category = await categoryModel.create({ title, icon });
    return category;
  },
};

module.exports = { addCategory };
