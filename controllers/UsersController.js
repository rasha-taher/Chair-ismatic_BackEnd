const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../extra/generateToken");

const addUser = async (req, res) => {
  try {
    const { email, password, is_admin, is_client, is_vendor } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      is_admin,
      is_client,
      is_vendor,
    });

    const savedUser = await user.save();
    const token = generateToken(savedUser._id); // Pass the user ID or any unique identifier here

    res.status(200).json({
      code: 200,
      message: "User added successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      code: 500,
      message: "User was not added. Please try again later.",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    await res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.deleteOne({ _id: id });
    await res.status(200).json({
      success: true,
      message: "User deleted successfully",
      projects: deleteUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the user",
      error: error,
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} not found.`,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password.",
      });
    }

    // Generate token using a secure method (not shown in your code)
    const token = generateToken(user.email, user.password);

    return res.status(200).json({
      success: true,
      message: `User with email ${email} logged in successfully.`,
      data: {
        _id: user._id,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to login.",
      error: error.message,
    });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const users = await User.find({ email });
    await res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updateUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updateUser,
      });
    } else {
      res.status(408).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the user",
      error: error.message,
    });
  }
};
// Function for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, is_admin: true });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "Admin not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password.",
      });
    }

    const userData = {
      email: user.email,
      is_admin: user.is_admin,
    };

    res.status(200).json({
      code: 200,
      message: "Admin login successful",
      data: userData,
    });
  } catch (error) {
    console.error("Error logging in as admin:", error);
    res.status(500).json({
      code: 500,
      message: "Admin login failed. Please try again later.",
    });
  }
};

// Function for vendor login
const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, is_vendor: true });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "Vendor not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password.",
      });
    }

    const userData = {
      email: user.email,
      is_vendor: user.is_vendor,
    };

    res.status(200).json({
      code: 200,
      message: "Vendor login successful",
      data: userData,
    });
  } catch (error) {
    console.error("Error logging in as vendor:", error);
    res.status(500).json({
      code: 500,
      message: "Vendor login failed. Please try again later.",
    });
  }
};
const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, is_client: true });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "Client not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password.",
      });
    }

    const userData = {
      email: user.email,
      is_client: user.is_client,
    };

    res.status(200).json({
      code: 200,
      message: "Client login successful",
      data: userData,
    });
  } catch (error) {
    console.error("Error logging in as client:", error);
    res.status(500).json({
      code: 500,
      message: "Client login failed. Please try again later.",
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUserById,
  userLogin,
  getUserByEmail,
  updateUserById,
  adminLogin,
  vendorLogin,
  clientLogin,
};
