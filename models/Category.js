const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;


const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        subcategories_id: [{ type: ObjectId, ref: 'Subcategory'}]
    }
  );
  const Category = mongoose.model("Category", CategorySchema);
  
  module.exports = Category;