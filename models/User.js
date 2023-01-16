const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, fill in your name"],
    minlength: 3,
    maxlength: 20,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
