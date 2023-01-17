const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, fill in your name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
      type: String,
      match: [
        /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/,
        "Please enter a valid email address",
      ],
      unique: true,
      required: [true, "Please, fill in your email"],
    },
    password: {
      type: String,
      required: [true, "Please, fill in your password"],
      // minlength: 8,
      // maxlength: 1024,
      // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      message:
        "Please enter a password that meets the following criteria: at least 8 characters long, contains at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.",
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
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        message:
          "Please use one of the following months: January, February, March, April, May, June, July, August, September, October, November, December.",
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

  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);

module.exports = User;