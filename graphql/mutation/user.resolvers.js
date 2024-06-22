const { GraphQLNonNull, GraphQLString } = require("graphql");
const { AuthType } = require("../types/user.types");
const userModel = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = {
  type: AuthType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args) => {
    const { username, email, password } = args;

    const hasUser = await userModel.findOne({ email });
    if (hasUser) {
      throw new Error("The user has already registered");
    }

    const userCount = await userModel.find({});
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: userCount.length > 0 ? "USER" : "ADMIN",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "7day",
    });
    return { token, user };
  },
};

const userLogin = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args) => {
    const { email, password } = args;
    //Todo => Validator

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Email or Password invalid");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("User Email or Password invalid");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "7day",
    });

    return {
      token,
      user,
    };
  },
};

module.exports = { userRegister, userLogin };
