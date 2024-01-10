const express = require("express");
const router = express.Router();


const{
    addUser,
    getAllUsers,
    deleteUserById,
    userLogin,
    getUserByEmail,
    updateUserById,
    adminLogin,
    vendorLogin,
    clientLogin
}= require("../controllers/UsersController");

router.post("/addUser", addUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUserById/:id", deleteUserById);
router.get("/getUserByEmail/:email", getUserByEmail);
router.put("/updateUserById/:id", updateUserById);
router.post('/userLogin', userLogin);
router.post('/admin/login', adminLogin);
router.post('/vendor/login', vendorLogin);
router.post('/client/login', clientLogin);

module.exports = router;