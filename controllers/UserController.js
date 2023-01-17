const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
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

    async login(req, res) {
      try {
        const user = await User.findOne({
          email: req.body.email,
        });
  
        if (!user) {
          return res.status(400).send({msg:"Correo o contraseña incorrectos"});
        }
  
         
        const isMatch = await bcrypt.compare(req.body.password, user.password);
     
        if (!isMatch) {
          return res.status(400).send({msg:"Correo o contraseña incorrectos"});
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
};

module.exports = UserController;