const mongoose = require("mongoose");

const billInformationSchema = new mongoose.Schema({
  bill_id: { type: Number , ref:'bill'},
  product_id: { type: Number },
  color: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});
const BillInformation = mongoose.model(
  "billInformation",
  billInformationSchema
);

module.exports = BillInformation;
