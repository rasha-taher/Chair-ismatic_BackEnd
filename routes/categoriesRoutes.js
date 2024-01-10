const express = require("express");
const router = express.Router();

const{
    addCategory,
    getAllCategories,
    deleteCategoriesById,
    updateCategoryById
}= require("../controllers/categoriesController")

router.post("/addCategory",addCategory)
router.get("/getAllCategories", getAllCategories)
router.post("/updateCategoryById/:id", updateCategoryById)
router.delete("/deleteCategoriesById/:id", deleteCategoriesById)
module.exports = router;