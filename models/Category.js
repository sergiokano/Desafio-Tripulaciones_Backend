const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;


const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        subcategories: [{ type: mongoose.Schema.Types.ObjectId, re: 'Categpry'}]
    }
  );
  
  const Category = mongoose.model("Category", CategorySchema);
  
  module.exports = Category;