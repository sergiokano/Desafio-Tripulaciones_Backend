const Post = require("../models/Post");
const User = require("../models/User");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  async createUser(req, res, next) {
    try {
      const birthdate = new Date(req.body.birthdate)
      const monthDiff = Date.now() - birthdate.getTime()
      const ageDt = new Date(monthDiff)
      const year = ageDt.getUTCFullYear();
      const age = Math.abs(year - 1970);
      if(age < 18 ) {
        return res.status(400).send({msg: "El usuario debe ser mayor de 18"})
      }
      const password = await argon2.hash(req.body.password);
      const user = await User.create({ ...req.body, password, role: "user" });
      res.status(201).send({ user, password, message: "Usuario creado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "No es posible crear el usuario", error });
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

      const isMatch = await argon2.verify(user.password, req.body.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Correo o contraseña incorrectos" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ msg: "Bienvenid@ " + user.firstName, token, user });
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
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate({
          path: "postIds",
          select: "incidence description image_path",
          populate: {
            path: "comments.userId",
          },
        })
        
      const posts = await Post.find({
        _id: {$in: user.postIds}
      }).select("incidence description image_path");

      res.send({message: "information", user, posts});
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem",
      });
    }
  }
};

module.exports = UserController;