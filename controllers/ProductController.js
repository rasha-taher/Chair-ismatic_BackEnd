const Product = require("../models/Products");

const addProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image ,
      colors: req.body.colors,
      description: req.body.description,
      price: req.body.price,
      discountPrice: req.body.discountPrice,
      quantity: req.body.quantity,
      category: req.body.category,
      user_id: req.body.user_id,
    });

    const savedProduct = await product.save(); 
    res.status(200).json({
      code: 200,
      message: 'Product added successfully',
      data: savedProduct 
        });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: 'Product was not added successfully',
      error: error.message
    });
  }
};

const getAllProduct = async (req, res) => {
    try {
      const data = await Product.find({});
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  const getProductByName = async (req, res) => {
    try {
      const name = req.params.name;
      const products = await Product.find({ name: name });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Product.find({ _id: id });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getPoductByVendorName = async (req, res) => {
    try {
      const vendorName = req.params.vendorName;
      const products = await Product.find({ vendorName: vendorName });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getProductByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category: category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteProductByName = async (req, res) => {
    try {
      const { name } = req.params; 
      const projects = await Product.deleteOne({ name: name });
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        projects: projects,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error occurred while deleting the product",
        error: error,
      });
    }
  };
  // Update product by name
const updateProductByName = async (req, res) => {
  try {
    const { name } = req.params; // Extract name from request parameters

    const updatedProduct = await Product.findOneAndUpdate(
      { name: name },
      { $set: req.body },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the product",
      error: error.message,
    });
  }
};


// Update product by ID
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params; 

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the product",
      error: error.message,
    });
  }
};
const deleteProductById= async (req, res) => {
  try {
    const { id } = req.params; 
    const projects = await Product.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      projects: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the product",
      error: error,
    });
  }
};
  module.exports = {
    addProduct,
    getAllProduct,
    getProductByName,
    getPoductByVendorName,
    getProductByCategory,
    getProductById,
    deleteProductByName,
    updateProductByName,
    updateProductById,
    deleteProductById
}
