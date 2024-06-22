const userModel = require("./../models/User");
const jwt = require("jsonwebtoken");

const findUserById = async (id) => {
  return await userModel.findById({ _id: id });
};

const verifyUser = async (req) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new Error("Token Not Found!!");
      }

      const { id } = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      const user = await findUserById(id);

      return user;
    } else {
      throw new Error("No Auth!!");
    }
  } else {
    throw new Error("No Auth!!");
  }
};

module.exports = { verifyUser };
