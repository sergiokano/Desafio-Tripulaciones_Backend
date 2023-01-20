const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

require("dotenv").config();

const CategoryController = {
  async createCategory(req, res) {
    try {
      const category = new Category({
        name: req.body.name,
      });
      const newCategory = await category.save();
      res.status(201).send({ newCategory, message: "Categoría creada" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "No es posible crear la categoría", error });
    }
  },
  async createSubcategory(req, res) {
    try {
      const subcategory = new Subcategory({
        name: req.body.name,
        category: req.body.categoryId,
      });
      const newSubcategory = await subcategory.save();

      await Category.findByIdAndUpdate(req.body.categoryId, {
        $push: { subcategories_id: newSubcategory._id },
      });

      res.status(201).send({ newSubcategory, message: "Subcategoría creada" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "No es posible crear la subcategoría", error });
    }
  },
};

module.exports = CategoryController;
