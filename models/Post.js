const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: [true, "Por favor, escribe un post"],
    },

    body: {
      type: String,

      required: [true, "Por favor, tu post debe contener una descrpción"],
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
     
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
