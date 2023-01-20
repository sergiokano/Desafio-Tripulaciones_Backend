const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");


router.post("/create", CategoryController.createCategory);
router.post("/createSubcategory", CategoryController.createSubcategory);


module.exports = router;