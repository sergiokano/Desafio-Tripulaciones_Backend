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
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Non-Binary","male", "female"],
    },
    month: {
      type: String,
      required: true,
      enum: {
        values: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        message:
          "Utilice uno de los meses siguientes: Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre y Diciembre.",
      },
    },
    // date: {
    //   type: Number,
    //   required: true,
    //   min: 1,
    //   max: 31,
    // },
    // year: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },
    tokens: [],
    postIds: [{ type: ObjectId, ref: 'Post' }],
    image_path: { type: String }

  }, { timestamps: true });
  UserSchema.methods.toJSON = function() {
      const user = this._doc;
      delete user.tokens;
      delete user.password;
      return user;
  
  }
const User = mongoose.model("User", UserSchema);

module.exports = User;