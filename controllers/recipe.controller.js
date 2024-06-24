const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const { Recipe, recipeValidators } = require('../models/recipe.model');
const { Category, } = require('../models/category.model');

exports.getAllRecipes = async (req, res, next) => {
    let { search, page, perPage } = req.query;
    console.log("getAllRecipes", req.query);
    search ??= '';
    page ??= 1;
    perPage ??= 12;

    console.log("params", search, perPage, page);
    try {
        if (page == 'all') {
            const recipes = await Recipe.find({ isPrivate: false })
            return res.json(recipes);
        }
        else {
            const recipes = await Recipe.find({ name: new RegExp(search), isPrivate: false })
                .skip((page - 1) * perPage)
                .limit(perPage)
                .select('-__v')
            return res.json(recipes);
        }

    } catch (error) {
        next(error)
    }
}

exports.getRecipeById = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next({ message: 'id is not vaild' })
    }
    else {
        Recipe.findById(id, { __v: false })
            .then(r => {
                res.json(r);
            })
            .catch(err => {
                next({ message: 'recipe not found', status: 404 })
            })
    }
}
exports.getRecipesOfUser = async (req, res, next) => {
    const userId = req.user.user_id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        next({ message: 'the id of user is not valid' })
    }
    else {
        if (req.user.role === "admin" || req.user.role === "user") {
            try {
                const recipes = await Recipe.find({ 'user.id': userId });
                return res.json(recipes);
            } catch (error) {
                next(error)
            }
        }
        else {
            next({ message: 'only admin can get recipes' });

        }

    }
}
exports.getRecipesByPreparationTime = async (req, res, next) => {
    const time = req.params.time;
    try {
        const recipes = await Recipe.find({ preparationTime: { $lte: time } });
        return res.json(recipes);
    } catch (error) {
        next(error)
    }
}


exports.addRecipe = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findOne({ _id: userId });
        req.body.user = { id: userId, nameUser: user.userName }
        if (req.user.role === "admin" || req.user.role === "user") {
            const v = recipeValidators.addRec.validate(req.body)
            if (v.error) {
                return next({ message: v.error.message })
            }
            const categories = req.body.categories || [];
            for (const category of categories) {
                const existingCategory = await Category.findOne({ description: category.description });
                if (!existingCategory) {
                    const newCategory = new Category({ description: category.description, recipes: [{ name: req.body.name, img: req.body.img }] });
                    await newCategory.save();
                }
                else {
                    existingCategory.recipes.push({ name: req.body.name, img: req.body.img })
                    await existingCategory.save();
                }
            }
            const recipe = new Recipe(req.body);
            await recipe.save();
            return res.status(201).json(recipe);
        } else {
            next({ message: 'only admin can add recipe' });
        }
    } catch (error) {
        next(error);
    }
}

exports.updateRecipe = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.user_id;
    const user = await User.findOne({ _id: userId });
    req.body.user = { id: userId, nameUser: user.userName }
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else {
        try {
            if (req.user.role === "admin" || req.user.role === "user") {
                const v = recipeValidators.updateRec.validate(req.body)
                if (v.error) {
                    return next({ message: v.error.message })
                }
                const r = await Recipe.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { new: true }
                )
                return res.json(r);
            }
            else {
                next({ message: 'only admin can add recipe' });
            }
        } catch (error) {
            next(error);
        }
    }

}

exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else {
        try {
            if (req.user.role === "admin" || req.user.role === "user") {
                if (!(await Recipe.findById(id))) {
                    return next({ message: 'recipe not found!', status: 404 })
                }

                const recipe = await Recipe.findByIdAndDelete(id);
                for (const category of recipe.categories) {
                    const c = await Category.findOne({ description: category.description });
                    if (c.recipes.length !== 1) {
                        console.log("222", c.recipes.length);
                        c.recipes = c.recipes.filter(x => x.name !== recipe.name);
                        c.save();
                    }
                    else {
                        console.log("11111", c._id);
                        await Category.findByIdAndDelete(c._id);
                    }
                }
                return res.status(204).send();
            }
            else {
                next({ message: 'only admin can add recipe' });
            }

        } catch (error) {
            return next(error)
        }
    }
}
