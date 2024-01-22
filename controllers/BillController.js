const Bill = require("../models/Bill");
const mongoose = require('mongoose');


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

const cancelOrder = async (orderId, res) => {
  try {
    // Check if orderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid orderId: ${orderId}`);
      return res.status(400).json({ error: 'Invalid orderId' });
    }

    // Find the order by ID
    const order = await Bill.findById(orderId);

    if (!order) {
      console.log(`Order with ID ${orderId} not found.`);
      return res.status(404).json({ error: `Order with ID ${orderId} not found.` });
    }

    // Update the status to "Canceled"
    order.status = 'Canceled';

    // Save the updated order
    await order.save();

    console.log(`Order with ID ${orderId} has been canceled.`);
    return res.status(200).json({ message: `Order with ID ${orderId} has been canceled.` });
  } catch (error) {
    console.error('Error canceling order:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  addBill, 
  getAllBills,
  getBillById,
  getBillByEmail,
  updateBillById,
  cancelOrder,
}; 