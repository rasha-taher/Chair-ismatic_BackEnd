const Category = require("../models/categories");

const addCategory = async (req, res) => {
  try {
    const category = new Category({
      category: req.body.category,
    });

    const saveCategory = await category.save();
    res.status(200).json({
      code: 200,
      message: "Category added successfully",
      data: saveCategory,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Catgory was not added successfully",
      error: error.message,
    });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const deleteCategoriesById = async (req, res) => {
  try {
    const { id } = req.params; 
    const projects = await Category.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "categories deleted successfully",
      projects: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the categories",
      error: error,
    });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params; 

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (updatedCategory) {
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the Category",
      error: error.message,
    });
  }
};
module.exports = {
    addCategory,
    getAllCategories,
    deleteCategoriesById,
    updateCategoryById
}