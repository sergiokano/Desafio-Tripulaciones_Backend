const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async create(req, res, next) {
      try {
        if (req.file) req.body.image_path = req.file.filename;
        const post = await Post.create({
          ...req.body,
          userId: req.user._id,
        });
        await User.findByIdAndUpdate(req.user._id, {
          $push: { postIds: post._id },
        });
        res.status(201).send(post);
        res.send({ msg: "Incidencia creada correctamente", post });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    async getAll(req, res) {
        try {
          const { page = 1, limit = 200 } = req.query;
          const posts = await Post.find()
            .populate("userId")
            .populate("comments.userId")
            .limit(limit*1)
            .skip((page - 1) * limit);
          res.send(posts);
          res.send({ msg: "Aquí tienes todas las incidencias", post });
        } catch (error) {
          console.error(error);
        }
      },
};

module.exports = PostController;
