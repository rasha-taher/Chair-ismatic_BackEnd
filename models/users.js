const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  is_admin: { type: Boolean },
  is_client: { type: Boolean },
  is_vendor: { type: Boolean },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: Number },
  gender: {type: String},
  birthday:{ type: String},
  profileImage: {type : String }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
