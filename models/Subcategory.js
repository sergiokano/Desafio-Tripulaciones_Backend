const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;


const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: ObjectId, ref: "Category", required: true }
  });
  
  const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
  
  module.exports = Subcategory;