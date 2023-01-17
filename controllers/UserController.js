const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
    async createUser(req, res) {
      try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password });
        res.status(201).send({ user, message: "User created" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error: Unable to create a user", error });
      }
    },
};

module.exports = UserController;
