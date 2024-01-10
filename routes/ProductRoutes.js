const express = require("express");
const router = express.Router();

const{
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
}=require("../controllers/ProductController");

router.post("/addProduct", addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductByName/:name", getProductByName);
router.get("/getPoductByVendorName/:vendorName", getPoductByVendorName);
router.get("/getProductByCategory/:category", getProductByCategory);
router.get("/getProductById/:id", getProductById);
router.delete("/deleteProductByName/:name", deleteProductByName);
router.put("/updateProductByName/:name", updateProductByName);
router.put("/updateProductById/:id", updateProductById);
router.delete("/deleteProductById/:id", deleteProductById);
module.exports = router;