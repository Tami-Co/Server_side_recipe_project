const { string } = require('joi');
const mongoose = require("mongoose");
// const { mongooseSequence } = require('mongoose-sequence');
// mongooseSequence.initalize(mongoose.connection)
const minimalRecipeSchema = new mongoose.Schema({
    id: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }],
    nameRecipe: { type: String },
    img: { type: String },
})

const categorySchema = new mongoose.Schema({
    description: { type: String, require: true },
    recipes: [minimalRecipeSchema],
})

module.exports.categorySchema = categorySchema;
module.exports.Category = mongoose.model('categories', categorySchema);

