const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  totalPrice: { type: Number },
  userEmail: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  country: { type: String },
  city: { type: String },
  streetAddress: { type: String },
  postalCode: { type: Number },
  date: { type: Date },
  status: { type: String, enum: ["Canceled", "Pending", "Completed", "Packing", "On Its Way"] },
  paymentMethod :  {type : String },
  productsInCart: [
    {
      name: { type: String },
      quantity: { type: Number },
      color: { type: String },
    }
  ]
});
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
