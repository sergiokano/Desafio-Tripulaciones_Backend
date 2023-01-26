const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {
    authentication,
    isAuthor,
    isAdminData,
} = require("../middlewares/authentication");
const { uploadUserPostsImages } = require("../middlewares/multer");

router.post(
    "/",
    authentication,
    uploadUserPostsImages.single("image"),
    PostController.create
);
router.get("/", PostController.getAll);
router.get("/getPostsQueryData", isAdminData, PostController.getPostsQueryData);
router.get("/id/:_id", PostController.getById);
router.get("/search/:incidence", PostController.getPostsByName);
router.delete("/id/:_id", authentication, isAuthor, PostController.delete);
router.put(
    "/:_id",
    authentication,
    uploadUserPostsImages.single("image"),
    isAuthor,
    PostController.update
);
router.put("/comments/:_id", authentication, PostController.insertComment);
router.put("/like/:_id", authentication, PostController.like);
router.put("/dislike/:_id", authentication, PostController.dislike);

module.exports = router;
