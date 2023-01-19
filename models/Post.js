const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    incidence: {
      type: String,

      required: [true, "Por favor, comunícanos la incidencia"],
    },

    description: {
      type: String,

      required: [true, "Por favor, descríbenos la incidencia"],
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
    comments: [
      {
        userId: { type: ObjectId, ref: "User" },
        comment: String,
      },
    ],

    likes: [{ type: ObjectId }],
    image_path: { type: String }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
