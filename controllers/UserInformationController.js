const UserInformation = require("../models/usersInformation");

const addUserInformation = async (req, res) => {
  try {
    const userInformation = new UserInformation({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      user_id: req.body.user_id,
    });

    const savedUserInformations = await userInformation.save();

    res.status(200).json({
      code: 200,
      message: "Order Details added successfully",
      data: savedUserInformations,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Order Details was not added successfully",
      error: error.message,
    });
  }
};

const getAllUserInformation = async (req, res) => {
  try {
    const data = await UserInformation.find({});
    await res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserInformationByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const ordersDetail = await UserInformation.find({ email });
    res.json(ordersDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserInformationById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    const updateUserinfo = await UserInformation.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updateUserinfo) {
      res.status(200).json({
        success: true,
        message: "user Informarion updated successfully",
        user: updateUserinfo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user Informarion not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the vendor",
      error: error.message,
    });
  }
};

const deleteUserInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUserInformation = await UserInformation.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "User Info deleted successfully",
      projects: deleteUserInformation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the user's information",
      error: error,
    });
  }
};

const updateOrderDetailByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updateUserInfo = await UserInformation.findOneAndUpdate(
      email,
      { $set: req.body },
      { new: true }
    );

    if (updateUserInfo) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updateUserInfo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the vendor",
      error: error.message,
    });
  }
};

module.exports = {
    addUserInformation,
    getAllUserInformation,
    getUserInformationByUserEmail,
    updateUserInformationById,
    deleteUserInformation,
    updateOrderDetailByEmail,
  };
  