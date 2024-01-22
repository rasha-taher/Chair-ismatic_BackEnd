const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../extra/generateToken");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const {
      email,
      password,
      is_admin,
      is_client,
      is_vendor,
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthday,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      is_admin,
      is_client,
      is_vendor,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      birthday,
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
      return res.status(403).json({
        code: 403,
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

const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ is_client: true });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const customers = await User.find({ is_vendor: true });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(407).json({
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

const getPasswordByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return user.password; // Assuming the password is stored in the 'password' field in your User model
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error("Error retrieving password:", error);
    throw error;
  }
};

async function updatePasswordByEmail(req, res) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password matches
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const deleteUser = await User.deleteOne({ email: email });
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password.",
      });
    }
    let userRole;
    if (user.is_vendor) {
      userRole = "vendor";
    } else if (user.is_client) {
      userRole = "customer";
    } else {
      return res.status(403).json({
        code: 403,
        message: "Invalid user role.",
      });
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
          roles: userRole,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
   // Set the access token as an HTTP-only cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 60 * 1000, // 30 minutes expiration
      path: "/", // Adjust this path according to your application's needs
    });
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
   
    res.status(200).json({
      code: 200,
      message: `${
        userRole.charAt(0).toUpperCase() + userRole.slice(1)
      } login successful`,
      data: { email, role: userRole, accessToken },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      code: 500,
      message: "Login failed. Please try again later.",
    });
  }
};

const updateIsClient = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndUpdate({ email }, { is_client: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'is_client updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to update is_vendor to true
const updateIsVendor = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndUpdate({ email }, { is_vendor: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'is_vendor updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const checkIsVendor = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email, is_vendor: true });

    if (!user) {
      return res.json({ message: 'User is not a vendor' });
    }

    res.json({ message: 'User is a vendor', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to check if is_client is true
const checkIsClient = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email, is_client: true });

    if (!user) {
      return res.json({ message: 'User is not a client' });
    }

    res.json({ message: 'User is a client', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  addUser,
  getAllUsers,
  deleteUserById,
  getUserByEmail,
  updateUserById,
  adminLogin,
  vendorLogin,
  clientLogin,
  getAllCustomers,
  getAllVendors,
  updateUserByEmail,
  getPasswordByEmail,
  updatePasswordByEmail,
  deleteUserByEmail,
  login,
  updateIsClient,
  updateIsVendor,
  checkIsVendor,
  checkIsClient
};
