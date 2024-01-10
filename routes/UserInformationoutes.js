const express = require("express");
const router = express.Router();

const {
  addUserInformation,
  getAllUserInformation,
  getUserInformationByUserEmail,
  updateUserInformationById,
  deleteUserInformation,
  updateOrderDetailByEmail,
} = require("../controllers/UserInformationController");

router.post("/addUserInformation", addUserInformation);
router.get("/getAllUserInformation", getAllUserInformation);
router.get(
  "/getUserInformationByUserEmail/:email",
  getUserInformationByUserEmail
);
router.delete("/deleteUserInformation/:id", deleteUserInformation);
router.put("/updateOrderDetailByEmail/:id", updateOrderDetailByEmail);
router.put("/updateUserInformationById", updateUserInformationById);
module.exports = router;
