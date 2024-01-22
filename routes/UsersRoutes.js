const express = require("express");
const router = express.Router();


const{
    addUser,
    getAllUsers,
    deleteUserById,
    getUserByEmail,
    updateUserById,
    adminLogin,
    vendorLogin,
    clientLogin, 
    getAllCustomers,
    getAllVendors,
    updateUserByEmail,
    getPasswordByEmail,
    updatePasswordByEmail,
    deleteUserByEmail,
    login,
    updateIsClient,
    updateIsVendor,
    checkIsVendor,
    checkIsClient,
   
}= require("../controllers/UsersController");

router.post("/addUser", addUser);
router.get("/getAllUsers", getAllUsers); 
router.get("/customers", getAllCustomers);
router.get("/vendors", getAllVendors);
router.delete("/deleteUserById/:id", deleteUserById);
router.delete("/deleteUserByEmail/:email", deleteUserByEmail);
router.get("/getUserByEmail/:email", getUserByEmail);
router.get("/getPasswordByEmail/:email", getPasswordByEmail);
router.put("/updateUserById/:id", updateUserById);
router.put("/updateUserByEmail", updateUserByEmail);
router.put("/updatePassword", updatePasswordByEmail);
router.post('/admin/login', adminLogin);
router.post('/vendor/login', vendorLogin);
router.post('/client/login', clientLogin);
router.post("/login", login)
router.put('/updateIsClient/:email', updateIsClient);
router.put('/updateIsVendor/:email', updateIsVendor);
router.get('/checkIsVendor/:email', checkIsVendor);
router.get('/checkIsClient/:email',checkIsClient)

module.exports = router;