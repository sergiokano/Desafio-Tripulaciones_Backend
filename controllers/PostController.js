const Post = require("../models/Post");
// const User = require("../models/User");

const PostController = {
  async create(req, res) {
    try {
      const post = await post.create(req.body);

      res.status(201).send(post);
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "Ha habido un problema al crear la petición" });
    }
  },
};

module.exports = PostController;
