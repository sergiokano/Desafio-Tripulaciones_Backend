const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
require("dotenv").config();

const UserController = {
  async createUser(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password, role: "user" });
      res.status(201).send({ user, message: "Usuario creado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Error: No es posible crear el usuario", error });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(400).send({ msg: "Correo o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Correo o contraseña incorrectos" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ msg: "Bienvenid@ " + user.name, token, user });
    } catch (error) {
      console.error(error);
    }
  },
  
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
};

module.exports = UserController;
