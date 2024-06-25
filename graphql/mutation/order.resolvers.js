const { GraphQLID, GraphQLInt, GraphQLNonNull } = require("graphql");
const { OrderType } = require("../types/order.types");

const orderModel = require("./../../models/Order");
const { verifyUser } = require("../../utils/auth");

const createOrder = {
  type: OrderType,
  args: {
    user: { type: new GraphQLNonNull(GraphQLID) },
    food: { type: new GraphQLNonNull(GraphQLID) },
    count: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (obj, args) => {
    const order = await orderModel.create({ ...args });

    return orderModel
      .findOne({ _id: order._id })
      .populate("user")
      .populate("food");
  },
};

const deliverOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args, context) => {
    const { role } = await verifyUser(context.req);
    if (role !== "ADMIN") {
      throw new Error("No Access This Route");
    }
    await orderModel.findOneAndUpdate({ _id: args.id }, { isDeliver: true });

    const order = await orderModel
      .findOne({ _id: args.id })
      .populate("user")
      .populate("food");

    return order;
  },
};

const removeOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args) => {
    return await orderModel
      .findOneAndDelete({ _id: args.id })
      .populate("user")
      .populate("food");
  },
};

module.exports = {
  createOrder,
  deliverOrder,
  removeOrder,
};
