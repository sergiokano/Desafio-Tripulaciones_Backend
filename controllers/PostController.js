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
      async getPostsByName(req, res) {
        try {
          if (req.params.title.length > 20) {
            return res.status(400).send("Búsqueda demasiado larga");
          }
          const title = new RegExp(req.params.title, "i");
          const post = await Post.find({ title });
          res.send(post);
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },
      async delete(req, res) {
        try {
          const post = await Post.findByIdAndDelete(req.params._id);
          res.send({ post, message: "post eliminado", post });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            message: "Hubo un problema al eliminar el post",
          });
        }
      },
    
      async update(req, res) {
        try {
          if (req.file) req.body.image_path = req.file.filename;
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
          });
          res.send({ message: "Post actualizado correctamente", post });
        } catch (error) {
          console.error(error);
        }
      },
    
      async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { comments: { ...req.body, userId: req.user._id } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ message: "Hubo un problema con tu comentario" });
        }
      },
    
      async like(req, res) {
        try {
          const existPost = await Post.findById(req.params._id);
          if (!existPost.likes.includes(req.user._id)) {
            const post = await Post.findByIdAndUpdate(
              req.params._id,
              { $push: { likes: req.user._id } },
              { new: true }
            );
    
            await User.findByIdAndUpdate(
              req.user._id,
              { $push: { favourites: req.params._id } },
              { new: true }
            );
            res.send(post);
          } else {
            res.status(400).send({ msg: "¡Ya has dado like a este post!" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Hubo un problema con tu like." });
        }
      },
    
      async dislike(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $pull: { likes: req.user._id } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { favourites: req.params._id } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "No hemos podido quitar tu like" });
        }
      },
};

module.exports = PostController;
