const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    food: {
      type: mongoose.Types.ObjectId,
      ref: "Food",
    },
    count: {
      type: Number,
      default: 1,
    },
    isDeliver: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Order", schema);

module.exports = model;
