const Joi = require("joi")
const mongoose = require("mongoose")

const layersCakeSchema = new mongoose.Schema({
    description: { type: String, require: true },
    ingredients: { type: [String], require: true },
})

const minimalUserSchema = new mongoose.Schema({
    id: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    nameUser: { type: String, }

})
const minimalCategorySchema = new mongoose.Schema({
    id: [{ type: mongoose.Types.ObjectId, ref: 'categories' }],
    description: { type: String, },
})
const recipeSchema = new mongoose.Schema({
    name: { type: String, require: true, minlength: [2, 'name must be at least 2 chars'] },
    description: { type: String, },
    categories: [minimalCategorySchema],
    preparationTime: { type: Number, require: true, },
    level: { type: Number, enum: [1, 2, 3, 4, 5] },
    dateAdded: { type: Date },
    layersCake: [layersCakeSchema],
    instructions: { type: String, require: true },
    img: {
        type: String,
    },
    isPrivate: { type: Boolean, require: true },
    user: minimalUserSchema,
})

module.exports.recipeValidators = {
    addRec: Joi.object({
        name: Joi.string().required().min(2).max(50),
        description: Joi.string().min(2).max(200),
        categories: Joi.array().items(
            Joi.object({
                description: Joi.string().required(),
            })
        ).required(),
        preparationTime: Joi.number().required(),
        level: Joi.number().required(),
        dateAdded: Joi.date().required(),
        layersCake: Joi.array().items(
            Joi.object({
                description: Joi.string().required(),
                ingredients: Joi.array().items(Joi.string()).required()
            })
        ).required(),
        instructions: Joi.string().required().min(10).max(1000),
        img: Joi.string()
        ,
        isPrivate: Joi.bool().required(),
        user: Joi.required(),
    }),
    updateRec: Joi.object({
        name: Joi.string().required().min(2).max(50),
        description: Joi.string().min(2).max(200),
        categories: Joi.required(),
        preparationTime: Joi.number().required(),
        level: Joi.number().required(),
        dateAdded: Joi.date().required(),
        layersCake: Joi.array().items(
            Joi.object({
                description: Joi.string().required(),
                ingredients: Joi.array().items(Joi.string()).required()
            })
        ).required(),
        instructions: Joi.string().required().min(10).max(1000),
        img: Joi.string().required(),
        isPrivate: Joi.bool().required(),
        user: Joi.required(),
    })
}
module.exports.recipeSchema = recipeSchema;
module.exports.Recipe = mongoose.model('recipes', recipeSchema);