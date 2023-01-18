const express = require("express")
const UserController = require("../controllers/UserController")
const { authentication } = require("../middlewares/authentication")
const { uploadUserPostsImages } = require('../middlewares/multer');
const router = express.Router()

router.post("/createUser",UserController.createUser)
router.post("/loginUser",UserController.login)
router.delete("/logoutUser",authentication, UserController.logout)


module.exports = router