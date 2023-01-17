const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication} = require("../middlewares/authentication");

router.post("/", authentication, PostController.create);

module.exports = router;