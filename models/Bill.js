const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  totalPrice: { type: Number },
  user_id: { type: Number , ref: 'user'},
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  country: { type: String },
  city: { type: String },
  streetAddress: { type: String },
  postalCode: { type: Number },
  date: { type: String },
});
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
