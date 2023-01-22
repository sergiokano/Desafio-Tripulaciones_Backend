const Post = require("../models/Post");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  async createUser(req, res, next) {
    try {
      if (req.body.password !== req.body.password2) {
        return res.status(400).send({
          ok: false,
          errors: [
            {
              msg: "Las contraseñas no coinciden",
              param: "password",
            },
          ],
        });
      }
      if (req.body.checked !== true) {
        return res.status(400).send({
          ok: false,
          errors: [
            {
              msg: "Debes aceptar los términos y privacidad",
              param: "checked",
            },
          ],
        });
      }
      const birthdate = new Date(req.body.birthdate);
      const monthDiff = Date.now() - birthdate.getTime();
      const ageDt = new Date(monthDiff);
      const year = ageDt.getUTCFullYear();
      const age = Math.abs(year - 1970);
      if (age < 18) {
        return res.status(400).send({
          ok: false,
          errors: [
            {
              msg: "El usuario debe ser mayor de 18",
              param: "birthdate",
            },
          ],
        });
      }
      const password = await argon2.hash(req.body.password);
      const user = await User.create({
        ...req.body,
        password,
        role: "user",
      });
      res.status(201).send({ user, message: "Usuario creado" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async createAssociation(req, res, next) {
    try {
      if (req.body.password !== req.body.password2) {
        return res.status(400).send({
          ok: false,
          errors: [
            {
              msg: "Las contraseñas no coinciden",
              param: "password",
            },
          ],
        });
      }
      if (req.body.checked !== true) {
        return res.status(400).send({
          ok: false,
          errors: [
            {
              msg: "Debes aceptar los términos y privacidad",
              param: "checked",
            },
          ],
        });
      }

      const password = await argon2.hash(req.body.password);
      const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        cif: req.body.cif,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        isAssociation: true,
        password,
        role: "association",
      });
      res.status(201).send({ user, message: "Asociación creada" });
    } catch (error) {
      console.error(error);
      next(error);
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
      const user = await User.findById(req.user._id).populate({
        path: "postIds",
        select: "incidence description image_path",
        populate: {
          path: "comments.userId",
        },
      });

      const posts = await Post.find({
        _id: { $in: user.postIds },
      }).select("incidence description image_path");

      res.send({ message: "information", user, posts });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem",
      });
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traer todos los usuarios",
        error,
      });
    }
  },
};

module.exports = UserController;
