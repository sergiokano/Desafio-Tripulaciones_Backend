const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async create(req, res, next) {
      try {
        const post = await Post.create({
          ...req.body,
          userId: req.user._id,
        });
        await User.findByIdAndUpdate(req.user._id, {
          $push: { postIds: post._id },
        });
        res.status(201).send(post);
        res.send({ msg: "Post creado correctamente", post });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
};

module.exports = PostController;
