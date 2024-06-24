const mongoose = require("mongoose");

const minimalRecipeSchema = new mongoose.Schema({
    id: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }],
    name: { type: String },
    img: { type: String },
})

const categorySchema = new mongoose.Schema({
    description: { type: String, require: true },
    recipes: [minimalRecipeSchema],
})

module.exports.categorySchema = categorySchema;
module.exports.Category = mongoose.model('categories', categorySchema);

