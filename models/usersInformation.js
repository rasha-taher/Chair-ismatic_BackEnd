const mongoose = require("mongoose");

const userInformationSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type :String},
  phoneNumber: { type: Number },
  user_id: { type: String, ref:'user'}
});
const UserInformation = mongoose.model("UserInformation", userInformationSchema);

module.exports = UserInformation;
