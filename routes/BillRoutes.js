const express = require("express");
const router = express.Router();

const {
    addBill,
  getAllBills,
  getBillById,
  getBillByEmail,
  updateBillById,
  cancelOrder,
  }= require("../controllers/BillController")

  router.post("/addBill", addBill);
  router.get("/getAllBills", getAllBills);
  router.get("/getBillById/:id", getBillById);
  router.get("/getBillByEmail/:email", getBillByEmail);
  router.put("/updateBillById/:id", updateBillById);
  router.put("/cancelOrder/:id", async (req, res) => {
    const orderId = req.params.id;
    await cancelOrder(orderId, res);
  });
  
  module.exports = router;