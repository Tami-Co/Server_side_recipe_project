const { Category } = require('../models/category.model');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().select('code description -_id');
        return res.json(categories);
    } catch (error) {
        next(error)
    }
}

exports.getAllCategoriesWithRecipes = async (req, res, next) => {
    try {
        const categories = await Category.find()
            .populate('recipes')
            .select('-__v');
        return res.json(categories);
    } catch (error) {
        next(error)
    }
}

exports.getCategoryWithRecipes = async (req, res, next) => {
    const name = req.params.name;
    try {
        const category = await Category.findOne({ description: name })
            .populate('recipes')
            .select('-__v')
        return res.json(category)
    } catch (error) {

    }
}