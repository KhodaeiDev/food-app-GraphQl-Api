const express = require("express");
const mongoose = require("mongoose");
const { createHandler } = require("graphql-http/lib/use/http");
const schema = require("./graphql/index.resolver");
require("dotenv").config();

const app = express();

mongoose.connect("mongodb://127.0.0.1/food-app");
mongoose.connection.once("open", () => {
  console.log("connected to DB Successfully");
});

app.use("/graphql", createHandler({ schema, context: (req) => ({ req }) }));

app.get("/", (req, res) => {
  return res.json("Welcome to my server");
});

app.listen(4005, () => {
  console.log("Server Running On Port 4005");
});
