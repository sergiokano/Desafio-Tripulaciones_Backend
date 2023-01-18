const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, ingresa tu nombre"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
      type: String,
      match: [
        /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/,
        "Por favor, ingresa un correo valido",
      ],
      unique: true,
      required: [true, "Por favor, ingresa tu correo"],
    },
    password: {
      type: String,
      required: [true, "Por favor, ingresa tu contraseña"],
      // minlength: 8,
      // maxlength: 1024,
      // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      message:
        "Introduzca una contraseña que cumpla los siguientes criterios: Al menos 8 caracteres, al menos 1 letra minúscula, 1 letra mayúscula, 1 número y 1 carácter especial.",
    },

    birthdate: {
      type: Date,
      required: [true, "Por favor, ingresa tu fecha de nacimiento"],
    
      },
       

    isAdmin: { type: Boolean, default: false },
    tokens: [],
    postIds: [{ type: ObjectId, ref: 'Post' }],

  }, { timestamps: true });
  UserSchema.methods.toJSON = function() {
      const user = this._doc;
      delete user.tokens;
      delete user.password;
      return user;
  
  }
const User = mongoose.model("User", UserSchema);

module.exports = User;