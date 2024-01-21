const Bill = require("../models/Bill");

const addBill = async (req, res) => {
  try {
    const bill = new Bill({
      totalPrice: req.body.totalPrice,
      userEmail: req.body.userEmail,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.discountPrice,
      country: req.body.country,
      city: req.body.city,
      streetAddress: req.body.streetAddress,
      postalCode: req.body.postalCode,
      date: req.body.date,
      status: req.body.status,
      paymentMethod : req.body.paymentMethod,
      productsInCart: req.body.productsInCart,
    });

    const savedBill = await bill.save();
    res.status(200).json({
      code: 200,
      message: "Bill added successfully",
      data: savedBill,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Bill was not added successfully",
      error: error.message,
    });
  }
};

const getAllBills = async (req, res) => {
  try {
    const data = await Bill.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBillById = async (req, res) => {
  try {
    const id = req.params.id;
    const bills = await Bill.find({ _id: id });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBillByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const bills = await Bill.find({ userEmail: email });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedBill) {
      res.status(200).json({
        success: true,
        message: "Bill updated successfully",
        bill: updatedBill,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the bill",
      error: error.message,
    }); 
  }
};

async function cancelOrder(id) {
  try {
    const upadtedBill = await Bill.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Canceled" } },
      { new: true }
    );

    return upadtedBill;
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
} 
module.exports = {
  addBill,
  getAllBills,
  getBillById,
  getBillByEmail,
  updateBillById,
  cancelOrder,
}; 