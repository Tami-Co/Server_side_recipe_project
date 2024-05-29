const express = require('express');
const { auth } = require("../middlewares/auth")
const { getAllRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe, getRecipesOfUser, getRecipesByPreparationTime } = require('../controllers/recipe.controller');

const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getRecipeById);
//להוסיף AUTH
router.get("/recipesUser/:idUser", auth, getRecipesOfUser);

router.get("/recipesByTime/:time", getRecipesByPreparationTime);

router.post("/", auth, addRecipe);

router.put("/:id", auth, updateRecipe);

router.delete("/:id", auth, deleteRecipe);

module.exports = router;