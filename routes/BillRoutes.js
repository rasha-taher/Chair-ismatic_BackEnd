const express = require("express");
const router = express.Router();

const {
    addBill,
  getAllBills,
  getBillById,
  updateBillById,
  cancelOrder,
  }= require("../controllers/BillController")

  router.post("/addBill", addBill);
  router.get("/getAllBills", getAllBills);
  router.get("/getBillById/:id", getBillById);
  router.put("/updateBillById/:id", updateBillById);
  router.put("/cancelOrder", cancelOrder);
  module.exports = router;