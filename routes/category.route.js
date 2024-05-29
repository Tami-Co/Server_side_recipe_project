const express = require('express');
const { getAllCategories, getAllCategoriesWithRecipes, getCategoryWithRecipes } = require('../controllers/category.controller');

const router = express.Router();

router.get("/", getAllCategories);
router.get("/withRecipes", getAllCategoriesWithRecipes);
router.get("/:name", getCategoryWithRecipes);

module.exports = router;








