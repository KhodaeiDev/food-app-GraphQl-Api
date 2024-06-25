const { GraphQLNonNull, GraphQLID, GraphQLList } = require("graphql");
const { OrderType } = require("../types/order.types");
const orderModel = require("./../../models/Order");
const userModel = require("./../../models/User");

const OrdersResolver = {
  type: new GraphQLList(OrderType),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    const user = await userModel.findOne({ _id: args.userId });
    const orders = await orderModel
      .find({ user: user._id })
      .populate("user")
      .populate("food");

    return orders;
  },
};

const OrderResolver = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    return await orderModel
      .findOne({ _id: id })
      .populate("user")
      .populate("food");
  },
};

module.exports = {
  OrdersResolver,
  OrderResolver,
};
