const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication} = require("../middlewares/authentication");
const { uploadUserPostsImages } = require('../middlewares/multer');

router.post("/", authentication, uploadUserPostsImages.single('image'), PostController.create);
router.get("/", PostController.getAll);

module.exports = router;