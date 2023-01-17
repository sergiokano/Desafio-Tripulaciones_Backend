const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/", PostController.create);

module.exports = router;